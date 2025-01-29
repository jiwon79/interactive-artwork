import { Vector2, Vector3 } from '@/src/core/utils/vector';
import { K } from './constants';

export class CanvasService {
  private _ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this._ctx = ctx;
  }

  draw(dots: Vector3[], edges: number[][], step: number) {
    this.clearCanvas(this._ctx.canvas.width, this._ctx.canvas.height);
    this.drawEdges(dots, edges);
    this.drawDots(dots, step);
  }

  clearCanvas(width: number, height: number) {
    this._ctx.clearRect(0, 0, width, height);
  }

  drawEdges(dots: Vector3[], edges: number[][], opacity: number = 0.5) {
    this._ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
    this._ctx.lineWidth = 2;
    for (const edge of edges) {
      const dot1 = this.projection(dots[edge[0]]);
      const dot2 = this.projection(dots[edge[1]]);
      this._ctx.beginPath();
      this._ctx.moveTo(dot1.x, dot1.y);
      this._ctx.lineTo(dot2.x, dot2.y);
      this._ctx.stroke();
    }
  }

  drawDots(dots: Vector3[], step: number) {
    this._ctx.fillStyle = `rgba(255, 255, 255, 1)`;
    for (const dot of dots) {
      const point = this.projection(dot);
      const absZ = Math.abs(dot.z);
      const r = step / 12;
      const signZ = Math.sign(dot.z);
      const radius = r * (1 - signZ * Math.min(1, Math.sqrt(absZ) / 50));
      this.drawCircle(point, radius);
    }
  }

  private drawCircle(point: Vector2, radius: number = 8) {
    this._ctx.beginPath();
    this._ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
    this._ctx.fill();
  }

  private projection(point: Vector3) {
    const x = point.x;
    const y = point.y;
    const z = point.z;
    return new Vector2([-x + y, -x * K - y * K + z]);
  }

  public unProjection(point: Vector2) {
    const x = point.x;
    const y = point.y;
    return new Vector3([-x / 2 - y / 2 / K, x / 2 - y / 2 / K, 0]);
  }
}
