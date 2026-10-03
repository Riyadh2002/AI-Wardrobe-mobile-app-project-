import React, { useState } from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  icon?: string;
  rightAction?: React.ReactNode;
  style?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error,
  icon,
  rightAction,
  style,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(secureTextEntry);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputWrapperFocused,
          error ? styles.inputWrapperError : null,
        ]}
      >
        {icon && <Text style={styles.icon}>{icon}</Text>}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#71717A"
          secureTextEntry={isPasswordHidden}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styles.textInput}
        />

        {secureTextEntry ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsPasswordHidden(!isPasswordHidden)}
            style={styles.actionButton}
          >
            <Text style={styles.passwordToggleText}>{isPasswordHidden ? '👁️' : '🙈'}</Text>
          </TouchableOpacity>
        ) : (
          rightAction
        )}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: '#D4D4D8',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderRadius: 16,
    backgroundColor: '#141418',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 16,
  },
  inputWrapperFocused: {
    borderColor: '#7C3AED',
    backgroundColor: '#181820',
  },
  inputWrapperError: {
    borderColor: '#EF4444',
  },
  icon: {
    marginRight: 10,
    fontSize: 16,
  },
  textInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
  },
  actionButton: {
    padding: 6,
  },
  passwordToggleText: {
    fontSize: 14,
    opacity: 0.8,
  },
  errorText: {
    color: '#F87171',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
    fontWeight: '500',
  },
});
