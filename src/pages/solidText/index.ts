import * as Constant from "./utils/constants";
import "./style.scss";
import { RadioWrap } from "@pages/solidText/component/RadioWrap";
import SolidTextViewModel from "@pages/solidText/viewModel";
import { ColorShaderType } from "@pages/solidText/utils/colorShader";

let isDragging = false;
let startX = 0;
let startY = 0;
let distanceX = 0;
let distanceY = 0;

export class SolidTextPage extends HTMLElement {
  static viewModel: SolidTextViewModel;

  constructor() {
    super();
    SolidTextPage.viewModel = new SolidTextViewModel(Constant.MATRIX_SIZE);
    this.setAttribute('data-selected-color-type', SolidTextPage.viewModel.colorShaderType);
  }

  delete() {
    this.innerHTML = '';
  }

  static get observedAttributes() {
    return ['data-selected-color-type'];
  }

  attributeChangedCallback() {
    this.delete()
    this.create()
  }

  create() {
    const title = document.createElement('p');
    title.classList.add('title');
    title.innerText = 'Drag Donut';

    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = Constant.CANVAS_SIZE;
    canvas.height = Constant.CANVAS_SIZE;

    const ctx = canvas.getContext('2d')!;
    SolidTextPage.viewModel.setContext(ctx);
    this.drawDonut()

    setInterval(() => {
      SolidTextPage.viewModel.drawDonut(this.state.canvasSize);
    }, 80);
    const radioWrap = new RadioWrap({
      selectedColorShaderType: SolidTextPage.viewModel.colorShaderType,
      onChange: (colorShaderType: ColorShaderType) => {
        SolidTextPage.viewModel.setColorShaderType(colorShaderType);
        this.setAttribute('data-selected-color-type', colorShaderType);
      },
    });

    this.append(title);
    this.append(radioWrap);
    this.append(canvas);

    canvas.addEventListener("mousedown", (e: MouseEvent) => {
      this.setVariable(e.clientX, e.clientY);
    });

    canvas.addEventListener("touchstart", (e: TouchEvent) => {
      this.setVariable(e.touches[0].clientX, e.touches[0].clientY);
    });

    canvas.addEventListener("mousemove", (e: MouseEvent) => {
      if (isDragging) {
        distanceX = e.clientX - startX;
        distanceY = e.clientY - startY;
        SolidTextPage.viewModel.dragRotate(distanceX / 2000, distanceY / 2000);

        if (SolidTextPage.viewModel.pixelService.isOverThreshold) {
          this.drawDonut();
        }
      }
    });

    canvas.addEventListener("touchmove", (e: TouchEvent) => {
      if (isDragging) {
        distanceX = e.touches[0].clientX - startX;
        distanceY = e.touches[0].clientY - startY;
        SolidTextPage.viewModel.dragRotate(distanceX / 1000, distanceY / 1000);

        if (SolidTextPage.viewModel.pixelService.isOverThreshold) {
          this.drawDonut();
        }
      }
    });

    canvas.addEventListener("mouseup", () => {
      isDragging = false;
    });

    canvas.addEventListener("touchend", () => {
      isDragging = false;
    });
  }

  setVariable(clientX: number, clientY: number) {
    isDragging = true;
    startX = clientX;
    startY = clientY;
  }

  private state = {
    canvasSize: Constant.CANVAS_SIZE
  };

  drawDonut() {
    SolidTextPage.viewModel.drawDonut(this.state.canvasSize);
  }
}

customElements.define('solid-text-page', SolidTextPage);
