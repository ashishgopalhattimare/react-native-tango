import {
  StyleSheet,
  ThemedButton,
  ThemedScrollView,
  ThemedView,
} from "@/components/react-native";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";

import { useGameHistory } from "@/hooks/use-game-history";

import { Error, Instructions, TangoGrid } from "@/features/tango";

import { useValidate } from "@/hooks/tango";
import { useAlert } from "@/hooks/use-alert";

import { getRandomGame } from "@/mocks/tango";
import { convert, TangoGrid as TangoGridType } from "@/types/tango";
import { clone } from "@/utils/clone";

type GameModel = {
  grid: TangoGridType;
  errors: Record<string, string> | null;
};

const Tango = () => {
  const initiate = useRef<TangoGridType>(convert(getRandomGame()));
  const [data, setData] = useState<GameModel>({
    grid: clone(initiate.current),
    errors: null,
  });

  const { goBack, saveHistory, clearHistory, hasHistory } =
    useGameHistory<GameModel>();
  const router = useRouter();

  const validate = useValidate();
  const { alert } = useAlert();

  const onClearHandler = () => {
    clearHistory();
    setData({
      grid: clone(initiate.current),
      errors: null,
    });
  };

  const onValidate = () =>
    validate(data.grid, (response) => {
      if (response.gameOver) {
        const onExitHandler = () => {
          router.canGoBack() ? router.back() : router.replace("/home");
        };
        alert(
          "Congratulate",
          "Thanks for playing this game. Hope you loved it ❤️.❤️",
          [
            {
              text: "Thanks",
              onPress: onExitHandler,
            },
          ],
          { cancelable: false }
        );
      }
      else {
        const state: GameModel = { grid: response.data, errors: response.errors };
        saveHistory(state);
        setData(state);
      }
    });

  const onUndoHandler = () => {
    const prev = goBack();
    if (prev) setData(prev);
    else {
      onClearHandler();
    }
  };

  const errors = data.errors ? Object.values(data.errors) : [];
  const undoDisabled = !hasHistory();

  return (
    <ThemedScrollView>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.toolbar}>
          <ThemedButton title="Difficult HARD" theme="secondary" disabled />
          <ThemedView style={styles.toolbarActions}>
            <ThemedButton
              title="Clear"
              theme="tertiary"
              onClick={onClearHandler}
            />
          </ThemedView>
        </ThemedView>
        <TangoGrid data={data.grid} onChange={onValidate} />
        <ThemedView style={styles.gameActions}>
          <ThemedButton
            title="Undo"
            onClick={onUndoHandler}
            fullWidth
            disabled={undoDisabled}
          />
          <ThemedButton title="Hint" fullWidth />
        </ThemedView>
        {errors.map((error, index) => (
          <Error key={index} message={error} />
        ))}
        <Instructions />
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
  main: {},
});
