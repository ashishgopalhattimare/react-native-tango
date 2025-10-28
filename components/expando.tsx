import { FC, PropsWithChildren, useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { ThemedText } from "./themed-text";
import { IconSymbol } from "./ui/icon-symbol";

// const Icon = ({ id, styles }: { id: string }) => {
//   return (
//     <IconSymbol color={"white"} name="chevron.right" style={styles} />
//   )
// }

type Props = {
  title: string;
  style?: StyleProp<ViewStyle>;
};
export const Expando: FC<PropsWithChildren<Props>> = ({
  title,
  children,
  style,
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={style}>
      <Pressable style={[styles.header]} onPress={() => setExpanded(!expanded)}>
        <ThemedText size="type-400" type="title">
          {title}
        </ThemedText>
        <IconSymbol
          color="black"
          size={14}
          name={expanded ? "chevron.up" : "chevron.down"}
        />
      </Pressable>
      {expanded && <View style={styles.content}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    marginTop: 8,
  },
});
