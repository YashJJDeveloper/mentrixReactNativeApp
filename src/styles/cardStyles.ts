import { StyleSheet, Dimensions, Platform } from 'react-native';
import { isTablet } from '../utils/responsive';

const { width } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;

const isAndroid = Platform.OS === 'android';

export const getCardStyles = (COLORS: any, theme: 'light' | 'dark') =>
  StyleSheet.create({
    // 🔹 MAIN CARD (only place where elevation should exist)
    card: {
      width: '100%',
      maxWidth: isTablet ? 500 : 380,
      height: isTablet ? 80 : scale(80),
      alignSelf: 'center',

      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',

      padding: isTablet ? 20 : scale(14),
      borderRadius: 18,
      marginBottom: 14,

      backgroundColor: COLORS.card,
      borderWidth: 1,
      borderColor: COLORS.border,

      // ✅ iOS shadow
      shadowColor: '#000',
      shadowOpacity: theme === 'dark' ? 0.25 : 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },

      // ✅ Android elevation ONLY here
      elevation: isAndroid ? 3 : 0,
    },

    // 🔹 LEFT SECTION
    left: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      gap: isTablet ? 16 : scale(12),
    },

    logoBox: {
      width: isTablet ? 64 : scale(48),
      height: isTablet ? 64 : scale(48),
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
      backgroundColor: COLORS.transparent,
    },

    logo: {
      width: '75%',
      height: '75%',
      resizeMode: 'contain',
    },

    textContainer: {
      flex: 1,
    },

    name: {
      fontSize: isTablet ? 18 : scale(15),
      fontWeight: '600',
      color: COLORS.text,
    },

    desc: {
      fontSize: isTablet ? 13 : scale(12),
      color: COLORS.subtext,
    },

    locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },

    locationicon: {
      width: isTablet ? 14 : scale(12),
      height: isTablet ? 14 : scale(12),
      resizeMode: 'contain',
      marginRight: 4,
      tintColor: COLORS.subtext,
    },

    location: {
      fontSize: isTablet ? 13 : scale(12),
      color: COLORS.subtext,
    },

    // 🔹 RIGHT SECTION
    right: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '100%',

    },

    // 🔹 ROLE TYPE BADGE
    type: {
      fontSize: isTablet ? 15 : scale(14),
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8,
      marginBottom: 8,
      overflow: 'hidden',
      color: COLORS.subtext,
    },

    // 🔥 FIXED ARROW BOX (DARK MODE FRIENDLY)
    arrowBox: {
      width: isTablet ? 38 : 30,
      height: isTablet ? 38 : 30,
      borderRadius: 8,

      justifyContent: 'center',
      alignItems: 'center',

      // ✅ Better contrast in both themes
      backgroundColor:
        theme === 'dark'
          ? 'rgba(255,255,255,0.05)' // subtle glass look
          : '#f1f5f9',

      borderWidth: 1,
      borderColor:
        theme === 'dark'
          ? 'rgba(255,255,255,0.08)'
          : COLORS.border,
    },

    arrow: {
      fontSize: isTablet ? 26 : 24,
      fontWeight: '700',
      color: COLORS.text,
      textAlign: 'center',
      marginTop: isTablet ? -5 : -4, // visually center the arrow
    },

    // 🔥 FIXED ROLE ICON (NO ANDROID SHADOW BUG)
    roleIcon: {
      width: isTablet ? 40 : scale(30),
      height: isTablet ? 40 : scale(30),
      resizeMode: 'contain',

      justifyContent: 'center',
      alignItems: 'center',
    },
  });