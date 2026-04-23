import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import dashboardStyles from '../styles/dashboardStyles';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useThemeStore } from '../store/themeStore';
import { LIGHT_COLORS, DARK_COLORS } from '../theme/colors';
import { useUserStore } from '../store/userStore';
import DashboardCard from '../components/DashboardCard';
import LogoutButton from '../components/LogoutButton';
import AppHeader from '../components/AppHeader';
import { strings } from '../localization/strings';
import { DASHBOARD_CARDS } from '../constants';

interface Role {
  role_name: string;
}

const DashboardScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const { theme } = useThemeStore();
  const COLORS = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;
  const { user } = useUserStore();
  const role: Role | undefined = route.params?.role;

  const handleLogout = () => {
    navigation.replace('Login');
  };

  return (
    <ScrollView
      contentContainerStyle={[
        dashboardStyles.container,
        { backgroundColor: COLORS.background },
      ]}
    >
      <AppHeader
        showMenu
        backgroundType="default"
        onMenuPress={() => console.log('menu')}
        onAvatarPress={() => navigation.navigate('Login')}
      />

      {/* 👋 Header */}
      <View style={dashboardStyles.header}>
        <Text style={[dashboardStyles.title, { color: COLORS.text }]}>
          {strings.dashboardWelcome}
        </Text>

        <Text style={[dashboardStyles.subtitle, { color: COLORS.primary }]}>
          {user?.name}
        </Text>

        {role && (
          <Text style={[dashboardStyles.role, { color: COLORS.subtext }]}>
            Role: {role.role_name}
          </Text>
        )}
      </View>

      {/* 📊 Cards */}
      <View style={dashboardStyles.grid}>
        {DASHBOARD_CARDS.map((card, index) => (
          <DashboardCard
            key={index}
            number={card.number}
            title={strings[card.titleKey as keyof typeof strings]}
            description={strings[card.descriptionKey as keyof typeof strings]}
            type={card.type}
          />
        ))}
      </View>


    </ScrollView>
  );
};

export default DashboardScreen;