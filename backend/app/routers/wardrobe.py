from fastapi import APIRouter, HTTPException
from ..schemas.wardrobe import AutoTagRequest, AutoTagResponse
from ..agents.vision_agent import auto_tag_garment

router = APIRouter(prefix="/wardrobe", tags=["Wardrobe & Vision AI"])

@router.post("/auto-tag", response_model=AutoTagResponse, summary="Multimodal Vision Garment Auto-Tagging")
async def auto_tag(request: AutoTagRequest):
    """
    Analyzes an uploaded garment image (URL or Base64) using the Vision AI Agent.
    Returns structured category, color, style, season, brand, and editorial styling tips.
    """
    try:
        result = await auto_tag_garment(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Auto-tagging failed: {str(e)}")

@router.get("/health", summary="Wardrobe Router Health Check")
async def wardrobe_health():
    return {"status": "ok", "service": "wardrobe_vision"}
