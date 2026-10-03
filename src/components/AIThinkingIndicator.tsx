import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

interface AIThinkingIndicatorProps {
  label?: string;
  style?: ViewStyle;
}

export const AIThinkingIndicator: React.FC<AIThinkingIndicatorProps> = ({
  label = 'AI Stylist is generating ideas...',
  style,
}) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.bubble}>
        <Text style={styles.sparkle}>✨</Text>
        <Text style={styles.text}>
          {label}
          <Text style={styles.dots}>{dots}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    alignItems: 'flex-start',
  },
  bubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(124, 58, 237, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.3)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sparkle: {
    fontSize: 14,
  },
  text: {
    color: '#C4B5FD',
    fontSize: 13,
    fontWeight: '600',
  },
  dots: {
    color: '#7C3AED',
    fontWeight: '800',
  },
});
