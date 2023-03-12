export type twoDArray = number[][];

//////////////////////////// Matrix Function ///////////////////////////
export function create2DArray(rows: number, columns: number): twoDArray {
  const arr = new Array(rows);
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(columns);
    arr[i].fill(-Infinity);
  }

  return arr;
}

// Create -Infinity 2D array
export function clear2DArray(array: twoDArray) {
  for (let i=0; i<array.length; i++) {
    array[i].fill(-Infinity);
  }
}
