class Matrix<T> {
  public elements: T[][];
  public rows: number;
  public columns: number;

  constructor(elements: T[][]) {
    if (elements.some((row) => row.length !== elements[0].length)) {
      throw new Error('Cannot create matrix with inconsistent row length');
    }

    this.elements = elements;
    this.rows = elements.length;
    this.columns = elements[0].length;
  }
}

export default Matrix;
