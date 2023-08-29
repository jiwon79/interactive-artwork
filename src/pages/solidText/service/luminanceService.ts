import SolidService from "./solid/solidService";
import NumberMatrix from "@utils/numberMatrix";

class LuminanceService {
  private readonly solidService: SolidService;
  private zMatrix: NumberMatrix;
  private readonly luminanceMatrix: NumberMatrix;

  constructor(solidService: SolidService) {
    this.solidService = solidService;
  }

}

export default LuminanceService;
