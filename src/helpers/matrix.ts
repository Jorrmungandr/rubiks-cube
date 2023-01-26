import { Matrix } from '../types';

export const rotateMatrixClockwise = (originalMatrix: Matrix): Matrix => {
  const rotatedMatrix = originalMatrix[0]
    .map((val, index) => originalMatrix.map((row) => row[index]).reverse());

  return rotatedMatrix;
};

export const rotateMatrixCounterClockwise = (originalMatrix: Matrix): Matrix => {
  const rotatedMatrix = originalMatrix[0]
    .map((val, index) => originalMatrix.map((row) => row[row.length - 1 - index]));

  return rotatedMatrix;
};

export const rotateMatrixNTimes = (originalMatrix: Matrix, times): Matrix => {
  let rotatingMatrix = [...originalMatrix];

  if (times === 0) return rotatingMatrix;

  if (times < 0) {
    for (let i = 0; i < Math.abs(times); i += 1) {
      rotatingMatrix = rotateMatrixCounterClockwise(rotatingMatrix);
    }
  }

  if (times > 0) {
    for (let i = 0; i < Math.abs(times); i += 1) {
      rotatingMatrix = rotateMatrixClockwise(rotatingMatrix);
    }
  }

  return rotatingMatrix;
};
