import { Face } from '../types';

export const oposingFacesMap: Record<Face, Face> = {
  up: 'down',
  down: 'up',
  right: 'left',
  left: 'right',
  front: 'back',
  back: 'front',
};
