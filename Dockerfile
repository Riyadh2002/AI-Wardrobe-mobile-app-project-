# ==============================================================================
# Multi-Stage Dockerfile for AIWardrobe Project
# ==============================================================================
# Stage 1: backend-builder - Installs build dependencies and creates isolated venv
# Stage 2: backend         - Production runtime image for FastAPI AI backend service
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1: Backend Builder
# ------------------------------------------------------------------------------
FROM python:3.12-slim-bookworm AS backend-builder

# Prevent python from buffering stdout/stderr and writing .pyc files
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /build

# Install build dependencies for compiling Python packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Create isolated Python virtual environment
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Copy backend dependency requirements and install
COPY backend/requirements.txt .
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# ------------------------------------------------------------------------------
# Stage 2: Backend Runtime (Production)
# ------------------------------------------------------------------------------
FROM python:3.12-slim-bookworm AS backend

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH="/opt/venv/bin:$PATH" \
    HOST=0.0.0.0 \
    PORT=8000

# Install runtime dependencies only (curl for health check probe)
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create unprivileged system user for secure container execution
RUN groupadd -g 10001 appuser && \
    useradd -u 10001 -g appuser -s /bin/sh -M -d /app appuser

# Copy isolated virtual environment from builder stage
COPY --from=backend-builder --chown=appuser:appuser /opt/venv /opt/venv

WORKDIR /app

# Copy application source code
COPY --chown=appuser:appuser backend/app ./app
COPY --chown=appuser:appuser backend/run.py ./run.py

# Switch to non-root user
USER appuser

EXPOSE 8000

# Container health monitoring via FastAPI health endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:8000/api/health || exit 1

# Start FastAPI application with Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

