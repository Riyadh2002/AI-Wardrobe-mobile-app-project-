# ==============================================================================
# Multi-Stage Dockerfile for AIWardrobe Backend Service
# ==============================================================================
# Stage 1: Builder - Installs build dependencies and wheels in an isolated venv
# Stage 2: Runner  - Minimal, secure non-root runtime with health monitoring
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1: Build virtual environment
# ------------------------------------------------------------------------------
FROM python:3.12-slim-bookworm AS builder

# Prevent python from buffering stdout/stderr and writing .pyc files
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /build

# Install compilation tools needed for C extensions
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Create isolated Python virtual environment
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# ------------------------------------------------------------------------------
# Stage 2: Production Runtime
# ------------------------------------------------------------------------------
FROM python:3.12-slim-bookworm AS runner

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH="/opt/venv/bin:$PATH" \
    HOST=0.0.0.0 \
    PORT=8000

# Install runtime dependencies only (curl for healthchecks)
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create unprivileged system user for secure container execution
RUN groupadd -g 10001 appuser && \
    useradd -u 10001 -g appuser -s /bin/sh -M -d /app appuser

# Copy isolated virtual environment from builder stage
COPY --from=builder --chown=appuser:appuser /opt/venv /opt/venv

WORKDIR /app

# Copy application source code
COPY --chown=appuser:appuser app ./app
COPY --chown=appuser:appuser run.py ./run.py

# Switch to non-root user
USER appuser

EXPOSE 8000

# Container health monitoring via FastAPI health endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:8000/api/health || exit 1

# Start FastAPI application with Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

