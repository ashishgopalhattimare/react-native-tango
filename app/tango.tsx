import { StyleSheet } from "react-native";

import {
  Image,
  ThemedButton,
  ThemedText,
  ThemedView,
} from "@/components/react-native";

export const logo = require("@/assets/images/tango-logo.svg");

export default function TangoHomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.main} isTransparent>
        <Image source={logo} style={styles.logo} />
        <ThemedText type="title">Tango</ThemedText>
        <ThemedText type="subtitle" size="type-400">
          Hormonize the grid
        </ThemedText>
        <ThemedText type="default" size="type-300">
          NO. 384
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.action}>
        <ThemedButton title="Start game" fullWidth theme="tertiary" />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  main: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: '60%'
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
