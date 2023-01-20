import { ChakraProvider } from '@chakra-ui/react';

import { MainCubeView } from './pages';

function App() {
  return (
    <ChakraProvider>
      <MainCubeView />
    </ChakraProvider>
  );
}

export default App;
