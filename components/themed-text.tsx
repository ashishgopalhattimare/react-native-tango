import { StyleSheet, Text, TextStyle, type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

type TextSize =
  | "type-200"
  | "type-300"
  | "type-400"
  | "type-500"
  | "type-600"
  | "type-700"
  | "type-800"
  | "type-900";
const TextSizeMapper: Record<TextSize, TextStyle> = {
  "type-200": { fontSize: 10, lineHeight: 15 },
  "type-300": { fontSize: 12, lineHeight: 18 },
  "type-400": { fontSize: 14, lineHeight: 21 },
  "type-500": { fontSize: 16, lineHeight: 24 },
  "type-600": { fontSize: 18, lineHeight: 27 },
  "type-700": { fontSize: 20, lineHeight: 30 },
  "type-800": { fontSize: 30, lineHeight: 40 },
  "type-900": { fontSize: 32, lineHeight: 40 },
};

type TextType = "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
type StyleSheetRecordType = Record<TextType, TextStyle>;
export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: TextType;
  size?: TextSize;
};

export function ThemedText({
  lightColor,
  darkColor,
  size,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        styles[type],
        size ? TextSizeMapper[size] : undefined,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create<StyleSheetRecordType>({
  default: {
    ...TextSizeMapper["type-500"],
  },
  defaultSemiBold: {
    ...TextSizeMapper["type-500"],
    fontWeight: "500",
  },
  title: {
    ...TextSizeMapper["type-900"],
    fontWeight: "bold",
  },
  subtitle: {
    ...TextSizeMapper["type-700"],
    fontWeight: "normal",
  },
  link: {
    ...TextSizeMapper["type-500"],
    color: "#0a7ea4",
  },
});
