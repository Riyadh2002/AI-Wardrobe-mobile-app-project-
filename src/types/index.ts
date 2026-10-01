export type CategoryType = 'All' | 'Tops' | 'Bottoms' | 'Dresses' | 'Shoes' | 'Accessories';

export type OccasionType =
  | 'Casual'
  | 'Office'
  | 'Date'
  | 'Party'
  | 'Wedding'
  | 'Travel'
  | 'Workout'
  | 'Formal'
  | 'Smart Casual';

export type StyleType =
  | 'Minimal'
  | 'Casual'
  | 'Streetwear'
  | 'Formal'
  | 'Smart Casual'
  | 'Vintage'
  | 'Sporty';

export type FitType = 'Slim' | 'Regular' | 'Oversized';

export type ColorPreferenceType = 'Neutral' | 'Dark' | 'Bright' | 'Pastel';

export type SeasonType = 'All Year' | 'Spring' | 'Summer' | 'Fall' | 'Winter';

export interface ClothingItem {
  id: string;
  name: string;
  category: CategoryType;
  color: string;
  colorHex: string;
  style: StyleType;
  season: SeasonType;
  brand?: string;
  imageUrl: string;
  isFavorite?: boolean;
  notes?: string;
  createdAt?: string;
}

export interface OutfitPiece {
  type: 'Top' | 'Bottom' | 'Shoes' | 'Accessories' | 'Dress' | 'Outerwear';
  item: ClothingItem;
}

export interface Outfit {
  id: string;
  name: string;
  description: string;
  occasion: OccasionType;
  style: StyleType;
  imageUrl: string;
  isFavorite: boolean;
  recentlyWorn?: boolean;
  wornDate?: string;
  whyThisWorks: string;
  pieces: OutfitPiece[];
}

export interface WeatherInfo {
  temperature: string;
  city: string;
  condition: string;
  icon: string;
  recommendation: string;
}

export interface StylistMessage {
  id: string;
  sender: 'user' | 'stylist';
  text: string;
  timestamp: string;
  outfitSuggestion?: Outfit;
  suggestedPrompts?: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  subtitle: string;
  avatarUrl: string;
  wardrobeCount: number;
  outfitsCount: number;
  stylePreferences: {
    preferredStyles: StyleType[];
    favoriteColors: string[];
    preferredFit: FitType;
    preferredOccasions: OccasionType[];
    seasons: SeasonType[];
  };
}
