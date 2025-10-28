import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Platform } from 'react-native';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const isNative = ["android", "ios"].includes(Platform.OS);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="tango" options={{
          headerShown: isNative
        }} />
        <Stack.Screen name="game" options={{
          headerShown: isNative
        }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
