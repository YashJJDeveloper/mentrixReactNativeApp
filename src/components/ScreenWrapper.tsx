import React from 'react';
import {View, StatusBar} from 'react-native';
import {useThemeStore} from '../store/themeStore';
import {LIGHT_COLORS, DARK_COLORS} from '../theme/colors';

const ScreenWrapper = ({children}: any) => {
  const {theme} = useThemeStore();
  const COLORS = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;

  return (
    <View style={{flex: 1, backgroundColor: COLORS.background}}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={COLORS.background}
      />
      {children}
    </View>
  );
};

export default ScreenWrapper;