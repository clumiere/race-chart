import { useRef, useEffect, useCallback } from 'react';

const useInterval = (fn: () => any, delay: number) => {
  const callbackRef = useRef(fn);
  const timerRef = useRef<number>();

  useEffect(() => {
    callbackRef.current = fn;
  }, [fn]);

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      callbackRef.current();
    }, delay);

    return () => {
      window.clearInterval(timerRef.current);
    }
  }, [delay]);

  const clear = useCallback(() => {
    window.clearInterval(timerRef.current);
  }, []);

  return { clear };
}

export default useInterval;