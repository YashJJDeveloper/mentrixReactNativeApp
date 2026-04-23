import { StyleSheet, Dimensions } from 'react-native';
import { isTablet } from '../utils/responsive';
import { SPACING } from '../theme/spacing';
import { FONT } from '../theme/typography';

const { width } = Dimensions.get('window');

// 🔥 better scaling (instead of raw width / 375)
const scale = (size: number) => (width / 375) * size;

const styles = StyleSheet.create({
  card: {
    width: isTablet ? width / 2 - SPACING.lg * 2 : '48%',
    padding: isTablet ? SPACING.xl : SPACING.md,
    borderRadius: isTablet ? 22 : 18,
    marginBottom: SPACING.md,

    // 🔥 shadow (clean modern)
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  number: {
    fontSize: isTablet ? FONT.xlarge : scale(22),
    fontWeight: '700',
    marginBottom: SPACING.sm,
  },

  title: {
    fontSize: isTablet ? FONT.medium : FONT.regular,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },

  desc: {
    fontSize: isTablet ? FONT.regular : FONT.small,
    opacity: 0.8,
    lineHeight: isTablet ? 20 : 16,
  },
});

export default styles;