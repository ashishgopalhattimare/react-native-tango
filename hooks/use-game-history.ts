import { clone } from "@/utils/clone";
import { useCallback, useRef } from "react";

export const useGameHistory = <T>() => {
  const history = useRef<T[]>([]);

  const goBack = useCallback(() => {
    const historyRef = history.current;
    historyRef.pop();

    return historyRef[historyRef.length - 1] ?? null;
  }, []);

  const saveHistory = useCallback((state: T) => {
    history.current.push(clone(state));
  }, []);

  const clearHistory = useCallback(() => {
    history.current = [];
  }, []);

  return {
    goBack,
    saveHistory,
    clearHistory
  };
};
