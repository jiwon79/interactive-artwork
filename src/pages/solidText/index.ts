import Component, {StateType} from "@model/component";
import SolidTextViewModel from "./viewModel";
import Matrix from "./math/matrix";
import * as Constant from "./constants";
import "./style.scss";

interface SolidTextStateType extends StateType {
  canvasSize: number;
}

const solidTextViewModel = new SolidTextViewModel(Constant.MATRIX_SIZE);
let ctx: CanvasRenderingContext2D;
let isDragging = false;
let startX = 0;
let startY = 0;
let isRotateReverse = false;
let distanceX = 0;
let distanceY = 0;

class SolidTextPage extends Component<SolidTextStateType> {
  setUp() {
    this.state = {
      canvasSize: Constant.CANVAS_SIZE
    };
  }

  template(): string {
    return `
      <div>
        <canvas
            id="canvas"
            width="${this.state.canvasSize}"
            height="${this.state.canvasSize}"
          />
      </div>
    `;
  }

  setEvent() {
    this.addEvent("mousedown", "#canvas", (e: MouseEvent) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      const rotate = solidTextViewModel.getRotate();
      isRotateReverse = Math.abs( Math.floor(rotate.rotateY / Math.PI + 0.5) % 2) == 1
    });

    this.addEvent("touchstart", "#canvas", (e: TouchEvent) => {
      isDragging = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    this.addEvent("mousemove", "#canvas", (e: MouseEvent) => {
      if (isDragging) {
        distanceX = e.clientX - startX;
        distanceY = e.clientY - startY;
        const rotateX = isRotateReverse ? -distanceY / 2000 : distanceY / 2000;
        const rotateY = -distanceX / 2000;
        solidTextViewModel.addRotate({rotateX, rotateY});
        if (solidTextViewModel.isOverThreshold) {
          this.drawDonut();
        }
      }
    });

    this.addEvent("touchmove", "#canvas", (e: TouchEvent) => {
      if (isDragging) {
        // calculate the distance dragged along the X and Y axes
        distanceX = e.touches[0].clientY - startY;
        distanceY = e.touches[0].clientX - startX;
        console.log(`Distance dragged: ${distanceX}px horizontally, ${distanceY}px vertically`);
      }
    });

    this.addEvent("mouseup", "#canvas", () => {
      isDragging = false;
    });

    this.addEvent("touchend", "#canvas", () => {
      isDragging = false;
    });
  }

  didMount() {
    const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
    ctx = canvas.getContext('2d')!;
    this.drawDonut();
  }

  drawDonut() {
    solidTextViewModel.updateLuminanceMatrix();
    const luminanceMatrix = solidTextViewModel.getLuminanceMatrix();

    this.drawByLuminanceArray(ctx, luminanceMatrix);
  }

  drawByLuminanceArray(ctx: CanvasRenderingContext2D, luminanceMatrix: Matrix) {
    const fontSize: number = Math.floor(this.state.canvasSize / Constant.MATRIX_SIZE);
    ctx.font = `${fontSize}px serif`;
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, this.state.canvasSize, this.state.canvasSize)

    for (let i = 0; i < luminanceMatrix.rows; i++) {
      for (let j = 0; j < luminanceMatrix.columns; j++) {
        const luminance = luminanceMatrix.getElement(i, j);
        if (luminance >= 0 && luminance < Constant.CHAR.length) {
          ctx.fillText(Constant.CHAR[luminance], i * fontSize, j * fontSize);
        }
      }
    }
  }
}

export default SolidTextPage;
