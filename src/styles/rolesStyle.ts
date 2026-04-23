import { StyleSheet, Dimensions } from 'react-native';
import { isTablet } from '../utils/responsive';
import { SPACING } from '../theme/spacing';
import { FONT } from '../theme/typography';
import { COLORS } from '../theme/colors';

const { width } = Dimensions.get('window');

// 🔥 controlled scaling
const scale = (size: number) => (width / 375) * size;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: isTablet ? SPACING.xl : SPACING.lg,
    paddingTop: SPACING.lg,
    backgroundColor: COLORS.background
  },

  // 🔷 HEADER
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoImage: {
    width: isTablet ? 40 : scale(28),
    height: isTablet ? 40 : scale(28),
    marginRight: SPACING.sm,
  },

  logoText: {
    fontSize: isTablet ? FONT.large : FONT.medium,
    fontWeight: '700',
  },

  avatar: {
    width: isTablet ? 50 : 42,
    height: isTablet ? 50 : 42,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 🔙 BUTTON
  topCenter: {
    alignItems: 'center',
    marginVertical: SPACING.md,
  },

  backPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: isTablet ? SPACING.md : SPACING.sm,
    paddingVertical: isTablet ? SPACING.md : SPACING.sm + 2,
    paddingHorizontal: isTablet ? SPACING.lg + 4 : SPACING.lg,
    borderRadius: 25,
    borderWidth: 1,
  },

  backArrow: {
    width: isTablet ? 18 : 14,
    height: isTablet ? 18 : 14,
    resizeMode: 'contain',
  },

  backPillText: {
    fontSize: isTablet ? FONT.regular : FONT.regular,
    fontWeight: '400',
  },

  // 🏫 INSTITUTE CARD
  instCard: {
    width: isTablet ? '90%' : '92%',
    maxWidth: isTablet ? 500 : 600,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: isTablet ? 20 : 16,
    marginBottom: SPACING.xl,
    alignSelf: 'center',
    borderWidth: 2,
  },

  logo: {
    width: isTablet ? 60 : scale(48),
    height: isTablet ? 60 : scale(48),
    borderRadius: 12,
    marginRight: SPACING.sm,
  },

  instName: {
    fontSize: isTablet ? FONT.medium : FONT.regular,
    fontWeight: '600',
  },

  location: {
    fontSize: FONT.small,
    marginTop: 2,
  },

  // 🔥 TITLE
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },

  title: {
    fontSize: isTablet ? FONT.xlarge : scale(24),
    fontWeight: '800',
    textAlign: 'center',
  },

  subtitle: {
    width: isTablet ? 500 : '50%',
    fontSize: FONT.small,
    marginTop: SPACING.sm,
    textAlign: 'center',
    lineHeight: 18,
  },

  list: {
    paddingBottom: SPACING.lg,
  },

  tabletList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },

  footer: {
    textAlign: 'center',
    fontSize: FONT.small,
    marginTop: SPACING.xl,
  },

  email: {
    textAlign: 'center',
    fontSize: FONT.regular,
    marginTop: SPACING.xs,
    fontWeight: '600',
  },

  iconBox: {
    width: isTablet ? 55 : 45,
    height: isTablet ? 55 : 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },

  arrowBox: {
    width: isTablet ? 44 : 36,
    height: isTablet ? 44 : 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  name: {
    fontSize: isTablet ? FONT.medium : FONT.regular,
    fontWeight: '600',
  },

  contentWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: isTablet ? 20 : 0,
  },

  // ✅ CENTERED PREMIUM LAYOUT
  tabletWrapper: {
    alignSelf: 'center',
    alignItems: 'center',
    width: isTablet ? '100%' : '100%',
    maxWidth: isTablet ? 550 : 700,
  },
});

export default styles;