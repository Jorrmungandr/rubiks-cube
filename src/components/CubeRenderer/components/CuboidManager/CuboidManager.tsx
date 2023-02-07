import { faceAxisMap } from '../../../../helpers';
import { useConfig, useInstructionQueue } from '../../../../state';
import { CuboidInfo } from '../../../../types';
import { Cuboid } from '../Cuboid/Cuboid';

type CuboidManagerProps = {
  cuboids: CuboidInfo[];
  cubeSideLength: number;
}

export function CuboidManager({ cuboids, cubeSideLength }: CuboidManagerProps) {
  const cuboidMargin = 1.13;
  const cubeWidth = ((cubeSideLength - 1) * cuboidMargin);
  const { currentInstruction } = useInstructionQueue();
  const { config } = useConfig();

  return (
    <>
      {cuboids.map(({ position, colorIndexes }) => {
        const positionsWithMargin = position.map((value) => (value * cuboidMargin) - (cubeWidth / 2)) as [number, number, number];
        const uniqueIdentifier = position.join('-');

        if (currentInstruction) {
          const faceAxis = faceAxisMap[currentInstruction.instruction.face];

          const animation = {
            angle: Math.PI / 2,
            axis: faceAxis.axis,
            axisPosition: faceAxis.position,
            rotation: currentInstruction.instruction.rotation,
            duration: config.movementDelay,
          };

          const shouldBeAnimated = currentInstruction.targetCuboids.includes(uniqueIdentifier);

          return (
            <Cuboid
              key={`${uniqueIdentifier}-${Math.random().toString(16).substring(2, 7)}`}
              position={positionsWithMargin}
              colorIndexes={colorIndexes}
              animation={shouldBeAnimated ? animation : undefined}
            />
          );
        }

        return (
          <Cuboid
            key={uniqueIdentifier}
            position={positionsWithMargin}
            colorIndexes={colorIndexes}
          />
        );
      })}
    </>
  );
};
