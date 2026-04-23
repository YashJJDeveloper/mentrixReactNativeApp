import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import { getStyles } from '../styles/loginStyles';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '../store/themeStore';
import { LIGHT_COLORS, DARK_COLORS } from '../theme/colors';

import Input from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Loader';
import ThemeSwitcher from '../components/ThemeSwitcher';
import OtpInput from '../components/OtpInput';
import { strings } from '../localization/strings';
import { useLogin } from '../hooks/useLogin';
import { isTablet } from '../utils/responsive';

function LoginScreen() {
  const { theme } = useThemeStore();
  const COLORS = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;
  const styles = getStyles(COLORS, theme);

  const {
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
  } = useLogin();
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}>

        {/* 🔹 TOP RIGHT ICONS */}
        <View style={styles.topSection}>
          <View style={styles.topIcons}>
            <TouchableOpacity style={styles.iconBox}>
              <Image source={
                theme === 'dark'
                  ? require('../assets/warning-light.png')
                  : require('../assets/warning-dark.png')
              } style={{ height: 18, width: 18 }} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconBox}>
              <ThemeSwitcher />
            </TouchableOpacity>
          </View>
        </View>

        {/* 🔹 MAIN CONTENT */}
        <View style={styles.centerSection}>

          <View style={[isTablet && styles.card, !isTablet && styles.noCard, styles.cardWrapper]}>

            {/* LOGO */}
            <Image
              source={
                theme === 'dark'
                  ? require('../assets/schoolCoreLogoWhite.png')
                  : require('../assets/schoolCoreLogo.png')
              }
              style={styles.logo}
            />

            <Text style={styles.title}>
              {strings.loginTitle}<Text style={{ color: COLORS.primary }}>OS</Text>
            </Text>

            <Text style={styles.subtitle}>
              {strings.loginSubtitle}
            </Text>
            <Text style={styles.tagline}>
              {strings.loginTagline}
            </Text>

            {/* 🔹 INPUT */}
            <Input
              placeholder={strings.loginPlaceholder}
              value={value}
              onChangeText={(text) => {
                setValue(text);
                clearError();
              }}
              keyboardType={mode === 'phone' ? 'numeric' : 'default'}
            />

            {/* 🔹 MODE BASED UI */}

            {mode === 'none' && (
              <>
                {/* QR DIVIDER */}
                <View style={styles.divider}>
                  <View style={styles.line} />
                  <Text style={styles.or}>{strings.loginOr}</Text>
                  <View style={styles.line} />
                </View>

                <TouchableOpacity style={styles.joinBtn}>
                  <Image source={
                    theme === 'dark' ?
                      require('../assets/QR-scanner-white.png')
                      : require('../assets/QR-scanner.png')
                  } />
                  <Text style={styles.joinText}>{strings.loginJoinInstitute}</Text>
                </TouchableOpacity>
              </>
            )}

            {mode === 'email' && emailStep === 'choice' && (
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.halfBtn}
                  onPress={() => setEmailStep('otp')}
                >
                  <Text style={styles.actionText}>{strings.loginSendCode}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.halfBtn}
                  onPress={() => setEmailStep('password')}
                >
                  <Text style={styles.actionText}>{strings.loginUsePassword}</Text>
                </TouchableOpacity>
              </View>
            )}

            {mode === 'phone' && phoneStep === 'input' && (
              <Button title={strings.loginSendCode} onPress={() => setPhoneStep('otp')} />
            )}

            {mode === 'phone' && phoneStep === 'otp' && (
              <>
                <Text style={styles.otpLabel}>{strings.loginEnterCode}</Text>

                <OtpInput otp={otp} setOtp={setOtp} />

                <Text style={styles.resendText}>
                  {strings.loginResendCode}
                </Text>

                <Button title={strings.loginContinue} onPress={() => { }} />
              </>
            )}

            {mode === 'email' && emailStep === 'otp' && (
              <>
                <Text style={styles.otpLabel}>{strings.loginEnterCode}</Text>

                <OtpInput otp={otp} setOtp={setOtp} />

                <Text style={styles.resendText}>
                  {strings.loginResendCode}
                </Text>

                <Button title={strings.loginContinue} onPress={() => { }} />
              </>
            )}

            {mode === 'email' && emailStep === 'password' && (
              <>
                <Input
                  placeholder={strings.loginPasswordPlaceholder}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    clearError();
                  }}
                  secureTextEntry
                />

                {loading ? (
                  <Loader />
                ) : (
                  <Button title={strings.loginContinue} onPress={handlePasswordLogin} />
                )}
              </>
            )}

            {!!error && (
              <Text style={styles.error}>{error}</Text>
            )}



          </View>

        </View>


        <View style={styles.featureSection}>
          <Text style={styles.featureTitle}>
            {strings.loginFeatureTitle}
          </Text>

          <Text style={styles.featureSubtitle}>
            {strings.loginFeatureSubtitle}
          </Text>
        </View>


        {/* SETUP CARD */}
        <TouchableOpacity style={styles.setupCard}>
          <View style={styles.setupTextContainer}>
            <Text style={styles.setupLabel}>
              {strings.loginSetupLabel}
            </Text>

            <Text style={styles.setupLink}>
              {strings.loginSetupLink}
            </Text>
          </View>

          <Text style={styles.setupArrow}>›</Text>
        </TouchableOpacity>
        {/* 🔹 BOTTOM */}
        <View style={styles.bottomSection}>
          <Text style={styles.footer}>
            {strings.loginTerms}
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

export default LoginScreen;