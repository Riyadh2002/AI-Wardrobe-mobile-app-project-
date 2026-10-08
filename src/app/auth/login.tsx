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

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('riyad@example.com');
  const [password, setPassword] = useState('fashion2026');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = () => {
    const userEmail = email.trim() || 'riyad@example.com';
    const userPass = password.trim() || 'fashion2026';
    setEmail(userEmail);
    setPassword(userPass);

    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.replace('/home' as any);
    }, 350);
  };

  const handleSocialLogin = () => {
    router.replace('/home' as any);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Ambient Purple Glow */}
            <View style={styles.ambientGlow} />

            {/* Brand Logo Header */}
            <View style={styles.logoSection}>
              <View style={styles.logoBadge}>
                <Text style={styles.logoText}>C</Text>
              </View>
              <Text style={styles.brandName}>AIWardrobe</Text>
              <Text style={styles.brandTagline}>Your wardrobe. Reimagined by AI.</Text>
            </View>

            {/* Card Surface */}
            <View style={styles.card}>
              <View style={styles.header}>
                <Text style={styles.title}>Welcome back</Text>
                <Text style={styles.subtitle}>
                  Sign in to continue your style journey.
                </Text>
              </View>

              {error ? (
                <View style={styles.errorBanner}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              ) : null}

              {/* Email */}
              <Input
                label="Email address"
                placeholder="you@example.com"
                value={email}
                onChangeText={(val) => {
                  setEmail(val);
                  if (error) setError('');
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                icon="✉️"
              />

              {/* Password */}
              <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={(val) => {
                  setPassword(val);
                  if (error) setError('');
                }}
                secureTextEntry
                icon="🔒"
              />

              {/* Forgot Password */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push('/auth/forgot-password' as any)}
                style={styles.forgotButton}
              >
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>

              {/* Sign In CTA */}
              <Button
                title="Sign In"
                onPress={handleSignIn}
                variant="primary"
                size="lg"
                loading={isLoading}
                style={styles.signInButton}
              />

              {/* Divider */}
              <View style={styles.dividerRow}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
                <View style={styles.divider} />
              </View>

              {/* Social Logins */}
              <View style={styles.socialColumn}>
                <Button
                  title="Continue with Google"
                  onPress={handleSocialLogin}
                  variant="secondary"
                  size="md"
                  icon={<Text style={styles.socialIcon}>G</Text>}
                />

                <Button
                  title="Continue with Apple"
                  onPress={handleSocialLogin}
                  variant="secondary"
                  size="md"
                  icon={<Text style={styles.socialIcon}></Text>}
                />
              </View>

              {/* Switch to Register */}
              <View style={styles.footerRow}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <TouchableOpacity
                  activeOpacity={0.75}
                  onPress={() => router.push('/auth/register' as any)}
                >
                  <Text style={styles.footerLink}>Create account</Text>
                </TouchableOpacity>
              </View>
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
    paddingVertical: 20,
    justifyContent: 'center',
  },
  ambientGlow: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    width: 240,
    height: 180,
    backgroundColor: 'rgba(124, 58, 237, 0.18)',
    borderRadius: 120,
    filter: 'blur(60px)',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoBadge: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 8,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  brandName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  brandTagline: {
    color: '#A1A1AA',
    fontSize: 13,
    marginTop: 4,
  },
  card: {
    backgroundColor: '#141418',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  subtitle: {
    color: '#A1A1AA',
    fontSize: 13,
    marginTop: 6,
  },
  errorBanner: {
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
    fontWeight: '500',
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 18,
    marginTop: -6,
  },
  forgotText: {
    color: '#A78BFA',
    fontSize: 12,
    fontWeight: '600',
  },
  signInButton: {
    marginBottom: 22,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  dividerText: {
    color: '#71717A',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginHorizontal: 12,
  },
  socialColumn: {
    gap: 10,
    marginBottom: 22,
  },
  socialIcon: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#71717A',
    fontSize: 13,
  },
  footerLink: {
    color: '#C4B5FD',
    fontSize: 13,
    fontWeight: '700',
  },
});
