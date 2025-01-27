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
      onTouchMove: this.onTouchMove,
      onMouseDown: this.onMouseDown,
      onMouseMove: this.onMouseMove,
      onMouseUp: this.onMouseUp,
    });
    const context = this._canvas.getContext('2d');
    if (context != null) {
      this._canvasService = new CanvasService(context);
    }

    this.append(title);
    this.append(this._canvas);
    this.draw();
  }

  onTouchMove = (event: TouchEvent) => {
    const touch = event.touches[0];
    if (touch == null) {
      return;
    }
    this.onMove(new Vector2([touch.clientX, touch.clientY]));
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

    this._canvasService.draw(this._viewModel.dots, this._viewModel.edges);
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
}

customElements.define('window-ball-page', WaveGridPage);
