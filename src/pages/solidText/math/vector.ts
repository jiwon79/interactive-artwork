import Matrix from "./matrix";
import * as Constant from "@pages/solidText/constants";
import {IParameter, IRotate} from "@pages/solidText/viewModel";

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

  const rotateMatX: Matrix = Matrix.rotateMatrixByX(rotate.rotateX);
  const rotateMatZ: Matrix = Matrix.rotateMatrixByY(rotate.rotateY);

  return vector.crossProduct(rotateMatX).crossProduct(rotateMatZ);
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
