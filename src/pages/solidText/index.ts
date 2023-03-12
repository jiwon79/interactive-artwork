import Component, {StateType} from "@model/component";
import * as Constant from "./constants";
import {getRotatedNormalVector, getRotatedRVector, IParameter, IRotate} from "./function";
import "./style.scss";
import Matrix from "./math/matrix";
import Vector from "./math/vector";

interface SolidTextStateType extends StateType {
  rotateX: number,
  rotateY: number,
}

const LIGHT = new Vector([0, 0, 1]);
const SIZE: number = 1920;

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
        <canvas id="canvas" width="${SIZE}" height="${SIZE}"></canvas>
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

  createLuminanceArray(): Matrix {
    let zArray = Matrix.createByRowAndColumn(Constant.ROW, Constant.COLUMN);
    let luminanceArray = Matrix.createByRowAndColumn(Constant.ROW, Constant.COLUMN);

    for (let i = 0; i < Constant.THETA_NUM; i++) {
      for (let j = 0; j < Constant.PHI_NUM; j++) {
        const theta = 2 * Math.PI * i / Constant.THETA_NUM;
        const phi = 2 * Math.PI * j / Constant.PHI_NUM;
        const parameter: IParameter = {theta, phi};
        const rotate: IRotate = {rotateX: this.state.rotateX, rotateY: this.state.rotateY};

        let r = getRotatedRVector(parameter, rotate);
        const normal = getRotatedNormalVector(parameter, rotate);

        var luminance = normal.dotProduct(LIGHT);
        // var luminance = dotProduct(normal, LIGHT);
        var c = r.getElement(0, 2) / (Constant.majorRadius + Constant.minorRadius);
        luminance = Math.floor(1 + 7.9 * luminance + 2.9 * c);
        // console.log(luminance);
        if (luminance < 0) continue;
        // luminance = Math.floor(11*luminance);

        const rCanvas = new Matrix([[
          Math.floor(r.getElement(0, 0) + Constant.ROW / 2),
          Math.floor(r.getElement(0, 1) + Constant.COLUMN / 2),
          r.getElement(0, 2)
        ]]);

        const x = rCanvas.getElement(0, 0);
        const y = rCanvas.getElement(0, 1);
        const z = rCanvas.getElement(0, 2);

        if (0 < x
          && x < Constant.COLUMN
          && 0 < y && y < Constant.ROW
          && zArray.getElement(x, y) <= z
        ) {
          zArray.setElement(x, y, z);
          luminanceArray.setElement(x, y, luminance);
        }
      }
    }

    return luminanceArray
  }

  drawByLuminanceArray(ctx: CanvasRenderingContext2D, luminanceArray: Matrix) {
    const fontSize: number = Math.floor(SIZE / Constant.ROW);
    ctx.font = `${fontSize}px serif`;
    ctx.fillStyle = "white";

    for (let i = 0; i < Constant.ROW; i++) {
      for (let j = 0; j < Constant.COLUMN; j++) {
        const luminance = luminanceArray.getElement(i, j);
        if (luminance > 0 && luminance < Constant.CHAR.length) {
          ctx.fillText(Constant.CHAR[luminance], i * fontSize, j * fontSize);
        }
      }
    }
  }

  drawDonut() {
    const luminanceArray = this.createLuminanceArray();
    const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

    this.drawByLuminanceArray(ctx, luminanceArray);
  }
}

export default SolidTextPage;
