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
  getColor: (parameter: Parameter, time: number) => RGBColor;
}

export const colorShaderMap: Record<ColorShaderType, ColorShader> = {
  grey: {
    name: 'grey',
    type: 'grey',
    getColor: () => [255, 255, 255],
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

function getRainbowColor(parameter: Parameter): [number, number, number] {
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

  return [r, g, b];
}

function getRedGradationColor(parameter: Parameter): [number, number, number] {
  const r = 255;
  const g = Math.floor(255 * Math.sin(parameter.phi * 4));
  const b = Math.floor(255 * Math.sin(parameter.phi * 3));

  return [r, g, b];
}

function getChangeRainbowColor(
  parameter: Parameter,
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
