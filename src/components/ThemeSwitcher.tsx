import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import { useThemeStore } from '../store/themeStore';
import { getStyles } from '../styles/loginStyles';
import { LIGHT_COLORS, DARK_COLORS } from '../theme/colors';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useThemeStore();
  const COLORS = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;
  const styles = getStyles(COLORS, theme)
  return (
    <TouchableOpacity

      onPress={toggleTheme}
    >
      <Image
        source={
          theme === 'dark'
            ? require('../assets/moon.png')   // dark icon
            : require('../assets/sun-light.png')    // light icon
        }
        style={{
          width: 18,
          height: 18,
          resizeMode: 'contain',
        }}
      />
    </TouchableOpacity>
  );
};

export default ThemeSwitcher;