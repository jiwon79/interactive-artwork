import { range } from '@/src/core/utils/range';
import { Vector2, Vector3 } from '@/src/core/utils/vector';

const L = 500;
const step = 20;

export class WaveGridViewModel {
  private _dots: Vector3[] = [];
  private _edges: [number, number][] = [];
  private _mouseX = 0;
  private _mouseY = 0;

  get dots() {
    return this._dots;
  }

  get edges() {
    return this._edges;
  }

  get canvasDots() {
    return this._dots.map((dot) => this.projection(dot));
  }

  constructor() {
    for (const j of range(-L / 2, L / 2, step)) {
      for (const i of range(-L, 0, step)) {
        const point = new Vector3([i, j, 0]);
        this._dots.push(point);
      }
    }
    const count = Math.ceil(L / step);
    for (const i of range(0, count)) {
      for (const j of range(0, count - 1, 1)) {
        this._edges.push([i * count + j, i * count + j + 1]);
      }
    }

    for (const i of range(0, count - 1)) {
      for (const j of range(0, count)) {
        this._edges.push([i * count + j, (i + 1) * count + j]);
      }
    }
  }

  public setMousePosition(x: number, y: number) {
    this._mouseX = x;
    this._mouseY = y;

    const unDot = this.unProjection(new Vector2([x, y]));
    this._dots = this._dots.map((dot) => {
      const distanceX = Math.abs(dot.x - unDot.x);
      const distanceY = Math.abs(dot.y - unDot.y);
      const r = 50;
      return distanceX ** 2 + distanceY ** 2 < r ** 2
        ? new Vector3([
            dot.x,
            dot.y,
            -Math.sqrt(r ** 2 - distanceX ** 2 - distanceY ** 2),
          ])
        : new Vector3([dot.x, dot.y, 0]);
    });
  }

  public getMousePosition() {
    return new Vector2([this._mouseX, this._mouseY]);
  }

  private projection(point: Vector3) {
    const x = point.x;
    const y = point.y;
    const z = point.z;
    return new Vector2([-x + y, -x - y + z]);
  }

  private unProjection(point: Vector2) {
    const x = point.x;
    const y = point.y;
    return new Vector3([-(x + y) / 2, (x - y) / 2, 0]);
  }
}
