import { StyleSheet, ThemedButton, ThemedView } from "@/components/react-native";
import { useRef, useState } from "react";

import { TangoGrid } from "@/features/tango";
import { useValidate } from "@/hooks/tango";
import { convert, Levels, TangoGrid as TangoGridType } from "@/types/tango";

const clone = (data: TangoGridType): TangoGridType => JSON.parse(JSON.stringify(data));

const Tango = () => {
  const initiate = useRef<TangoGridType>(convert(Levels.HARD));
  const [data, setData] = useState(clone(initiate.current));

  const validate = useValidate();

  const onClearHandler = () => setData(clone(initiate.current));
  const onValidate = () => {
    validate(data, (response) => {
      console.log("ERRORS", response.errors);
      setData(response.data);
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.toolbar}>
        <ThemedButton title="Difficult HARD" theme="secondary" />
        <ThemedView style={styles.actions}>
          <ThemedButton title="Clear" theme="tertiary" onClick={onClearHandler} />
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.main}>
        <TangoGrid data={data} onChange={onValidate} />
      </ThemedView>
    </ThemedView>
  );
};

export default function TangoGame() {
  return <Tango />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  actions: {
    display: "flex",
    gap: 12,
    flexDirection: "row",
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  main: {},
});
