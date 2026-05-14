FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    FINANCE_DATABASE_PATH=/data/finance.db

WORKDIR /app

RUN mkdir -p /data

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py index.html styles.css app.js ./
COPY assets ./assets

RUN useradd --create-home --shell /usr/sbin/nologin pulse \
    && chown -R pulse:pulse /app /data

USER pulse

VOLUME ["/data"]
EXPOSE 9001

CMD ["python", "app.py"]
