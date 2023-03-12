import Component, {StateType} from "@model/component";
import * as Constant from "./constants";
import {createLuminanceArray, IRotate} from "./function";
import "./style.scss";
import Matrix from "./math/matrix";

interface SolidTextStateType extends StateType, IRotate {}



class SolidTextPage extends Component<SolidTextStateType> {
  setUp() {
    this.state = {
      rotateX: 0,
      rotateY: 0,
    }
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
            width="${Constant.CANVAS_SIZE}"
            height="${Constant.CANVAS_SIZE}"
          />
      </div>
    `;
  }

  setEvent() {
    this.addEvent('click', '.buttons #left', () => {
      this.setState({rotateY: this.state.rotateY + 10});
    });
    this.addEvent('click', '.buttons #right', () => {
      this.setState({rotateY: this.state.rotateY - 10});
    });
    this.addEvent('click', '.buttons #up', () => {
      this.setState({rotateX: this.state.rotateX + 10});
    });
    this.addEvent('click', '.buttons #down', () => {
      this.setState({rotateX: this.state.rotateX - 10});
    });
  }

  didMount() {
    this.drawDonut();
  }

  didUpdate() {
    this.drawDonut();
  }

  drawDonut() {
    const rotate: IRotate = {
      rotateX: this.state.rotateX,
      rotateY: this.state.rotateY,
    }
    const luminanceArray = createLuminanceArray(rotate);
    const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

    this.drawByLuminanceArray(ctx, luminanceArray);
  }

  drawByLuminanceArray(ctx: CanvasRenderingContext2D, luminanceArray: Matrix) {
    const fontSize: number = Math.floor(Constant.CANVAS_SIZE / Constant.MATRIX_SIZE);
    ctx.font = `${fontSize}px serif`;
    ctx.fillStyle = "white";

    for (let i = 0; i < Constant.MATRIX_SIZE; i++) {
      for (let j = 0; j < Constant.MATRIX_SIZE; j++) {
        const luminance = luminanceArray.getElement(i, j);
        if (luminance > 0 && luminance < Constant.CHAR.length) {
          ctx.fillText(Constant.CHAR[luminance], i * fontSize, j * fontSize);
        }
      }
    }
  }
}

export default SolidTextPage;
