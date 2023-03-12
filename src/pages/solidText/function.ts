import Matrix, {rotateMatrixByX, rotateMatrixByY} from "@pages/solidText/math/matrix";
import * as Constant from "@pages/solidText/constants";
import Vector from "@pages/solidText/math/vector";

export type twoDArray = number[][];

export interface IParameter {
  theta: number;
  phi: number;
}

export interface IRotate {
  rotateX: number;
  rotateY: number;
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

function getRotatedVector(vector: Vector, rotate: IRotate): Vector {
  if (vector.length != 3) {
    throw new Error("length 3 의 vector 만 회전을 할 수 있습니다.");
  }

  const rotateMatX: Matrix = rotateMatrixByX(rotate.rotateX);
  const rotateMatZ: Matrix = rotateMatrixByY(rotate.rotateY);

  return vector.crossProduct(rotateMatX).crossProduct(rotateMatZ);
}

export function getRotatedRVector(parameter: IParameter, rotate: IRotate): Vector {
  const r: Vector = getRVector(parameter);

  return getRotatedVector(r, rotate);
}

export function getRotatedNormalVector(parameter: IParameter, rotate: IRotate): Vector {
  const normal: Vector = getNormalVector(parameter);

  return getRotatedVector(normal, rotate);
}

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
