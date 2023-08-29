import * as Constant from "./utils/constants";
import { ColorStyle, Rotate } from "./utils/type";
import SolidService from "./service/solid/solidService";
import SolidDoughnutService from "./service/solid/solidDoughnutService";
import PixelService from "./service/pixelService";

export default class SolidTextViewModel {
  public size: number;
  private colorStyle: ColorStyle = "gray";
  private lastRotate: Rotate;
  private readonly rotate: Rotate;
  private readonly solidService: SolidService;
  public pixelService: PixelService;

  constructor(size: number) {
    this.size = size;
    this.lastRotate = {rotateX: 0, rotateY: 0};
    this.rotate = {rotateX: 0, rotateY: 0};
    this.solidService = new SolidDoughnutService(Constant.majorRadius, Constant.minorRadius);
    this.pixelService = new PixelService(this.solidService, size);
  }

  public setColorStyle(colorStyle: ColorStyle) {
    this.colorStyle = colorStyle;
    console.log(this.colorStyle);
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
}

