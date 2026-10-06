import { Outfit } from '../types';
import { MOCK_CLOTHING } from './clothing';

export const MOCK_OUTFITS: Outfit[] = [
  {
    id: 'o1',
    name: 'Casual Summer Look',
    description: "Perfect for today's weather with effortless style and breathable linen.",
    occasion: 'Casual',
    style: 'Minimal',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80',
    isFavorite: true,
    recentlyWorn: true,
    wornDate: 'Yesterday',
    whyThisWorks:
      'These pieces harmonize through contrast: the crisp white oversized shirt provides relaxed volume, while straight raw denim grounds the silhouette. Clean low sneakers keep it effortlessly sophisticated for daytime warm weather.',
    pieces: [
      { type: 'Top', item: MOCK_CLOTHING[0] }, // White Oversized Shirt
      { type: 'Bottom', item: MOCK_CLOTHING[1] }, // Vintage Straight Denim
      { type: 'Shoes', item: MOCK_CLOTHING[3] }, // Minimalist Sneakers
      { type: 'Accessories', item: MOCK_CLOTHING[9] }, // Sunglasses
    ],
  },
  {
    id: 'o2',
    name: 'Downtown Leather Silhouette',
    description: 'Modern urban edge with structured luxury textures and silver accents.',
    occasion: 'Party',
    style: 'Streetwear',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80',
    isFavorite: true,
    recentlyWorn: false,
    whyThisWorks:
      'The cropped boxy cut of the leather biker establishes strong shoulder definition, complemented by the flowing drape of pleated wide-leg trousers. Chunky Chelsea boots add intentional weight to the lower hem.',
    pieces: [
      { type: 'Top', item: MOCK_CLOTHING[2] }, // Leather Biker
      { type: 'Bottom', item: MOCK_CLOTHING[7] }, // Pleated Wide-Leg Trousers
      { type: 'Shoes', item: MOCK_CLOTHING[8] }, // Chunky Chelsea Boots
      { type: 'Accessories', item: MOCK_CLOTHING[9] }, // Sunglasses
    ],
  },
  {
    id: 'o3',
    name: 'Tailored Minimalist Evening',
    description: 'Warm camel tones layered over dark monochrome essentials.',
    occasion: 'Formal',
    style: 'Formal',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    isFavorite: false,
    recentlyWorn: true,
    wornDate: '3 days ago',
    whyThisWorks:
      'The rich camel wool coat acts as an architectural frame around sleek black pleated trousers and white sneakers, creating the coveted Scandinavian high-low smart casual aesthetic.',
    pieces: [
      { type: 'Top', item: MOCK_CLOTHING[4] }, // Camel Coat
      { type: 'Bottom', item: MOCK_CLOTHING[7] }, // Pleated Trousers
      { type: 'Shoes', item: MOCK_CLOTHING[3] }, // Minimalist Sneakers
      { type: 'Accessories', item: MOCK_CLOTHING[11] }, // Leather Crossbody
    ],
  },
  {
    id: 'o4',
    name: 'Silk Slip Gallery Opening',
    description: 'Sensual silk draping paired with modern minimalist accessories.',
    occasion: 'Date',
    style: 'Minimal',
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=80',
    isFavorite: true,
    recentlyWorn: false,
    whyThisWorks:
      'The rich burgundy silk catches subtle ambient light, paired with sleek angular eyewear and clean footwear for an uncluttered, high-elegance finish.',
    pieces: [
      { type: 'Dress', item: MOCK_CLOTHING[5] }, // Silk Slip Dress
      { type: 'Shoes', item: MOCK_CLOTHING[3] }, // Minimalist Sneakers
      { type: 'Accessories', item: MOCK_CLOTHING[11] }, // Crossbody Bag
      { type: 'Accessories', item: MOCK_CLOTHING[9] }, // Sunglasses
    ],
  },
];
