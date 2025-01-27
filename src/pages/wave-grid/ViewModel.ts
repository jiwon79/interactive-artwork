import { range } from '@/src/core/utils/range';
import { Vector2, Vector3 } from '@/src/core/utils/vector';
import { K } from './service/constants';

export const L = 3000;
const step = 100;
const R = 400;

export class WaveGridViewModel {
  private _dots: Vector3[] = [];
  private _edges: [number, number][] = [];

  touch: { point: Vector2; time: number } | null = null;

  get dots() {
    const touch = this.touch;
    if (touch == null) {
      return this._dots;
    }
    const mousePosition = touch.point;
    const time = touch.time;

    return this._dots.map((dot) => {
      const distanceX = Math.abs(dot.x - mousePosition.x);
      const distanceY = Math.abs(dot.y - mousePosition.y);
      const r = Math.min((R * (Date.now() - time)) / 1200, R);

      return distanceX ** 2 + distanceY ** 2 < r ** 2
        ? new Vector3([
            dot.x,
            dot.y,
            Math.sqrt(r ** 2 - distanceX ** 2 - distanceY ** 2),
          ])
        : new Vector3([dot.x, dot.y, 0]);
    });
  }

  get edges() {
    return this._edges;
  }

  xStart = (-L * (K + 1)) / 2 / K;
  xEnd = 0;
  yStart = -L / 2 / K;
  yEnd = L / 2;

  constructor() {
    for (const j of range(this.yStart, this.yEnd, step)) {
      for (const i of range(this.xStart, this.xEnd, step)) {
        const point = new Vector3([i, j, 0]);
        this._dots.push(point);
      }
    }
    const xCount = Math.ceil((this.xEnd - this.xStart) / step);
    const yCount = Math.ceil((this.yEnd - this.yStart) / step);
    for (const i of range(0, xCount)) {
      for (const j of range(0, yCount - 1, 1)) {
        this._edges.push([i * yCount + j, i * yCount + j + 1]);
      }
    }

    for (const i of range(0, xCount - 1)) {
      for (const j of range(0, yCount)) {
        this._edges.push([i * yCount + j, (i + 1) * yCount + j]);
      }
    }
  }
}
