import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import splashStyle from '../styles/splashScreenStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { strings } from '../localization/strings';
import { TIMEOUTS } from '../constants';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, TIMEOUTS.SPLASH_DURATION);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={splashStyle.container}>
      <Text style={splashStyle.text}>{strings.splashText}</Text>
    </View>
  );
}

export default SplashScreen;
