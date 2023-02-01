import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';
import { faceColors } from '../../../../variables';

type CuboidProps = {
  position: [number, number, number];
  colorIndexes: number[];
};

export function Cuboid({ position, colorIndexes }: CuboidProps) {
  const mesh = useRef<Mesh>(null!);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    // mesh.current.rotation.z = Math.sin(elapsedTime);
    // mesh.current.position.y = Math.cos(elapsedTime);
    // mesh.current.rotation.z = -elapsedTime;
  });

  const positionsWithMargin = position.map((value) => value * 1.15) as [number, number, number];

  return (
    <mesh ref={mesh} position={positionsWithMargin}>
      <boxGeometry args={[1, 1, 1]} />
      {colorIndexes.map((colorIndex, index) => (
        <meshBasicMaterial attach={`material-${index}`} color={faceColors[colorIndex] || '#000000'} />
      ))}
    </mesh>
  );
}
