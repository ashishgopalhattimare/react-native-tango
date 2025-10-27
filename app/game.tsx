import {
  StyleSheet,
  ThemedButton,
  ThemedScrollView,
  ThemedText,
  ThemedView,
} from "@/components/react-native";
import { useRef, useState } from "react";

import { useGameHistory } from "@/hooks/use-game-history";

import { TangoGrid } from "@/features/tango";
import { useValidate } from "@/hooks/tango";
import { convert, Levels, TangoGrid as TangoGridType } from "@/types/tango";
import { clone } from "@/utils/clone";

type GameModel = {
  grid: TangoGridType;
  errors: Record<string, string> | null;
};

const Tango = () => {
  const initiate = useRef<TangoGridType>(convert(Levels.HARD));
  const [data, setData] = useState<GameModel>({
    grid: clone(initiate.current),
    errors: null,
  });

  const { goBack, saveHistory, clearHistory } = useGameHistory<GameModel>();

  const validate = useValidate();

  const onClearHandler = () => {
    clearHistory();
    setData({
      grid: clone(initiate.current),
      errors: null,
    });
  };

  const onValidate = () =>
    validate(data.grid, ({ data: new_data, errors }) => {
      const state: GameModel = { grid: new_data, errors };
      saveHistory(state);
      setData(state);
    });

  const onUndoHandler = () => {
    const prev = goBack();
    if (prev) setData(prev);
    else {
      onClearHandler();
    }
  };

  const errors = data.errors ? Object.values(data.errors) : [];

  return (
    <ThemedScrollView>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.toolbar}>
          <ThemedButton title="Difficult HARD" theme="secondary" />
          <ThemedView style={styles.toolbarActions}>
            <ThemedButton
              title="Clear"
              theme="tertiary"
              onClick={onClearHandler}
            />
          </ThemedView>
        </ThemedView>
        <ThemedView>
          <TangoGrid data={data.grid} onChange={onValidate} />
        </ThemedView>
        <ThemedView style={styles.gameActions}>
          <ThemedButton title="Undo" onClick={onUndoHandler} fullWidth />
          <ThemedButton title="Hint" fullWidth />
        </ThemedView>
        {errors.map((error, index) => (
          <ThemedText key={index} size="type-400" style={styles.error}>
            {error}
          </ThemedText>
        ))}
      </ThemedView>
    </ThemedScrollView>
  );
};

export default function TangoGame() {
  return (
    <ThemedView style={styles.flexGrow}>
      <Tango />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flexGrow: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  toolbarActions: {
    display: "flex",
    gap: 12,
    flexDirection: "row",
  },
  gameActions: {
    display: "flex",
    gap: 12,
    flexDirection: "row",
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  error: {
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  main: {},
});
