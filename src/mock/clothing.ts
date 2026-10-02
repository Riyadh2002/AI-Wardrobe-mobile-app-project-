import { ClothingItem } from '../types';

export const MOCK_CLOTHING: ClothingItem[] = [
  {
    id: 'c1',
    name: 'White Oversized Shirt',
    category: 'Tops',
    color: 'White',
    colorHex: '#F9FAFB',
    style: 'Minimal',
    season: 'Summer',
    brand: 'Studio Nicholson',
    imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&auto=format&fit=crop&q=80',
    isFavorite: true,
    notes: 'Breathable organic poplin cotton, boxy drop shoulder cut.',
  },
  {
    id: 'c2',
    name: 'Vintage Straight Raw Denim',
    category: 'Bottoms',
    color: 'Navy',
    colorHex: '#1E3A8A',
    style: 'Casual',
    season: 'All Year',
    brand: "Levi's Vintage",
    imageUrl: 'https://images.unsplash.com/photo-1542272604-780c96856592?w=600&auto=format&fit=crop&q=80',
    isFavorite: true,
    notes: 'Japanese selvedge 14oz denim with mid-rise waist.',
  },
  {
    id: 'c3',
    name: 'Classic Black Leather Biker',
    category: 'Tops',
    color: 'Black',
    colorHex: '#111827',
    style: 'Streetwear',
    season: 'Fall',
    brand: 'Acne Studios',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80',
    isFavorite: true,
    notes: 'Heavyweight lambskin with custom silver hardware.',
  },
  {
    id: 'c4',
    name: 'Minimalist Leather Low Sneakers',
    category: 'Shoes',
    color: 'White',
    colorHex: '#F3F4F6',
    style: 'Minimal',
    season: 'All Year',
    brand: 'Common Projects',
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80',
    isFavorite: false,
    notes: 'Italian nappa leather with tonal rubber cupsole.',
  },
  {
    id: 'c5',
    name: 'Tailored Camel Wool Overcoat',
    category: 'Tops',
    color: 'Camel',
    colorHex: '#D97706',
    style: 'Formal',
    season: 'Winter',
    brand: 'Burberry',
    imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce667883?w=600&auto=format&fit=crop&q=80',
    isFavorite: true,
    notes: 'Double-breasted virgin wool blend with structured shoulders.',
  },
  {
    id: 'c6',
    name: 'Silk Slip Evening Dress',
    category: 'Dresses',
    color: 'Burgundy',
    colorHex: '#831843',
    style: 'Formal',
    season: 'Summer',
    brand: 'Reformation',
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80',
    isFavorite: false,
    notes: '100% mulberry silk cut on the bias.',
  },
  {
    id: 'c7',
    name: 'Chunky Knit Wool Turtleneck',
    category: 'Tops',
    color: 'Charcoal',
    colorHex: '#374151',
    style: 'Minimal',
    season: 'Winter',
    brand: 'COS',
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop&q=80',
    isFavorite: false,
    notes: 'Ribbed merino wool knit with relaxed neckline.',
  },
  {
    id: 'c8',
    name: 'Pleated Wide-Leg Trousers',
    category: 'Bottoms',
    color: 'Black',
    colorHex: '#09090B',
    style: 'Smart Casual',
    season: 'All Year',
    brand: 'Lemaire',
    imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80',
    isFavorite: true,
    notes: 'Flowy drape, deep front pleats with relaxed break.',
  },
  {
    id: 'c9',
    name: 'Retro Chunky Chelsea Boots',
    category: 'Shoes',
    color: 'Black',
    colorHex: '#18181B',
    style: 'Streetwear',
    season: 'Fall',
    brand: 'Bottega Veneta',
    imageUrl: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&auto=format&fit=crop&q=80',
    isFavorite: false,
    notes: 'Treaded lug sole with pull tabs and elastic side gussets.',
  },
  {
    id: 'c10',
    name: 'Angular Geometric Sunglasses',
    category: 'Accessories',
    color: 'Black',
    colorHex: '#111827',
    style: 'Streetwear',
    season: 'All Year',
    brand: 'Gentle Monster',
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80',
    isFavorite: true,
    notes: 'Acetate frame with UV400 protective black lenses.',
  },
  {
    id: 'c11',
    name: 'Washed Cotton Crewneck Tee',
    category: 'Tops',
    color: 'Sage',
    colorHex: '#065F46',
    style: 'Casual',
    season: 'Summer',
    brand: 'Uniqlo U',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    isFavorite: false,
    notes: '280gsm garment-dyed combed cotton.',
  },
  {
    id: 'c12',
    name: 'Structured Leather Crossbody Bag',
    category: 'Accessories',
    color: 'Camel',
    colorHex: '#B45309',
    style: 'Minimal',
    season: 'All Year',
    brand: 'Polène Paris',
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80',
    isFavorite: false,
    notes: 'Full-grain calf leather with gold hardware clasp.',
  },
];

const STORAGE_KEY = 'ai_wardrobe_items_v2';

// In-memory active items initialized with mock items + any saved items in localStorage
let activeWardrobe: ClothingItem[] = (() => {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Prepend saved custom items to default mock items
          const savedCustom = parsed.filter(
            (p: ClothingItem) => !MOCK_CLOTHING.some((m) => m.id === p.id)
          );
          return [...savedCustom, ...MOCK_CLOTHING];
        }
      }
    } catch {
      // Fallback to default
    }
  }
  return [...MOCK_CLOTHING];
})();

function persistStorage() {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(activeWardrobe));
    } catch {
      // Ignore storage errors
    }
  }
}

/**
 * Get all wardrobe items (newest added first)
 */
export function getWardrobeItems(): ClothingItem[] {
  return [...activeWardrobe];
}

/**
 * Add a new garment to the wardrobe
 */
export function addWardrobeItem(item: ClothingItem): ClothingItem {
  // Add to active wardrobe at the top
  activeWardrobe = [item, ...activeWardrobe.filter((x) => x.id !== item.id)];
  // Also keep MOCK_CLOTHING array updated for components referencing it directly
  if (!MOCK_CLOTHING.some((c) => c.id === item.id)) {
    MOCK_CLOTHING.unshift(item);
  }
  persistStorage();
  return item;
}

/**
 * Remove an item from the wardrobe
 */
export function removeWardrobeItem(id: string): void {
  activeWardrobe = activeWardrobe.filter((x) => x.id !== id);
  const mockIndex = MOCK_CLOTHING.findIndex((c) => c.id === id);
  if (mockIndex !== -1) {
    MOCK_CLOTHING.splice(mockIndex, 1);
  }
  persistStorage();
}

/**
 * Find an item by ID
 */
export function getWardrobeItemById(id: string): ClothingItem | undefined {
  return activeWardrobe.find((x) => x.id === id) || MOCK_CLOTHING.find((x) => x.id === id);
}

/**
 * Toggle favorite status
 */
export function toggleFavoriteItem(id: string): void {
  activeWardrobe = activeWardrobe.map((x) =>
    x.id === id ? { ...x, isFavorite: !x.isFavorite } : x
  );
  const found = MOCK_CLOTHING.find((x) => x.id === id);
  if (found) {
    found.isFavorite = !found.isFavorite;
  }
  persistStorage();
}
