import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeStore } from '../store/themeStore';
import { LIGHT_COLORS, DARK_COLORS } from '../theme/colors';

interface Props {
    message: string; // 🔥 dynamic line (only thing you change)
}

const AppFooter: React.FC<Props> = ({ message }) => {
    const { theme } = useThemeStore();
    const COLORS = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;

    return (
        <View style={styles.container}>
            <Text style={[styles.text, { color: COLORS.subtext }]}>
                {message}
            </Text>

            <Text style={[styles.text, { color: COLORS.subtext }]}>
                or email us at{' '}
                <Text style={[styles.email, { color: COLORS.primary }]}>
                    support@mentrixos.com
                </Text>
            </Text>
        </View>
    );
};

export default AppFooter;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        alignItems: 'center',
        paddingHorizontal: 10,
    },

    text: {
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 18,
    },

    email: {
        fontWeight: '600',
    },
});