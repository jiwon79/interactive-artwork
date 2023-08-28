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

export type ColorStyle = "gray" | "rainbow-1" | "rainbow-2" | "change-rainbow";


