import { FC, PropsWithChildren } from "react";

import { Platform, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import {
  DarkTheme,
  DefaultTheme,
  HeaderBackButton,
  ThemeProvider,
} from "@/components/react-navigation";
import { useColorScheme } from "@/hooks/use-color-scheme";

import "react-native-reanimated";

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
          name="game"
          options={({ navigation }) => ({
            headerShown: isNative,
            title: "Lets Play Tango!!!",
            headerLeft: () => (
              <HeaderBackButton onPress={() => navigation.goBack()} />
            ),
          })}
        />
        <Stack.Screen
          name="home"
          options={{
            headerShown: false,
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
