import Vector from '@utils/vector';

class BezierService {
  public getCurvePoint(
    initPoints: [Vector, Vector, Vector],
    t: number,
  ): Vector {
    const [a, b, c] = initPoints;
    const aVector = a.multiple((1 - t) * (1 - t));
    const bVector = b.multiple(2 * t * (1 - t));
    const cVector = c.multiple(t * t);

    return aVector.add(bVector).add(cVector);
  }

  public getCurveSlope(
    initPoints: [Vector, Vector, Vector],
    t: number,
  ): Vector {
    const [a, b, c] = initPoints;
    const aVector = a.multiple(2 * (1 - t));
    const bVector = b.multiple(2 * (1 - 2 * t));
    const cVector = c.multiple(2 * t);

    return aVector.add(bVector).add(cVector);
  }

  public getCurve(initPoints: [Vector, Vector, Vector]): Vector[] {
    const curve: Vector[] = [];

    for (let t = 0; t < 1; t += 0.01) {
      curve.push(this.getCurvePoint(initPoints, t));
    }

    return curve;
  }
}

export default BezierService;
