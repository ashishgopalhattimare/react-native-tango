import { Expando } from "@/components/expando";
import { StyleSheet, ThemedText, ThemedView } from "@/components/react-native";

const data = {
  title: "How to play",
  instructions: [
    "Fill the grid so that each cell contains either of the two colors.",
    "No more than 2 colors may be next to each other, either vertically or horizontally.",
    "Each row (and column) must contain an equal number of both colors.",
    'Cells separated by an "=" sign must be of the same type.',
    'Cells separated by a "x" sign must be of the opposite type.',
    "Each puzzle has one right answer and can be solved via deduction (you should never have to make a guess).",
  ],
};

export const Instructions = () => (
  <Expando title={data.title} style={styles.container}>
    <ThemedView>
      {data.instructions.map((instruction, index) => (
        <ThemedText key={index} style={styles.listitem} size="type-300">
          • {instruction}
        </ThemedText>
      ))}
    </ThemedView>
  </Expando>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderWidth: 1.5,
    borderColor: "#d7d7d7ff",
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  listitem: {
    marginTop: 8,
  },
});
