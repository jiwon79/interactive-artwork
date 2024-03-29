import Vector from '@utils/vector';

class CrowdViewModel {
  a: Vector = new Vector([0, 0]);
  b: Vector = new Vector([150, 80]);
  c: Vector = new Vector([200, 0]);

  public getPoint(t: number): Vector {
    const aVector = this.a.multiple((1 - t) * (1 - t));
    const bVector = this.b.multiple(2 * t * (1 - t));
    const cVector = this.c.multiple(t * t);

    return aVector.add(bVector).add(cVector);
  }

  public getSlope(t: number): Vector {
    const aVector = this.a.multiple(2 * (1 - t));
    const bVector = this.b.multiple(2 * (1 - 2 * t));
    const cVector = this.c.multiple(2 * t);

    return aVector.add(bVector).add(cVector);
  }
}

export default CrowdViewModel;
