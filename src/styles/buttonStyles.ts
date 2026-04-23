import { StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

export default StyleSheet.create({
    button: {
        backgroundColor: COLORS.continueBtn,
        padding: 14,
        borderRadius: 6,
        alignItems: 'center',
        width: '100%',
    },
    text: {
        color: '#fff',
        fontWeight: '600',
    },
    disabled: {
        opacity: 0.5,
    },
});