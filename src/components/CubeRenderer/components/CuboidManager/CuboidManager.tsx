import { CuboidInfo } from '../../../../types';
import { Cuboid } from '../Cuboid/Cuboid';

type CuboidManagerProps = {
  cuboids: CuboidInfo[];
  cubeSideLength: number;
}

export function CuboidManager({ cuboids, cubeSideLength }: CuboidManagerProps) {
  const cuboidMargin = 1.15;
  const cubeWidth = ((cubeSideLength - 1) * cuboidMargin);

  return (
    <>
      {cuboids.map(({ position, colorIndexes }) => {
        const positionsWithMargin = position.map((value) => (value * cuboidMargin) - (cubeWidth / 2)) as [number, number, number];

        return (
          <Cuboid
            position={positionsWithMargin}
            colorIndexes={colorIndexes}
          />
        );
      })}
    </>
  );
};
