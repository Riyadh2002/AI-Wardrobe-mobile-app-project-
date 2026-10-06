import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { Header } from '../../components/Header';
import { OutfitCard } from '../../components/OutfitCard';
import { EmptyState } from '../../components/EmptyState';
import { MOCK_OUTFITS } from '../../mock/outfits';
import { Outfit } from '../../types';

type TabType = 'Favorites' | 'All' | 'Recently Worn';

export default function SavedOutfitsScreen() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<TabType>('Favorites');
  const [outfits, setOutfits] = useState<Outfit[]>(MOCK_OUTFITS);

  const toggleFavorite = (id: string) => {
    setOutfits((prev) =>
      prev.map((o) => (o.id === id ? { ...o, isFavorite: !o.isFavorite } : o))
    );
  };

  const filteredOutfits = outfits.filter((o) => {
    if (activeTab === 'Favorites') return o.isFavorite;
    if (activeTab === 'Recently Worn') return o.recentlyWorn;
    return true;
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header
          title="Saved Looks"
          subtitle={`${outfits.length} curated ensembles`}
          showBack
          onBackPress={() => router.back()}
          rightAction={
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push('/outfits/generate' as any)}
              style={styles.generateButton}
            >
              <Text style={styles.generateButtonText}>+ Generate</Text>
            </TouchableOpacity>
          }
        />

        {/* Tab Filters */}
        <View style={styles.tabsContainer}>
          {(['Favorites', 'All', 'Recently Worn'] as TabType[]).map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                activeOpacity={0.75}
                onPress={() => setActiveTab(tab)}
                style={[styles.tabButton, isSelected && styles.tabButtonSelected]}
              >
                <Text style={[styles.tabText, isSelected && styles.tabTextSelected]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Outfits List */}
        <FlatList
          data={filteredOutfits}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState
              icon="👗"
              title={
                activeTab === 'Favorites'
                  ? 'No favorite looks yet'
                  : activeTab === 'Recently Worn'
                  ? 'No recently worn outfits'
                  : 'No saved looks'
              }
              subtitle="Generate a personalized outfit with AI or save your favorite combinations."
              actionTitle="✨ Generate Outfit"
              onAction={() => router.push('/outfits/generate')}
            />
          }
          renderItem={({ item }) => (
            <OutfitCard
              outfit={item}
              onPress={() => router.push('/outfits/details' as any)}
              onToggleFavorite={toggleFavorite}
              onWearThis={() => router.push('/outfits/details' as any)}
            />
          )}
        />
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
  generateButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: '#141418',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  tabButtonSelected: {
    backgroundColor: '#7C3AED',
    borderColor: '#8B5CF6',
  },
  tabText: {
    color: '#A1A1AA',
    fontSize: 13,
    fontWeight: '600',
  },
  tabTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },
});
