import { StyleSheet, Dimensions } from 'react-native';
import { isTablet } from '../utils/responsive';
import { SPACING } from '../theme/spacing';
import { FONT } from '../theme/typography';

const { width } = Dimensions.get('window');

// 🔥 optional scale (use only where needed)
const scale = (size: number) => (width / 375) * size;

const dashboardStyles = StyleSheet.create({
  container: {
    padding: isTablet ? SPACING.xl : SPACING.lg,
    gap: SPACING.lg, // 🔥 modern gap for spacing
    marginTop: isTablet ? 20 : -25, // 🔥 adjusted for safe area
  },

  topBar: {
    alignItems: 'flex-end',
    marginBottom: SPACING.lg,

  },

  header: {
    alignItems: 'center',
    marginBottom: isTablet ? SPACING.xl : SPACING.lg,
  },

  title: {
    fontSize: isTablet ? FONT.xlarge : scale(22),
    fontWeight: '700',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: isTablet ? FONT.large : FONT.medium,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },

  role: {
    fontSize: isTablet ? FONT.medium : FONT.small,
    marginTop: SPACING.xs,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SPACING.md, // 🔥 cleaner spacing between cards
  },
});

export default dashboardStyles;