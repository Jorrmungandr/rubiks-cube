import React, {
  createContext, useContext, useMemo, useState,
} from 'react';
import { assembleInitialCube, rotateCube } from '../helpers';
import { Cube, Face } from '../types';

const CubeContext = createContext<{ cube: Cube | null; handleRotation: () => void }>({
  cube: null,
  handleRotation: () => { },
});

type CubeProviderProps = {
  children: React.ReactNode;
  dimensions: [number, number];
};

export function CubeProvider({ children, dimensions }: CubeProviderProps) {
  const [cube, setCube] = useState<Cube>(assembleInitialCube({ dimensions }));

  const handleRotation = () => {
    const instructions: { depth: number; face: Face; rotation: 'clockwise' | 'counterclockwise' }[] = [
      {
        depth: 0,
        face: 'up',
        rotation: 'counterclockwise',
      },
    ];

    const rotatedCube = instructions.reduce((prevCube, currentInstruction) => {
      return rotateCube({
        previousCube: prevCube,
        ...currentInstruction,
      });
    }, cube);

    setCube(rotatedCube);
  };

  const contextValue = useMemo(
    () => ({
      cube,
      handleRotation,
      dimensions,
    }),
    [cube],
  );

  return (
    <CubeContext.Provider value={contextValue}>
      {children}
    </CubeContext.Provider>
  );
}

export const useCube = () => useContext(CubeContext);
