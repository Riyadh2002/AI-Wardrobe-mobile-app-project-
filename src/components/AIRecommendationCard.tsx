import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { Outfit } from '../types';

interface AIRecommendationCardProps {
  outfit: Outfit;
  onPress: () => void;
  onWearThis: () => void;
  style?: ViewStyle;
}

export const AIRecommendationCard: React.FC<AIRecommendationCardProps> = ({
  outfit,
  onPress,
  onWearThis,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={onPress}
      style={[styles.card, style]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: outfit.imageUrl }}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />

        {/* AI Badge Overlay */}
        <View style={styles.badgeContainer}>
          <View style={styles.aiBadge}>
            <Text style={styles.aiBadgeIcon}>✨</Text>
            <Text style={styles.aiBadgeText}>AI Pick For You</Text>
          </View>
        </View>

        {/* Overlay gradient info */}
        <View style={styles.overlayContent}>
          <Text style={styles.title}>{outfit.name}</Text>
          <Text style={styles.description}>{outfit.description}</Text>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onWearThis}
            style={styles.wearButton}
          >
            <Text style={styles.wearButtonText}>Wear This</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#141418',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 24,
  },
  imageContainer: {
    width: '100%',
    height: 380,
    backgroundColor: '#1E1E26',
    position: 'relative',
    justifyContent: 'space-between',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  badgeContainer: {
    padding: 16,
    flexDirection: 'row',
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(9, 9, 11, 0.85)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#7C3AED',
  },
  aiBadgeIcon: {
    fontSize: 13,
  },
  aiBadgeText: {
    color: '#DDD6FE',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  overlayContent: {
    padding: 20,
    backgroundColor: 'rgba(9, 9, 11, 0.82)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  description: {
    color: '#D4D4D8',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14,
  },
  wearButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
  },
  wearButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
