import React, { useState } from 'react';
import {
  Alert,
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
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { CategoryType, SeasonType, StyleType } from '../../types';
import { api } from '../../services/api';
import { insertClothingItem } from '../../services/supabase';
import * as ImagePicker from 'expo-image-picker';

interface GarmentPreset {
  id: string;
  name: string;
  category: CategoryType;
  color: string;
  colorHex: string;
  style: StyleType;
  season: SeasonType;
  brand: string;
  imageUrl: string;
}

const PRESET_GALLERY: GarmentPreset[] = [
  {
    id: 'p1',
    name: 'Oversized Poplin Shirt',
    category: 'Tops',
    color: 'White',
    colorHex: '#F9FAFB',
    style: 'Casual',
    season: 'Summer',
    brand: 'Studio Nicholson',
    imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'p2',
    name: 'Vintage Straight Raw Denim',
    category: 'Bottoms',
    color: 'Navy',
    colorHex: '#1E3A8A',
    style: 'Casual',
    season: 'All Year',
    brand: "Levi's Vintage",
    imageUrl: 'https://images.unsplash.com/photo-1542272604-780c96856592?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'p3',
    name: 'Structured Leather Biker Jacket',
    category: 'Tops',
    color: 'Black',
    colorHex: '#111827',
    style: 'Streetwear',
    season: 'Fall',
    brand: 'Acne Studios',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'p4',
    name: 'Minimalist Nappa Low Sneakers',
    category: 'Shoes',
    color: 'White',
    colorHex: '#F3F4F6',
    style: 'Minimal',
    season: 'All Year',
    brand: 'Common Projects',
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'p5',
    name: 'Silk Bias-Cut Slip Dress',
    category: 'Dresses',
    color: 'Burgundy',
    colorHex: '#831843',
    style: 'Formal',
    season: 'Summer',
    brand: 'Reformation',
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80',
  },
];

const CATEGORIES: CategoryType[] = ['Tops', 'Bottoms', 'Dresses', 'Shoes', 'Accessories'];
const STYLES: StyleType[] = ['Casual', 'Minimal', 'Streetwear', 'Formal', 'Smart Casual', 'Vintage'];
const SEASONS: SeasonType[] = ['Summer', 'Fall', 'Winter', 'Spring', 'All Year'];

export default function AddClothingScreen() {
  const router = useRouter();

  const [selectedPreset, setSelectedPreset] = useState<GarmentPreset>(PRESET_GALLERY[0]);
  const [customImageUri, setCustomImageUri] = useState<string | null>(null);
  const [customBase64, setCustomBase64] = useState<string | null>(null);
  const [name, setName] = useState(PRESET_GALLERY[0].name);
  const [category, setCategory] = useState<CategoryType>(PRESET_GALLERY[0].category);
  const [color, setColor] = useState(PRESET_GALLERY[0].color);
  const [style, setStyle] = useState<StyleType>(PRESET_GALLERY[0].style);
  const [season, setSeason] = useState<SeasonType>(PRESET_GALLERY[0].season);
  const [brand, setBrand] = useState(PRESET_GALLERY[0].brand);
  const [isAiScanning, setIsAiScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const displayImage = customImageUri || selectedPreset.imageUrl;

  const handleSelectPreset = (preset: GarmentPreset) => {
    setSelectedPreset(preset);
    setCustomImageUri(null);
    setCustomBase64(null);
    setName(preset.name);
    setCategory(preset.category);
    setColor(preset.color);
    setStyle(preset.style);
    setSeason(preset.season);
    setBrand(preset.brand);
    setScanSuccess(false);
  };

  const runAiTagging = async (imgUri?: string, b64?: string) => {
    setIsAiScanning(true);
    setScanSuccess(false);

    try {
      const result = await api.autoTagClothing({
        imageUrl: imgUri || displayImage,
        imageBase64: b64 || customBase64 || undefined,
        hint: name,
      });

      setName(result.name);
      setCategory(result.category);
      setColor(result.color);
      setStyle(result.style);
      setSeason(result.season);
      if (result.brand) setBrand(result.brand);
      setScanSuccess(true);
    } catch {
      setScanSuccess(false);
    } finally {
      setIsAiScanning(false);
    }
  };

  const handleAiScan = () => {
    runAiTagging();
  };

  const handleTakePhoto = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          'Camera Access Needed',
          'Please allow camera access in your device settings to photograph clothes.'
        );
        return;
      }

      const res = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });

      if (!res.canceled && res.assets && res.assets.length > 0) {
        const asset = res.assets[0];
        setCustomImageUri(asset.uri);
        const b64 = asset.base64 ? `data:image/jpeg;base64,${asset.base64}` : undefined;
        setCustomBase64(b64 || null);
        runAiTagging(asset.uri, b64);
      }
    } catch (err) {
      console.log('Camera error:', err);
    }
  };

  const handlePickFromGallery = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          'Photo Library Access Needed',
          'Please allow photo library access to select pictures of your garments.'
        );
        return;
      }

      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });

      if (!res.canceled && res.assets && res.assets.length > 0) {
        const asset = res.assets[0];
        setCustomImageUri(asset.uri);
        const b64 = asset.base64 ? `data:image/jpeg;base64,${asset.base64}` : undefined;
        setCustomBase64(b64 || null);
        runAiTagging(asset.uri, b64);
      }
    } catch (err) {
      console.log('Gallery picker error:', err);
    }
  };

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);

    try {
      const savedName = name.trim() || 'Untitled Garment';
      await insertClothingItem({
        name: savedName,
        category,
        color: color.trim() || 'Multicolor',
        colorHex: selectedPreset?.colorHex || '#18181B',
        style,
        season,
        brand: brand.trim() || undefined,
        imageUrl: displayImage,
        isFavorite: false,
      });

      if (Platform.OS === 'web') {
        window.alert(`"${savedName}" has been added to your wardrobe! 🎉`);
        router.replace('/wardrobe' as any);
      } else {
        Alert.alert(
          'Added to Wardrobe! 🎉',
          `"${savedName}" has been categorized under ${category} and saved to your wardrobe.`,
          [
            {
              text: 'View Wardrobe',
              onPress: () => router.replace('/wardrobe' as any),
            },
          ]
        );
      }
    } catch (err) {
      console.log('Error saving item:', err);
      router.replace('/wardrobe' as any);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header
          title="Add to your wardrobe"
          subtitle="Upload garment & let AI auto-tag"
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
            {/* Image Preview & Upload Controls */}
            <View style={styles.uploadArea}>
              <Image
                source={{ uri: displayImage }}
                style={styles.previewImage}
                contentFit="cover"
                transition={250}
              />
              <View style={styles.uploadOverlay}>
                <View style={styles.actionButtonsRow}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleTakePhoto}
                    style={styles.uploadButton}
                  >
                    <Text style={styles.uploadButtonIcon}>📸</Text>
                    <Text style={styles.uploadButtonText}>Take Photo</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handlePickFromGallery}
                    style={[styles.uploadButton, styles.uploadButtonSecondary]}
                  >
                    <Text style={styles.uploadButtonIcon}>🖼️</Text>
                    <Text style={styles.uploadButtonText}>Choose from Gallery</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Presets Row to test different photos */}
            <View style={styles.presetSection}>
              <Text style={styles.sectionHeading}>Sample Wardrobe Shots</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.presetsRow}
              >
                {PRESET_GALLERY.map((p) => (
                  <TouchableOpacity
                    key={p.id}
                    activeOpacity={0.8}
                    onPress={() => handleSelectPreset(p)}
                    style={[
                      styles.presetThumb,
                      selectedPreset.id === p.id && styles.presetThumbActive,
                    ]}
                  >
                    <Image
                      source={{ uri: p.imageUrl }}
                      style={styles.presetImage}
                      contentFit="cover"
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* AI Detected Information Card */}
            <View style={styles.aiCard}>
              <View style={styles.aiCardHeader}>
                <View style={styles.aiBadge}>
                  <Text style={styles.aiSparkle}>✨</Text>
                  <Text style={styles.aiBadgeText}>AI Detected Attributes</Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleAiScan}
                  disabled={isAiScanning}
                >
                  <Text style={styles.rescanText}>
                    {isAiScanning ? 'Scanning...' : 'Re-scan'}
                  </Text>
                </TouchableOpacity>
              </View>

              {scanSuccess && (
                <View style={styles.scanSuccessBanner}>
                  <Text style={styles.scanSuccessText}>
                    ✓ Vision model recognized garment shape, palette & weave!
                  </Text>
                </View>
              )}

              {/* Item Title Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Garment Name</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="e.g. White Oversized Shirt"
                  placeholderTextColor="#71717A"
                  style={styles.textInput}
                />
              </View>

              {/* Category */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Category</Text>
                <View style={styles.chipsWrap}>
                  {CATEGORIES.map((c) => (
                    <TouchableOpacity
                      key={c}
                      activeOpacity={0.75}
                      onPress={() => setCategory(c)}
                      style={[styles.chip, category === c && styles.chipSelected]}
                    >
                      <Text style={[styles.chipText, category === c && styles.chipTextSelected]}>
                        {c}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Color */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Color</Text>
                <TextInput
                  value={color}
                  onChangeText={setColor}
                  placeholder="e.g. White"
                  placeholderTextColor="#71717A"
                  style={styles.textInput}
                />
              </View>

              {/* Style */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Style</Text>
                <View style={styles.chipsWrap}>
                  {STYLES.map((s) => (
                    <TouchableOpacity
                      key={s}
                      activeOpacity={0.75}
                      onPress={() => setStyle(s)}
                      style={[styles.chip, style === s && styles.chipSelected]}
                    >
                      <Text style={[styles.chipText, style === s && styles.chipTextSelected]}>
                        {s}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Season */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Season</Text>
                <View style={styles.chipsWrap}>
                  {SEASONS.map((sn) => (
                    <TouchableOpacity
                      key={sn}
                      activeOpacity={0.75}
                      onPress={() => setSeason(sn)}
                      style={[styles.chip, season === sn && styles.chipSelected]}
                    >
                      <Text style={[styles.chipText, season === sn && styles.chipTextSelected]}>
                        {sn}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Brand */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Brand (Optional)</Text>
                <TextInput
                  value={brand}
                  onChangeText={setBrand}
                  placeholder="e.g. Studio Nicholson, Zara"
                  placeholderTextColor="#71717A"
                  style={styles.textInput}
                />
              </View>
            </View>

            {/* Primary CTA */}
            <Button
              title={isSaving ? 'Saving to Wardrobe...' : 'Add to Wardrobe'}
              onPress={handleSave}
              disabled={isSaving}
              variant="primary"
              size="lg"
              style={styles.saveButton}
            />
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
    paddingBottom: 40,
  },
  uploadArea: {
    width: '100%',
    height: 280,
    borderRadius: 24,
    backgroundColor: '#141418',
    overflow: 'hidden',
    marginTop: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  uploadOverlay: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    right: 14,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  uploadButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(9, 9, 11, 0.88)',
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  uploadButtonSecondary: {
    backgroundColor: 'rgba(124, 58, 237, 0.85)',
    borderColor: '#8B5CF6',
  },
  uploadButtonIcon: {
    fontSize: 16,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  presetSection: {
    marginTop: 16,
  },
  sectionHeading: {
    color: '#A1A1AA',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  presetsRow: {
    gap: 10,
  },
  presetThumb: {
    width: 60,
    height: 60,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  presetThumbActive: {
    borderColor: '#7C3AED',
  },
  presetImage: {
    width: '100%',
    height: '100%',
  },
  aiCard: {
    backgroundColor: '#141418',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 18,
    marginTop: 18,
  },
  aiCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.3)',
  },
  aiSparkle: {
    fontSize: 13,
  },
  aiBadgeText: {
    color: '#DDD6FE',
    fontSize: 12,
    fontWeight: '700',
  },
  rescanText: {
    color: '#A78BFA',
    fontSize: 13,
    fontWeight: '600',
  },
  scanSuccessBanner: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    marginBottom: 14,
  },
  scanSuccessText: {
    color: '#34D399',
    fontSize: 12,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    color: '#D4D4D8',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  textInput: {
    height: 48,
    borderRadius: 14,
    backgroundColor: '#1C1C22',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 14,
    color: '#FFFFFF',
    fontSize: 14,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#1C1C22',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  chipSelected: {
    backgroundColor: '#7C3AED',
    borderColor: '#8B5CF6',
  },
  chipText: {
    color: '#A1A1AA',
    fontSize: 12,
    fontWeight: '600',
  },
  chipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  saveButton: {
    marginTop: 20,
    marginBottom: 20,
  },
});
