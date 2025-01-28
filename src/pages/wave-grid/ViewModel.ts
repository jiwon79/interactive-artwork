import { range } from '@/src/core/utils/range';
import { Vector2, Vector3 } from '@/src/core/utils/vector';
import { K } from './service/constants';

export const L = 3000;
const step = 80;
export const R = 200;

export class WaveGridViewModel {
  private _dots: Vector3[] = [];
  private _edges: [number, number][] = [];

  touch: { point: Vector2; time: number } | null = null;
  waves: { point: Vector2; time: number; r: number } | null = null;

  get dots() {
    return this._dots.map((dot) => {
      const zByTouch =
        (() => {
          const touch = this.touch;
          if (touch == null) {
            return null;
          }

          const mousePosition = touch.point;
          const time = touch.time;

          const distanceX = Math.abs(dot.x - mousePosition.x);
          const distanceY = Math.abs(dot.y - mousePosition.y);
          const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

          const r = Math.min((R * (Date.now() - time)) / 1200, R);
          const z =
            distance < r ? r * Math.cos((distance * Math.PI) / 2 / r) : 0;

          return z;
        })() ?? 0;

      const zByWave =
        (() => {
          const wave = this.waves;
          if (wave == null) {
            return null;
          }

          const distanceX = Math.abs(dot.x - wave.point.x);
          const distanceY = Math.abs(dot.y - wave.point.y);
          const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
          const x = distance;
          const r = wave.r;
          const t = Date.now() - wave.time;

          const lambda = r * 4;
          const v = r / (Math.PI * 100);

          const cos = Math.cos(((2 * Math.PI) / lambda) * (x - v * t));
          const damping = Math.E ** (-t / 8000);
          const z =
            (damping * (r * cos)) / (x < r ? 1 : Math.sqrt((x / r) * 2));

          return x < v * t + r ? z : 0;
        })() ?? 0;

      return new Vector3([dot.x, dot.y, zByTouch + zByWave]);
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
