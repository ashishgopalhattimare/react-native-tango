import {
  StyleSheet,
  ThemedButton,
  ThemedScrollView,
  ThemedText,
  ThemedView
} from "@/components/react-native";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";

import { useGameHistory } from "@/hooks/use-game-history";

import { Error, Instructions, TangoGrid } from "@/features/tango";

import { useValidate } from "@/hooks/tango";
import { useAlert } from "@/hooks/use-alert";
import { useTimer } from "@/hooks/use-timer";

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

  const { start: startTimer, stop: stopTimer, time: gameTime } = useTimer();

  const { goBack, saveHistory, clearHistory, hasHistory } = useGameHistory<GameModel>();
  const router = useRouter();
  const validate = useValidate();
  const alert = useAlert();

  const onClearHandler = () => {
    clearHistory();
    setData({
      grid: clone(initiate.current),
      errors: null,
    });
  };

  const onValidate = () => {
    startTimer();
    validate(data.grid, (response) => {
      if (response.gameOver) {
        stopTimer();
        
        const onExitHandler = () => {
          router.canGoBack() ? router.back() : router.replace("/home");
        };
        alert(
          "Puzzle Complete!",
          "Congratulations on completing the game. Hope you loved it ❤️.❤️",
          [
            {
              text: "Thanks",
              onPress: onExitHandler,
            },
          ],
          { cancelable: false }
        );
        return;
      }
      const state: GameModel = { grid: response.data, errors: response.errors };
      saveHistory(state);
      setData(state);
    });
  }

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
          <ThemedView style={styles.toolbarSection}>
            <ThemedButton title="Difficult HARD" theme="secondary" disabled />
            <ThemedText size="type-600" type="defaultSemiBold">
              {gameTime}sec
            </ThemedText>
          </ThemedView>
          <ThemedButton title="Clear" theme="tertiary" onClick={onClearHandler} />
        </ThemedView>
        <TangoGrid data={data.grid} onChange={onValidate} />
        <ThemedView style={styles.gameActions}>
          <ThemedButton title="Undo" onClick={onUndoHandler} fullWidth disabled={undoDisabled} />
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
  toolbarSection: {
    display: "flex",
    gap: 12,
    flexDirection: "row",
    alignItems: "center"
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
