import Component, { StateType } from "@src/core/model/component";
import SolidTextViewModel from "./viewModel";
import * as Constant from "./utils/constants";
import "./style.scss";
import Matrix from "@utils/matrix";
import PixelModel from "@pages/solidText/model/pixelModel";

interface SolidTextStateType extends StateType {
  canvasSize: number;
}

function rainbowGradient(x: number): [number, number, number] {
  if (x < 0 || x > 1) {
    throw new Error("Input should be between 0 and 1.");
  }

  const pi = Math.PI;

  // Convert x from [0,1] to [0, 2π]
  const theta = 2 * pi * x;

  // Compute the RGB values
  const r = Math.floor(255 * (Math.sin(theta) * 0.5 + 0.5));
  const g = Math.floor(255 * (Math.sin(theta + 2 * pi / 3) * 0.5 + 0.5));
  const b = Math.floor(255 * (Math.sin(theta + 4 * pi / 3) * 0.5 + 0.5));

  return [r, g, b];
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
      <main>
        <p>Drag Dhonut</p>
        <div>
            <label for="color-gray">Gray</label>
            <input type="radio" id="color-gray" name="mode" value="solid" checked>
        </div>
        <div>
            <label for="color-rainbow-1">Rainbow-1</label>
            <input type="radio" id="color-rainbow-1" name="mode" value="solid">
        </div>
        <div>
            <label for="color-rainbow-2">Rainbow-2</label>
            <input type="radio" id="color-rainbow-2" name="mode" value="solid">
        </div>
        <div>
            <label for="color-change-rainbow">Change Rainbow</label>
            <input type="radio" id="color-change-rainbow" name="mode" value="solid">
        </div>
        <canvas
            id="canvas"
            width="${this.state.canvasSize}"
            height="${this.state.canvasSize}"
          />
      </main>
    `;
  }

  setVariable(clientX: number, clientY: number) {
    isDragging = true;
    startX = clientX;
    startY = clientY;
    isSolidReverse = solidTextViewModel.isSolidReverse;
  }

  setEvent() {
    this.addEvent("click", "#color-gray", () => {
      solidTextViewModel.setColorStyle('gray');
      this.drawDonut();
    });

    this.addEvent("click", "#color-rainbow-1", () => {
      solidTextViewModel.setColorStyle('rainbow-1');
      this.drawDonut();
    });

    this.addEvent("click", "#color-rainbow-2", () => {
      solidTextViewModel.setColorStyle('rainbow-2');
      this.drawDonut();
    });

    this.addEvent("click", "#color-change-rainbow", () => {
      solidTextViewModel.setColorStyle('change-rainbow');
      this.drawDonut();
    });

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
        solidTextViewModel.dragRotate(distanceX, distanceY);

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
    solidTextViewModel.pixelService.updatePixelMatrix();
    const pixelModelMatrix = solidTextViewModel.pixelService.pixelMatrix;
    const luminanceMatrix = solidTextViewModel.pixelService.luminanceMatrix;

    this.drawByLuminanceArray(ctx, pixelModelMatrix, luminanceMatrix);
  }

  drawByLuminanceArray(ctx: CanvasRenderingContext2D, pixelModelMatrix: Matrix<PixelModel>, luminanceMatrix: Matrix<number>) {
    const cellSize: number = Math.floor(this.state.canvasSize / Constant.MATRIX_SIZE);
    ctx.font = `bold ${cellSize * 1.2}px serif`;
    ctx.clearRect(0, 0, this.state.canvasSize, this.state.canvasSize)

    for (let i = 0; i < pixelModelMatrix.rows; i++) {
      for (let j = 0; j < pixelModelMatrix.columns; j++) {
        const pixel = pixelModelMatrix.getElement(i, j);
        const luminance = luminanceMatrix.getElement(i, j);
        if (luminance >= 0 && luminance < Constant.CHAR.length) {
          const [r, g, b] = rainbowGradient(pixel.parameter.theta / (2 * Math.PI));
          // ctx.fillStyle = `rgb(${color1}, ${color2}, ${color3})`;
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.fillText(Constant.CHAR[luminance], i * cellSize, j * cellSize);
        }
      }
    }
  }
}

export default SolidTextPage;
