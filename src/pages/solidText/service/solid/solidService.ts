import Vector from '@utils/vector';
import { Parameter, Rotate } from '@pages/solidText/utils/type';
import NumberMatrix from '@utils/numberMatrix';

export abstract class SolidService {
  getRotatedRVector(parameter: Parameter, rotate: Rotate): Vector {
    const r: Vector = this.getRVector(parameter);

    return this.getRotatedVector(r, rotate);
  }

  getRotatedNormalVector(parameter: Parameter, rotate: Rotate): Vector {
    const normal: Vector = this.getNormalVector(parameter);

    return this.getRotatedVector(normal, rotate);
  }

  /// rotateX : z -> y 로 회전
  ///
  /// rotateY : x -> z 로 회전
  getRotatedVector(vector: Vector, rotate: Rotate): Vector {
    if (vector.length != 3) {
      throw new Error('length 3 의 vector 만 회전을 할 수 있습니다.');
    }

    const rotateMat: NumberMatrix = NumberMatrix.rotateMatrixByXY(
      rotate.rotateX,
      rotate.rotateY,
    );

    return vector.crossProduct(rotateMat);
  }

  abstract getRVector(parameter: Parameter): Vector;

  abstract getNormalVector(parameter: Parameter): Vector;

  abstract getLuminance(r: Vector, normal: Vector, light: Vector): number;
}
