import { StyleSheet, Dimensions } from 'react-native';
import { isTablet } from '../utils/responsive';
import { SPACING } from '../theme/spacing';
import { FONT } from '../theme/typography';

const { width } = Dimensions.get('window');

// 🔥 controlled scaling
const scale = (size: number) => (width / 375) * size;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: isTablet ? SPACING.xl : SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.sm,
  },

  title: {
    fontSize: isTablet ? FONT.xlarge : scale(22),
    fontWeight: '700',
    textAlign: 'center',
  },
  searchWrapper: {
    width: isTablet ? '50%' : '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    alignSelf: 'center',
    paddingHorizontal: isTablet ? 0 : 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: isTablet ? FONT.medium : FONT.small,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },

  listContainer: {
    padding: SPACING.md,
  },

  // ✅ TABLET GRID
  tabletList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SPACING.md, // 🔥 modern spacing
  },

  tabletItem: {
    width: isTablet ? width / 2 - SPACING.xl * 2 : '100%',
    marginBottom: SPACING.md,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: isTablet ? 20 : 0,
  },

  tabletWrapper: {
    alignSelf: 'center',
    alignItems: 'center',
    width: isTablet ? '100%' : '100%',
    maxWidth: isTablet ? 550 : 900,
  },

  wrapper: {
    borderWidth: 1,
    borderRadius: isTablet ? 16 : 12,
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.sm,
  },

  input: {
    paddingVertical: SPACING.sm + 2,
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
});

export default styles;