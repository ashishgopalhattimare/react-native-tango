import { FC, PropsWithChildren, useState } from "react";
import { Image, Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { ThemedText } from "./themed-text";

const images = {
  chevron_up: require("@/assets/images/chevron-up.svg"),
  chevron_down: require("@/assets/images/chevron-down.svg"),
};

type Props = {
  title: string;
  style?: StyleProp<ViewStyle>;
};
export const Expando: FC<PropsWithChildren<Props>> = ({ title, children, style }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={style}>
      <View style={[styles.header]}>
        <ThemedText size="type-400" type="title">
          {title}
        </ThemedText>
        <Pressable onPress={() => setExpanded(!expanded)}>
          <Image
            source={expanded ? images.chevron_up : images.chevron_down}
            style={styles.icon}
          />
        </Pressable>
      </View>
      {expanded && <View style={styles.content}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    marginTop: 8,
  },
});
