import type { Cell, TangoGrid as Grid } from "@/types/tango";
import { useCallback, useRef } from 'react';

/**
 * Create a useValidate hook which return 1 object 'validate' function which
 * return if the grid validate state
 *
 * The validate should be promise-based and utilize the debounce functionality
 * if frequent validate(...) is called, should cancel the previous execution
 * only return the 
 */

type ValidateCallbackType = (response: { data: Grid; n: number, errors: Record<string, string> }) => void;

const cloneCell = (cell: Cell): Cell => JSON.parse(JSON.stringify(cell));
const clone = (input: Grid): Grid => input.map(row => row.map(cloneCell));

const row_validate = (grid: Grid, errors: Record<string, string>) => {
    const n = grid.length;

    const limit = n/2;
    for (let i = 0; i < n; ++i) {

        let x_count = 0, o_count = 0;
        for (let j = 0; j < n; ++j) {
            const cell = grid[i][j];
            if (cell.type === 'X') ++x_count;
            if (cell.type === 'O') ++o_count;
            
            if (cell.x_state == 'x' && cell.type && grid[i][j+1].type && (cell.type === grid[i][j+1].type)) {
                cell.isInvalid = grid[i][j+1].isInvalid = true;

                errors["3"] = "Use opposite shapes to separate cells with X";
            }
            if (cell.x_state == '=' && cell.type && grid[i][j+1].type && (cell.type !== grid[i][j+1].type)) {
                cell.isInvalid = grid[i][j+1].isInvalid = true;

                errors["4"] = "Use opposite shapes to separate cells with =";
            }
        }
        // Invalidate the entire row
        if (x_count > limit || o_count > limit) {
            for (let j = 0; j < n; ++j) grid[i][j].isInvalid = true;

            errors["2"] = "Each row and column must have the same number of O and X";
        }
    }
}

const col_validate = (grid: Grid, errors: Record<string, string>) => {
    const n = grid.length;

    const limit = n/2;
    for (let j = 0; j < n; ++j) {

        let x_count = 0, o_count = 0;
        for (let i = 0; i < n; ++i) {
            const cell = grid[i][j];
            if (cell.type === 'X') ++x_count;
            if (cell.type === 'O') ++o_count;
            
            if (cell.y_state == 'x' && cell.type && grid[i][j+1].type && (cell.type === grid[i][j+1].type)) {
                cell.isInvalid = grid[i][j+1].isInvalid = true;

                errors["3"] = "Use opposite shapes to separate cells with X";
            }
            if (cell.y_state == '=' && cell.type && grid[i][j+1].type && (cell.type !== grid[i][j+1].type)) {
                cell.isInvalid = grid[i][j+1].isInvalid = true;

                errors["4"] = "Use opposite shapes to separate cells with =";
            }
        }
        // Invalidate the entire row
        if (x_count > limit || o_count > limit) {
            for (let i = 0; i < n; ++i) grid[i][j].isInvalid = true;

            errors["2"] = "Each row and column must have the same number of O and X";
        }
    }
}

export const useValidate = () => {
  const ref = useRef<number | null>(null);

  const validate = useCallback((input: Grid, callback: ValidateCallbackType) => {
    const grid = clone(input);

    const errors = {

    }
    row_validate(grid, errors);
    col_validate(grid, errors);

    callback({
      data: grid,
      n: grid.length,
      errors: errors
    });
  }, []);

  const debounceValidate = useCallback((input: Grid, callback: ValidateCallbackType) => {
    if (ref.current) clearTimeout(ref.current);

    ref.current = setTimeout(() => {
      validate(input, callback);
    }, 1000);
  }, [validate]);

  return debounceValidate;
}