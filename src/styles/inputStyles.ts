import { StyleSheet } from 'react-native';
import { isTablet } from '../utils/responsive';

export default StyleSheet.create({
    wrapper: {
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 14,
        paddingHorizontal: 12,
        width: isTablet ? 450 : 360,
    },

    input: {
        width: '100%',
        paddingVertical: 12,
    },

    label: {
        marginBottom: 6,
        fontSize: isTablet ? 14 : 12,
        fontWeight: '600',
    },

    error: {
        marginTop: 6,
        fontSize: isTablet ? 13 : 12,
    },
});