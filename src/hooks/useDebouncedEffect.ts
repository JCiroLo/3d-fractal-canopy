import { useEffect } from "react";

type Callback = () => void;
type Dependencies = unknown[];
type Delay = number;

function useDebouncedEffect(callback: Callback, dependencies: Dependencies, delay: Delay = 500) {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [...dependencies, delay]);
}

export default useDebouncedEffect;
