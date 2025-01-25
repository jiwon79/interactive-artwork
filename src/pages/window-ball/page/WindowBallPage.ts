import { Vector2 } from '@/src/core/utils/vector';
import { JElement } from '@core/element';
import { JCanvas, JParagraph } from '@core/primitives';
import { TestViewModel } from './ViewModel';

export class WindowBallPage extends JElement {
  private _canvas: JCanvas | null = null;
  private _viewModel: TestViewModel;

  constructor() {
    super();
    this._viewModel = new TestViewModel();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  createElements() {
    const title = new JParagraph({
      innerText: 'Window Ball',
    });

    this._canvas = new JCanvas({
      width: 500,
      height: 500,
      onMouseMove: (event) => {
        if (this._canvas == null) {
          return;
        }
        const boundary = this._canvas?.getBoundingClientRect();
        this._viewModel.setMousePosition(
          event.clientX - boundary.left,
          event.clientY - boundary.top,
        );
      },
    });

    this.append(title);
    this.append(this._canvas);
    this.drawWithRequestAnimationFrame();
  }

  drawWithRequestAnimationFrame() {
    requestAnimationFrame(() => {
      this.draw();
      this.drawWithRequestAnimationFrame();
    });
  }

  draw() {
    const canvas = this._canvas;
    if (canvas == null) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (ctx == null) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const dots = this._viewModel.canvasDots;
    const edges = this._viewModel.edges;
    for (const edge of edges) {
      const dot1 = dots[edge[0]];
      const dot2 = dots[edge[1]];
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.moveTo(dot1.x, dot1.y);
      ctx.lineTo(dot2.x, dot2.y);
      ctx.stroke();
    }

    // Draw dots on top
    for (const dot of dots) {
      this.drawCircle(ctx, dot);
    }
  }

  drawCircle(ctx: CanvasRenderingContext2D, point: Vector2) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
  }

  attributeChangedCallback() {
    super.attributeChangedCallback();
  }
}

customElements.define('window-ball-page', WindowBallPage);
