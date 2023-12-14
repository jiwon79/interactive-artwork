import { JElement } from '@core/element';
import { JCanvas, JParagraph } from '@core/primitives';

import SolidTextViewModel from '../viewModel';
import { RadioWrap } from '../component/RadioWrap';
import { ColorShaderType } from '../utils/colorShader';
import * as Constant from '../utils/constants';

import styles from './SolidTextPage.module.scss';

interface SolidTextPageState {
  canvasSize: number;
  selectedColorShaderType: ColorShaderType;
}

export class SolidTextPage extends JElement<SolidTextPageState> {
  static viewModel: SolidTextViewModel;
  private _rafId: number = 0;

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
      className: styles.title,
    });

    const canvas = new JCanvas({
      id: 'canvas',
      width: Constant.CANVAS_SIZE,
      height: Constant.CANVAS_SIZE,
      className: styles.canvas,
      onMouseDown: (event) => SolidTextPage.viewModel.startDrag(event),
      onTouchStart: (event) => SolidTextPage.viewModel.startDrag(event),
      onMouseMove: (event) => SolidTextPage.viewModel.drag(event),
      onTouchMove: (event) => SolidTextPage.viewModel.drag(event),
      onMouseUp: () => SolidTextPage.viewModel.endDrag(),
      onTouchEnd: () => SolidTextPage.viewModel.endDrag(),
    });
    const ctx = canvas.getContext('2d');
    SolidTextPage.viewModel.setContext(ctx!);
    SolidTextPage.viewModel.updateDonut();

    const radioWrap = new RadioWrap({
      selectedColorShaderType: this.state.selectedColorShaderType,
      onChange: (colorShaderType: ColorShaderType) => {
        this.setState({ selectedColorShaderType: colorShaderType });
      },
    });

    this.append(title);
    this.append(radioWrap);
    this.append(canvas);
  }

  attributeChangedCallback() {
    super.attributeChangedCallback();
    SolidTextPage.viewModel.setColorShaderType(
      this.state.selectedColorShaderType,
    );
    SolidTextPage.viewModel.setCanvasSize(this.state.canvasSize);
    SolidTextPage.viewModel.drawCurrentDonut();

    if (this.state.selectedColorShaderType === 'change-rainbow') {
      requestAnimationFrame(this.performAnimation);
    }
  }

  performAnimation = () => {
    if (this.state.selectedColorShaderType !== 'change-rainbow') {
      cancelAnimationFrame(this._rafId);
      return;
    }
    SolidTextPage.viewModel.drawCurrentDonut();

    this._rafId = requestAnimationFrame(this.performAnimation);
  };
}

customElements.define('solid-text-page', SolidTextPage);
