import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { AIThinkingIndicator } from '../../components/AIThinkingIndicator';
import { MOCK_WEATHER } from '../../mock/weather';
import { ColorPreferenceType, OccasionType, StyleType } from '../../types';
import { api } from '../../services/api';

const OCCASIONS: OccasionType[] = [
  'Casual',
  'Office',
  'Date',
  'Party',
  'Wedding',
  'Travel',
  'Workout',
];

const STYLES: StyleType[] = [
  'Minimal',
  'Casual',
  'Streetwear',
  'Formal',
  'Smart Casual',
  'Vintage',
];

const COLOR_PREFERENCES: ColorPreferenceType[] = [
  'Neutral',
  'Dark',
  'Bright',
  'Pastel',
];

export default function AIOutfitGeneratorScreen() {
  const router = useRouter();
  const { baseItemName } = useLocalSearchParams<{ baseItemName?: string }>();

  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType>('Casual');
  const [selectedStyle, setSelectedStyle] = useState<StyleType>('Minimal');
  const [selectedColorPref, setSelectedColorPref] = useState<ColorPreferenceType>('Neutral');
  const [customPrompt, setCustomPrompt] = useState(
    baseItemName ? `Center this outfit around my ${baseItemName}` : ''
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      await api.generateOutfit({
        occasion: selectedOccasion,
        style: selectedStyle,
        colorPreference: selectedColorPref,
        temperature: MOCK_WEATHER.temperature,
        weatherCondition: MOCK_WEATHER.condition,
        customPrompt: customPrompt.trim() || undefined,
      });

      router.push('/outfits/details' as any);
    } catch {
      router.push('/outfits/details' as any);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header
          title="Create your look"
          subtitle="Tell AI what you're dressing for."
          showBack
          onBackPress={() => router.back()}
        />

        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Ambient Background Glow */}
            <View style={styles.ambientGlow} />

            {/* Auto Detected Weather Banner */}
            <View style={styles.weatherBanner}>
              <View style={styles.weatherLeft}>
                <Text style={styles.weatherIcon}>{MOCK_WEATHER.icon}</Text>
                <View>
                  <Text style={styles.weatherTag}>AUTO-DETECTED WEATHER</Text>
                  <Text style={styles.weatherDetail}>
                    {MOCK_WEATHER.temperature} {MOCK_WEATHER.city} • {MOCK_WEATHER.condition}
                  </Text>
                </View>
              </View>
              <View style={styles.syncedPill}>
                <Text style={styles.syncedText}>Synced</Text>
              </View>
            </View>

            {/* Occasion Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Occasion</Text>
              <View style={styles.chipsWrap}>
                {OCCASIONS.map((occ) => {
                  const isSelected = selectedOccasion === occ;
                  return (
                    <TouchableOpacity
                      key={occ}
                      activeOpacity={0.75}
                      onPress={() => setSelectedOccasion(occ)}
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

            {/* Aesthetic Style Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Style Aesthetic</Text>
              <View style={styles.chipsWrap}>
                {STYLES.map((st) => {
                  const isSelected = selectedStyle === st;
                  return (
                    <TouchableOpacity
                      key={st}
                      activeOpacity={0.75}
                      onPress={() => setSelectedStyle(st)}
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

            {/* Color Preference */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Color Preference</Text>
              <View style={styles.chipsWrap}>
                {COLOR_PREFERENCES.map((cp) => {
                  const isSelected = selectedColorPref === cp;
                  return (
                    <TouchableOpacity
                      key={cp}
                      activeOpacity={0.75}
                      onPress={() => setSelectedColorPref(cp)}
                      style={[styles.chip, isSelected && styles.chipSelected]}
                    >
                      <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                        {cp}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Additional Prompt Input */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Additional Preference</Text>
              <View style={styles.promptBox}>
                <TextInput
                  value={customPrompt}
                  onChangeText={setCustomPrompt}
                  placeholder="Anything else? (e.g. going to an outdoor gallery, want silver jewelry)"
                  placeholderTextColor="#71717A"
                  multiline
                  numberOfLines={3}
                  style={styles.promptInput}
                />
              </View>
            </View>

            {/* AI Status or Trigger */}
            {isGenerating ? (
              <View style={styles.generatingBox}>
                <AIThinkingIndicator label="Synthesizing wardrobe coordinates..." />
                <Text style={styles.generatingSubtext}>
                  Matching silhouette proportions, color theory & {selectedOccasion.toLowerCase()} styling rules...
                </Text>
              </View>
            ) : (
              <Button
                title="✨ Generate Outfit"
                onPress={handleGenerate}
                variant="glow"
                size="lg"
                style={styles.generateButton}
              />
            )}
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  ambientGlow: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    width: 260,
    height: 180,
    backgroundColor: 'rgba(124, 58, 237, 0.12)',
    borderRadius: 130,
    filter: 'blur(70px)',
  },
  weatherBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#141418',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 16,
    marginBottom: 24,
  },
  weatherLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  weatherIcon: {
    fontSize: 24,
  },
  weatherTag: {
    color: '#A1A1AA',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  weatherDetail: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  syncedPill: {
    backgroundColor: 'rgba(52, 211, 153, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.3)',
  },
  syncedText: {
    color: '#34D399',
    fontSize: 11,
    fontWeight: '700',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
    marginBottom: 12,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    backgroundColor: '#141418',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
  },
  chipSelected: {
    backgroundColor: '#7C3AED',
    borderColor: '#A78BFA',
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
  promptBox: {
    backgroundColor: '#141418',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 14,
  },
  promptInput: {
    color: '#FFFFFF',
    fontSize: 14,
    minHeight: 70,
    textAlignVertical: 'top',
  },
  generatingBox: {
    backgroundColor: '#141418',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.3)',
    padding: 20,
    alignItems: 'center',
    marginTop: 8,
  },
  generatingSubtext: {
    color: '#A1A1AA',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 18,
  },
  generateButton: {
    marginTop: 8,
  },
});
