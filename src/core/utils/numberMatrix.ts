export default class NumberMatrix {
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

  public clear(): void {
    this.elements = this.elements.map((row) => row.map(() => -Infinity));
  }

  public equal(other: NumberMatrix): boolean {
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

  public similar(other: NumberMatrix, epsilon: number): boolean {
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

  public dotProduct(other: NumberMatrix): number {
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

  public crossProduct(other: NumberMatrix): NumberMatrix {
    if (this.columns !== other.rows) {
      throw new Error(`Cannot perform matrix product with incompatible matrices\nthis column : ${this.columns}, other row : ${other.rows}, other column : ${other.columns}`);
    }

    const result = new NumberMatrix(
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

  static rotateMatrixByXY(thetaX: number, thetaY: number): NumberMatrix {
    return new NumberMatrix([
      [Math.cos(thetaY), 0, Math.sin(thetaY)],
      [Math.sin(thetaX) * Math.sin(thetaY), Math.cos(thetaX), -Math.sin(thetaX) * Math.cos(thetaY)],
      [-Math.cos(thetaX) * Math.sin(thetaY), Math.sin(thetaX), Math.cos(thetaX) * Math.cos(thetaY)]
    ])
  }

  static rotateMatrixByX(theta: number): NumberMatrix {
    return new NumberMatrix([
      [1, 0, 0],
      [0, Math.cos(theta), -Math.sin(theta)],
      [0, Math.sin(theta), Math.cos(theta)]
    ]);
  }

  static rotateMatrixByY(theta: number): NumberMatrix {
    return new NumberMatrix([
      [Math.cos(theta), 0, Math.sin(theta)],
      [0, 1, 0],
      [-Math.sin(theta), 0, Math.cos(theta)]
    ]);
  }

  static createByRowAndColumn(rows: number, columns: number): NumberMatrix {
    return new NumberMatrix(
      Array(rows).fill(0).map(() => Array(columns).fill(-Infinity))
    );
  }
}
