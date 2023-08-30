import { Parameter } from "@pages/solidText/utils/type";

class ColorService {
  private _selectedColorStyle: ColorStyleField;

  constructor() {
    this._selectedColorStyle = ColorStyle.GRAY;
  }

  public test() {
    console.log("test")
  }

  public get selectedColorStyle() {
    return this._selectedColorStyle;
  }

  set selectedColorStyle(colorStyle: ColorStyleField) {
    this._selectedColorStyle = colorStyle;
  }
}

export class ColorStyle {
  static GRAY: ColorStyleField = {display: 'gray', getColor: this.getColorGray}
  static RAINBOW_1: ColorStyleField = {display: 'rainbow_1', getColor: this.getRainbowColor}

  static Values: ColorStyle[] = [ColorStyle.GRAY, ColorStyle.RAINBOW_1];

  static getColorGray(_parameter: Parameter): [number, number, number] {
    return [255, 255, 255];
  }

  static getRainbowColor(_parameter: Parameter): [number, number, number] {
    const rate = _parameter.theta / (2 * Math.PI);
    if (rate < 0 || rate > 1) {
      throw new Error("Input should be between 0 and 1.");
    }

    const pi = Math.PI;

    // Convert x from [0,1] to [0, 2π]
    const theta = 2 * pi * rate;

    const r = Math.floor(255 * (Math.sin(theta) * 0.5 + 0.5));
    const g = Math.floor(255 * (Math.sin(theta + 2 * pi / 3) * 0.5 + 0.5));
    const b = Math.floor(255 * (Math.sin(theta + 4 * pi / 3) * 0.5 + 0.5));

    return [r, g, b];
  }
}

export interface ColorStyleField {
  display: String;
  getColor: (parameter: Parameter) => [number, number, number];
}

export default ColorService;
