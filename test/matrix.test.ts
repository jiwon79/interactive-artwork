import Matrix from '../src/pages/solidText/math/matrix';

describe('Matrix', () => {
  test("Matrix equal", () => {
    const a: Matrix = new Matrix([[1, 2], [3, 4]]);
    const b: Matrix = new Matrix([[1, 2], [3, 4]]);

    expect(a.equal(b)).toBe(true);
  });

  test("Matrix not equal", () => {
    const a: Matrix = new Matrix([[1, 2], [3, 4]]);
    const b: Matrix = new Matrix([[1, 2], [3, 5]]);

    expect(a.equal(b)).toBe(false);
  });

  test("Matrix similar", () => {
    const a: Matrix = new Matrix([[1, 2], [3, 4]]);
    const b: Matrix = new Matrix([[1.0001, 2.0001], [3.0001, 4.0001]]);

    expect(a.similar(b, 0.001)).toBe(true);
  });

  test("Matrix get element", () => {
    const a: Matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);

    expect(a.getElement(0, 0)).toBe(1);
    expect(a.getElement(0, 1)).toBe(2);
    expect(a.getElement(1, 0)).toBe(4);
    expect(a.getElement(1, 1)).toBe(5);
  });

  test("Matrix set element", () => {
    const a: Matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
    a.setElement(0, 0, 10);

    expect(a.getElement(0, 0)).toBe(10);
  });

  test("Matrix dot product", () => {
    const a: Matrix = new Matrix([[1, 2], [3, 4]]);
    const b: Matrix = new Matrix([[1, 2], [3, 4]]);

    expect(a.dotProduct(b)).toBe(30);
  });
});


