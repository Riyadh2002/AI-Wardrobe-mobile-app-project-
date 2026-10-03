import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { WeatherInfo } from '../types';

interface WeatherCardProps {
  weather: WeatherInfo;
  style?: ViewStyle;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather, style }) => {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.topRow}>
        <View style={styles.locationBlock}>
          <Text style={styles.city}>{weather.city}</Text>
          <Text style={styles.condition}>{weather.condition}</Text>
        </View>

        <View style={styles.tempBlock}>
          <Text style={styles.icon}>{weather.icon}</Text>
          <Text style={styles.temp}>{weather.temperature}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.bottomRow}>
        <Text style={styles.aiTag}>✨ AI Outfit Tip</Text>
        <Text style={styles.recommendation} numberOfLines={2}>
          {weather.recommendation}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    backgroundColor: 'rgba(24, 24, 27, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 18,
    marginBottom: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationBlock: {
    flex: 1,
  },
  city: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  condition: {
    color: '#A1A1AA',
    fontSize: 13,
    marginTop: 2,
  },
  tempBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    fontSize: 24,
  },
  temp: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginVertical: 12,
  },
  bottomRow: {
    gap: 4,
  },
  aiTag: {
    color: '#C4B5FD',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  recommendation: {
    color: '#D4D4D8',
    fontSize: 13,
    lineHeight: 18,
  },
});
