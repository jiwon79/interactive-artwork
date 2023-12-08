import Component, { StateType } from "@src/core/model/component";
import SolidTextViewModel from "./viewModel";
import * as Constant from "./utils/constants";
import "./style.scss";

export class SolidTextPage extends HTMLElement {
  constructor() {
    super();
    this.create();
  }

  create() {
    const title = document.createElement('p');
    title.classList.add('title');
    title.innerText = 'Drag Donut';

    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = Constant.CANVAS_SIZE;
    canvas.height = Constant.CANVAS_SIZE;

    this.append(title);
    this.append(canvas);
  }
}

customElements.define('solid-text-page', SolidTextPage);

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

export class SolidTextPageXX extends Component<SolidTextStateType> {
  setUp() {
    this.state = {
      canvasSize: Constant.CANVAS_SIZE
    };
  }

  template(): string {
    return `
      <main>
        <p class="title">Drag Dhonut</p>
        <div class="radio-input-wrap">
          <div class="radio-input">
              <input type="radio" id="color-gray" name="mode" value="solid" checked>
              <label for="color-gray">Gray</label>
          </div>
          <div class="radio-input">
              <input type="radio" id="color-rainbow" name="mode" value="solid">
              <label for="color-rainbow">Rainbow</label>
          </div>
          <div class="radio-input">
              <input type="radio" id="color-red" name="mode" value="solid">
              <label for="color-red">Red Gradient</label>
          </div>
          <div class="radio-input">
              <input type="radio" id="color-change-rainbow" name="mode" value="solid">
              <label for="color-change-rainbow">Change Rainbow</label>
          </div>
        </div>
<!--        <video-player></video-player>-->
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
      solidTextViewModel.setColorShaderType('grey');
      this.drawDonut();
    });

    this.addEvent("click", "#color-rainbow", () => {
      solidTextViewModel.setColorShaderType('rainbow');
      this.drawDonut();
    });

    this.addEvent("click", "#color-red", () => {
      solidTextViewModel.setColorShaderType('red-gradation');
      this.drawDonut();
    });

    this.addEvent("click", "#color-change-rainbow", () => {
      solidTextViewModel.setColorShaderType('change-rainbow');
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
        solidTextViewModel.dragRotate(distanceX / 2000, distanceY / 2000);

        if (solidTextViewModel.pixelService.isOverThreshold) {
          this.drawDonut();
        }
      }
    });

    this.addEvent("touchmove", "#canvas", (e: TouchEvent) => {
      if (isDragging) {
        distanceX = e.touches[0].clientX - startX;
        distanceY = e.touches[0].clientY - startY;
        solidTextViewModel.dragRotate(distanceX / 1000, distanceY / 1000);

        if (solidTextViewModel.pixelService.isOverThreshold) {
          this.drawDonut();
        }
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
    // const main = document.querySelector("main") as HTMLElement;
    // const radioWrap = new RadioWrap();
    // main.appendChild(radioWrap);

    const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
    ctx = canvas.getContext('2d')!;
    solidTextViewModel = new SolidTextViewModel(ctx, Constant.MATRIX_SIZE);
    this.drawDonut();

    setInterval(() => {
      solidTextViewModel.drawDonut(this.state.canvasSize);
      console.log("draw");
    }, 80);
  }

  drawDonut() {
    solidTextViewModel.pixelService.updatePixelMatrix();

    solidTextViewModel.drawDonut(this.state.canvasSize);
  }
}

export default SolidTextPageXX;
