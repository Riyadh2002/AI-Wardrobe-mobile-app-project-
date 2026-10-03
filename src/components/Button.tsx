import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}) => {
  const getContainerStyle = (): StyleProp<ViewStyle> => {
    const base: any[] = [styles.base, styles[size]];

    switch (variant) {
      case 'primary':
        base.push(styles.primary);
        break;
      case 'secondary':
        base.push(styles.secondary);
        break;
      case 'outline':
        base.push(styles.outline);
        break;
      case 'ghost':
        base.push(styles.ghost);
        break;
      case 'glow':
        base.push(styles.glow);
        break;
    }

    if (disabled || loading) {
      base.push(styles.disabled);
    }

    if (style) {
      base.push(style);
    }

    return base;
  };

  const getTextStyle = (): StyleProp<TextStyle> => {
    const base: any[] = [styles.text, styles[`${size}Text`]];

    switch (variant) {
      case 'primary':
      case 'glow':
        base.push(styles.primaryText);
        break;
      case 'secondary':
        base.push(styles.secondaryText);
        break;
      case 'outline':
        base.push(styles.outlineText);
        break;
      case 'ghost':
        base.push(styles.ghostText);
        break;
    }

    if (disabled) {
      base.push(styles.disabledText);
    }

    if (textStyle) {
      base.push(textStyle);
    }

    return base;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.82}
      onPress={onPress}
      disabled={disabled || loading}
      style={getContainerStyle()}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? '#7C3AED' : '#FFFFFF'}
        />
      ) : (
        <>
          {icon ? <>{icon}</> : null}
          <Text style={getTextStyle()}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  sm: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  md: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  lg: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 18,
  },

  primary: {
    backgroundColor: '#7C3AED',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  glow: {
    backgroundColor: '#8B5CF6',
    borderWidth: 1,
    borderColor: '#C4B5FD',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 6,
  },
  secondary: {
    backgroundColor: '#1E1E24',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: 'rgba(124, 58, 237, 0.6)',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },

  text: {
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  smText: {
    fontSize: 13,
  },
  mdText: {
    fontSize: 15,
  },
  lgText: {
    fontSize: 17,
  },

  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#F5F5F5',
  },
  outlineText: {
    color: '#C4B5FD',
  },
  ghostText: {
    color: '#A1A1AA',
  },
  disabledText: {
    color: '#71717A',
  },
});
