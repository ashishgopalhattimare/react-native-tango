import { GridLayout } from "@/components/react-native";
import { useMemo } from "react";

import { Cell, CellType, TangoGrid as TangoGridType } from "@/types/tango";
import { TangoCell } from "./tango-cell";

type Props = {
  data: TangoGridType;
  onChange?: () => void;
};
export const TangoGrid = ({ data, onChange }: Props) => {
  const gridList = useMemo(() => data.flat(), [data]);

  const onChangeHandler = (cell: Cell, type: CellType) => {
    cell.type = type;
    onChange?.();
  };

  return (
    <GridLayout
      items={gridList}
      rows={6}
      cols={6}
      keyIdentifier={(item, index) => `${index}-${item.type}`}
      renderItem={(item, index) => (
        <TangoCell data={item} key={index} onChange={onChangeHandler} />
      )}
    />
  );
};
