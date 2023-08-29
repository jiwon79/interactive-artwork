import Vector from "@utils/vector";
import NumberMatrix from "@utils/numberMatrix";
import * as Constant from "./utils/constants";
import { ColorStyle, Parameter, PixelData, Rotate } from "./utils/type";
import Matrix from "@utils/matrix";
import SolidService from "./service/solid/solidService";
import SolidDoughnutService from "./service/solid/solidDoughnutService";
import PixelService from "./service/pixelService";

const initPixel: PixelData = {luminance: -Infinity, parameter: {theta: 0, phi: 0}};


export default class SolidTextViewModel {
  static LIGHT = new Vector([0, 0, 1]).unit;
  public size: number;
  private colorStyle: ColorStyle = "gray";
  private lastRotate: Rotate;
  private readonly rotate: Rotate;
  private zMatrix: NumberMatrix;
  private readonly pixelMatrix: Matrix<PixelData>;
  private readonly solidService: SolidService;
  public pixelService: PixelService;

  constructor(size: number) {
    this.size = size;
    this.lastRotate = {rotateX: 0, rotateY: 0};
    this.rotate = {rotateX: 0, rotateY: 0};
    this.pixelMatrix = Matrix.create<PixelData>(size, size, initPixel);
    this.zMatrix = NumberMatrix.createAllMinusInf(size, size);
    this.solidService = new SolidDoughnutService(Constant.majorRadius, Constant.minorRadius);
    this.pixelService = new PixelService(this.solidService, size);
  }

  public setColorStyle(colorStyle: ColorStyle) {
    this.colorStyle = colorStyle;
    console.log(this.colorStyle);
  }

  public getPixelMatrix(): Matrix<PixelData> {
    return this.pixelMatrix;
  }

  public dragRotate(distanceX: number, distanceY: number) {
    const rotateX = this.pixelService.isSolidReverse ? -distanceY / 2000 : distanceY / 2000;
    const rotateY = -distanceX / 2000;
    this.pixelService.addRotate({rotateX, rotateY});
    // if (pixelService.isOverThreshold) {
    //   this.drawDonut();
    // }
  }

  public addRotate(rotate: Rotate) {
    this.rotate.rotateX += rotate.rotateX;
    this.rotate.rotateY += rotate.rotateY;
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
    this.pixelMatrix.clear(initPixel);

    for (let i = 0; i < Constant.THETA_NUM; i++) {
      for (let j = 0; j < Constant.PHI_NUM; j++) {
        const theta = 2 * Math.PI * i / Constant.THETA_NUM;
        const phi = 2 * Math.PI * j / Constant.PHI_NUM;
        const parameter: Parameter = {theta, phi};

        const rVector: Vector = this.solidService.getRotatedRVector(parameter, this.rotate);
        const normalVector = this.solidService.getRotatedNormalVector(parameter, this.rotate);

        const luminance = this.solidService.getLuminance(rVector, normalVector, SolidTextViewModel.LIGHT);
        if (luminance < 0) continue;

        const rCanvasVector = new Vector([
          Math.floor(rVector.x + Constant.MATRIX_SIZE / 2),
          Math.floor(rVector.y + Constant.MATRIX_SIZE / 2),
          rVector.z
        ]);

        if (!this.isUpdateLuminanceMatrix(rCanvasVector)) continue;
        this.zMatrix.setElement(rCanvasVector.x, rCanvasVector.y, rCanvasVector.z);
        this.pixelMatrix.setElement(rCanvasVector.x, rCanvasVector.y, {luminance, parameter})
      }
    }
  }

  isUpdateLuminanceMatrix(rCanvasVector: Vector): boolean {
    const x = rCanvasVector.x;
    const y = rCanvasVector.y;
    const z = rCanvasVector.z;

    return 0 < x && x < this.size
      && 0 < y && y < this.size
      && this.zMatrix.getElement(x, y) <= z;
  }
}

