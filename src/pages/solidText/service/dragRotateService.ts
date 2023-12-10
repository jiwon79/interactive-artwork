import { Rotate } from '@pages/solidText/utils/type';

const ROTATE_THRESHOLD = 0.01;
const TIME_THRESHOLD = 30;

export class DragRotateService {
  private isDragging: boolean = false;
  private lastClientX: number = 0;
  private lastClientY: number = 0;
  private lastUpdateTime: number = 0;
  private readonly _lastRotate: Rotate;
  private readonly _rotate: Rotate;

  constructor() {
    this._lastRotate = { rotateX: 0, rotateY: 0 };
    this._rotate = { rotateX: 0, rotateY: 0 };
  }

  public get rotate(): Rotate {
    return this._rotate;
  }

  public startDrag(e: MouseEvent | TouchEvent) {
    this.isDragging = true;
    if (e instanceof MouseEvent) {
      this.lastClientX = e.clientX;
      this.lastClientY = e.clientY;
    }
    if (e instanceof TouchEvent) {
      this.lastClientX = e.touches[0].clientX;
      this.lastClientY = e.touches[0].clientY;
    }
  }

  public drag(e: MouseEvent | TouchEvent, callback: () => void) {
    if (!this.isDragging) {
      return;
    }

    let distanceX: number = 0;
    let distanceY: number = 0;

    if (e instanceof MouseEvent) {
      distanceX = (e.clientX - this.lastClientX) / 200;
      distanceY = (e.clientY - this.lastClientY) / 200;
      this.lastClientX = e.clientX;
      this.lastClientY = e.clientY;
    }

    if (e instanceof TouchEvent) {
      distanceX = (e.touches[0].clientX - this.lastClientX) / 1000;
      distanceY = (e.touches[0].clientY - this.lastClientY) / 1000;
      this.lastClientX = e.touches[0].clientX;
      this.lastClientY = e.touches[0].clientY;
    }

    const rotateX = this.isSolidReverse ? -distanceY : distanceY;
    const rotateY = -distanceX;

    this._rotate.rotateX += rotateX;
    this._rotate.rotateY += rotateY;

    if (this.isOverRotateThreshold && this.isOverTimeThreshold) {
      callback();
      this.lastUpdateTime = new Date().getTime();
      this._lastRotate.rotateX = this._rotate.rotateX;
      this._lastRotate.rotateY = this._rotate.rotateY;
    }
  }

  public endDrag() {
    this.isDragging = false;
  }

  public get isSolidReverse(): boolean {
    return Math.abs(Math.floor(this._rotate.rotateY / Math.PI + 0.5) % 2) == 1;
  }

  public get isOverRotateThreshold(): boolean {
    const rotateDiffX = Math.abs(
      this._rotate.rotateX - this._lastRotate.rotateX,
    );
    const rotateDiffY = Math.abs(
      this._rotate.rotateY - this._lastRotate.rotateY,
    );

    return rotateDiffX > ROTATE_THRESHOLD || rotateDiffY > ROTATE_THRESHOLD;
  }

  public get isOverTimeThreshold(): boolean {
    const currentTime = new Date().getTime();

    return currentTime - this.lastUpdateTime > TIME_THRESHOLD;
  }
}
