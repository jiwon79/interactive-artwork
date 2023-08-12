import Matrix from "../../core/utils/matrix";
import Vector, { getRotatedNormalVector, getRotatedRVector } from "../../core/utils/vector";
import * as Constant from "./utils/constants";
import { Parameter, Rotate } from "./utils/type";

export default class SolidTextViewModel {
  static LIGHT = new Vector([0, 0, 1]).unit;
  public size: number;
  private lastRotate: Rotate;
  private readonly rotate: Rotate;
  private zMatrix: Matrix;
  private readonly luminanceMatrix: Matrix;

  constructor(size: number) {
    this.size = Constant.MATRIX_SIZE;
    this.lastRotate = {rotateX: 0, rotateY: 0};
    this.rotate = {rotateX: 0, rotateY: 0};
    this.zMatrix = Matrix.createByRowAndColumn(size, size);
    this.luminanceMatrix = Matrix.createByRowAndColumn(size, size);
  }

  public getLuminanceMatrix(): Matrix {
    return this.luminanceMatrix;
  }

  public addRotate(rotate: Rotate) {
    this.rotate.rotateX += rotate.rotateX;
    this.rotate.rotateY += rotate.rotateY;
  }

  public getRotate(): Rotate {
    return this.rotate;
  }

  public get isOverThreshold(): boolean {
    return Math.abs(this.rotate.rotateX - this.lastRotate.rotateX) > Constant.THETA_THRESHOLD ||
      Math.abs(this.rotate.rotateY - this.lastRotate.rotateY) > Constant.THETA_THRESHOLD;
  }

  public get isSolidReverse(): boolean {
    return Math.abs(Math.floor(this.rotate.rotateY / Math.PI + 0.5) % 2) == 1
  }

  public updateLuminanceMatrix() {
    this.lastRotate.rotateX = this.rotate.rotateX;
    this.lastRotate.rotateY = this.rotate.rotateY;
    this.zMatrix.clear();
    this.luminanceMatrix.clear();

    for (let i = 0; i < Constant.THETA_NUM; i++) {
      for (let j = 0; j < Constant.PHI_NUM; j++) {
        const theta = 2 * Math.PI * i / Constant.THETA_NUM;
        const phi = 2 * Math.PI * j / Constant.PHI_NUM;
        const parameter: Parameter = {theta, phi};

        const rVector: Vector = getRotatedRVector(parameter, this.rotate);
        const normalVector = getRotatedNormalVector(parameter, this.rotate);

        const luminance = this.calculateLuminance(rVector, normalVector);
        if (luminance < 0) continue;

        const rCanvasVector = new Vector([
          Math.floor(rVector.x + Constant.MATRIX_SIZE / 2),
          Math.floor(rVector.y + Constant.MATRIX_SIZE / 2),
          rVector.z
        ]);

        if (this.isUpdateLuminanceMatrix(rCanvasVector)) {
          this.zMatrix.setElement(rCanvasVector.x, rCanvasVector.y, rCanvasVector.z);
          this.luminanceMatrix.setElement(rCanvasVector.x, rCanvasVector.y, luminance);
        }
      }
    }
  }

  isUpdateLuminanceMatrix(rCanvasVector: Vector): boolean {
    const x = rCanvasVector.x;
    const y = rCanvasVector.y;
    const z = rCanvasVector.z;

    return 0 < x && x < Constant.MATRIX_SIZE
      && 0 < y && y < Constant.MATRIX_SIZE
      && this.zMatrix.getElement(x, y) <= z;
  }

  calculateLuminance(r: Vector, normal: Vector): number {
    const luminance = normal.dotProduct(SolidTextViewModel.LIGHT);
    const c = r.getElement(0, 2) / (Constant.majorRadius + Constant.minorRadius);

    return Math.floor(1 + 7.9 * luminance + 2.9 * c);
  }
}

