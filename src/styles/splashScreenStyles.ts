import { StyleSheet, Dimensions } from 'react-native';
import { SPACING } from '../theme/spacing';
import { FONT } from '../theme/typography';

const { width } = Dimensions.get('window');

// 🔥 controlled scaling (only for mobile fine-tuning)
const scale = (size: number) => (width / 375) * size;

const splashStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg, // 🔥 prevents edge sticking on small screens
  },

  text: {
    fontSize: scale(FONT.large), // 🔥 responsive text
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default splashStyle;