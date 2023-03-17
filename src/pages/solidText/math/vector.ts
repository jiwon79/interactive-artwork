import Matrix from "./matrix";
import * as Constant from "@pages/solidText/constants";
import {IParameter, IRotate} from "@pages/solidText/viewModel";

export default class Vector extends Matrix {
  constructor(elements: number[]) {
    super([elements]);
  }

  static fromMatrix(matrix: Matrix): Vector {
    if (matrix.rows != 1) {
      throw new Error("row 가 1이 아닌 matrix 를 vector 로 변환할 수 없습니다.");
    }

    return new Vector(matrix.elements[0]);
  }

  public dotProduct(other: Vector): number {
    return super.dotProduct(other);
  }

  public crossProduct(other: Matrix): Vector {
    return Vector.fromMatrix(super.crossProduct(other));
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

  public get x(): number {
    if (this.length != 3) throw new Error("length 가 3이 아닌 vector 에서는 x 값을 가져올 수 없습니다.");
    return this.elements[0][0];
  }

  public get y(): number {
    if (this.length != 3) throw new Error("length 가 3이 아닌 vector 에서는 y 값을 가져올 수 없습니다.");
    return this.elements[0][1];
  }

  public get z(): number {
    if (this.length != 3) throw new Error("length 가 3이 아닌 vector 에서는 z 값을 가져올 수 없습니다.");
    return this.elements[0][2];
  }
}

export function getRotatedRVector(parameter: IParameter, rotate: IRotate): Vector {
  const r: Vector = getRVector(parameter);

  return getRotatedVector(r, rotate);
}

export function getRotatedNormalVector(parameter: IParameter, rotate: IRotate): Vector {
  const normal: Vector = getNormalVector(parameter);

  return getRotatedVector(normal, rotate);
}

/// rotateX : z -> y 로 회전
///
/// rotateY : x -> z 로 회전
export function getRotatedVector(vector: Vector, rotate: IRotate): Vector {
  if (vector.length != 3) {
    throw new Error("length 3 의 vector 만 회전을 할 수 있습니다.");
  }

  const rotateMatXY: Matrix = Matrix.rotateMatrixByXY(rotate.rotateX, rotate.rotateY);

  return vector.crossProduct(rotateMatXY);
}

function getRVector(parameter: IParameter): Vector {
  const {theta, phi} = parameter;

  return new Vector([
    Math.cos(phi) * (Constant.minorRadius * Math.cos(theta) + Constant.majorRadius),
    Math.sin(phi) * (Constant.minorRadius * Math.cos(theta) + Constant.majorRadius),
    Constant.minorRadius * Math.sin(theta)
  ]);
}

function getNormalVector(parameter: IParameter): Vector {
  const {theta, phi} = parameter;

  return new Vector([
    Math.cos(theta) * Math.cos(phi),
    Math.cos(theta) * Math.sin(phi),
    Math.sin(theta)
  ]);
}
