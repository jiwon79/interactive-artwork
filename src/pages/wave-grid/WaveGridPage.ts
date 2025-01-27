import { JElement } from '@core/element';
import { JCanvas, JParagraph } from '@core/primitives';
import { L, WaveGridViewModel } from './ViewModel';
import { CanvasService } from './service/CanvasService';
import { Vector2 } from '@/src/core/utils/vector';

import styles from './WaveGridPage.module.scss';

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
    const title = new JParagraph({
      innerText: 'Wave Grid',
    });

    this._canvas = new JCanvas({
      width: L,
      height: L,
      className: styles.canvas,
      onMouseMove: this.onCanvasMouseMove,
      onTouchMove: this.onCanvasTouchMove,
    });
    const context = this._canvas.getContext('2d');
    if (context != null) {
      this._canvasService = new CanvasService(context);
    }

    this.append(title);
    this.append(this._canvas);
    this.draw();
  }

  onCanvasTouchMove = (event: TouchEvent) => {
    const touch = event.touches[0];
    if (touch == null) {
      return;
    }
    this.onMove(new Vector2([touch.clientX, touch.clientY]));
  };

  onCanvasMouseMove = (event: MouseEvent) => {
    this.onMove(new Vector2([event.clientX, event.clientY]));
  };

  onMove = (mousePosition: Vector2) => {
    if (this._canvas == null) {
      return;
    }

    const boundary = this._canvas?.getBoundingClientRect();
    const position = new Vector2([
      ((mousePosition.x - boundary.left) * L) / boundary.width,
      ((mousePosition.y - boundary.top) * L) / boundary.height,
    ]);

    if (this._canvasService != null) {
      const unProjection = this._canvasService.unProjection(position);
      this._viewModel.setMousePosition(unProjection);
    }
  };

  draw() {
    if (this._canvasService == null) {
      return;
    }

    this._canvasService.draw(this._viewModel.dots, this._viewModel.edges);
    requestAnimationFrame(() => {
      this.draw();
    });
  }
}

customElements.define('window-ball-page', WaveGridPage);
