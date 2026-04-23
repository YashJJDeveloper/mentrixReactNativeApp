import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { getStyles } from '../styles/appHeaderStyles';
import { useNavigation } from '@react-navigation/native';
import { useThemeStore } from '../store/themeStore';
import { LIGHT_COLORS, DARK_COLORS, COLORS } from '../theme/colors';
import { useUserStore } from '../store/userStore';

interface Props {
    title?: string;

    showMenu?: boolean;
    showBack?: boolean;
    showAvatar?: boolean;

    onMenuPress?: () => void;
    onBackPress?: () => void;
    onAvatarPress?: () => void;

    backgroundType?: 'default' | 'light' | 'transparent';
}

const AppHeader: React.FC<Props> = ({
    title,
    showMenu = false,
    showBack = false,
    showAvatar = true,
    onMenuPress,
    onBackPress,
    onAvatarPress,
    backgroundType = 'default',
}) => {
    const navigation = useNavigation<any>();
    const { theme } = useThemeStore();
    const COLORS = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;
    const { user } = useUserStore();
    const styles = getStyles(COLORS, theme);
    const isLight = backgroundType === 'light';
    const isTransparent = backgroundType === 'transparent';
    const insets = useSafeAreaInsets();

    const bgColor = isTransparent
        ? 'transparent'
        : isLight
            ? '#ffffff'
            : COLORS.background;

    const textColor = isLight ? '#111827' : COLORS.text;

    const borderColor = isTransparent
        ? 'transparent'
        : isLight
            ? '#e5e7eb'
            : COLORS.border;

    const initial = user?.name?.charAt(0)?.toUpperCase() || '?';

    const handleAvatarPress = () => {
        if (onAvatarPress) return onAvatarPress();

        const { clearUser } = useUserStore.getState();
        clearUser();
        navigation.replace('Login');
    };


    return (
        <View style={{ backgroundColor: bgColor }}>

            {/* ✅ SAFE AREA (correct way) */}
            <SafeAreaView
                edges={['top']}
                style={{
                    backgroundColor: isTransparent ? 'transparent' : bgColor,
                }}
            />

            {/* ✅ HEADER */}
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: isTransparent ? 'transparent' : bgColor,

                        borderBottomWidth: isTransparent ? 0 : 1,
                        borderBottomColor: borderColor,

                        elevation: isTransparent ? 0 : 2, // Android
                        shadowOpacity: isTransparent ? 0 : (theme === 'dark' ? 0.15 : 0.05), // iOS
                    },
                ]}
            >
                {/* LEFT */}
                <View style={styles.leftSection}>
                    {showMenu && (
                        <TouchableOpacity onPress={onMenuPress} style={styles.iconBtn}>
                            <Text style={styles.iconText}>☰</Text>
                        </TouchableOpacity>
                    )}

                    {showBack && (
                        <TouchableOpacity
                            onPress={onBackPress}
                            style={[styles.iconBtn, { backgroundColor: COLORS.card }]}
                        >
                            <Text style={styles.iconText}>←</Text>
                        </TouchableOpacity>
                    )}

                    {!title ? (
                        <View style={styles.logoRow}>
                            <Image
                                source={
                                    theme === 'dark'
                                        ? require('../assets/schoolCoreLogoWhite.png')
                                        : require('../assets/schoolCoreLogo.png')
                                }
                                style={styles.logoImage}
                            />
                            <Text style={[styles.logoText, { color: textColor }]}>
                                Mentrix<Text style={{ color: COLORS.primary }}>OS</Text>
                            </Text>
                        </View>
                    ) : (
                        <Text style={[styles.title, { color: textColor }]}>
                            {title}
                        </Text>
                    )}
                </View>

                {/* RIGHT */}
                {showAvatar && (
                    <TouchableOpacity
                        onPress={handleAvatarPress}
                        style={[
                            styles.avatar,
                            {
                                backgroundColor: COLORS.card,
                                borderColor: borderColor,
                            },
                        ]}
                    >
                        <Text style={[styles.avatarText, { color: textColor }]}>
                            {initial}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default AppHeader;