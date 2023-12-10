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
  private _canvas: JCanvas | null = null;

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
    });
    this._canvas = canvas;

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
  }

  connectedCallback() {
    super.connectedCallback();

    if (this._canvas === null) {
      return;
    }

    const ctx = this._canvas.getContext('2d')!;
    SolidTextPage.viewModel.setContext(ctx);

    setInterval(() => {
      SolidTextPage.viewModel.drawDonut();
    }, 80);

    this._canvas.addEventListener('mousedown', (event) =>
      SolidTextPage.viewModel.startDrag(event),
    );
    this._canvas.addEventListener('touchstart', (event) =>
      SolidTextPage.viewModel.startDrag(event),
    );
    this._canvas.addEventListener('mousemove', (event) =>
      SolidTextPage.viewModel.drag(event),
    );
    this._canvas.addEventListener('touchmove', (event) =>
      SolidTextPage.viewModel.drag(event),
    );
    this._canvas.addEventListener('mouseup', () =>
      SolidTextPage.viewModel.endDrag(),
    );
    this._canvas.addEventListener('touchend', () =>
      SolidTextPage.viewModel.endDrag(),
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._canvas?.removeEventListener('mousedown', (event) =>
      SolidTextPage.viewModel.startDrag(event),
    );
    this._canvas?.removeEventListener('touchstart', (event) =>
      SolidTextPage.viewModel.startDrag(event),
    );
    this._canvas?.removeEventListener('mousemove', (event) =>
      SolidTextPage.viewModel.drag(event),
    );
    this._canvas?.removeEventListener('touchmove', (event) =>
      SolidTextPage.viewModel.drag(event),
    );
    this._canvas?.removeEventListener('mouseup', () =>
      SolidTextPage.viewModel.endDrag(),
    );
    this._canvas?.removeEventListener('touchend', () =>
      SolidTextPage.viewModel.endDrag(),
    );
  }
}

customElements.define('solid-text-page', SolidTextPage);
