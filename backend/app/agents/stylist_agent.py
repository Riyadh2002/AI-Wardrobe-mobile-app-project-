import json
import logging
from typing import List, Optional

from ..config import get_settings
from ..schemas.stylist import ChatMessage, StylistChatRequest, StylistChatResponse
from ..schemas.outfit import OutfitGenerateResponse, OutfitItemRef

logger = logging.getLogger(__name__)

STYLIST_SYSTEM_PROMPT = """
You are "Aura", the elite personal AI fashion stylist in the AIWardrobe app.
Your tone is elevated, warm, perceptive, and concise—like a trusted Paris/Milan editorial fashion director talking directly to their client.

Guidelines:
1. Speak with effortless authority about proportions, color theory, textures, and garment draping.
2. Keep responses focused, elegant, and actionable (2-4 sentences max per response, unless explaining a detailed capsule).
3. Always suggest 2 or 3 natural follow-up prompt chips the user can tap next.
4. Return a single valid JSON object strictly matching this schema:
{
  "message": "Conversational advice from Aura.",
  "suggested_prompts": ["Prompt suggestion 1", "Prompt suggestion 2", "Prompt suggestion 3"]
}

Return ONLY valid JSON without markdown fences.
"""

def _clean_json_string(text: str) -> str:
    text = text.strip()
    if text.startswith("```json"):
        text = text[7:]
    elif text.startswith("```"):
        text = text[3:]
    if text.endswith("```"):
        text = text[:-3]
    return text.strip()

def _get_stylist_fallback(prompt: str) -> StylistChatResponse:
    prompt_lower = prompt.lower()

    if "date" in prompt_lower:
        msg = "For an evening or gallery date, juxtaposition is everything. A fluid silk slip dress balanced by the architectural cut of a structured leather jacket makes an unforgettable, understated statement."
        chips = ["What jewelry matches?", "Show shoe options", "How to dress down with sneakers?"]
    elif "shirt" in prompt_lower or "poplin" in prompt_lower:
        msg = "To elevate an oversized white poplin shirt, balance its relaxed volume with clean straight-leg raw denim or tailored high-waist trousers. French-tuck the front and finish with optic white sneakers."
        chips = ["Which belt works best?", "Can I wear it to the office?", "Outerwear layer ideas"]
    elif "pack" in prompt_lower or "travel" in prompt_lower or "trip" in prompt_lower:
        msg = "For effortless travel, build around a 5-piece monochrome capsule: 2 breathable cotton tops, 1 raw denim, 1 tailored relaxed trouser, and a versatile overcoat that layers over everything."
        chips = ["Footwear recommendations?", "How to avoid wrinkles?", "Capsule color palette"]
    elif "shoe" in prompt_lower or "sneaker" in prompt_lower:
        msg = "A low-profile white calfskin sneaker acts as a clean visual palate cleanser. It brings tailored trousers down to earth and keeps dark selvedge denim feeling crisp and contemporary."
        chips = ["Are loafers better for dinner?", "Socks or no-show?", "Rainy weather alternatives"]
    else:
        msg = "I've analyzed your aesthetic! Focusing on structured neutrals with one tactile contrast (like silk against grain leather or poplin against raw denim) gives you effortless, high-fashion polish."
        chips = ["Suggest a look for tonight", "What colors suit me?", "Organize my wardrobe"]

    return StylistChatResponse(
        message=msg,
        suggested_prompts=chips,
        is_ai_generated=False,
        notice="Responding in Stylist Heuristic Mode. Add GEMINI_API_KEY to backend/.env for live conversational intelligence.",
    )

async def chat_with_stylist(request: StylistChatRequest) -> StylistChatResponse:
    """
    Conversational AI Stylist Agent:
    Provides context-aware fashion advice and follow-up styling prompts.
    """
    settings = get_settings()

    if not settings.is_gemini_active:
        logger.info("GEMINI_API_KEY not configured. Responding with Stylist fallback.")
        return _get_stylist_fallback(request.message)

    try:
        # Build history context
        history_context = ""
        if request.history:
            turns = [f"{m.sender.upper()}: {m.text}" for m in request.history[-5:]]
            history_context = "\nConversation History:\n" + "\n".join(turns)

        user_prompt = f"""
{history_context}
USER: {request.message}
Client Style Preferences: {request.user_style_preference or 'Minimalist, Modern Luxury'}
Wardrobe Summary: {request.user_wardrobe_summary or 'Poplin shirts, raw denim, leather jacket, white sneakers, silk slip dress'}
"""

        raw_response = None
        try:
            from google import genai
            client = genai.Client(api_key=settings.GEMINI_API_KEY)
            res = client.models.generate_content(
                model=settings.GEMINI_MODEL,
                contents=[STYLIST_SYSTEM_PROMPT, user_prompt],
            )
            raw_response = res.text
        except Exception:
            import google.generativeai as legacy_genai
            legacy_genai.configure(api_key=settings.GEMINI_API_KEY)
            model = legacy_genai.GenerativeModel("gemini-1.5-flash")
            res = model.generate_content([STYLIST_SYSTEM_PROMPT, user_prompt])
            raw_response = res.text

        if raw_response:
            cleaned = _clean_json_string(raw_response)
            data = json.loads(cleaned)
            return StylistChatResponse(
                message=data.get("message", "Here is my styling recommendation for your look."),
                suggested_prompts=data.get("suggested_prompts", ["Show another look", "What shoes go best?", "Save to favorites"]),
                is_ai_generated=True,
                notice="Response generated live by Aura AI Stylist Agent.",
            )

    except Exception as e:
        logger.error(f"Error in Gemini Stylist Chat: {e}", exc_info=True)

    return _get_stylist_fallback(request.message)
