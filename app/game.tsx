import { StyleSheet } from "react-native";

import { ThemedText, ThemedView } from "@/components/react-native";

export default function TangoGame() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Game On</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
