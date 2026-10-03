import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

interface BottomNavigationProps {
  currentTab?: 'home' | 'wardrobe' | 'stylist' | 'profile';
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentTab }) => {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveTab = (): 'home' | 'wardrobe' | 'stylist' | 'profile' => {
    if (currentTab) return currentTab;
    if (pathname.includes('/wardrobe')) return 'wardrobe';
    if (pathname.includes('/stylist')) return 'stylist';
    if (pathname.includes('/profile')) return 'profile';
    return 'home';
  };

  const active = getActiveTab();

  return (
    <View style={styles.floatingContainer}>
      <View style={styles.bar}>
        {/* Home */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.replace('/home' as any)}
          style={styles.tabItem}
        >
          <Text style={[styles.tabIcon, active === 'home' && styles.tabIconActive]}>
            🏠
          </Text>
          <Text style={[styles.tabLabel, active === 'home' && styles.tabLabelActive]}>
            Home
          </Text>
        </TouchableOpacity>

        {/* Wardrobe */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.replace('/wardrobe' as any)}
          style={styles.tabItem}
        >
          <Text style={[styles.tabIcon, active === 'wardrobe' && styles.tabIconActive]}>
            👕
          </Text>
          <Text style={[styles.tabLabel, active === 'wardrobe' && styles.tabLabelActive]}>
            Wardrobe
          </Text>
        </TouchableOpacity>

        {/* AI Stylist (Glowing Distinct Center Tab) */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.replace('/stylist' as any)}
          style={styles.centerTabWrapper}
        >
          <View
            style={[
              styles.aiCenterButton,
              active === 'stylist' && styles.aiCenterButtonActive,
            ]}
          >
            <Text style={styles.aiCenterIcon}>✨</Text>
          </View>
          <Text
            style={[
              styles.tabLabel,
              styles.aiTabLabel,
              active === 'stylist' && styles.tabLabelActive,
            ]}
          >
            AI Stylist
          </Text>
        </TouchableOpacity>

        {/* Profile */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.replace('/profile' as any)}
          style={styles.tabItem}
        >
          <Text style={[styles.tabIcon, active === 'profile' && styles.tabIconActive]}>
            👤
          </Text>
          <Text style={[styles.tabLabel, active === 'profile' && styles.tabLabelActive]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 16,
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 99,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 420,
    backgroundColor: 'rgba(18, 18, 22, 0.94)',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    minWidth: 60,
  },
  tabIcon: {
    fontSize: 20,
    opacity: 0.5,
    marginBottom: 4,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    color: '#A1A1AA',
    fontSize: 11,
    fontWeight: '600',
  },
  tabLabelActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  /* Center AI Button */
  centerTabWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    top: -12,
  },
  aiCenterButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#09090B',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 2,
  },
  aiCenterButtonActive: {
    backgroundColor: '#8B5CF6',
    borderColor: '#C4B5FD',
  },
  aiCenterIcon: {
    fontSize: 22,
  },
  aiTabLabel: {
    fontSize: 11,
    color: '#C4B5FD',
    marginTop: 2,
  },
});
