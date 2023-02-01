export type Face = 'up' | 'down' | 'right' | 'left' | 'front' | 'back';

export type Vector = [number, number];

export type Matrix = number[][];

export type Cube = Record<Face, Matrix>;

export type CuboidInfo = {
  position: [number, number, number];
  colorIndexes: number[];
};
