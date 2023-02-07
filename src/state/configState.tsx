import React, {
  createContext,
  useContext,
  useState,
} from 'react';

type Config = {
  dimensions: [number, number];
  movementDelay: number;
};

const initialConfig: Config = {
  dimensions: [3, 3],
  movementDelay: 700,
};

const ConfigContext = createContext<{
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
}>({
  config: initialConfig,
  setConfig: () => {},
});

type ConfigProviderProps = {
  children: React.ReactNode;
};

export function ConfigProvider({ children }: ConfigProviderProps) {
  const [config, setConfig] = useState<Config>(initialConfig);

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

export const useConfig = () => useContext(ConfigContext);
