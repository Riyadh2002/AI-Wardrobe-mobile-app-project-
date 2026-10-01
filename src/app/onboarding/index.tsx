import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Button } from '../../components/Button';

interface Slide {
  id: string;
  title: string;
  description: string;
  badge: string;
  imageUrl: string;
}

const SLIDES: Slide[] = [
  {
    id: '1',
    badge: 'WARDROBE DIGITIZATION',
    title: 'Your entire wardrobe,\nin one place.',
    description: 'Digitize your clothes, track what you own, and keep your personal wardrobe organized with zero clutter.',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    badge: 'SMART AI STYLING',
    title: 'Let AI\nstyle you.',
    description: 'Get personalized outfit recommendations based on your clothes, personal aesthetic, weather, and occasion.',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    badge: 'PERSONAL FASHION CONCIERGE',
    title: 'Never wonder\nwhat to wear.',
    description: 'Your personal AI stylist is always on demand to curate outfits, pack for trips, and elevate your confidence.',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSlide = SLIDES[currentIndex];
  const isLastSlide = currentIndex === SLIDES.length - 1;

  const handleNext = () => {
    if (isLastSlide) {
      router.replace('/auth/login' as any);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    router.replace('/auth/login' as any);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Top Header */}
        <View style={styles.header}>
          <Text style={styles.brandText}>AIWardrobe</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Visual Hero Image Container */}
        <View style={styles.visualContainer}>
          <Image
            source={{ uri: currentSlide.imageUrl }}
            style={styles.image}
            contentFit="cover"
            transition={300}
          />
          <View style={styles.imageOverlay} />

          <View style={styles.badgeWrapper}>
            <Text style={styles.badgeText}>{currentSlide.badge}</Text>
          </View>
        </View>

        {/* Content Card */}
        <View style={styles.contentSection}>
          <Text style={styles.title}>{currentSlide.title}</Text>
          <Text style={styles.description}>{currentSlide.description}</Text>

          {/* Pagination Indicators */}
          <View style={styles.paginationRow}>
            {SLIDES.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentIndex === index && styles.dotActive,
                ]}
              />
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsContainer}>
            <Button
              title={isLastSlide ? 'Get Started' : 'Next'}
              onPress={handleNext}
              variant="glow"
              size="lg"
            />

            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => router.replace('/auth/login' as any)}
              style={styles.signInButton}
            >
              <Text style={styles.signInText}>
                Already have an account?{' '}
                <Text style={styles.signInHighlight}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090B',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  brandText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  skipText: {
    color: '#A1A1AA',
    fontSize: 14,
    fontWeight: '600',
  },
  visualContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 20,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#141418',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(9, 9, 11, 0.25)',
  },
  badgeWrapper: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(9, 9, 11, 0.85)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  badgeText: {
    color: '#C4B5FD',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  contentSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 38,
    letterSpacing: -0.6,
    marginBottom: 10,
  },
  description: {
    color: '#A1A1AA',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  paginationRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  dotActive: {
    width: 24,
    backgroundColor: '#7C3AED',
  },
  buttonsContainer: {
    gap: 12,
  },
  signInButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  signInText: {
    color: '#71717A',
    fontSize: 14,
  },
  signInHighlight: {
    color: '#C4B5FD',
    fontWeight: '700',
  },
});
