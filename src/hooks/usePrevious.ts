import { useEffect, useRef } from 'react';

const usePrevious = <T>(val: T) => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = val;
  }, [val]);

  return ref.current;
}

export default usePrevious;