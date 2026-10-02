import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { ClothingItem } from '../types';

interface ClothingCardProps {
  item: ClothingItem;
  onPress: () => void;
  onToggleFavorite?: (id: string) => void;
  style?: ViewStyle;
}

export const ClothingCard: React.FC<ClothingCardProps> = ({
  item,
  onPress,
  onToggleFavorite,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      style={[styles.card, style]}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          contentFit="cover"
          transition={250}
        />

        {/* Favorite Icon */}
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => onToggleFavorite?.(item.id)}
          style={styles.favoriteButton}
        >
          <Text style={[styles.favoriteIcon, item.isFavorite && styles.favoriteActive]}>
            {item.isFavorite ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>

        {/* Brand Tag / Style Pill */}
        {item.brand && (
          <View style={styles.brandBadge}>
            <Text style={styles.brandBadgeText}>{item.brand}</Text>
          </View>
        )}
      </View>

      {/* Info Section */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {item.name}
        </Text>

        <View style={styles.metaRow}>
          <View
            style={[
              styles.colorDot,
              { backgroundColor: item.colorHex || '#A1A1AA' },
            ]}
          />
          <Text style={styles.metaText}>
            {item.category} • {item.color}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    backgroundColor: '#141418',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
    marginBottom: 14,
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 0.85,
    backgroundColor: '#1A1A22',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(9, 9, 11, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    fontSize: 16,
    color: '#D4D4D8',
    lineHeight: 18,
  },
  favoriteActive: {
    color: '#EF4444',
  },
  brandBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(9, 9, 11, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  brandBadgeText: {
    color: '#C4B5FD',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  info: {
    padding: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.2,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  metaText: {
    color: '#A1A1AA',
    fontSize: 12,
    fontWeight: '500',
  },
});
