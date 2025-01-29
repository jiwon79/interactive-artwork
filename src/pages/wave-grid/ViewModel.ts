import { range } from '@/src/core/utils/range';
import { Vector2, Vector3 } from '@/src/core/utils/vector';
import { K } from './service/constants';

export const L = 3000;
export const STEP = 60;
export const R = 400;

export class WaveGridViewModel {
  private _step: number = 60;
  private _dots: Vector3[] = [];
  private _edges: [number, number][] = [];

  touch: { point: Vector2; time: number } | null = null;
  waves: { point: Vector2; time: number; r: number }[] = [];

  getTouchRadius(time: number) {
    return Math.min((R * (Date.now() - time)) / 300, R);
  }

  get step() {
    return this._step;
  }

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

          const r = this.getTouchRadius(time);
          const z =
            distance < r ? r * Math.cos((distance * Math.PI) / 2 / r) : 0;

          return z;
        })() ?? 0;

      const zByWaves = this.waves.map((wave) => {
        const distanceX = Math.abs(dot.x - wave.point.x);
        const distanceY = Math.abs(dot.y - wave.point.y);
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
        const x = distance;
        const r = wave.r;
        const t = Date.now() - wave.time;

        const lambda = r * 4;
        const v = r / (Math.PI * 100);

        const cos = Math.cos(((2 * Math.PI) / lambda) * (x - v * t));
        const damping = Math.E ** (-t / 5000);
        const dampingX = 2;
        const z =
          (damping * (r * cos)) /
          (x < r / dampingX ? 1 : Math.sqrt((x / r) * dampingX));

        return x < v * t + r ? z : 0;
      });
      const sumZ = sum(zByWaves);

      return new Vector3([dot.x, dot.y, zByTouch + sumZ]);
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
    this._dots = this.createDots();
    this._edges = this.createEdges();
  }

  setStep(step: number) {
    this._step = step;
    this._dots = this.createDots();
    this._edges = this.createEdges();
  }

  createDots() {
    const dots: Vector3[] = [];
    for (const j of range(this.yStart, this.yEnd, this._step)) {
      for (const i of range(this.xStart, this.xEnd, this._step)) {
        const point = new Vector3([i, j, 0]);
        dots.push(point);
      }
    }

    return dots;
  }

  createEdges() {
    const edges: [number, number][] = [];

    const xCount = Math.ceil((this.xEnd - this.xStart) / this._step);
    const yCount = Math.ceil((this.yEnd - this.yStart) / this._step);
    for (const i of range(0, xCount)) {
      for (const j of range(0, yCount - 1, 1)) {
        edges.push([i * yCount + j, i * yCount + j + 1]);
      }
    }

    for (const i of range(0, xCount - 1)) {
      for (const j of range(0, yCount)) {
        edges.push([i * yCount + j, (i + 1) * yCount + j]);
      }
    }

    return edges;
  }
}

function sum(array: number[]): number {
  let sum = 0;
  for (const item of array) {
    sum += item;
  }

  return sum;
}
