import { StyleSheet } from 'react-native';
import { isTablet } from '../utils/responsive';

export const getStyles = (COLORS: any, theme: 'light' | 'dark') =>
  StyleSheet.create({


    //  ROOT LAYOUT

    safeArea: {
      flex: 1,
      backgroundColor: COLORS.background,
    },

    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingBottom: isTablet ? 40 : 20,
      paddingHorizontal: isTablet ? 40 : 20,
      backgroundColor: COLORS.background,
      gap: isTablet ? 0 : 10,
    },

    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },


    //  TOP SECTION (ICONS)

    topSection: {
      width: '100%',
      alignItems: 'flex-end',
      marginTop: 10,
    },

    topIcons: {
      flexDirection: 'row',
      gap: 10,
    },

    iconBox: {
      width: 40,
      height: 40,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.card,

      shadowColor: '#000',
      shadowOpacity: theme === 'dark' ? 0.3 : 0.08,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 4,
    },


    //  CENTER SECTION

    centerSection: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: isTablet ? 10 : 0,
    },

    // Tablet card container
    card: {
      width: isTablet ? '90%' : '100%',
      maxWidth: isTablet ? 520 : '100%',
      padding: isTablet ? 30 : 0,
      borderRadius: isTablet ? 20 : 0,
      backgroundColor: isTablet ? COLORS.card : 'transparent',
      borderColor: COLORS.border,
      borderWidth: isTablet && theme === 'dark' ? 1 : 0,
      gap: isTablet ? 16 : 20,

      shadowColor: '#000',
      shadowOpacity: isTablet ? (theme === 'dark' ? 0.25 : 0.08) : 0,
      shadowRadius: 15,
      shadowOffset: { width: 0, height: 8 },
      elevation: isTablet ? 6 : 0,
    },

    cardWrapper: {
      width: isTablet ? '90%' : '100%',
      maxWidth: isTablet ? 520 : '100%',
      flex: isTablet ? 0 : 1,
      alignItems: 'center',
      gap: 14,

    },

    noCard: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      elevation: 0,
      shadowOpacity: 0,
    },


    //  BRANDING

    logo: {
      width: isTablet ? 110 : 70,
      height: isTablet ? 110 : 70,
      resizeMode: 'contain',
      alignSelf: 'center',
    },

    title: {
      fontSize: isTablet ? 30 : 22,
      fontWeight: '700',
      textAlign: 'center',
      color: COLORS.text,
    },

    subtitle: {
      textAlign: 'center',
      marginTop: 6,
      fontSize: isTablet ? 15 : 13,
      lineHeight: 20,
      color: COLORS.text,
    },

    tagline: {
      marginTop: 6,
      marginBottom: 20, // spacing before inputs
      textAlign: 'center',
      color: COLORS.subtext,
    },

    bold: {
      fontWeight: '600',
      color: COLORS.text,
    },


    //  FORM ELEMENTS

    inputWrapper: {
      width: '100%',
    },

    error: {
      color: '#ef4444',
      textAlign: 'center',
      marginTop: 10,
    },


    //  DIVIDER (QR SECTION)

    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 12,
    },

    line: {
      flex: 1,
      height: 1.5,
      backgroundColor: theme === 'dark' ? '#444' : '#999',
    },

    or: {
      marginHorizontal: 12,
      fontSize: 12,
      fontWeight: '700',
      color: theme === 'dark' ? '#aaa' : '#555',
    },

    joinBtn: {
      flexDirection: 'row',
      width: '100%',
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: COLORS.border,
      backgroundColor: COLORS.card,

      shadowColor: '#000',
      shadowOpacity: theme === 'dark' ? 0.25 : 0.05,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 2,
    },

    joinText: {
      fontSize: 14,
      fontWeight: '600',
      color: COLORS.text,
    },


    //  EMAIL ACTION BUTTONS

    actionRow: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 10,
    },

    halfBtn: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: 'center',
      backgroundColor: COLORS.continueBtn,
    },

    actionText: {
      color: '#fff',
      fontWeight: '600',
    },


    //  OTP SECTION

    otpLabel: {
      width: '100%',
      marginTop: 10,
      marginBottom: 6,
      fontSize: 13,
      color: COLORS.primary,
      fontWeight: '500',
      textAlign: 'left',
    },

    otpRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10,
      marginVertical: 10,
    },

    otpBox: {
      width: 48,
      height: 48,
      borderRadius: 10,
      borderWidth: 1,
      textAlign: 'center',
      fontSize: 18,
      borderColor: COLORS.border,
      backgroundColor: COLORS.card,
      color: COLORS.text,
    },

    resendText: {
      marginTop: 8,
      fontSize: 13,
      textAlign: 'center',
      color: COLORS.subtext,
    },

    resendLink: {
      color: COLORS.primary,
      fontWeight: '600',
    },


    //  FEATURE SECTION

    featureSection: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      marginTop: isTablet ? 60 : 20,
      marginBottom: isTablet ? 0 : 0,
      paddingHorizontal: isTablet ? 0 : 0,
    },

    featureTitle: {
      fontSize: isTablet ? 16 : 14,
      fontWeight: '600',
      color: COLORS.text,
      textAlign: 'center',
    },

    featureSubtitle: {
      fontSize: isTablet ? 14 : 12,
      color: COLORS.subtext,
      marginTop: 4,
      textAlign: 'center',
    },


    //  SETUP INSTITUTE CARD

    setupCard: {
      width: isTablet ? 500 : '100%',
      maxWidth: isTablet ? 500 : '100%',
      paddingVertical: isTablet ? 16 : 14,
      paddingHorizontal: isTablet ? 20 : 16,
      borderRadius: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: COLORS.card,
      marginTop: isTablet ? 20 : 20,
      marginBottom: isTablet ? 10 : 0,

      shadowColor: '#000',
      shadowOpacity: theme === 'dark' ? 0.25 : 0.05,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 3,
    },

    setupTextContainer: {
      flexDirection: 'column',
    },

    setupLabel: {
      fontSize: 13,
      color: COLORS.subtext,
    },

    setupLink: {
      fontSize: 14,
      fontWeight: '600',
      color: COLORS.primary,
      marginTop: 2,
    },

    setupArrow: {
      fontSize: 18,
      color: COLORS.primary,
    },


    //  FOOTER

    bottomSection: {
      width: '100%',
      alignItems: 'center',
      marginBottom: 10,
    },

    footer: {
      textAlign: 'center',
      fontSize: 11,
      color: COLORS.subtext,
      opacity: 0.7,
    },


    //  COLOR HELPERS

    blue: { color: COLORS.primary },
    orange: { color: '#f97316', fontWeight: '600' },
    purple: { color: '#7c3aed', fontWeight: '600' },
    dark: { fontWeight: '600', color: COLORS.text },
    link: { color: COLORS.primary },
    green: { color: '#02524B', fontWeight: '600' },
  });