import { JElement } from '@core/element';
import { JCanvas, JDiv, JInput, JLabel, JParagraph } from '@core/primitives';
import { L, WaveGridViewModel } from './ViewModel';
import { CanvasService } from './service/CanvasService';
import { Vector2 } from '@/src/core/utils/vector';

import styles from './WaveGridPage.module.scss';
import { parseNumber } from '@/src/core/utils/parseNumber';

export class WaveGridPage extends JElement {
  private _canvas: JCanvas | null = null;
  private _viewModel: WaveGridViewModel;
  private _canvasService: CanvasService | null = null;

  constructor() {
    super();
    this._viewModel = new WaveGridViewModel();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  createElements() {
    this._canvas = new JCanvas({
      width: L,
      height: L,
      className: styles.canvas,
      onTouchMove: this.onTouchMove,
      onTouchStart: this.onTouchStart,
      onTouchEnd: this.onTouchEnd,
      onMouseDown: this.onMouseDown,
      onMouseMove: this.onMouseMove,
      onMouseUp: this.onMouseUp,
    });
    const context = this._canvas.getContext('2d');
    if (context != null) {
      this._canvasService = new CanvasService(context);
    }

    this.append(
      new JDiv({
        children: [
          new JParagraph({
            innerText: 'Wave Grid',
            className: styles.title,
          }),
          new JParagraph({
            innerText: 'mouse down and up with drag',
            className: styles.description,
          }),
          new JDiv({
            className: styles.input_container,
            children: [
              new JLabel({
                innerText: 'interval',
              }),
              new JInput({
                type: 'range',
                min: '40',
                max: '150',
                value: '60',
                onInput: this.onRangeInput,
              }),
            ],
          }),
          this._canvas,
        ],
      }),
    );

    this.draw();
  }

  onRangeInput = (event: Event) => {
    const value = parseNumber((event.target as HTMLInputElement).value);
    if (value == null) {
      return;
    }
    this._viewModel.setStep(value);
  };

  onTouchStart = (event: TouchEvent) => {
    event.preventDefault();
    const touch = event.touches[0];
    if (touch == null) {
      return;
    }
    this.onMoveStart(new Vector2([touch.clientX, touch.clientY]));
  };

  onTouchMove = (event: TouchEvent) => {
    const touch = event.touches[0];
    if (touch == null) {
      return;
    }
    this.onMove(new Vector2([touch.clientX, touch.clientY]));
  };

  onTouchEnd = () => {
    this.onMoveEnd();
  };

  onMouseDown = (event: MouseEvent) => {
    this.onMoveStart(new Vector2([event.clientX, event.clientY]));
  };

  onMouseUp = () => {
    this.onMoveEnd();
  };

  onMouseMove = (event: MouseEvent) => {
    this.onMove(new Vector2([event.clientX, event.clientY]));
  };

  onMoveStart = (mousePosition: Vector2) => {
    if (this._canvasService == null) {
      return;
    }
    const unProjection = this.unprojection(mousePosition);
    if (unProjection == null) {
      return;
    }
    this._viewModel.touch = { point: unProjection, time: Date.now() };
  };

  onMoveEnd = () => {
    const touch = this._viewModel.touch;
    if (touch == null) {
      return;
    }
    const now = Date.now();
    this._viewModel.waves = this._viewModel.waves.filter(
      (wave) => now - wave.time < 30 * 1000,
    );
    this._viewModel.waves.push({
      point: touch.point,
      time: now,
      r: this._viewModel.getTouchRadius(touch.time),
    });
    this._viewModel.touch = null;
  };

  onMove = (mousePosition: Vector2) => {
    const unProjection = this.unprojection(mousePosition);
    if (unProjection == null) {
      return;
    }

    if (this._viewModel.touch != null) {
      this._viewModel.touch.point = unProjection;
    }
  };

  draw() {
    if (this._canvasService == null) {
      return;
    }

    this._canvasService.draw(
      this._viewModel.dots,
      this._viewModel.edges,
      this._viewModel.step,
    );
    requestAnimationFrame(() => {
      this.draw();
    });
  }

  unprojection(point: Vector2): Vector2 | null {
    const boundary = this._canvas?.getBoundingClientRect();
    if (boundary == null) {
      return null;
    }

    const position = new Vector2([
      ((point.x - boundary.left) * L) / boundary.width,
      ((point.y - boundary.top) * L) / boundary.height,
    ]);

    return this._canvasService?.unProjection(position) ?? null;
  }

  clear = () => {};
}

customElements.define('window-ball-page', WaveGridPage);
