import { PropsWithChildren } from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

type ButtonTheme = "primary" | "secondary" | "tertiary";
type Props = {
  title: string;
  theme?: ButtonTheme;
  fullWidth?: boolean;
  style?: ViewStyle;
  disabled?: boolean;
  onClick?: () => void;
};
export const ThemedButton = ({
  title,
  fullWidth,
  theme = "tertiary",
  style: customStyles,
  onClick,
}: Props) => {
  const style = [
    styles.button,
    fullWidth ? styles.fullWidth : undefined,
    styles[theme],
    customStyles,
  ];
  return (
    <TouchableOpacity style={style} onPress={onClick}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export const ThemedButtonGraphic = ({
  onClick,
  style: customStyles,
  theme = "tertiary",
  disabled,
  children,
}: PropsWithChildren<Omit<Props, "title" | "fullWidth">>) => {
  const style = [styles.button, styles[theme], customStyles];
  const onClickHandler = disabled ? undefined : onClick;
  return (
    <TouchableOpacity style={style} onPress={onClickHandler}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: "transparent",
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
