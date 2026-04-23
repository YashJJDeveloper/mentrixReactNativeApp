import React, { useRef } from 'react';
import { View, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { getStyles } from '../styles/loginStyles';
import { useThemeStore } from '../store/themeStore';
import { LIGHT_COLORS, DARK_COLORS } from '../theme/colors';

type Props = {
    otp: string[];
    setOtp: (val: string[]) => void;
};

export default function OtpInput({ otp, setOtp }: Props) {
    const inputs = useRef<Array<TextInput | null>>([]);

    const { theme } = useThemeStore();
    const COLORS = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;
    const styles = getStyles(COLORS, theme);

    // 🔹 HANDLE INPUT CHANGE
    const handleChange = (text: string, index: number) => {
        const newOtp = [...otp];

        // allow only numbers
        if (!/^\d?$/.test(text)) return;

        newOtp[index] = text;
        setOtp(newOtp);

        // move forward
        if (text && index < otp.length - 1) {
            inputs.current[index + 1]?.focus();
        }
    };

    // 🔹 HANDLE BACKSPACE (IMPORTANT FIX)
    const handleKeyPress = (
        e: NativeSyntheticEvent<TextInputKeyPressEventData>,
        index: number
    ) => {
        if (e.nativeEvent.key === 'Backspace') {
            const newOtp = [...otp];

            if (otp[index]) {
                // 🔥 case 1: current box has value → clear it
                newOtp[index] = '';
                setOtp(newOtp);
            } else if (index > 0) {
                // 🔥 case 2: already empty → go back & clear previous
                inputs.current[index - 1]?.focus();

                newOtp[index - 1] = '';
                setOtp(newOtp);
            }
        }
    };

    return (
        <View style={styles.otpRow}>
            {otp.map((digit, index) => (
                <TextInput
                    key={index}
                    ref={(ref) => (inputs.current[index] = ref)}
                    style={styles.otpBox}
                    keyboardType="numeric"
                    maxLength={1}
                    value={digit}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)} // ✅ IMPORTANT
                />
            ))}
        </View>
    );
}