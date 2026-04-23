import { StyleSheet } from 'react-native';
import { isTablet } from '../utils/responsive';

export const getStyles = (COLORS: any, theme: 'light' | 'dark') =>
  StyleSheet.create({

    container: {
      height: isTablet ? 70 : 60, // ✅ fixed height (important)

      paddingHorizontal: isTablet ? 30 : 20,

      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

      backgroundColor: COLORS.background,



      // ✅ subtle separation instead of heavy shadow
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,

      // ✅ iOS only shadow
      shadowColor: '#000',
      shadowOpacity: theme === 'dark' ? 0.15 : 0.05,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },

      // ✅ Android (very light)
      elevation: 2,
    },

    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    iconBtn: {
      width: 36,
      height: 36,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,

      backgroundColor: COLORS.card,

      // ❌ REMOVE heavy shadow
      elevation: 0,
    },

    iconText: {
      fontSize: isTablet ? 18 : 16,
      fontWeight: '600',
      color: COLORS.text,
    },

    logoRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    logoImage: {
      width: isTablet ? 28 : 24,
      height: isTablet ? 28 : 24,
      marginRight: 6,
    },

    logoText: {
      fontSize: isTablet ? 18 : 16,
      fontWeight: '600',
      color: COLORS.text,
    },

    title: {
      fontSize: isTablet ? 20 : 18,
      fontWeight: '600',
      color: COLORS.text,
    },

    avatar: {
      width: isTablet ? 40 : 36,
      height: isTablet ? 40 : 36,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',

      backgroundColor: COLORS.card,
      borderWidth: 1,
      borderColor: COLORS.border,


      elevation: 0,
    },

    avatarText: {
      fontWeight: '600',
      fontSize: isTablet ? 16 : 14,
      color: COLORS.text,
    },
  });