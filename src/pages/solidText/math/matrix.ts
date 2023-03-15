export default class Matrix {
  public rows: number;
  public columns: number;
  public elements: number[][];

  constructor(elements: number[][]) {
    if (elements.some((row) => row.length !== elements[0].length)) {
      throw new Error('Cannot create matrix with inconsistent row length');
    }

    this.rows = elements.length;
    this.columns = elements[0].length;
    this.elements = elements;
  }

  public setElement(row: number, column: number, value: number): void {
    this.elements[row][column] = value;
  }

  public getElement(row: number, column: number): number {
    return this.elements[row][column];
  }

  public equal(other: Matrix): boolean {
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

  public similar(other: Matrix, epsilon: number): boolean {
    if (this.rows !== other.rows || this.columns !== other.columns) {
      return false;
    }

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (Math.abs(this.elements[i][j] - other.elements[i][j]) > epsilon) {
          return false;
        }
      }
    }

    return true;
  }

  public dotProduct(other: Matrix): number {
    if (this.rows !== other.rows || this.columns !== other.columns) {
      throw new Error('row, column 이 같아야 합니다.');
    }

    let sum = 0;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        sum += this.elements[i][j] * other.elements[i][j];
      }
    }

    return sum;
  }

  public crossProduct(other: Matrix): Matrix {
    if (this.columns !== other.rows) {
      throw new Error(`Cannot perform matrix product with incompatible matrices\nthis column : ${this.columns}, other row : ${other.rows}, other column : ${other.columns}`);
    }

    const result = new Matrix(
      Array(this.rows).fill(0).map(() => Array(other.columns).fill(0))
    );

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < other.columns; j++) {
        let sum = 0;
        for (let k = 0; k < this.columns; k++) {
          sum += this.elements[i][k] * other.elements[k][j];
        }
        result.setElement(i, j, sum);
      }
    }

    return result;
  }

  static rotateMatrixByX(theta: number): Matrix {
    return new Matrix([
      [1, 0, 0],
      [0, Math.cos(theta), -Math.sin(theta)],
      [0, Math.sin(theta), Math.cos(theta)]
    ]);
  }

  static rotateMatrixByY(theta: number): Matrix {
    return new Matrix([
      [Math.cos(theta), 0, Math.sin(theta)],
      [0, 1, 0],
      [-Math.sin(theta), 0, Math.cos(theta)]
    ]);
  }

  static createByRowAndColumn(rows: number, columns: number): Matrix {
    return new Matrix(
      Array(rows).fill(0).map(() => Array(columns).fill(-Infinity))
    );
  }
}
