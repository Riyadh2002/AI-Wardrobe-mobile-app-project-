import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

export default function SplashScreenComponent() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Hide native splash once ready
    SplashScreen.hideAsync().catch(() => {});

    // Entrance animation
    const useNative = Platform.OS !== 'web';
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: useNative,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 7,
        tension: 40,
        useNativeDriver: useNative,
      }),
      Animated.timing(glowAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: useNative,
      }),
    ]).start();

    // Auto navigate after 2.4s to onboarding
    const timeout = setTimeout(() => {
      router.replace('/onboarding' as any);
    }, 2400);

    return () => clearTimeout(timeout);
  }, []);

  const handleSkip = () => {
    router.replace('/onboarding' as any);
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handleSkip}
      style={styles.container}
    >
      {/* Background ambient glow */}
      <Animated.View
        style={[
          styles.glowCircle,
          {
            opacity: glowAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.45],
            }),
            transform: [
              {
                scale: glowAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1.2],
                }),
              },
            ],
          },
        ]}
      />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Brand Icon Badge */}
        <View style={styles.logoBadge}>
          <Text style={styles.logoLetter}>C</Text>
          <View style={styles.sparkleDot} />
        </View>

        {/* Title */}
        <Text style={styles.brandTitle}>
          AI<Text style={styles.brandAccent}>Wardrobe</Text>
        </Text>

        {/* Tagline */}
        <Text style={styles.tagline}>Your wardrobe. Reimagined by AI.</Text>

        {/* Minimal indicator */}
        <View style={styles.loaderRow}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
        </View>
      </Animated.View>

      <Text style={styles.tapToContinue}>Tap anywhere to continue</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  glowCircle: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#7C3AED',
    filter: 'blur(70px)',
  },
  content: {
    alignItems: 'center',
  },
  logoBadge: {
    width: 80,
    height: 80,
    borderRadius: 26,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
    position: 'relative',
  },
  logoLetter: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: '800',
  },
  sparkleDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DDD6FE',
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  brandAccent: {
    color: '#A78BFA',
  },
  tagline: {
    color: '#A1A1AA',
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0.2,
    marginBottom: 32,
  },
  loaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  dotActive: {
    backgroundColor: '#7C3AED',
    width: 18,
  },
  tapToContinue: {
    position: 'absolute',
    bottom: 40,
    color: '#71717A',
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});