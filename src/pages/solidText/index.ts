import * as Constant from './utils/constants';
import SolidTextViewModel from '@pages/solidText/viewModel';
import { RadioWrap } from '@pages/solidText/component/RadioWrap';

import { ColorShaderType } from '@pages/solidText/utils/colorShader';
import './style.scss';
import { JElement } from '@core/element';
import { JParagraph } from '@core/primitives/JParagraph';
import { JCanvas } from '@core/primitives/JCanvas';

let isDragging = false;
let startX = 0;
let startY = 0;
let distanceX = 0;
let distanceY = 0;

interface SolidTextPageState {
  canvasSize: number;
  selectedColorShaderType: ColorShaderType;
}

export class SolidTextPage extends JElement<SolidTextPageState> {
  static viewModel: SolidTextViewModel;

  constructor() {
    super({
      canvasSize: Constant.CANVAS_SIZE,
      selectedColorShaderType: 'grey',
    });
    SolidTextPage.viewModel = new SolidTextViewModel(Constant.MATRIX_SIZE);
  }

  createElements() {
    const title = new JParagraph({
      innerText: 'Drag Donut',
      className: 'title',
    });

    const canvas = new JCanvas({
      id: 'canvas',
      width: Constant.CANVAS_SIZE,
      height: Constant.CANVAS_SIZE,
    });

    const ctx = canvas.getContext('2d')!;
    SolidTextPage.viewModel.setContext(ctx);
    this.drawDonut();

    setInterval(() => {
      SolidTextPage.viewModel.drawDonut(this.state.canvasSize);
    }, 80);
    const radioWrap = new RadioWrap({
      selectedColorShaderType: SolidTextPage.viewModel.colorShaderType,
      onChange: (colorShaderType: ColorShaderType) => {
        SolidTextPage.viewModel.setColorShaderType(colorShaderType);
        this.setState({ selectedColorShaderType: colorShaderType });
      },
    });

    this.append(title);
    this.append(radioWrap);
    this.append(canvas);

    canvas.addEventListener('mousedown', (e: MouseEvent) => {
      this.setVariable(e.clientX, e.clientY);
    });

    canvas.addEventListener('touchstart', (e: TouchEvent) => {
      this.setVariable(e.touches[0].clientX, e.touches[0].clientY);
    });

    canvas.addEventListener('mousemove', (e: MouseEvent) => {
      if (isDragging) {
        distanceX = e.clientX - startX;
        distanceY = e.clientY - startY;
        SolidTextPage.viewModel.dragRotate(distanceX / 2000, distanceY / 2000);

        if (SolidTextPage.viewModel.pixelService.isOverThreshold) {
          this.drawDonut();
        }
      }
    });

    canvas.addEventListener('touchmove', (e: TouchEvent) => {
      if (isDragging) {
        distanceX = e.touches[0].clientX - startX;
        distanceY = e.touches[0].clientY - startY;
        SolidTextPage.viewModel.dragRotate(distanceX / 1000, distanceY / 1000);

        if (SolidTextPage.viewModel.pixelService.isOverThreshold) {
          this.drawDonut();
        }
      }
    });

    canvas.addEventListener('mouseup', () => {
      isDragging = false;
    });

    canvas.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  setVariable(clientX: number, clientY: number) {
    isDragging = true;
    startX = clientX;
    startY = clientY;
  }

  private drawDonut() {
    SolidTextPage.viewModel.drawDonut(this.state.canvasSize);
  }
}

customElements.define('solid-text-page', SolidTextPage);
