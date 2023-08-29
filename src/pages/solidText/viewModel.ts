import * as Constant from "./utils/constants";
import { ColorStyle } from "./utils/type";
import SolidService from "./service/solid/solidService";
import SolidDoughnutService from "./service/solid/solidDoughnutService";
import PixelService from "./service/pixelService";

export default class SolidTextViewModel {
  public size: number;
  private colorStyle: ColorStyle = "gray";
  private readonly solidService: SolidService;
  public pixelService: PixelService;

  constructor(size: number) {
    this.size = size;
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
}

