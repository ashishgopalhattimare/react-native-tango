import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

type ButtonTheme = "primary" | "secondary" | "tertiary";
type Props = {
  title: string;
  theme?: ButtonTheme;
  fullWidth?: boolean;
  style?: ViewStyle;
}
export const ThemedButton = ({
  title,
  fullWidth,
  theme = "primary",
  style: customStyles
}: Props) => {
    const style = [
        styles.button,
        fullWidth ? styles.fullWidth : undefined,
        styles[theme],
        customStyles
    ];
    return (
        <TouchableOpacity style={style}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100
  },
  text: {
    textAlign: "center",
    fontWeight: "500"
  },
  fullWidth: {
    width: '100%'
  },
  primary: {
    backgroundColor: "blue",
    color: "white"
  },
  secondary: {
    backgroundColor: "gray",
    color: "white"
  },
  tertiary: {
    borderWidth: 1,
    backgroundColor: "white",
    color: "black"
  }
});