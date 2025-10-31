import { useCallback } from "react";
import { Alert, AlertButton, AlertOptions, Platform } from "react-native";

export const useAlert = () => {
  const alertHandler = useCallback(
    (
      title: string,
      message?: string,
      buttons?: AlertButton[],
      options?: AlertOptions
    ) => {
      switch (Platform.OS) {
        case "android":
        case "ios":
          Alert.alert(title, message, buttons, options);
          break;
        default:
          const text = [title, message].filter(Boolean).join("\n");
          globalThis.alert(text);
      }
    },
    []
  );

  return alertHandler
};
