from fastapi import APIRouter, HTTPException
from ..schemas.outfit import OutfitGenerateRequest, OutfitGenerateResponse
from ..agents.outfit_agent import generate_outfit

router = APIRouter(prefix="/outfits", tags=["Outfits & AI Synthesis"])

@router.post("/generate", response_model=OutfitGenerateResponse, summary="Synthesize AI Outfit")
async def create_outfit(request: OutfitGenerateRequest):
    """
    Synthesizes a curated outfit combination from wardrobe inventory,
    tailored to weather, occasion, and aesthetic preference.
    """
    try:
        result = await generate_outfit(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Outfit generation failed: {str(e)}")

@router.get("/daily-pick", response_model=OutfitGenerateResponse, summary="Daily AI Pick Outfit")
async def daily_pick():
    """Generates the signature 'AI Pick For You' daily outfit."""
    req = OutfitGenerateRequest(
        occasion="Casual",
        style="Minimal",
        color_preference="Neutral",
        temperature="28°C",
        weather_condition="Partly Cloudy",
        custom_prompt="Signature relaxed effortless daily look",
    )
    return await generate_outfit(req)
