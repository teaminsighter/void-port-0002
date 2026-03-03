'use client';

import { useState, useCallback, createContext, useContext } from 'react';
import Preloader from './Preloader';
import CustomCursor from './CustomCursor';
import { useLenis } from '@/hooks/useLenis';

const LoadedContext = createContext(false);
export const useLoaded = () => useContext(LoadedContext);

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <LoadedContext.Provider value={loaded}>
      <Preloader onComplete={handlePreloaderComplete} />
      <CustomCursor />
      {children}
    </LoadedContext.Provider>
  );
}
