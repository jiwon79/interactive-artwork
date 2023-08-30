import * as Constant from "./utils/constants";
import SolidService from "./service/solid/solidService";
import SolidDoughnutService from "./service/solid/solidDoughnutService";
import PixelService from "./service/pixelService";
import ColorStyleEnum, { ColorStyle } from "@pages/solidText/utils/colorStlye";

export default class SolidTextViewModel {
  public size: number;
  private ctx: CanvasRenderingContext2D;
  private colorStyle: ColorStyle = ColorStyleEnum.GRAY;
  private readonly solidService: SolidService;
  public pixelService: PixelService;

  constructor(ctx: CanvasRenderingContext2D, size: number) {
    this.size = size;
    this.ctx = ctx;
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

  public drawDonut(canvasSize: number) {
    const pixelModelMatrix = this.pixelService.pixelMatrix;
    const luminanceMatrix = this.pixelService.luminanceMatrix;

    const cellSize: number = Math.floor(canvasSize / Constant.MATRIX_SIZE);
    this.ctx.font = `bold ${cellSize * 1.3}px serif`;
    this.ctx.clearRect(0, 0, canvasSize, canvasSize)

    for (let i = 0; i < pixelModelMatrix.rows; i++) {
      for (let j = 0; j < pixelModelMatrix.columns; j++) {
        const pixel = pixelModelMatrix.getElement(i, j);
        const luminance = luminanceMatrix.getElement(i, j);
        if (luminance >= 0 && luminance < Constant.CHAR.length) {
          const [r, g, b] = this.colorStyle.getColor(pixel.parameter)
          this.ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          this.ctx.fillText(Constant.CHAR[luminance], i * cellSize, j * cellSize);
        }
      }
    }
  }
}

