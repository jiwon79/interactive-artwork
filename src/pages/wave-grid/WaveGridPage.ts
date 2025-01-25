import { JElement } from '@core/element';
import { JCanvas, JParagraph } from '@core/primitives';
import { WaveGridViewModel } from './ViewModel';
import { CanvasService } from './service/CanvasService';
import { Vector2 } from '@/src/core/utils/vector';

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
      width: 500,
      height: 500,
      onMouseMove: this.onCanvasMouseMove,
    });
    const context = this._canvas.getContext('2d');
    if (context != null) {
      this._canvasService = new CanvasService(context);
    }

    this.append(title);
    this.append(this._canvas);
    this.draw();
  }

  onCanvasMouseMove = (event: MouseEvent) => {
    if (this._canvas == null) {
      return;
    }

    const boundary = this._canvas?.getBoundingClientRect();
    const position = new Vector2([
      event.clientX - boundary.left,
      event.clientY - boundary.top,
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
