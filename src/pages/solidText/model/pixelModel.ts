import Vector from "@utils/vector";
import { Parameter } from "../utils/type";

interface PixelModel {
  parameter: Parameter;
  r: Vector;
  normal: Vector;
}

export const emptyPixelModel: PixelModel = {
  parameter: {
    theta: 0,
    phi: 0
  },
  r: new Vector([0, 0, -Infinity]),
  normal: new Vector([0, 0, 0])
}

export default PixelModel;
