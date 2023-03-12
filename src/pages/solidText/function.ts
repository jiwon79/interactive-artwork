import Matrix from "./math/matrix";
import Vector from "./math/vector";
import * as Constant from "./constants";

export interface IParameter {
  theta: number;
  phi: number;
}

export interface IRotate {
  rotateX: number;
  rotateY: number;
}

const LIGHT = new Vector([0, 0, 1]).unit;

export function createLuminanceArray(rotate: IRotate): Matrix {
  let zArray = Matrix.createByRowAndColumn(Constant.ROW, Constant.COLUMN);
  let luminanceArray = Matrix.createByRowAndColumn(Constant.ROW, Constant.COLUMN);

  for (let i = 0; i < Constant.THETA_NUM; i++) {
    for (let j = 0; j < Constant.PHI_NUM; j++) {
      const theta = 2 * Math.PI * i / Constant.THETA_NUM;
      const phi = 2 * Math.PI * j / Constant.PHI_NUM;
      const parameter: IParameter = {theta, phi};

      let r = getRotatedRVector(parameter, rotate);
      const normal = getRotatedNormalVector(parameter, rotate);

      var luminance = normal.dotProduct(LIGHT);
      // var luminance = dotProduct(normal, LIGHT);
      var c = r.getElement(0, 2) / (Constant.majorRadius + Constant.minorRadius);
      luminance = Math.floor(1 + 7.9 * luminance + 2.9 * c);
      // console.log(luminance);
      if (luminance < 0) continue;
      // luminance = Math.floor(11*luminance);

      const rCanvas = new Matrix([[
        Math.floor(r.getElement(0, 0) + Constant.ROW / 2),
        Math.floor(r.getElement(0, 1) + Constant.COLUMN / 2),
        r.getElement(0, 2)
      ]]);

      const x = rCanvas.getElement(0, 0);
      const y = rCanvas.getElement(0, 1);
      const z = rCanvas.getElement(0, 2);

      if (0 < x
        && x < Constant.COLUMN
        && 0 < y && y < Constant.ROW
        && zArray.getElement(x, y) <= z
      ) {
        zArray.setElement(x, y, z);
        luminanceArray.setElement(x, y, luminance);
      }
    }
  }

  return luminanceArray
}

export function getRotatedRVector(parameter: IParameter, rotate: IRotate): Vector {
  const r: Vector = getRVector(parameter);

  return getRotatedVector(r, rotate);
}

export function getRotatedNormalVector(parameter: IParameter, rotate: IRotate): Vector {
  const normal: Vector = getNormalVector(parameter);

  return getRotatedVector(normal, rotate);
}

function getRotatedVector(vector: Vector, rotate: IRotate): Vector {
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
