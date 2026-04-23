import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

import InstituteCard from '../components/InstituteCard';
import ScreenWrapper from '../components/ScreenWrapper';
import AppHeader from '../components/AppHeader';
import SearchBar from '../components/SearchBar';
import AppFooter from '../components/AppFooter';

import styles from '../styles/instituteStyles';
import { useThemeStore } from '../store/themeStore';
import { LIGHT_COLORS, DARK_COLORS } from '../theme/colors';
import { isTablet } from '../utils/responsive';
import { useUserStore } from '../store/userStore';
import { strings } from '../localization/strings';
import { useSearch } from '../hooks/useSearch';

type RouteType = RouteProp<RootStackParamList, 'InstituteList'>;

function InstituteListScreen() {
  const route = useRoute<RouteType>();
  const navigation = useNavigation<any>();

  const { theme } = useThemeStore();
  const COLORS = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;

  const { user } = useUserStore();

  const institutes = route.params?.institutes || [];
  const { search, setSearch, filteredData } = useSearch(institutes, ['institute_name', 'location']);

  const showSearch = institutes.length > 5;

  // ❌ NO DATA STATE
  if (!institutes.length) {
    return (
      <ScreenWrapper>
        <View style={styles.center}>
          <Text style={{ color: COLORS.text, fontSize: 16 }}>
            {strings.instituteListNoInstitutes}
          </Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper style={{ backgroundColor: COLORS.background }}>

      {/* 🔹 HEADER */}
      <AppHeader
        backgroundType="transparent"
        onAvatarPress={() => navigation.navigate('Profile')}
      />

      {/* 🔹 TITLE */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: COLORS.text }]}>
          {strings.instituteListGreeting.replace('{name}', user?.name ? `${user.name}!` : '')}
        </Text>

        <Text style={[styles.subtitle, { color: COLORS.subtext }]}>
          {strings.instituteListSubtitle}
        </Text>
      </View>

      {/* 🔍 SEARCH */}
      {showSearch && (
        <View style={styles.searchWrapper}>
          <SearchBar
            value={search}
            onChangeText={setSearch}
            placeholder={strings.instituteListSearchPlaceholder}
          />
        </View>
      )}

      {/* 🔹 LIST */}
      <View
        style={[
          styles.contentWrapper,
          isTablet && styles.tabletWrapper,
        ]}
      >
        <FlatList
          data={filteredData} // ✅ FIXED
          keyExtractor={(item) => item.inst_id}
          showsVerticalScrollIndicator={false}

          numColumns={1}
          key="single-column"

          contentContainerStyle={{
            paddingBottom: 20,
            alignItems: 'center',
            width: '100%',
          }}

          // ✅ EMPTY SEARCH STATE
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={{ color: COLORS.subtext }}>
                {strings.instituteListNoMatches}
              </Text>
            </View>
          }

          renderItem={({ item }) => (
            <InstituteCard
              name={item.institute_name}
              instLogo={item.inst_logo}
              location={item.location}
              onPress={() =>
                navigation.navigate('Roles', { institute: item })
              }
            />
          )}

          ListFooterComponent={
            <AppFooter message={strings.instituteListFooter} />
          }
        />

      </View>

    </ScreenWrapper>
  );
}

export default InstituteListScreen;