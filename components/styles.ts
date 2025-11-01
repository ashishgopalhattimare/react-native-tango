import { StyleSheet, TextStyle } from "react-native";
import { ButtonTheme, TextSize } from "./types";

export const TextSizeToStyleMapper: Record<TextSize, TextStyle> = {
  "type-200": { fontSize: 10, lineHeight: 15 },
  "type-300": { fontSize: 12, lineHeight: 18 },
  "type-400": { fontSize: 14, lineHeight: 21 },
  "type-500": { fontSize: 16, lineHeight: 24 },
  "type-600": { fontSize: 18, lineHeight: 27 },
  "type-700": { fontSize: 20, lineHeight: 30 },
  "type-800": { fontSize: 30, lineHeight: 40 },
  "type-900": { fontSize: 32, lineHeight: 40 },
};

type ButtonThemeStyles = { [K in ButtonTheme]: TextStyle };
export const ButtonThemeToStyleMapper = StyleSheet.create<ButtonThemeStyles>({
  primary: {
    backgroundColor: "blue",
    color: "white",
  },
  secondary: {
    backgroundColor: "rgb(215 215 215)",
    color: "white",
  },
  tertiary: {
    borderColor: "black",
    backgroundColor: "white",
    color: "black",
  },
});
