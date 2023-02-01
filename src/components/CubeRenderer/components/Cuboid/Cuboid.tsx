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
    const speedMultiplier = 1;

    if (elapsedTime > (Math.PI * 2) / speedMultiplier) return;

    const distance = Math.sqrt(position[1] ** 2 + position[2] ** 2);

    mesh.current.rotation.x = elapsedTime * speedMultiplier;

    const cuboidAngleInRadians = Math.atan2(position[2], position[1]);

    mesh.current.position.y = Math.cos((elapsedTime + cuboidAngleInRadians) * speedMultiplier) * distance;
    mesh.current.position.z = Math.sin((elapsedTime + cuboidAngleInRadians) * speedMultiplier) * distance;
  });

  return (
    <mesh ref={mesh} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      {colorIndexes.map((colorIndex, index) => (
        <meshBasicMaterial attach={`material-${index}`} color={faceColors[colorIndex] || '#000000'} />
      ))}
    </mesh>
  );
}
