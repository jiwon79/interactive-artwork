import Component, { StateType } from "@src/core/model/component";
import SolidTextViewModel from "./viewModel";
import * as Constant from "./utils/constants";
import "./style.scss";
import { PixelData } from "@pages/solidText/utils/type";
import Matrix from "@utils/matrix";

interface SolidTextStateType extends StateType {
  canvasSize: number;
}

const solidTextViewModel = new SolidTextViewModel(Constant.MATRIX_SIZE);
let ctx: CanvasRenderingContext2D;
let isDragging = false;
let startX = 0;
let startY = 0;
let isSolidReverse = false;
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
        <button id="button" >button</button>
        <canvas
            id="canvas"
            width="${this.state.canvasSize}"
            height="${this.state.canvasSize}"
          />
      </div>
    `;
  }

  setVariable(clientX: number, clientY: number) {
    isDragging = true;
    startX = clientX;
    startY = clientY;
    isSolidReverse = solidTextViewModel.isSolidReverse;
  }

  setEvent() {
    // this.addEvent("click", "#button", () => {
    //   console.log("click");
    //   this.setState({canvasSize: 500 + Math.random() * 500});
    // });

    this.addEvent("mousedown", "#canvas", (e: MouseEvent) => {
      this.setVariable(e.clientX, e.clientY);
    });

    this.addEvent("touchstart", "#canvas", (e: TouchEvent) => {
      this.setVariable(e.touches[0].clientX, e.touches[0].clientY);
    });

    this.addEvent("mousemove", "#canvas", (e: MouseEvent) => {
      if (isDragging) {
        distanceX = e.clientX - startX;
        distanceY = e.clientY - startY;
        const rotateX = isSolidReverse ? -distanceY / 2000 : distanceY / 2000;
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
    const pixelMatrix = solidTextViewModel.getPixelMatrix();

    this.drawByLuminanceArray(ctx, pixelMatrix);
  }

  drawByLuminanceArray(ctx: CanvasRenderingContext2D, pixelMatrix: Matrix<PixelData>) {
    const fontSize: number = Math.floor(this.state.canvasSize / Constant.MATRIX_SIZE);
    ctx.font = `${fontSize}px serif`;
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, this.state.canvasSize, this.state.canvasSize)

    for (let i = 0; i < pixelMatrix.rows; i++) {
      for (let j = 0; j < pixelMatrix.columns; j++) {
        const pixel = pixelMatrix.getElement(i, j);
        const luminance = pixel.luminance;
        if (luminance >= 0 && luminance < Constant.CHAR.length) {
          ctx.fillText(Constant.CHAR[luminance], i * fontSize, j * fontSize);
        }
      }
    }
  }
}

export default SolidTextPage;
