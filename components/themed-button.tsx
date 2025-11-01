import { PropsWithChildren } from "react";
import { Pressable, StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

import { ButtonThemeToStyleMapper as ThemeStyles } from "./styles";
import { ThemedText } from "./themed-text";
import { ButtonTag, ButtonTheme } from "./types";

const ButtonTagMap: Record<ButtonTag, React.ElementType> = {
  Pressable: Pressable,
  TouchableOpacity: TouchableOpacity,
};

type Props = {
  title: string;
  theme?: ButtonTheme;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  tag?: ButtonTag;
  onClick?: () => void;
};
export const ThemedButton = ({
  title,
  fullWidth,
  theme = "tertiary",
  style: customStyles,
  disabled,
  tag = "TouchableOpacity",
  onClick,
}: Props) => {
  const style = [
    styles.button,
    fullWidth ? styles.fullWidth : undefined,
    ThemeStyles[theme],
    customStyles,
    disabled ? { opacity: 0.4 } : undefined,
  ];

  const Tag = ButtonTagMap[tag];
  return (
    <Tag style={style} onPress={onClick} disabled={disabled} accessibilityState={{ disabled: disabled }}>
      <ThemedText type="defaultSemiBold" size="type-400">
        {title}
      </ThemedText>
    </Tag>
  );
};

export const ThemedButtonGraphic = ({
  onClick,
  style: customStyles,
  theme = "tertiary",
  disabled,
  tag = "TouchableOpacity",
  children,
}: PropsWithChildren<Omit<Props, "title" | "fullWidth">>) => {
  const style = [styles.button, ThemeStyles[theme], customStyles];
  const onClickHandler = disabled ? undefined : onClick;

  const Tag = ButtonTagMap[tag];
  return (
    <Tag style={style} onPress={onClickHandler} disabled={disabled} accessibilityState={{ disabled: disabled }}>
      {children}
    </Tag>
  );
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1.5,
    minHeight: 48,
  },
  fullWidth: { flex: 1 },
});
