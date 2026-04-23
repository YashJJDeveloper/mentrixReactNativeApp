import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Image } from 'react-native';

import { useThemeStore } from '../store/themeStore';
import { LIGHT_COLORS, DARK_COLORS } from '../theme/colors';
import { isTablet } from '../utils/responsive';

interface Props {
  value: string;
  onChangeText: (text: string) => void; // ✅ FIXED
  placeholder?: string;
}

const SearchBar: React.FC<Props> = ({ value, onChangeText, placeholder }) => {
  const { theme } = useThemeStore();
  const COLORS = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;

  const [focused, setFocused] = useState(false);

  return (
    <View
      style={[
        styles.wrapper,
        {
          borderColor: focused ? COLORS.primary : COLORS.border,
          backgroundColor: COLORS.card,
        },
      ]}
    >
      <Image
        source={require('../assets/Search-Glass.png')}
        style={[styles.searchIcon, { tintColor: COLORS.subtext }]}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || 'Search...'}
        placeholderTextColor={COLORS.subtext}
        style={[
          styles.input,
          {
            color: COLORS.text,
            fontSize: isTablet ? 16 : 14,
          },
        ]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: isTablet ? 500 : '100%',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 10,

    // subtle shadow (premium feel)
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  input: {
    paddingVertical: 12,
  },
  searchIcon: {
    width: isTablet ? 40 : 38,
    height: isTablet ? 40 : 38,
    marginRight: 10,
    resizeMode: 'contain',
  }
});