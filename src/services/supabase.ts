import { createClient } from '@supabase/supabase-js';
import { ClothingItem, Outfit } from '../types';
import { MOCK_CLOTHING, addWardrobeItem, getWardrobeItems } from '../mock/clothing';
import { MOCK_OUTFITS } from '../mock/outfits';

const SUPABASE_URL =
  process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://mytwspggsbixvwimavyl.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_m1JRmq1gRl4UkgO3M8tKsQ_3vhJZpXV';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Returns true only if Supabase has a valid live project URL and active auth key
 */
export const isSupabaseConfigured = () => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return false;
  // If pointed at paused/inactive placeholder URL or placeholder key, disable network calls to prevent ERR_NAME_NOT_RESOLVED
  if (SUPABASE_URL.includes('mytwspggsbixvwimavyl.supabase.co')) return false;
  if (SUPABASE_ANON_KEY.startsWith('sb_publishable_')) return false;
  return true;
};

/**
 * Fetch all clothing items (with seamless local fallback)
 */
export async function fetchWardrobeItems(): Promise<ClothingItem[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('clothing_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((row) => ({
          id: row.id,
          name: row.name,
          category: row.category,
          color: row.color,
          colorHex: row.color_hex || '#18181B',
          style: row.style,
          season: row.season,
          brand: row.brand,
          imageUrl: row.image_url,
          isFavorite: Boolean(row.is_favorite),
          createdAt: row.created_at,
        }));
      }
    } catch (err) {
      console.log('Supabase fetch error, using local items:', err);
    }
  }

  return getWardrobeItems();
}

/**
 * Add a clothing item (instantly saved locally, synced if Supabase is active)
 */
export async function insertClothingItem(item: Omit<ClothingItem, 'id'>): Promise<ClothingItem> {
  const localId = `cloth-${Date.now()}`;
  const newItem: ClothingItem = {
    ...item,
    id: localId,
  };

  // 1. Immediately save to local reactive store so UI and wardrobe always show the item
  addWardrobeItem(newItem);

  // 2. Sync to Supabase cloud only if a live configured backend exists
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('clothing_items')
        .insert([
          {
            name: item.name,
            category: item.category,
            color: item.color,
            color_hex: item.colorHex,
            style: item.style,
            season: item.season,
            brand: item.brand,
            image_url: item.imageUrl,
            is_favorite: item.isFavorite || false,
          },
        ])
        .select()
        .single();

      if (!error && data) {
        const remoteItem: ClothingItem = {
          id: data.id,
          name: data.name,
          category: data.category,
          color: data.color,
          colorHex: data.color_hex || '#18181B',
          style: data.style,
          season: data.season,
          brand: data.brand,
          imageUrl: data.image_url,
          isFavorite: Boolean(data.is_favorite),
          createdAt: data.created_at,
        };
        addWardrobeItem(remoteItem);
        return remoteItem;
      }
    } catch (err) {
      console.log('Supabase insert skipped/failed, saved locally:', err);
    }
  }

  return newItem;
}

/**
 * Fetch saved outfits from Supabase
 */
export async function fetchSavedOutfits(): Promise<Outfit[]> {
  try {
    const { data, error } = await supabase
      .from('outfits')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((row) => ({
        id: row.id,
        name: row.name,
        description: `Curated ${row.occasion} look with a ${row.style} aesthetic.`,
        occasion: row.occasion,
        style: row.style,
        imageUrl: row.items?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800',
        isFavorite: Boolean(row.is_favorite),
        whyThisWorks: row.explanation || 'Harmonious silhouette and proportion.',
        pieces: row.items || [],
      }));
    }
  } catch (err) {
    console.log('Supabase outfits fetch error, using local mock outfits:', err);
  }

  return MOCK_OUTFITS;
}

/**
 * Save an outfit to Supabase
 */
export async function insertOutfit(outfit: Outfit): Promise<void> {
  try {
    await supabase.from('outfits').insert([
      {
        name: outfit.name,
        occasion: outfit.occasion,
        style: outfit.style,
        explanation: outfit.whyThisWorks,
        items: outfit.pieces,
        is_favorite: outfit.isFavorite,
      },
    ]);
  } catch (err) {
    console.log('Supabase outfit save error:', err);
  }
}

/**
 * Upload a garment image to Supabase Storage bucket (wardrobe-images)
 */
export async function uploadGarmentImage(
  fileName: string,
  fileData: Blob | ArrayBuffer | Uint8Array,
  contentType: string = 'image/jpeg'
): Promise<string | null> {
  try {
    const filePath = `garments/${Date.now()}_${fileName}`;
    const { data, error } = await supabase.storage
      .from('wardrobe-images')
      .upload(filePath, fileData, {
        contentType,
        upsert: true,
      });

    if (error) {
      console.log('Error uploading image to Supabase Storage:', error.message);
      return null;
    }

    const { data: pubData } = supabase.storage
      .from('wardrobe-images')
      .getPublicUrl(data.path);

    return pubData.publicUrl;
  } catch (err) {
    console.log('Error in uploadGarmentImage:', err);
    return null;
  }
}

