import { StylistMessage } from '../types';
import { MOCK_OUTFITS } from './outfits';

export const SUGGESTED_PROMPTS = [
  'What should I wear today?',
  'Style this white shirt',
  'Outfit for a rooftop date',
  'What goes with black raw jeans?',
  'Help me pack for a 3-day Paris trip',
];

export const INITIAL_MESSAGES: StylistMessage[] = [
  {
    id: 'm1',
    sender: 'stylist',
    text: "Hello Riyad! I'm your AI stylist. It's 28°C and partly cloudy in Dhaka today. How can I inspire your look?",
    timestamp: '10:00 AM',
    suggestedPrompts: SUGGESTED_PROMPTS.slice(0, 3),
  },
  {
    id: 'm2',
    sender: 'user',
    text: 'What should I wear today?',
    timestamp: '10:02 AM',
  },
  {
    id: 'm3',
    sender: 'stylist',
    text: "Based on today's weather (28°C, warm breeze) and your preference for minimal oversized silhouettes, I've curated this effortlessly sharp daytime look for you:",
    timestamp: '10:02 AM',
    outfitSuggestion: MOCK_OUTFITS[0],
    suggestedPrompts: [
      'Show me an alternative',
      'Make it more formal',
      'Save this outfit',
    ],
  },
];
