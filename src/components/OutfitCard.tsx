import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { Outfit } from '../types';

interface OutfitCardProps {
  outfit: Outfit;
  onPress: () => void;
  onWearThis?: (outfit: Outfit) => void;
  onToggleFavorite?: (id: string) => void;
  style?: ViewStyle;
}

export const OutfitCard: React.FC<OutfitCardProps> = ({
  outfit,
  onPress,
  onWearThis,
  onToggleFavorite,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.card, style]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: outfit.imageUrl }}
          style={styles.image}
          contentFit="cover"
          transition={250}
        />

        {/* Gradient Overlay & Occasion Badge */}
        <View style={styles.topBadgeRow}>
          <View style={styles.occasionBadge}>
            <Text style={styles.occasionText}>{outfit.occasion}</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onToggleFavorite?.(outfit.id)}
            style={styles.favoriteButton}
          >
            <Text style={[styles.favoriteIcon, outfit.isFavorite && styles.favoriteActive]}>
              {outfit.isFavorite ? '♥' : '♡'}
            </Text>
          </TouchableOpacity>
        </View>

        {outfit.recentlyWorn && (
          <View style={styles.recentlyWornBadge}>
            <Text style={styles.recentlyWornText}>Worn {outfit.wornDate || 'Recently'}</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{outfit.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {outfit.description}
        </Text>

        {/* Piece previews */}
        <View style={styles.piecesRow}>
          {outfit.pieces.slice(0, 4).map((p, idx) => (
            <View key={idx} style={styles.pieceThumbnailWrapper}>
              <Image
                source={{ uri: p.item.imageUrl }}
                style={styles.pieceThumbnail}
                contentFit="cover"
              />
            </View>
          ))}

          {outfit.pieces.length > 4 && (
            <View style={styles.morePieces}>
              <Text style={styles.morePiecesText}>+{outfit.pieces.length - 4}</Text>
            </View>
          )}
        </View>

        {onWearThis && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onWearThis(outfit)}
            style={styles.wearButton}
          >
            <Text style={styles.wearButtonText}>Wear This Look</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    backgroundColor: '#141418',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
    marginBottom: 18,
  },
  imageContainer: {
    width: '100%',
    height: 240,
    backgroundColor: '#1C1C24',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  topBadgeRow: {
    position: 'absolute',
    top: 14,
    left: 14,
    right: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  occasionBadge: {
    backgroundColor: 'rgba(9, 9, 11, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  occasionText: {
    color: '#C4B5FD',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  favoriteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(9, 9, 11, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    color: '#D4D4D8',
    fontSize: 18,
    lineHeight: 20,
  },
  favoriteActive: {
    color: '#EF4444',
  },
  recentlyWornBadge: {
    position: 'absolute',
    bottom: 12,
    left: 14,
    backgroundColor: 'rgba(124, 58, 237, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  recentlyWornText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  description: {
    color: '#A1A1AA',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  piecesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  pieceThumbnailWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1E1E26',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  pieceThumbnail: {
    width: '100%',
    height: '100%',
  },
  morePieces: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  morePiecesText: {
    color: '#D4D4D8',
    fontSize: 12,
    fontWeight: '700',
  },
  wearButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wearButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
