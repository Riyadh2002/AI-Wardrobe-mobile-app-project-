import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { Header } from '../../components/Header';
import { MOCK_USER } from '../../mock/user';

interface SettingItem {
  id: string;
  icon: string;
  title: string;
  subtitle?: string;
  type: 'chevron' | 'switch' | 'action';
  action?: () => void;
}

export default function SettingsScreen() {
  const router = useRouter();

  const [pushEnabled, setPushEnabled] = useState(true);
  const [aiSuggestionsEnabled, setAiSuggestionsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out of ClosetAI?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => router.replace('/auth/login' as any),
        },
      ]
    );
  };

  const handleClearCache = () => {
    Alert.alert('Cache Cleared', 'Wardrobe image cache has been emptied.', [{ text: 'OK' }]);
  };

  const handleGenericItem = (name: string) => {
    Alert.alert(name, `${name} preferences are managed here.`, [{ text: 'OK' }]);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header
          title="Settings"
          subtitle="Preferences & Account Management"
          showBack
          onBackPress={() => router.back()}
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Account Profile Box */}
          <View style={styles.accountBox}>
            <View style={styles.accountLeft}>
              <View style={styles.accountAvatar}>
                <Text style={styles.avatarInitials}>R</Text>
              </View>
              <View>
                <Text style={styles.accountName}>{MOCK_USER.name}</Text>
                <Text style={styles.accountEmail}>{MOCK_USER.email}</Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => handleGenericItem('Edit Account Profile')}
              style={styles.editAccountButton}
            >
              <Text style={styles.editAccountText}>Edit</Text>
            </TouchableOpacity>
          </View>

          {/* Section: Notifications */}
          <Text style={styles.sectionHeader}>NOTIFICATIONS</Text>
          <View style={styles.cardGroup}>
            <View style={styles.rowItem}>
              <View style={styles.rowLeft}>
                <Text style={styles.rowIcon}>🔔</Text>
                <View>
                  <Text style={styles.rowTitle}>Push Notifications</Text>
                  <Text style={styles.rowSubtitle}>Daily weather & outfit alert</Text>
                </View>
              </View>
              <Switch
                value={pushEnabled}
                onValueChange={setPushEnabled}
                trackColor={{ false: '#374151', true: '#7C3AED' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.rowDivider} />

            <View style={styles.rowItem}>
              <View style={styles.rowLeft}>
                <Text style={styles.rowIcon}>✨</Text>
                <View>
                  <Text style={styles.rowTitle}>AI Styling Suggestions</Text>
                  <Text style={styles.rowSubtitle}>Proactive look pairing prompts</Text>
                </View>
              </View>
              <Switch
                value={aiSuggestionsEnabled}
                onValueChange={setAiSuggestionsEnabled}
                trackColor={{ false: '#374151', true: '#7C3AED' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          {/* Section: Appearance */}
          <Text style={styles.sectionHeader}>APPEARANCE</Text>
          <View style={styles.cardGroup}>
            <View style={styles.rowItem}>
              <View style={styles.rowLeft}>
                <Text style={styles.rowIcon}>🌙</Text>
                <View>
                  <Text style={styles.rowTitle}>Dark Mode Aesthetic</Text>
                  <Text style={styles.rowSubtitle}>Luxury dark cyberpunk theme</Text>
                </View>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#374151', true: '#7C3AED' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          {/* Section: Privacy & Storage */}
          <Text style={styles.sectionHeader}>PRIVACY & STORAGE</Text>
          <View style={styles.cardGroup}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleGenericItem('Wardrobe Privacy')}
              style={styles.rowItem}
            >
              <View style={styles.rowLeft}>
                <Text style={styles.rowIcon}>🔒</Text>
                <Text style={styles.rowTitle}>Wardrobe Privacy</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <View style={styles.rowDivider} />

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleClearCache}
              style={styles.rowItem}
            >
              <View style={styles.rowLeft}>
                <Text style={styles.rowIcon}>🧹</Text>
                <View>
                  <Text style={styles.rowTitle}>Clear Image Cache</Text>
                  <Text style={styles.rowSubtitle}>Free up 24.8 MB local space</Text>
                </View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Section: About & Support */}
          <Text style={styles.sectionHeader}>ABOUT & SUPPORT</Text>
          <View style={styles.cardGroup}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleGenericItem('Help & Support Concierge')}
              style={styles.rowItem}
            >
              <View style={styles.rowLeft}>
                <Text style={styles.rowIcon}>💬</Text>
                <Text style={styles.rowTitle}>Help & Support</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <View style={styles.rowDivider} />

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleGenericItem('Terms & Conditions')}
              style={styles.rowItem}
            >
              <View style={styles.rowLeft}>
                <Text style={styles.rowIcon}>📄</Text>
                <Text style={styles.rowTitle}>Terms & Conditions</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Out Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleLogout}
            style={styles.logoutButton}
          >
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>

          <Text style={styles.versionText}>ClosetAI v2.4.0 • Built for Fashion Lovers</Text>
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
  accountBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#141418',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 18,
    marginBottom: 24,
  },
  accountLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  accountAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  accountName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  accountEmail: {
    color: '#71717A',
    fontSize: 12,
    marginTop: 2,
  },
  editAccountButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  editAccountText: {
    color: '#A78BFA',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionHeader: {
    color: '#71717A',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 8,
    marginLeft: 4,
  },
  cardGroup: {
    backgroundColor: '#141418',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 16,
    marginBottom: 22,
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  rowIcon: {
    fontSize: 18,
  },
  rowTitle: {
    color: '#F5F5F5',
    fontSize: 14,
    fontWeight: '600',
  },
  rowSubtitle: {
    color: '#71717A',
    fontSize: 11,
    marginTop: 2,
  },
  chevron: {
    color: '#71717A',
    fontSize: 20,
  },
  rowDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  logoutButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  logoutText: {
    color: '#F87171',
    fontSize: 15,
    fontWeight: '700',
  },
  versionText: {
    color: '#52525B',
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 20,
  },
});
