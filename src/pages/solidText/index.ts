import Component, {StateType} from "@model/component";
import {
  CHAR,
  HEIGHT,
  minorRadius,
  majorRadius,
  PHI_NUM,
  THETA_NUM,
  WIDTH
} from "@pages/solidText/constants";
import {
  create2DArray,
  dotProduct,
  Matrix, rotateMatrixByX, rotateMatrixByZ,
  unit,
  vector
} from "@pages/solidText/function";
import "./style.scss";

interface SolidTextStateType extends StateType {
  rotateX: number,
  rotateZ: number,
}

const LIGHT = unit([0,0,1]);

class SolidTextPage extends Component<SolidTextStateType> {
  setUp() {
    this.state = {
      rotateX: 0,
      rotateZ: 0,
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
        <canvas id="canvas" width="1800" height="1800"></canvas>
<!--        <div class="area_display">-->
<!--          <table class="display"></table>-->
<!--        </div>-->
      </div>
    `;
  }

  setEvent() {
    document.querySelector('.buttons #left')!.addEventListener('click', () => {
      this.setState({
        rotateZ: this.state.rotateZ + 60,
        rotateX: this.state.rotateX + 10,
      });
    });
  }

  didMount() {
    this.clearDisplay();
    this.drawDonut();
  }

  didUpdate() {
    console.log('update');
    this.clearDisplay();
    this.drawDonut();
    console.log(this.state);
  }

  clearDisplay() {
    // const display = document.querySelector('.display')!;
    //
    // for (var i=0; i<HEIGHT; i++) {
    //   var tr = document.createElement('tr');
    //   display.appendChild(tr);
    //   for (var j=0; j<WIDTH; j++) {
    //     var td = document.createElement('td');
    //     // td.style.width = tdWidth+'px';
    //     // td.style.height = tdHeight+'px';
    //     tr.appendChild(td);
    //     td.innerHTML = ' ';
    //   }
    // }
  }

  drawDonut() {
    const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    ctx.font = "18px serif";
    ctx.fillStyle = "white";
    let zArray = create2DArray(WIDTH, HEIGHT);

    for (var i = 0; i < THETA_NUM; i++) {
      for (var j = 0; j < PHI_NUM; j++) {
        var theta = 2 * Math.PI * i / THETA_NUM;
        var phi = 2 * Math.PI * j / PHI_NUM;

        var r: Matrix = new Matrix([[
          Math.cos(phi) * (minorRadius * Math.cos(theta) + majorRadius),
          Math.sin(phi) * (minorRadius * Math.cos(theta) + majorRadius),
          minorRadius * Math.sin(theta)
        ]]);

        var normal: vector = unit([
          Math.cos(theta) * Math.cos(phi),
          Math.cos(theta) * Math.sin(phi),
          Math.sin(theta)
        ]);

        const rotateMatX: Matrix = rotateMatrixByX(this.state.rotateX);
        const rotateMatZ: Matrix = rotateMatrixByZ(this.state.rotateZ);
        r = r.product(rotateMatX).product(rotateMatZ);
        const normalMatrix: Matrix = new Matrix([normal]).product(rotateMatX).product(rotateMatZ);
        normal = Array(normalMatrix.columns)
          .fill(0)
          .map((_, index) => normalMatrix.getElement(0, index));

        var luminance = dotProduct(normal, LIGHT);
        // var c = r.getElement(0, 2)/(majorRadius + minorRadius);
        // luminance = Math.floor(1+7.9*luminance+2.9*c);
        // console.log(luminance);
        if (luminance < 0) continue;
        luminance = Math.floor(11*luminance);

        r = new Matrix([[
          Math.floor(r.getElement(0, 0) + WIDTH / 2),
          Math.floor(r.getElement(0, 1) + HEIGHT / 2),
          r.getElement(0, 2)
        ]]);

        if (0<r.getElement(0, 0)
          && r.getElement(0, 0)<HEIGHT
          && 0<r.getElement(0, 1) && r.getElement(0, 1) < WIDTH
          && zArray[r.getElement(0, 0)][r.getElement(0, 1)]<=r.getElement(0, 2)
        ) {
          zArray[r.getElement(0, 0)][r.getElement(0, 1)] = r.getElement(0, 2);
          const x = r.getElement(0, 0);
          const y = r.getElement(0, 1);
          ctx.clearRect(x * 18, y * 18, 18, 18);
          ctx.fillText(CHAR[luminance], x * 18, (y + 1) * 18);
        }
      }
    }
  }
}

export default SolidTextPage;
