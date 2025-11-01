import { StyleSheet, Text, TextStyle, type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";
import { TextSizeToStyleMapper as TextSizeMapper } from "./styles";
import { TextSize, TextType } from "./types";

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
      style={[{ color }, styles[type], size ? TextSizeMapper[size] : undefined]}
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
