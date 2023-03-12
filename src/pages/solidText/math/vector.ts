import Matrix from "./matrix";

export default class Vector extends Matrix {
  constructor(elements: number[]) {
    super([elements]);
  }

  public dotProduct(other: Vector): number {
    return super.dotProduct(other);
  }

  public crossProduct(other: Matrix): Vector {
    return super.crossProduct(other) as Vector;
  }

  public get length(): number {
    return this.elements[0].length;
  }

  public divide (scalar: number): Vector {
    return new Vector(this.elements[0].map((element) => element / scalar));
  }

  public get magnitude(): number {
    return Math.sqrt(this.dotProduct(this));
  }

  public get unit(): Vector {
    return this.divide(this.magnitude);
  }
}
