import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { MOCK_USER } from '../../mock/user';
import { FitType, OccasionType, SeasonType, StyleType } from '../../types';

const STYLES: StyleType[] = [
  'Minimal',
  'Casual',
  'Streetwear',
  'Formal',
  'Vintage',
  'Sporty',
];

const COLORS = [
  { name: 'Black', hex: '#09090B' },
  { name: 'White', hex: '#F9FAFB' },
  { name: 'Charcoal', hex: '#374151' },
  { name: 'Navy', hex: '#1E3A8A' },
  { name: 'Camel', hex: '#D97706' },
  { name: 'Sage', hex: '#065F46' },
  { name: 'Burgundy', hex: '#831843' },
  { name: 'Purple', hex: '#7C3AED' },
  { name: 'Beige', hex: '#E5E5E5' },
];

const FITS: FitType[] = ['Slim', 'Regular', 'Oversized'];

const OCCASIONS: OccasionType[] = [
  'Casual',
  'Office',
  'Date',
  'Party',
  'Wedding',
  'Travel',
  'Workout',
];

const SEASONS: SeasonType[] = ['All Year', 'Spring', 'Summer', 'Fall', 'Winter'];

export default function StylePreferencesScreen() {
  const router = useRouter();

  const [selectedStyles, setSelectedStyles] = useState<StyleType[]>(
    MOCK_USER.stylePreferences.preferredStyles
  );
  const [selectedColors, setSelectedColors] = useState<string[]>(
    MOCK_USER.stylePreferences.favoriteColors
  );
  const [selectedFit, setSelectedFit] = useState<FitType>(
    MOCK_USER.stylePreferences.preferredFit
  );
  const [selectedOccasions, setSelectedOccasions] = useState<OccasionType[]>(
    MOCK_USER.stylePreferences.preferredOccasions
  );
  const [selectedSeasons, setSelectedSeasons] = useState<SeasonType[]>(
    MOCK_USER.stylePreferences.seasons
  );

  const toggleStyle = (style: StyleType) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  const toggleColor = (hex: string) => {
    setSelectedColors((prev) =>
      prev.includes(hex) ? prev.filter((c) => c !== hex) : [...prev, hex]
    );
  };

  const toggleOccasion = (occ: OccasionType) => {
    setSelectedOccasions((prev) =>
      prev.includes(occ) ? prev.filter((o) => o !== occ) : [...prev, occ]
    );
  };

  const toggleSeason = (season: SeasonType) => {
    setSelectedSeasons((prev) =>
      prev.includes(season) ? prev.filter((s) => s !== season) : [...prev, season]
    );
  };

  const handleSave = () => {
    Alert.alert(
      'Preferences Saved! ✨',
      'Your AI fashion stylist has recalibrated outfit recommendation weights.',
      [
        {
          text: 'Return to Profile',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header
          title="Style Preferences"
          subtitle="Fine-tune your personal fashion model"
          showBack
          onBackPress={() => router.back()}
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Preferred Styles */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Preferred Styles</Text>
            <Text style={styles.sectionSub}>Select aesthetic directions you lean toward</Text>
            <View style={styles.chipsWrap}>
              {STYLES.map((st) => {
                const isSelected = selectedStyles.includes(st);
                return (
                  <TouchableOpacity
                    key={st}
                    activeOpacity={0.75}
                    onPress={() => toggleStyle(st)}
                    style={[styles.chip, isSelected && styles.chipSelected]}
                  >
                    <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                      {st}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Favorite Colors */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Favorite Colors</Text>
            <Text style={styles.sectionSub}>Select core palette tones for recommendations</Text>
            <View style={styles.colorsGrid}>
              {COLORS.map((c) => {
                const isSelected = selectedColors.includes(c.hex);
                return (
                  <TouchableOpacity
                    key={c.name}
                    activeOpacity={0.8}
                    onPress={() => toggleColor(c.hex)}
                    style={[
                      styles.colorSwatch,
                      { backgroundColor: c.hex },
                      isSelected && styles.colorSwatchSelected,
                    ]}
                  >
                    {isSelected && (
                      <Text
                        style={[
                          styles.colorCheck,
                          { color: c.hex === '#F9FAFB' || c.hex === '#E5E5E5' ? '#000' : '#FFF' },
                        ]}
                      >
                        ✓
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Preferred Fit */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Preferred Fit</Text>
            <Text style={styles.sectionSub}>Silhouette cutting proportion</Text>
            <View style={styles.fitsRow}>
              {FITS.map((fit) => {
                const isSelected = selectedFit === fit;
                return (
                  <TouchableOpacity
                    key={fit}
                    activeOpacity={0.8}
                    onPress={() => setSelectedFit(fit)}
                    style={[styles.fitBox, isSelected && styles.fitBoxSelected]}
                  >
                    <Text style={[styles.fitText, isSelected && styles.fitTextSelected]}>
                      {fit}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Preferred Occasions */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Preferred Occasions</Text>
            <Text style={styles.sectionSub}>Frequent events you need looks for</Text>
            <View style={styles.chipsWrap}>
              {OCCASIONS.map((occ) => {
                const isSelected = selectedOccasions.includes(occ);
                return (
                  <TouchableOpacity
                    key={occ}
                    activeOpacity={0.75}
                    onPress={() => toggleOccasion(occ)}
                    style={[styles.chip, isSelected && styles.chipSelected]}
                  >
                    <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                      {occ}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Season Preferences */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Season Focus</Text>
            <Text style={styles.sectionSub}>Current wardrobe rotation climate</Text>
            <View style={styles.chipsWrap}>
              {SEASONS.map((sn) => {
                const isSelected = selectedSeasons.includes(sn);
                return (
                  <TouchableOpacity
                    key={sn}
                    activeOpacity={0.75}
                    onPress={() => toggleSeason(sn)}
                    style={[styles.chip, isSelected && styles.chipSelected]}
                  >
                    <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                      {sn}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Save CTA */}
          <Button
            title="Save Preferences"
            onPress={handleSave}
            variant="primary"
            size="lg"
            style={styles.saveButton}
          />
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
  sectionCard: {
    backgroundColor: '#141418',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 18,
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  sectionSub: {
    color: '#A1A1AA',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 14,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    backgroundColor: '#1C1C22',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 14,
  },
  chipSelected: {
    backgroundColor: '#7C3AED',
    borderColor: '#8B5CF6',
  },
  chipText: {
    color: '#A1A1AA',
    fontSize: 13,
    fontWeight: '600',
  },
  chipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  colorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorSwatch: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorSwatchSelected: {
    borderColor: '#A78BFA',
    borderWidth: 3,
    transform: [{ scale: 1.08 }],
  },
  colorCheck: {
    fontSize: 14,
    fontWeight: '800',
  },
  fitsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  fitBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: '#1C1C22',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  fitBoxSelected: {
    backgroundColor: '#7C3AED',
    borderColor: '#8B5CF6',
  },
  fitText: {
    color: '#A1A1AA',
    fontSize: 13,
    fontWeight: '600',
  },
  fitTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  saveButton: {
    marginTop: 10,
    marginBottom: 20,
  },
});
