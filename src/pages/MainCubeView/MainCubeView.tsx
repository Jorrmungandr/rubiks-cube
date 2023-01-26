import { Box, Button } from '@chakra-ui/react';
import { useCube } from '../../state';

export function MainCubeView() {
  const { cube, handleRotation } = useCube();

  return (
    <Box>
      Cube
      <Button onClick={handleRotation}>
        rotate
      </Button>
    </Box>
  );
}
