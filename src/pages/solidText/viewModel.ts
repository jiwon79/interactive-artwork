import * as Constant from "./utils/constants";
import SolidService from "./service/solid/solidService";
import SolidDoughnutService from "./service/solid/solidDoughnutService";
import PixelService from "./service/pixelService";
import { colorShaderMap, type ColorShaderType } from "@pages/solidText/utils/colorShader";

export default class SolidTextViewModel {
  public size: number;
  private ctx: CanvasRenderingContext2D | null = null;
  private _colorShaderType: ColorShaderType = 'grey';
  private readonly solidService: SolidService;
  public pixelService: PixelService;

  public get colorShaderType() {
    return this._colorShaderType;
  }

  private get colorShader() {
    return colorShaderMap[this._colorShaderType];
  }

  constructor(size: number) {
    this.size = size;
    // this.ctx = ctx;
    this.solidService = new SolidDoughnutService(Constant.majorRadius, Constant.minorRadius);
    this.pixelService = new PixelService(this.solidService, size);
  }

  public setContext(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  public setColorShaderType(colorShaderType: ColorShaderType) {
    this._colorShaderType = colorShaderType;
  }

  public dragRotate(distanceX: number, distanceY: number) {
    const rotateX = this.pixelService.isSolidReverse ? -distanceY : distanceY;
    const rotateY = -distanceX;
    this.pixelService.addRotate({rotateX, rotateY});
  }

  public drawDonut(canvasSize: number) {
    this.pixelService.updatePixelMatrix();
    const pixelModelMatrix = this.pixelService.pixelMatrix;
    const luminanceMatrix = this.pixelService.luminanceMatrix;

    const cellSize: number = Math.floor(canvasSize / Constant.MATRIX_SIZE);
    if (!this.ctx) return;
    this.ctx.font = `bold ${cellSize * 1.3}px serif`;
    this.ctx.clearRect(0, 0, canvasSize, canvasSize)

    for (let i = 0; i < pixelModelMatrix.rows; i++) {
      for (let j = 0; j < pixelModelMatrix.columns; j++) {
        const pixel = pixelModelMatrix.getElement(i, j);
        const luminance = luminanceMatrix.getElement(i, j);
        if (luminance >= 0 && luminance < Constant.CHAR.length) {
          const [r, g, b] = this.colorShader.getColor(pixel.parameter, Date.now())
          this.ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          this.ctx.fillText(Constant.CHAR[luminance], i * cellSize, j * cellSize);
        }
      }
    }
  }
}

