import React, { createContext, useContext, useState } from 'react';

const PreloaderContext = createContext();

export const PreloaderProvider = ({ children }) => {
  const [isPreloaderFinished, setIsPreloaderFinished] = useState(false);

  return (
    <PreloaderContext.Provider value={{ isPreloaderFinished, setIsPreloaderFinished }}>
      {children}
    </PreloaderContext.Provider>
  );
};

export const usePreloader = () => {
  return useContext(PreloaderContext);
};
