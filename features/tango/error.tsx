import { StyleSheet, ThemedText } from "@/components/react-native";

export const Error = ({ message }: { message: string }) => {
  return <ThemedText style={styles.error} size="type-400">{message}</ThemedText>;
};

const styles = StyleSheet.create({
  error: {
    borderWidth: 1.5,
    borderColor: "red",
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
});
