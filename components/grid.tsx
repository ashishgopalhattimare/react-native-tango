import React from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';

type GridLayoutProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyIdentifier: (item: T, index: number) => string;
  rows?: number;   // max rows to render
  cols: number;    // columns per row
  gap?: number;    // spacing between cells and rows
  style?: any;
};

export function GridLayout<T>({
  items,
  renderItem,
  keyIdentifier,
  rows,
  cols,
  gap = 0,
  style,
}: GridLayoutProps<T>) {
  const [containerWidth, setContainerWidth] = React.useState(0);

  const onLayout = (e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
  };

  // Limit items to rows * cols if rows is provided
  const limit = rows ? Math.min(items.length, rows * cols) : items.length;
  const visible = items.slice(0, limit);
  const rowsCount = rows
    ? Math.min(rows, Math.ceil(visible.length / cols) || 1)
    : Math.ceil(visible.length / cols) || 0;

  // Assume outer padding equals "gap" for symmetric gutters.
  const outerPadding = gap;
  const innerGutters = gap * (cols - 1);
  const usableWidth = Math.max(0, containerWidth - outerPadding * 2 - innerGutters);
  const cellSize = cols > 0 ? Math.floor(usableWidth / cols) : 0;

  return (
    <View onLayout={onLayout} style={[styles.grid, { gap, padding: outerPadding }, style]}>
      {Array.from({ length: rowsCount }, (_, r) => {
        const start = r * cols;
        const rowItems = visible.slice(start, start + cols);
        return (
          <View key={r} style={[styles.row, { gap }]}>
            {rowItems.map((item, idx) => (
              <View
                key={keyIdentifier(item, start + idx)}
                style={[
                  styles.cell,
                  { width: cellSize, height: cellSize }, // perfect square from measured width
                ]}
              >
                {renderItem(item, start + idx)}
              </View>
            ))}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'column' },
  row: { flexDirection: 'row', display: 'flex', justifyContent: 'center' },
  cell: {},
});
