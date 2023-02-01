import { useRef } from 'react';
import { Mesh } from 'three';
import { faceColors } from '../../../../variables';

type CuboidProps = {
  position: [number, number, number];
  colorIndexes: number[];
};

export function Cuboid({ position, colorIndexes }: CuboidProps) {
  const mesh = useRef<Mesh>(null!);

  return (
    <mesh ref={mesh} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      {colorIndexes.map((colorIndex, index) => (
        <meshBasicMaterial attach={`material-${index}`} color={faceColors[colorIndex] || '#000000'} />
      ))}
    </mesh>
  );
}
