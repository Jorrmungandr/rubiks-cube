import { ChakraProvider } from '@chakra-ui/react';

import { MainCubeView } from './pages';
import { ConfigProvider, CubeProvider, InstructionQueueProvider } from './state';

function App() {
  return (
    <ChakraProvider>
      <ConfigProvider>
        <CubeProvider>
          <InstructionQueueProvider>
            <MainCubeView />
          </InstructionQueueProvider>
        </CubeProvider>
      </ConfigProvider>
    </ChakraProvider>
  );
}

export default App;
