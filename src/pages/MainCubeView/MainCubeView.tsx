import { Box, Button } from '@chakra-ui/react';
import { useCube } from '../../state';
import { CubeRenderer } from '../../components';

export function MainCubeView() {
  const { cube, handleRotation } = useCube();

  return (
    <Box h="60vh">
      <CubeRenderer cube={cube} />
      <Button onClick={handleRotation}>
        rotate
      </Button>
    </Box>
  );
}
