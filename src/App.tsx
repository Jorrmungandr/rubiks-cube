import { ChakraProvider } from '@chakra-ui/react';

import { MainCubeView } from './pages';
import { CubeProvider } from './state';

function App() {
  return (
    <ChakraProvider>
      <CubeProvider dimensions={[3, 3]}>
        <MainCubeView />
      </CubeProvider>
    </ChakraProvider>
  );
}

export default App;
