import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { MOCK_OUTFITS } from '../../mock/outfits';
import { Outfit } from '../../types';

export default function OutfitResultScreen() {
  const router = useRouter();

  const [outfit, setOutfit] = useState<Outfit>(MOCK_OUTFITS[0]);
  const [isSaved, setIsSaved] = useState(outfit.isFavorite);
  const [wornToday, setWornToday] = useState(false);

  const handleSaveOutfit = () => {
    setIsSaved(!isSaved);
    Alert.alert(
      isSaved ? 'Removed' : 'Saved! ✨',
      isSaved
        ? 'Outfit removed from your saved looks.'
        : `"${outfit.name}" has been added to your Saved Looks collection.`,
      [{ text: 'OK' }]
    );
  };

  const handleWearToday = () => {
    setWornToday(true);
    Alert.alert(
      'Ready to shine! 👗',
      `"${outfit.name}" has been logged as your outfit of the day. Have a great day ahead!`,
      [{ text: 'Done' }]
    );
  };

  const handleTryAnother = () => {
    // Cycle through mock outfits
    const currentIndex = MOCK_OUTFITS.findIndex((o) => o.id === outfit.id);
    const nextIndex = (currentIndex + 1) % MOCK_OUTFITS.length;
    setOutfit(MOCK_OUTFITS[nextIndex]);
    setWornToday(false);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out my AI-styled outfit "${outfit.name}" curated with ClosetAI!`,
      });
    } catch (e) {
      // dismissed
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header
          title="Your AI Look"
          subtitle="Precision curated from your wardrobe"
          showBack
          onBackPress={() => router.back()}
          rightAction={
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleShare}
              style={styles.headerShareButton}
            >
              <Text style={styles.shareIcon}>↗</Text>
            </TouchableOpacity>
          }
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Large Hero Outfit Composition Image */}
          <View style={styles.heroImageContainer}>
            <Image
              source={{ uri: outfit.imageUrl }}
              style={styles.heroImage}
              contentFit="cover"
              transition={300}
            />

            <View style={styles.heroBadgesRow}>
              <View style={styles.badgeOccasion}>
                <Text style={styles.badgeOccasionText}>{outfit.occasion}</Text>
              </View>
              <View style={styles.badgeStyle}>
                <Text style={styles.badgeStyleText}>{outfit.style} Style</Text>
              </View>
            </View>

            {wornToday && (
              <View style={styles.wornBadge}>
                <Text style={styles.wornBadgeText}>✓ Worn Today</Text>
              </View>
            )}
          </View>

          {/* Outfit Name & Title */}
          <View style={styles.titleSection}>
            <Text style={styles.outfitTitle}>{outfit.name}</Text>
            <Text style={styles.outfitDesc}>{outfit.description}</Text>
          </View>

          {/* Outfit Piece Breakdown */}
          <View style={styles.piecesSection}>
            <Text style={styles.sectionHeading}>GARMENT PIECES IN THIS LOOK</Text>

            <View style={styles.piecesGrid}>
              {outfit.pieces.map((piece, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.85}
                  onPress={() =>
                    router.push({
                      pathname: '/wardrobe/[id]' as any,
                      params: { id: piece.item.id },
                    })
                  }
                  style={styles.pieceCard}
                >
                  <Image
                    source={{ uri: piece.item.imageUrl }}
                    style={styles.pieceImage}
                    contentFit="cover"
                  />
                  <View style={styles.pieceInfo}>
                    <Text style={styles.pieceTypeTag}>{piece.type}</Text>
                    <Text style={styles.pieceName} numberOfLines={1}>
                      {piece.item.name}
                    </Text>
                    <Text style={styles.pieceMeta}>
                      {piece.item.brand || piece.item.color}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Why This Works Section */}
          <View style={styles.whyThisWorksCard}>
            <View style={styles.whyHeader}>
              <Text style={styles.whySparkle}>✨</Text>
              <Text style={styles.whyTitle}>Why this works</Text>
            </View>
            <Text style={styles.whyContent}>{outfit.whyThisWorks}</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsContainer}>
            <Button
              title={wornToday ? 'Logged for Today ✓' : 'Wear Today'}
              onPress={handleWearToday}
              variant="glow"
              size="lg"
              disabled={wornToday}
              style={styles.actionButton}
            />

            <View style={styles.secondaryRow}>
              <Button
                title={isSaved ? 'Saved ♥' : 'Save Outfit ♡'}
                onPress={handleSaveOutfit}
                variant="secondary"
                size="md"
                style={{ flex: 1 }}
              />

              <Button
                title="Try Another ⚡"
                onPress={handleTryAnother}
                variant="secondary"
                size="md"
                style={{ flex: 1 }}
              />
            </View>

            <Button
              title="Share Look ↗"
              onPress={handleShare}
              variant="ghost"
              size="md"
            />
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
  headerShareButton: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: '#141418',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  heroImageContainer: {
    width: '100%',
    height: 380,
    borderRadius: 24,
    backgroundColor: '#1C1C24',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroBadgesRow: {
    position: 'absolute',
    top: 14,
    left: 14,
    flexDirection: 'row',
    gap: 8,
  },
  badgeOccasion: {
    backgroundColor: 'rgba(9, 9, 11, 0.85)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#7C3AED',
  },
  badgeOccasionText: {
    color: '#DDD6FE',
    fontSize: 12,
    fontWeight: '700',
  },
  badgeStyle: {
    backgroundColor: 'rgba(9, 9, 11, 0.85)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  badgeStyleText: {
    color: '#D4D4D8',
    fontSize: 12,
    fontWeight: '600',
  },
  wornBadge: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    backgroundColor: 'rgba(16, 185, 129, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  wornBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  titleSection: {
    marginBottom: 20,
  },
  outfitTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  outfitDesc: {
    color: '#A1A1AA',
    fontSize: 14,
    lineHeight: 20,
  },
  piecesSection: {
    marginBottom: 20,
  },
  sectionHeading: {
    color: '#71717A',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  piecesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  pieceCard: {
    width: '48%',
    backgroundColor: '#141418',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
  },
  pieceImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#1C1C24',
  },
  pieceInfo: {
    padding: 10,
  },
  pieceTypeTag: {
    color: '#C4B5FD',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  pieceName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  pieceMeta: {
    color: '#71717A',
    fontSize: 11,
  },
  whyThisWorksCard: {
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.3)',
    padding: 18,
    marginBottom: 24,
  },
  whyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  whySparkle: {
    fontSize: 16,
  },
  whyTitle: {
    color: '#C4B5FD',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  whyContent: {
    color: '#E4E4E7',
    fontSize: 13,
    lineHeight: 20,
  },
  buttonsContainer: {
    gap: 12,
  },
  actionButton: {
    width: '100%',
  },
  secondaryRow: {
    flexDirection: 'row',
    gap: 12,
  },
});
