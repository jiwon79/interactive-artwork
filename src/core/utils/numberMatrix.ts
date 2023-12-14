import Matrix from './matrix';

export default class NumberMatrix extends Matrix<number> {
  constructor(elements: number[][]) {
    super(elements);
  }

  public override clear(): void {
    super.clear(-Infinity);
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
      throw new Error(
        `Cannot perform matrix product with incompatible matrices\nthis column : ${this.columns}, other row : ${other.rows}, other column : ${other.columns}`,
      );
    }

    const result = new NumberMatrix(
      Array(this.rows)
        .fill(0)
        .map(() => Array(other.columns).fill(0)),
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

  static getRotateMatrixByXYKey(thetaX: number, thetaY: number): string {
    const flooredThetaX = Math.floor(thetaX * 100) / 100;
    const flooredThetaY = Math.floor(thetaY * 100) / 100;

    return `${flooredThetaX},${flooredThetaY}`;
  }

  static rotateMatrixByXYCache: { [key: string]: NumberMatrix } = {};

  static rotateMatrixByXY(thetaX: number, thetaY: number): NumberMatrix {
    const key = NumberMatrix.getRotateMatrixByXYKey(thetaX, thetaY);
    if (NumberMatrix.rotateMatrixByXYCache[key]) {
      return NumberMatrix.rotateMatrixByXYCache[key];
    }
    const cosThetaX = Math.cos(thetaX);
    const sinThetaX = Math.sin(thetaX);
    const cosThetaY = Math.cos(thetaY);
    const sinThetaY = Math.sin(thetaY);

    const result = new NumberMatrix([
      [cosThetaY, 0, sinThetaY],
      [sinThetaX * sinThetaY, cosThetaX, -sinThetaX * cosThetaY],
      [-cosThetaX * sinThetaY, sinThetaX, cosThetaX * cosThetaY],
    ]);

    NumberMatrix.rotateMatrixByXYCache[key] = result;
    return result;
  }

  static rotateMatrixByX(theta: number): NumberMatrix {
    return new NumberMatrix([
      [1, 0, 0],
      [0, Math.cos(theta), -Math.sin(theta)],
      [0, Math.sin(theta), Math.cos(theta)],
    ]);
  }

  static rotateMatrixByY(theta: number): NumberMatrix {
    return new NumberMatrix([
      [Math.cos(theta), 0, Math.sin(theta)],
      [0, 1, 0],
      [-Math.sin(theta), 0, Math.cos(theta)],
    ]);
  }

  static createAllMinusInf(rows: number, columns: number): NumberMatrix {
    return new NumberMatrix(
      Array(rows)
        .fill(0)
        .map(() => Array(columns).fill(-Infinity)),
    );
  }
}
