import { UserProfile } from '../types';

export const MOCK_USER: UserProfile = {
  id: 'u1',
  name: 'Riyad',
  email: 'riyad@closetai.com',
  subtitle: 'Style enthusiast',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  wardrobeCount: 42,
  outfitsCount: 18,
  stylePreferences: {
    preferredStyles: ['Minimal', 'Streetwear', 'Smart Casual'],
    favoriteColors: ['#09090B', '#F9FAFB', '#1E3A8A', '#D97706', '#7C3AED'],
    preferredFit: 'Oversized',
    preferredOccasions: ['Casual', 'Party', 'Date'],
    seasons: ['All Year', 'Fall', 'Summer'],
  },
};
