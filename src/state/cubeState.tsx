import React, {
  createContext, useContext, useMemo, useState,
} from 'react';
import { assembleInitialCube, rotateCube } from '../helpers';
import { Cube, Instruction } from '../types';
import { useConfig } from './configState';

const CubeContext = createContext<{
  cube: Cube | null;
  handleRotation: (instructions: Instruction[]) => void;
}>({
  cube: null,
  handleRotation: () => { },
});

type CubeProviderProps = {
  children: React.ReactNode;
};

export function CubeProvider({ children }: CubeProviderProps) {
  const { config } = useConfig();

  const [cube, setCube] = useState<Cube>(assembleInitialCube({ dimensions: config.dimensions }));

  const handleRotation = (instructions: Instruction[]) => {
    setCube((previousCube) => {
      const rotatedCube = instructions.reduce((prevCube, currentInstruction) => {
        return rotateCube({
          previousCube: prevCube,
          ...currentInstruction,
        });
      }, previousCube);

      return rotatedCube;
    });
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
