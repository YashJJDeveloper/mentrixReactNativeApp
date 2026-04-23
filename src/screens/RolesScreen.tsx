import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import RoleCard from '../components/RoleCard';
import styles from '../styles/rolesStyle';
import { useThemeStore } from '../store/themeStore';
import { LIGHT_COLORS, DARK_COLORS } from '../theme/colors';
import { isTablet, isLandscape } from '../utils/responsive';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import { strings } from '../localization/strings';

interface Role {
  role_name: string;
  role_logo?: string;
}

interface Institute {
  inst_id: string;
  institute_name: string;
  inst_logo: string;
  roles: Role[];
}

const RolesScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { theme } = useThemeStore();
  const COLORS = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;

  const institute: Institute | undefined = route.params?.institute;


  useEffect(() => {
    if (!institute) return;

    if (institute.roles?.length === 1) {
      navigation.replace('Dashboard', {
        role: institute.roles[0],
      });
    }
  }, [institute]);

  if (!institute || !institute.roles) return null;

  const handleSelect = (role: Role) => {
    navigation.navigate('Dashboard', { role });
  };

  return (

    <>
      {/* 🔷 TOP HEADER */}
      < AppHeader
        backgroundType="transparent"
        onAvatarPress={() => navigation.navigate('Profile')}
      />

      {/* Change institute BUTTON  */}
      <View style={styles.topCenter}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[
            styles.backPill,
            {
              backgroundColor: COLORS.faintCard,
              borderColor: COLORS.border,
            },
          ]}
          activeOpacity={0.7}
        >
          <Image
            source={theme === 'dark' ? require('../assets/left-arrow-white.png') : require('../assets/left-arrow-black.png')}
            style={styles.backArrow}
          />
          <Text style={[styles.backPillText, { color: COLORS.text }]}>{strings.rolesChangeInstitute}</Text>
        </TouchableOpacity>
      </View>

      {/* 🏫 Institute Card */}
      <View
        style={[
          styles.instCard,
          {
            backgroundColor: COLORS.selectedCard, // 🔥 light blue bg
            borderColor: COLORS.selectedCardBorder, // 🔥 blue border
          },
        ]}>
        <Image source={{ uri: institute.inst_logo }} style={styles.logo} />

        <View style={{ flex: 1 }}>
          <Text style={[styles.instName, { color: COLORS.text }]}>
            {institute.institute_name}
          </Text>

          <Text style={[styles.location, { color: COLORS.subtext }]}>
            {strings.rolesLocation}
          </Text>
        </View>

        {/* ✅ CHECK ICON */}

        <Image
          source={
            theme === 'dark'
              ? require('../assets/verified.png')
              : require('../assets/verified.png')
          }
          style={{ tintColor: '#2075ff', width: 24, height: 24 }}
        />

      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: COLORS.text }]}>
          {strings.rolesTitle}
        </Text>

        <Text style={[styles.subtitle, { color: COLORS.subtext }]}>
          {strings.rolesSubtitle.replace('{institute}', institute.institute_name)}
        </Text>
      </View>

      {/* Roles */}
      <View
        style={[
          styles.contentWrapper,
          isTablet && styles.tabletWrapper,
        ]}
      >
        <FlatList
          data={institute.roles}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}

          numColumns={1}
          key="single-column"

          contentContainerStyle={{
            paddingBottom: 30,
            alignItems: 'center',
            width: '100%',
          }}

          renderItem={({ item }) => (
            <RoleCard
              name={item.role_name}
              role_logo={item.role_logo}
              onPress={() => handleSelect(item)}
            />
          )}

          ListFooterComponent={
            <AppFooter message={strings.rolesFooter} />
          }
        />
      </View>


    </>
  );

};

export default RolesScreen;
