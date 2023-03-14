import Matrix from "./math/matrix";
import Vector, {getRotatedNormalVector, getRotatedRVector} from "./math/vector";
import * as Constant from "./constants";

export interface IParameter {
  theta: number;
  phi: number;
}

export interface IRotate {
  rotateX: number;
  rotateY: number;
}

// class SolidText {
//   public size: number;
//   public zMatrix: Matrix;
//   public luminanceMatrix: Matrix;
//
//   constructor(size: number) {
//     this.size = Constant.MATRIX_SIZE;
//     this.zMatrix = Matrix.createByRowAndColumn(size, size);
//     this.luminanceMatrix = Matrix.createByRowAndColumn(size, size);
//   }
//
//
// }

const LIGHT = new Vector([0, 0, 1]).unit;

export function createLuminanceArray(rotate: IRotate): Matrix {
  let zArray = Matrix.createByRowAndColumn(Constant.MATRIX_SIZE, Constant.MATRIX_SIZE);
  let luminanceArray = Matrix.createByRowAndColumn(Constant.MATRIX_SIZE, Constant.MATRIX_SIZE);

  for (let i = 0; i < Constant.THETA_NUM; i++) {
    for (let j = 0; j < Constant.PHI_NUM; j++) {
      const theta = 2 * Math.PI * i / Constant.THETA_NUM;
      const phi = 2 * Math.PI * j / Constant.PHI_NUM;
      const parameter: IParameter = {theta, phi};

      let r = getRotatedRVector(parameter, rotate);
      const normal = getRotatedNormalVector(parameter, rotate);

      const luminance = calculateLuminance(r, normal);
      if (luminance < 0) continue;

      const rCanvas = new Matrix([[
        Math.floor(r.getElement(0, 0) + Constant.MATRIX_SIZE / 2),
        Math.floor(r.getElement(0, 1) + Constant.MATRIX_SIZE / 2),
        r.getElement(0, 2)
      ]]);

      const x = rCanvas.getElement(0, 0);
      const y = rCanvas.getElement(0, 1);
      const z = rCanvas.getElement(0, 2);

      if (0 < x
        && x < Constant.MATRIX_SIZE
        && 0 < y && y < Constant.MATRIX_SIZE
        && zArray.getElement(x, y) <= z
      ) {
        zArray.setElement(x, y, z);
        luminanceArray.setElement(x, y, luminance);
      }
    }
  }

  return luminanceArray
}

function calculateLuminance(r: Vector, normal: Vector): number {
  let luminance = normal.dotProduct(LIGHT);
  // var luminance = dotProduct(normal, LIGHT);
  let c = r.getElement(0, 2) / (Constant.majorRadius + Constant.minorRadius);

  return Math.floor(1 + 7.9 * luminance + 2.9 * c);
}
