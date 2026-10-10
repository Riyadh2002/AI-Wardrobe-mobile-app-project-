import React, { useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import {
  MOCK_CLOTHING,
  getWardrobeItemById,
  removeWardrobeItem,
  toggleFavoriteItem,
} from '../../mock/clothing';
import { ClothingItem } from '../../types';

export default function ClothingDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const item: ClothingItem =
    (id ? getWardrobeItemById(id) : undefined) ||
    MOCK_CLOTHING.find((c) => c.id === id) ||
    MOCK_CLOTHING[0];

  const [isFavorite, setIsFavorite] = useState(item.isFavorite || false);

  const handleToggleFavorite = () => {
    const nextState = !isFavorite;
    setIsFavorite(nextState);
    toggleFavoriteItem(item.id);
  };

  const handleDelete = () => {
    const doDelete = () => {
      removeWardrobeItem(item.id);
      router.back();
    };

    if (Platform.OS === 'web') {
      if (window.confirm(`Are you sure you want to remove "${item.name}" from your wardrobe?`)) {
        doDelete();
      }
    } else {
      Alert.alert(
        'Remove from Wardrobe',
        `Are you sure you want to remove "${item.name}" from your wardrobe?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: doDelete,
          },
        ]
      );
    }
  };

  const handleEdit = () => {
    router.push('/wardrobe/add-item' as any);
  };

  const handleCreateOutfitWithThis = () => {
    router.push({
      pathname: '/outfits/generate' as any,
      params: { baseItemId: item.id, baseItemName: item.name },
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header
          title="Garment Details"
          showBack
          onBackPress={() => router.back()}
          rightAction={
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleToggleFavorite}
              style={styles.favoriteHeaderButton}
            >
              <Text style={[styles.favoriteIcon, isFavorite && styles.favoriteActive]}>
                {isFavorite ? '♥' : '♡'}
              </Text>
            </TouchableOpacity>
          }
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Large Hero Garment Image */}
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.image}
              contentFit="cover"
              transition={300}
            />
            {item.brand && (
              <View style={styles.brandBadge}>
                <Text style={styles.brandText}>{item.brand}</Text>
              </View>
            )}
          </View>

          {/* Garment Information */}
          <View style={styles.infoCard}>
            <View style={styles.titleRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.categorySub}>
                  {item.category} • {item.season}
                </Text>
              </View>
            </View>

            {item.notes ? (
              <Text style={styles.notesText}>{item.notes}</Text>
            ) : null}

            <View style={styles.divider} />

            {/* Spec Attributes Grid */}
            <View style={styles.specsGrid}>
              <View style={styles.specBox}>
                <Text style={styles.specLabel}>CATEGORY</Text>
                <Text style={styles.specValue}>{item.category}</Text>
              </View>

              <View style={styles.specBox}>
                <Text style={styles.specLabel}>COLOR</Text>
                <View style={styles.colorRow}>
                  <View
                    style={[
                      styles.colorCircle,
                      { backgroundColor: item.colorHex || '#A1A1AA' },
                    ]}
                  />
                  <Text style={styles.specValue}>{item.color}</Text>
                </View>
              </View>

              <View style={styles.specBox}>
                <Text style={styles.specLabel}>STYLE</Text>
                <Text style={styles.specValue}>{item.style}</Text>
              </View>

              <View style={styles.specBox}>
                <Text style={styles.specLabel}>BEST SEASON</Text>
                <Text style={styles.specValue}>{item.season}</Text>
              </View>
            </View>

            {/* AI Pairing Insights */}
            <View style={styles.aiInsightBox}>
              <Text style={styles.aiInsightTag}>✨ AI STYLING INSIGHT</Text>
              <Text style={styles.aiInsightText}>
                Pairs exceptionally well with neutral tailored trousers and minimalist leather sneakers. Perfect for modern smart-casual or streetwear looks.
              </Text>
            </View>

            {/* Actions */}
            <View style={styles.actionsContainer}>
              <Button
                title="Create Outfit With This"
                onPress={handleCreateOutfitWithThis}
                variant="glow"
                size="lg"
                icon={<Text style={{ fontSize: 18 }}>✨</Text>}
                style={styles.primaryAction}
              />

              <View style={styles.secondaryActionsRow}>
                <Button
                  title="Edit Item"
                  onPress={handleEdit}
                  variant="secondary"
                  size="md"
                  style={{ flex: 1 }}
                />

                <Button
                  title="Delete"
                  onPress={handleDelete}
                  variant="ghost"
                  size="md"
                  textStyle={{ color: '#EF4444' }}
                  style={{ flex: 1 }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
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
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  favoriteHeaderButton: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: '#141418',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    fontSize: 20,
    color: '#D4D4D8',
    lineHeight: 22,
  },
  favoriteActive: {
    color: '#EF4444',
  },
  imageWrapper: {
    width: '100%',
    height: 360,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#1C1C24',
    position: 'relative',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  brandBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'rgba(9, 9, 11, 0.85)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  brandText: {
    color: '#DDD6FE',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  infoCard: {
    backgroundColor: '#141418',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  categorySub: {
    color: '#C4B5FD',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  notesText: {
    color: '#A1A1AA',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 6,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginVertical: 18,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  specBox: {
    width: '47%',
    backgroundColor: '#1C1C22',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  specLabel: {
    color: '#71717A',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  specValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  colorCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  aiInsightBox: {
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.3)',
    padding: 14,
    marginBottom: 24,
  },
  aiInsightTag: {
    color: '#C4B5FD',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  aiInsightText: {
    color: '#D4D4D8',
    fontSize: 13,
    lineHeight: 18,
  },
  actionsContainer: {
    gap: 12,
  },
  primaryAction: {
    width: '100%',
  },
  secondaryActionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
});
