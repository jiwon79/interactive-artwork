import { Parameter } from "@pages/solidText/utils/type";

class ColorStyleEnum {
  static GRAY: ColorStyle = {display: 'gray', getColor: this.gray}
  static RAINBOW_1: ColorStyle = {display: 'rainbow - 1', getColor: this.rainbow_1}
  static RED_GRADATION: ColorStyle = {display: 'red gradation', getColor: this.red_gradation}

  static Values: ColorStyleEnum[] = [ColorStyleEnum.GRAY, ColorStyleEnum.RAINBOW_1];

  static gray(_parameter: Parameter): [number, number, number] {
    return [255, 255, 255];
  }

  static rainbow_1(_parameter: Parameter): [number, number, number] {
    const pi = Math.PI;

    if (_parameter.theta < 0 || _parameter.theta > 2 * pi) {
      throw new Error("Input should be between 0 and 2 * PI.");
    }

    const r = Math.floor(255 * (Math.sin(_parameter.theta) * 0.5 + 0.5));
    const g = Math.floor(255 * (Math.sin(_parameter.phi + 2 * pi / 3) * 0.5 + 0.5));
    const b = Math.floor(255 * (Math.sin(_parameter.theta + 4 * pi / 3) * 0.5 + 0.5));

    return [r, g, b];
  }

  static red_gradation(_parameter: Parameter): [number, number, number] {
    const r = 255
    const g = Math.floor(255 * Math.sin(_parameter.phi * 4));
    const b = Math.floor(255 * Math.sin(_parameter.phi * 3));

    return [r, g, b];
  }
}

export interface ColorStyle {
  display: String;
  getColor: (parameter: Parameter) => [number, number, number];
}

export default ColorStyleEnum;
