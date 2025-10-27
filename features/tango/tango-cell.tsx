import { Image, StyleSheet, ThemedButtonGraphic } from "@/components/react-native";
import { useLayoutEffect, useState } from "react";
import type { ImageSourcePropType } from "react-native";

import type { Cell as CellData, CellType } from "@/types/tango";

const images: Record<CellType, ImageSourcePropType | undefined> = {
  "O": require("@/assets/tango/sun.svg"),
  "X": require("@/assets/tango/cloud.svg"),
  "": undefined
}

type Props = {
  onChange?: (data: CellData, key: CellType) => void;
  data: CellData;
};

const Cycle: CellType[] = ['', 'O', 'X'];

export const TangoCell = ({ data, onChange }: Props) => {

  const [key, setKey] = useState<CellType>("");

  useLayoutEffect(() => setKey(data.type), [data.type]);

  const onClickHandler = () => {
    const updated_key = Cycle[(Cycle.indexOf(key) + 1) % Cycle.length];
    
    setKey(updated_key);
    onChange?.(data, updated_key);
  };

  const image = images[key];

  return (
    <ThemedButtonGraphic style={styles.cell}  theme={data.editable ? "tertiary" : "secondary"} disabled={!data.editable} onClick={onClickHandler}>
      <Image source={image} style={styles.img} resizeMode="contain" />
    </ThemedButtonGraphic>
  );
};

const styles = StyleSheet.create({
  cell: {
    borderWidth: 2, borderRadius: 8,
    margin: 1,
    flex: 1,
    paddingBlock: 8, paddingInline: 8,
  },
  img: {
    width: "100%",
    height: "100%",
  },
});
