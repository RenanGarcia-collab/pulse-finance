from __future__ import annotations

import os
import sys
import base64
import hashlib
import hmac
import json
import secrets
import sqlite3
import struct
import threading
import time
import unicodedata
import webbrowser
import zipfile
from io import BytesIO
from functools import wraps
from pathlib import Path
from typing import Any
from urllib.parse import quote

import qrcode
from flask import Flask, g, jsonify, request, send_file, send_from_directory, session
from waitress import serve
from werkzeug.security import check_password_hash, generate_password_hash


DEV_SECRET_KEY = secrets.token_urlsafe(32)
LOGIN_RATE_LIMIT_ATTEMPTS = 5
LOGIN_RATE_LIMIT_WINDOW_SECONDS = 15 * 60
LOGIN_ATTEMPTS: dict[str, list[float]] = {}
TWO_FACTOR_RATE_LIMIT_ATTEMPTS = 5
TWO_FACTOR_RATE_LIMIT_WINDOW_SECONDS = 15 * 60
TWO_FACTOR_ATTEMPTS: dict[str, list[float]] = {}
PAYMENT_METHODS = {"Credito", "Debito", "Pix", "Dinheiro"}
USER_ROLES = {
    "administrador": "Administrador",
    "admin": "Administrador",
    "financeiro": "Financeiro",
    "financas": "Financeiro",
    "finanças": "Financeiro",
}
ASSET_BRAND_LABELS = {
    "audi": "Audi",
    "bmw": "BMW",
    "byd": "BYD",
    "chevrolet": "Chevrolet",
    "citroen": "Citroen",
    "fiat": "Fiat",
    "honda": "Honda",
    "peugeot": "Peugeot",
    "renault": "Renault",
    "toyota": "Toyota",
    "volkswagen": "Volkswagen",
}
ASSET_BRAND_ALIASES = {
    "audi": "audi",
    "bmw": "bmw",
    "byd": "byd",
    "chevrolet": "chevrolet",
    "chevy": "chevrolet",
    "citroen": "citroen",
    "fiat": "fiat",
    "honda": "honda",
    "peugeot": "peugeot",
    "renault": "renault",
    "toyota": "toyota",
    "volks": "volkswagen",
    "volkswagen": "volkswagen",
    "wolkswagen": "volkswagen",
    "wolsgwagem": "volkswagen",
    "wolsvagem": "volkswagen",
    "vw": "volkswagen",
}
DEFAULT_PORT = int(os.environ.get("PORT", "9001"))
BACKUP_RETENTION_DAYS = max(3, int(os.environ.get("FINANCE_BACKUP_RETENTION_DAYS", "30")))


def app_root() -> Path:
    if getattr(sys, "frozen", False):
        return Path(getattr(sys, "_MEIPASS", Path(sys.executable).resolve().parent))
    return Path(__file__).resolve().parent


def default_data_dir() -> Path:
    env_data_dir = os.environ.get("FINANCE_DATA_DIR", "").strip()
    if env_data_dir:
        return Path(env_data_dir).expanduser()

    if os.name == "nt":
        base_dir = os.environ.get("LOCALAPPDATA") or os.environ.get("APPDATA")
        if base_dir:
            return Path(base_dir).expanduser() / "Pulse Finance"

    return app_root()


def default_database_path() -> Path:
    env_database_path = os.environ.get("FINANCE_DATABASE_PATH", "").strip()
    if env_database_path:
        return Path(env_database_path).expanduser()
    return default_data_dir() / "finance.db"


BASE_DIR = app_root()
DATA_DIR = default_data_dir()
DATABASE_PATH = default_database_path()
SECRET_KEY_FILE = DATA_DIR / "secret.key"
BACKUP_DIRECTORY = DATA_DIR / "backups"
VERSION_MANIFEST_FILE = BASE_DIR / "version.json"


def ensure_runtime_directories() -> None:
    DATABASE_PATH.parent.mkdir(parents=True, exist_ok=True)
    SECRET_KEY_FILE.parent.mkdir(parents=True, exist_ok=True)
    BACKUP_DIRECTORY.mkdir(parents=True, exist_ok=True)


def load_version_manifest() -> dict[str, str]:
    defaults = {
        "version": os.environ.get("FINANCE_APP_VERSION", "1.0.0").strip() or "1.0.0",
        "channel": "stable",
        "updateUrl": os.environ.get("FINANCE_UPDATE_URL", "").strip(),
        "releaseNotesUrl": os.environ.get("FINANCE_RELEASE_NOTES_URL", "").strip(),
    }
    if not VERSION_MANIFEST_FILE.exists():
        return defaults
    try:
        raw = json.loads(VERSION_MANIFEST_FILE.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return defaults
    return {
        "version": str(raw.get("version") or defaults["version"]).strip() or defaults["version"],
        "channel": str(raw.get("channel") or defaults["channel"]).strip() or defaults["channel"],
        "updateUrl": str(raw.get("updateUrl") or defaults["updateUrl"]).strip(),
        "releaseNotesUrl": str(raw.get("releaseNotesUrl") or defaults["releaseNotesUrl"]).strip(),
    }


def env_flag(name: str, default: bool = False) -> bool:
    value = os.environ.get(name)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


def load_secret_key() -> str:
    secret_key = os.environ.get("FINANCE_SECRET_KEY", "").strip()
    require_secret_key = env_flag("FINANCE_REQUIRE_SECRET_KEY") or env_flag("FINANCE_PRODUCTION")

    if secret_key:
        return secret_key

    ensure_runtime_directories()

    if SECRET_KEY_FILE.exists():
        stored_key = SECRET_KEY_FILE.read_text(encoding="utf-8").strip()
        if stored_key:
            return stored_key

    generated_key = secrets.token_urlsafe(32)

    try:
        SECRET_KEY_FILE.write_text(generated_key, encoding="utf-8")
    except OSError:
        if require_secret_key:
            raise RuntimeError("Defina FINANCE_SECRET_KEY antes de iniciar o Pulse Finance em produção.")
        return DEV_SECRET_KEY

    return generated_key

app = Flask(__name__, static_folder=None, template_folder=None)
app.config.update(
    SECRET_KEY=load_secret_key(),
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",
    SESSION_COOKIE_SECURE=env_flag("FINANCE_SECURE_COOKIES") or env_flag("FINANCE_PRODUCTION"),
)


@app.after_request
def apply_security_headers(response):
    response.headers.setdefault("X-Content-Type-Options", "nosniff")
    response.headers.setdefault("X-Frame-Options", "DENY")
    response.headers.setdefault("Referrer-Policy", "same-origin")
    if request.path.startswith("/api/"):
        response.headers.setdefault("Cache-Control", "no-store")
        response.headers.setdefault("Pragma", "no-cache")
    if env_flag("FINANCE_PRODUCTION"):
        response.headers.setdefault("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
    return response


def get_db() -> sqlite3.Connection:
    if "db" not in g:
        connection = sqlite3.connect(DATABASE_PATH)
        connection.row_factory = sqlite3.Row
        connection.execute("PRAGMA foreign_keys = ON")
        g.db = connection
    return g.db


@app.teardown_appcontext
def close_db(_: Any) -> None:
    connection = g.pop("db", None)
    if connection is not None:
        connection.close()


def query_all(sql: str, params: tuple[Any, ...] = ()) -> list[dict[str, Any]]:
    rows = get_db().execute(sql, params).fetchall()
    return [dict(row) for row in rows]


def query_one(sql: str, params: tuple[Any, ...] = ()) -> dict[str, Any] | None:
    row = get_db().execute(sql, params).fetchone()
    return dict(row) if row else None


def execute(sql: str, params: tuple[Any, ...] = ()) -> int:
    cursor = get_db().execute(sql, params)
    get_db().commit()
    return cursor.lastrowid


def timestamp_slug() -> str:
    return time.strftime("%Y%m%d-%H%M%S")


def safe_sqlite_backup(destination: Path) -> Path:
    ensure_runtime_directories()
    destination.parent.mkdir(parents=True, exist_ok=True)

    with sqlite3.connect(DATABASE_PATH) as source_connection:
        with sqlite3.connect(destination) as destination_connection:
            source_connection.backup(destination_connection)
            destination_connection.commit()

    return destination


def cleanup_old_backups() -> None:
    ensure_runtime_directories()
    now = time.time()
    retention_seconds = BACKUP_RETENTION_DAYS * 24 * 60 * 60
    for backup_file in BACKUP_DIRECTORY.glob("pulse-finance-backup-*.db"):
        try:
            if now - backup_file.stat().st_mtime > retention_seconds:
                backup_file.unlink()
        except OSError:
            continue


def ensure_daily_backup() -> None:
    ensure_runtime_directories()
    today_slug = time.strftime("%Y%m%d")
    backup_path = BACKUP_DIRECTORY / f"pulse-finance-backup-{today_slug}.db"

    if not DATABASE_PATH.exists() or backup_path.exists():
        cleanup_old_backups()
        return

    safe_sqlite_backup(backup_path)
    cleanup_old_backups()


def build_backup_archive() -> tuple[BytesIO, str]:
    ensure_runtime_directories()
    temp_snapshot_path = BACKUP_DIRECTORY / f"pulse-finance-export-{timestamp_slug()}.db"
    safe_sqlite_backup(temp_snapshot_path)

    archive_bytes = BytesIO()
    archive_name = f"pulse-finance-backup-{timestamp_slug()}.zip"
    metadata = {
        "app": "Pulse Finance",
        "generatedAt": time.strftime("%Y-%m-%d %H:%M:%S"),
        "databaseFile": "finance.db",
        "dataDirectory": str(DATA_DIR),
        "backupDirectory": str(BACKUP_DIRECTORY),
    }

    try:
        with zipfile.ZipFile(archive_bytes, "w", compression=zipfile.ZIP_DEFLATED) as archive:
            archive.write(temp_snapshot_path, arcname="finance.db")
            archive.writestr("metadata.json", json.dumps(metadata, ensure_ascii=True, indent=2))
    finally:
        try:
            temp_snapshot_path.unlink()
        except OSError:
            pass

    archive_bytes.seek(0)
    return archive_bytes, archive_name


def runtime_info() -> dict[str, Any]:
    ensure_runtime_directories()
    version_manifest = load_version_manifest()
    backups = sorted(BACKUP_DIRECTORY.glob("pulse-finance-backup-*.db"))
    last_backup = backups[-1] if backups else None
    return {
        "appVersion": version_manifest["version"],
        "releaseChannel": version_manifest["channel"],
        "updateUrl": version_manifest["updateUrl"],
        "releaseNotesUrl": version_manifest["releaseNotesUrl"],
        "dataDirectory": str(DATA_DIR),
        "databasePath": str(DATABASE_PATH),
        "backupDirectory": str(BACKUP_DIRECTORY),
        "backupRetentionDays": BACKUP_RETENTION_DAYS,
        "availableBackups": len(backups),
        "lastBackupFile": last_backup.name if last_backup else None,
    }


def csrf_token() -> str:
    token = session.get("csrf_token")
    if not token:
        token = secrets.token_urlsafe(32)
        session["csrf_token"] = token
    return str(token)


def is_admin_role(role: str | None) -> bool:
    normalized = str(role or "").strip().lower()
    return "admin" in normalized or "administrador" in normalized


def normalize_user_role(role: str) -> str | None:
    normalized = str(role or "").strip().lower()
    return USER_ROLES.get(normalized)


def normalize_lookup_key(value: str) -> str:
    ascii_value = unicodedata.normalize("NFD", str(value or "").strip().lower())
    without_marks = "".join(character for character in ascii_value if unicodedata.category(character) != "Mn")
    return "".join(character for character in without_marks if character.isalnum())


def is_legacy_card_invoice_title(title: str) -> bool:
    return normalize_lookup_key(title).startswith("valorfinaldocartao")


def duplicate_exists(sql: str, params: tuple[Any, ...]) -> bool:
    existing = query_one(sql, params)
    return bool(existing)


def get_app_setting(key: str) -> str | None:
    row = query_one("SELECT value FROM app_settings WHERE key = ?", (key,))
    if not row:
        return None
    value = str(row.get("value") or "").strip()
    return value or None


def set_app_setting(key: str, value: str | None) -> None:
    normalized_value = str(value or "").strip()
    if not normalized_value:
        execute("DELETE FROM app_settings WHERE key = ?", (key,))
        return
    execute(
        "INSERT INTO app_settings (key, value) VALUES (?, ?) "
        "ON CONFLICT(key) DO UPDATE SET value = excluded.value",
        (key, normalized_value),
    )


def tracking_start_month() -> str | None:
    value = get_app_setting("tracking_start_month")
    if value and valid_month(value):
        return value
    return None


def effective_installment_window(start_month: str, payment_method: str, installments: int, title: str = "") -> tuple[str, int]:
    normalized_start = str(start_month or "").strip()
    normalized_installments = max(1, int(installments or 1))
    tracking_month = tracking_start_month()

    if (
        not tracking_month
        or not valid_month(normalized_start)
        or str(payment_method or "").strip().lower() != "credito"
        or is_legacy_card_invoice_title(title)
    ):
        return normalized_start, normalized_installments

    start_index = month_to_index(normalized_start)
    tracking_index = month_to_index(tracking_month)
    if start_index >= tracking_index:
        return normalized_start, normalized_installments

    months_elapsed = tracking_index - start_index
    remaining_installments = normalized_installments - months_elapsed
    if remaining_installments <= 0:
        return "", 0

    return tracking_month, remaining_installments


def effective_installment_start_month(start_month: str, payment_method: str, installments: int, title: str = "") -> str:
    return effective_installment_window(start_month, payment_method, installments, title)[0]


def effective_installment_count(start_month: str, payment_method: str, installments: int, title: str = "") -> int:
    return effective_installment_window(start_month, payment_method, installments, title)[1]


def effective_fixed_start_month(fixed_expense: dict[str, Any]) -> str:
    tracking_month = tracking_start_month()
    start_month = str(fixed_expense.get("startMonth") or "")
    payment_method = str(fixed_expense.get("paymentMethod") or "")
    if not tracking_month or not valid_month(start_month) or payment_method.strip().lower() != "credito":
        return start_month
    if month_to_index(start_month) >= month_to_index(tracking_month):
        return start_month
    installments = max(1, int(fixed_expense.get("installments") or 1))
    if installments <= 1:
        return tracking_month
    months_elapsed = month_to_index(tracking_month) - month_to_index(start_month)
    remaining_installments = installments - months_elapsed
    return tracking_month if remaining_installments > 0 else ""


def effective_fixed_installments(fixed_expense: dict[str, Any]) -> int:
    tracking_month = tracking_start_month()
    start_month = str(fixed_expense.get("startMonth") or "")
    payment_method = str(fixed_expense.get("paymentMethod") or "")
    installments = max(1, int(fixed_expense.get("installments") or 1))
    if (
        installments <= 1
        or not tracking_month
        or not valid_month(start_month)
        or payment_method.strip().lower() != "credito"
        or month_to_index(start_month) >= month_to_index(tracking_month)
    ):
        return installments
    months_elapsed = month_to_index(tracking_month) - month_to_index(start_month)
    return max(0, installments - months_elapsed)


def title_case_label(value: str) -> str:
    return " ".join(word.capitalize() for word in str(value or "").strip().split())


def normalize_asset_brand(brand: str) -> str | None:
    cleaned_brand = str(brand or "").strip()
    if not cleaned_brand:
        return None
    lookup_key = normalize_lookup_key(cleaned_brand)
    normalized_key = ASSET_BRAND_ALIASES.get(lookup_key, lookup_key)
    return ASSET_BRAND_LABELS.get(normalized_key, title_case_label(cleaned_brand))


def current_user() -> dict[str, Any] | None:
    user_id = session.get("user_id")
    if not user_id:
        return None
    return query_one(
        "SELECT id, name, role, two_factor_enabled AS twoFactorEnabled, created_at FROM users WHERE id = ?",
        (user_id,),
    )


def admin_required(handler):
    @wraps(handler)
    @auth_required
    def wrapped(*args, **kwargs):
        user = current_user()
        if not user or not is_admin_role(user.get("role")):
            return jsonify({"error": "Ação restrita a administradores."}), 403
        return handler(*args, **kwargs)

    return wrapped


def validate_password(password: str, username: str = "") -> str | None:
    normalized_password = password.strip().lower()
    weak_passwords = {"1234", "4321", "senha", "senha123", "password", "admin", "pulsefinance"}

    if len(password) < 8:
        return "A senha deve ter ao menos 8 caracteres."

    if normalized_password in weak_passwords:
        return "Escolha uma senha menos previsível."

    if username and normalized_password == username.strip().lower():
        return "A senha não pode ser igual ao nome do usuário."

    if not any(character.isupper() for character in password):
        return "A senha deve ter ao menos uma letra maiúscula."

    if not any(character.isdigit() for character in password):
        return "A senha deve ter ao menos um número."

    if not any(not character.isalnum() for character in password):
        return "A senha deve ter ao menos um símbolo."

    return None


def login_rate_limit_key(username: str) -> str:
    return f"{request.remote_addr or 'unknown'}:{username.lower()}"


def login_rate_limited(username: str) -> bool:
    now = time.monotonic()
    key = login_rate_limit_key(username)
    recent_attempts = [
        attempt
        for attempt in LOGIN_ATTEMPTS.get(key, [])
        if now - attempt < LOGIN_RATE_LIMIT_WINDOW_SECONDS
    ]
    LOGIN_ATTEMPTS[key] = recent_attempts
    return len(recent_attempts) >= LOGIN_RATE_LIMIT_ATTEMPTS


def record_failed_login(username: str) -> None:
    key = login_rate_limit_key(username)
    LOGIN_ATTEMPTS.setdefault(key, []).append(time.monotonic())


def clear_login_attempts(username: str) -> None:
    LOGIN_ATTEMPTS.pop(login_rate_limit_key(username), None)


def two_factor_rate_limit_key(user_id: int | str | None = None) -> str:
    pending_user_id = user_id or session.get("pending_2fa_user_id") or "unknown"
    return f"{request.remote_addr or 'unknown'}:{pending_user_id}"


def two_factor_rate_limited(user_id: int | str | None = None) -> bool:
    now = time.monotonic()
    key = two_factor_rate_limit_key(user_id)
    recent_attempts = [
        attempt
        for attempt in TWO_FACTOR_ATTEMPTS.get(key, [])
        if now - attempt < TWO_FACTOR_RATE_LIMIT_WINDOW_SECONDS
    ]
    TWO_FACTOR_ATTEMPTS[key] = recent_attempts
    return len(recent_attempts) >= TWO_FACTOR_RATE_LIMIT_ATTEMPTS


def record_failed_two_factor(user_id: int | str | None = None) -> None:
    key = two_factor_rate_limit_key(user_id)
    TWO_FACTOR_ATTEMPTS.setdefault(key, []).append(time.monotonic())


def clear_two_factor_attempts(user_id: int | str | None = None) -> None:
    TWO_FACTOR_ATTEMPTS.pop(two_factor_rate_limit_key(user_id), None)


def month_to_index(month: str) -> int:
    normalized = str(month or "").strip()
    if len(normalized) != 7 or normalized[4] != "-":
        return -1
    try:
        year = int(normalized[:4])
        month_number = int(normalized[5:7])
    except ValueError:
        return -1
    if not 1 <= month_number <= 12:
        return -1
    return year * 12 + month_number


def valid_month(month: str) -> bool:
    return month_to_index(month) >= 0


def fixed_expense_applies_to_month(fixed_expense: dict[str, Any], month: str) -> bool:
    start = month_to_index(effective_fixed_start_month(fixed_expense))
    target = month_to_index(month)
    if start < 0 or target < 0 or target < start:
        return False

    explicit_end = month_to_index(str(fixed_expense.get("endMonth") or "")) if fixed_expense.get("endMonth") else -1
    installments = effective_fixed_installments(fixed_expense)
    inferred_end = start + installments - 1 if installments > 1 else -1
    end = explicit_end if explicit_end >= 0 else inferred_end
    return end < 0 or target <= end


def expense_applies_to_month(expense: dict[str, Any], month: str) -> bool:
    start = month_to_index(effective_installment_start_month(
        str(expense.get("startMonth") or ""),
        str(expense.get("paymentMethod") or ""),
        int(expense.get("installments") or 1),
        str(expense.get("title") or ""),
    ))
    target = month_to_index(month)
    installments = effective_installment_count(
        str(expense.get("startMonth") or ""),
        str(expense.get("paymentMethod") or ""),
        int(expense.get("installments") or 1),
        str(expense.get("title") or ""),
    )
    return start >= 0 and target >= start and target < start + installments


def daily_expense_applies_to_month(daily_expense: dict[str, Any], month: str) -> bool:
    start = month_to_index(effective_installment_start_month(
        str(daily_expense.get("expenseDate") or "")[:7],
        str(daily_expense.get("paymentMethod") or ""),
        int(daily_expense.get("installments") or 1),
        str(daily_expense.get("title") or ""),
    ))
    target = month_to_index(month)
    installments = effective_installment_count(
        str(daily_expense.get("expenseDate") or "")[:7],
        str(daily_expense.get("paymentMethod") or ""),
        int(daily_expense.get("installments") or 1),
        str(daily_expense.get("title") or ""),
    )
    return start >= 0 and target >= start and target < start + installments


def card_month_committed_amount(card_id: int, month: str) -> float:
    fixed_total = sum(
        float(item.get("amount") or 0)
        for item in query_all(
            "SELECT amount, payment_method AS paymentMethod, start_month AS startMonth, end_month AS endMonth, installments "
            "FROM fixed_expenses WHERE card_id = ?",
            (card_id,),
        )
        if fixed_expense_applies_to_month(item, month)
    )
    recurring_total = sum(
        float(item.get("amount") or 0) / max(1, int(item.get("installments") or 1))
        for item in query_all(
            "SELECT title, amount, payment_method AS paymentMethod, start_month AS startMonth, installments "
            "FROM expenses WHERE card_id = ?",
            (card_id,),
        )
        if expense_applies_to_month(item, month)
    )
    daily_total = sum(
        float(item.get("amount") or 0) / max(1, int(item.get("installments") or 1))
        for item in query_all(
            "SELECT title, amount, payment_method AS paymentMethod, expense_date AS expenseDate, installments "
            "FROM daily_expenses WHERE card_id = ?",
            (card_id,),
        )
        if daily_expense_applies_to_month(item, month)
    )
    return fixed_total + recurring_total + daily_total


def cleanup_orphan_card_payments() -> None:
    payments = query_all("SELECT id, card_id AS cardId, month, amount FROM card_payments")
    orphan_ids: list[int] = []
    updates: list[tuple[float, int]] = []

    for payment in payments:
        payment_id = int(payment["id"])
        committed_amount = card_month_committed_amount(int(payment["cardId"]), str(payment["month"]))
        current_amount = float(payment.get("amount") or 0)
        if committed_amount <= 0:
            orphan_ids.append(payment_id)
            continue
        if current_amount > committed_amount + 0.005:
            updates.append((committed_amount, payment_id))

    if not orphan_ids and not updates:
        return

    if orphan_ids:
        get_db().executemany("DELETE FROM card_payments WHERE id = ?", [(payment_id,) for payment_id in orphan_ids])
    if updates:
        get_db().executemany("UPDATE card_payments SET amount = ?, created_at = CURRENT_TIMESTAMP WHERE id = ?", updates)
    get_db().commit()


def generate_totp_secret() -> str:
    return base64.b32encode(secrets.token_bytes(20)).decode("ascii").rstrip("=")


def totp_code(secret: str, timestep: int | None = None) -> str:
    counter = int(time.time() // 30) if timestep is None else timestep
    normalized_secret = secret.strip().replace(" ", "").upper()
    padding = "=" * (-len(normalized_secret) % 8)
    key = base64.b32decode(normalized_secret + padding)
    message = struct.pack(">Q", counter)
    digest = hmac.new(key, message, hashlib.sha1).digest()
    offset = digest[-1] & 0x0F
    value = struct.unpack(">I", digest[offset:offset + 4])[0] & 0x7FFFFFFF
    return f"{value % 1_000_000:06d}"


def verify_totp(secret: str | None, code: str, window: int = 1) -> bool:
    if not secret:
        return False

    normalized_code = "".join(character for character in str(code) if character.isdigit())
    if len(normalized_code) != 6:
        return False

    current_step = int(time.time() // 30)
    return any(
        hmac.compare_digest(totp_code(secret, current_step + offset), normalized_code)
        for offset in range(-window, window + 1)
    )


def totp_uri(username: str, secret: str) -> str:
    issuer = "Pulse Finance"
    label = f"{issuer}:{username}"
    return (
        "otpauth://totp/"
        f"{quote(label)}?secret={quote(secret)}&issuer={quote(issuer)}&algorithm=SHA1&digits=6&period=30"
    )


def qr_code_data_url(content: str) -> str:
    qr_image = qrcode.make(content)
    buffer = BytesIO()
    qr_image.save(buffer, format="PNG")
    encoded = base64.b64encode(buffer.getvalue()).decode("ascii")
    return f"data:image/png;base64,{encoded}"


def normalize_recovery_code(code: str) -> str:
    return str(code or "").strip().upper().replace(" ", "")


def generate_recovery_codes(total: int = 8) -> list[str]:
    return [f"{secrets.token_hex(4).upper()}-{secrets.token_hex(4).upper()}" for _ in range(total)]


def store_recovery_codes(user_id: int, codes: list[str]) -> None:
    get_db().execute("DELETE FROM recovery_codes WHERE user_id = ?", (user_id,))
    get_db().executemany(
        "INSERT INTO recovery_codes (user_id, code_hash) VALUES (?, ?)",
        [(user_id, generate_password_hash(normalize_recovery_code(code))) for code in codes],
    )
    get_db().commit()


def verify_recovery_code(user_id: int, code: str) -> bool:
    normalized_code = normalize_recovery_code(code)
    if not normalized_code:
        return False

    rows = get_db().execute(
        "SELECT id, code_hash FROM recovery_codes WHERE user_id = ? AND used_at IS NULL",
        (user_id,),
    ).fetchall()
    for row in rows:
        if check_password_hash(row["code_hash"], normalized_code):
            get_db().execute(
                "UPDATE recovery_codes SET used_at = CURRENT_TIMESTAMP WHERE id = ?",
                (row["id"],),
            )
            get_db().commit()
            return True

    return False


def verify_two_factor_or_recovery(user: dict[str, Any], code: str) -> tuple[bool, str | None]:
    if verify_totp(user.get("totp_secret"), code):
        return True, "totp"
    if verify_recovery_code(int(user["id"]), code):
        return True, "recovery_code"
    return False, None


def ensure_audit_log_table() -> None:
    get_db().execute(
        """
        CREATE TABLE IF NOT EXISTS audit_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            action TEXT NOT NULL,
            entity TEXT NOT NULL,
            entity_id TEXT,
            details TEXT,
            ip_address TEXT,
            user_agent TEXT,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
        )
        """
    )


def audit_action(action: str, entity: str, entity_id: int | str | None = None, details: str = "") -> None:
    user_id = session.get("user_id")
    ensure_audit_log_table()
    get_db().execute(
        "INSERT INTO audit_logs (user_id, action, entity, entity_id, details, ip_address, user_agent) "
        "VALUES (?, ?, ?, ?, ?, ?, ?)",
        (
            user_id,
            action,
            entity,
            str(entity_id) if entity_id is not None else None,
            details[:500],
            request.remote_addr,
            request.headers.get("User-Agent", "")[:255],
        ),
    )
    get_db().commit()


def ensure_column(connection: sqlite3.Connection, table: str, column: str, definition: str) -> None:
    columns = {
        row[1]
        for row in connection.execute(f"PRAGMA table_info({table})").fetchall()
    }
    if column not in columns:
        connection.execute(f"ALTER TABLE {table} ADD COLUMN {column} {definition}")


def auth_required(handler):
    @wraps(handler)
    def wrapped(*args, **kwargs):
        if not session.get("user_id"):
            return jsonify({"error": "Não autenticado"}), 401
        if not current_user():
            session.clear()
            return jsonify({"error": "Sessão inválida. Faça login novamente."}), 401
        return handler(*args, **kwargs)

    return wrapped


@app.before_request
def protect_csrf() -> tuple[Any, int] | None:
    if request.method not in {"POST", "PUT", "PATCH", "DELETE"}:
        return None

    if not request.path.startswith("/api/") or request.endpoint == "login":
        return None

    if not session.get("user_id"):
        return None

    expected_token = session.get("csrf_token")
    provided_token = request.headers.get("X-CSRF-Token", "")
    if not expected_token or not secrets.compare_digest(str(expected_token), provided_token):
        return jsonify({"error": "Token de segurança inválido. Atualize a página e tente novamente."}), 403

    return None


def serialize_dashboard() -> dict[str, Any]:
    cleanup_orphan_card_payments()
    user = current_user()
    security = serialize_account_security(user)
    assets = query_all(
        "SELECT id, name, type, brand, total_value AS totalValue, paid_value AS paidValue, created_at "
        "FROM assets ORDER BY created_at DESC"
    )
    for asset in assets:
        asset["brand"] = normalize_asset_brand(str(asset.get("brand") or ""))
    return {
        "currentUser": user,
        "accountSecurity": security,
        "runtimeInfo": runtime_info(),
        "systemConfig": {
            "trackingStartMonth": tracking_start_month(),
        },
        "csrfToken": csrf_token(),
        "users": query_all("SELECT id, name, role, created_at FROM users ORDER BY name"),
        "cards": query_all(
            "SELECT id, name, network, issuer, credit_limit AS `limit`, billing_day AS billingDay, created_at "
            "FROM cards ORDER BY created_at DESC"
        ),
        "expenses": query_all(
            "SELECT id, title, amount, category, payment_method AS paymentMethod, user_id AS memberId, card_id AS cardId, "
            "start_month AS startMonth, installments, created_at "
            "FROM expenses ORDER BY created_at DESC"
        ),
        "dailyExpenses": query_all(
            "SELECT id, expense_date AS expenseDate, title, amount, category, payment_method AS paymentMethod, "
            "user_id AS memberId, card_id AS cardId, installments, created_at "
            "FROM daily_expenses ORDER BY expense_date DESC, created_at DESC"
        ),
        "fixedExpenses": query_all(
            "SELECT id, title, amount, category, payment_method AS paymentMethod, user_id AS memberId, card_id AS cardId, "
            "start_month AS startMonth, end_month AS endMonth, installments, created_at "
            "FROM fixed_expenses ORDER BY created_at DESC"
        ),
        "investments": query_all(
            "SELECT id, name, amount, month, created_at FROM investments ORDER BY month DESC, created_at DESC"
        ),
        "incomes": query_all(
            "SELECT id, title, amount, month, income_day AS incomeDay, kind, user_id AS memberId, created_at "
            "FROM incomes ORDER BY month DESC, income_day ASC, created_at DESC"
        ),
        "incomeTithes": query_all(
            "SELECT month, percentage, created_at FROM income_tithes ORDER BY month DESC"
        ),
        "cardPayments": query_all(
            "SELECT id, card_id AS cardId, month, amount, created_at "
            "FROM card_payments ORDER BY month DESC, created_at DESC"
        ),
        "assets": assets,
    }


def serialize_account_security(user: dict[str, Any] | None) -> dict[str, Any]:
    if not user:
        return {
            "lastPasswordChangeAt": None,
            "recoveryCodesRemaining": 0,
            "recentLogins": [],
        }

    user_id = user["id"]
    password_change = query_one(
        "SELECT created_at AS lastPasswordChangeAt FROM audit_logs "
        "WHERE user_id = ? AND action = 'change_password' "
        "ORDER BY created_at DESC LIMIT 1",
        (user_id,),
    )
    recovery_codes_remaining = query_one(
        "SELECT COUNT(*) AS total FROM recovery_codes WHERE user_id = ? AND used_at IS NULL",
        (user_id,),
    )
    recent_logins = query_all(
        "SELECT action, details, ip_address AS ipAddress, user_agent AS userAgent, created_at "
        "FROM audit_logs WHERE user_id = ? AND action IN ('login', 'login_2fa') "
        "ORDER BY created_at DESC LIMIT 12",
        (user_id,),
    )
    return {
        "lastPasswordChangeAt": password_change["lastPasswordChangeAt"] if password_change else None,
        "recoveryCodesRemaining": int(recovery_codes_remaining["total"]) if recovery_codes_remaining else 0,
        "recentLogins": recent_logins,
    }


def seed_data() -> None:
    has_user = query_one("SELECT id FROM users LIMIT 1")
    if has_user:
        return

    admin_username = "admin"
    admin_password = os.environ.get("FINANCE_SEED_ADMIN_PASSWORD", "PulseFinance123!")

    if env_flag("FINANCE_PRODUCTION") and not os.environ.get("FINANCE_SEED_ADMIN_PASSWORD"):
        raise RuntimeError("Defina FINANCE_SEED_ADMIN_PASSWORD para iniciar um banco vazio em produção.")

    password_error = validate_password(admin_password, admin_username)
    if password_error:
        raise RuntimeError(f"Senha inicial inválida para {admin_username}: {password_error}")

    execute(
        "INSERT INTO users (name, role, password_hash) VALUES (?, ?, ?)",
        (admin_username, "Administrador", generate_password_hash(admin_password)),
    )


def init_db() -> None:
    ensure_runtime_directories()
    db = sqlite3.connect(DATABASE_PATH)
    db.executescript(
        """
        PRAGMA foreign_keys = ON;

        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            role TEXT NOT NULL,
            password_hash TEXT NOT NULL,
            two_factor_enabled INTEGER NOT NULL DEFAULT 0,
            totp_secret TEXT,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS cards (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            network TEXT NOT NULL,
            issuer TEXT,
            credit_limit REAL NOT NULL,
            billing_day INTEGER NOT NULL,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            amount REAL NOT NULL,
            category TEXT NOT NULL,
            payment_method TEXT NOT NULL DEFAULT 'Credito',
            user_id INTEGER NOT NULL,
            card_id INTEGER,
            start_month TEXT NOT NULL,
            installments INTEGER NOT NULL DEFAULT 1,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
            FOREIGN KEY (card_id) REFERENCES cards (id) ON DELETE SET NULL
        );

        CREATE TABLE IF NOT EXISTS investments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            amount REAL NOT NULL,
            month TEXT NOT NULL,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS incomes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            amount REAL NOT NULL,
            month TEXT NOT NULL,
            income_day INTEGER,
            kind TEXT NOT NULL,
            user_id INTEGER,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
        );

        CREATE TABLE IF NOT EXISTS income_tithes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            month TEXT NOT NULL UNIQUE,
            percentage REAL NOT NULL,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS card_payments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            card_id INTEGER NOT NULL,
            month TEXT NOT NULL,
            amount REAL NOT NULL,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(card_id, month),
            FOREIGN KEY (card_id) REFERENCES cards (id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS daily_expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            expense_date TEXT NOT NULL,
            title TEXT NOT NULL,
            amount REAL NOT NULL,
            category TEXT,
            payment_method TEXT NOT NULL,
            user_id INTEGER NOT NULL,
            card_id INTEGER,
            installments INTEGER NOT NULL DEFAULT 1,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
            FOREIGN KEY (card_id) REFERENCES cards (id) ON DELETE SET NULL
        );

        CREATE TABLE IF NOT EXISTS fixed_expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            amount REAL NOT NULL,
            category TEXT NOT NULL,
            payment_method TEXT NOT NULL DEFAULT 'Pix',
            user_id INTEGER NOT NULL,
            card_id INTEGER,
            start_month TEXT NOT NULL,
            end_month TEXT,
            installments INTEGER NOT NULL DEFAULT 1,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
            FOREIGN KEY (card_id) REFERENCES cards (id) ON DELETE SET NULL
        );

        CREATE TABLE IF NOT EXISTS assets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            type TEXT NOT NULL,
            brand TEXT,
            total_value REAL NOT NULL,
            paid_value REAL NOT NULL,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS audit_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            action TEXT NOT NULL,
            entity TEXT NOT NULL,
            entity_id TEXT,
            details TEXT,
            ip_address TEXT,
            user_agent TEXT,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
        );

        CREATE TABLE IF NOT EXISTS recovery_codes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            code_hash TEXT NOT NULL,
            used_at TEXT,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS app_settings (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL
        );
        """
    )
    ensure_column(db, "users", "two_factor_enabled", "INTEGER NOT NULL DEFAULT 0")
    ensure_column(db, "users", "totp_secret", "TEXT")
    ensure_column(db, "cards", "issuer", "TEXT")
    ensure_column(db, "assets", "brand", "TEXT")
    ensure_column(db, "expenses", "payment_method", "TEXT NOT NULL DEFAULT 'Credito'")
    ensure_column(db, "daily_expenses", "installments", "INTEGER NOT NULL DEFAULT 1")
    ensure_column(db, "daily_expenses", "category", "TEXT")
    ensure_column(db, "fixed_expenses", "payment_method", "TEXT NOT NULL DEFAULT 'Pix'")
    ensure_column(db, "fixed_expenses", "card_id", "INTEGER")
    ensure_column(db, "fixed_expenses", "installments", "INTEGER NOT NULL DEFAULT 1")
    db.commit()
    db.close()

    with app.app_context():
        seed_data()
        ensure_daily_backup()


@app.get("/")
def index():
    return send_from_directory(BASE_DIR, "index.html")


@app.get("/styles.css")
def styles():
    return send_from_directory(BASE_DIR, "styles.css")


@app.get("/app.js")
def script():
    return send_from_directory(BASE_DIR, "app.js")


@app.get("/assets/<path:filename>")
def assets(filename: str):
    if not filename.lower().endswith(".svg"):
        return jsonify({"error": "Arquivo não suportado."}), 404
    return send_from_directory(BASE_DIR / "assets", filename)


@app.get("/api/bootstrap")
def bootstrap():
    user = current_user()
    if not user:
        return jsonify({"authenticated": False})
    return jsonify({"authenticated": True, "data": serialize_dashboard()})


@app.get("/api/system/backup")
@auth_required
def download_backup():
    archive_bytes, archive_name = build_backup_archive()
    audit_action("export", "backup", archive_name)
    return send_file(
        archive_bytes,
        mimetype="application/zip",
        as_attachment=True,
        download_name=archive_name,
        max_age=0,
    )


@app.post("/api/login")
def login():
    payload = request.get_json(silent=True) or {}
    username = str(payload.get("username", "")).strip()
    password = str(payload.get("password", "")).strip()

    if login_rate_limited(username):
        return jsonify({"error": "Muitas tentativas de login. Aguarde alguns minutos e tente novamente."}), 429

    user = query_one("SELECT * FROM users WHERE lower(name) = lower(?)", (username,))

    if not user or not check_password_hash(user["password_hash"], password):
        record_failed_login(username)
        return jsonify({"error": "Usuário ou senha inválidos."}), 401

    clear_login_attempts(username)
    session.clear()

    if user.get("two_factor_enabled"):
        session["pending_2fa_user_id"] = user["id"]
        audit_action("login_2fa_required", "user", user["id"])
        return jsonify({"ok": True, "requiresTwoFactor": True})

    session["user_id"] = user["id"]
    csrf_token()
    audit_action("login", "user", user["id"])
    return jsonify({"ok": True, "data": serialize_dashboard()})


@app.post("/api/login/2fa")
def login_two_factor():
    pending_user_id = session.get("pending_2fa_user_id")
    if not pending_user_id:
        return jsonify({"error": "Sessão de verificação expirada. Faça login novamente."}), 401

    if two_factor_rate_limited(pending_user_id):
        return jsonify({"error": "Muitas tentativas de 2FA. Aguarde alguns minutos e tente novamente."}), 429

    payload = request.get_json(silent=True) or {}
    code = str(payload.get("code", "")).strip()
    user = query_one("SELECT * FROM users WHERE id = ?", (pending_user_id,))

    if not user or not user.get("two_factor_enabled"):
        session.clear()
        return jsonify({"error": "Verificação de 2FA indisponível."}), 401

    used_recovery_code = False
    verified = verify_totp(user.get("totp_secret"), code)
    if not verified:
        verified = verify_recovery_code(user["id"], code)
        used_recovery_code = verified

    if not verified:
        record_failed_two_factor(pending_user_id)
        return jsonify({"error": "Código de verificação inválido."}), 401

    clear_two_factor_attempts(pending_user_id)
    session.clear()
    session["user_id"] = user["id"]
    csrf_token()
    audit_action("login_2fa", "user", user["id"], "recovery_code" if used_recovery_code else "totp")
    return jsonify({"ok": True, "data": serialize_dashboard(), "usedRecoveryCode": used_recovery_code})


@app.post("/api/logout")
@auth_required
def logout():
    audit_action("logout", "user", session.get("user_id"))
    session.clear()
    return jsonify({"ok": True})


@app.get("/api/dashboard")
@auth_required
def dashboard():
    return jsonify(serialize_dashboard())


@app.post("/api/users")
@admin_required
def create_user():
    payload = request.get_json(silent=True) or {}
    name = str(payload.get("name", "")).strip()
    role = normalize_user_role(str(payload.get("role", "")).strip())
    password = str(payload.get("password", "")).strip()

    if not name or not password:
        return jsonify({"error": "Nome, perfil e senha são obrigatórios."}), 400

    if not role:
        return jsonify({"error": "Escolha um perfil válido: Administrador ou Financeiro."}), 400

    password_error = validate_password(password, name)
    if password_error:
        return jsonify({"error": password_error}), 400

    exists = query_one("SELECT id FROM users WHERE lower(name) = lower(?)", (name,))
    if exists:
        return jsonify({"error": "Já existe um usuário com esse nome."}), 409

    user_id = execute(
        "INSERT INTO users (name, role, password_hash) VALUES (?, ?, ?)",
        (name, role, generate_password_hash(password)),
    )
    audit_action("create", "user", user_id, f"role={role}")
    return jsonify({"ok": True, "data": serialize_dashboard()})


@app.put("/api/users/password")
@auth_required
def change_password():
    payload = request.get_json(silent=True) or {}
    current_password = str(payload.get("currentPassword", "")).strip()
    new_password = str(payload.get("newPassword", "")).strip()
    user = query_one("SELECT * FROM users WHERE id = ?", (session["user_id"],))

    if not user or not check_password_hash(user["password_hash"], current_password):
        return jsonify({"error": "Senha atual inválida."}), 400

    password_error = validate_password(new_password, user["name"] if user else "")
    if password_error:
        return jsonify({"error": password_error}), 400

    execute(
        "UPDATE users SET password_hash = ? WHERE id = ?",
        (generate_password_hash(new_password), session["user_id"]),
    )
    audit_action("change_password", "user", session["user_id"])
    return jsonify({"ok": True})


@app.post("/api/users/2fa/setup")
@auth_required
def setup_two_factor():
    user = query_one("SELECT * FROM users WHERE id = ?", (session["user_id"],))
    if not user:
        return jsonify({"error": "Usuário não encontrado."}), 404

    if user.get("two_factor_enabled"):
        return jsonify({"error": "A verificação em duas etapas já está ativa."}), 400

    secret = generate_totp_secret()
    session["pending_2fa_secret"] = secret
    audit_action("setup_started", "two_factor", session["user_id"])
    return jsonify({
        "ok": True,
        "secret": secret,
        "otpauthUri": totp_uri(user["name"], secret),
        "qrCodeDataUrl": qr_code_data_url(totp_uri(user["name"], secret)),
    })


@app.post("/api/users/2fa/enable")
@auth_required
def enable_two_factor():
    user = query_one("SELECT * FROM users WHERE id = ?", (session["user_id"],))
    if not user:
        return jsonify({"error": "Usuário não encontrado."}), 404

    if user.get("two_factor_enabled"):
        return jsonify({"error": "A verificação em duas etapas já está ativa."}), 400

    secret = session.get("pending_2fa_secret")
    payload = request.get_json(silent=True) or {}
    code = str(payload.get("code", "")).strip()

    if not secret:
        return jsonify({"error": "Inicie a configuração do 2FA antes de confirmar o código."}), 400

    if not verify_totp(str(secret), code):
        return jsonify({"error": "Código de verificação inválido."}), 400

    recovery_codes = generate_recovery_codes()
    store_recovery_codes(session["user_id"], recovery_codes)
    execute(
        "UPDATE users SET two_factor_enabled = 1, totp_secret = ? WHERE id = ?",
        (str(secret), session["user_id"]),
    )
    session.pop("pending_2fa_secret", None)
    audit_action("enable", "two_factor", session["user_id"])
    return jsonify({"ok": True, "recoveryCodes": recovery_codes, "data": serialize_dashboard()})


@app.post("/api/users/2fa/recovery-codes")
@auth_required
def regenerate_recovery_codes():
    payload = request.get_json(silent=True) or {}
    current_password = str(payload.get("currentPassword", "")).strip()
    code = str(payload.get("code", "")).strip()
    user = query_one("SELECT * FROM users WHERE id = ?", (session["user_id"],))

    if not user or not check_password_hash(user["password_hash"], current_password):
        return jsonify({"error": "Senha atual inválida."}), 400

    verified, method = verify_two_factor_or_recovery(user, code) if user.get("two_factor_enabled") else (False, None)
    if not verified:
        return jsonify({"error": "Código de 2FA inválido."}), 400

    recovery_codes = generate_recovery_codes()
    store_recovery_codes(session["user_id"], recovery_codes)
    audit_action("regenerate_recovery_codes", "two_factor", session["user_id"], method or "")
    return jsonify({"ok": True, "recoveryCodes": recovery_codes})


@app.delete("/api/users/2fa")
@auth_required
def disable_two_factor():
    payload = request.get_json(silent=True) or {}
    current_password = str(payload.get("currentPassword", "")).strip()
    code = str(payload.get("code", "")).strip()
    user = query_one("SELECT * FROM users WHERE id = ?", (session["user_id"],))

    if not user or not check_password_hash(user["password_hash"], current_password):
        return jsonify({"error": "Senha atual inválida."}), 400

    verified, method = verify_two_factor_or_recovery(user, code) if user.get("two_factor_enabled") else (False, None)
    if user.get("two_factor_enabled") and not verified:
        return jsonify({"error": "Código de 2FA inválido."}), 400

    execute(
        "UPDATE users SET two_factor_enabled = 0, totp_secret = NULL WHERE id = ?",
        (session["user_id"],),
    )
    get_db().execute("DELETE FROM recovery_codes WHERE user_id = ?", (session["user_id"],))
    get_db().commit()
    session.pop("pending_2fa_secret", None)
    audit_action("disable", "two_factor", session["user_id"], method or "")
    return jsonify({"ok": True, "data": serialize_dashboard()})


@app.delete("/api/users/<int:user_id>")
@admin_required
def delete_user(user_id: int):
    if user_id == session["user_id"]:
        return jsonify({"error": "Você não pode remover o usuário logado."}), 400

    total_users = query_one("SELECT COUNT(*) AS total FROM users")
    if total_users and total_users["total"] <= 1:
        return jsonify({"error": "O sistema precisa manter ao menos um usuário."}), 400

    execute("DELETE FROM users WHERE id = ?", (user_id,))
    audit_action("delete", "user", user_id)
    return jsonify({"ok": True, "data": serialize_dashboard()})


@app.post("/api/cards")
@auth_required
def create_card():
    payload = request.get_json(silent=True) or {}
    name = str(payload.get("name", "")).strip()
    network = str(payload.get("network", "")).strip()
    issuer = str(payload.get("issuer", "")).strip()
    limit_value = float(payload.get("limit", 0) or 0)
    billing_day = int(payload.get("billingDay", 0) or 0)

    if not name or not network or limit_value <= 0 or not 1 <= billing_day <= 31:
        return jsonify({"error": "Dados do cartão inválidos."}), 400

    card_id = execute(
        "INSERT INTO cards (name, network, issuer, credit_limit, billing_day) VALUES (?, ?, ?, ?, ?)",
        (name, network, issuer or None, limit_value, billing_day),
    )
    audit_action("create", "card", card_id, name)
    return jsonify({"ok": True, "data": serialize_dashboard()})


@app.put("/api/cards/<int:card_id>")
@auth_required
def update_card(card_id: int):
    payload = request.get_json(silent=True) or {}
    name = str(payload.get("name", "")).strip()
    network = str(payload.get("network", "")).strip()
    issuer = str(payload.get("issuer", "")).strip()
    limit_value = float(payload.get("limit", 0) or 0)
    billing_day = int(payload.get("billingDay", 0) or 0)

    if not name or not network or limit_value <= 0 or not 1 <= billing_day <= 31:
        return jsonify({"error": "Dados do cartão inválidos."}), 400

    exists = query_one("SELECT id FROM cards WHERE id = ?", (card_id,))
    if not exists:
        return jsonify({"error": "Cartão não encontrado."}), 404

    execute(
        "UPDATE cards SET name = ?, network = ?, issuer = ?, credit_limit = ?, billing_day = ? WHERE id = ?",
        (name, network, issuer or None, limit_value, billing_day, card_id),
    )
    audit_action("update", "card", card_id, name)
    return jsonify({"ok": True, "data": serialize_dashboard()})


@app.delete("/api/cards/<int:card_id>")
@auth_required
def delete_card(card_id: int):
    execute("DELETE FROM cards WHERE id = ?", (card_id,))
    audit_action("delete", "card", card_id)
    return jsonify({"ok": True, "data": serialize_dashboard()})


@app.post("/api/expenses")
@auth_required
def create_expense():
    payload = request.get_json(silent=True) or {}
    title = str(payload.get("title", "")).strip()
    amount = float(payload.get("amount", 0) or 0)
    category = str(payload.get("category", "")).strip()
    payment_method = str(payload.get("paymentMethod", "Credito") or "Credito").strip()
    member_id = int(payload.get("memberId", 0) or 0)
    card_id_value = payload.get("cardId")
    card_id = int(card_id_value) if str(card_id_value or "").strip() else None
    start_month = str(payload.get("startMonth", "")).strip()
    installments = int(payload.get("installments", 1) or 1)

    if not title or amount <= 0 or not category or payment_method not in PAYMENT_METHODS or member_id <= 0 or not valid_month(start_month) or not 1 <= installments <= 12:
        return jsonify({"error": "Dados do gasto inválidos."}), 400

    if payment_method.lower() == "credito" and not card_id:
        return jsonify({"error": "Selecione o cartão para um gasto no crédito."}), 400

    if payment_method.lower() != "credito":
        card_id = None

    if is_legacy_card_invoice_title(title):
        return jsonify({"error": "Não cadastre a fatura final como gasto mensal. Use o pagamento do cartão para registrar o valor que saiu da renda no mês."}), 400

    if duplicate_exists(
        "SELECT id FROM expenses WHERE lower(trim(title)) = lower(trim(?)) AND amount = ? AND category = ? AND payment_method = ? "
        "AND ifnull(user_id, 0) = ? AND ifnull(card_id, 0) = ? AND start_month = ? AND installments = ?",
        (title, amount, category, payment_method, member_id, card_id or 0, start_month, installments),
    ):
        return jsonify({"error": "Já existe um gasto mensal idêntico cadastrado."}), 400

    expense_id = execute(
        "INSERT INTO expenses (title, amount, category, payment_method, user_id, card_id, start_month, installments) "
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        (title, amount, category, payment_method, member_id, card_id, start_month, installments),
    )
    audit_action("create", "expense", expense_id, title)
    return jsonify({"ok": True, "data": serialize_dashboard()})


@app.delete("/api/expenses/<int:expense_id>")
@auth_required
def delete_expense(expense_id: int):
    execute("DELETE FROM expenses WHERE id = ?", (expense_id,))
    audit_action("delete", "expense", expense_id)
    return jsonify({"ok": True, "data": serialize_dashboard()})


@app.put("/api/expenses/<int:expense_id>")
@auth_required
def update_expense(expense_id: int):
    payload = request.get_json(silent=True) or {}
    title = str(payload.get("title", "")).strip()
    amount = float(payload.get("amount", 0) or 0)
    category = str(payload.get("category", "")).strip()
    payment_method = str(payload.get("paymentMethod", "Credito") or "Credito").strip()
    member_id = int(payload.get("memberId", 0) or 0)
    card_id_value = payload.get("cardId")
    card_id = int(card_id_value) if str(card_id_value or "").strip() else None
    start_month = str(payload.get("startMonth", "")).strip()
    installments = int(payload.get("installments", 1) or 1)

    if not title or amount <= 0 or not category or payment_method not in PAYMENT_METHODS or member_id <= 0 or not valid_month(start_month) or not 1 <= installments <= 12:
        return jsonify({"error": "Dados do gasto inválidos."}), 400

    exists = query_one("SELECT id FROM expenses WHERE id = ?", (expense_id,))
    if not exists:
        return jsonify({"error": "Gasto mensal não encontrado."}), 404

    if payment_method.lower() == "credito" and not card_id:
        return jsonify({"error": "Selecione o cartão para um gasto no crédito."}), 400

    if payment_method.lower() != "credito":
        card_id = None

    if is_legacy_card_invoice_title(title):
        return jsonify({"error": "Não cadastre a fatura final como gasto mensal. Use o pagamento do cartão para registrar o valor que saiu da renda no mês."}), 400

    duplicated = query_one(
        "SELECT id FROM expenses WHERE id != ? AND lower(trim(title)) = lower(trim(?)) AND amount = ? AND category = ? AND payment_method = ? "
        "AND ifnull(user_id, 0) = ? AND ifnull(card_id, 0) = ? AND start_month = ? AND installments = ?",
        (expense_id, title, amount, category, payment_method, member_id, card_id or 0, start_month, installments),
    )
    if duplicated:
        return jsonify({"error": "Já existe um gasto mensal idêntico cadastrado."}), 400

    execute(
        "UPDATE expenses SET title = ?, amount = ?, category = ?, payment_method = ?, user_id = ?, card_id = ?, start_month = ?, installments = ? "
        "WHERE id = ?",
        (title, amount, category, payment_method, member_id, card_id, start_month, installments, expense_id),
    )
    audit_action("update", "expense", expense_id, title)
    return jsonify({"ok": True, "data": serialize_dashboard()})


@app.post("/api/daily-expenses")
@auth_required
def create_daily_expense():
    payload = request.get_json(silent=True) or {}
    expense_date = str(payload.get("expenseDate", "")).strip()
    title = str(payload.get("title", "")).strip()
    amount = float(payload.get("amount", 0) or 0)
    category = str(payload.get("category", "")).strip()
    payment_method = str(payload.get("paymentMethod", "")).strip()
    member_id = int(payload.get("memberId", 0) or 0)
    card_id_value = payload.get("cardId")
    card_id = int(card_id_value) if str(card_id_value or "").strip() else None
    installments = int(payload.get("installments", 1) or 1)

    if not expense_date or not title or amount <= 0 or not category or payment_method not in PAYMENT_METHODS or member_id <= 0 or not 1 <= installments <= 12:
        return jsonify({"error": "Dados do gasto diário inválidos."}), 400

    if payment_method.lower() == "credito" and not card_id:
        return jsonify({"error": "Selecione o cartão para uma compra no crédito."}), 400

    if payment_method.lower() != "credito":
        card_id = None
        installments = 1

    if duplicate_exists(
        "SELECT id FROM daily_expenses WHERE expense_date = ? AND lower(trim(title)) = lower(trim(?)) AND amount = ? AND category = ? "
        "AND payment_method = ? AND ifnull(user_id, 0) = ? AND ifnull(card_id, 0) = ? AND installments = ?",
        (expense_date, title, amount, category, payment_method, member_id, card_id or 0, installments),
    ):
        return jsonify({"error": "Já existe uma compra diária idêntica cadastrada."}), 400

    daily_expense_id = execute(
        "INSERT INTO daily_expenses (expense_date, title, amount, category, payment_method, user_id, card_id, installments) "
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        (expense_date, title, amount, category, payment_method, member_id, card_id, installments),
    )
    audit_action("create", "daily_expense", daily_expense_id, title)
    return jsonify({"ok": True, "data": serialize_dashboard()})


@app.delete("/api/daily-expenses/<int:daily_expense_id>")
@auth_required
def delete_daily_expense(daily_expense_id: int):
    execute("DELETE FROM daily_expenses WHERE id = ?", (daily_expense_id,))
    audit_action("delete", "daily_expense", daily_expense_id)
    return jsonify({"ok": True, "data": serialize_dashboard()})


@app.put("/api/daily-expenses/<int:daily_expense_id>")
@auth_required
def update_daily_expense(daily_expense_id: int):
    payload = request.get_json(silent=True) or {}
    expense_date = str(payload.get("expenseDate", "")).strip()
    title = str(payload.get("title", "")).strip()
    amount = float(payload.get("amount", 0) or 0)
    category = str(payload.get("category", "")).strip()
    payment_method = str(payload.get("paymentMethod", "")).strip()
    member_id = int(payload.get("memberId", 0) or 0)
    card_id_value = payload.get("cardId")
    card_id = int(card_id_value) if str(card_id_value or "").strip() else None
    installments = int(payload.get("installments", 1) or 1)

    if not expense_date or not title or amount <= 0 or not category or payment_method not in PAYMENT_METHODS or member_id <= 0 or not 1 <= installments <= 12:
        return jsonify({"error": "Dados do gasto diário inválidos."}), 400

    exists = query_one("SELECT id FROM daily_expenses WHERE id = ?", (daily_expense_id,))
    if not exists:
        return jsonify({"error": "Gasto diário não encontrado."}), 404

    if payment_method.lower() == "credito" and not card_id:
        return jsonify({"error": "Selecione o cartão para uma compra no crédito."}), 400

    if payment_method.lower() != "credito":
        card_id = None
        installments = 1

    duplicated = query_one(
        "SELECT id FROM daily_expenses WHERE id != ? AND expense_date = ? AND lower(trim(title)) = lower(trim(?)) AND amount = ? AND category = ? "
        "AND payment_method = ? AND ifnull(user_id, 0) = ? AND ifnull(card_id, 0) = ? AND installments = ?",
        (daily_expense_id, expense_date, title, amount, category, payment_method, member_id, card_id or 0, installments),
    )
    if duplicated:
        return jsonify({"error": "Já existe uma compra diária idêntica cadastrada."}), 400

    execute(
        "UPDATE daily_expenses SET expense_date = ?, title = ?, amount = ?, category = ?, payment_method = ?, user_id = ?, card_id = ?, installments = ? "
        "WHERE id = ?",
        (expense_date, title, amount, category, payment_method, member_id, card_id, installments, daily_expense_id),
    )
    audit_action("update", "daily_expense", daily_expense_id, title)
    return jsonify({"ok": True, "data": serialize_dashboard()})


@app.post("/api/fixed-expenses")
@auth_required
def create_fixed_expense():
    payload = request.get_json(silent=True) or {}
    title = str(payload.get("title", "")).strip()
    amount = float(payload.get("amount", 0) or 0)
    category = str(payload.get("category", "")).strip()
    payment_method = str(payload.get("paymentMethod", "Pix") or "Pix").strip()
    member_id = int(payload.get("memberId", 0) or 0)
    card_id_value = payload.get("cardId")
    card_id = int(card_id_value) if str(card_id_value or "").strip() else None
    start_month = str(payload.get("startMonth", "")).strip()
    end_month = str(payload.get("endMonth", "")).strip() or None
    installments = int(payload.get("installments", 1) or 1)

    if not title or amount <= 0 or not category or payment_method not in PAYMENT_METHODS or member_id <= 0 or not valid_month(start_month) or not 1 <= installments <= 12:
        return jsonify({"error": "Dados do gasto fixo inválidos."}), 400

    if payment_method.lower() == "credito" and not card_id:
        return jsonify({"error": "Selecione o cartão para um gasto fixo no crédito."}), 400

    if end_month and not valid_month(end_month):
        return jsonify({"error": "O mês final do gasto fixo é inválido."}), 400

    if end_month and end_month < start_month:
        return jsonify({"error": "O mês final não pode ser anterior ao mês inicial."}), 400

    if payment_method.lower() != "credito":
        card_id = None

    if duplicate_exists(
        "SELECT id FROM fixed_expenses WHERE lower(trim(title)) = lower(trim(?)) AND amount = ? AND category = ? AND payment_method = ? "
        "AND ifnull(user_id, 0) = ? AND ifnull(card_id, 0) = ? AND start_month = ? AND ifnull(end_month, '') = ifnull(?, '') AND installments = ?",
        (title, amount, category, payment_method, member_id, card_id or 0, start_month, end_month, installments),
    ):
        return jsonify({"error": "Já existe um gasto fixo idêntico cadastrado."}), 400

    fixed_expense_id = execute(
        "INSERT INTO fixed_expenses (title, amount, category, payment_method, user_id, card_id, start_month, end_month, installments) "
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (title, amount, category, payment_method, member_id, card_id, start_month, end_month, installments),
    )
    audit_action("create", "fixed_expense", fixed_expense_id, title)
    return jsonify({"ok": True, "data": serialize_dashboard()})


@app.put("/api/fixed-expenses/<int:fixed_expense_id>")
@auth_required
def update_fixed_expense(fixed_expense_id: int):
    payload = request.get_json(silent=True) or {}
    title = str(payload.get("title", "")).strip()
    amount = float(payload.get("amount", 0) or 0)
    category = str(payload.get("category", "")).strip()
    payment_method = str(payload.get("paymentMethod", "Pix") or "Pix").strip()
    member_id = int(payload.get("memberId", 0) or 0)
    card_id_value = payload.get("cardId")
    card_id = int(card_id_value) if str(card_id_value or "").strip() else None
    start_month = str(payload.get("startMonth", "")).strip()
    end_month = str(payload.get("endMonth", "")).strip() or None
    installments = int(payload.get("installments", 1) or 1)

    if not title or amount <= 0 or not category or payment_method not in PAYMENT_METHODS or member_id <= 0 or not valid_month(start_month) or not 1 <= installments <= 12:
        return jsonify({"error": "Dados do gasto fixo inválidos."}), 400

    exists = query_one("SELECT id FROM fixed_expenses WHERE id = ?", (fixed_expense_id,))
    if not exists:
        return jsonify({"error": "Gasto fixo não encontrado."}), 404

    if payment_method.lower() == "credito" and not card_id:
        return jsonify({"error": "Selecione o cartão para um gasto fixo no crédito."}), 400

    if end_month and not valid_month(end_month):
        return jsonify({"error": "O mês final do gasto fixo é inválido."}), 400

    if end_month and end_month < start_month:
        return jsonify({"error": "O mês final não pode ser anterior ao mês inicial."}), 400

    if payment_method.lower() != "credito":
        card_id = None

    duplicated = query_one(
        "SELECT id FROM fixed_expenses WHERE id != ? AND lower(trim(title)) = lower(trim(?)) AND amount = ? AND category = ? AND payment_method = ? "
        "AND ifnull(user_id, 0) = ? AND ifnull(card_id, 0) = ? AND start_month = ? AND ifnull(end_month, '') = ifnull(?, '') AND installments = ?",
        (fixed_expense_id, title, amount, category, payment_method, member_id, card_id or 0, start_month, end_month, installments),
    )
    if duplicated:
        return jsonify({"error": "Já existe um gasto fixo idêntico cadastrado."}), 400

    execute(
        "UPDATE fixed_expenses SET title = ?, amount = ?, category = ?, payment_method = ?, user_id = ?, card_id = ?, start_month = ?, end_month = ?, installments = ? "
        "WHERE id = ?",
        (title, amount, category, payment_method, member_id, card_id, start_month, end_month, installments, fixed_expense_id),
    )
    audit_action("update", "fixed_expense", fixed_expense_id, title)
    return jsonify({"ok": True, "data": serialize_dashboard()})


@app.delete("/api/fixed-expenses/<int:fixed_expense_id>")
@auth_required
def delete_fixed_expense(fixed_expense_id: int):
    execute("DELETE FROM fixed_expenses WHERE id = ?", (fixed_expense_id,))
    audit_action("delete", "fixed_expense", fixed_expense_id)
    return jsonify({"ok": True, "data": serialize_dashboard()})


@app.post("/api/investments")
@auth_required
def create_investment():
    payload = request.get_json(silent=True) or {}
    name = str(payload.get("name", "")).strip()
    amount = float(payload.get("amount", 0) or 0)
    month = str(payload.get("month", "")).strip()

    if not name or amount <= 0 or not valid_month(month):
        return jsonify({"error": "Dados do investimento inválidos."}), 400

    investment_id = execute(
        "INSERT INTO investments (name, amount, month) VALUES (?, ?, ?)",
        (name, amount, month),
    )
    audit_action("create", "investment", investment_id, name)
    return jsonify({"ok": True, "data": serialize_dashboard()})


@app.post("/api/incomes")
@auth_required
def create_income():
    payload = request.get_json(silent=True) or {}
    title = str(payload.get("title", "")).strip()
    amount = float(payload.get("amount", 0) or 0)
    month = str(payload.get("month", "")).strip()
    member_id_value = payload.get("memberId")
    member_id = int(member_id_value) if str(member_id_value or "").strip() else None

    if not title or amount <= 0 or not valid_month(month):
        return jsonify({"error": "Dados da renda inválidos."}), 400

    if duplicate_exists(
        "SELECT id FROM incomes WHERE lower(trim(title)) = lower(trim(?)) AND amount = ? AND month = ? AND ifnull(user_id, 0) = ? AND kind = 'income'",
        (title, amount, month, member_id or 0),
    ):
        return jsonify({"error": "Já existe uma renda idêntica cadastrada neste mês."}), 400

    income_id = execute(
        "INSERT INTO incomes (title, amount, month, income_day, kind, user_id) VALUES (?, ?, ?, ?, ?, ?)",
        (title, amount, month, None, "income", member_id),
    )
    audit_action("create", "income", income_id, title)
    return jsonify({"ok": True, "data": serialize_dashboard()})


@app.put("/api/incomes/<int:income_id>")
@auth_required
def update_income(income_id: int):
    payload = request.get_json(silent=True) or {}
    title = str(payload.get("title", "")).strip()
    amount = float(payload.get("amount", 0) or 0)
    month = str(payload.get("month", "")).strip()
    member_id_value = payload.get("memberId")
    member_id = int(member_id_value) if str(member_id_value or "").strip() else None

    if not title or amount <= 0 or not valid_month(month):
        return jsonify({"error": "Dados da renda inválidos."}), 400

    exists = query_one("SELECT id FROM incomes WHERE id = ?", (income_id,))
    if not exists:
        return jsonify({"error": "Renda não encontrada."}), 404

    execute(
        "UPDATE incomes SET title = ?, amount = ?, month = ?, user_id = ? WHERE id = ?",
        (title, amount, month, member_id, income_id),
    )
    audit_action("update", "income", income_id, title)
    return jsonify({"ok": True, "data": serialize_dashboard()})


@app.put("/api/income-tithes/<month>")
@auth_required
def upsert_income_tithe(month: str):
    payload = request.get_json(silent=True) or {}
    percentage = float(payload.get("percentage", 0) or 0)

    if not valid_month(month):
        return jsonify({"error": "Mês inválido para o dízimo."}), 400

    if percentage < 0 or percentage > 100:
        return jsonify({"error": "A porcentagem do dízimo deve ficar entre 0 e 100."}), 400

    if percentage == 0:
        execute("DELETE FROM income_tithes WHERE month = ?", (month,))
        audit_action("delete", "income_tithe", month)
        return jsonify({"ok": True, "data": serialize_dashboard()})

    execute(
        "INSERT INTO income_tithes (month, percentage) VALUES (?, ?) "
        "ON CONFLICT(month) DO UPDATE SET percentage = excluded.percentage",
        (month, percentage),
    )
    audit_action("upsert", "income_tithe", month, f"percentage={percentage}")
    return jsonify({"ok": True, "data": serialize_dashboard()})


@app.put("/api/system-config/tracking-start-month")
@admin_required
def update_tracking_start_month():
    payload = request.get_json(silent=True) or {}
    month = str(payload.get("month", "")).strip()
    if month and not valid_month(month):
        return jsonify({"error": "O mês inicial do acompanhamento é inválido."}), 400
    set_app_setting("tracking_start_month", month or None)
    audit_action("upsert", "system_config", "tracking_start_month", month or "cleared")
    return jsonify({"ok": True, "data": serialize_dashboard()})


@app.delete("/api/incomes/<int:income_id>")
@auth_required
def delete_income(income_id: int):
    execute("DELETE FROM incomes WHERE id = ?", (income_id,))
    audit_action("delete", "income", income_id)
    return jsonify({"ok": True, "data": serialize_dashboard()})


@app.post("/api/card-payments")
@auth_required
def create_card_payment():
    payload = request.get_json(silent=True) or {}
    card_id = int(payload.get("cardId", 0) or 0)
    month = str(payload.get("month", "")).strip()
    amount = float(payload.get("amount", 0) or 0)

    if card_id <= 0 or not valid_month(month) or amount <= 0:
        return jsonify({"error": "Dados do pagamento do cartão inválidos."}), 400

    committed_amount = card_month_committed_amount(card_id, month)
    if committed_amount <= 0:
        execute("DELETE FROM card_payments WHERE card_id = ? AND month = ?", (card_id, month))
        return jsonify({"error": "Não há gastos deste cartão no mês para registrar pagamento."}), 400
    if amount > committed_amount + 0.005:
        return jsonify({"error": "O pagamento do cartão não pode ser maior do que o valor comprometido neste mês."}), 400

    execute(
        "INSERT INTO card_payments (card_id, month, amount) VALUES (?, ?, ?) "
        "ON CONFLICT(card_id, month) DO UPDATE SET amount = excluded.amount, created_at = CURRENT_TIMESTAMP",
        (card_id, month, amount),
    )
    audit_action("upsert", "card_payment", f"{card_id}:{month}", f"amount={amount}")
    return jsonify({"ok": True, "data": serialize_dashboard()})


@app.delete("/api/card-payments/<int:card_id>/<month>")
@auth_required
def delete_card_payment(card_id: int, month: str):
    execute("DELETE FROM card_payments WHERE card_id = ? AND month = ?", (card_id, month))
    audit_action("delete", "card_payment", f"{card_id}:{month}")
    return jsonify({"ok": True, "data": serialize_dashboard()})


@app.delete("/api/investments/<int:investment_id>")
@auth_required
def delete_investment(investment_id: int):
    execute("DELETE FROM investments WHERE id = ?", (investment_id,))
    audit_action("delete", "investment", investment_id)
    return jsonify({"ok": True, "data": serialize_dashboard()})


@app.post("/api/assets")
@auth_required
def create_asset():
    payload = request.get_json(silent=True) or {}
    name = str(payload.get("name", "")).strip()
    asset_type = str(payload.get("type", "")).strip()
    brand = normalize_asset_brand(str(payload.get("brand", "")))
    total_value = float(payload.get("totalValue", 0) or 0)
    paid_value = float(payload.get("paidValue", 0) or 0)

    if not name or not asset_type or total_value <= 0 or paid_value < 0:
        return jsonify({"error": "Dados do bem inválidos."}), 400

    if paid_value > total_value:
        return jsonify({"error": "O valor já pago não pode ser maior do que o valor total do bem."}), 400

    asset_id = execute(
        "INSERT INTO assets (name, type, brand, total_value, paid_value) VALUES (?, ?, ?, ?, ?)",
        (name, asset_type, brand or None, total_value, paid_value),
    )
    audit_action("create", "asset", asset_id, name)
    return jsonify({"ok": True, "data": serialize_dashboard()})


@app.put("/api/assets/<int:asset_id>")
@auth_required
def update_asset(asset_id: int):
    payload = request.get_json(silent=True) or {}
    name = str(payload.get("name", "")).strip()
    asset_type = str(payload.get("type", "")).strip()
    brand = normalize_asset_brand(str(payload.get("brand", "")))
    total_value = float(payload.get("totalValue", 0) or 0)
    paid_value = float(payload.get("paidValue", 0) or 0)

    if not name or not asset_type or total_value <= 0 or paid_value < 0:
        return jsonify({"error": "Dados do bem inválidos."}), 400

    if paid_value > total_value:
        return jsonify({"error": "O valor já pago não pode ser maior do que o valor total do bem."}), 400

    existing = query_one("SELECT id FROM assets WHERE id = ?", (asset_id,))
    if not existing:
        return jsonify({"error": "Bem não encontrado."}), 404

    execute(
        "UPDATE assets SET name = ?, type = ?, brand = ?, total_value = ?, paid_value = ? WHERE id = ?",
        (name, asset_type, brand or None, total_value, paid_value, asset_id),
    )
    audit_action("update", "asset", asset_id, name)
    return jsonify({"ok": True, "data": serialize_dashboard()})


@app.delete("/api/assets/<int:asset_id>")
@auth_required
def delete_asset(asset_id: int):
    execute("DELETE FROM assets WHERE id = ?", (asset_id,))
    audit_action("delete", "asset", asset_id)
    return jsonify({"ok": True, "data": serialize_dashboard()})


init_db()


def open_browser_when_ready(url: str) -> None:
    delay_seconds = float(os.environ.get("FINANCE_OPEN_BROWSER_DELAY", "1.25"))

    def _open() -> None:
        time.sleep(max(0.2, delay_seconds))
        webbrowser.open(url)

    threading.Thread(target=_open, daemon=True).start()


def run_server() -> None:
    host = os.environ.get("FINANCE_HOST", "127.0.0.1" if os.name == "nt" else "0.0.0.0").strip() or "127.0.0.1"
    port = DEFAULT_PORT
    desktop_mode = env_flag("FINANCE_DESKTOP") or getattr(sys, "frozen", False)

    if desktop_mode and env_flag("FINANCE_OPEN_BROWSER", True):
        open_browser_when_ready(f"http://127.0.0.1:{port}")

    if desktop_mode or env_flag("FINANCE_USE_WAITRESS", True):
        serve(app, host=host, port=port, threads=8)
        return

    app.run(host=host, port=port, debug=env_flag("FINANCE_DEBUG"))


if __name__ == "__main__":
    run_server()
