import {
  Image,
  StyleSheet,
  ThemedButtonGraphic,
  ThemedView,
} from "@/components/react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Images } from "@/utils/images";

import { useLayoutEffect, useState } from "react";
import { type ImageSourcePropType } from "react-native";

import type { Cell as CellData, CellNState, CellType } from "@/types/tango";
import { CellTypeList as Cycle } from "@/types/tango";

const images: Record<CellType, ImageSourcePropType | undefined> = {
  O: Images.SUN,
  X: Images.CLOUD,
  "": undefined,
};

type Props = {
  onChange?: (data: CellData, key: CellType) => void;
  data: CellData;
};

const StateIcon = ({ id }: { id: CellNState }) => (
  <IconSymbol name={id === "=" ? "equal" : "xmark"} size={14} color="black" />
);

const CellConditionState = ({
  x_state,
  y_state,
}: Pick<CellData, "x_state" | "y_state">) => {
  return (
    <>
      {x_state && (
        <ThemedView style={[conditions.x_overlay, conditions.state]}>
          <StateIcon id={x_state} />
        </ThemedView>
      )}
      {y_state && (
        <ThemedView style={[conditions.y_overlay, conditions.state]}>
          <StateIcon id={y_state} />
        </ThemedView>
      )}
    </>
  );
};

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
    <ThemedView style={styles.cellLayout}>
      <ThemedButtonGraphic
        tag="Pressable"
        style={[
          styles.cellLayout,
          styles.cell,
          data.isInvalid ? styles.error_cell : null,
        ]}
        theme={data.editable ? "tertiary" : "secondary"}
        disabled={!data.editable}
        onClick={onClickHandler}
      >
        <Image source={image} style={styles.img} resizeMode="contain" />
      </ThemedButtonGraphic>

      <CellConditionState x_state={data.x_state} y_state={data.y_state} />
    </ThemedView>
  );
};

const SIZE = 18;

const styles = StyleSheet.create({
  cellLayout: {
    flex: 1,
  },
  cell: {
    borderWidth: 1,
    borderRadius: 8,
    margin: 1,
    paddingBlock: 8,
    paddingInline: 8,
  },
  error_cell: {
    borderColor: "red",
  },
  img: {
    width: "100%",
    height: "100%"
  },
});

const conditions = StyleSheet.create({
  state: {
    backgroundColor: "white",
    borderWidth: 1,
    width: SIZE,
    height: SIZE,

    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  x_overlay: {
    position: "absolute",
    top: "50%",
    left: -(SIZE / 2),
    transform: [{ translateY: "-50%" }],
  },
  y_overlay: {
    position: "absolute",
    left: "50%",
    top: -(SIZE / 2),
    transform: [{ translateX: "-50%" }],
  },
});
