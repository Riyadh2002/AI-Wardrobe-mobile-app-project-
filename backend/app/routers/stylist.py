from fastapi import APIRouter, HTTPException
from ..schemas.stylist import StylistChatRequest, StylistChatResponse
from ..agents.stylist_agent import chat_with_stylist

router = APIRouter(prefix="/stylist", tags=["Conversational AI Stylist"])

@router.post("/chat", response_model=StylistChatResponse, summary="Chat with AI Stylist (Aura)")
async def chat(request: StylistChatRequest):
    """
    Sends a message to the conversational fashion stylist agent.
    Returns tailored advice, follow-up prompt chips, and optional outfit links.
    """
    try:
        result = await chat_with_stylist(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Stylist conversation failed: {str(e)}")
