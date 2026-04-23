import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { getCardStyles } from '../styles/cardStyles';

import { useThemeStore } from '../store/themeStore';
import { LIGHT_COLORS, DARK_COLORS } from '../theme/colors';
import { isTablet } from '../utils/responsive';
import { getStyles } from '../styles/loginStyles';


interface Props {
  name: string;
  instLogo: string;
  location: string;
  type?: string;
  onPress: () => void;
}

const InstituteCard: React.FC<Props> = ({ name, instLogo, location, type, onPress }) => {
  const { theme } = useThemeStore();
  const COLORS = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;
  const cardUi = getCardStyles(COLORS, theme);
  const styles = getStyles(COLORS, theme);
  return (
    <TouchableOpacity
      activeOpacity={0.85} // 🔥 press feedback
      style={[
        cardUi.card,
        {
          backgroundColor: COLORS.card,
          borderColor: COLORS.border,
        },
      ]}
      onPress={onPress}
    >
      {/* 🔹 LEFT */}
      <View style={cardUi.left}>
        <View
          style={[
            cardUi.logoBox,
            { backgroundColor: COLORS.transparent },
          ]}
        >
          <Image source={{ uri: instLogo }} style={cardUi.logo} />
        </View>

        <View style={cardUi.textContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[cardUi.name, { color: COLORS.text }]}
          >
            {name}
          </Text>
          <View style={cardUi.locationRow}>
            <Image
              source={
                theme === 'dark'
                  ? require('../assets/location-on.png')
                  : require('../assets/location-dark.png')
              }
              style={cardUi.locationicon}
            />
            <Text style={[cardUi.location, { color: COLORS.subtext }]}>
              {location ? location : 'Mumbai, India'}
            </Text>
          </View>
        </View>
      </View>
      {/* 🔹 RIGHT */}
      <View style={cardUi.right}>

        <Text style={cardUi.type}>{type ? type : 'Institute'}</Text>

        {/* 🔥 ARROW BOX (modern UI) */}
        <View
          style={[
            cardUi.arrowBox,

          ]}
        >
          <Text style={[cardUi.arrow]}>›</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default InstituteCard;