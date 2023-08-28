import Vector from "@utils/vector";
import { Parameter } from "@pages/solidText/utils/type";

interface SolidService {
  getRVector(parameter: Parameter): Vector;
  getNormalVector(parameter: Parameter): Vector;
}

export default SolidService;
