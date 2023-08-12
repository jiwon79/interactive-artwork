export interface Parameter {
  theta: number;
  phi: number;
}

export interface Rotate {
  rotateX: number;
  rotateY: number;
}

export interface PixelData {
  luminance: number;
  parameter: Parameter;
}

