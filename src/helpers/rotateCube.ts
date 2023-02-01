import { Cube, Face } from '../types';
import { adjacentFacesMap, oposingFacesMap } from '../variables';
import { rotateMatrixClockwise, rotateMatrixCounterClockwise, rotateMatrixNTimes } from './matrix';

type RotateCubeProps = {
  previousCube: Cube;
  face: Face;
  rotation: 'clockwise' | 'counterclockwise';
  depth: number;
}

export const rotateCube = ({
  previousCube,
  face,
  rotation,
  depth = 0,
}: RotateCubeProps): Cube => {
  const newCube: Cube = { ...previousCube };

  const cubeSideLength = newCube.up.length;

  // Rotate face
  if (depth === 0) {
    if (rotation === 'clockwise') {
      newCube[face] = rotateMatrixClockwise(previousCube[face]);
    } else {
      newCube[face] = rotateMatrixCounterClockwise(previousCube[face]);
    }
  }

  if (depth === cubeSideLength - 1) {
    const oposingFace = oposingFacesMap[face];

    if (rotation === 'clockwise') {
      newCube[oposingFace] = rotateMatrixCounterClockwise(previousCube[oposingFace]);
    } else {
      newCube[oposingFace] = rotateMatrixClockwise(previousCube[oposingFace]);
    }
  }

  // Transpose adjacent faces
  const faceRotations = adjacentFacesMap[face];

  faceRotations.forEach((receiverFace, index) => {
    const rotatedReceiverFace = rotateMatrixNTimes(
      previousCube[receiverFace.face],
      receiverFace.rotation,
    );

    const senderIndex = rotation === 'clockwise' ? index - 1 : (index + 1) % faceRotations.length;

    const senderFace = faceRotations.at(senderIndex);

    if (!senderFace) return;

    const rotatedSenderFace = rotateMatrixNTimes(
      previousCube[senderFace.face],
      senderFace.rotation,
    );

    rotatedReceiverFace[depth] = rotatedSenderFace[depth];

    const rerotatedReceiverFace = rotateMatrixNTimes(
      rotatedReceiverFace,
      receiverFace.rotation * -1,
    );

    newCube[receiverFace.face] = rerotatedReceiverFace;
  });

  return newCube;
};
