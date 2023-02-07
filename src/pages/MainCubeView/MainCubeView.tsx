import { Box, Button } from '@chakra-ui/react';
import { useCube } from '../../state';
import { CubeRenderer } from '../../components';

export function MainCubeView() {
  const { cube } = useCube();

  return (
    <Box h="60vh">
      {cube && (
        <CubeRenderer cube={cube} />
      )}
    </Box>
  );
}
