import { Axis, Face, Instruction } from '../types';

type GetCuboidsForInstructionProps = {
  instruction: Instruction;
  cubeSideLength: number;
}

export const faceAxisMap: Record<Face, { axis: Axis, position: 'start' | 'end' }> = {
  left: { axis: 'x', position: 'start' },
  right: { axis: 'x', position: 'end' },
  down: { axis: 'y', position: 'start' },
  up: { axis: 'y', position: 'end' },
  back: { axis: 'z', position: 'start' },
  front: { axis: 'z', position: 'end' },
};

export const getCuboidsForInstruction = ({ instruction, cubeSideLength }: GetCuboidsForInstructionProps) => {
  const cuboidPositions = [];

  for (let x = 0; x < cubeSideLength; x += 1) {
    for (let y = 0; y < cubeSideLength; y += 1) {
      for (let z = 0; z < cubeSideLength; z += 1) {
        cuboidPositions.push([x, y, z]);
      }
    }
  }

  const { axis, position } = faceAxisMap[instruction.face];

  const axes: Axis[] = ['x', 'y', 'z'];
  const axisIndex = axes.indexOf(axis);

  const index = position === 'start' ? 0 : cubeSideLength - 1;

  const adjustedIndex = index + (position === 'start' ? instruction.depth : -instruction.depth);

  const cuboids = cuboidPositions.filter((position) => position[axisIndex] === adjustedIndex);

  return cuboids.map((position) => position.join('-'));
};