import { Cube, Face, Matrix } from "../types";
import { adjacentFacesMap } from "../variables";
import { rotateMatrixNTimes } from "./matrix";

type GetCuboidsFromCubeStateProps = {
  cube: Cube;
};

export const getCuboidsFromCubeState = ({
  cube,
}: GetCuboidsFromCubeStateProps): {
  position: [number, number, number];
  colorIndexes: number[];
}[] => {
  const cubeSideLength = cube.up.length;

  const getAxisIntersection = ({
    axisFaces,
    index,
  }: {
    axisFaces: [Face, Face];
    index: number;
  }) => {
    if (index === 0) return axisFaces[0];
    if (index === cubeSideLength - 1) return axisFaces[1];

    return null;
  };

  const sideLengthRange = Array.from(Array(cubeSideLength).keys());

  const referenceFace = 'up';

  const faces: Face[] = ['right', 'left', 'up', 'down', 'front', 'back'];

  const cuboids = sideLengthRange.flatMap((layerIndex) => {
    const yAxisIntersection = getAxisIntersection({ index: layerIndex, axisFaces: ['up', 'down'] });

    return cube[referenceFace].flatMap((row, rowIndex) => {
      const zAxisIntersection = getAxisIntersection({ index: rowIndex, axisFaces: ['back', 'front'] });

      return row.flatMap((cell, cellIndex) => {
        const xAxisIntersection = getAxisIntersection({ index: cellIndex, axisFaces: ['left', 'right'] });

        const intersections = [
          xAxisIntersection,
          yAxisIntersection,
          zAxisIntersection,
        ];

        const colorIndexes = faces.map((face) => {
          if (!intersections.includes(face)) return -1;

          const faceTransformationMap: Record<Face, number> = {
            up: cube.up[rowIndex][cellIndex],
            down: cube.down.slice().reverse()[rowIndex][cellIndex],
            left: cube.left[layerIndex][rowIndex],
            right: cube.right.map((row) => row.slice().reverse())[layerIndex][rowIndex],
            front: cube.front[layerIndex][cellIndex],
            back: cube.back.slice().reverse()[layerIndex][cellIndex],
          };

          return faceTransformationMap[face];
        });

        return {
          intersections,
          position: [cellIndex, cubeSideLength - layerIndex - 1, rowIndex] as [number, number, number],
          colorIndexes,
        };
      });
    });
  });

  return cuboids;
};
