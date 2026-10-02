import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { CategoryType } from '../types';

interface CategoryChipProps {
  label: CategoryType;
  icon?: string;
  count?: number;
  isSelected: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

export const CategoryChip: React.FC<CategoryChipProps> = ({
  label,
  icon,
  count,
  isSelected,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={[styles.chip, isSelected && styles.chipSelected, style]}
    >
      {icon ? <Text style={styles.icon}>{icon}</Text> : null}
      <Text style={[styles.label, isSelected && styles.labelSelected]}>{label}</Text>
      {count !== undefined ? (
        <Text style={[styles.count, isSelected && styles.countSelected]}>{count}</Text>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: '#141418',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginRight: 8,
    gap: 6,
  },
  chipSelected: {
    backgroundColor: '#7C3AED',
    borderColor: '#8B5CF6',
  },
  icon: {
    fontSize: 14,
  },
  label: {
    color: '#A1A1AA',
    fontSize: 13,
    fontWeight: '600',
  },
  labelSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  count: {
    color: '#71717A',
    fontSize: 11,
    fontWeight: '600',
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  countSelected: {
    color: '#FFFFFF',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
});
