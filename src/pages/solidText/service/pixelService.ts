import SolidService from './solid/solidService';
import Matrix from '@utils/matrix';
import PixelModel, { emptyPixelModel } from '../model/pixelModel';
import { Parameter, Rotate } from '@pages/solidText/utils/type';
import * as Constant from '@pages/solidText/utils/constants';
import Vector from '@utils/vector';

class PixelService {
  static LIGHT = new Vector([0, 0, 1]).unit;

  private lastRotate: Rotate;
  private readonly size: number;
  private readonly rotate: Rotate;
  private readonly solidService: SolidService;
  public readonly pixelMatrix: Matrix<PixelModel>;
  public readonly luminanceMatrix: Matrix<number>;

  constructor(solidService: SolidService, size: number) {
    this.lastRotate = { rotateX: 0, rotateY: 0 };
    this.rotate = { rotateX: 0, rotateY: 0 };
    this.size = size;
    this.solidService = solidService;
    this.pixelMatrix = Matrix.create<PixelModel>(size, size, emptyPixelModel);
    this.luminanceMatrix = Matrix.create<number>(size, size, -Infinity);
  }

  public addRotate(rotate: Rotate) {
    this.rotate.rotateX += rotate.rotateX;
    this.rotate.rotateY += rotate.rotateY;
  }

  public get isSolidReverse(): boolean {
    return Math.abs(Math.floor(this.rotate.rotateY / Math.PI + 0.5) % 2) == 1;
  }

  public get isOverThreshold(): boolean {
    return (
      Math.abs(this.rotate.rotateX - this.lastRotate.rotateX) >
        Constant.THETA_THRESHOLD ||
      Math.abs(this.rotate.rotateY - this.lastRotate.rotateY) >
        Constant.THETA_THRESHOLD
    );
  }

  public updatePixelMatrix() {
    this.lastRotate.rotateX = this.rotate.rotateX;
    this.lastRotate.rotateY = this.rotate.rotateY;
    this.pixelMatrix.clear(emptyPixelModel);
    this.luminanceMatrix.clear(-Infinity);

    for (let i = 0; i < Constant.THETA_NUM; i++) {
      for (let j = 0; j < Constant.PHI_NUM; j++) {
        const theta = (2 * Math.PI * i) / Constant.THETA_NUM;
        const phi = (2 * Math.PI * j) / Constant.PHI_NUM;
        const parameter: Parameter = { theta, phi };

        const r: Vector = this.solidService.getRotatedRVector(
          parameter,
          this.rotate,
        );
        const normal = this.solidService.getRotatedNormalVector(
          parameter,
          this.rotate,
        );

        const luminance = this.solidService.getLuminance(
          r,
          normal,
          PixelService.LIGHT,
        );
        if (luminance < 0) continue;

        const rCanvasVector = new Vector([
          Math.floor(r.x + Constant.MATRIX_SIZE / 2),
          Math.floor(r.y + Constant.MATRIX_SIZE / 2),
          r.z,
        ]);

        if (!this.isUpdatePixelMatrix(rCanvasVector)) continue;
        this.pixelMatrix.setElement(rCanvasVector.x, rCanvasVector.y, {
          parameter,
          r: rCanvasVector,
          normal,
        });
        this.luminanceMatrix.setElement(
          rCanvasVector.x,
          rCanvasVector.y,
          luminance,
        );
      }
    }
  }

  private isUpdatePixelMatrix(rCanvasVector: Vector): boolean {
    const x = rCanvasVector.x;
    const y = rCanvasVector.y;
    const z = rCanvasVector.z;

    if (x <= 0 || this.size <= x) return false;
    if (y <= 0 || this.size <= y) return false;
    return this.pixelMatrix.getElement(x, y).r.z <= z;
  }
}

export default PixelService;
