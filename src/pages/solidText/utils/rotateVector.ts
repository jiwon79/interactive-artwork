import NumberMatrix from "@utils/numberMatrix";
import Vector from "@utils/vector";
import * as Constant from "./constants";
import { Parameter, Rotate } from "./type";

export function getRotatedRVector(parameter: Parameter, rotate: Rotate): Vector {
  const r: Vector = getRVector(parameter);

  return getRotatedVector(r, rotate);
}

export function getRotatedNormalVector(parameter: Parameter, rotate: Rotate): Vector {
  const normal: Vector = getNormalVector(parameter);

  return getRotatedVector(normal, rotate);
}

/// rotateX : z -> y 로 회전
///
/// rotateY : x -> z 로 회전
export function getRotatedVector(vector: Vector, rotate: Rotate): Vector {
  if (vector.length != 3) {
    throw new Error("length 3 의 vector 만 회전을 할 수 있습니다.");
  }

  const rotateMat: NumberMatrix = NumberMatrix.rotateMatrixByXY(rotate.rotateX, rotate.rotateY);

  return vector.crossProduct(rotateMat);
}

function getRVector(parameter: Parameter): Vector {
  const {theta, phi} = parameter;

  return new Vector([
    Math.cos(phi) * (Constant.minorRadius * Math.cos(theta) + Constant.majorRadius),
    Math.sin(phi) * (Constant.minorRadius * Math.cos(theta) + Constant.majorRadius),
    Constant.minorRadius * Math.sin(theta)
  ]);
}

function getNormalVector(parameter: Parameter): Vector {
  const {theta, phi} = parameter;

  return new Vector([
    Math.cos(theta) * Math.cos(phi),
    Math.cos(theta) * Math.sin(phi),
    Math.sin(theta)
  ]);
}
