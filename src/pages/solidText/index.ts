import Component, {StateType} from "@model/component";
import * as Constant from "./constants";
import SolidTextViewModel from "./viewModel";
import "./style.scss";
import Matrix from "./math/matrix";

interface SolidTextStateType extends StateType {
  canvasSize: number;
}

const solidTextViewModel = new SolidTextViewModel(Constant.MATRIX_SIZE);
let ctx: CanvasRenderingContext2D;

class SolidTextPage extends Component<SolidTextStateType> {
  setUp() {
    this.state = {
      canvasSize: Constant.CANVAS_SIZE
    };
  }

  template(): string {
    return `
      <div>
        solid text
        <div class="buttons">
          <button class="key_button" id="up">up</button>
          <button class="key_button" id="down">down</button>
          <button class="key_button" id="left">left</button>
          <button class="key_button" id="right">right</button>
        </div>
        <canvas
            id="canvas"
            width="${this.state.canvasSize}"
            height="${this.state.canvasSize}"
          />
      </div>
    `;
  }

  setEvent() {
    this.addEvent('click', '.buttons #left', () => {
      solidTextViewModel.addRotate({rotateX: 0, rotateY: 10});
      this.drawDonut();
    });
    this.addEvent('click', '.buttons #right', () => {
      solidTextViewModel.addRotate({rotateX: 0, rotateY: -10});
      this.drawDonut();
    });
    this.addEvent('click', '.buttons #up', () => {
      solidTextViewModel.addRotate({rotateX: 10, rotateY: 0});
      this.drawDonut();
    });
    this.addEvent('click', '.buttons #down', () => {
      solidTextViewModel.addRotate({rotateX: -10, rotateY: 0});
      this.drawDonut();
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
