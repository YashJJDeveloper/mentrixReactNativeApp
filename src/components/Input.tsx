import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useThemeStore } from '../store/themeStore';
import { LIGHT_COLORS, DARK_COLORS } from '../theme/colors';
import { isTablet } from '../utils/responsive';
import styles from '../styles/inputStyles';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

function Input({
  label,
  error,
  containerStyle,
  inputStyle,
  onFocus,
  onBlur,
  placeholderTextColor,
  autoCorrect = false,
  style,
  ...props
}: Props) {
  const { theme } = useThemeStore();
  const COLORS = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;
  const [focused, setFocused] = useState(false);

  const handleFocus = (event: any) => {
    setFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: any) => {
    setFocused(false);
    onBlur?.(event);
  };

  return (
    <View style={containerStyle}>
      {label ? (
        <Text style={[styles.label, { color: COLORS.subtext }]}>{label}</Text>
      ) : null}

      <View
        style={[
          styles.wrapper,
          {
            borderColor: error ? '#ef4444' : focused ? COLORS.primary : COLORS.border,
            backgroundColor: COLORS.card,
          },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              color: COLORS.text,
              fontSize: isTablet ? 16 : 14,
            },
            inputStyle,
            style,
          ]}
          placeholderTextColor={placeholderTextColor ?? COLORS.subtext}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoCapitalize={autoCorrect ? 'sentences' : 'none'}
          autoCorrect={autoCorrect}
          clearButtonMode="while-editing"
          {...props}
        />
      </View>

      {error ? <Text style={[styles.error, { color: '#ef4444' }]}>{error}</Text> : null}
    </View>
  );
}

export default Input;