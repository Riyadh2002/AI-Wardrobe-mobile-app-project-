import { CategoryType, ClothingItem, OccasionType, Outfit, SeasonType, StyleType, StylistMessage } from '../types';
import { MOCK_OUTFITS } from '../mock/outfits';
import { MOCK_CLOTHING, getWardrobeItems } from '../mock/clothing';

// Default API base URL (can be customized via EXPO_PUBLIC_API_URL)
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface AutoTagResult {
  name: string;
  category: CategoryType;
  color: string;
  colorHex: string;
  style: StyleType;
  season: SeasonType;
  brand?: string;
  pattern?: string;
  material?: string;
  stylingTips?: string[];
  isAiGenerated: boolean;
  notice?: string;
}

export interface GenerateOutfitPayload {
  occasion: string;
  style: string;
  colorPreference?: string;
  temperature?: string;
  weatherCondition?: string;
  customPrompt?: string;
  wardrobeItems?: ClothingItem[];
}

export interface StylistChatResult {
  message: string;
  suggestedPrompts: string[];
  outfitSuggestion?: Outfit;
  isAiGenerated: boolean;
  notice?: string;
}

export interface BackendStatus {
  online: boolean;
  geminiActive: boolean;
  mode: string;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Check backend health and Gemini status
   */
  async checkHealth(): Promise<BackendStatus> {
    try {
      const res = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        return {
          online: true,
          geminiActive: !!data.gemini_active,
          mode: data.mode || 'Fallback',
        };
      }
    } catch {
      // Backend offline
    }
    return { online: false, geminiActive: false, mode: 'Offline' };
  }

  /**
   * Multimodal Vision Garment Auto-Tagging
   */
  async autoTagClothing(payload: {
    imageUrl?: string;
    imageBase64?: string;
    hint?: string;
  }): Promise<AutoTagResult> {
    try {
      const res = await fetch(`${this.baseUrl}/wardrobe/auto-tag`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_url: payload.imageUrl,
          image_base64: payload.imageBase64,
          hint: payload.hint,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return {
          name: data.name,
          category: data.category as CategoryType,
          color: data.color,
          colorHex: data.colorHex || '#18181B',
          style: data.style as StyleType,
          season: data.season as SeasonType,
          brand: data.brand || 'Studio Nicholson',
          pattern: data.pattern,
          material: data.material,
          stylingTips: data.styling_tips || [],
          isAiGenerated: data.is_ai_generated,
          notice: data.notice,
        };
      }
    } catch (err) {
      console.log('Backend offline or unreachable, using local intelligent auto-tag fallback.');
    }

    // Local heuristic fallback if backend offline
    const hint = (payload.hint || '').toLowerCase();
    const url = (payload.imageUrl || '').toLowerCase();

    if (hint.includes('denim') || url.includes('denim') || hint.includes('pant')) {
      return {
        name: 'Vintage Straight Raw Denim',
        category: 'Bottoms',
        color: 'Navy',
        colorHex: '#1E3A8A',
        style: 'Casual',
        season: 'All Year',
        brand: "Levi's Vintage",
        stylingTips: ['Pair with a crisp white shirt tucked in', 'Cuff hem twice with low sneakers'],
        isAiGenerated: false,
        notice: 'Auto-detected via local client heuristic',
      };
    } else if (hint.includes('jacket') || hint.includes('leather') || url.includes('leather')) {
      return {
        name: 'Structured Leather Biker Jacket',
        category: 'Tops',
        color: 'Black',
        colorHex: '#111827',
        style: 'Streetwear',
        season: 'Fall',
        brand: 'Acne Studios',
        stylingTips: ['Layer over a heavyweight white tee', 'Pair with relaxed pleated trousers'],
        isAiGenerated: false,
        notice: 'Auto-detected via local client heuristic',
      };
    } else if (hint.includes('sneaker') || hint.includes('shoe') || url.includes('sneaker')) {
      return {
        name: 'Minimalist Nappa Low Sneakers',
        category: 'Shoes',
        color: 'White',
        colorHex: '#F9FAFB',
        style: 'Minimal',
        season: 'All Year',
        brand: 'Common Projects',
        stylingTips: ['Versatile base for tailored trousers', 'Wipe clean regularly'],
        isAiGenerated: false,
        notice: 'Auto-detected via local client heuristic',
      };
    } else if (hint.includes('dress') || url.includes('dress')) {
      return {
        name: 'Silk Bias-Cut Slip Dress',
        category: 'Dresses',
        color: 'Burgundy',
        colorHex: '#831843',
        style: 'Formal',
        season: 'Summer',
        brand: 'Reformation',
        stylingTips: ['Style with barely-there sandals', 'Layer with oversized blazer for evening'],
        isAiGenerated: false,
        notice: 'Auto-detected via local client heuristic',
      };
    }

    return {
      name: 'Oversized Poplin Shirt',
      category: 'Tops',
      color: 'White',
      colorHex: '#F9FAFB',
      style: 'Casual',
      season: 'Summer',
      brand: 'Studio Nicholson',
      stylingTips: ['Wear unbuttoned over a clean tank', 'Roll cuffs twice for modern drape'],
      isAiGenerated: false,
      notice: 'Auto-detected via local client heuristic',
    };
  }

  /**
   * Synthesize AI Outfit
   */
  async generateOutfit(payload: GenerateOutfitPayload): Promise<Outfit> {
    try {
      const res = await fetch(`${this.baseUrl}/outfits/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          occasion: payload.occasion,
          style: payload.style,
          color_preference: payload.colorPreference,
          temperature: payload.temperature,
          weather_condition: payload.weatherCondition,
          custom_prompt: payload.customPrompt,
          wardrobe_items: payload.wardrobeItems || getWardrobeItems(),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const pieces = (data.items || []).map((it: any) => ({
          type: (it.category === 'Tops' ? 'Top' : it.category === 'Bottoms' ? 'Bottom' : it.category) as any,
          item: {
            id: it.id,
            name: it.name,
            category: it.category,
            imageUrl: it.imageUrl,
            color: it.color || 'Neutral',
            colorHex: '#18181B',
            style: (data.style as StyleType) || 'Minimal',
            season: 'All Year' as const,
            isFavorite: false,
            createdAt: '2026-09-12',
          },
        }));

        return {
          id: data.id,
          name: data.name,
          description: `Curated ${data.occasion} outfit with a ${data.style} aesthetic.`,
          occasion: data.occasion as OccasionType,
          style: data.style as StyleType,
          imageUrl: data.items?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800',
          isFavorite: false,
          whyThisWorks: data.explanation || 'Carefully balanced silhouette and modern tones.',
          pieces,
        };
      }
    } catch (err) {
      console.log('Backend offline or unreachable, using local outfit recommendation engine.');
    }

    // Local fallback matching occasion
    const match = MOCK_OUTFITS.find(
      (o) => o.occasion.toLowerCase() === payload.occasion.toLowerCase()
    );
    return match || MOCK_OUTFITS[0];
  }

  /**
   * Conversational AI Stylist Chat
   */
  async chatWithStylist(
    message: string,
    history?: StylistMessage[]
  ): Promise<StylistChatResult> {
    try {
      const historyPayload = (history || []).slice(-5).map((m) => ({
        id: m.id,
        sender: m.sender,
        text: m.text,
        timestamp: m.timestamp,
      }));

      const res = await fetch(`${this.baseUrl}/stylist/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          history: historyPayload,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return {
          message: data.message,
          suggestedPrompts: data.suggested_prompts || [
            'Show another look',
            'What shoes go best?',
            'Save to favorites',
          ],
          isAiGenerated: data.is_ai_generated,
          notice: data.notice,
        };
      }
    } catch (err) {
      console.log('Backend offline or unreachable, using local conversational fallback.');
    }

    // Heuristic conversation fallback
    const lower = message.toLowerCase();
    let text =
      "I've analyzed your aesthetic! Focusing on structured neutrals with one tactile contrast gives you effortless polish.";
    let prompts = ['Suggest a look for tonight', 'What colors suit me?', 'Organize my wardrobe'];
    let suggestedOutfit: Outfit | undefined = MOCK_OUTFITS[1];

    if (lower.includes('date')) {
      text =
        'For an evening or gallery date, this fluid silk slip dress balanced by a structured leather jacket makes an unforgettable statement.';
      prompts = ['What jewelry matches?', 'Show shoe options', 'How to dress down?'];
      suggestedOutfit = MOCK_OUTFITS[3];
    } else if (lower.includes('shirt')) {
      text =
        'To elevate an oversized white poplin shirt, balance relaxed volume with vintage raw denim or tailored high-waist trousers.';
      prompts = ['Which belt works best?', 'Can I wear it to the office?', 'Layering ideas'];
      suggestedOutfit = MOCK_OUTFITS[0];
    } else if (lower.includes('pack') || lower.includes('trip') || lower.includes('travel')) {
      text =
        'For a 3-day trip, pack a 5-piece capsule: 2 breathable tops, 1 raw denim, 1 tailored relaxed trouser, and a versatile coat.';
      prompts = ['Footwear suggestions?', 'How to avoid wrinkles?', 'Color palette'];
      suggestedOutfit = MOCK_OUTFITS[2];
    }

    return {
      message: text,
      suggestedPrompts: prompts,
      outfitSuggestion: suggestedOutfit,
      isAiGenerated: false,
      notice: 'Generated via local stylist rules',
    };
  }
}

export const api = new ApiService();
