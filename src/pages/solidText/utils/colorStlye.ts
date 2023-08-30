import { Parameter } from "@pages/solidText/utils/type";

class ColorStyleEnum {
  static GRAY: ColorStyle = {display: 'gray', getColor: this.gray}
  static RAINBOW: ColorStyle = {display: 'rainbow', getColor: this.rainbow_1}
  static RED_GRADATION: ColorStyle = {display: 'red gradation', getColor: this.red_gradation}
  static CHANGE_RAINBOW: ColorStyle = {display: 'change gradation', getColor: this.change_rainbow}

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

  static change_rainbow(parameter: Parameter, time: number): [number, number, number] {
    const pi = Math.PI;
    const t = 2 * pi * (time % 4000) / 4000

    if (parameter.theta < 0 || parameter.theta > 2 * pi) {
      throw new Error("Input should be between 0 and 2 * PI.");
    }

    const r = Math.floor(255 * (Math.sin(parameter.theta + 2 * t) * 0.5 + 0.5));
    const g = Math.floor(255 * (Math.sin(parameter.phi + 2 * pi / 3 + t * 2) * 0.5 + 0.5));
    const b = Math.floor(255 * (Math.sin(parameter.theta + 4 * pi / 3 + 2 * t) * 0.5 +0.5 ));

    return [r, g, b];
  }
}

export interface ColorStyle {
  display: String;
  getColor: (parameter: Parameter, time: number) => [number, number, number];
}

export default ColorStyleEnum;
