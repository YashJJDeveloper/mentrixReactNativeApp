import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { getCardStyles } from '../styles/cardStyles';
import { getStyles } from '../styles/loginStyles';

import { useThemeStore } from '../store/themeStore';
import { LIGHT_COLORS, DARK_COLORS } from '../theme/colors';

interface Props {
  name: string;
  role_logo?: string;
  onPress: () => void;
}

const RoleCard: React.FC<Props> = ({ name, onPress }) => {
  const { theme } = useThemeStore();
  const COLORS = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;
  const cardUi = getCardStyles(COLORS, theme);
  const styles = getStyles(COLORS, theme);
  const getIcon = (name: string) => {
    switch (name) {
      case 'Super Admin':
        return require('../assets/Super-Admin.png');
      case 'Institute Admin':
        return require('../assets/Principal.png');
      case 'Trainer':
        return require('../assets/Trainer.png');
      case 'Staff':
        return require('../assets/Parents.png');
      case 'Student':
        return require('../assets/Student.png');
      default:
        return '❓';
    }
  };

  const getColor = () => {
    switch (name) {
      case 'Super Admin':
        return '#7c3aed';
      case 'Institute Admin':
        return '#3b82f6';
      case 'Trainer':
        return '#3b82f6';
      case 'Staff':
        return '#10b981';
      case 'Student':
        return '#1083b9';

      default:
        return '#ffffff00';
    }
  };

  const getDescription = () => {
    switch (name) {
      case 'Super Admin':
        return 'Full system access';
      case 'Institute Admin':
        return 'Manage institute settings';
      case 'Trainer':
        return 'Manage classes & students';
      case 'Staff':
        return 'Operational access';
      case 'Student':
        return 'Learning access';
      default:
        return 'Access role features';
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[
        cardUi.card,
        {
          backgroundColor: COLORS.card,
          borderColor: COLORS.border,
        },
      ]}
      onPress={onPress}
    >
      {/* LEFT */}
      <View style={cardUi.left}>

        {/* ICON */}
        <View
          style={[
            cardUi.roleIcon,

          ]}
        >
          <Image source={getIcon(name)} style={cardUi.roleIcon} />
        </View>

        {/* TEXT BLOCK */}
        <View>
          <Text style={[cardUi.name, { color: COLORS.text }]}>
            {name}
          </Text>

          <Text
            style={[
              cardUi.desc,
              { color: COLORS.subtext },
            ]}
          >
            {getDescription()}
          </Text>
        </View>
      </View>

      {/* RIGHT ARROW */}
      <View
        style={[
          cardUi.arrowBox,
          {
            backgroundColor: COLORS.border,
          },
        ]}
      >
        <Text style={{ color: COLORS.text, fontSize: 22 }}>›</Text>
      </View>
    </TouchableOpacity >
  );
};

export default RoleCard;