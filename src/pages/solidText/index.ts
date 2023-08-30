import Component, { StateType } from "@src/core/model/component";
import SolidTextViewModel from "./viewModel";
import * as Constant from "./utils/constants";
import ColorStyleEnum from "./utils/colorStlye";
import "./style.scss";

interface SolidTextStateType extends StateType {
  canvasSize: number;
}

let solidTextViewModel: SolidTextViewModel;
let ctx: CanvasRenderingContext2D;
let isDragging = false;
let startX = 0;
let startY = 0;
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
            <label for="color-red">red</label>
            <input type="radio" id="color-red" name="mode" value="solid">
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
  }

  setEvent() {
    this.addEvent("click", "#color-gray", () => {
      solidTextViewModel.setColorStyle(ColorStyleEnum.GRAY);
      this.drawDonut();
    });

    this.addEvent("click", "#color-rainbow-1", () => {
      solidTextViewModel.setColorStyle(ColorStyleEnum.RAINBOW_1);
      this.drawDonut();
    });

    this.addEvent("click", "#color-red", () => {
      solidTextViewModel.setColorStyle(ColorStyleEnum.RED_GRADATION);
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

        if (solidTextViewModel.pixelService.isOverThreshold) {
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
    solidTextViewModel = new SolidTextViewModel(ctx, Constant.MATRIX_SIZE);
    this.drawDonut();
  }

  drawDonut() {
    solidTextViewModel.pixelService.updatePixelMatrix();

    solidTextViewModel.drawDonut(this.state.canvasSize);
  }
}

export default SolidTextPage;
