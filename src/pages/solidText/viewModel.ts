import * as Constant from "./utils/constants";
import { ColorStyle } from "./utils/type";
import SolidService from "./service/solid/solidService";
import SolidDoughnutService from "./service/solid/solidDoughnutService";
import PixelService from "./service/pixelService";

function rainbowGradient(x: number): [number, number, number] {
  if (x < 0 || x > 1) {
    throw new Error("Input should be between 0 and 1.");
  }

  const pi = Math.PI;

  // Convert x from [0,1] to [0, 2π]
  const theta = 2 * pi * x;

  // Compute the RGB values
  const r = Math.floor(255 * (Math.sin(theta) * 0.5 + 0.5));
  const g = Math.floor(255 * (Math.sin(theta + 2 * pi / 3) * 0.5 + 0.5));
  const b = Math.floor(255 * (Math.sin(theta + 4 * pi / 3) * 0.5 + 0.5));

  return [r, g, b];
}

export default class SolidTextViewModel {
  public size: number;
  private ctx: CanvasRenderingContext2D;
  private colorStyle: ColorStyle = "gray";
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
    this.ctx.font = `bold ${cellSize * 1.2}px serif`;
    this.ctx.clearRect(0, 0, canvasSize, canvasSize)

    for (let i = 0; i < pixelModelMatrix.rows; i++) {
      for (let j = 0; j < pixelModelMatrix.columns; j++) {
        const pixel = pixelModelMatrix.getElement(i, j);
        const luminance = luminanceMatrix.getElement(i, j);
        if (luminance >= 0 && luminance < Constant.CHAR.length) {
          const [r, g, b] = rainbowGradient(pixel.parameter.theta / (2 * Math.PI));
          // ctx.fillStyle = `rgb(${color1}, ${color2}, ${color3})`;
          this.ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          this.ctx.fillText(Constant.CHAR[luminance], i * cellSize, j * cellSize);
        }
      }
    }
  }
}

