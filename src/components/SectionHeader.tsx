import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actionText = 'See All',
  onAction,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      {onAction && actionText ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onAction}
          style={styles.actionButton}
        >
          <Text style={styles.actionText}>{actionText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  subtitle: {
    color: '#A1A1AA',
    fontSize: 12,
    marginTop: 2,
  },
  actionButton: {
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  actionText: {
    color: '#A78BFA',
    fontSize: 13,
    fontWeight: '600',
  },
});
