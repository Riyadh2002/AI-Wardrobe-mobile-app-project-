import React, { useCallback, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';

import { ClothingCard } from '../../components/ClothingCard';
import { CategoryChip } from '../../components/CategoryChip';
import { EmptyState } from '../../components/EmptyState';
import { BottomNavigation } from '../../components/BottomNavigation';
import { getWardrobeItems, toggleFavoriteItem } from '../../mock/clothing';
import { CategoryType, ClothingItem } from '../../types';

const CATEGORIES: CategoryType[] = ['All', 'Tops', 'Bottoms', 'Dresses', 'Shoes', 'Accessories'];

export default function WardrobeScreen() {
  const router = useRouter();

  const [items, setItems] = useState<ClothingItem[]>(getWardrobeItems);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // Automatically refresh whenever user navigates back to the Wardrobe tab
  useFocusEffect(
    useCallback(() => {
      setItems(getWardrobeItems());
    }, [])
  );

  const toggleFavorite = (id: string) => {
    toggleFavoriteItem(id);
    setItems(getWardrobeItems());
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.brand && item.brand.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Top Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>My Wardrobe</Text>
            <Text style={styles.subtitle}>{items.length} items cataloged</Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => setShowSearch(!showSearch)}
              style={styles.iconButton}
            >
              <Text style={styles.actionEmoji}>{showSearch ? '✕' : '🔍'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push('/wardrobe/add-item' as any)}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>+ Add</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Optional Search Bar */}
        {showSearch && (
          <View style={styles.searchBarWrapper}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search garments, colors, brands..."
              placeholderTextColor="#71717A"
              style={styles.searchInput}
              autoFocus
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Text style={styles.clearSearch}>✕</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        )}

        {/* Category Filter Chips */}
        <View style={styles.categoriesContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={CATEGORIES}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              const count =
                item === 'All'
                  ? items.length
                  : items.filter((c) => c.category === item).length;
              return (
                <CategoryChip
                  label={item}
                  count={count}
                  isSelected={selectedCategory === item}
                  onPress={() => setSelectedCategory(item)}
                />
              );
            }}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* 2-Column Clothing Grid */}
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.gridContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState
              icon="🗄️"
              title="No items found"
              subtitle={
                searchQuery
                  ? `No clothing matched "${searchQuery}". Try another filter or add it to your closet.`
                  : 'Add your first clothing item and let AI organize your style.'
              }
              actionTitle="+ Add Clothing"
              onAction={() => router.push('/wardrobe/add-item' as any)}
            />
          }
          renderItem={({ item }) => (
            <View style={styles.gridItem}>
              <ClothingCard
                item={item}
                onPress={() =>
                  router.push({
                    pathname: '/wardrobe/[id]' as any,
                    params: { id: item.id },
                  })
                }
                onToggleFavorite={toggleFavorite}
              />
            </View>
          )}
          ListFooterComponent={<View style={{ height: 110 }} />}
        />

        <BottomNavigation currentTab="wardrobe" />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  subtitle: {
    color: '#A1A1AA',
    fontSize: 12,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#141418',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionEmoji: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141418',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 46,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
  },
  clearSearch: {
    color: '#A1A1AA',
    fontSize: 14,
    padding: 4,
  },
  categoriesContainer: {
    marginVertical: 8,
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  gridContent: {
    paddingHorizontal: 14,
    paddingTop: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 6,
  },
  gridItem: {
    width: '48%',
  },
});
