import { JElement, property } from '@core/element';
import { JCanvas, JParagraph } from '@core/primitives';

import SolidTextViewModel from '../viewModel';
import { RadioWrap } from '../component';
import { ColorShaderType } from '../utils/colorShader';
import * as Constant from '../utils/constants';

import styles from './SolidTextPage.module.scss';

export class SolidTextPage extends JElement {
  static viewModel?: SolidTextViewModel;
  private _rafId: number = 0;

  @property()
  private _selectedColorShaderType: ColorShaderType = 'grey';

  constructor() {
    super();
    this.classList.add(styles.page);
    SolidTextPage.viewModel = new SolidTextViewModel(Constant.MATRIX_SIZE);
  }

  connectedCallback() {
    super.connectedCallback();
    SolidTextPage.viewModel?.drawCurrentDonut();
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
      onMouseDown: (event) => SolidTextPage.viewModel?.startDrag(event),
      onTouchStart: (event) => SolidTextPage.viewModel?.startDrag(event),
      onMouseMove: (event) => SolidTextPage.viewModel?.drag(event),
      onTouchMove: (event) => SolidTextPage.viewModel?.drag(event),
      onMouseUp: () => SolidTextPage.viewModel?.endDrag(),
      onTouchEnd: () => SolidTextPage.viewModel?.endDrag(),
    });
    const ctx = canvas.getContext('2d');
    SolidTextPage.viewModel?.setContext(ctx!);
    SolidTextPage.viewModel?.setCanvasSize(Constant.CANVAS_SIZE);
    SolidTextPage.viewModel?.updateDonut();

    const radioWrap = new RadioWrap({
      selectedColorShaderType: this._selectedColorShaderType,
      onChange: (colorShaderType: ColorShaderType) => {
        this._selectedColorShaderType = colorShaderType;
      },
    });

    this.append(title);
    this.append(radioWrap);
    this.append(canvas);
  }

  attributeChangedCallback() {
    super.attributeChangedCallback();
    if (SolidTextPage.viewModel === undefined) {
      return;
    }
    SolidTextPage.viewModel.setColorShaderType(this._selectedColorShaderType);
    SolidTextPage.viewModel.drawCurrentDonut();

    if (this._selectedColorShaderType === 'change-rainbow') {
      requestAnimationFrame(this.performAnimation);
    }
  }

  performAnimation = () => {
    if (this._selectedColorShaderType !== 'change-rainbow') {
      cancelAnimationFrame(this._rafId);
      return;
    }
    SolidTextPage.viewModel?.drawCurrentDonut();
    this._rafId = requestAnimationFrame(this.performAnimation);
  };
}

customElements.define('solid-text-page', SolidTextPage);
