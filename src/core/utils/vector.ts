import NumberMatrix from './numberMatrix';

export default class Vector extends NumberMatrix {
  constructor(elements: number[]) {
    super([elements]);
  }

  static fromMatrix(matrix: NumberMatrix): Vector {
    if (matrix.rows != 1) {
      throw new Error(
        'row 가 1이 아닌 matrix 를 vector 로 변환할 수 없습니다.',
      );
    }

    return new Vector(matrix.elements[0]);
  }

  public dotProduct(other: Vector): number {
    return super.dotProduct(other);
  }

  public crossProduct(other: NumberMatrix): Vector {
    return Vector.fromMatrix(super.crossProduct(other));
  }

  public get length(): number {
    return this.elements[0].length;
  }

  public add(other: Vector): Vector {
    if (this.length != other.length) {
      throw new Error('Vector add는 길이가 같아야 합니다.');
    }

    return new Vector(
      this.elements[0].map(
        (element, index) => element + other.elements[0][index],
      ),
    );
  }

  public minus(other: Vector): Vector {
    if (this.length != other.length)
      throw new Error('Vector minus는 길이가 같아야 합니다.');
    return new Vector(
      this.elements[0].map(
        (element, index) => element - other.elements[0][index],
      ),
    );
  }

  public multiple(scalar: number): Vector {
    return new Vector(this.elements[0].map((element) => element * scalar));
  }

  public divide(scalar: number): Vector {
    return new Vector(this.elements[0].map((element) => element / scalar));
  }

  public get magnitude(): number {
    return Math.sqrt(this.dotProduct(this));
  }

  public get unit(): Vector {
    return this.divide(this.magnitude);
  }

  public get x(): number {
    if (this.length < 1) {
      throw new Error(
        'length 가 1보다 작은 vector 에서는 x 값을 가져올 수 없습니다.',
      );
    }
    return this.elements[0][0];
  }

  public get y(): number {
    if (this.length < 2) {
      throw new Error(
        'length 가 2보다 작은 vector 에서는 y 값을 가져올 수 없습니다.',
      );
    }
    return this.elements[0][1];
  }

  public get z(): number {
    if (this.length < 3) {
      throw new Error(
        'length 가 3보다 작은 vector 에서는 z 값을 가져올 수 없습니다.',
      );
    }
    return this.elements[0][2];
  }
}
