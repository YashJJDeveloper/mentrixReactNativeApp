import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useThemeStore } from './src/store/themeStore';
import { LIGHT_COLORS, DARK_COLORS } from './src/theme/colors';

import AppNavigator from './src/navigation/AppNavigator';
import { enableScreens } from 'react-native-screens';

enableScreens(true);

const App = () => {
  const { theme, loadTheme } = useThemeStore();

  useEffect(() => {
    loadTheme();
  }, []);

  const COLORS = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={COLORS.background}
      />

      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;