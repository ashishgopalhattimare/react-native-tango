import { PropsWithChildren } from "react";
import { Pressable, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

type ButtonTheme = "primary" | "secondary" | "tertiary";
type ButtonTag = "Pressable" | "TouchableOpacity";

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
    styles[theme],
    customStyles,
    disabled ? { opacity: 0.4 } : undefined,
  ];

  const Tag = ButtonTagMap[tag];
  return (
    <Tag style={style} onPress={onClick} disabled={disabled} accessibilityState={{ disabled: disabled }}>
      <Text style={styles.text}>{title}</Text>
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
  const style = [styles.button, styles[theme], customStyles];
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
    display: 'flex',
    justifyContent: 'center',
    fontSize: 14,

    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1.5,
    minHeight: 48,
  },
  text: {
    textAlign: "center",
    fontWeight: "500",
  },
  fullWidth: { flex: 1 },
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
