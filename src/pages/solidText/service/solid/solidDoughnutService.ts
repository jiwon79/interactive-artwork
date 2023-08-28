import { Parameter } from "@pages/solidText/utils/type";
import Vector from "@utils/vector";
import SolidService from "./solidService";

class SolidDoughnutService implements SolidService {
  private majorRadius: number;
  private minorRadius: number;

  constructor(majorRadius: number, minorRadius: number) {
    this.majorRadius = majorRadius;
    this.minorRadius = minorRadius;
  }

  setMajorRadius(majorRadius: number): void {
    this.majorRadius = majorRadius;
  }

  setMinorRadius(minorRadius: number): void {
    this.minorRadius = minorRadius;
  }

  getRVector(parameter: Parameter): Vector {
    const {theta, phi} = parameter;

    return new Vector([
      Math.cos(phi) * (this.minorRadius * Math.cos(theta) + this.majorRadius),
      Math.sin(phi) * (this.minorRadius * Math.cos(theta) + this.majorRadius),
      this.minorRadius * Math.sin(theta)
    ]);
  }

  getNormalVector(parameter: Parameter): Vector {
    const {theta, phi} = parameter;

    return new Vector([
      Math.cos(theta) * Math.cos(phi),
      Math.cos(theta) * Math.sin(phi),
      Math.sin(theta)
    ]);
  }
}

export default SolidDoughnutService;
