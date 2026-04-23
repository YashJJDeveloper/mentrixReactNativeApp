import React, { useRef, useEffect, useState } from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Animated } from 'react-native';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import InstituteListScreen from '../screens/InstituteListScreen';
import RolesScreen from '../screens/RolesScreen';
import DashboardScreen from '../screens/DashboardScreen';

import { useThemeStore } from '../store/themeStore';
import { useUserStore } from '../store/userStore';
import { LIGHT_COLORS, DARK_COLORS } from '../theme/colors';
import { saveNavState, loadNavState } from '../utils/navigationPersistence';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  InstituteList: { institutes: any[] };
  Roles: { institute: any };
  Dashboard: { role: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  const { theme } = useThemeStore();
  const { user } = useUserStore();

  const [initialState, setInitialState] = useState<any>();
  const [isReady, setIsReady] = useState(false);

  // ✅ Hooks must be BEFORE any return
  const animatedValue = useRef(
    new Animated.Value(theme === 'dark' ? 1 : 0)
  ).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: theme === 'dark' ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [theme]);

  useEffect(() => {
    const savedState = loadNavState();

    if (user && savedState) {
      setInitialState(savedState);
    }

    setIsReady(true);
  }, [user]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      LIGHT_COLORS.background,
      DARK_COLORS.background,
    ],
  });

  // ✅ RETURN AFTER ALL HOOKS
  if (!isReady) return null;

  return (
    <Animated.View style={{ flex: 1, backgroundColor }}>
      <NavigationContainer
        theme={theme === 'dark' ? DarkTheme : DefaultTheme}
        initialState={initialState}
        onStateChange={(state) => {
          if (user) saveNavState(state);
        }}
      >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="InstituteList" component={InstituteListScreen} />
          <Stack.Screen name="Roles" component={RolesScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Animated.View>
  );
}

export default AppNavigator;