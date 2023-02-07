import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Mesh } from 'three';
import { useConfig } from '../../../../state';
import { Axis } from '../../../../types';
import { faceColors } from '../../../../variables';

type CuboidProps = {
  position: [number, number, number];
  colorIndexes: number[];
  animation?: {
    angle: number;
    duration: number;
    axis: Axis;
    axisPosition: 'start' | 'end';
    rotation: 'clockwise' | 'counterclockwise';
  };
};

export function Cuboid({ position, colorIndexes, animation }: CuboidProps) {
  const mesh = useRef<Mesh>(null!);
  const startingTimeRef = useRef<number | null>(null);
  const hasEndedAnimation = useRef<boolean>(true);

  const axes: Axis[] = ['x', 'y', 'z'];
  const translationAxes = axes.filter((axis) => axis !== animation?.axis);
  const translationAxesIndexes = translationAxes.map((axis) => axes.indexOf(axis));

  useFrame(({ clock }) => {
    if (!animation) return;
    if (hasEndedAnimation.current) return;

    const currentElapsedTime = clock.getElapsedTime();

    if (startingTimeRef.current === null) {
      startingTimeRef.current = currentElapsedTime;
    }

    const elapsedTime = currentElapsedTime - startingTimeRef.current;

    const {
      angle,
      duration,
      axis: rotationAxis,
      axisPosition: rotationAxisPosition,
      rotation,
    } = animation;

    const multiplicationFactor = angle / (duration / 1000);

    const currentAngle = elapsedTime * multiplicationFactor;

    if (currentAngle > angle) {
      startingTimeRef.current = null;
      hasEndedAnimation.current = true;
    }

    const orderedIndexes = rotation === 'clockwise' ? [1, 0] : [0, 1];
    const axisPositionInvertedIndexes = rotationAxisPosition === 'start' ? orderedIndexes.reverse() : orderedIndexes;
    const yAxisInvertedPosition = rotationAxis === 'y' ? axisPositionInvertedIndexes.reverse() : axisPositionInvertedIndexes;

    const [aIndex, bIndex] = yAxisInvertedPosition;

    const aPosition = position[translationAxesIndexes[aIndex]];
    const bPosition = position[translationAxesIndexes[bIndex]];

    const distance = Math.sqrt(aPosition ** 2 + bPosition ** 2);

    const rotationInverter = rotation === 'clockwise' ? 1 : -1;
    const axisPositionInverter = rotationAxisPosition === 'start' ? 1 : -1;

    mesh.current.rotation[rotationAxis] = currentAngle * rotationInverter * axisPositionInverter;

    const cuboidAngleInRadians = Math.atan2(bPosition, aPosition);

    mesh.current.position[translationAxes[aIndex]] = Math.cos(currentAngle + cuboidAngleInRadians) * distance;
    mesh.current.position[translationAxes[bIndex]] = Math.sin(currentAngle + cuboidAngleInRadians) * distance;
  });

  useEffect(() => {
    hasEndedAnimation.current = false;
  }, [JSON.stringify(animation)]);

  return (
    <mesh ref={mesh} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      {colorIndexes.map((colorIndex, index) => {
        const color = faceColors[colorIndex] || '#000000';

        return (
          <meshBasicMaterial key={`${color}-${index}`} attach={`material-${index}`} color={color} />
        );
      })}
    </mesh>
  );
}
