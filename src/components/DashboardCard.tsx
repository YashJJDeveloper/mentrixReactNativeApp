import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/dashboardCardStyles';
import { useThemeStore } from '../store/themeStore';
import { isTablet } from '../utils/responsive';
import { CARD_TYPE_COLORS } from '../constants';

interface Props {
  number: string;
  title: string;
  description: string;
  type?: 'blue' | 'green' | 'orange' | 'purple';
}

const DashboardCard: React.FC<Props> = ({
  number,
  title,
  description,
  type = 'blue',
}) => {
  const { theme } = useThemeStore();

  const COLORS = CARD_TYPE_COLORS[theme][type];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: COLORS.bg,
          padding: isTablet ? 22 : 16,
          borderRadius: isTablet ? 18 : 14,
        },
      ]}
    >
      {/* 🔢 NUMBER */}
      <Text
        style={[
          styles.number,
          {
            color: COLORS.number,
            fontSize: isTablet ? 28 : 22,
          },
        ]}
      >
        {number}
      </Text>

      {/* 📌 TITLE */}
      <Text
        style={[
          styles.title,
          {
            color: COLORS.title,
            fontSize: isTablet ? 16 : 14,
          },
        ]}
      >
        {title}
      </Text>

      {/* 📝 DESCRIPTION */}
      <Text
        style={[
          styles.desc,
          {
            color: COLORS.desc,
            fontSize: isTablet ? 13 : 12,
          },
        ]}
      >
        {description}
      </Text>
    </View>
  );
};

export default DashboardCard;