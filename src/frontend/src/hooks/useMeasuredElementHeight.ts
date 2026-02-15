import { useState, useEffect, useRef, RefObject } from 'react';

/**
 * Hook that measures an element's rendered height using ResizeObserver
 * Returns a ref to attach to the element and the measured height
 */
export function useMeasuredElementHeight<T extends HTMLElement = HTMLDivElement>(): [
  RefObject<T | null>,
  number
] {
  const ref = useRef<T | null>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return [ref, height];
}
