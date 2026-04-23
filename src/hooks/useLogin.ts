import { useState, useEffect, useRef } from 'react';
import { TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '../store/userStore';
import { loginApi } from '../services/authService';
import { getInstitutes } from '../services/instituteService';
import { setItem } from '../utils/storage';
import { strings } from '../localization/strings';

export const useLogin = () => {
    const navigation = useNavigation<any>();
    const { setUser } = useUserStore();

    const [value, setValue] = useState('');
    const [mode, setMode] = useState<'none' | 'phone' | 'email'>('none');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [emailStep, setEmailStep] = useState<'none' | 'choice' | 'otp' | 'password'>('none');
    const [phoneStep, setPhoneStep] = useState<'input' | 'otp'>('input');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const inputs = useRef<Array<TextInput | null>>([]);

    const isNumeric = (val: string) => /^[0-9]+$/.test(val);

    useEffect(() => {
        if (!value.trim()) {
            setMode('none');
            setEmailStep('none');
            setPhoneStep('input');
            setOtp(['', '', '', '', '', '']);
            setPassword('');
            return;
        }

        if (isNumeric(value)) {
            setMode('phone');
            setPhoneStep('input');
            setEmailStep('none');
            setPassword('');
        } else {
            setMode('email');
            setEmailStep('choice');
            setPhoneStep('input');
            setOtp(['', '', '', '', '', '']);
        }
    }, [value]);

    const handleOtpChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < 5) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handlePasswordLogin = async () => {
        if (!value.trim()) {
            setError(strings.loginErrorEnterEmail);
            return;
        }

        if (!password.trim()) {
            setError(strings.loginErrorEnterPassword);
            return;
        }

        try {
            setLoading(true);
            setError('');

            const response = await loginApi({
                email: value,
                password: password,
            });

            await setItem('session', response);

            setUser({
                name: response.email?.split('@')[0],
                email: response.email,
                token: response.token,
            });

            const institutes = await getInstitutes(response.userId);
            navigation.replace('InstituteList', { institutes });
        } catch (err: any) {
            if (err?.response?.status === 401) {
                setError(strings.loginErrorInvalidCredentials);
            } else if (err?.response?.status === 404) {
                setError(strings.loginErrorUserNotFound);
            } else {
                setError(strings.loginErrorGeneric);
            }
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => setError('');

    return {
        value,
        setValue,
        mode,
        otp,
        setOtp,
        loading,
        emailStep,
        setEmailStep,
        phoneStep,
        setPhoneStep,
        password,
        setPassword,
        error,
        inputs,
        handleOtpChange,
        handlePasswordLogin,
        clearError,
    };
};
