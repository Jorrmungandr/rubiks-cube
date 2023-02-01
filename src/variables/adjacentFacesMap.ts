import { Face } from '../types';

export const adjacentFacesMap: Record<Face, { face: Face, rotation: number }[]> = {
  up: [
    { face: 'back', rotation: 2 },
    { face: 'right', rotation: 0 },
    { face: 'front', rotation: 0 },
    { face: 'left', rotation: 0 },
  ],
  down: [
    { face: 'front', rotation: 2 },
    { face: 'right', rotation: 2 },
    { face: 'back', rotation: 0 },
    { face: 'left', rotation: 2 },
  ],
  right: [
    { face: 'up', rotation: -1 },
    { face: 'back', rotation: -1 },
    { face: 'down', rotation: -1 },
    { face: 'front', rotation: -1 },
  ],
  left: [
    { face: 'up', rotation: 1 },
    { face: 'front', rotation: 1 },
    { face: 'down', rotation: 1 },
    { face: 'back', rotation: 1 },
  ],
  front: [
    { face: 'up', rotation: 2 },
    { face: 'right', rotation: 1 },
    { face: 'down', rotation: 0 },
    { face: 'left', rotation: -1 },
  ],
  back: [
    { face: 'down', rotation: 2 },
    { face: 'right', rotation: -1 },
    { face: 'up', rotation: 0 },
    { face: 'left', rotation: 1 },
  ],
};
