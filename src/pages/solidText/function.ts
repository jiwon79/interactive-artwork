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

export function getRVector(parameter: IParameter, rotate: IRotate): Vector {
  const r: Vector = new Vector([
    Math.cos(parameter.phi) * (Constant.minorRadius * Math.cos(parameter.theta) + Constant.majorRadius),
    Math.sin(parameter.phi) * (Constant.minorRadius * Math.cos(parameter.theta) + Constant.majorRadius),
    Constant.minorRadius * Math.sin(parameter.theta)
  ]);

  const rotateMatX: Matrix = rotateMatrixByX(rotate.rotateX);
  const rotateMatZ: Matrix = rotateMatrixByY(rotate.rotateY);

  return r.crossProduct(rotateMatX).crossProduct(rotateMatZ);
}

export function getNormalVector(parameter: IParameter, rotate: IRotate): Vector {
  const normal: Vector = new Vector([
    Math.cos(parameter.theta) * Math.cos(parameter.phi),
    Math.cos(parameter.theta) * Math.sin(parameter.phi),
    Math.sin(parameter.theta)
  ]);

  const rotateMatX: Matrix = rotateMatrixByX(rotate.rotateX);
  const rotateMatZ: Matrix = rotateMatrixByY(rotate.rotateY);

  return normal.crossProduct(rotateMatX).crossProduct(rotateMatZ);
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
