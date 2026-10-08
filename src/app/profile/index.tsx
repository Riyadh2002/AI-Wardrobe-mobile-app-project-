import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

import { BottomNavigation } from '../../components/BottomNavigation';
import { SectionHeader } from '../../components/SectionHeader';
import { MOCK_USER } from '../../mock/user';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Top Header */}
        <View style={styles.header}>
          <Text style={styles.title}>My Profile</Text>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => router.push('/settings' as any)}
            style={styles.settingsButton}
          >
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* User Hero Banner */}
          <View style={styles.userCard}>
            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: MOCK_USER.avatarUrl }}
                style={styles.avatar}
                contentFit="cover"
              />
              <View style={styles.badgeSparkle}>
                <Text style={styles.badgeSparkleText}>✨</Text>
              </View>
            </View>

            <Text style={styles.userName}>{MOCK_USER.name}</Text>
            <Text style={styles.userSubtitle}>{MOCK_USER.subtitle}</Text>
            <Text style={styles.userEmail}>{MOCK_USER.email}</Text>

            {/* Wardrobe & Outfits Stats */}
            <View style={styles.statsRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.push('/wardrobe' as any)}
                style={styles.statBox}
              >
                <Text style={styles.statNumber}>{MOCK_USER.wardrobeCount}</Text>
                <Text style={styles.statLabel}>Wardrobe Items</Text>
              </TouchableOpacity>

              <View style={styles.statDivider} />

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.push('/outfits' as any)}
                style={styles.statBox}
              >
                <Text style={styles.statNumber}>{MOCK_USER.outfitsCount}</Text>
                <Text style={styles.statLabel}>Saved Outfits</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Quick Menu Links */}
          <View style={styles.menuCard}>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => router.push('/outfits' as any)}
              style={styles.menuItem}
            >
              <View style={styles.menuLeft}>
                <Text style={styles.menuEmoji}>✨</Text>
                <Text style={styles.menuTitle}>Saved Looks & Outfits</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.itemSeparator} />

            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => router.push('/profile/preferences' as any)}
              style={styles.menuItem}
            >
              <View style={styles.menuLeft}>
                <Text style={styles.menuEmoji}>🎨</Text>
                <Text style={styles.menuTitle}>Style Preferences</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.itemSeparator} />

            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => router.push('/settings' as any)}
              style={styles.menuItem}
            >
              <View style={styles.menuLeft}>
                <Text style={styles.menuEmoji}>⚙️</Text>
                <Text style={styles.menuTitle}>Account & Settings</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Style DNA Attributes */}
          <SectionHeader
            title="My Style DNA"
            subtitle="Configured preferences that power AI recommendations"
            actionText="Edit"
            onAction={() => router.push('/profile/preferences' as any)}
          />

          {/* Preferred Styles */}
          <View style={styles.attributeBlock}>
            <Text style={styles.attributeLabel}>PREFERRED STYLES</Text>
            <View style={styles.pillsWrap}>
              {MOCK_USER.stylePreferences.preferredStyles.map((style, idx) => (
                <View key={idx} style={styles.pill}>
                  <Text style={styles.pillText}>{style}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Favorite Colors */}
          <View style={styles.attributeBlock}>
            <Text style={styles.attributeLabel}>COLOR PALETTE</Text>
            <View style={styles.colorsRow}>
              {MOCK_USER.stylePreferences.favoriteColors.map((color, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.colorDot,
                    { backgroundColor: color, borderColor: 'rgba(255,255,255,0.2)' },
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Preferred Fit */}
          <View style={styles.attributeBlock}>
            <Text style={styles.attributeLabel}>PREFERRED FIT</Text>
            <View style={styles.pillsWrap}>
              <View style={[styles.pill, styles.pillHighlight]}>
                <Text style={[styles.pillText, styles.pillHighlightText]}>
                  {MOCK_USER.stylePreferences.preferredFit}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ height: 110 }} />
        </ScrollView>

        <BottomNavigation currentTab="profile" />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#141418',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    fontSize: 18,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  userCard: {
    backgroundColor: '#141418',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarWrapper: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 3,
    borderColor: '#7C3AED',
    overflow: 'hidden',
    marginBottom: 14,
    position: 'relative',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  badgeSparkle: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#141418',
  },
  badgeSparkleText: {
    fontSize: 11,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 2,
  },
  userSubtitle: {
    color: '#C4B5FD',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  userEmail: {
    color: '#71717A',
    fontSize: 12,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    paddingVertical: 14,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 2,
  },
  statLabel: {
    color: '#A1A1AA',
    fontSize: 11,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  menuCard: {
    backgroundColor: '#141418',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuEmoji: {
    fontSize: 18,
  },
  menuTitle: {
    color: '#F5F5F5',
    fontSize: 14,
    fontWeight: '600',
  },
  menuArrow: {
    color: '#71717A',
    fontSize: 20,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  attributeBlock: {
    backgroundColor: '#141418',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    padding: 16,
    marginBottom: 12,
  },
  attributeLabel: {
    color: '#71717A',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  pillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  pillHighlight: {
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
    borderColor: '#7C3AED',
  },
  pillText: {
    color: '#D4D4D8',
    fontSize: 12,
    fontWeight: '600',
  },
  pillHighlightText: {
    color: '#C4B5FD',
  },
  colorsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  colorDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
  },
});
