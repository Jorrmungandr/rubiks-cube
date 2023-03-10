import { Cube, Face } from '../types';

type AssembleInitialCubeProps = {
  dimensions: [number, number];
};

export const assembleInitialCube = ({
  dimensions,
}: AssembleInitialCubeProps): Cube => {
  const initialCube: Cube = {
    up: [],
    left: [],
    front: [],
    right: [],
    down: [],
    back: [],
  };

  const faces: Face[] = ['up', 'left', 'front', 'right', 'down', 'back'];

  faces.forEach((face, index) => {
    const lineContent = Array.from(Array(dimensions[1])).map(() => index);
    const matrix = Array.from(Array(dimensions[0])).map(() => lineContent);

    initialCube[face] = matrix;
  });

  return initialCube;
};
