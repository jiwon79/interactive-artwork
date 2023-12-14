import { Parameter } from '@pages/solidText/utils/type';

export type ColorShaderType =
  | 'grey'
  | 'rainbow'
  | 'red-gradation'
  | 'change-rainbow';
type RGBColor = [number, number, number];

export interface ColorShader {
  name: string;
  type: ColorShaderType;
  getColor: (parameter: Parameter, luminance: number, time: number) => RGBColor;
}

export const colorShaderMap: Record<ColorShaderType, ColorShader> = {
  grey: {
    name: 'grey',
    type: 'grey',
    getColor: getGrayColor,
  },
  rainbow: {
    name: 'rainbow',
    type: 'rainbow',
    getColor: getRainbowColor,
  },
  'red-gradation': {
    name: 'red-gradation',
    type: 'red-gradation',
    getColor: getRedGradationColor,
  },
  'change-rainbow': {
    name: 'change-rainbow',
    type: 'change-rainbow',
    getColor: getChangeRainbowColor,
  },
};

function sigmoid(x: number, a = 1) {
  return 1 / (1 + Math.exp(-x * a));
}

function getGrayColor(
  _: Parameter,
  luminance: number,
): [number, number, number] {
  // const gray = Math.floor(255 * (luminance / 6));
  const gray = Math.floor(255 * sigmoid(luminance - 2, 0.25));

  return [gray, gray, gray];
}

function getRainbowColor(
  parameter: Parameter,
  luminance: number,
): [number, number, number] {
  const pi = Math.PI;

  if (parameter.theta < 0 || parameter.theta > 2 * pi) {
    throw new Error('Input should be between 0 and 2 * PI.');
  }

  const r = Math.floor(255 * (Math.sin(parameter.theta) * 0.5 + 0.5));
  const g = Math.floor(
    255 * (Math.sin(parameter.phi + (2 * pi) / 3) * 0.5 + 0.5),
  );
  const b = Math.floor(
    255 * (Math.sin(parameter.theta + (4 * pi) / 3) * 0.5 + 0.5),
  );

  const curLuminance = (r + g + b) / 3;
  const rate = sigmoid((luminance / curLuminance) * 12, 4);

  return [r * rate, g * rate, b * rate];
}

function getRedGradationColor(parameter: Parameter): [number, number, number] {
  const r = 255;
  const g = Math.floor(255 * Math.sin(parameter.phi * 3));
  const b = Math.floor(255 * Math.sin(parameter.phi * 2));

  return [r, g, b];
}

function getChangeRainbowColor(
  parameter: Parameter,
  _: number,
  time: number,
): [number, number, number] {
  const pi = Math.PI;
  const t = (2 * pi * (time % 4000)) / 4000;

  if (parameter.theta < 0 || parameter.theta > 2 * pi) {
    throw new Error('Input should be between 0 and 2 * PI.');
  }

  const r = Math.floor(255 * (Math.sin(parameter.theta + 2 * t) * 0.5 + 0.5));
  const g = Math.floor(
    255 * (Math.sin(parameter.phi + (2 * pi) / 3 + t * 2) * 0.5 + 0.5),
  );
  const b = Math.floor(
    255 * (Math.sin(parameter.theta + (4 * pi) / 3 + 2 * t) * 0.5 + 0.5),
  );

  return [r, g, b];
}
