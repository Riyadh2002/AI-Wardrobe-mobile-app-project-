import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightAction?: React.ReactNode;
  style?: ViewStyle;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBackPress,
  rightAction,
  style,
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftSection}>
        {showBack && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleBack}
            style={styles.backButton}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
        )}

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>

      {rightAction ? <View style={styles.rightSection}>{rightAction}</View> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#09090B',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#18181B',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: '#FFFFFF',
    fontSize: 26,
    lineHeight: 28,
    fontWeight: '300',
    marginTop: -2,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  subtitle: {
    color: '#A1A1AA',
    fontSize: 12,
    marginTop: 2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
