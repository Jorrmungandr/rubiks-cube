import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import { getCuboidsForInstruction, waitForMs } from '../helpers';
import { Instruction } from '../types';
import { sixStarsInstructions } from '../variables/patterns';
import { useConfig } from './configState';
import { useCube } from './cubeState';

const InstructionQueueContext = createContext<{
  currentInstruction: {
    instruction: Instruction;
    targetCuboids: string[];
  } | null;
  executeInstructions: (instructions: Instruction[]) => void,
}>({
  currentInstruction: null,
  executeInstructions: () => {},
});

type InstructionQueueProviderProps = {
  children: React.ReactNode;
};

export function InstructionQueueProvider({ children }: InstructionQueueProviderProps) {
  const { config } = useConfig();
  const { handleRotation } = useCube();

  const [currentInstruction, setCurrentInstruction] = useState<{
    instruction: Instruction;
    targetCuboids: string[];
  } | null>(null);

  const executeInstructions = async (instructions: Instruction[]) => {
    for (let i = 0; i < instructions.length; i += 1) {
      const targetCuboids = getCuboidsForInstruction({
        cubeSideLength: config.dimensions[0],
        instruction: instructions[i],
      });

      setCurrentInstruction({
        instruction: instructions[i],
        targetCuboids,
      });

      await waitForMs(config.movementDelay);

      if (i === instructions.length - 1) {
        setCurrentInstruction(null);
      }

      handleRotation([instructions[i]]);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      executeInstructions(sixStarsInstructions);
    }, 3000);
  }, []);

  return (
    <InstructionQueueContext.Provider value={{ currentInstruction, executeInstructions }}>
      {children}
    </InstructionQueueContext.Provider>
  );
}

export const useInstructionQueue = () => useContext(InstructionQueueContext);
