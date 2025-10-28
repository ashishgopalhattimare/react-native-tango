export type CellNState = "x" | "=";
export type CellType = "" | "X" | "O";
export type Cell = {
  type: CellType;
  editable: boolean;
  x_state?: CellNState;
  y_state?: CellNState;
  isInvalid?: boolean;
};
export type TangoGrid = Cell[][];

export const CellTypeList: CellType[] = ["", "O", "X"];

const staticCell = (
  type: CellType,
  x_state?: CellNState,
  y_state?: CellNState
): Cell => ({
  type: type,
  isInvalid: false,
  editable: false,
  x_state,
  y_state,
});

const editableCell = (
  type: CellType,
  x_state?: CellNState,
  y_state?: CellNState
): Cell => ({
  type: type ?? "",
  isInvalid: false,
  editable: true,
  x_state,
  y_state,
});

export const convert = (grid: string[][]): TangoGrid => {
  return grid.map((row) =>
    row.map((col) => {
      if (col === "") {
        return editableCell("");
      }

      const data = col.split("|") as [CellType, CellNState, CellNState];
      if (data[0]) {
        return staticCell(data[0], data[1], data[2]);
      }
      return editableCell(data[0], data[1], data[2]);
    })
  );
};
