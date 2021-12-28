import { useEffect, useRef } from 'react';

export const useIsMount = (): boolean => {
  const isMountRef = useRef<boolean>(true);

  useEffect(() => {
    isMountRef.current = false;
  }, []);

  return isMountRef.current;
};
