import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Header } from '../../components/Header';

export default function ForgotPasswordScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleReset = () => {
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setIsSent(true);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header title="Forgot Password" showBack onBackPress={() => router.back()} />

        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.card}>
              <View style={styles.iconCircle}>
                <Text style={styles.keyIcon}>🔑</Text>
              </View>

              <Text style={styles.title}>Reset Password</Text>
              <Text style={styles.subtitle}>
                Enter the email associated with your style profile and we'll send instructions to reset your password.
              </Text>

              {isSent ? (
                <View style={styles.successBanner}>
                  <Text style={styles.successTitle}>Check your inbox ✨</Text>
                  <Text style={styles.successText}>
                    We have dispatched a password recovery link to {email}.
                  </Text>
                  <Button
                    title="Return to Sign In"
                    onPress={() => router.replace('/auth/login' as any)}
                    variant="primary"
                    size="md"
                    style={{ marginTop: 16 }}
                  />
                </View>
              ) : (
                <>
                  {error ? (
                    <View style={styles.errorBanner}>
                      <Text style={styles.errorText}>{error}</Text>
                    </View>
                  ) : null}

                  <Input
                    label="Email address"
                    placeholder="you@example.com"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      if (error) setError('');
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    icon="✉️"
                  />

                  <Button
                    title="Send Reset Link"
                    onPress={handleReset}
                    variant="primary"
                    size="lg"
                    style={styles.sendButton}
                  />
                </>
              )}

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.replace('/auth/login' as any)}
                style={styles.backToLoginButton}
              >
                <Text style={styles.backToLoginText}>Back to Sign In</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090B',
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingVertical: 24,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#141418',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 20,
    paddingVertical: 28,
    alignItems: 'center',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(124, 58, 237, 0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.3)',
  },
  keyIcon: {
    fontSize: 28,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  subtitle: {
    color: '#A1A1AA',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 24,
  },
  errorBanner: {
    width: '100%',
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.35)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
  },
  errorText: {
    color: '#F87171',
    fontSize: 13,
  },
  successBanner: {
    width: '100%',
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  successTitle: {
    color: '#34D399',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  successText: {
    color: '#D1D5DB',
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
  },
  sendButton: {
    width: '100%',
    marginTop: 6,
    marginBottom: 16,
  },
  backToLoginButton: {
    paddingVertical: 8,
  },
  backToLoginText: {
    color: '#A78BFA',
    fontSize: 14,
    fontWeight: '600',
  },
});
