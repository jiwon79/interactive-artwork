import Component, {StateType} from "@model/component";
import * as Constant from "@pages/solidText/constants";
import {
  create2DArray, twoDArray,
} from "@pages/solidText/function";
import "./style.scss";
import Matrix, {rotateMatrixByX, rotateMatrixByY} from "@pages/solidText/math/matrix";
import Vector from "@pages/solidText/math/vector";

interface SolidTextStateType extends StateType {
  rotateX: number,
  rotateY: number,
}

const LIGHT = new Vector([0,0,1]);
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

  drawCanvas(luminanceArray: twoDArray) {
    const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    const fontSize: number = Math.floor(SIZE / Constant.ROW);
    ctx.font = `${fontSize}px serif`;
    ctx.fillStyle = "white";

    luminanceArray.forEach((row, rowIndex) => {
      row.forEach((luminance, columnIndex) => {
        if (luminance > 0 && luminance < Constant.CHAR.length) {
          ctx.fillText(Constant.CHAR[luminance], rowIndex * fontSize, (columnIndex + 1) * fontSize);
        }
      })
    })
  }

  drawDonut() {
    let zArray = create2DArray(Constant.ROW, Constant.COLUMN);
    let luminanceArray = create2DArray(Constant.ROW, Constant.COLUMN);

    for (var i = 0; i < Constant.THETA_NUM; i++) {
      for (var j = 0; j < Constant.PHI_NUM; j++) {
        var theta = 2 * Math.PI * i / Constant.THETA_NUM;
        var phi = 2 * Math.PI * j / Constant.PHI_NUM;

        var r: Matrix = new Matrix([[
          Math.cos(phi) * (Constant.minorRadius * Math.cos(theta) + Constant.majorRadius),
          Math.sin(phi) * (Constant.minorRadius * Math.cos(theta) + Constant.majorRadius),
          Constant.minorRadius * Math.sin(theta)
        ]]);

        var normal: Vector = new Vector([
          Math.cos(theta) * Math.cos(phi),
          Math.cos(theta) * Math.sin(phi),
          Math.sin(theta)
        ]);

        const rotateMatX: Matrix = rotateMatrixByX(this.state.rotateX);
        const rotateMatZ: Matrix = rotateMatrixByY(this.state.rotateY);
        r = r.crossProduct(rotateMatX).crossProduct(rotateMatZ);
        normal = normal.crossProduct(rotateMatX).crossProduct(rotateMatZ);

        var luminance = normal.dotProduct(LIGHT);
        // var luminance = dotProduct(normal, LIGHT);
        var c = r.getElement(0, 2)/(Constant.majorRadius + Constant.minorRadius);
        luminance = Math.floor(1+7.9*luminance+2.9*c);
        // console.log(luminance);
        if (luminance < 0) continue;
        // luminance = Math.floor(11*luminance);

        r = new Matrix([[
          Math.floor(r.getElement(0, 0) + Constant.ROW / 2),
          Math.floor(r.getElement(0, 1) + Constant.COLUMN / 2),
          r.getElement(0, 2)
        ]]);

        const x = r.getElement(0, 0);
        const y = r.getElement(0, 1);

        if (0<r.getElement(0, 0)
          && r.getElement(0, 0)<Constant.COLUMN
          && 0<r.getElement(0, 1) && r.getElement(0, 1) < Constant.ROW
          && zArray[r.getElement(0, 0)][r.getElement(0, 1)]<=r.getElement(0, 2)
        ) {
          zArray[x][y] = r.getElement(0, 2);
          luminanceArray[x][y] = luminance;
        }
      }
    }
    this.drawCanvas(luminanceArray);
  }
}

export default SolidTextPage;
