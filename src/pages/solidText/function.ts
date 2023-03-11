export class Matrix {
  public rows: number;
  public columns: number;
  public elements: number[][];

  constructor(elements: number[][]) {
    if (elements.some((row) => row.length !== elements[0].length)) {
      throw new Error('Cannot create matrix with inconsistent row length');
    }

    this.rows = elements.length;
    this.columns = elements[0].length;
    this.elements = elements;
  }

  public setElement(row: number, column: number, value: number): void {
    this.elements[row][column] = value;
  }

  public getElement(row: number, column: number): number {
    return this.elements[row][column];
  }

  public product(other: Matrix): Matrix {
    if (this.columns !== other.rows) {
      throw new Error('Cannot perform matrix product with incompatible matrices');
    }

    const result = new Matrix(
      Array(this.rows).fill(0).map(() => Array(other.columns).fill(0))
    );

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < other.columns; j++) {
        let sum = 0;
        for (let k = 0; k < this.columns; k++) {
          sum += this.elements[i][k] * other.elements[k][j];
        }
        result.setElement(i, j, sum);
      }
    }

    return result;
  }
}

//////////////////////////// Vector Function ///////////////////////////
export type vector = number[];
export type twoDArray = number[][];

export function getMagnitude(vec: vector): number {
  let result: number = 0;
  for (let i=0; i<vec.length; i++) {
    result += vec[i]*vec[i]
  }

  return Math.sqrt(result)
}

export function unit(vec: vector): vector {
  const magnitude = getMagnitude(vec);

  return vec.map((v) => v / magnitude);
}

export function dotProduct(vec1: vector, vec2: vector): number {
  if (vec1.length != vec2.length) {
    throw new Error("vector length is not same");
  }

  return vec1.reduce((result, v, i) => result + v * vec2[i], 0);
}

//////////////////////////// Matrix Function ///////////////////////////
export function create2DArray(rows: number, columns: number): twoDArray {
  const arr = new Array(rows);
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(columns);
    arr[i].fill(-Infinity);
  }

  return arr;
}

// Create -Infinity 2D array
export function clear2DArray(array: twoDArray) {
  for (let i=0; i<array.length; i++) {
    array[i].fill(-Infinity);
  }
}

// Create rotate matrix by theta
export function rotateMatrixByX(theta: number): Matrix {
  return new Matrix([
    [1, 0, 0],
    [0, Math.cos(theta), -1*Math.sin(theta)],
    [0, Math.sin(theta), Math.cos(theta)]
  ]);
}

export function rotateMatrixByZ(theta: number): Matrix {
  return new Matrix([
    [Math.cos(theta), -1*Math.sin(theta), 0],
    [Math.sin(theta), Math.cos(theta), 0],
    [0, 0, 1]
  ]);
}

////////////////////////// set Value Function /////////////////////////
// function SetValueA() {
//   let slider = document.querySelector('#sliderA')
//   a = parseInt(slider.value);
//   clearDisplay();
//   clear2DArray(zArray);
//   drawDonut();}
//
// function SetValueB() {
//   let slider = document.querySelector('#sliderB')
//   b = parseInt(slider.value);
//   clearDisplay();
//   clear2DArray(zArray);
//   drawDonut();}

/////////////////////////// Buttons Function /////////////////////////
// export function buttonRotate(direction: String) {
//   if (direction == "up") {
//     rotateZ += 0.1*Math.PI;
//   } else if (direction == "down") {
//     rotateZ -= 0.1*Math.PI;
//   } else if (direction == "left") {
//     rotateX -= 0.1*Math.PI;
//   } else if (direction == "right") {
//     rotateX += 0.1*Math.PI;
//   }
//   clearDisplay();
//   clear2DArray(zArray);
//   drawDonut();
// }

//////////////////////// Display Draw Function ///////////////////////
// Clear table by blank space
// function clearDisplay() {
//   for (var i=1; i<WIDTH+1; i++) {
//     for (var j=1; j<WIDTH+1; j++) {
//       document.querySelector('table tr:nth-child('+String(i)+') td:nth-child('+String(j)+')')!.innerHTML = " ";
//     }
//   }
// }


