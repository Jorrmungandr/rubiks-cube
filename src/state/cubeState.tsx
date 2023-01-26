import React, {
  createContext, useContext, useMemo, useState,
} from 'react';
import { assembleInitialCube, rotateCube } from '../helpers';
import { Cube } from '../types';

const CubeContext = createContext<{ cube: Cube | null; handleRotation:() => void }>({
  cube: null,
  handleRotation: () => {},
});

type CubeProviderProps = {
  children: React.ReactNode;
  dimensions: [number, number];
};

export function CubeProvider({ children, dimensions }: CubeProviderProps) {
  const [cube, setCube] = useState<Cube>(assembleInitialCube({ dimensions }));

  const handleRotation = () => {
    const rotatedCube = rotateCube({
      previousCube: cube,
      depth: 0,
      face: 'right',
      rotation: 'clockwise',
    });

    setCube(rotatedCube);
  };

  const contextValue = useMemo(
    () => ({
      cube,
      handleRotation,
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
