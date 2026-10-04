import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .config import get_settings
from .routers import wardrobe, outfits, stylist

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("aiwardrobe")

settings = get_settings()

app = FastAPI(
    title="AIWardrobe API & AI Agent Engine",
    description="Multimodal personal fashion assistant powered by Google Gemini and FastAPI.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configure CORS for Expo mobile and web clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(wardrobe.router, prefix="/api")
app.include_router(outfits.router, prefix="/api")
app.include_router(stylist.router, prefix="/api")

@app.get("/", summary="Root Status")
async def root():
    return {
        "app": "AIWardrobe API Service",
        "version": "1.0.0",
        "status": "online",
        "gemini_active": settings.is_gemini_active,
        "docs": "/docs",
    }

@app.get("/api/health", summary="Health Check")
async def health_check():
    """Health check endpoint for mobile app and monitoring."""
    return {
        "status": "healthy",
        "gemini_active": settings.is_gemini_active,
        "gemini_model": settings.GEMINI_MODEL,
        "mode": "Live AI" if settings.is_gemini_active else "Intelligent Fallback",
    }
