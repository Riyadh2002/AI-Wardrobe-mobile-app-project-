import json
import logging
import uuid
from typing import Any, Dict, List
from ..config import get_settings
from ..schemas.outfit import OutfitGenerateRequest, OutfitGenerateResponse, OutfitItemRef

logger = logging.getLogger(__name__)

DEFAULT_CAPSULE_ITEMS = [
    {
        "id": "item-top-1",
        "name": "Oversized Crisp Poplin Shirt",
        "category": "Tops",
        "imageUrl": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80",
        "color": "White",
    },
    {
        "id": "item-bottom-1",
        "name": "Vintage Straight Raw Denim",
        "category": "Bottoms",
        "imageUrl": "https://images.unsplash.com/photo-1542272604-780c96856592?w=800&auto=format&fit=crop&q=80",
        "color": "Navy",
    },
    {
        "id": "item-shoes-1",
        "name": "Minimalist Nappa Low Sneakers",
        "category": "Shoes",
        "imageUrl": "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80",
        "color": "White",
    },
    {
        "id": "item-acc-1",
        "name": "Matte Acetate Sunglasses",
        "category": "Accessories",
        "imageUrl": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
        "color": "Black",
    },
    {
        "id": "item-outer-1",
        "name": "Structured Leather Biker Jacket",
        "category": "Outerwear",
        "imageUrl": "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80",
        "color": "Black",
    },
    {
        "id": "item-dress-1",
        "name": "Silk Bias-Cut Slip Dress",
        "category": "Dresses",
        "imageUrl": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80",
        "color": "Burgundy",
    }
]

SYSTEM_PROMPT = """
You are a world-class celebrity fashion stylist and wardrobe curation director.
Your goal is to synthesize a personalized outfit combination based on the user's occasion, weather, style aesthetic, color preference, and available wardrobe items.

Return a single valid JSON object strictly matching this schema:
{
  "name": "Editorial title for the outfit (e.g., 'The Architect Silhouette', 'Clean Modernist Saturday', 'Midnight Silk Statement')",
  "confidence_score": 95,
  "explanation": "2-3 sentences explaining 'Why this works': articulate the visual balance, proportion, color harmony, and temperature comfort.",
  "styling_tips": [
    "Tip 1: Practical styling trick (e.g., French-tuck the hem, roll the cuffs)",
    "Tip 2: Accessory or fragrance finishing suggestion"
  ],
  "selected_item_ids": ["id1", "id2", "id3"]
}

Return ONLY valid JSON without markdown formatting.
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

def _build_fallback_outfit(request: OutfitGenerateRequest) -> OutfitGenerateResponse:
    """Intelligent fallback outfit based on occasion and style parameters."""
    occ = request.occasion.lower()
    items = []

    if "date" in occ or "party" in occ:
        name = "Midnight Monochrome & Silk"
        items = [
            OutfitItemRef(
                id="item-dress-1",
                name="Silk Bias-Cut Slip Dress",
                category="Dresses",
                imageUrl="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80",
                color="Burgundy",
            ),
            OutfitItemRef(
                id="item-outer-1",
                name="Structured Leather Biker Jacket",
                category="Outerwear",
                imageUrl="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80",
                color="Black",
            ),
            OutfitItemRef(
                id="item-shoes-1",
                name="Minimalist Nappa Low Sneakers",
                category="Shoes",
                imageUrl="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80",
                color="White",
            ),
        ]
        explanation = "The juxtaposition of fluid burgundy silk with the structured grain of the leather jacket creates tactile intrigue. Crisp white sneakers ground the look with understated modern ease."
        tips = [
            "Drape the jacket over the shoulders instead of wearing the sleeves.",
            "Finish with a clean amber or woody minimalist fragrance.",
        ]
    elif "office" in occ or "formal" in occ:
        name = "The Tailored Executive"
        items = [
            OutfitItemRef(
                id="item-top-1",
                name="Oversized Crisp Poplin Shirt",
                category="Tops",
                imageUrl="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80",
                color="White",
            ),
            OutfitItemRef(
                id="item-bottom-1",
                name="Vintage Straight Raw Denim",
                category="Bottoms",
                imageUrl="https://images.unsplash.com/photo-1542272604-780c96856592?w=800&auto=format&fit=crop&q=80",
                color="Navy",
            ),
            OutfitItemRef(
                id="item-shoes-1",
                name="Minimalist Nappa Low Sneakers",
                category="Shoes",
                imageUrl="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80",
                color="White",
            ),
        ]
        explanation = "Sharp poplin proportions paired with clean dark-wash selvedge achieve a smart-casual office harmony. Clean low sneakers keep the silhouette effortless yet boardroom-ready."
        tips = [
            "Tuck the poplin shirt into the waistband with a slim black leather belt.",
            "Fasten all buttons except the collar button for an architectural neckline.",
        ]
    else:
        name = "Contemporary Minimalist Uniform"
        items = [
            OutfitItemRef(
                id="item-top-1",
                name="Oversized Crisp Poplin Shirt",
                category="Tops",
                imageUrl="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80",
                color="White",
            ),
            OutfitItemRef(
                id="item-bottom-1",
                name="Vintage Straight Raw Denim",
                category="Bottoms",
                imageUrl="https://images.unsplash.com/photo-1542272604-780c96856592?w=800&auto=format&fit=crop&q=80",
                color="Navy",
            ),
            OutfitItemRef(
                id="item-shoes-1",
                name="Minimalist Nappa Low Sneakers",
                category="Shoes",
                imageUrl="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80",
                color="White",
            ),
            OutfitItemRef(
                id="item-acc-1",
                name="Matte Acetate Sunglasses",
                category="Accessories",
                imageUrl="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
                color="Black",
            ),
        ]
        explanation = "A masterclass in proportions. The relaxed volume of the white poplin pairs naturally with structured straight denim, while acetate eyewear provides clean geometric balance."
        tips = [
            "Roll the shirt cuffs twice up to the forearms for a sculpted silhouette.",
            "Add a single silver ring or minimal cuff bracelet.",
        ]

    return OutfitGenerateResponse(
        id=f"outfit-{uuid.uuid4().hex[:8]}",
        name=name,
        occasion=request.occasion,
        style=request.style,
        confidence_score=97,
        items=items,
        explanation=explanation,
        styling_tips=tips,
        is_ai_generated=False,
        notice="Synthesized using intelligent wardrobe algorithms. Configure GEMINI_API_KEY in backend/.env for live LLM reasoning.",
    )

async def generate_outfit(request: OutfitGenerateRequest) -> OutfitGenerateResponse:
    """
    Outfit Synthesis Agent:
    Combines inventory, weather, occasion, and style aesthetic into a unified look.
    """
    settings = get_settings()

    if not settings.is_gemini_active:
        logger.info("GEMINI_API_KEY not set. Generating outfit via rule-based AI engine.")
        return _build_fallback_outfit(request)

    try:
        available_items = request.wardrobe_items or DEFAULT_CAPSULE_ITEMS
        inventory_summary = json.dumps([
            {"id": it.get("id"), "name": it.get("name"), "category": it.get("category"), "color": it.get("color")}
            for it in available_items
        ], indent=2)

        user_prompt = f"""
Input Parameters:
- Occasion: {request.occasion}
- Target Style: {request.style}
- Color Palette Preference: {request.color_preference or 'Neutral'}
- Ambient Weather: {request.temperature or '24°C'}, {request.weather_condition or 'Clear'}
- Custom User Wish: {request.custom_prompt or 'None'}

Available Wardrobe Inventory:
{inventory_summary}
"""

        raw_response = None
        try:
            from google import genai
            client = genai.Client(api_key=settings.GEMINI_API_KEY)
            res = client.models.generate_content(
                model=settings.GEMINI_MODEL,
                contents=[SYSTEM_PROMPT, user_prompt],
            )
            raw_response = res.text
        except Exception:
            import google.generativeai as legacy_genai
            legacy_genai.configure(api_key=settings.GEMINI_API_KEY)
            model = legacy_genai.GenerativeModel("gemini-1.5-flash")
            res = model.generate_content([SYSTEM_PROMPT, user_prompt])
            raw_response = res.text

        if raw_response:
            cleaned = _clean_json_string(raw_response)
            data = json.loads(cleaned)

            selected_ids = data.get("selected_item_ids", [])
            matched_items: List[OutfitItemRef] = []
            id_map = {it["id"]: it for it in available_items}

            for iid in selected_ids:
                if iid in id_map:
                    it = id_map[iid]
                    matched_items.append(OutfitItemRef(
                        id=it["id"],
                        name=it["name"],
                        category=it.get("category", "Tops"),
                        imageUrl=it.get("imageUrl", ""),
                        color=it.get("color"),
                    ))

            # Fallback if no matching items selected
            if not matched_items:
                matched_items = [
                    OutfitItemRef(
                        id=it["id"],
                        name=it["name"],
                        category=it.get("category", "Tops"),
                        imageUrl=it.get("imageUrl", ""),
                        color=it.get("color"),
                    )
                    for it in available_items[:3]
                ]

            return OutfitGenerateResponse(
                id=f"outfit-{uuid.uuid4().hex[:8]}",
                name=data.get("name", f"Curated {request.occasion} Look"),
                occasion=request.occasion,
                style=request.style,
                confidence_score=int(data.get("confidence_score", 96)),
                items=matched_items,
                explanation=data.get("explanation", "Carefully balanced silhouette."),
                styling_tips=data.get("styling_tips", []),
                is_ai_generated=True,
                notice="Curated live by Gemini Outfit Synthesis Agent.",
            )

    except Exception as e:
        logger.error(f"Error in Gemini outfit generation: {e}", exc_info=True)

    return _build_fallback_outfit(request)
