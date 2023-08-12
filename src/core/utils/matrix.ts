class Matrix<T> {
  public elements: T[][];
  public rows: number;
  public columns: number;

  constructor(elements: T[][]) {
    if (elements.some((row) => row.length !== elements[0].length)) {
      throw new Error('Cannot create matrix with inconsistent row length');
    }

    this.elements = elements;
    this.rows = elements.length;
    this.columns = elements[0].length;
  }

  public setElement(row: number, column: number, value: T): void {
    this.elements[row][column] = value;
  }

  public getElement(row: number, column: number): T {
    return this.elements[row][column];
  }

  public clear(value: T): void {
    this.elements = this.elements.map((row) => row.map(() => value));
  }

  public equal(other: Matrix<T>): boolean {
    if (this.rows !== other.rows || this.columns !== other.columns) {
      return false;
    }

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (this.elements[i][j] !== other.elements[i][j]) {
          return false;
        }
      }
    }

    return true;
  }
}

export default Matrix;
