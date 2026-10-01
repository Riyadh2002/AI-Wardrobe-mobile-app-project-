import { Stack, DarkTheme, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync().catch(() => {});

const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#09090B',
    card: '#141418',
    text: '#FFFFFF',
    border: 'rgba(255, 255, 255, 0.08)',
    primary: '#7C3AED',
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={customDarkTheme}>
      <StatusBar style="light" />
      <View style={styles.outerContainer}>
        <View style={styles.appContainer}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#09090B' },
              animation: Platform.OS === 'ios' ? 'default' : 'fade',
            }}
          />
        </View>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appContainer: {
    flex: 1,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 460 : undefined,
    backgroundColor: '#09090B',
    overflow: 'hidden',
  },
});
