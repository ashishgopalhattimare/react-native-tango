import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { FC, PropsWithChildren } from "react";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

const Providers: FC<PropsWithChildren> = ({ children }) => {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>{children}</SafeAreaView>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default function RootLayout() {
  const isNative = ["android", "ios"].includes(Platform.OS);

  return (
    <Providers>
      <Stack initialRouteName="home">
        <Stack.Screen
          name="home"
          options={{
            headerShown: isNative,
          }}
        />
        <Stack.Screen
          name="home"
          options={{
            headerShown: isNative,
          }}
        />
      </Stack>
    </Providers>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
