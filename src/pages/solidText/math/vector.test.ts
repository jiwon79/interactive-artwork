import Vector, {getRotatedVector} from "./vector";

describe("Vector", () => {
  const epsilon: number = 0.00001;

  test("equal", () => {
    const a = new Vector([1, 2, 3]);
    const b = new Vector([1, 2, 3]);

    expect(a.equal(b)).toBeTruthy();
  });

  test("get method", () => {
    const a = new Vector([1, 2, 3]);

    expect(a.x).toBe(1);
    expect(a.y).toBe(2);
    expect(a.z).toBe(3);
  });

  test("dotProduct", () => {
    const a = new Vector([1, 2, 3]);
    const b = new Vector([4, 5, 6]);
    expect(a.dotProduct(b)).toBe(32);
  });

  test("rotate - X (PI/2)", () => {
    const vector = new Vector([1, 2, 3]);
    const rotatedVector = getRotatedVector(vector, {rotateX: Math.PI / 2, rotateY: 0});
    const expectedVector = new Vector([1, 3, -2]);

    expect(rotatedVector.similar(expectedVector, epsilon)).toBeTruthy();
  });

  test("rotate - X (PI)", () => {
    const vector = new Vector([1, 2, 3]);
    const rotatedVector = getRotatedVector(vector, {rotateX: Math.PI, rotateY: 0});
    const expectedVector = new Vector([1, -2, -3]);

    expect(rotatedVector.similar(expectedVector, epsilon)).toBeTruthy();
  });

  test("rotate - Y (PI/2)", () => {
    const vector = new Vector([1, 2, 3]);
    const rotatedVector = getRotatedVector(vector, {rotateX: 0, rotateY: Math.PI / 2});
    const expectedVector = new Vector([-3, 2, 1]);
    console.log(rotatedVector);

    expect(rotatedVector.similar(expectedVector, epsilon)).toBeTruthy();
  });
});
