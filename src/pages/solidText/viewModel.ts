import * as Constant from './utils/constants';
import { colorShaderMap, type ColorShaderType } from './utils/colorShader';
import {
  DragRotateService,
  PixelService,
  SolidDoughnutService,
  SolidService,
} from './service';

export default class SolidTextViewModel {
  public matrixSize: number;
  private canvasSize: number;
  private ctx: CanvasRenderingContext2D | null = null;
  private _colorShaderType: ColorShaderType = 'grey';
  private readonly solidService: SolidService;
  private dragRotateService: DragRotateService;
  public pixelService: PixelService;

  constructor(matrixSize: number) {
    this.matrixSize = matrixSize;
    this.canvasSize = 0;
    this.dragRotateService = new DragRotateService();
    this.solidService = new SolidDoughnutService(
      Constant.majorRadius,
      Constant.minorRadius,
    );
    this.pixelService = new PixelService(this.solidService, matrixSize);
  }

  // setter from ui property
  public setContext(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  public setColorShaderType(colorShaderType: ColorShaderType) {
    this._colorShaderType = colorShaderType;
  }

  public setCanvasSize(size: number) {
    this.canvasSize = size;
  }

  // drag event
  public startDrag(e: MouseEvent | TouchEvent) {
    this.dragRotateService.startDrag(e);
  }

  public drag(e: MouseEvent | TouchEvent) {
    this.dragRotateService.drag(e, () => {
      requestAnimationFrame(() => this.updateDonut());
    });
  }

  public endDrag() {
    this.dragRotateService.endDrag();
  }

  // update
  private get colorShader() {
    return colorShaderMap[this._colorShaderType];
  }

  public updateDonut() {
    this.pixelService.updatePixelMatrix(this.dragRotateService.rotate);
    this.drawCurrentDonut();
  }

  // add named parameter 'forceDraw' to drawCurrentDonut
  public drawCurrentDonut(forceDraw: boolean = false) {
    if (!forceDraw && !this.dragRotateService.isOverTimeThreshold) {
      return;
    }
    const pixelModelMatrix = this.pixelService.pixelMatrix;
    const luminanceMatrix = this.pixelService.luminanceMatrix;

    const cellSize: number = Math.floor(this.canvasSize / this.matrixSize);
    if (!this.ctx) {
      return;
    }
    this.ctx.font = `bold ${cellSize * 1.3}px serif`;
    this.ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);

    for (let i = 0; i < pixelModelMatrix.rows; i++) {
      for (let j = 0; j < pixelModelMatrix.columns; j++) {
        const pixel = pixelModelMatrix.getElement(i, j);
        const luminance = luminanceMatrix.getElement(i, j);
        if (luminance >= 0 && luminance < Constant.CHAR.length) {
          const [r, g, b] = this.colorShader.getColor(
            pixel.parameter,
            luminance,
            Date.now(),
          );
          this.ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          this.ctx.fillText(
            Constant.CHAR[luminance],
            i * cellSize,
            j * cellSize,
          );
        }
      }
    }
  }
}
