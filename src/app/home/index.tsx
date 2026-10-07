import React, { useCallback, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';
import { Image } from 'expo-image';

import { WeatherCard } from '../../components/WeatherCard';
import { AIRecommendationCard } from '../../components/AIRecommendationCard';
import { CategoryChip } from '../../components/CategoryChip';
import { SectionHeader } from '../../components/SectionHeader';
import { BottomNavigation } from '../../components/BottomNavigation';
import { MOCK_WEATHER } from '../../mock/weather';
import { MOCK_OUTFITS } from '../../mock/outfits';
import { getWardrobeItems } from '../../mock/clothing';
import { MOCK_USER } from '../../mock/user';
import { CategoryType, ClothingItem } from '../../types';

const CATEGORIES: CategoryType[] = ['All', 'Tops', 'Bottoms', 'Dresses', 'Shoes', 'Accessories'];

export default function HomeDashboardScreen() {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [clothingList, setClothingList] = useState<ClothingItem[]>(getWardrobeItems);

  // Automatically refresh wardrobe on home screen when focused
  useFocusEffect(
    useCallback(() => {
      setClothingList(getWardrobeItems());
    }, [])
  );

  const filteredClothing =
    selectedCategory === 'All'
      ? clothingList
      : clothingList.filter((item) => item.category === selectedCategory);

  const heroOutfit = MOCK_OUTFITS[0];

  const handleWearThis = () => {
    Alert.alert(
      'Outfit Selected! ✨',
      `You are wearing "${heroOutfit.name}" today. It has been marked on your style calendar!`,
      [{ text: 'Awesome', style: 'default' }]
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Greeting */}
          <View style={styles.greetingHeader}>
            <View>
              <Text style={styles.greetingTitle}>
                Good morning, {MOCK_USER.name} 👋
              </Text>
              <Text style={styles.greetingSubtitle}>Ready to find your look?</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push('/profile' as any)}
              style={styles.avatarWrapper}
            >
              <Image
                source={{ uri: MOCK_USER.avatarUrl }}
                style={styles.avatar}
                contentFit="cover"
              />
            </TouchableOpacity>
          </View>

          {/* Weather Card */}
          <WeatherCard weather={MOCK_WEATHER} />

          {/* AI Pick For You Hero */}
          <SectionHeader
            title="AI Pick For You"
            subtitle="Calculated for today's temperature & your aesthetic"
          />
          <AIRecommendationCard
            outfit={heroOutfit}
            onPress={() => router.push('/outfits/details' as any)}
            onWearThis={handleWearThis}
          />

          {/* Quick Actions */}
          <SectionHeader title="Quick Actions" />
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity
              activeOpacity={0.82}
              onPress={() => router.push('/wardrobe/add-item' as any)}
              style={styles.quickActionCard}
            >
              <View style={[styles.actionIconCircle, { backgroundColor: 'rgba(124, 58, 237, 0.15)' }]}>
                <Text style={styles.actionEmoji}>➕</Text>
              </View>
              <Text style={styles.actionTitle}>Add Clothing</Text>
              <Text style={styles.actionDesc}>Digitize wardrobe</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.82}
              onPress={() => router.push('/outfits/generate' as any)}
              style={styles.quickActionCard}
            >
              <View style={[styles.actionIconCircle, { backgroundColor: 'rgba(236, 72, 153, 0.15)' }]}>
                <Text style={styles.actionEmoji}>⚡</Text>
              </View>
              <Text style={styles.actionTitle}>Generate Outfit</Text>
              <Text style={styles.actionDesc}>AI style builder</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.82}
              onPress={() => router.push('/stylist' as any)}
              style={styles.quickActionCard}
            >
              <View style={[styles.actionIconCircle, { backgroundColor: 'rgba(59, 130, 246, 0.15)' }]}>
                <Text style={styles.actionEmoji}>💬</Text>
              </View>
              <Text style={styles.actionTitle}>Ask AI Stylist</Text>
              <Text style={styles.actionDesc}>Fashion concierge</Text>
            </TouchableOpacity>
          </View>

          {/* Your Wardrobe Section */}
          <SectionHeader
            title="Your Wardrobe"
            subtitle={`${clothingList.length} items cataloged`}
            actionText="View All"
            onAction={() => router.push('/wardrobe' as any)}
            style={{ marginTop: 24 }}
          />

          {/* Categories Horizontal Scroll */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesRow}
          >
            {CATEGORIES.map((cat) => (
              <CategoryChip
                key={cat}
                label={cat}
                isSelected={selectedCategory === cat}
                onPress={() => setSelectedCategory(cat)}
              />
            ))}
          </ScrollView>

          {/* Wardrobe Items Horizontal Carousel */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.clothingPreviewRow}
          >
            {filteredClothing.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.88}
                onPress={() => router.push({ pathname: '/wardrobe/[id]' as any, params: { id: item.id } })}
                style={styles.previewCard}
              >
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.previewImage}
                  contentFit="cover"
                />
                <View style={styles.previewInfo}>
                  <Text style={styles.previewTitle} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.previewCategory}>
                    {item.category} • {item.color}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Bottom spacing for floating navigation */}
          <View style={{ height: 100 }} />
        </ScrollView>

        <BottomNavigation currentTab="home" />
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
    paddingTop: 16,
  },
  greetingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greetingTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  greetingSubtitle: {
    color: '#A1A1AA',
    fontSize: 13,
    marginTop: 3,
  },
  avatarWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#7C3AED',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#141418',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    padding: 14,
    alignItems: 'flex-start',
  },
  actionIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  actionEmoji: {
    fontSize: 16,
  },
  actionTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  actionDesc: {
    color: '#71717A',
    fontSize: 10,
    fontWeight: '500',
  },
  categoriesRow: {
    paddingBottom: 16,
  },
  clothingPreviewRow: {
    gap: 14,
    paddingBottom: 10,
  },
  previewCard: {
    width: 140,
    borderRadius: 18,
    backgroundColor: '#141418',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#1C1C24',
  },
  previewInfo: {
    padding: 10,
  },
  previewTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  previewCategory: {
    color: '#A1A1AA',
    fontSize: 11,
  },
});
