import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ViewStyle } from 'react-native';

interface LoadingStateProps {
  message?: string;
  style?: ViewStyle;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Organizing your style...',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.spinnerWrapper}>
        <ActivityIndicator size="large" color="#7C3AED" />
      </View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  spinnerWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  message: {
    color: '#A1A1AA',
    fontSize: 14,
    fontWeight: '500',
  },
});
