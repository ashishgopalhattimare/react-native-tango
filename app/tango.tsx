import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

import {
  Image,
  ThemedButton,
  ThemedText,
  ThemedView,
} from "@/components/react-native";

export const logo = require("@/assets/images/tango-logo.png");

const backgroundConfig: LinearGradientProps = {
  colors: ["#0b0b0b", "#1a1a1a", "#2a2a2a"],
  start: { x: 0.5, y: 1 },
  end: { x: 0.5, y: 0 }
};

export default function TangoHomeScreen() {
  return (
    <LinearGradient style={styles.container} {...backgroundConfig}>
      <ThemedView style={styles.main} isTransparent>
        <Image source={logo} style={styles.logo} />
        <ThemedText type="title" lightColor="white" darkColor="white">
          Tango
        </ThemedText>
        <ThemedText type="subtitle" size="type-400" lightColor="white" darkColor="white">
          Hormonize the grid
        </ThemedText>
        <ThemedText type="default" size="type-300" lightColor="white" darkColor="white">
          NO. 384
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.action} isTransparent>
        <ThemedButton title="Start game" theme="tertiary" />
      </ThemedView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "red",
  },
  main: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "60%",
    gap: 8
  },
  logo: {
    height: 100,
    width: 100,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  action: {
    marginTop: "auto",
  },
});
