const monthFormatter = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" });
const currencyFormatter = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const moneyInputFormatter = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const loginScreen = document.getElementById("loginScreen");
const appScreen = document.getElementById("appScreen");
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");
const twoFactorLoginForm = document.getElementById("twoFactorLoginForm");
const twoFactorBackButton = document.getElementById("twoFactorBackButton");
const passwordForm = document.getElementById("passwordForm");
const passwordMessage = document.getElementById("passwordMessage");
const passwordStatusBadge = document.getElementById("passwordStatusBadge");
const newPasswordInput = document.getElementById("newPassword");
const confirmNewPasswordInput = document.getElementById("confirmNewPassword");
const passwordStrengthBar = document.getElementById("passwordStrengthBar");
const passwordStrengthLabel = document.getElementById("passwordStrengthLabel");
const passwordRequirements = Array.from(document.querySelectorAll("#passwordRequirements [data-rule]"));
const twoFactorStatus = document.getElementById("twoFactorStatus");
const twoFactorStatusBadge = document.getElementById("twoFactorStatusBadge");
const twoFactorSetupButton = document.getElementById("twoFactorSetupButton");
const twoFactorSetupPanel = document.getElementById("twoFactorSetupPanel");
const twoFactorQrPanel = document.getElementById("twoFactorQrPanel");
const twoFactorQrImage = document.getElementById("twoFactorQrImage");
const twoFactorManualSecret = document.getElementById("twoFactorManualSecret");
const twoFactorOtpUri = document.getElementById("twoFactorOtpUri");
const twoFactorEnableForm = document.getElementById("twoFactorEnableForm");
const twoFactorDisableForm = document.getElementById("twoFactorDisableForm");
const twoFactorRecoveryForm = document.getElementById("twoFactorRecoveryForm");
const twoFactorDisableButton = document.getElementById("twoFactorDisableButton");
const twoFactorDisableTooltip = document.getElementById("twoFactorDisableTooltip");
const twoFactorRecoveryButton = document.getElementById("twoFactorRecoveryButton");
const twoFactorRecoveryTooltip = document.getElementById("twoFactorRecoveryTooltip");
const twoFactorRecoveryPanel = document.getElementById("twoFactorRecoveryPanel");
const twoFactorRecoveryCodes = document.getElementById("twoFactorRecoveryCodes");
const twoFactorMessage = document.getElementById("twoFactorMessage");
const recoveryCodesSummary = document.getElementById("recoveryCodesSummary");
const recoveryCodesBadge = document.getElementById("recoveryCodesBadge");
const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileSidebarClose = document.getElementById("mobileSidebarClose");
const mobileSidebarBackdrop = document.getElementById("mobileSidebarBackdrop");
const appSidebar = document.getElementById("appSidebar");
const monthPicker = document.getElementById("monthPicker");
const monthPickerButton = document.getElementById("monthPickerButton");
const monthPickerLabel = document.getElementById("monthPickerLabel");
const monthPopover = document.getElementById("monthPopover");
const monthCurrentYear = document.getElementById("monthCurrentYear");
const monthGrid = document.getElementById("monthGrid");
const monthPrevYear = document.getElementById("monthPrevYear");
const monthNextYear = document.getElementById("monthNextYear");
const monthTodayButton = document.getElementById("monthTodayButton");
const monthClearButton = document.getElementById("monthClearButton");
const toggleAmountsButton = document.getElementById("toggleAmountsButton");
const heroEyebrow = document.getElementById("heroEyebrow");
const heroGreeting = document.getElementById("heroGreeting");
const heroInsight = document.getElementById("heroInsight");
const overviewAlertsPanel = document.getElementById("overviewAlertsPanel");
const statsGrid = document.getElementById("statsGrid");
const overviewMonthLabel = document.getElementById("overviewMonthLabel");
const overviewMonthMeta = document.getElementById("overviewMonthMeta");
const overviewSummaryGrid = document.getElementById("overviewSummaryGrid");
const overviewBalanceValue = document.getElementById("overviewBalanceValue");
const accountsOverviewList = document.getElementById("accountsOverviewList");
const invoiceMonthLabel = document.getElementById("invoiceMonthLabel");
const overviewInvoiceValue = document.getElementById("overviewInvoiceValue");
const invoiceCardsList = document.getElementById("invoiceCardsList");
const analyticsSummaryGrid = document.getElementById("analyticsSummaryGrid");
const analyticsTrendChart = document.getElementById("analyticsTrendChart");
const analyticsTrendMeta = document.getElementById("analyticsTrendMeta");
const analyticsTrendTitle = document.getElementById("analyticsTrendTitle");
const analyticsInsightTitle = document.getElementById("analyticsInsightTitle");
const analyticsCategoryDonut = document.getElementById("analyticsCategoryDonut");
const analyticsCategoryChart = document.getElementById("analyticsCategoryChart");
const analyticsHighlights = document.getElementById("analyticsHighlights");
const analyticsNarrative = document.getElementById("analyticsNarrative");
const overviewBalanceToggle = document.getElementById("overviewBalanceToggle");
const overviewInvoiceToggle = document.getElementById("overviewInvoiceToggle");
const memberForm = document.getElementById("memberForm");
const memberAdminCard = document.getElementById("memberAdminCard");
const memberMessage = document.getElementById("memberMessage");
const memberPanelMeta = document.getElementById("memberPanelMeta");
const trackingStartCard = document.getElementById("trackingStartCard");
const trackingStartForm = document.getElementById("trackingStartForm");
const trackingStartMessage = document.getElementById("trackingStartMessage");
const cardForm = document.getElementById("cardForm");
const cardFormTitle = document.getElementById("cardFormTitle");
const cardFormNote = document.getElementById("cardFormNote");
const cardFormSubmit = document.getElementById("cardFormSubmit");
const cardFormCancel = document.getElementById("cardFormCancel");
const expenseForm = document.getElementById("expenseForm");
const expenseFormTitle = document.getElementById("expenseFormTitle");
const expenseFormNote = document.getElementById("expenseFormNote");
const expenseFormSubmit = document.getElementById("expenseFormSubmit");
const expenseFormCancel = document.getElementById("expenseFormCancel");
const fixedExpenseForm = document.getElementById("fixedExpenseForm");
const fixedExpenseFormTitle = document.getElementById("fixedExpenseFormTitle");
const fixedExpenseFormNote = document.getElementById("fixedExpenseFormNote");
const fixedExpenseFormSubmit = document.getElementById("fixedExpenseFormSubmit");
const fixedExpenseFormCancel = document.getElementById("fixedExpenseFormCancel");
const dailyExpenseForm = document.getElementById("dailyExpenseForm");
const dailyExpenseFormTitle = document.getElementById("dailyExpenseFormTitle");
const dailyExpenseFormNote = document.getElementById("dailyExpenseFormNote");
const dailyExpenseFormSubmit = document.getElementById("dailyExpenseFormSubmit");
const dailyExpenseFormCancel = document.getElementById("dailyExpenseFormCancel");
const incomeForm = document.getElementById("incomeForm");
const incomeFormTitle = document.getElementById("incomeFormTitle");
const incomeFormNote = document.getElementById("incomeFormNote");
const incomeFormSubmit = document.getElementById("incomeFormSubmit");
const incomeFormCancel = document.getElementById("incomeFormCancel");
const incomeTitheForm = document.getElementById("incomeTitheForm");
const incomeTitheEnabled = document.getElementById("incomeTitheEnabled");
const incomeTithePercentage = document.getElementById("incomeTithePercentage");
const incomeTitheMonthLabel = document.getElementById("incomeTitheMonthLabel");
const incomeTitheStatus = document.getElementById("incomeTitheStatus");
const investmentForm = document.getElementById("investmentForm");
const assetForm = document.getElementById("assetForm");
const assetFormTitle = document.getElementById("assetFormTitle");
const assetFormNote = document.getElementById("assetFormNote");
const assetFormSubmit = document.getElementById("assetFormSubmit");
const assetFormCancel = document.getElementById("assetFormCancel");
const assetTypeSelect = document.getElementById("assetTypeSelect");
const assetBrandInput = document.getElementById("assetBrandInput");
const assetBrandPickerField = document.getElementById("assetBrandPickerField");
const assetBrandPicker = document.getElementById("assetBrandPicker");
const assetBrandManualField = document.getElementById("assetBrandManualField");
const assetBrandManualInput = document.getElementById("assetBrandManualInput");
const memberList = document.getElementById("memberList");
const cardList = document.getElementById("cardList");
const expenseList = document.getElementById("expenseList");
const fixedExpenseList = document.getElementById("fixedExpenseList");
const dailyExpenseList = document.getElementById("dailyExpenseList");
const incomeList = document.getElementById("incomeList");
const investmentList = document.getElementById("investmentList");
const assetList = document.getElementById("assetList");
const alertsList = document.getElementById("alertsList");
const expenseMemberSelect = document.getElementById("expenseMemberSelect");
const expenseCardSelect = document.getElementById("expenseCardSelect");
const expensePaymentMethod = document.getElementById("expensePaymentMethod");
const expenseCardField = document.getElementById("expenseCardField");
const fixedExpenseMemberSelect = document.getElementById("fixedExpenseMemberSelect");
const fixedExpensePaymentMethod = document.getElementById("fixedExpensePaymentMethod");
const fixedExpenseCardSelect = document.getElementById("fixedExpenseCardSelect");
const fixedExpenseCardField = document.getElementById("fixedExpenseCardField");
const dailyExpenseMemberSelect = document.getElementById("dailyExpenseMemberSelect");
const dailyExpensePaymentMethod = document.getElementById("dailyExpensePaymentMethod");
const dailyExpenseCardSelect = document.getElementById("dailyExpenseCardSelect");
const dailyCardField = document.getElementById("dailyCardField");
const incomeMemberSelect = document.getElementById("incomeMemberSelect");
const dailyInstallmentsInput = document.getElementById("dailyInstallmentsInput");
const dailyInstallmentsField = document.getElementById("dailyInstallmentsField");
const logoutButton = document.getElementById("logoutButton");
const appNav = document.getElementById("appNav");
const cardsSummaryGrid = document.getElementById("cardsSummaryGrid");
const cardPressureSummary = document.getElementById("cardPressureSummary");
const cardPressureList = document.getElementById("cardPressureList");
const fixedSummaryGrid = document.getElementById("fixedSummaryGrid");
const monthlySummaryGrid = document.getElementById("monthlySummaryGrid");
const dailySummaryGrid = document.getElementById("dailySummaryGrid");
const incomeSummaryGrid = document.getElementById("incomeSummaryGrid");
const investmentsSummaryGrid = document.getElementById("investmentsSummaryGrid");
const wealthSummaryGrid = document.getElementById("wealthSummaryGrid");
const accessSummaryGrid = document.getElementById("accessSummaryGrid");
const recentActivityList = document.getElementById("recentActivityList");
const recentActivityToggle = document.getElementById("recentActivityToggle");
const backupStorageMeta = document.getElementById("backupStorageMeta");
const backupRetentionMeta = document.getElementById("backupRetentionMeta");
const backupDataButton = document.getElementById("backupDataButton");
const backupDataMessage = document.getElementById("backupDataMessage");
const appVersionMeta = document.getElementById("appVersionMeta");
const updateFlowMeta = document.getElementById("updateFlowMeta");
const openUpdatePageButton = document.getElementById("openUpdatePageButton");
const openReleaseNotesButton = document.getElementById("openReleaseNotesButton");
const updateActionMessage = document.getElementById("updateActionMessage");
const cardBrandAssets = {
  mastercard: "/assets/mastercard.svg",
  visa: "/assets/visa.svg",
  elo: "/assets/elo.svg",
  nubank: "/assets/nubank.svg"
};
const assetBrandCatalog = {
  audi: { label: "Audi", asset: "/assets/audi.svg" },
  bmw: { label: "BMW", asset: "/assets/bmw.svg" },
  byd: { label: "BYD", asset: "/assets/byd.svg" },
  chevrolet: { label: "Chevrolet", asset: "/assets/chevrolet.svg" },
  citroen: { label: "Citroen", asset: "/assets/citroen.svg" },
  fiat: { label: "Fiat", asset: "/assets/fiat.svg" },
  honda: { label: "Honda", asset: "/assets/honda.svg" },
  peugeot: { label: "Peugeot", asset: "/assets/peugeot.svg" },
  renault: { label: "Renault", asset: "/assets/renault.svg" },
  toyota: { label: "Toyota", asset: "/assets/toyota.svg" },
  volkswagen: { label: "Volkswagen", asset: "/assets/volkswagen.svg" }
};
const assetBrandAliases = {
  audi: "audi",
  bmw: "bmw",
  byd: "byd",
  chevrolet: "chevrolet",
  chevy: "chevrolet",
  citroen: "citroen",
  fiat: "fiat",
  honda: "honda",
  peugeot: "peugeot",
  renault: "renault",
  toyota: "toyota",
  volks: "volkswagen",
  volkswagen: "volkswagen",
  wolkswagen: "volkswagen",
  wolsgwagem: "volkswagen",
  wolsvagem: "volkswagen",
  vw: "volkswagen"
};
const vehicleAssetTypes = new Set(["Carro", "Moto"]);

const today = new Date();
const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;

let state = {
  currentUser: null,
  accountSecurity: { lastPasswordChangeAt: null, recoveryCodesRemaining: 0, recentLogins: [] },
  runtimeInfo: { dataDirectory: "", databasePath: "", backupDirectory: "", backupRetentionDays: 30, availableBackups: 0, lastBackupFile: null },
  systemConfig: { trackingStartMonth: null },
  csrfToken: null,
  users: [],
  cards: [],
  expenses: [],
  fixedExpenses: [],
  dailyExpenses: [],
  incomes: [],
  incomeTithes: [],
  cardPayments: [],
  investments: [],
  assets: []
};
let selectedMonth = currentMonth;
let activeTab = "cards";
let showAmounts = true;
let monthPickerYear = Number(currentMonth.slice(0, 4));
let editingCardId = null;
let editingExpenseId = null;
let editingFixedExpenseId = null;
let editingDailyExpenseId = null;
let editingIncomeId = null;
let editingAssetId = null;
let mobileSidebarOpen = false;
let lastFocusedBeforeSidebar = null;
let awaitingTwoFactor = false;
let recentActivityExpanded = false;
let kpiResizeTimeoutId = 0;

const tabMeta = {
  overview: {
    eyebrow: "Visão geral",
    title: () => `${currentGreeting()}, ${state.currentUser?.name || "usuário"}!`,
    insight: () => `Em ${formatMonth(selectedMonth)}, você acompanha ${displayAmount(monthSpent(selectedMonth))} em despesas ativas e ${displayAmount(cumulativeInvestments(selectedMonth))} já investidos no período.`
  },
  analytics: {
    eyebrow: "Análise mensal",
    title: () => "Painel analítico mensal",
    insight: () => `Em ${formatMonth(selectedMonth)}, o sistema compara a evolução dos gastos, o peso sobre a renda e os principais focos de pressão do orçamento.`
  },
  cards: {
    eyebrow: "Cartões",
    title: () => "Cartões",
    insight: () => `${state.cards.length} cartões cadastrados com ${displayAmount(totalCardLimit())} de limite total para ${formatMonth(selectedMonth)}.`
  },
  "card-pressure": {
    eyebrow: "Limite de gastos",
    title: () => "Limite dos cartões",
    insight: () => `${displayAmount(totalCardCommitted(selectedMonth))} já comprometidos nos cartões em ${formatMonth(selectedMonth)}.`
  },
  fixed: {
    eyebrow: "Gastos fixos",
    title: () => "Gastos fixos",
    insight: () => `${displayAmount(monthFixedExpenseTotal(selectedMonth))} em contas fixas abatendo da renda de ${formatMonth(selectedMonth)}.`
  },
  monthly: {
    eyebrow: "Gastos mensais",
    title: () => "Gastos mensais",
    insight: () => `${monthExpenses(selectedMonth).length} lançamentos mensais ativos em ${formatMonth(selectedMonth)}.`
  },
  daily: {
    eyebrow: "Gastos diários",
    title: () => "Gastos diários",
    insight: () => `${monthDailyExpenses(selectedMonth).length} compras do dia registradas em ${formatMonth(selectedMonth)}.`
  },
  income: {
    eyebrow: "Salário e renda",
    title: () => "Salário e renda",
    insight: () => `${displayAmount(monthGrossIncomeTotal(selectedMonth))} em rendas brutas no mês, com ${displayAmount(monthTitheAmount(selectedMonth))} separados como dízimo e ${displayAmount(monthIncomeTotal(selectedMonth))} disponíveis para viver.`
  },
  investments: {
    eyebrow: "Investimentos",
    title: () => "Investimentos",
    insight: () => `${displayAmount(monthlyInvestments(selectedMonth))} investidos em ${formatMonth(selectedMonth)} e ${displayAmount(cumulativeInvestments(selectedMonth))} no acumulado.`
  },
  wealth: {
    eyebrow: "Patrimônio",
    title: () => "Patrimônio",
    insight: () => `${displayAmount(totalAssetPaid())} já pagos e ${displayAmount(totalAssetRemaining())} ainda restantes nos bens cadastrados.`
  },
  access: {
    eyebrow: "Segurança da conta",
    title: () => "Segurança da conta",
    insight: () => `${state.users.length} usuários cadastrados com proteção de senha, 2FA e leitura recente de acessos.`
  }
};

function formatCurrency(value) {
  return currencyFormatter.format(Number(value || 0));
}

function formatOverflowSafeCompactCurrency(value) {
  const amount = Number(value || 0);
  const sign = amount < 0 ? "-" : "";
  const absolute = Math.abs(amount);
  if (absolute >= 1_000_000) {
    return `${sign}R$ ${(absolute / 1_000_000).toFixed(1).replace(".", ",")} mi`;
  }
  if (absolute >= 10_000) {
    return `${sign}R$ ${Math.round(absolute / 1_000)} mil`;
  }
  return formatCurrency(amount);
}

function formatDonutCenterCompactCurrency(value) {
  const amount = Number(value || 0);
  const sign = amount < 0 ? "-" : "";
  const absolute = Math.abs(amount);
  if (absolute >= 1_000_000) {
    return `${sign}R$ ${(absolute / 1_000_000).toFixed(1).replace(".", ",")} mi`;
  }
  if (absolute >= 100_000) {
    return `${sign}R$ ${Math.round(absolute / 1_000)} mil`;
  }
  return formatCurrency(amount);
}

function integerToPortugueseWords(value) {
  const units = ["zero", "um", "dois", "tres", "quatro", "cinco", "seis", "sete", "oito", "nove"];
  const teens = ["dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
  const tens = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
  const hundreds = ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];

  function belowThousand(number) {
    if (number === 0) return "";
    if (number < 10) return units[number];
    if (number < 20) return teens[number - 10];
    if (number < 100) {
      const ten = Math.floor(number / 10);
      const remainder = number % 10;
      return remainder ? `${tens[ten]} e ${belowThousand(remainder)}` : tens[ten];
    }
    if (number === 100) return "cem";
    const hundred = Math.floor(number / 100);
    const remainder = number % 100;
    return remainder ? `${hundreds[hundred]} e ${belowThousand(remainder)}` : hundreds[hundred];
  }

  function segment(number, divisor, singular, plural) {
    const amount = Math.floor(number / divisor);
    if (!amount) return { text: "", remainder: number };
    const prefix = amount === 1 && divisor === 1000 ? "mil" : `${belowThousand(amount)} ${amount === 1 ? singular : plural}`;
    return { text: prefix, remainder: number % divisor };
  }

  if (value === 0) return "zero";

  let remainder = Math.abs(Math.trunc(value));
  const parts = [];

  const millions = segment(remainder, 1000000, "milhao", "milhoes");
  if (millions.text) {
    parts.push(millions.text);
    remainder = millions.remainder;
  }

  const thousands = segment(remainder, 1000, "mil", "mil");
  if (thousands.text) {
    parts.push(thousands.text);
    remainder = thousands.remainder;
  }

  if (remainder) {
    parts.push(belowThousand(remainder));
  }

  const joined = parts.join(parts.length > 1 ? ", " : "");
  return value < 0 ? `menos ${joined}` : joined;
}

function moneyAriaLabel(value) {
  const amount = Number(value || 0);
  const absolute = Math.abs(amount);
  const reais = Math.floor(absolute);
  const cents = Math.round((absolute - reais) * 100);
  const reaisLabel = `${integerToPortugueseWords(reais)} ${reais === 1 ? "real" : "reais"}`;
  const centsLabel = cents ? ` e ${integerToPortugueseWords(cents)} ${cents === 1 ? "centavo" : "centavos"}` : "";
  return `${amount < 0 ? "menos " : ""}${reaisLabel}${centsLabel}`;
}

function kpiCurrencyContent(value) {
  const full = formatCurrency(value);
  return {
    display: full,
    full,
    aria: moneyAriaLabel(value),
    compact: false
  };
}

let kpiOverflowRafId = 0;

function applyResponsiveKpiValues() {
  if (kpiOverflowRafId) {
    cancelAnimationFrame(kpiOverflowRafId);
  }
  kpiOverflowRafId = requestAnimationFrame(() => {
    document.querySelectorAll("[data-kpi-amount]").forEach((node) => {
      const element = node instanceof HTMLElement ? node : null;
      if (!element) return;
      const fullValue = element.dataset.kpiFullValue || element.textContent || "";
      const rawValue = Number(element.dataset.kpiAmount || 0);
      element.textContent = fullValue;
      element.setAttribute("title", fullValue);
      if (element.dataset.kpiPreserveFull === "true") {
        return;
      }
      if (element.scrollWidth > element.clientWidth) {
        element.textContent = formatOverflowSafeCompactCurrency(rawValue);
      }
    });

    document.querySelectorAll("[data-donut-amount]").forEach((node) => {
      const element = node instanceof HTMLElement ? node : null;
      if (!element) return;
      const fullValue = element.dataset.donutFullValue || element.textContent || "";
      const rawValue = Number(element.dataset.donutAmount || 0);
      element.textContent = fullValue;
      element.setAttribute("title", fullValue);
      const parentWidth = element.parentElement?.clientWidth || element.clientWidth;
      if (element.scrollWidth > parentWidth) {
        element.textContent = formatDonutCenterCompactCurrency(rawValue);
      }
    });
  });
}

function scheduleResponsiveKpiValues() {
  if (kpiResizeTimeoutId) {
    clearTimeout(kpiResizeTimeoutId);
  }
  kpiResizeTimeoutId = window.setTimeout(() => {
    applyResponsiveKpiValues();
  }, 120);
}

function formatMoneyInput(value) {
  return moneyInputFormatter.format(Number(value || 0));
}

function parseMoneyValue(rawValue) {
  const raw = String(rawValue ?? "").trim();
  if (!raw) return 0;

  const sanitized = raw.replace(/\s+/g, "");

  if (sanitized.includes(",") && sanitized.includes(".")) {
    return Number(sanitized.replace(/\./g, "").replace(",", "."));
  }

  if (sanitized.includes(",")) {
    return Number(sanitized.replace(/\./g, "").replace(",", "."));
  }

  const dotCount = (sanitized.match(/\./g) || []).length;
  if (dotCount > 1) {
    return Number(sanitized.replace(/\./g, ""));
  }

  if (dotCount === 1) {
    const [left, right] = sanitized.split(".");
    if ((right || "").length === 3) {
      return Number(`${left}${right}`);
    }
  }

  return Number(sanitized);
}

function setMoneyInputValue(input, value) {
  if (!input) return;
  input.value = value || Number(value) === 0 ? formatMoneyInput(value) : "";
}

function normalizeLookupKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "");
}

function titleCaseLabel(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function normalizedAssetBrandKey(brand) {
  const directKey = normalizeLookupKey(brand);
  return assetBrandAliases[directKey] || directKey;
}

function normalizedAssetBrandLabel(brand) {
  const normalizedKey = normalizedAssetBrandKey(brand);
  if (assetBrandCatalog[normalizedKey]?.label) {
    return assetBrandCatalog[normalizedKey].label;
  }
  return titleCaseLabel(brand);
}

function assetBrandOptions() {
  return Object.entries(assetBrandCatalog).map(([key, config]) => ({
    key,
    label: config.label,
    asset: config.asset
  }));
}

function selectedAssetBrand() {
  return normalizedAssetBrandLabel(assetBrandInput?.value || "");
}

function renderAssetBrandPicker() {
  if (!assetBrandPicker) return;
  const selectedLabel = selectedAssetBrand();
  assetBrandPicker.innerHTML = assetBrandOptions().map(({ key, label, asset }) => `
    <button
      type="button"
      class="asset-brand-option ${selectedLabel === label ? "selected" : ""}"
      data-asset-brand="${key}"
      role="option"
      aria-selected="${selectedLabel === label ? "true" : "false"}"
    >
      <img class="asset-brand-option-logo ${brandClassName(key)}" src="${asset}" alt="${escapeHtml(label)}">
    </button>
  `).join("");

  assetBrandPicker.querySelectorAll("[data-asset-brand]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextLabel = assetBrandCatalog[button.dataset.assetBrand]?.label || "";
      assetBrandInput.value = nextLabel;
      if (assetBrandManualInput) {
        assetBrandManualInput.value = "";
      }
      renderAssetBrandPicker();
    });
  });
}

function syncAssetBrandField() {
  if (!assetTypeSelect || !assetBrandPickerField || !assetBrandManualField || !assetBrandInput) return;
  const selectedType = String(assetTypeSelect.value || "").trim();
  const isVehicle = vehicleAssetTypes.has(selectedType);
  assetBrandPickerField.classList.toggle("hidden", !isVehicle);
  assetBrandManualField.classList.toggle("hidden", isVehicle);

  if (isVehicle) {
    if (assetBrandManualInput) {
      assetBrandManualInput.value = "";
    }
    renderAssetBrandPicker();
    return;
  }

  if (assetBrandPicker) {
    assetBrandPicker.innerHTML = "";
  }
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[character]);
}

function bindMoneyInput(input) {
  if (!input || input.dataset.moneyBound === "true") return;
  input.dataset.moneyBound = "true";

  input.addEventListener("input", () => {
    const digits = input.value.replace(/\D/g, "");
    input.value = digits ? formatMoneyInput(Number(digits) / 100) : "";
  });

  input.addEventListener("blur", () => {
    const value = parseMoneyValue(input.value);
    input.value = input.value.trim() ? formatMoneyInput(value) : "";
  });

  input.addEventListener("paste", (event) => {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData("text") || "";
    const value = parseMoneyValue(pastedText);
    input.value = pastedText.trim() ? formatMoneyInput(value) : "";
  });
}

function bindMoneyInputs(scope = document) {
  scope.querySelectorAll("[data-money-input]").forEach((input) => {
    bindMoneyInput(input);
  });
}

function displayAmount(value) {
  return showAmounts ? formatCurrency(value) : "R$ •••••";
}

function formatMonth(month) {
  const [year, value] = month.split("-").map(Number);
  return monthFormatter.format(new Date(year, value - 1, 1));
}

function formatMonthShort(month) {
  const [year, value] = month.split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR", { month: "short", year: "numeric" }).format(new Date(year, value - 1, 1));
}

function formatMonthAxisShort(month) {
  const [year, value] = month.split("-").map(Number);
  const shortMonth = new Intl.DateTimeFormat("pt-BR", { month: "short" }).format(new Date(year, value - 1, 1)).replace(".", "");
  return `${shortMonth}/${String(year).slice(-2)}`;
}

function formatDateInput(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatDateLabel(dateValue) {
  if (!dateValue) return "";
  const [year, month, day] = String(dateValue).split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR").format(new Date(year, month - 1, day));
}

function formatDateTimeLabel(dateValue) {
  if (!dateValue) return "";
  const normalized = String(dateValue).replace(" ", "T");
  const parsed = new Date(normalized);
  if (Number.isNaN(parsed.getTime())) return String(dateValue);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(parsed);
}

function daysSinceLabel(dateValue) {
  if (!dateValue) return "Ainda sem troca registrada";
  const normalized = String(dateValue).replace(" ", "T");
  const parsed = new Date(normalized);
  if (Number.isNaN(parsed.getTime())) return "Última alteração registrada";
  const now = new Date();
  const diffDays = Math.max(0, Math.floor((now.getTime() - parsed.getTime()) / 86400000));
  if (diffDays === 0) return "Alterada hoje";
  if (diffDays === 1) return "Alterada há 1 dia";
  return `Alterada há ${diffDays} dias`;
}

function passwordRuleState(password) {
  const value = String(password || "");
  return {
    length: value.length >= 8,
    uppercase: /[A-ZÀ-Ý]/.test(value),
    number: /\d/.test(value),
    symbol: /[^A-Za-z0-9À-ÿ]/.test(value)
  };
}

function passwordStrengthState(password) {
  const rules = passwordRuleState(password);
  const score = Object.values(rules).filter(Boolean).length;
  const labels = ["Aguardando preenchimento", "Fraca", "Média", "Boa", "Forte"];
  return { score, rules, label: labels[score] || labels[0] };
}

function describeDevice(userAgent) {
  const text = String(userAgent || "").trim();
  if (!text) return "Dispositivo não identificado";
  if (/iphone|ipad|ios/i.test(text)) return "iPhone ou iPad";
  if (/android/i.test(text)) return "Android";
  if (/windows/i.test(text)) return "Windows";
  if (/macintosh|mac os/i.test(text)) return "macOS";
  if (/linux/i.test(text)) return "Linux";
  return text.length > 48 ? `${text.slice(0, 48)}…` : text;
}

function shiftMonth(month, offset) {
  const [year, value] = month.split("-").map(Number);
  const base = new Date(year, value - 1 + offset, 1);
  return `${base.getFullYear()}-${String(base.getMonth() + 1).padStart(2, "0")}`;
}

function configuredTrackingStartMonth() {
  const value = String(state.systemConfig?.trackingStartMonth || "").trim();
  return /^\d{4}-\d{2}$/.test(value) ? value : "";
}

function monthToIndex(month) {
  const [year, value] = month.split("-").map(Number);
  return year * 12 + value - 1;
}

function expenseInstallmentsCount(expense) {
  return Math.max(1, Number(expense.installments || 1));
}

function effectiveInstallmentWindow(startMonth, paymentMethod, installments, title = "") {
  const normalizedStartMonth = String(startMonth || "").trim();
  const normalizedInstallments = Math.max(1, Number(installments || 1));
  const trackingMonth = configuredTrackingStartMonth();
  if (!trackingMonth || String(paymentMethod || "").trim().toLowerCase() !== "credito" || !normalizedStartMonth) {
    return { startMonth: normalizedStartMonth, installments: normalizedInstallments };
  }
  if (monthToIndex(normalizedStartMonth) >= monthToIndex(trackingMonth) || isCardStatementTotalTitle(title)) {
    return { startMonth: normalizedStartMonth, installments: normalizedInstallments };
  }
  const monthsElapsed = monthToIndex(trackingMonth) - monthToIndex(normalizedStartMonth);
  const remainingInstallments = normalizedInstallments - monthsElapsed;
  if (remainingInstallments <= 0) {
    return { startMonth: "", installments: 0 };
  }
  return { startMonth: trackingMonth, installments: remainingInstallments };
}

function expenseMonthlyValue(expense) {
  return Number(expense.amount) / expenseInstallmentsCount(expense);
}

function isCardStatementTotalTitle(title) {
  return normalizeLookupKey(title).startsWith("valorfinaldocartao");
}

function effectiveInstallmentStartMonth(startMonth, paymentMethod, installments, title = "") {
  return effectiveInstallmentWindow(startMonth, paymentMethod, installments, title).startMonth;
}

function effectiveInstallmentCount(startMonth, paymentMethod, installments, title = "") {
  return effectiveInstallmentWindow(startMonth, paymentMethod, installments, title).installments;
}

function effectiveFixedExpenseStartMonth(fixedExpense) {
  const trackingMonth = configuredTrackingStartMonth();
  const startMonth = String(fixedExpense.startMonth || "").trim();
  if (!trackingMonth || String(fixedExpense.paymentMethod || "").trim().toLowerCase() !== "credito") {
    return startMonth;
  }
  if (monthToIndex(startMonth) >= monthToIndex(trackingMonth)) {
    return startMonth;
  }
  return fixedExpenseInstallmentsCount(fixedExpense) > 1
    ? (effectiveFixedExpenseInstallments(fixedExpense) > 0 ? trackingMonth : "")
    : trackingMonth;
}

function effectiveFixedExpenseInstallments(fixedExpense) {
  const trackingMonth = configuredTrackingStartMonth();
  const startMonth = String(fixedExpense.startMonth || "").trim();
  const installments = fixedExpenseInstallmentsCount(fixedExpense);
  if (
    installments <= 1
    || !trackingMonth
    || String(fixedExpense.paymentMethod || "").trim().toLowerCase() !== "credito"
    || monthToIndex(startMonth) >= monthToIndex(trackingMonth)
  ) {
    return installments;
  }
  const monthsElapsed = monthToIndex(trackingMonth) - monthToIndex(startMonth);
  return Math.max(0, installments - monthsElapsed);
}

function expenseAppliesToMonth(expense, month) {
  const start = monthToIndex(effectiveInstallmentStartMonth(expense.startMonth, expense.paymentMethod, expense.installments, expense.title));
  const target = monthToIndex(month);
  const installmentCount = effectiveInstallmentCount(expense.startMonth, expense.paymentMethod, expense.installments, expense.title);
  return target >= start && target < start + installmentCount;
}

function paidInstallmentsUntilMonth(startMonth, installments, month) {
  const start = monthToIndex(startMonth);
  const target = monthToIndex(month);
  if (target < start) return 0;
  return Math.min(installments, target - start + 1);
}

function remainingInstallmentsAfterMonth(startMonth, installments, month) {
  return Math.max(0, installments - paidInstallmentsUntilMonth(startMonth, installments, month));
}

function dailyExpenseMonth(dailyExpense) {
  return String(dailyExpense.expenseDate || "").slice(0, 7);
}

function dailyExpenseStartMonth(dailyExpense) {
  return dailyExpenseMonth(dailyExpense);
}

function dailyExpenseInstallmentsCount(dailyExpense) {
  return Math.max(1, Number(dailyExpense.installments || 1));
}

function dailyExpenseMonthlyValue(dailyExpense) {
  return Number(dailyExpense.amount) / dailyExpenseInstallmentsCount(dailyExpense);
}

function dailyExpenseAppliesToMonth(dailyExpense, month) {
  const start = monthToIndex(effectiveInstallmentStartMonth(dailyExpenseStartMonth(dailyExpense), dailyExpense.paymentMethod, dailyExpense.installments, dailyExpense.title));
  const target = monthToIndex(month);
  const installmentCount = effectiveInstallmentCount(dailyExpenseStartMonth(dailyExpense), dailyExpense.paymentMethod, dailyExpense.installments, dailyExpense.title);
  return target >= start && target < start + installmentCount;
}

function fixedExpenseInstallmentsCount(fixedExpense) {
  return Math.max(1, Number(fixedExpense.installments || 1));
}

function monthExpenses(month) {
  return state.expenses.filter((expense) => expenseAppliesToMonth(expense, month));
}

function fixedExpenseAppliesToMonth(fixedExpense, month) {
  const start = monthToIndex(effectiveFixedExpenseStartMonth(fixedExpense));
  const target = monthToIndex(month);
  const installmentCount = effectiveFixedExpenseInstallments(fixedExpense);
  const inferredEnd = installmentCount > 1 ? start + installmentCount - 1 : null;
  const explicitEnd = fixedExpense.endMonth ? monthToIndex(fixedExpense.endMonth) : null;
  const endMonth = explicitEnd ?? inferredEnd;
  return target >= start && (endMonth === null || target <= endMonth);
}

function monthFixedExpenses(month) {
  return state.fixedExpenses.filter((fixedExpense) => fixedExpenseAppliesToMonth(fixedExpense, month));
}

function monthFixedExpenseTotal(month) {
  return monthFixedExpenses(month).reduce((sum, fixedExpense) => sum + Number(fixedExpense.amount), 0);
}

function monthDailyExpenses(month) {
  return state.dailyExpenses.filter((dailyExpense) => dailyExpenseAppliesToMonth(dailyExpense, month));
}

function monthIncomes(month) {
  return state.incomes.filter((income) => income.month === month);
}

function monthIncomeTithe(month) {
  return state.incomeTithes.find((incomeTithe) => incomeTithe.month === month) || null;
}

function monthTithePercentage(month) {
  return Number(monthIncomeTithe(month)?.percentage || 0);
}

function monthGrossIncomeTotal(month) {
  return monthIncomes(month).reduce((sum, income) => sum + Number(income.amount), 0);
}

function monthTitheAmount(month) {
  return monthGrossIncomeTotal(month) * (monthTithePercentage(month) / 100);
}

function monthIncomeTotal(month) {
  return monthGrossIncomeTotal(month) - monthTitheAmount(month);
}

function monthIncomeByKind(month, kind) {
  return monthIncomes(month)
    .filter((income) => String(income.kind) === kind)
    .reduce((sum, income) => sum + Number(income.amount), 0);
}

function monthCardPayments(month) {
  return state.cardPayments.filter((payment) => payment.month === month);
}

function totalCardPayments(month) {
  return state.cards.reduce((sum, card) => sum + cardPlannedPayment(card.id, month), 0);
}

function cardPaymentForMonth(cardId, month) {
  return monthCardPayments(month).find((payment) => Number(payment.cardId) === Number(cardId)) || null;
}

function cardPlannedPayment(cardId, month) {
  const committed = cardCommitted(cardId, month);
  if (committed <= 0) return 0;
  const payment = cardPaymentForMonth(cardId, month);
  return Number(payment?.amount || committed || 0);
}

function cardPendingPayment(cardId, month) {
  return Math.max(0, cardCommitted(cardId, month) - cardPlannedPayment(cardId, month));
}

function parsePercentageValue(value) {
  const normalized = String(value || "").trim().replace(",", ".");
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function monthSpent(month) {
  const fixedTotal = monthFixedExpenseTotal(month);
  const recurringTotal = monthExpenses(month).reduce((sum, expense) => sum + expenseMonthlyValue(expense), 0);
  const dailyTotal = monthDailyExpenses(month).reduce((sum, dailyExpense) => sum + dailyExpenseMonthlyValue(dailyExpense), 0);
  return fixedTotal + recurringTotal + dailyTotal;
}

function cardCommitted(cardId, month) {
  const fixedTotal = monthFixedExpenses(month)
    .filter((fixedExpense) => Number(fixedExpense.cardId) === Number(cardId))
    .reduce((sum, fixedExpense) => sum + Number(fixedExpense.amount), 0);
  const recurringTotal = monthExpenses(month)
    .filter((expense) => Number(expense.cardId) === Number(cardId))
    .reduce((sum, expense) => sum + expenseMonthlyValue(expense), 0);
  const dailyTotal = monthDailyExpenses(month)
    .filter((dailyExpense) => Number(dailyExpense.cardId) === Number(cardId))
    .reduce((sum, dailyExpense) => sum + dailyExpenseMonthlyValue(dailyExpense), 0);
  return fixedTotal + recurringTotal + dailyTotal;
}

function cumulativeInvestments(month) {
  return state.investments
    .filter((investment) => monthToIndex(investment.month) <= monthToIndex(month))
    .reduce((sum, investment) => sum + Number(investment.amount), 0);
}

function monthlyInvestments(month) {
  return state.investments
    .filter((investment) => investment.month === month)
    .reduce((sum, investment) => sum + Number(investment.amount), 0);
}

function currentGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

function totalAssetPaid() {
  return state.assets.reduce((sum, asset) => sum + Number(asset.paidValue), 0);
}

function totalAssetRemaining() {
  return state.assets.reduce((sum, asset) => sum + Math.max(0, Number(asset.totalValue) - Number(asset.paidValue)), 0);
}

function getMonthSeries() {
  const baseYear = Number(selectedMonth.slice(0, 4));
  return Array.from({ length: 12 }, (_, index) => `${baseYear}-${String(index + 1).padStart(2, "0")}`);
}

function getRollingMonthSeries(length = 6) {
  return Array.from({ length }, (_, index) => shiftMonth(selectedMonth, index - (length - 1)));
}

function highestMonth() {
  const series = getMonthSeries().map((month) => ({ month, total: monthSpent(month) }));
  return series.sort((a, b) => b.total - a.total)[0];
}

function monthRecurringTotal(month) {
  return monthExpenses(month).reduce((sum, expense) => sum + expenseMonthlyValue(expense), 0);
}

function monthDailyTotal(month) {
  return monthDailyExpenses(month).reduce((sum, dailyExpense) => sum + dailyExpenseMonthlyValue(dailyExpense), 0);
}

function monthCategoryBreakdown(month) {
  const totals = new Map();

  monthFixedExpenses(month).forEach((fixedExpense) => {
    const key = fixedExpense.category || "Fixos";
    totals.set(key, (totals.get(key) || 0) + Number(fixedExpense.amount));
  });

  monthExpenses(month).forEach((expense) => {
    const key = expense.category || "Outros";
    totals.set(key, (totals.get(key) || 0) + expenseMonthlyValue(expense));
  });

  monthDailyExpenses(month).forEach((dailyExpense) => {
    const key = dailyExpense.category || "Compras do dia";
    totals.set(key, (totals.get(key) || 0) + dailyExpenseMonthlyValue(dailyExpense));
  });

  return Array.from(totals.entries())
    .map(([label, total]) => ({ label, total }))
    .sort((a, b) => b.total - a.total);
}

function analyticsPalette(index) {
  const palette = ["#2f5547", "#c97b5c", "#7f9b77", "#b28a4f", "#5f7167", "#d6a18b"];
  return palette[index % palette.length];
}

function buildLinePath(points) {
  return points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
}

function buildAreaPath(points, baseY) {
  if (!points.length) return "";
  return `${buildLinePath(points)} L ${points[points.length - 1].x} ${baseY} L ${points[0].x} ${baseY} Z`;
}

function formatPercentage(value) {
  return `${Number(value || 0).toFixed(0)}%`;
}

function formatCompactCurrencyAxis(value) {
  const amount = Number(value || 0);
  if (amount >= 1000) {
    const shortValue = amount >= 10000 ? Math.round(amount / 1000) : Math.round((amount / 1000) * 10) / 10;
    return `R$ ${String(shortValue).replace(".", ",")}k`;
  }
  return formatCurrency(amount);
}

function bindAnalyticsTrendTooltip() {
  const shell = analyticsTrendChart?.querySelector(".analytics-line-chart-shell");
  const tooltip = analyticsTrendChart?.querySelector(".analytics-chart-tooltip");
  if (!shell || !tooltip) return;

  const hideTooltip = () => {
    tooltip.classList.add("hidden");
  };

  const showTooltip = (event, zone) => {
    const income = Number(zone.dataset.income || 0);
    const spent = Number(zone.dataset.spent || 0);
    const balance = income - spent;
    tooltip.innerHTML = `
      <p class="analytics-tooltip-title">${escapeHtml(zone.dataset.label || "")}</p>
      <div class="analytics-tooltip-row">
        <span>Renda</span>
        <strong>${formatCurrency(income)}</strong>
      </div>
      <div class="analytics-tooltip-row">
        <span>Gastos</span>
        <strong>${formatCurrency(spent)}</strong>
      </div>
      <div class="analytics-tooltip-row analytics-tooltip-row-total">
        <span>Saldo</span>
        <strong class="${balance < 0 ? "danger-text" : "positive-text"}">${balance >= 0 ? "+" : ""}${formatCurrency(balance)}</strong>
      </div>
    `;

    const shellRect = shell.getBoundingClientRect();
    const tooltipWidth = 196;
    const tooltipHeight = 114;
    const rawLeft = event.clientX - shellRect.left + 14;
    const rawTop = event.clientY - shellRect.top - tooltipHeight - 10;
    const left = Math.max(10, Math.min(rawLeft, shellRect.width - tooltipWidth - 10));
    const top = rawTop < 10 ? event.clientY - shellRect.top + 16 : rawTop;
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
    tooltip.classList.remove("hidden");
  };

  shell.querySelectorAll("[data-analytics-zone]").forEach((zone) => {
    zone.addEventListener("mousemove", (event) => {
      showTooltip(event, zone);
    });
    zone.addEventListener("mouseenter", (event) => {
      showTooltip(event, zone);
    });
    zone.addEventListener("mouseleave", hideTooltip);
    zone.addEventListener("focus", () => {
      const zoneRect = zone.getBoundingClientRect();
      showTooltip({ clientX: zoneRect.left + (zoneRect.width / 2), clientY: zoneRect.top + 24 }, zone);
    });
    zone.addEventListener("blur", hideTooltip);
  });

  shell.addEventListener("mouseleave", hideTooltip);
}

function cardAlertLevel(usageRatio) {
  if (usageRatio >= 1) return "danger";
  if (usageRatio >= 0.85) return "warn";
  return "normal";
}

function totalCardLimit() {
  return state.cards.reduce((sum, card) => sum + Number(card.limit || 0), 0);
}

function totalCardCommitted(month) {
  return state.cards.reduce((sum, card) => sum + cardCommitted(card.id, month), 0);
}

function memberName(memberId) {
  return state.users.find((member) => Number(member.id) === Number(memberId))?.name || "Sem responsável";
}

function cardBrandAsset(network) {
  return cardBrandAssets[String(network || "").trim().toLowerCase()] || null;
}

function assetBrandAsset(brand) {
  const normalizedKey = normalizedAssetBrandKey(brand);
  return assetBrandCatalog[normalizedKey]?.asset || null;
}

function issuerBrandAsset(issuer) {
  return cardBrandAssets[String(issuer || "").trim().toLowerCase()] || null;
}

function brandClassName(brand) {
  const key = normalizedAssetBrandKey(brand) || normalizeLookupKey(brand);
  return key ? `brand-${key.replace(/[^a-z0-9]+/g, "-")}` : "";
}

function syncDailyInstallmentsVisibility() {
  const isCredit = dailyExpenseForm.elements.paymentMethod.value === "Credito";
  dailyExpenseCardSelect.disabled = !isCredit;
  dailyInstallmentsInput.disabled = !isCredit;
  dailyCardField.classList.toggle("hidden", !isCredit);
  dailyInstallmentsField.classList.toggle("hidden", !isCredit);
  if (!isCredit) {
    dailyExpenseCardSelect.value = "";
    dailyInstallmentsInput.value = 1;
  }
}

function syncExpensePaymentVisibility() {
  const isCredit = expensePaymentMethod.value === "Credito";
  expenseCardSelect.disabled = !isCredit;
  expenseCardField.classList.toggle("hidden", !isCredit);
  if (!isCredit) {
    expenseCardSelect.value = "";
  }
}

function syncFixedExpensePaymentVisibility() {
  const isCredit = fixedExpensePaymentMethod.value === "Credito";
  fixedExpenseCardSelect.disabled = !isCredit;
  fixedExpenseCardField.classList.toggle("hidden", !isCredit);
  if (!isCredit) {
    fixedExpenseCardSelect.value = "";
  }
}

function api(path, options = {}) {
  const method = String(options.method || "GET").toUpperCase();
  const csrfHeaders = state.csrfToken && !["GET", "HEAD", "OPTIONS"].includes(method)
    ? { "X-CSRF-Token": state.csrfToken }
    : {};

  return fetch(path, {
    headers: { "Content-Type": "application/json", ...csrfHeaders, ...(options.headers || {}) },
    credentials: "same-origin",
    ...options
  }).then(async (response) => {
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || "Falha ao processar a requisição.");
    }
    return data;
  });
}

async function apiDownload(path, options = {}) {
  const response = await fetch(path, {
    credentials: "same-origin",
    ...options
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "Falha ao gerar o backup.");
  }

  const blob = await response.blob();
  const contentDisposition = response.headers.get("Content-Disposition") || "";
  const filenameMatch = contentDisposition.match(/filename=\"?([^\";]+)\"?/i);
  return {
    blob,
    filename: filenameMatch?.[1] || "pulse-finance-backup.zip"
  };
}

function resetCardForm() {
  editingCardId = null;
  cardForm.reset();
  cardFormTitle.textContent = "Adicionar cartão";
  cardFormSubmit.textContent = "Adicionar cartão";
  cardFormNote.classList.add("hidden");
  cardFormCancel.classList.add("hidden");
}

function resetIncomeForm() {
  editingIncomeId = null;
  incomeForm.reset();
  incomeForm.elements.month.value = selectedMonth;
  incomeFormTitle.textContent = "Cadastrar entrada do mês";
  incomeFormSubmit.textContent = "Registrar renda";
  incomeFormNote.classList.add("hidden");
  incomeFormCancel.classList.add("hidden");
  syncAllFormMonthPickers();
}

function resetExpenseForm() {
  editingExpenseId = null;
  expenseForm.reset();
  expenseForm.elements.startMonth.value = selectedMonth;
  expenseForm.elements.installments.value = 1;
  expenseFormTitle.textContent = "Cadastrar conta ou parcela";
  expenseFormSubmit.textContent = "Cadastrar gasto";
  expenseFormNote.textContent = "Use `1x` para gasto à vista. Acima disso, o sistema acompanha as parcelas restantes.";
  expenseFormCancel.classList.add("hidden");
  syncExpensePaymentVisibility();
}

function resetFixedExpenseForm() {
  editingFixedExpenseId = null;
  fixedExpenseForm.reset();
  fixedExpenseForm.elements.startMonth.value = selectedMonth;
  fixedExpenseForm.elements.installments.value = 1;
  fixedExpenseFormTitle.textContent = "Cadastrar conta recorrente";
  fixedExpenseFormSubmit.textContent = "Cadastrar gasto fixo";
  fixedExpenseFormNote.textContent = "Use 1x para gasto fixo contínuo. Com mais parcelas, o mês final é calculado se ficar vazio.";
  fixedExpenseFormCancel.classList.add("hidden");
  syncFixedExpensePaymentVisibility();
}

function resetDailyExpenseForm() {
  editingDailyExpenseId = null;
  dailyExpenseForm.reset();
  dailyExpenseForm.elements.expenseDate.value = formatDateInput(today);
  dailyExpenseForm.elements.installments.value = 1;
  dailyExpenseFormTitle.textContent = "Cadastrar compra do dia";
  dailyExpenseFormSubmit.textContent = "Registrar compra";
  dailyExpenseFormNote.textContent = "Compras à vista ficam só no mês da compra. No crédito parcelado, o sistema acompanha apenas as parcelas reais restantes.";
  dailyExpenseFormCancel.classList.add("hidden");
  syncDailyInstallmentsVisibility();
}

function resetAssetForm() {
  editingAssetId = null;
  assetForm.reset();
  assetFormTitle.textContent = "Cadastrar patrimônio";
  assetFormSubmit.textContent = "Cadastrar bem";
  assetFormNote.classList.add("hidden");
  assetFormCancel.classList.add("hidden");
  assetBrandInput.value = "";
  if (assetBrandManualInput) {
    assetBrandManualInput.value = "";
  }
  syncAssetBrandField();
}

function startCardEdit(cardId) {
  const card = state.cards.find((item) => Number(item.id) === Number(cardId));
  if (!card) return;
  editingCardId = Number(card.id);
  cardFormTitle.textContent = "Editar cartão";
  cardFormSubmit.textContent = "Salvar alterações";
  cardFormNote.classList.remove("hidden");
  cardFormCancel.classList.remove("hidden");
  cardForm.elements.name.value = card.name || "";
  cardForm.elements.network.value = card.network || "";
  cardForm.elements.issuer.value = card.issuer || "";
  setMoneyInputValue(cardForm.elements.limit, Number(card.limit || 0));
  cardForm.elements.billingDay.value = Number(card.billingDay || 1);
  cardForm.scrollIntoView({ behavior: "smooth", block: "center" });
  cardForm.elements.limit.focus();
}

function startIncomeEdit(incomeId) {
  const income = state.incomes.find((item) => Number(item.id) === Number(incomeId));
  if (!income) return;
  editingIncomeId = Number(income.id);
  incomeFormTitle.textContent = "Editar entrada do mês";
  incomeFormSubmit.textContent = "Salvar alterações";
  incomeFormNote.classList.remove("hidden");
  incomeFormCancel.classList.remove("hidden");
  incomeForm.elements.memberId.value = income.memberId ? String(income.memberId) : "";
  incomeForm.elements.title.value = income.title || "";
  setMoneyInputValue(incomeForm.elements.amount, Number(income.amount || 0));
  incomeForm.elements.month.value = income.month || selectedMonth;
  syncAllFormMonthPickers();
  incomeForm.scrollIntoView({ behavior: "smooth", block: "center" });
  incomeForm.elements.amount.focus();
}

function startFixedExpenseEdit(fixedExpenseId) {
  const fixedExpense = state.fixedExpenses.find((item) => Number(item.id) === Number(fixedExpenseId));
  if (!fixedExpense) return;
  editingFixedExpenseId = Number(fixedExpense.id);
  fixedExpenseFormTitle.textContent = "Editar gasto fixo";
  fixedExpenseFormSubmit.textContent = "Salvar alterações";
  fixedExpenseFormNote.textContent = "Atualize cartão, forma de pagamento, valor ou período sem perder o histórico já cadastrado.";
  fixedExpenseFormCancel.classList.remove("hidden");
  fixedExpenseForm.elements.title.value = fixedExpense.title || "";
  setMoneyInputValue(fixedExpenseForm.elements.amount, Number(fixedExpense.amount || 0));
  fixedExpenseForm.elements.category.value = fixedExpense.category || "";
  fixedExpenseForm.elements.memberId.value = fixedExpense.memberId ? String(fixedExpense.memberId) : "";
  fixedExpenseForm.elements.paymentMethod.value = fixedExpense.paymentMethod || "";
  fixedExpenseForm.elements.cardId.value = fixedExpense.cardId ? String(fixedExpense.cardId) : "";
  fixedExpenseForm.elements.installments.value = Math.max(1, Number(fixedExpense.installments || 1));
  fixedExpenseForm.elements.startMonth.value = fixedExpense.startMonth || selectedMonth;
  fixedExpenseForm.elements.endMonth.value = fixedExpense.endMonth || "";
  syncFixedExpensePaymentVisibility();
  fixedExpenseForm.scrollIntoView({ behavior: "smooth", block: "center" });
  fixedExpenseForm.elements.amount.focus();
}

function startExpenseEdit(expenseId) {
  const expense = state.expenses.find((item) => Number(item.id) === Number(expenseId));
  if (!expense) return;
  editingExpenseId = Number(expense.id);
  expenseFormTitle.textContent = "Editar gasto mensal";
  expenseFormSubmit.textContent = "Salvar alterações";
  expenseFormNote.textContent = "Atualize categoria, cartão, valor ou parcelamento sem recriar o lançamento.";
  expenseFormCancel.classList.remove("hidden");
  expenseForm.elements.title.value = expense.title || "";
  setMoneyInputValue(expenseForm.elements.amount, Number(expense.amount || 0));
  expenseForm.elements.category.value = expense.category || "";
  expenseForm.elements.memberId.value = expense.memberId ? String(expense.memberId) : "";
  expenseForm.elements.paymentMethod.value = expense.paymentMethod || "";
  expenseForm.elements.cardId.value = expense.cardId ? String(expense.cardId) : "";
  expenseForm.elements.startMonth.value = expense.startMonth || selectedMonth;
  expenseForm.elements.installments.value = Math.max(1, Number(expense.installments || 1));
  syncExpensePaymentVisibility();
  expenseForm.scrollIntoView({ behavior: "smooth", block: "center" });
  expenseForm.elements.amount.focus();
}

function startDailyExpenseEdit(dailyExpenseId) {
  const dailyExpense = state.dailyExpenses.find((item) => Number(item.id) === Number(dailyExpenseId));
  if (!dailyExpense) return;
  editingDailyExpenseId = Number(dailyExpense.id);
  dailyExpenseFormTitle.textContent = "Editar compra do dia";
  dailyExpenseFormSubmit.textContent = "Salvar alterações";
  dailyExpenseFormNote.textContent = "Atualize data, cartão, forma de pagamento ou parcelamento sem apagar a compra.";
  dailyExpenseFormCancel.classList.remove("hidden");
  dailyExpenseForm.elements.expenseDate.value = dailyExpense.expenseDate || formatDateInput(today);
  dailyExpenseForm.elements.title.value = dailyExpense.title || "";
  setMoneyInputValue(dailyExpenseForm.elements.amount, Number(dailyExpense.amount || 0));
  dailyExpenseForm.elements.category.value = dailyExpense.category || "";
  dailyExpenseForm.elements.paymentMethod.value = dailyExpense.paymentMethod || "";
  dailyExpenseForm.elements.memberId.value = dailyExpense.memberId ? String(dailyExpense.memberId) : "";
  dailyExpenseForm.elements.cardId.value = dailyExpense.cardId ? String(dailyExpense.cardId) : "";
  dailyExpenseForm.elements.installments.value = Math.max(1, Number(dailyExpense.installments || 1));
  syncDailyInstallmentsVisibility();
  dailyExpenseForm.scrollIntoView({ behavior: "smooth", block: "center" });
  dailyExpenseForm.elements.amount.focus();
}

function startAssetEdit(assetId) {
  const asset = state.assets.find((item) => Number(item.id) === Number(assetId));
  if (!asset) return;
  editingAssetId = Number(asset.id);
  assetFormTitle.textContent = "Editar patrimônio";
  assetFormSubmit.textContent = "Salvar alterações";
  assetFormNote.classList.remove("hidden");
  assetFormCancel.classList.remove("hidden");
  assetForm.elements.name.value = asset.name || "";
  assetForm.elements.type.value = asset.type || "";
  setMoneyInputValue(assetForm.elements.totalValue, Number(asset.totalValue || 0));
  setMoneyInputValue(assetForm.elements.paidValue, Number(asset.paidValue || 0));
  assetBrandInput.value = asset.brand || "";
  if (assetBrandManualInput) {
    assetBrandManualInput.value = !vehicleAssetTypes.has(String(asset.type || "").trim()) ? (asset.brand || "") : "";
  }
  syncAssetBrandField();
  assetForm.scrollIntoView({ behavior: "smooth", block: "center" });
  assetForm.elements.paidValue.focus();
}

function setDashboardData(data) {
  state = {
    ...data,
    accountSecurity: data.accountSecurity || { lastPasswordChangeAt: null, recoveryCodesRemaining: 0, recentLogins: [] },
    runtimeInfo: data.runtimeInfo || { dataDirectory: "", databasePath: "", backupDirectory: "", backupRetentionDays: 30, availableBackups: 0, lastBackupFile: null },
    systemConfig: data.systemConfig || { trackingStartMonth: null },
    fixedExpenses: data.fixedExpenses || [],
    incomeTithes: data.incomeTithes || []
  };
}

function isCurrentUserAdmin() {
  return String(state.currentUser?.role || "").trim().toLowerCase().includes("admin");
}

function renderLogin() {
  if (state.currentUser) {
    loginScreen.classList.add("hidden");
    appScreen.classList.remove("hidden");
  } else {
    loginScreen.classList.remove("hidden");
    appScreen.classList.add("hidden");
    loginForm.classList.toggle("hidden", awaitingTwoFactor);
    twoFactorLoginForm?.classList.toggle("hidden", !awaitingTwoFactor);
  }
}

function renderNavigation() {
  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === activeTab);
    if (button.closest("#appNav")) {
      button.setAttribute("aria-current", button.dataset.tab === activeTab ? "page" : "false");
    }
  });
  document.querySelectorAll("[data-tab-panel]").forEach((panel) => {
    panel.classList.toggle("hidden", panel.dataset.tabPanel !== activeTab);
  });
}

function mobileSidebarFocusableElements() {
  if (!appSidebar) return [];
  return Array.from(appSidebar.querySelectorAll("button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])"))
    .filter((element) => !element.classList.contains("hidden"));
}

function syncMobileSidebar() {
  const isDesktop = window.innerWidth >= 1024;
  if (isDesktop) {
    mobileSidebarOpen = false;
  }
  appSidebar?.classList.toggle("sidebar-open", mobileSidebarOpen && !isDesktop);
  mobileSidebarBackdrop?.classList.toggle("hidden", !mobileSidebarOpen || isDesktop);
  mobileMenuButton?.setAttribute("aria-expanded", String(mobileSidebarOpen && !isDesktop));
  appSidebar?.setAttribute("aria-hidden", String(!mobileSidebarOpen || isDesktop));
  document.body.classList.toggle("body-lock", mobileSidebarOpen && !isDesktop);
}

function openMobileSidebar() {
  if (window.innerWidth >= 1024) return;
  lastFocusedBeforeSidebar = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  mobileSidebarOpen = true;
  syncMobileSidebar();
  window.requestAnimationFrame(() => {
    const [firstFocusable] = mobileSidebarFocusableElements();
    firstFocusable?.focus();
  });
}

function closeMobileSidebar() {
  mobileSidebarOpen = false;
  syncMobileSidebar();
  lastFocusedBeforeSidebar?.focus?.();
}

function renderSummaryCards(container, items) {
  container.innerHTML = items.map((item) => `
    <article class="overview-card compact-card kpi-card${item.featured ? " kpi-card-primary" : ""}"${item.ariaLabel ? ` aria-label="${escapeHtml(item.ariaLabel)}"` : ""}>
      <div class="kpi-card-body">
        <span class="kpi-card-label">${item.label}</span>
        <div class="kpi-card-value-row">
          <strong
            class="kpi-card-value${item.valueTone === "negative" ? " danger-text" : item.valueTone === "primary" ? " primary-text" : ""}"
            aria-label="${escapeHtml(item.ariaLabel || item.fullValue || item.value)}"
            title="${escapeHtml(item.fullValue || item.value)}"
          >${item.value}</strong>
        </div>
        <small class="meta">${item.meta}</small>
      </div>
    </article>
  `).join("");
}

function statIconSvg(kind) {
  const icons = {
    spent: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M3 7h6v6"></path>
        <path d="m3 13 7-7 4 4 7-7"></path>
      </svg>
    `,
    invested: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M16 16h2a2 2 0 0 0 0-4h-1"></path>
        <path d="M6 12h12"></path>
        <path d="M12 12v7"></path>
        <path d="M12 5c-3.5 0-6 2-6 5 0 2 1.5 3 3 3"></path>
        <path d="M16 8.5V5"></path>
        <path d="m13 8 3-3 3 3"></path>
      </svg>
    `,
    paid: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M3 10.5 12 3l9 7.5"></path>
        <path d="M5 9.5V21h14V9.5"></path>
        <path d="M9 21v-6h6v6"></path>
      </svg>
    `,
    wallet: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h11A2.5 2.5 0 0 1 19 7.5V9H5.5A2.5 2.5 0 0 0 3 11.5z"></path>
        <path d="M3 11.5A2.5 2.5 0 0 1 5.5 9H20a1 1 0 0 1 1 1v7.5A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5z"></path>
        <path d="M16 14.5h2"></path>
      </svg>
    `,
    remaining: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 9v4"></path>
        <path d="M12 17h.01"></path>
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      </svg>
    `
  };
  return icons[kind] || icons.spent;
}

function statTrendMarkup(trend) {
  if (!trend) return "";
  return `
    <span class="stat-trend ${trend.tone}">
      <span class="stat-trend-arrow" aria-hidden="true">${trend.arrow}</span>
      <span>${trend.value}</span>
      ${trend.context ? `<span class="stat-trend-context">${trend.context}</span>` : ""}
    </span>
  `;
}

function renderStats() {
  const totalSpent = monthSpent(selectedMonth);
  const totalInvested = cumulativeInvestments(selectedMonth);
  const previousMonth = shiftMonth(selectedMonth, -1);
  const previousSpent = monthSpent(previousMonth);
  const previousInvested = cumulativeInvestments(previousMonth);
  const totalPaidAssets = totalAssetPaid();
  const totalRemainingAssets = totalAssetRemaining();
  const totalAssetBase = totalPaidAssets + totalRemainingAssets;
  const paidRatio = totalAssetBase > 0 ? (totalPaidAssets / totalAssetBase) * 100 : 0;
  const totalIncome = monthIncomeTotal(selectedMonth);
  const grossIncome = monthGrossIncomeTotal(selectedMonth);
  const remainingIncome = totalIncome - totalSpent;
  const remainingIncomeRatio = totalIncome > 0 ? Math.max(0, Math.min(100, (remainingIncome / totalIncome) * 100)) : 0;
  const spentChange = previousSpent > 0 ? Math.abs(((totalSpent - previousSpent) / previousSpent) * 100) : null;
  const investedChange = previousInvested > 0 ? Math.abs(((totalInvested - previousInvested) / previousInvested) * 100) : null;
  const walletValue = kpiCurrencyContent(remainingIncome);
  const spentValue = kpiCurrencyContent(totalSpent);
  const investedValue = kpiCurrencyContent(totalInvested);
  const paidValue = kpiCurrencyContent(totalPaidAssets);
  const remainingValue = kpiCurrencyContent(totalRemainingAssets);
  const stats = [
    {
      kind: "wallet",
      label: "Carteira digital",
      value: walletValue.display,
      fullValue: walletValue.full,
      rawValue: remainingIncome,
      meta: "Saldo após fixos e cartões",
      ariaLabel: `Carteira digital: ${walletValue.aria} disponível`,
      tone: remainingIncome < 0 ? "negative" : "positive",
      progress: totalIncome > 0 ? remainingIncomeRatio : null,
      progressText: totalIncome > 0
        ? `${Math.round(remainingIncomeRatio)}% da renda livre`
        : grossIncome > 0
          ? "Renda do mês totalmente separada pelo dízimo"
          : "Sem renda cadastrada no mês"
    },
    {
      kind: "spent",
      label: "Gastos do mês",
      value: spentValue.display,
      fullValue: spentValue.full,
      rawValue: totalSpent,
      ariaLabel: `Gastos do mês: ${spentValue.aria}`,
      meta: "Valores ativos no mês selecionado",
      trend: spentChange !== null
        ? { tone: totalSpent <= previousSpent ? "positive" : "negative", arrow: totalSpent <= previousSpent ? "↓" : "↑", value: `${spentChange.toFixed(0)}%`, context: "vs mês anterior" }
        : null
    },
    {
      kind: "invested",
      label: "Investido acumulado",
      value: investedValue.display,
      fullValue: investedValue.full,
      rawValue: totalInvested,
      ariaLabel: `Investido acumulado: ${investedValue.aria}`,
      meta: `Aportes até ${formatMonth(selectedMonth)}`,
      trend: investedChange !== null
        ? { tone: totalInvested >= previousInvested ? "positive" : "negative", arrow: totalInvested >= previousInvested ? "↑" : "↓", value: `${investedChange.toFixed(0)}%`, context: "vs mês anterior" }
        : null
    },
    {
      kind: "paid",
      label: "Patrimônio pago",
      value: paidValue.display,
      fullValue: paidValue.full,
      rawValue: totalPaidAssets,
      ariaLabel: `Patrimônio pago: ${paidValue.aria}`,
      meta: "Casa, carro e outros bens",
      trend: totalAssetBase > 0 ? { tone: "positive", arrow: "↑", value: `${paidRatio.toFixed(0)}%`, context: "do patrimônio quitado" } : null
    },
    {
      kind: "remaining",
      label: "Falta quitar",
      value: remainingValue.display,
      fullValue: remainingValue.full,
      rawValue: totalRemainingAssets,
      ariaLabel: `Falta quitar: ${remainingValue.aria}`,
      meta: "Saldo restante dos bens cadastrados",
      progress: paidRatio
    }
  ];

  statsGrid.innerHTML = stats.map((stat) => `
    <article class="stat-card stat-card-${stat.kind}${stat.kind === "wallet" ? " stat-card-featured" : ""}"${stat.ariaLabel ? ` aria-label="${escapeHtml(stat.ariaLabel)}"` : ""}>
      <div class="stat-card-body">
        <span class="stat-icon-chip" aria-hidden="true">${statIconSvg(stat.kind)}</span>
        <div class="stat-label">${stat.label}</div>
        <div class="stat-value-stack">
          <div class="stat-value-row">
            <strong
              class="stat-kpi-value ${stat.tone === "negative" ? "danger-text" : stat.kind === "wallet" ? "primary-text" : ""}"
              aria-label="${escapeHtml(stat.ariaLabel || stat.fullValue || stat.value)}"
              title="${escapeHtml(stat.fullValue || stat.value)}"
              data-kpi-amount="${Number(stat.rawValue ?? 0)}"
              data-kpi-full-value="${escapeHtml(stat.fullValue || stat.value)}"
              data-kpi-preserve-full="true"
            >${stat.fullValue || stat.value}</strong>
          </div>
          ${statTrendMarkup(stat.trend)}
        </div>
        ${stat.kind === "remaining" || stat.kind === "wallet" ? `
          <div class="stat-progress" aria-hidden="true">
            <span class="stat-progress-fill${stat.kind === "wallet" ? " wallet-progress" : ""}" style="width:${Math.max(0, Math.min(100, stat.progress || 0))}%;"></span>
          </div>
          <p class="stat-progress-caption">${stat.kind === "wallet" ? stat.progressText : `${Math.round(stat.progress || 0)}% quitado`}</p>
        ` : ""}
        <small class="meta">${stat.meta}</small>
      </div>
    </article>
  `).join("");
  applyResponsiveKpiValues();
}

function renderOverviewSummary() {
  const monthlyFixed = monthFixedExpenses(selectedMonth);
  const monthlyRecurring = monthExpenses(selectedMonth);
  const monthlyDaily = monthDailyExpenses(selectedMonth);
  const monthlyInvested = monthlyInvestments(selectedMonth);
  const overviewItems = [
    { label: "Gastos fixos", value: displayAmount(monthFixedExpenseTotal(selectedMonth)), meta: `${monthlyFixed.length} contas fixas ativas` },
    { label: "Gastos mensais", value: displayAmount(monthlyRecurring.reduce((sum, expense) => sum + expenseMonthlyValue(expense), 0)), meta: `${monthlyRecurring.length} lançamentos mensais ativos` },
    { label: "Compras do dia", value: displayAmount(monthlyDaily.reduce((sum, expense) => sum + dailyExpenseMonthlyValue(expense), 0)), meta: `${monthlyDaily.length} compras registradas no mês` },
    { label: "Investido no mês", value: displayAmount(monthlyInvested), meta: "Aportes registrados somente neste mês" }
  ];

  overviewMonthLabel.textContent = formatMonth(selectedMonth);
  overviewMonthMeta.textContent = `${monthlyFixed.length + monthlyRecurring.length + monthlyDaily.length} lançamentos no total`;
  overviewSummaryGrid.innerHTML = overviewItems.map((item) => `
    <article class="overview-card overview-summary-card">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
      <small class="meta">${item.meta}</small>
    </article>
  `).join("");
}

function renderOverviewPanels() {
  const monthlySpent = monthSpent(selectedMonth);
  const invested = cumulativeInvestments(selectedMonth);
  const paidAssets = totalAssetPaid();
  const overviewBalance = paidAssets + invested - monthlySpent;
  const invoicesTotal = totalCardCommitted(selectedMonth);
  const topCards = state.cards
    .map((card) => ({
      card,
      committed: cardCommitted(card.id, selectedMonth),
      available: Math.max(0, Number(card.limit || 0) - cardCommitted(card.id, selectedMonth))
    }))
    .sort((a, b) => b.committed - a.committed);

  overviewBalanceValue.textContent = displayAmount(overviewBalance);
  invoiceMonthLabel.textContent = formatMonth(selectedMonth);
  overviewInvoiceValue.textContent = displayAmount(invoicesTotal);

  accountsOverviewList.innerHTML = [
    { name: "Investimentos acumulados", kind: "Base aplicada", value: invested },
    { name: "Patrimônio pago", kind: "Bens já construídos", value: paidAssets },
    { name: "Saída do mês", kind: "Pressão atual", value: -monthlySpent }
  ].map((item) => `
    <article class="item-card compact-card">
      <div class="item-row">
        <div>
          <h4>${item.name}</h4>
          <div class="item-subtitle">${item.kind}</div>
        </div>
        <div class="money ${item.value < 0 ? "danger-text" : ""}">${displayAmount(item.value)}</div>
      </div>
    </article>
  `).join("");

  invoiceCardsList.innerHTML = topCards.length
    ? topCards.map(({ card, committed, available }) => `
      <article class="item-card compact-card">
        <div class="item-row">
          <div>
            <h4>${escapeHtml(card.name)}</h4>
            <div class="item-subtitle">${escapeHtml(card.issuer || card.network)} · venc. ${String(card.billingDay).padStart(2, "0")}/${selectedMonth.slice(5, 7)}</div>
          </div>
          <div class="money danger-text">${displayAmount(committed)}</div>
        </div>
        <div class="meta">Limite disponível: ${displayAmount(available)}</div>
      </article>
    `).join("")
    : `<article class="item-card compact-card"><h4>Sem cartões no mês</h4><div class="item-subtitle">Cadastre cartões para acompanhar as faturas.</div></article>`;
}

function renderAnalytics() {
  const rollingSeries = getRollingMonthSeries(6).map((month) => ({
    month,
    spent: monthSpent(month),
    income: monthIncomeTotal(month),
    cardPressure: totalCardCommitted(month),
    balance: monthIncomeTotal(month) - monthSpent(month)
  }));
  const dataSeries = rollingSeries.filter((entry) => entry.spent > 0 || entry.income > 0);
  const currentSpent = monthSpent(selectedMonth);
  const previousMonth = shiftMonth(selectedMonth, -1);
  const previousSpent = monthSpent(previousMonth);
  const currentRecurring = monthRecurringTotal(selectedMonth);
  const currentDaily = monthDailyTotal(selectedMonth);
  const peakMonth = dataSeries.reduce((highest, entry) => (entry.spent > highest.spent ? entry : highest), dataSeries[0] || {
    month: selectedMonth,
    spent: 0,
    income: 0,
    cardPressure: 0,
    balance: 0
  });
  const selectedIncome = monthIncomeTotal(selectedMonth);
  const incomeCommitment = selectedIncome > 0 ? (currentSpent / selectedIncome) * 100 : 0;
  const remainingAfterSpent = selectedIncome - currentSpent;
  const breakdown = monthCategoryBreakdown(selectedMonth);
  const dominantCategory = breakdown[0];
  const maxChartValue = Math.max(...dataSeries.flatMap((entry) => [entry.spent, entry.income]), 1);
  const previousIncome = monthIncomeTotal(previousMonth);
  const previousBalance = previousIncome - previousSpent;
  const currentBalance = remainingAfterSpent;
  const balanceDelta = currentBalance - previousBalance;
  const svgWidth = 860;
  const svgHeight = 320;
  const compactAxisLabels = window.innerWidth <= 480;
  const chartPadding = { top: 24, right: 34, bottom: compactAxisLabels ? 64 : 42, left: 22 };
  const innerWidth = svgWidth - chartPadding.left - chartPadding.right;
  const innerHeight = svgHeight - chartPadding.top - chartPadding.bottom;
  const xStep = dataSeries.length > 1 ? innerWidth / (dataSeries.length - 1) : 0;
  const chartPoints = dataSeries.map((entry, index) => ({
    month: entry.month,
    x: dataSeries.length === 1 ? chartPadding.left + (innerWidth / 2) : chartPadding.left + (xStep * index),
    spentY: chartPadding.top + innerHeight - ((entry.spent / maxChartValue) * innerHeight),
    incomeY: chartPadding.top + innerHeight - ((entry.income / maxChartValue) * innerHeight),
    spent: entry.spent,
    income: entry.income,
    balance: entry.balance
  }));
  const spentPoints = chartPoints.map((point) => ({ x: point.x, y: point.spentY }));
  const incomePoints = chartPoints.map((point) => ({ x: point.x, y: point.incomeY }));
  const spentPath = buildLinePath(spentPoints);
  const spentAreaPath = buildAreaPath(spentPoints, chartPadding.top + innerHeight);
  const incomePath = buildLinePath(incomePoints);
  const incomeAreaPath = buildAreaPath(incomePoints, chartPadding.top + innerHeight);
  const yGuides = 4;
  const guideValues = Array.from({ length: yGuides }, (_, index) => (maxChartValue / (yGuides - 1)) * index).reverse();
  const donutItems = breakdown.slice(0, 5);
  const donutTotal = donutItems.reduce((sum, item) => sum + item.total, 0);
  const donutGradient = donutItems.length
    ? (() => {
      let start = 0;
      return donutItems.map((item, index) => {
        const ratio = donutTotal > 0 ? (item.total / donutTotal) * 100 : 0;
        const end = start + ratio;
        const segment = `${analyticsPalette(index)} ${start}% ${end}%`;
        start = end;
        return segment;
      }).join(", ");
    })()
    : "";
  const categoryText = dominantCategory
    ? `${dominantCategory.label} responde por ${formatPercentage((dominantCategory.total / Math.max(currentSpent, 1)) * 100)} do gasto de ${formatMonth(selectedMonth)}.`
    : "Ainda não há categorias suficientes para leitura.";
  const monthlyPressureTone = incomeCommitment >= 100 ? "danger" : incomeCommitment >= 75 ? "warn" : "positive";
  const manyDataMonths = dataSeries.length;
  const trendPeriodLabel = manyDataMonths <= 1 ? "último mês" : `últimos ${manyDataMonths} meses`;
  const balanceToneClass = currentBalance < 0 ? "danger-text" : "positive-text";
  const balanceDeltaText = previousIncome > 0 || previousSpent > 0
    ? `${balanceDelta >= 0 ? "↑" : "↓"} ${displayAmount(Math.abs(balanceDelta))} vs ${formatMonth(previousMonth)}`
    : "Primeiro mês com base comparável registrada";

  renderSummaryCards(analyticsSummaryGrid, [
    {
      label: "Gasto do mês",
      value: displayAmount(currentSpent),
      meta: previousSpent > 0
        ? `${currentSpent <= previousSpent ? "↓" : "↑"} ${Math.abs(((currentSpent - previousSpent) / previousSpent) * 100).toFixed(0)}% vs ${formatMonth(previousMonth)}`
        : `Leitura atual de ${formatMonth(selectedMonth)}`
    },
    {
      label: "Mês mais pesado",
      value: peakMonth?.spent ? displayAmount(peakMonth.spent) : displayAmount(0),
      meta: peakMonth?.spent ? `${formatMonth(peakMonth.month)} foi o pico recente` : "Ainda sem histórico suficiente"
    },
    {
      label: "Peso na renda",
      value: selectedIncome > 0 ? `${Math.min(incomeCommitment, 999).toFixed(0)}%` : "Sem renda",
      meta: selectedIncome > 0 ? `Restam ${displayAmount(remainingAfterSpent)} após considerar todos os gastos lançados no mês` : "Cadastre renda e, se desejar, configure o dízimo para comparar com os gastos"
    }
  ]);

  analyticsTrendTitle.textContent = `Renda x gastos (${trendPeriodLabel})`;
  analyticsTrendMeta.textContent = manyDataMonths >= 3 ? "Gastos x renda" : "Histórico em formação";
  analyticsInsightTitle.textContent = `Destaques de ${formatMonth(selectedMonth)}`;

  analyticsTrendChart.innerHTML = manyDataMonths
    ? `
      <div class="analytics-line-chart-shell">
        <div class="analytics-trend-summary">
          <div>
            <span class="analytics-highlight-label">Resultado de ${formatMonthAxisShort(selectedMonth)}</span>
            <strong class="analytics-trend-summary-value ${balanceToneClass}">${displayAmount(currentBalance)}</strong>
          </div>
          <div class="analytics-trend-summary-meta ${balanceDelta < 0 ? "danger-text" : "positive-text"}">${balanceDeltaText}</div>
        </div>
        <svg class="analytics-line-chart" viewBox="0 0 ${svgWidth} ${svgHeight}" role="img" aria-label="Evolução de renda e gastos dos meses com lançamentos recentes">
          ${guideValues.map((value) => {
            const y = chartPadding.top + innerHeight - ((value / maxChartValue) * innerHeight);
            return `
              <line x1="${chartPadding.left}" y1="${y}" x2="${svgWidth - chartPadding.right}" y2="${y}" class="analytics-grid-line"></line>
              <text x="${chartPadding.left}" y="${y - 6}" class="analytics-grid-label">${formatCompactCurrencyAxis(value)}</text>
            `;
          }).join("")}
          <path d="${incomeAreaPath}" class="analytics-area income"></path>
          <path d="${spentAreaPath}" class="analytics-area spent"></path>
          <path d="${incomePath}" class="analytics-line income"></path>
          <path d="${spentPath}" class="analytics-line spent"></path>
          ${chartPoints.map((point, index) => `
            <rect
              x="${dataSeries.length === 1 ? chartPadding.left : (index === 0 ? chartPadding.left : point.x - (xStep / 2))}"
              y="${chartPadding.top}"
              width="${dataSeries.length === 1 ? innerWidth : Math.max(xStep, 36)}"
              height="${innerHeight}"
              class="analytics-hover-zone"
              data-analytics-zone="true"
              data-label="${escapeHtml(formatMonth(point.month))}"
              data-income="${point.income}"
              data-spent="${point.spent}"
              tabindex="0"
              aria-label="${escapeHtml(`${formatMonth(point.month)}. Renda ${formatCurrency(point.income)}. Gastos ${formatCurrency(point.spent)}. Saldo ${formatCurrency(point.balance)}.`)}"
            ></rect>
          `).join("")}
          ${chartPoints.length ? `
            <g class="analytics-point-group analytics-point-group-current">
              <circle cx="${chartPoints[chartPoints.length - 1].x}" cy="${chartPoints[chartPoints.length - 1].incomeY}" r="5.5" class="analytics-point income current"></circle>
              <circle cx="${chartPoints[chartPoints.length - 1].x}" cy="${chartPoints[chartPoints.length - 1].spentY}" r="5.5" class="analytics-point spent current"></circle>
            </g>
          ` : ""}
          ${chartPoints.map((point) => `
            <text
              x="${point.x}"
              y="${svgHeight - 14}"
              text-anchor="middle"
              class="analytics-axis-label${compactAxisLabels ? " compact" : ""}"
              ${compactAxisLabels ? `transform="rotate(-28 ${point.x} ${svgHeight - 14})"` : ""}
            >${formatMonthAxisShort(point.month)}</text>
          `).join("")}
        </svg>
        <div class="analytics-chart-tooltip hidden" aria-hidden="true"></div>
      </div>
      <div class="analytics-trend-cards">
        ${dataSeries.map((entry) => `
          <article class="analytics-month-card ${entry.month === selectedMonth ? "current" : ""}">
            <div class="analytics-month-label">${formatMonthAxisShort(entry.month)}</div>
            <div class="analytics-month-meta">
              <span>Renda ${displayAmount(entry.income)}</span>
              <span>Gastos ${displayAmount(entry.spent)}</span>
              <span class="${entry.balance < 0 ? "danger-text" : ""}">Sobra ${displayAmount(entry.balance)}</span>
            </div>
          </article>
        `).join("")}
      </div>
    `
    : `<article class="item-card analytics-empty-card"><h4>Sem histórico suficiente</h4><div class="item-subtitle">Cadastre gastos e rendas em meses diferentes para liberar a leitura de tendência.</div></article>`;
  if (manyDataMonths) {
    bindAnalyticsTrendTooltip();
  }

  analyticsHighlights.innerHTML = `
    <article class="analytics-highlight-card analytics-highlight-card-${monthlyPressureTone}">
      <span class="analytics-highlight-label">Mês em foco</span>
      <strong>${formatMonth(selectedMonth)}</strong>
      <p class="meta">Período usado como base para a leitura analítica atual.</p>
    </article>
    <article class="analytics-highlight-card">
      <span class="analytics-highlight-label">Pressão dos cartões</span>
      <strong>${displayAmount(totalCardCommitted(selectedMonth))}</strong>
      <p class="meta">Parte do mês já comprometida nas faturas dos cartões.</p>
    </article>
    <article class="analytics-highlight-card">
      <span class="analytics-highlight-label">Composição do mês</span>
      <strong>${displayAmount(currentRecurring)}</strong>
      <p class="meta">Gastos mensais e parcelas em andamento.</p>
    </article>
    <article class="analytics-highlight-card">
      <span class="analytics-highlight-label">Compras do dia</span>
      <strong>${displayAmount(currentDaily)}</strong>
      <p class="meta">Saída concentrada nas compras diárias de ${formatMonth(selectedMonth)}.</p>
    </article>
  `;

  analyticsNarrative.innerHTML = `
    <article class="analytics-narrative-card">
      <p class="eyebrow">Leitura interpretativa</p>
      <h4>${peakMonth.month === selectedMonth ? "Este é o mês mais pesado da janela recente" : "O mês atual ainda está abaixo do pico recente"}</h4>
      <p class="meta">${escapeHtml(peakMonth.spent > 0 ? `${formatMonth(peakMonth.month)} marcou ${displayAmount(peakMonth.spent)} em saídas. ${selectedIncome > 0 ? `Hoje, os gastos consomem ${formatPercentage(incomeCommitment)} da renda registrada no mês.` : "Ainda falta renda registrada para medir a pressão total."}` : "Ainda não há base suficiente para interpretação histórica.")}</p>
    </article>
    <article class="analytics-narrative-card">
      <p class="eyebrow">Principal foco</p>
      <h4>${dominantCategory ? escapeHtml(dominantCategory.label) : "Sem categoria dominante"}</h4>
      <p class="meta">${escapeHtml(categoryText)}</p>
    </article>
  `;

  analyticsCategoryDonut.innerHTML = donutItems.length
    ? `
      <div class="analytics-donut-wrap">
        <div class="analytics-donut-visual">
          <div class="analytics-donut-ring" style="background:conic-gradient(${donutGradient});">
            <div class="analytics-donut-center">
              <span class="analytics-donut-eyebrow">Maior peso</span>
              <strong class="analytics-donut-share">${dominantCategory ? formatPercentage((dominantCategory.total / Math.max(currentSpent, 1)) * 100) : "0%"}</strong>
              <span class="analytics-donut-center-label">${escapeHtml(dominantCategory?.label || "Sem categoria")}</span>
            </div>
          </div>
          <div class="analytics-donut-summary">
            <span class="analytics-donut-summary-label">Total do mês</span>
            <strong
              class="analytics-donut-summary-value"
              data-kpi-amount="${Number(currentSpent || 0)}"
              data-kpi-full-value="${escapeHtml(displayAmount(currentSpent))}"
              title="${escapeHtml(displayAmount(currentSpent))}"
            >${displayAmount(currentSpent)}</strong>
            <span class="analytics-donut-summary-meta">${breakdown.length} categoria${breakdown.length === 1 ? "" : "s"} com gasto em ${formatMonth(selectedMonth)}</span>
          </div>
        </div>
        <div class="analytics-donut-legend">
          ${donutItems.map((item, index) => `
            <div class="analytics-donut-legend-row">
              <span class="analytics-donut-dot" style="background:${analyticsPalette(index)};"></span>
              <div class="analytics-donut-legend-content">
                <strong class="analytics-donut-legend-label">${escapeHtml(item.label)}</strong>
                <div class="analytics-donut-legend-value">
                  <span class="analytics-donut-legend-amount">${displayAmount(item.total)}</span>
                  <span class="analytics-donut-legend-share">${formatPercentage((item.total / Math.max(currentSpent, 1)) * 100)} do mês</span>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `
    : `<article class="item-card analytics-empty-card"><h4>Sem composição para mostrar</h4><div class="item-subtitle">Assim que houver lançamentos no mês, o painel separa o peso de cada categoria.</div></article>`;
  applyResponsiveKpiValues();

  analyticsCategoryChart.innerHTML = breakdown.length
    ? breakdown.slice(0, 7).map((item, index) => {
      const ratio = currentSpent > 0 ? Math.min(100, (item.total / currentSpent) * 100) : 0;
      return `
        <article class="analytics-category-row">
          <div class="analytics-category-head">
            <strong>${index + 1}. ${escapeHtml(item.label)}</strong>
            <span>${displayAmount(item.total)}</span>
          </div>
          <div class="analytics-category-track" aria-hidden="true">
            <span class="analytics-category-fill" style="width:${ratio > 0 ? Math.max(8, ratio) : 0}%;"></span>
          </div>
          <div class="meta">${currentSpent > 0 ? `${formatPercentage((item.total / currentSpent) * 100)} do gasto de ${formatMonth(selectedMonth)}` : "Sem impacto no mês"}</div>
        </article>
      `;
    }).join("")
    : `<article class="item-card analytics-empty-card"><h4>Sem ranking para mostrar</h4><div class="item-subtitle">Cadastre lançamentos categorizados para liberar o ranking de maior pressão.</div></article>`;
}

function renderMembers() {
  const memberOptions = state.users.map((member) => `
    <option value="${Number(member.id)}">${escapeHtml(member.name)} · ${escapeHtml(member.role)}</option>
  `).join("");
  expenseMemberSelect.innerHTML = memberOptions;
  fixedExpenseMemberSelect.innerHTML = memberOptions;
  dailyExpenseMemberSelect.innerHTML = memberOptions;
  incomeMemberSelect.innerHTML = memberOptions;

  const currentUserIsAdmin = isCurrentUserAdmin();
  const adminCount = state.users.filter((member) => String(member.role || "").toLowerCase().includes("admin")).length;
  const financeCount = Math.max(0, state.users.length - adminCount);
  const trackingMonth = configuredTrackingStartMonth();
  accessSummaryGrid.innerHTML = `
    <article class="access-chip">
      <span class="access-chip-icon">⛨</span>
      <span class="access-chip-label">Administradores</span>
      <strong class="access-chip-value">${adminCount}</strong>
    </article>
    <article class="access-chip">
      <span class="access-chip-icon">◌</span>
      <span class="access-chip-label">Financeiro</span>
      <strong class="access-chip-value">${financeCount}</strong>
    </article>
    <article class="access-chip access-chip-accent">
      <span class="access-chip-icon">●</span>
      <span class="access-chip-label">Ativos agora</span>
      <strong class="access-chip-value">${state.currentUser ? 1 : 0}</strong>
    </article>
    <article class="access-chip">
      <span class="access-chip-icon">◔</span>
      <span class="access-chip-label">Acompanha desde</span>
      <strong class="access-chip-value">${trackingMonth ? formatMonthShort(trackingMonth) : "Livre"}</strong>
    </article>
  `;

  const membersMarkup = state.users.map((member) => {
    const memberId = Number(member.id);
    const memberNameText = escapeHtml(member.name);
    const memberRoleText = escapeHtml(member.role);
    const isCurrentUser = memberId === Number(state.currentUser?.id);

    return `
    <article class="item-card member-card ${String(member.role || "").toLowerCase().includes("admin") ? "member-admin" : "member-standard"}">
      <div class="item-row">
        <div class="member-card-main">
          <div class="member-avatar">
            ${escapeHtml(String(member.name || "?").trim().slice(0, 1).toUpperCase())}
            <span class="member-status-dot ${isCurrentUser ? "online" : "offline"}"></span>
          </div>
          <div>
            <div class="member-title-row">
              <h4>${memberNameText}</h4>
              <span class="member-role-badge">${memberRoleText}</span>
            </div>
            <div class="member-meta-row">
              <span class="member-badge">${isCurrentUser ? "online" : "offline"}</span>
              <span class="meta">${isCurrentUser ? "Acesso atual" : "Acesso recente"} · Perfil ativo no sistema</span>
            </div>
            <div class="member-actions-row">
              ${isCurrentUser ? `<button type="button" class="member-action-button" data-member-password="${memberId}">🔑 Trocar minha senha</button>` : ""}
              ${currentUserIsAdmin && !isCurrentUser ? `<button type="button" class="member-action-button danger icon-only" data-delete-member="${memberId}" aria-label="Remover usuário ${memberNameText}" title="Remover ${memberNameText}">🗑</button>` : ""}
            </div>
          </div>
        </div>
      </div>
    </article>
  `;
  }).join("");

  const inviteCta = currentUserIsAdmin && state.users.length < 3 ? `
    <button type="button" class="invite-cta" data-member-invite>
      <span>＋</span>
      <span>Convidar mais alguém para acompanhar</span>
    </button>
  ` : "";

  memberList.innerHTML = membersMarkup + inviteCta;
  memberAdminCard?.classList.toggle("hidden", !currentUserIsAdmin);
  trackingStartCard?.classList.toggle("hidden", !currentUserIsAdmin);
  memberPanelMeta.textContent = currentUserIsAdmin
    ? "Somente administradores podem cadastrar e remover pessoas neste ambiente."
    : "Seu perfil pode visualizar os usuários e trocar apenas a própria senha.";

  if (trackingStartForm?.elements?.trackingStartMonth) {
    trackingStartForm.elements.trackingStartMonth.value = trackingMonth;
  }
  if (trackingStartMessage) {
    trackingStartMessage.textContent = trackingMonth
      ? `Parcelados no crédito anteriores a ${formatMonth(trackingMonth)} entram no detalhamento apenas a partir desse mês.`
      : "Sem trava de início. O sistema considera o histórico detalhado completo conforme os meses lançados.";
    trackingStartMessage.classList.remove("error");
  }

  memberList.querySelectorAll("[data-delete-member]").forEach((button) => {
    button.addEventListener("click", async () => {
      try {
        const result = await api(`/api/users/${button.dataset.deleteMember}`, { method: "DELETE" });
        setDashboardData(result.data);
        renderEverything();
      } catch (error) {
        window.alert(error.message);
      }
    });
  });

  memberList.querySelectorAll("[data-member-password]").forEach((button) => {
    button.addEventListener("click", () => {
      passwordForm.scrollIntoView({ behavior: "smooth", block: "center" });
      passwordForm.elements.currentPassword.focus();
    });
  });

  memberList.querySelectorAll("[data-member-invite]").forEach((button) => {
    button.addEventListener("click", () => {
      memberAdminCard?.scrollIntoView({ behavior: "smooth", block: "center" });
      memberForm.elements.name.focus();
    });
  });
}

function renderCards() {
  const cardOptions = `
    <option value="">Sem cartão</option>
    ${state.cards.map((card) => `<option value="${Number(card.id)}">${escapeHtml(card.name)} · ${escapeHtml(card.network)}</option>`).join("")}
  `;
  expenseCardSelect.innerHTML = cardOptions;
  fixedExpenseCardSelect.innerHTML = cardOptions;
  dailyExpenseCardSelect.innerHTML = cardOptions;
  const totalLimit = totalCardLimit();
  const totalCommitted = totalCardCommitted(selectedMonth);
  const totalAvailable = Math.max(0, totalLimit - totalCommitted);
  const orderedCards = [...state.cards].sort((a, b) => cardCommitted(b.id, selectedMonth) - cardCommitted(a.id, selectedMonth));

  renderSummaryCards(cardsSummaryGrid, [
    { label: "Total dos limites", value: displayAmount(totalLimit), meta: `${state.cards.length} cartões cadastrados` },
    { label: "Uso no mês", value: displayAmount(totalCommitted), meta: `Comprometido em ${formatMonth(selectedMonth)}` },
    { label: "Limite livre", value: displayAmount(totalAvailable), meta: "Espaço disponível somando todos os cartões" }
  ]);

  if (!orderedCards.length) {
    cardList.innerHTML = `<article class="item-card"><h4>Nenhum cartão cadastrado</h4><div class="item-subtitle">Adicione um cartão para começar a acompanhar limite, vencimento e uso do mês.</div></article>`;
    return;
  }

  cardList.innerHTML = orderedCards.map((card) => {
    const cardId = Number(card.id);
    const cardNameText = escapeHtml(card.name);
    const cardNetworkText = escapeHtml(card.network);
    const cardIssuerText = escapeHtml(card.issuer || "");
    const committed = cardCommitted(card.id, selectedMonth);
    const payment = cardPaymentForMonth(card.id, selectedMonth);
    const paymentAmount = cardPlannedPayment(card.id, selectedMonth);
    const pendingAmount = cardPendingPayment(card.id, selectedMonth);
    const ratio = Number(card.limit) > 0 ? committed / Number(card.limit) : 0;
    const level = cardAlertLevel(ratio);
    const percentage = Math.min(ratio * 100, 100);
    const brandAsset = cardBrandAsset(card.network);
    const issuerAsset = issuerBrandAsset(card.issuer);
    const issuerText = card.issuer ? ` · Emissor: ${cardIssuerText}` : "";
    const statusText = ratio >= 1
      ? "Limite estourado neste mês"
      : ratio >= 0.85
        ? "Limite perto de estourar"
        : "Limite sob controle";

    return `
      <article class="item-card">
        <div class="item-row">
          <div>
            <h4>${cardNameText}</h4>
            <div class="card-network-row">
              ${brandAsset ? `<img class="card-brand" src="${brandAsset}" alt="Bandeira ${cardNetworkText}">` : ""}
              ${issuerAsset && String(card.issuer).trim().toLowerCase() !== String(card.network).trim().toLowerCase()
                ? `<img class="card-brand brand-issuer ${brandClassName(card.issuer)}" src="${issuerAsset}" alt="Emissor ${cardIssuerText}">`
                : ""}
              <span class="card-network">${cardNetworkText}</span>
            </div>
          </div>
          <div class="item-actions">
            <button class="delete-button" data-edit-card="${cardId}">Editar</button>
            ${payment ? `<button class="delete-button" data-unpay-card="${cardId}">Desfazer</button>` : ""}
            <button class="delete-button" data-delete-card="${cardId}">Remover</button>
          </div>
        </div>
        <div class="progress-head">
          <div>
            <div class="item-subtitle">Fatura dia ${card.billingDay}${issuerText}</div>
            <div class="money">${displayAmount(committed)} / ${displayAmount(card.limit)}</div>
          </div>
          <div class="item-subtitle">${payment ? `Valor ajustado para ${formatMonth(selectedMonth)}` : statusText}</div>
        </div>
        <div class="progress">
          <div class="progress-bar ${level}" style="width:${percentage}%;"></div>
        </div>
        <div class="meta card-limit-update-note">Limite atual em uso nesta leitura: ${displayAmount(card.limit)} para ${formatMonth(selectedMonth)}.</div>
        ${committed > 0 ? `
          <div class="card-payment-box">
            <div class="card-payment-head">
              <div>
                <strong>${payment ? "Valor planejado para pagar" : "Valor previsto para pagar"}</strong>
                <div class="item-subtitle">O padrão é pagar toda a fatura de ${formatMonth(selectedMonth)}. Ajuste somente se quiser pagar menos.</div>
              </div>
              <div class="money">${displayAmount(paymentAmount)}</div>
            </div>
            <form class="card-payment-form" data-card-payment-form="${cardId}">
              <label class="card-payment-field">
                <span>Valor a pagar</span>
                <input type="text" name="amount" inputmode="decimal" data-money-input value="${formatMoneyInput(paymentAmount)}" required>
              </label>
              <button type="submit" class="primary-button card-payment-submit">${payment ? "Atualizar valor" : "Ajustar valor"}</button>
            </form>
            <div class="card-payment-meta">
              <span>${payment ? `Planejado: ${displayAmount(paymentAmount)} · pendente: ${displayAmount(pendingAmount)}` : `Valor sugerido pela fatura atual: ${displayAmount(committed)}`}</span>
              <span>Esse ajuste serve para controlar quanto você pretende pagar do cartão e não altera o resultado do mês.</span>
            </div>
          </div>
        ` : ""}
      </article>
    `;
  }).join("");

  bindMoneyInputs(cardList);

  cardList.querySelectorAll("[data-delete-card]").forEach((button) => {
    button.addEventListener("click", async () => {
      const result = await api(`/api/cards/${button.dataset.deleteCard}`, { method: "DELETE" });
      setDashboardData(result.data);
      if (editingCardId === Number(button.dataset.deleteCard)) {
        resetCardForm();
      }
      renderApp();
    });
  });

  cardList.querySelectorAll("[data-edit-card]").forEach((button) => {
    button.addEventListener("click", () => {
      startCardEdit(button.dataset.editCard);
    });
  });

  cardList.querySelectorAll("[data-card-payment-form]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const cardId = Number(form.dataset.cardPaymentForm);
      const amount = parseMoneyValue(new FormData(form).get("amount"));
      const card = state.cards.find((item) => Number(item.id) === cardId);
      const committed = card ? cardCommitted(card.id, selectedMonth) : 0;
      if (amount <= 0) {
        window.alert("Digite um valor maior que zero para pagar o cartão.");
        return;
      }
      if (amount > committed + 0.005) {
        window.alert("O pagamento não pode ser maior do que o valor comprometido no cartão neste mês.");
        return;
      }
      const result = await api("/api/card-payments", {
        method: "POST",
        body: JSON.stringify({ cardId, month: selectedMonth, amount })
      });
      setDashboardData(result.data);
      renderApp();
    });
  });

  cardList.querySelectorAll("[data-unpay-card]").forEach((button) => {
    button.addEventListener("click", async () => {
      const result = await api(`/api/card-payments/${button.dataset.unpayCard}/${selectedMonth}`, { method: "DELETE" });
      setDashboardData(result.data);
      renderApp();
    });
  });
}

function renderCardPressure() {
  const totalLimit = totalCardLimit();
  const totalCommitted = totalCardCommitted(selectedMonth);
  const totalAvailable = Math.max(0, totalLimit - totalCommitted);

  renderSummaryCards(cardPressureSummary, [
    { label: "Total dos limites", value: displayAmount(totalLimit), meta: `${state.cards.length} cartões cadastrados` },
    { label: "Já vai pagar", value: displayAmount(totalCommitted), meta: `Comprometido em ${formatMonth(selectedMonth)}` },
    { label: "Ainda respira", value: displayAmount(totalAvailable), meta: "Limite restante somando todos os cartões" }
  ]);

  if (!state.cards.length) {
    cardPressureList.innerHTML = `<article class="item-card compact-card"><h4>Nenhum cartão cadastrado</h4><div class="item-subtitle">Cadastre seus cartões para ver a pressão financeira do mês.</div></article>`;
    return;
  }

  cardPressureList.innerHTML = state.cards.map((card) => {
    const cardNameText = escapeHtml(card.name);
    const cardIssuerText = escapeHtml(card.issuer || "Sem emissor");
    const committed = cardCommitted(card.id, selectedMonth);
    const limitValue = Number(card.limit || 0);
    const ratio = limitValue > 0 ? committed / limitValue : 0;
    const level = cardAlertLevel(ratio);
    const percentage = Math.min(ratio * 100, 100);
    const remaining = Math.max(0, limitValue - committed);
    const impactText = ratio >= 1
      ? "No vermelho. Precisa cortar gastos."
      : ratio >= 0.85
        ? "Muito pressionado. Atenção imediata."
        : ratio >= 0.6
          ? "Faixa de atenção."
          : "Ainda controlado.";

    return `
      <article class="item-card compact-card pressure-card ${level}">
        <div class="item-row">
          <div>
            <h4>${cardNameText}</h4>
            <div class="item-subtitle">${cardIssuerText} · fecha dia ${card.billingDay}</div>
          </div>
          <div class="pressure-percentage">${Math.round(ratio * 100)}%</div>
        </div>
        <div class="pressure-values">
          <strong>${displayAmount(committed)}</strong>
          <span>de ${displayAmount(limitValue)}</span>
        </div>
        <div class="item-subtitle">${impactText}</div>
        <div class="meta">Ainda restam ${displayAmount(remaining)} neste cartão.</div>
        <div class="progress compact-progress">
          <div class="progress-bar ${level}" style="width:${percentage}%;"></div>
        </div>
      </article>
    `;
  }).join("");

}

function renderFixedExpenses() {
  const activeFixedExpenses = monthFixedExpenses(selectedMonth)
    .sort((a, b) => Number(b.amount) - Number(a.amount));
  const totalFixed = monthFixedExpenseTotal(selectedMonth);
  const incomeTotal = monthIncomeTotal(selectedMonth);
  const fixedWeight = incomeTotal > 0 ? (totalFixed / incomeTotal) * 100 : 0;

  renderSummaryCards(fixedSummaryGrid, [
    { label: "Fixos do mês", value: displayAmount(totalFixed), meta: `${activeFixedExpenses.length} contas ativas em ${formatMonth(selectedMonth)}` },
    { label: "Peso na renda", value: incomeTotal > 0 ? `${Math.min(fixedWeight, 999).toFixed(0)}%` : "Sem renda", meta: incomeTotal > 0 ? "Percentual abatido da renda disponível no mês" : "Cadastre renda para comparar" },
    { label: "Renda após fixos", value: displayAmount(incomeTotal - totalFixed), meta: "Saldo após considerar o dízimo do mês" }
  ]);

  fixedExpenseList.innerHTML = activeFixedExpenses.map((fixedExpense) => {
    const fixedExpenseId = Number(fixedExpense.id);
    const fixedTitleText = escapeHtml(fixedExpense.title);
    const fixedCategoryText = escapeHtml(fixedExpense.category);
    const fixedMemberText = escapeHtml(memberName(fixedExpense.memberId));
    const installments = fixedExpenseInstallmentsCount(fixedExpense);
    const inferredEndMonth = installments > 1 ? shiftMonth(fixedExpense.startMonth, installments - 1) : "";
    const endMonth = fixedExpense.endMonth || inferredEndMonth;
    const endText = endMonth ? ` até ${formatMonth(endMonth)}` : " sem mês final";
    const card = state.cards.find((item) => Number(item.id) === Number(fixedExpense.cardId));
    const paymentText = card
      ? `${escapeHtml(fixedExpense.paymentMethod || "Crédito")} · Cartão: ${escapeHtml(card.name)}`
      : escapeHtml(fixedExpense.paymentMethod || "Pix");
    const installmentText = installments > 1 ? `${installments} parcelas fixas` : "Recorrente mensal";

    return `
      <article class="item-card">
        <div class="item-row">
          <div>
            <div class="income-title-row">
              <h4>${fixedTitleText}</h4>
              <span class="income-kind-badge salary">Fixo</span>
            </div>
            <div class="item-subtitle">${fixedCategoryText} · ${fixedMemberText}</div>
          </div>
          <div class="item-actions">
            <button class="delete-button" data-edit-fixed-expense="${fixedExpenseId}">Editar</button>
            <button class="delete-button" data-delete-fixed-expense="${fixedExpenseId}">Remover</button>
          </div>
        </div>
        <div class="money">${displayAmount(fixedExpense.amount)}</div>
        <div class="item-subtitle">${paymentText} · ${installmentText}</div>
        <div class="meta">Ativo desde ${formatMonth(fixedExpense.startMonth)}${endText}</div>
      </article>
    `;
  }).join("");

  if (!activeFixedExpenses.length) {
    fixedExpenseList.innerHTML = `<article class="item-card"><h4>Sem gastos fixos neste mês</h4><div class="item-subtitle">Cadastre contas recorrentes como assinaturas, internet ou academia.</div></article>`;
  }

  fixedExpenseList.querySelectorAll("[data-delete-fixed-expense]").forEach((button) => {
    button.addEventListener("click", async () => {
      const result = await api(`/api/fixed-expenses/${button.dataset.deleteFixedExpense}`, { method: "DELETE" });
      if (editingFixedExpenseId === Number(button.dataset.deleteFixedExpense)) {
        resetFixedExpenseForm();
      }
      setDashboardData(result.data);
      renderApp();
    });
  });

  fixedExpenseList.querySelectorAll("[data-edit-fixed-expense]").forEach((button) => {
    button.addEventListener("click", () => {
      startFixedExpenseEdit(button.dataset.editFixedExpense);
    });
  });
}

function renderExpenses() {
  const activeExpenses = monthExpenses(selectedMonth)
    .sort((a, b) => expenseMonthlyValue(b) - expenseMonthlyValue(a));
  const totalMonthlyRecurring = activeExpenses.reduce((sum, expense) => sum + expenseMonthlyValue(expense), 0);
  const withCardCount = activeExpenses.filter((expense) => expense.cardId).length;

  renderSummaryCards(monthlySummaryGrid, [
    { label: "Total do mês", value: displayAmount(totalMonthlyRecurring), meta: `${activeExpenses.length} lançamentos ativos` },
    { label: "No cartão", value: String(withCardCount), meta: "Gastos mensais vinculados a cartão" },
    { label: "Mês em foco", value: formatMonth(selectedMonth), meta: "Filtro aplicado aos lançamentos" }
  ]);

  expenseList.innerHTML = activeExpenses.map((expense) => {
    const expenseId = Number(expense.id);
    const expenseTitleText = escapeHtml(expense.title);
    const expenseCategoryText = escapeHtml(expense.category);
    const expenseMemberText = escapeHtml(memberName(expense.memberId));
    const installments = expenseInstallmentsCount(expense);
    const installmentValue = expenseMonthlyValue(expense);
    const paidInstallments = paidInstallmentsUntilMonth(expense.startMonth, installments, selectedMonth);
    const remainingInstallments = remainingInstallmentsAfterMonth(expense.startMonth, installments, selectedMonth);
    const remainingAmount = remainingInstallments * installmentValue;
    const card = state.cards.find((item) => Number(item.id) === Number(expense.cardId));
    const paymentText = card
      ? `${escapeHtml(expense.paymentMethod || "Crédito")} · Cartão: ${escapeHtml(card.name)}`
      : escapeHtml(expense.paymentMethod || "Pix");
    const installmentText = installments > 1
      ? `${displayAmount(installmentValue)} por mês em ${installments}x`
      : `${displayAmount(installmentValue)} no mês`;
    const progressText = installments > 1
      ? `${paidInstallments}/${installments} parcelas lançadas · faltam ${remainingInstallments}`
      : "Pagamento único";

    return `
      <article class="item-card">
        <div class="item-row">
          <div>
            <div class="income-title-row">
              <h4>${expenseTitleText}</h4>
              <span class="expense-mode-badge ${installments > 1 ? "installment" : "single"}">${installments > 1 ? `Parcelado ${installments}x` : "À vista"}</span>
            </div>
            <div class="item-subtitle">${expenseCategoryText} · ${expenseMemberText}</div>
          </div>
          <div class="item-actions">
            <button class="delete-button" data-edit-expense="${expenseId}">Editar</button>
            <button class="delete-button" data-delete-expense="${expenseId}">Remover</button>
          </div>
        </div>
        <div class="item-subtitle">${installmentText}</div>
        <div class="meta">Início: ${formatMonth(expense.startMonth)} · ${paymentText}</div>
        <div class="meta">Valor total: ${displayAmount(expense.amount)}</div>
        <div class="meta">${progressText}${installments > 1 ? ` · faltam ${displayAmount(remainingAmount)}` : ""}</div>
      </article>
    `;
  }).join("");

  if (!activeExpenses.length) {
    expenseList.innerHTML = `<article class="item-card"><h4>Sem gastos ativos neste mês</h4><div class="item-subtitle">Use o filtro mensal ou cadastre um novo lançamento.</div></article>`;
  }

  expenseList.querySelectorAll("[data-delete-expense]").forEach((button) => {
    button.addEventListener("click", async () => {
      const result = await api(`/api/expenses/${button.dataset.deleteExpense}`, { method: "DELETE" });
      if (editingExpenseId === Number(button.dataset.deleteExpense)) {
        resetExpenseForm();
      }
      setDashboardData(result.data);
      renderApp();
    });
  });

  expenseList.querySelectorAll("[data-edit-expense]").forEach((button) => {
    button.addEventListener("click", () => {
      startExpenseEdit(button.dataset.editExpense);
    });
  });
}

function renderDailyExpenses() {
  const activeDailyExpenses = monthDailyExpenses(selectedMonth)
    .sort((a, b) => String(b.expenseDate).localeCompare(String(a.expenseDate)));
  const totalDaily = activeDailyExpenses.reduce((sum, dailyExpense) => sum + dailyExpenseMonthlyValue(dailyExpense), 0);
  const creditCount = activeDailyExpenses.filter((dailyExpense) => dailyExpense.paymentMethod === "Credito").length;

  renderSummaryCards(dailySummaryGrid, [
    { label: "Total do mês", value: displayAmount(totalDaily), meta: `${activeDailyExpenses.length} compras ativas neste mês` },
    { label: "No crédito", value: String(creditCount), meta: "Compras diárias vinculadas ao crédito" },
    { label: "Mês em foco", value: formatMonth(selectedMonth), meta: "Filtro aplicado aos lançamentos" }
  ]);

  dailyExpenseList.innerHTML = activeDailyExpenses.map((dailyExpense) => {
    const dailyExpenseId = Number(dailyExpense.id);
    const dailyTitleText = escapeHtml(dailyExpense.title);
    const dailyCategoryText = escapeHtml(dailyExpense.category || "Sem categoria");
    const dailyMemberText = escapeHtml(memberName(dailyExpense.memberId));
    const dailyPaymentMethodText = escapeHtml(dailyExpense.paymentMethod);
    const installments = dailyExpenseInstallmentsCount(dailyExpense);
    const installmentValue = dailyExpenseMonthlyValue(dailyExpense);
    const startMonth = dailyExpenseStartMonth(dailyExpense);
    const paidInstallments = paidInstallmentsUntilMonth(startMonth, installments, selectedMonth);
    const remainingInstallments = remainingInstallmentsAfterMonth(startMonth, installments, selectedMonth);
    const remainingAmount = remainingInstallments * installmentValue;
    const card = state.cards.find((item) => Number(item.id) === Number(dailyExpense.cardId));
    const cardNameText = card ? escapeHtml(card.name) : "";
    const installmentText = installments > 1
      ? `${displayAmount(installmentValue)} por mês em ${installments}x`
      : `${displayAmount(dailyExpense.amount)} à vista`;
    return `
      <article class="item-card">
        <div class="item-row">
          <div>
            <div class="income-title-row">
              <h4>${dailyTitleText}</h4>
              <span class="expense-mode-badge ${installments > 1 ? "installment" : "single"}">${installments > 1 ? `Parcelado ${installments}x` : "À vista"}</span>
            </div>
            <div class="item-subtitle">${dailyCategoryText} · ${dailyMemberText} · ${dailyPaymentMethodText}</div>
          </div>
          <div class="item-actions">
            <button class="delete-button" data-edit-daily-expense="${dailyExpenseId}">Editar</button>
            <button class="delete-button" data-delete-daily-expense="${dailyExpenseId}">Remover</button>
          </div>
        </div>
        <div class="money">${installmentText}</div>
        <div class="meta">Compra em ${formatDateLabel(dailyExpense.expenseDate)}${card ? ` · Cartão: ${cardNameText}` : ""}</div>
        <div class="meta">Valor total da compra: ${displayAmount(dailyExpense.amount)}</div>
        <div class="meta">${installments > 1 ? `${paidInstallments}/${installments} parcelas no histórico · faltam ${remainingInstallments} · saldo restante ${displayAmount(remainingAmount)}` : "Pagamento único"}</div>
      </article>
    `;
  }).join("");

  if (!activeDailyExpenses.length) {
    dailyExpenseList.innerHTML = `<article class="item-card"><h4>Sem compras do dia neste mês</h4><div class="item-subtitle">Registre aqui pequenas compras e gastos do cotidiano.</div></article>`;
  }

  dailyExpenseList.querySelectorAll("[data-delete-daily-expense]").forEach((button) => {
    button.addEventListener("click", async () => {
      const result = await api(`/api/daily-expenses/${button.dataset.deleteDailyExpense}`, { method: "DELETE" });
      if (editingDailyExpenseId === Number(button.dataset.deleteDailyExpense)) {
        resetDailyExpenseForm();
      }
      setDashboardData(result.data);
      renderApp();
    });
  });

  dailyExpenseList.querySelectorAll("[data-edit-daily-expense]").forEach((button) => {
    button.addEventListener("click", () => {
      startDailyExpenseEdit(button.dataset.editDailyExpense);
    });
  });
}

function renderIncomes() {
  const monthlyIncomes = monthIncomes(selectedMonth)
    .sort((a, b) => String(a.title || "").localeCompare(String(b.title || "")));
  const grossIncome = monthGrossIncomeTotal(selectedMonth);
  const tithePercentage = monthTithePercentage(selectedMonth);
  const titheAmount = monthTitheAmount(selectedMonth);
  const totalIncome = monthIncomeTotal(selectedMonth);
  const fixedExpensesTotal = monthFixedExpenseTotal(selectedMonth);
  const recurringExpensesTotal = monthRecurringTotal(selectedMonth);
  const dailyExpensesTotal = monthDailyTotal(selectedMonth);
  const totalMonthSpent = monthSpent(selectedMonth);
  const plannedCards = totalCardPayments(selectedMonth);
  const pendingCards = Math.max(0, totalCardCommitted(selectedMonth) - plannedCards);
  const remainingIncome = totalIncome - totalMonthSpent;
  const grossIncomeValue = kpiCurrencyContent(grossIncome);
  const titheValue = kpiCurrencyContent(titheAmount);
  const availableIncomeValue = kpiCurrencyContent(totalIncome);
  const remainingIncomeValue = kpiCurrencyContent(remainingIncome);
  const coupledMembers = new Set(monthlyIncomes.map((income) => Number(income.memberId)).filter(Boolean));
  const noIncomeRegistered = grossIncome <= 0;
  const remainingIncomeMeta = noIncomeRegistered
    ? "Ainda não há renda cadastrada para comparar com os gastos do mês."
    : remainingIncome >= 0
      ? "Ainda há renda disponível após considerar todos os gastos lançados no mês."
      : "Os gastos do mês já consumiram mais do que a renda disponível.";

  if (incomeTitheMonthLabel) {
    incomeTitheMonthLabel.textContent = formatMonth(selectedMonth);
  }
  if (incomeTitheEnabled) {
    incomeTitheEnabled.checked = tithePercentage > 0;
  }
  if (incomeTithePercentage) {
    incomeTithePercentage.value = tithePercentage > 0 ? String(tithePercentage).replace(".", ",") : "";
    incomeTithePercentage.disabled = tithePercentage <= 0;
  }
  if (incomeTitheStatus) {
    incomeTitheStatus.textContent = tithePercentage > 0
      ? `Neste mês, ${formatPercentage(tithePercentage)} da renda bruta (${displayAmount(grossIncome)}) está reservado para o dízimo. Isso representa ${displayAmount(titheAmount)} e deixa ${displayAmount(totalIncome)} disponíveis para viver.`
      : "Nenhum dízimo foi configurado para este mês. Se quiser, ative a opção acima e informe a porcentagem.";
  }

  renderSummaryCards(incomeSummaryGrid, [
    { label: "Renda bruta", value: grossIncomeValue.display, fullValue: grossIncomeValue.full, ariaLabel: `Renda bruta: ${grossIncomeValue.aria}`, meta: `${monthlyIncomes.length} rendas lançadas em ${formatMonth(selectedMonth)}` },
    { label: "Dízimo do mês", value: titheValue.display, fullValue: titheValue.full, ariaLabel: `Dízimo do mês: ${titheValue.aria}`, meta: tithePercentage > 0 ? `${formatPercentage(tithePercentage)} reservado em agradecimento` : "Nenhum dízimo configurado neste mês" },
    { label: "Renda para viver", value: availableIncomeValue.display, fullValue: availableIncomeValue.full, ariaLabel: `Renda para viver: ${availableIncomeValue.aria}`, meta: "Valor disponível após separar o dízimo" },
    { label: "Resultado do mês", value: remainingIncomeValue.display, fullValue: remainingIncomeValue.full, ariaLabel: `Resultado do mês: ${remainingIncomeValue.aria}`, meta: remainingIncomeMeta, featured: true, valueTone: remainingIncome < 0 ? "negative" : "primary" }
  ]);

  if (!monthlyIncomes.length) {
    incomeList.innerHTML = `<article class="item-card"><h4>Sem renda cadastrada neste mês</h4><div class="item-subtitle">Registre as rendas do casal para consolidar o total do mês, aplicar o dízimo se desejar e acompanhar quanto sobra depois dos gastos lançados.</div></article>`;
    return;
  }

  incomeList.innerHTML = `
    <article class="item-card income-balance-card">
      <div class="item-row">
        <div>
          <h4>Consolidação de ${formatMonth(selectedMonth)}</h4>
          <div class="item-subtitle">Renda bruta do casal menos dízimo e todos os gastos lançados neste mês</div>
        </div>
        <div class="money ${remainingIncome < 0 ? "danger-text" : ""}">${displayAmount(remainingIncome)}</div>
      </div>
      <div class="income-balance-grid">
        <div>
          <span class="meta">Renda bruta</span>
          <strong>${displayAmount(grossIncome)}</strong>
        </div>
        <div>
          <span class="meta">Dízimo</span>
          <strong>${displayAmount(titheAmount)}</strong>
        </div>
        <div>
          <span class="meta">Pessoas somadas</span>
          <strong>${coupledMembers.size || 1}</strong>
        </div>
        <div>
          <span class="meta">Gastos fixos</span>
          <strong>${displayAmount(fixedExpensesTotal)}</strong>
        </div>
        <div>
          <span class="meta">Gastos mensais</span>
          <strong>${displayAmount(recurringExpensesTotal)}</strong>
        </div>
        <div>
          <span class="meta">Compras do dia</span>
          <strong>${displayAmount(dailyExpensesTotal)}</strong>
        </div>
        <div>
          <span class="meta">Total do mês</span>
          <strong>${displayAmount(totalMonthSpent)}</strong>
        </div>
        <div>
          <span class="meta">Cartões a pagar</span>
          <strong>${displayAmount(plannedCards)}</strong>
        </div>
        <div>
          <span class="meta">Pendente no cartão</span>
          <strong>${displayAmount(pendingCards)}</strong>
        </div>
      </div>
      <div class="meta">Renda para viver após o dízimo: <strong>${displayAmount(totalIncome)}</strong></div>
      <div class="meta">Resultado do mês: <strong class="${remainingIncome < 0 ? "danger-text" : ""}">${displayAmount(remainingIncome)}</strong></div>
      <div class="meta">O cartão já entra no gasto do mês quando a compra é lançada. Esse campo mostra quanto você pretende pagar da fatura e quanto ficará pendente, se ajustar para menos.</div>
    </article>
    <div class="income-list-separator" aria-hidden="true"></div>
    ${monthlyIncomes.map((income) => `
      <article class="item-card income-entry-card">
        <div class="item-row">
          <div>
            <div class="income-title-row">
              <h4>${escapeHtml(income.title)}</h4>
              <span class="income-kind-badge salary">Renda</span>
            </div>
            <div class="item-subtitle">${income.memberId ? escapeHtml(memberName(income.memberId)) : "Sem responsável"}</div>
          </div>
          <div class="item-actions">
            <button class="delete-button income-action-button" data-edit-income="${Number(income.id)}">Editar</button>
            <button class="delete-button income-action-button" data-delete-income="${Number(income.id)}">Remover</button>
          </div>
        </div>
        <div class="money">${displayAmount(income.amount)}</div>
      </article>
    `).join("")}
  `;

  incomeList.querySelectorAll("[data-edit-income]").forEach((button) => {
    button.addEventListener("click", () => {
      startIncomeEdit(button.dataset.editIncome);
    });
  });

  incomeList.querySelectorAll("[data-delete-income]").forEach((button) => {
    button.addEventListener("click", async () => {
      const result = await api(`/api/incomes/${button.dataset.deleteIncome}`, { method: "DELETE" });
      setDashboardData(result.data);
      if (editingIncomeId === Number(button.dataset.deleteIncome)) {
        resetIncomeForm();
      }
      renderApp();
    });
  });
}

function renderInvestments() {
  const investedTotal = displayAmount(cumulativeInvestments(selectedMonth));
  const investedMonth = displayAmount(monthlyInvestments(selectedMonth));
  const investedMonthLabel = formatMonth(selectedMonth);
  renderSummaryCards(investmentsSummaryGrid, [
    { label: "Investido acumulado", value: investedTotal, meta: `Aportes até ${formatMonth(selectedMonth)}` },
    { label: "Investido no mês", value: investedMonth, meta: `Somente em ${investedMonthLabel}` },
    { label: "Total de aportes", value: String(state.investments.length), meta: "Registros no histórico" }
  ]);

  const orderedInvestments = [...state.investments].sort((a, b) => String(b.month).localeCompare(String(a.month)));
  investmentList.innerHTML = orderedInvestments.length ? orderedInvestments.map((investment) => `
    <article class="item-card">
      <div class="item-row">
        <div>
          <h4>${escapeHtml(investment.name)}</h4>
          <div class="item-subtitle">${formatMonth(investment.month)}</div>
        </div>
        <div class="item-actions">
          <button class="delete-button" data-delete-investment="${Number(investment.id)}">Remover</button>
        </div>
      </div>
      <div class="money">${displayAmount(investment.amount)}</div>
    </article>
  `).join("") : `<article class="item-card"><h4>Sem investimentos registrados</h4><div class="item-subtitle">Registre um aporte para acompanhar o acumulado e o valor do mês.</div></article>`;

  investmentList.querySelectorAll("[data-delete-investment]").forEach((button) => {
    button.addEventListener("click", async () => {
      const result = await api(`/api/investments/${button.dataset.deleteInvestment}`, { method: "DELETE" });
      setDashboardData(result.data);
      renderApp();
    });
  });
}

function renderAssets() {
  const paidTotal = displayAmount(totalAssetPaid());
  const remainingTotal = displayAmount(totalAssetRemaining());
  renderSummaryCards(wealthSummaryGrid, [
    { label: "Pago em bens", value: paidTotal, meta: `${state.assets.length} bens cadastrados` },
    { label: "Ainda falta", value: remainingTotal, meta: "Saldo restante para quitar patrimônio" },
    { label: "Quitação média", value: state.assets.length ? `${(state.assets.reduce((sum, asset) => sum + (Number(asset.totalValue) > 0 ? Number(asset.paidValue) / Number(asset.totalValue) : 0), 0) / state.assets.length * 100).toFixed(0)}%` : "0%", meta: "Média de quitação dos bens" }
  ]);

  const orderedAssets = [...state.assets].sort((a, b) => Number(b.paidValue) - Number(a.paidValue));
  assetList.innerHTML = orderedAssets.length ? orderedAssets.map((asset) => {
    const assetId = Number(asset.id);
    const assetNameText = escapeHtml(asset.name);
    const assetTypeText = escapeHtml(asset.type);
    const assetBrandText = escapeHtml(normalizedAssetBrandLabel(asset.brand || ""));
    const ratio = Number(asset.totalValue) > 0 ? Number(asset.paidValue) / Number(asset.totalValue) : 0;
    const percentage = Math.min(ratio * 100, 100);
    const brandAsset = assetBrandAsset(asset.brand);
    const assetBrandClass = brandClassName(asset.brand);
    return `
      <article class="item-card">
        <div class="item-row">
          <div>
            <h4>${assetNameText}</h4>
            <div class="asset-brand-row">
              ${brandAsset ? `<img class="asset-brand ${assetBrandClass}" src="${brandAsset}" alt="Marca ${assetBrandText}">` : ""}
              <div class="item-subtitle">${assetTypeText}${asset.brand ? ` · ${assetBrandText}` : ""}</div>
            </div>
          </div>
          <div class="item-actions">
            <button class="delete-button" data-edit-asset="${assetId}">Editar</button>
            <button class="delete-button" data-delete-asset="${assetId}">Remover</button>
          </div>
        </div>
        <div class="progress-head">
          <div>
            <div class="money">${displayAmount(asset.paidValue)} pagos</div>
            <div class="meta">Faltam ${displayAmount(Math.max(0, Number(asset.totalValue) - Number(asset.paidValue)))}</div>
          </div>
          <div class="item-subtitle">${percentage.toFixed(1)}%</div>
        </div>
        <div class="progress">
          <div class="progress-bar" style="width:${percentage}%;"></div>
        </div>
      </article>
    `;
  }).join("") : `<article class="item-card"><h4>Sem patrimônio cadastrado</h4><div class="item-subtitle">Cadastre um bem para acompanhar quanto já foi pago e quanto ainda falta quitar.</div></article>`;

  assetList.querySelectorAll("[data-delete-asset]").forEach((button) => {
    button.addEventListener("click", async () => {
      const result = await api(`/api/assets/${button.dataset.deleteAsset}`, { method: "DELETE" });
      setDashboardData(result.data);
      if (editingAssetId === Number(button.dataset.deleteAsset)) {
        resetAssetForm();
      }
      renderApp();
    });
  });

  assetList.querySelectorAll("[data-edit-asset]").forEach((button) => {
    button.addEventListener("click", () => {
      startAssetEdit(button.dataset.editAsset);
    });
  });
}

function buildAlerts() {
  const alerts = [];
  const top = highestMonth();
  if (top && top.total > 0) {
    alerts.push({
      type: "warn",
      icon: "⚠",
      title: "Mês mais caro identificado",
      text: `${formatMonth(top.month)} tem o maior gasto do ano com ${formatCurrency(top.total)}.`
    });
  }

  state.cards.forEach((card) => {
    const committed = cardCommitted(card.id, selectedMonth);
    const ratio = Number(card.limit) ? committed / Number(card.limit) : 0;
    if (ratio >= 1) {
      alerts.push({
        type: "danger",
        icon: "⚠",
        title: `${card.name} acima do limite`,
        text: `A fatura comprometida chegou a ${formatCurrency(committed)} para um limite de ${formatCurrency(card.limit)}.`
      });
    } else if (ratio >= 0.85) {
      alerts.push({
        type: "warn",
        icon: "⚠",
        title: `${card.name} em zona de risco`,
        text: `O cartão já consumiu ${(ratio * 100).toFixed(0)}% do limite neste mês.`
      });
    }
  });

  if (!alerts.length) {
    alerts.push({
      type: "success",
      icon: "✓",
      title: "Tudo sob controle",
      text: "Nenhum cartão está perto de estourar e os dados do mês estão consistentes."
    });
  }

  alertsList.innerHTML = alerts.map((alert) => `
    <article class="alert-card ${alert.type === "success" ? "success" : "warn"}">
      <div class="overview-alert-inline">
        <div class="overview-alert-main">
          <span class="alert-icon">${alert.icon || "⚠"}</span>
          <div class="overview-alert-text">
            <strong>${escapeHtml(alert.title)}</strong>
            <span>${escapeHtml(alert.text)}</span>
          </div>
        </div>
        <a class="overview-alert-link" href="#overviewMonthLabel">Ver detalhes</a>
      </div>
    </article>
  `).join("");

  overviewAlertsPanel.classList.toggle("hidden", !alerts.length || (alerts.length === 1 && alerts[0].type === "success"));
}

function renderHero() {
  const currentTabMeta = tabMeta[activeTab] || tabMeta.overview;
  heroEyebrow.textContent = currentTabMeta.eyebrow;
  heroGreeting.textContent = currentTabMeta.title();
  heroInsight.textContent = currentTabMeta.insight();
  monthPicker.value = selectedMonth;
  monthPickerLabel.textContent = formatMonthShort(selectedMonth);
}

function showRecoveryCodes(codes) {
  if (!twoFactorRecoveryPanel || !twoFactorRecoveryCodes) return;
  twoFactorRecoveryCodes.innerHTML = codes.map((code) => `<code>${escapeHtml(code)}</code>`).join("");
  twoFactorRecoveryPanel.classList.toggle("hidden", !codes.length);
}

function renderPasswordSecurity() {
  passwordStatusBadge.textContent = daysSinceLabel(state.accountSecurity?.lastPasswordChangeAt);
  updatePasswordStrengthUI();
}

function renderTwoFactorSecurity() {
  if (!twoFactorStatus) return;
  const enabled = Boolean(Number(state.currentUser?.twoFactorEnabled || 0));
  const recoveryCodesRemaining = Number(state.accountSecurity?.recoveryCodesRemaining || 0);
  twoFactorStatus.textContent = enabled
    ? "2FA ativo para sua conta. Nos próximos acessos, depois da senha, você vai confirmar a entrada com o código do aplicativo autenticador."
    : "2FA ainda não está ativo. Quando você ativar, o login passará a pedir um código do aplicativo autenticador.";
  twoFactorStatusBadge.textContent = enabled ? "Ativa" : "Inativa";
  twoFactorStatusBadge.className = `status-badge ${enabled ? "success" : "neutral"}`;
  twoFactorSetupButton?.classList.toggle("hidden", enabled);
  twoFactorSetupPanel?.classList.add("hidden");
  twoFactorQrPanel?.classList.add("hidden");
  if (twoFactorQrImage) {
    twoFactorQrImage.removeAttribute("src");
  }
  recoveryCodesSummary.textContent = enabled
    ? `Você tem ${recoveryCodesRemaining} código${recoveryCodesRemaining === 1 ? "" : "s"} restante${recoveryCodesRemaining === 1 ? "" : "s"}.`
    : "Ative o 2FA para liberar os códigos de recuperação.";
  recoveryCodesBadge.textContent = `${recoveryCodesRemaining} restante${recoveryCodesRemaining === 1 ? "" : "s"}`;
  recoveryCodesBadge.className = `status-badge ${enabled && recoveryCodesRemaining >= 3 ? "subtle" : "warning"}`;
  Array.from(twoFactorDisableForm?.elements || []).forEach((element) => {
    if (element instanceof HTMLInputElement || element instanceof HTMLButtonElement) {
      element.disabled = !enabled;
    }
  });
  Array.from(twoFactorRecoveryForm?.elements || []).forEach((element) => {
    if (element instanceof HTMLInputElement || element instanceof HTMLButtonElement) {
      element.disabled = !enabled;
    }
  });
  updateTwoFactorActionState();
  twoFactorMessage.textContent = "";
  twoFactorMessage.classList.remove("error");
}

function updatePasswordStrengthUI() {
  if (!newPasswordInput || !passwordStrengthBar || !passwordStrengthLabel) return;
  const { score, rules, label } = passwordStrengthState(newPasswordInput.value);
  passwordStrengthBar.dataset.level = String(score);
  passwordStrengthLabel.textContent = label;
  passwordRequirements.forEach((item) => {
    item.classList.toggle("is-met", Boolean(rules[item.dataset.rule]));
  });
}

function updateTooltipState(wrapper, button, disabled, message) {
  if (!wrapper || !button) return;
  button.disabled = disabled;
  wrapper.dataset.tooltip = disabled ? message : "";
  wrapper.setAttribute("title", disabled ? message : "");
}

function updateTwoFactorActionState() {
  const enabled = Boolean(Number(state.currentUser?.twoFactorEnabled || 0));
  const disablePassword = String(twoFactorDisableForm?.elements.currentPassword?.value || "").trim();
  const disableCode = String(twoFactorDisableForm?.elements.code?.value || "").trim();
  const recoveryPassword = String(twoFactorRecoveryForm?.elements.currentPassword?.value || "").trim();
  const recoveryCode = String(twoFactorRecoveryForm?.elements.code?.value || "").trim();

  if (!enabled) {
    updateTooltipState(twoFactorDisableTooltip, twoFactorDisableButton, true, "Ative o 2FA para gerenciar esta área.");
    updateTooltipState(twoFactorRecoveryTooltip, twoFactorRecoveryButton, true, "Ative o 2FA para gerar códigos de recuperação.");
    return;
  }

  updateTooltipState(
    twoFactorDisableTooltip,
    twoFactorDisableButton,
    !disablePassword || !disableCode,
    "Preencha a senha e o código do autenticador ou de recuperação para desativar."
  );
  updateTooltipState(
    twoFactorRecoveryTooltip,
    twoFactorRecoveryButton,
    !recoveryPassword || !recoveryCode,
    "Preencha a senha e o código do autenticador ou de recuperação para gerar novos códigos."
  );
}

function renderRecentActivity() {
  if (!recentActivityList) return;
  const entries = state.accountSecurity?.recentLogins || [];
  const visibleEntries = recentActivityExpanded ? entries : entries.slice(0, 3);
  recentActivityList.innerHTML = visibleEntries.length
    ? visibleEntries.map((entry) => `
      <article class="recent-activity-row">
        <strong>${formatDateTimeLabel(entry.created_at)}</strong>
        <span class="meta">IP ${escapeHtml(entry.ipAddress || "não identificado")} · localização local indisponível</span>
        <span class="meta">${escapeHtml(describeDevice(entry.userAgent))}</span>
      </article>
    `).join("")
    : `<article class="recent-activity-row"><strong>Sem acessos recentes</strong><span class="meta">Os próximos logins confirmados aparecerão aqui.</span></article>`;

  if (recentActivityToggle) {
    recentActivityToggle.classList.toggle("hidden", entries.length <= 3);
    recentActivityToggle.textContent = recentActivityExpanded ? "Ver menos ↑" : "Ver tudo →";
  }
}

function renderBackupDataProtection() {
  if (!backupStorageMeta || !backupRetentionMeta || !backupDataButton) return;
  const runtimeInfo = state.runtimeInfo || {};
  const dataDirectory = String(runtimeInfo.dataDirectory || "").trim();
  const backupDirectory = String(runtimeInfo.backupDirectory || "").trim();
  const backupRetentionDays = Number(runtimeInfo.backupRetentionDays || 30);
  const availableBackups = Number(runtimeInfo.availableBackups || 0);
  const lastBackupFile = runtimeInfo.lastBackupFile ? String(runtimeInfo.lastBackupFile) : "";

  backupStorageMeta.textContent = dataDirectory
    ? `Pasta dos dados: ${dataDirectory}`
    : "A aplicação salva os dados em uma pasta local do próprio usuário.";

  backupRetentionMeta.textContent = backupDirectory
    ? `Backups automáticos em ${backupDirectory}. Mantidos por ${backupRetentionDays} dias. Cópias locais disponíveis: ${availableBackups}${lastBackupFile ? ` · mais recente: ${lastBackupFile}` : ""}.`
    : `Backups automáticos locais mantidos por ${backupRetentionDays} dias.`;
}

function renderUpdateExperience() {
  if (!appVersionMeta || !updateFlowMeta || !openUpdatePageButton || !openReleaseNotesButton) return;
  const runtimeInfo = state.runtimeInfo || {};
  const appVersion = String(runtimeInfo.appVersion || "1.0.0");
  const releaseChannel = String(runtimeInfo.releaseChannel || "stable");
  const updateUrl = String(runtimeInfo.updateUrl || "").trim();
  const releaseNotesUrl = String(runtimeInfo.releaseNotesUrl || "").trim();

  appVersionMeta.textContent = `Versão instalada: ${appVersion} · canal ${releaseChannel}.`;
  updateFlowMeta.textContent = "Para atualizar, feche o Pulse Finance, execute o instalador novo e conclua normalmente. O banco financeiro e os backups ficam fora da pasta do programa.";
  openUpdatePageButton.disabled = !updateUrl;
  openReleaseNotesButton.disabled = !releaseNotesUrl;
}

function renderMonthPopover() {
  monthPickerYear = Number.isFinite(monthPickerYear) ? monthPickerYear : Number(selectedMonth.slice(0, 4));
  monthCurrentYear.textContent = String(monthPickerYear);
  const labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  monthGrid.innerHTML = labels.map((label, index) => {
    const monthValue = `${monthPickerYear}-${String(index + 1).padStart(2, "0")}`;
    const isActive = monthValue === selectedMonth;
    return `<button type="button" class="month-option ${isActive ? "active" : ""}" data-month-value="${monthValue}">${label}</button>`;
  }).join("");

  monthGrid.querySelectorAll("[data-month-value]").forEach((button) => {
    button.addEventListener("click", () => {
      monthPicker.value = button.dataset.monthValue;
      selectedMonth = button.dataset.monthValue;
      syncMonthFormDefaults();
      monthPopover.classList.add("hidden");
      monthPickerButton.setAttribute("aria-expanded", "false");
      renderApp();
    });
  });

  requestAnimationFrame(() => {
    const buttonRect = monthPickerButton.getBoundingClientRect();
    const estimatedHeight = monthPopover.offsetHeight || 260;
    const spaceBelow = window.innerHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;
    const shouldOpenTop = spaceBelow < estimatedHeight + 16 && spaceAbove > spaceBelow;
    monthPopover.classList.toggle("month-popover-top", shouldOpenTop);
    const maxLeft = Math.max(16, window.innerWidth - monthPopover.offsetWidth - 16);
    const safeLeft = Math.min(Math.max(buttonRect.left, 16), maxLeft);
    monthPopover.style.left = `${safeLeft - buttonRect.left}px`;
  });
}

function closeFormMonthPopovers(exceptPopover = null) {
  document.querySelectorAll(".form-month-popover").forEach((popover) => {
    if (popover !== exceptPopover) {
      popover.classList.add("hidden");
    }
  });
}

function syncFormMonthPicker(input) {
  const button = input.nextElementSibling?.querySelector("[data-form-month-label]");
  if (button) {
    button.textContent = input.value ? formatMonthShort(input.value) : "Selecionar mês";
  }
}

function renderFormMonthPopover(input, popover, year) {
  const labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  popover.innerHTML = `
    <div class="month-popover-head">
      <button class="month-nav-button" type="button" data-form-month-prev aria-label="Ano anterior">‹</button>
      <strong>${year}</strong>
      <button class="month-nav-button" type="button" data-form-month-next aria-label="Próximo ano">›</button>
    </div>
    <div class="month-grid">
      ${labels.map((label, index) => {
        const monthValue = `${year}-${String(index + 1).padStart(2, "0")}`;
        return `<button type="button" class="month-option ${input.value === monthValue ? "active" : ""}" data-form-month-value="${monthValue}">${label}</button>`;
      }).join("")}
    </div>
    <div class="month-popover-foot">
      <button class="month-foot-button" type="button" data-form-month-today>Hoje</button>
      <button class="month-foot-button" type="button" data-form-month-clear>Limpar</button>
    </div>
  `;

  popover.querySelector("[data-form-month-prev]").addEventListener("click", () => {
    renderFormMonthPopover(input, popover, year - 1);
  });
  popover.querySelector("[data-form-month-next]").addEventListener("click", () => {
    renderFormMonthPopover(input, popover, year + 1);
  });
  popover.querySelector("[data-form-month-today]").addEventListener("click", () => {
    input.value = currentMonth;
    syncFormMonthPicker(input);
    closeFormMonthPopovers();
  });
  popover.querySelector("[data-form-month-clear]").addEventListener("click", () => {
    input.value = "";
    syncFormMonthPicker(input);
    closeFormMonthPopovers();
  });
  popover.querySelectorAll("[data-form-month-value]").forEach((button) => {
    button.addEventListener("click", () => {
      input.value = button.dataset.formMonthValue;
      syncFormMonthPicker(input);
      closeFormMonthPopovers();
    });
  });
}

function enhanceFormMonthInputs(scope = document) {
  scope.querySelectorAll("input[type='month']:not(#monthPicker)").forEach((input) => {
    if (input.dataset.monthEnhanced === "true") {
      syncFormMonthPicker(input);
      return;
    }

    input.dataset.monthEnhanced = "true";
    input.classList.add("hidden-month-input");
    const picker = document.createElement("div");
    picker.className = "form-month-picker";
    picker.innerHTML = `
      <button class="form-month-button" type="button">
        <span data-form-month-label>${input.value ? formatMonthShort(input.value) : "Selecionar mês"}</span>
        <span class="month-picker-caret">▾</span>
      </button>
      <div class="month-popover form-month-popover hidden" role="dialog" aria-label="Selecionar mês"></div>
    `;
    input.insertAdjacentElement("afterend", picker);

    const button = picker.querySelector(".form-month-button");
    const popover = picker.querySelector(".form-month-popover");
    button.addEventListener("click", () => {
      const nextOpen = popover.classList.contains("hidden");
      closeFormMonthPopovers(popover);
      popover.classList.toggle("hidden", !nextOpen);
      if (nextOpen) {
        const year = Number((input.value || selectedMonth || currentMonth).slice(0, 4));
        renderFormMonthPopover(input, popover, year);
      }
    });
  });
}

function syncAllFormMonthPickers() {
  document.querySelectorAll("input[type='month'][data-month-enhanced='true']").forEach(syncFormMonthPicker);
}

function syncMonthFormDefaults() {
  expenseForm.elements.startMonth.value = selectedMonth;
  fixedExpenseForm.elements.startMonth.value = selectedMonth;
  incomeForm.elements.month.value = selectedMonth;
  investmentForm.elements.month.value = selectedMonth;
  if (incomeTitheMonthLabel) {
    incomeTitheMonthLabel.textContent = formatMonth(selectedMonth);
  }
  syncAllFormMonthPickers();
}

function renderApp() {
  renderNavigation();
  renderHero();
  renderStats();
  renderOverviewPanels();
  renderOverviewSummary();
  renderAnalytics();
  renderMembers();
  renderPasswordSecurity();
  renderTwoFactorSecurity();
  renderRecentActivity();
  renderBackupDataProtection();
  renderUpdateExperience();
  renderCards();
  renderCardPressure();
  renderFixedExpenses();
  renderExpenses();
  renderDailyExpenses();
  renderIncomes();
  renderInvestments();
  renderAssets();
  buildAlerts();
  bindMoneyInputs();
  enhanceFormMonthInputs();
}

function renderEverything() {
  renderLogin();
  if (state.currentUser) {
    renderApp();
  }
}

async function refreshDashboard() {
  const data = await api("/api/dashboard");
  setDashboardData(data);
  renderEverything();
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);

  try {
    const result = await api("/api/login", {
      method: "POST",
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password")
      })
    });
    if (result.requiresTwoFactor) {
      awaitingTwoFactor = true;
      loginMessage.textContent = "Digite o código do aplicativo autenticador ou um código de recuperação.";
      loginMessage.classList.remove("error");
      loginForm.reset();
      renderLogin();
      twoFactorLoginForm.elements.code.focus();
      return;
    }
    setDashboardData(result.data);
    awaitingTwoFactor = false;
    activeTab = "cards";
    loginMessage.textContent = "";
    loginMessage.classList.remove("error");
    loginForm.reset();
    renderEverything();
  } catch (error) {
    loginMessage.textContent = error.message;
    loginMessage.classList.add("error");
  }
});

twoFactorLoginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(twoFactorLoginForm);

  try {
    const result = await api("/api/login/2fa", {
      method: "POST",
      body: JSON.stringify({ code: formData.get("code") })
    });
    setDashboardData(result.data);
    awaitingTwoFactor = false;
    activeTab = "cards";
    loginMessage.textContent = result.usedRecoveryCode
      ? "Entrada confirmada com código de recuperação. Gere novos códigos em Segurança."
      : "";
    loginMessage.classList.remove("error");
    twoFactorLoginForm.reset();
    renderEverything();
  } catch (error) {
    loginMessage.textContent = error.message;
    loginMessage.classList.add("error");
  }
});

twoFactorBackButton?.addEventListener("click", () => {
  awaitingTwoFactor = false;
  twoFactorLoginForm.reset();
  loginMessage.textContent = "";
  loginMessage.classList.remove("error");
  renderLogin();
  loginForm.elements.username.focus();
});

logoutButton.addEventListener("click", async () => {
  await api("/api/logout", { method: "POST" });
  closeMobileSidebar();
  state.currentUser = null;
  state.csrfToken = null;
  awaitingTwoFactor = false;
  activeTab = "cards";
  renderEverything();
});

monthPicker.addEventListener("change", () => {
  selectedMonth = monthPicker.value || currentMonth;
  syncMonthFormDefaults();
  renderApp();
});

monthPickerButton.addEventListener("click", () => {
  monthPickerYear = Number(selectedMonth.slice(0, 4));
  const willOpen = monthPopover.classList.contains("hidden");
  monthPopover.classList.toggle("hidden", !willOpen);
  monthPickerButton.setAttribute("aria-expanded", willOpen ? "true" : "false");
  if (willOpen) {
    renderMonthPopover();
  }
});

monthPrevYear.addEventListener("click", () => {
  monthPickerYear -= 1;
  renderMonthPopover();
});

monthNextYear.addEventListener("click", () => {
  monthPickerYear += 1;
  renderMonthPopover();
});

monthTodayButton.addEventListener("click", () => {
  selectedMonth = currentMonth;
  monthPicker.value = currentMonth;
  syncMonthFormDefaults();
  monthPopover.classList.add("hidden");
  monthPickerButton.setAttribute("aria-expanded", "false");
  renderApp();
});

monthClearButton.addEventListener("click", () => {
  selectedMonth = currentMonth;
  monthPicker.value = currentMonth;
  syncMonthFormDefaults();
  monthPopover.classList.add("hidden");
  monthPickerButton.setAttribute("aria-expanded", "false");
  renderApp();
});

document.addEventListener("click", (event) => {
  if (!monthPopover.contains(event.target) && !monthPickerButton.contains(event.target)) {
    monthPopover.classList.add("hidden");
    monthPickerButton.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileSidebarOpen) {
    closeMobileSidebar();
    return;
  }

  if (event.key !== "Tab" || !mobileSidebarOpen) return;

  const focusable = mobileSidebarFocusableElements();
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const activeElement = document.activeElement;

  if (event.shiftKey && activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

appNav.querySelectorAll("[data-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    activeTab = button.dataset.tab;
    closeMobileSidebar();
    renderApp();
  });
});

mobileMenuButton?.addEventListener("click", () => {
  if (mobileSidebarOpen) {
    closeMobileSidebar();
  } else {
    openMobileSidebar();
  }
});

mobileSidebarClose?.addEventListener("click", () => {
  closeMobileSidebar();
});

mobileSidebarBackdrop?.addEventListener("click", () => {
  closeMobileSidebar();
});

window.addEventListener("resize", () => {
  syncMobileSidebar();
  scheduleResponsiveKpiValues();
});

[toggleAmountsButton, overviewBalanceToggle, overviewInvoiceToggle].forEach((button) => {
  button.addEventListener("click", () => {
    showAmounts = !showAmounts;
    renderApp();
  });
});

dailyExpensePaymentMethod.addEventListener("change", () => {
  syncDailyInstallmentsVisibility();
});

expensePaymentMethod.addEventListener("change", () => {
  syncExpensePaymentVisibility();
});

fixedExpensePaymentMethod.addEventListener("change", () => {
  syncFixedExpensePaymentVisibility();
});

memberForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(memberForm);

  try {
    const result = await api("/api/users", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        role: formData.get("role"),
        password: formData.get("password")
      })
    });
    memberMessage.textContent = "Pessoa cadastrada com sucesso.";
    memberMessage.classList.remove("error");
    memberForm.reset();
    setDashboardData(result.data);
    renderApp();
  } catch (error) {
    memberMessage.textContent = error.message;
    memberMessage.classList.add("error");
  }
});

trackingStartForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(trackingStartForm);
  const month = String(formData.get("trackingStartMonth") || "").trim();

  try {
    const result = await api("/api/system-config/tracking-start-month", {
      method: "PUT",
      body: JSON.stringify({ month })
    });
    trackingStartMessage.textContent = month
      ? `Início do acompanhamento salvo em ${formatMonth(month)}.`
      : "Início do acompanhamento removido. O sistema voltou a considerar todo o histórico detalhado.";
    trackingStartMessage.classList.remove("error");
    setDashboardData(result.data);
    renderApp();
  } catch (error) {
    trackingStartMessage.textContent = error.message;
    trackingStartMessage.classList.add("error");
  }
});

passwordForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(passwordForm);
  const newPassword = String(formData.get("newPassword") || "");
  const confirmPassword = String(formData.get("confirmNewPassword") || "");

  if (newPassword !== confirmPassword) {
    passwordMessage.textContent = "A confirmação da nova senha precisa ser igual ao campo acima.";
    passwordMessage.classList.add("error");
    return;
  }

  try {
    await api("/api/users/password", {
      method: "PUT",
      body: JSON.stringify({
        currentPassword: formData.get("currentPassword"),
        newPassword
      })
    });
    passwordMessage.textContent = "Senha atualizada com sucesso.";
    passwordMessage.classList.remove("error");
    passwordForm.reset();
    updatePasswordStrengthUI();
    await refreshDashboard();
  } catch (error) {
    passwordMessage.textContent = error.message;
    passwordMessage.classList.add("error");
  }
});

twoFactorSetupButton?.addEventListener("click", async () => {
  try {
    const result = await api("/api/users/2fa/setup", { method: "POST" });
    twoFactorManualSecret.textContent = result.secret;
    twoFactorOtpUri.value = result.otpauthUri;
    if (result.qrCodeDataUrl) {
      twoFactorQrImage.src = result.qrCodeDataUrl;
      twoFactorQrPanel.classList.remove("hidden");
    } else {
      twoFactorQrImage.removeAttribute("src");
      twoFactorQrPanel.classList.add("hidden");
    }
    twoFactorSetupPanel.classList.remove("hidden");
    twoFactorRecoveryPanel.classList.add("hidden");
    twoFactorMessage.textContent = "Escaneie o QR Code no aplicativo autenticador e digite abaixo o código de 6 dígitos exibido no celular.";
    twoFactorMessage.classList.remove("error");
    twoFactorEnableForm.elements.code.focus();
  } catch (error) {
    twoFactorMessage.textContent = error.message;
    twoFactorMessage.classList.add("error");
  }
});

twoFactorEnableForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(twoFactorEnableForm);

  try {
    const result = await api("/api/users/2fa/enable", {
      method: "POST",
      body: JSON.stringify({ code: formData.get("code") })
    });
    setDashboardData(result.data);
    twoFactorEnableForm.reset();
    renderApp();
    showRecoveryCodes(result.recoveryCodes || []);
    twoFactorMessage.textContent = "2FA ativado. Guarde os códigos de recuperação em local seguro: eles servem como plano B se você perder acesso ao aplicativo.";
    twoFactorMessage.classList.remove("error");
  } catch (error) {
    twoFactorMessage.textContent = error.message;
    twoFactorMessage.classList.add("error");
  }
});

twoFactorDisableForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(twoFactorDisableForm);

  try {
    const result = await api("/api/users/2fa", {
      method: "DELETE",
      body: JSON.stringify({
        currentPassword: formData.get("currentPassword"),
        code: formData.get("code")
      })
    });
    setDashboardData(result.data);
    twoFactorDisableForm.reset();
    twoFactorRecoveryForm.reset();
    twoFactorRecoveryPanel.classList.add("hidden");
    renderApp();
    twoFactorMessage.textContent = "2FA desativado. A partir de agora, o login volta a pedir apenas usuário e senha.";
    twoFactorMessage.classList.remove("error");
  } catch (error) {
    twoFactorMessage.textContent = error.message;
    twoFactorMessage.classList.add("error");
  }
});

twoFactorRecoveryForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(twoFactorRecoveryForm);

  try {
    const result = await api("/api/users/2fa/recovery-codes", {
      method: "POST",
      body: JSON.stringify({
        currentPassword: formData.get("currentPassword"),
        code: formData.get("code")
      })
    });
    twoFactorRecoveryForm.reset();
    showRecoveryCodes(result.recoveryCodes || []);
    twoFactorMessage.textContent = "Novos códigos de recuperação gerados. Os anteriores deixaram de funcionar.";
    twoFactorMessage.classList.remove("error");
  } catch (error) {
    twoFactorMessage.textContent = error.message;
    twoFactorMessage.classList.add("error");
  }
});

newPasswordInput?.addEventListener("input", () => {
  updatePasswordStrengthUI();
  passwordMessage.textContent = "";
  passwordMessage.classList.remove("error");
});

confirmNewPasswordInput?.addEventListener("input", () => {
  passwordMessage.textContent = "";
  passwordMessage.classList.remove("error");
});

[twoFactorDisableForm, twoFactorRecoveryForm].forEach((form) => {
  form?.addEventListener("input", () => {
    updateTwoFactorActionState();
  });
});

recentActivityToggle?.addEventListener("click", () => {
  recentActivityExpanded = !recentActivityExpanded;
  renderRecentActivity();
});

backupDataButton?.addEventListener("click", async () => {
  if (backupDataMessage) {
    backupDataMessage.textContent = "Gerando backup do banco atual...";
    backupDataMessage.classList.remove("error");
  }
  backupDataButton.disabled = true;

  try {
    const { blob, filename } = await apiDownload("/api/system/backup");
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(objectUrl);

    if (backupDataMessage) {
      backupDataMessage.textContent = "Backup baixado. Guarde esse arquivo em outro local, como OneDrive, Google Drive ou pendrive.";
      backupDataMessage.classList.remove("error");
    }
    await refreshDashboard();
  } catch (error) {
    if (backupDataMessage) {
      backupDataMessage.textContent = error.message;
      backupDataMessage.classList.add("error");
    }
  } finally {
    backupDataButton.disabled = false;
  }
});

openUpdatePageButton?.addEventListener("click", () => {
  const updateUrl = String(state.runtimeInfo?.updateUrl || "").trim();
  if (!updateUrl) {
    if (updateActionMessage) {
      updateActionMessage.textContent = "Nenhum link de atualização foi configurado para esta instalação.";
      updateActionMessage.classList.add("error");
    }
    return;
  }
  window.open(updateUrl, "_blank", "noopener");
  if (updateActionMessage) {
    updateActionMessage.textContent = "A página da versão mais nova foi aberta. Após baixar, instale por cima da versão atual para manter os dados.";
    updateActionMessage.classList.remove("error");
  }
});

openReleaseNotesButton?.addEventListener("click", () => {
  const releaseNotesUrl = String(state.runtimeInfo?.releaseNotesUrl || "").trim();
  if (!releaseNotesUrl) {
    if (updateActionMessage) {
      updateActionMessage.textContent = "Nenhuma página de versões foi configurada para esta instalação.";
      updateActionMessage.classList.add("error");
    }
    return;
  }
  window.open(releaseNotesUrl, "_blank", "noopener");
  if (updateActionMessage) {
    updateActionMessage.textContent = "A lista de versões foi aberta no navegador.";
    updateActionMessage.classList.remove("error");
  }
});

cardForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(cardForm);
  const payload = {
    name: formData.get("name"),
    network: formData.get("network"),
    issuer: formData.get("issuer"),
    limit: parseMoneyValue(formData.get("limit")),
    billingDay: Number(formData.get("billingDay"))
  };
  const result = await api(editingCardId ? `/api/cards/${editingCardId}` : "/api/cards", {
    method: editingCardId ? "PUT" : "POST",
    body: JSON.stringify({
      ...payload
    })
  });
  resetCardForm();
  setDashboardData(result.data);
  renderApp();
});

cardFormCancel.addEventListener("click", () => {
  resetCardForm();
});

expenseForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(expenseForm);
  const title = String(formData.get("title") || "").trim();
  if (formData.get("paymentMethod") === "Credito" && !String(formData.get("cardId") || "").trim()) {
    window.alert("Selecione o cartão para registrar um gasto no crédito.");
    expenseCardSelect.focus();
    return;
  }
  if (normalizeLookupKey(title).startsWith("valorfinaldocartao")) {
    window.alert("Não cadastre a fatura final como gasto mensal. Use o fluxo de pagamento do cartão apenas para controlar a quitação da fatura.");
    expenseForm.elements.title.focus();
    return;
  }
  const result = await api(editingExpenseId ? `/api/expenses/${editingExpenseId}` : "/api/expenses", {
    method: editingExpenseId ? "PUT" : "POST",
    body: JSON.stringify({
      title,
      amount: parseMoneyValue(formData.get("amount")),
      category: formData.get("category"),
      paymentMethod: formData.get("paymentMethod"),
      memberId: Number(formData.get("memberId")),
      cardId: formData.get("cardId"),
      startMonth: formData.get("startMonth"),
      installments: Number(formData.get("installments"))
    })
  });
  resetExpenseForm();
  setDashboardData(result.data);
  renderApp();
});

expenseFormCancel.addEventListener("click", () => {
  resetExpenseForm();
});

fixedExpenseForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(fixedExpenseForm);
  if (formData.get("paymentMethod") === "Credito" && !String(formData.get("cardId") || "").trim()) {
    window.alert("Selecione o cartão para registrar um gasto fixo no crédito.");
    fixedExpenseCardSelect.focus();
    return;
  }
  const result = await api(editingFixedExpenseId ? `/api/fixed-expenses/${editingFixedExpenseId}` : "/api/fixed-expenses", {
    method: editingFixedExpenseId ? "PUT" : "POST",
    body: JSON.stringify({
      title: formData.get("title"),
      amount: parseMoneyValue(formData.get("amount")),
      category: formData.get("category"),
      paymentMethod: formData.get("paymentMethod"),
      memberId: Number(formData.get("memberId")),
      cardId: formData.get("cardId"),
      startMonth: formData.get("startMonth"),
      endMonth: formData.get("endMonth"),
      installments: Number(formData.get("installments"))
    })
  });
  resetFixedExpenseForm();
  setDashboardData(result.data);
  renderApp();
});

fixedExpenseFormCancel.addEventListener("click", () => {
  resetFixedExpenseForm();
});

dailyExpenseForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(dailyExpenseForm);
  const paymentMethod = formData.get("paymentMethod");
  if (paymentMethod === "Credito" && !String(formData.get("cardId") || "").trim()) {
    window.alert("Selecione o cartão para registrar uma compra no crédito.");
    dailyExpenseCardSelect.focus();
    return;
  }
  const cardId = paymentMethod === "Credito" ? formData.get("cardId") : "";
  const result = await api(editingDailyExpenseId ? `/api/daily-expenses/${editingDailyExpenseId}` : "/api/daily-expenses", {
    method: editingDailyExpenseId ? "PUT" : "POST",
    body: JSON.stringify({
      expenseDate: formData.get("expenseDate"),
      title: formData.get("title"),
      amount: parseMoneyValue(formData.get("amount")),
      category: formData.get("category"),
      paymentMethod,
      memberId: Number(formData.get("memberId")),
      cardId,
      installments: Number(formData.get("installments"))
    })
  });
  resetDailyExpenseForm();
  setDashboardData(result.data);
  renderApp();
});

dailyExpenseFormCancel.addEventListener("click", () => {
  resetDailyExpenseForm();
});

incomeForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(incomeForm);
  const result = await api(editingIncomeId ? `/api/incomes/${editingIncomeId}` : "/api/incomes", {
    method: editingIncomeId ? "PUT" : "POST",
    body: JSON.stringify({
      title: formData.get("title"),
      amount: parseMoneyValue(formData.get("amount")),
      month: formData.get("month"),
      memberId: Number(formData.get("memberId"))
    })
  });
  resetIncomeForm();
  setDashboardData(result.data);
  renderApp();
});

incomeFormCancel.addEventListener("click", () => {
  resetIncomeForm();
});

incomeTitheEnabled?.addEventListener("change", () => {
  if (!incomeTithePercentage) return;
  incomeTithePercentage.disabled = !incomeTitheEnabled.checked;
  if (incomeTitheEnabled.checked) {
    incomeTithePercentage.focus();
  } else {
    incomeTithePercentage.value = "";
  }
});

incomeTitheForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const enabled = Boolean(incomeTitheEnabled?.checked);
  const percentage = enabled ? parsePercentageValue(incomeTithePercentage?.value) : 0;
  if (enabled && (percentage <= 0 || percentage > 100)) {
    window.alert("Informe uma porcentagem de dízimo maior que zero e de no máximo 100%.");
    incomeTithePercentage?.focus();
    return;
  }
  const result = await api(`/api/income-tithes/${selectedMonth}`, {
    method: "PUT",
    body: JSON.stringify({ percentage })
  });
  setDashboardData(result.data);
  renderApp();
});

investmentForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(investmentForm);
  const result = await api("/api/investments", {
    method: "POST",
    body: JSON.stringify({
      name: formData.get("name"),
      amount: parseMoneyValue(formData.get("amount")),
      month: formData.get("month")
    })
  });
  investmentForm.reset();
  investmentForm.elements.month.value = selectedMonth;
  setDashboardData(result.data);
  renderApp();
});

assetForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(assetForm);
  const assetType = String(formData.get("type") || "").trim();
  const rawBrand = vehicleAssetTypes.has(assetType)
    ? assetBrandInput.value
    : assetBrandManualInput?.value || formData.get("brand");
  const normalizedBrand = normalizedAssetBrandLabel(rawBrand);
  const result = await api(editingAssetId ? `/api/assets/${editingAssetId}` : "/api/assets", {
    method: editingAssetId ? "PUT" : "POST",
    body: JSON.stringify({
      name: formData.get("name"),
      type: assetType,
      brand: normalizedBrand,
      totalValue: parseMoneyValue(formData.get("totalValue")),
      paidValue: parseMoneyValue(formData.get("paidValue"))
    })
  });
  resetAssetForm();
  setDashboardData(result.data);
  renderApp();
});

assetFormCancel?.addEventListener("click", () => {
  resetAssetForm();
});

assetTypeSelect?.addEventListener("change", () => {
  assetBrandInput.value = "";
  if (assetBrandManualInput) {
    assetBrandManualInput.value = "";
  }
  syncAssetBrandField();
});

function initDefaults() {
  bindMoneyInputs();
  syncMobileSidebar();
  monthPicker.value = selectedMonth;
  syncMonthFormDefaults();
  syncAssetBrandField();
  dailyExpenseForm.elements.expenseDate.value = formatDateInput(today);
  syncExpensePaymentVisibility();
  syncFixedExpensePaymentVisibility();
  syncDailyInstallmentsVisibility();
}

async function bootstrap() {
  initDefaults();
  try {
    const result = await api("/api/bootstrap");
    if (result.authenticated) {
      setDashboardData(result.data);
    }
  } catch (error) {
    console.error(error);
  }
  renderEverything();
}

bootstrap();
