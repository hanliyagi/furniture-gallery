import { useCallback, useEffect, useRef, useState } from 'react';
import type { RefCallback } from 'react';

const DEFAULT_ROOT_MARGIN = '240px 0px';

export interface NearViewportState {
  ref: RefCallback<Element>;
  isNearViewport: boolean;
}

function canObserveIntersections(): boolean {
  return (
    typeof window !== 'undefined' && typeof window.IntersectionObserver === 'function'
  );
}

export function useNearViewport(rootMargin = DEFAULT_ROOT_MARGIN): NearViewportState {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<Element | null>(null);
  const [isNearViewport, setIsNearViewport] = useState(() => !canObserveIntersections());

  const disconnectObserver = useCallback(() => {
    if (!observerRef.current) return;

    observerRef.current.disconnect();
    observerRef.current = null;
  }, []);

  const ref = useCallback<RefCallback<Element>>(
    (element) => {
      disconnectObserver();
      elementRef.current = element;

      if (!element) return;

      if (!canObserveIntersections()) {
        setIsNearViewport(true);
        return;
      }

      setIsNearViewport(false);
      const observer = new window.IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (
            !entry ||
            observerRef.current !== observer ||
            elementRef.current !== element
          ) {
            return;
          }

          setIsNearViewport(entry.isIntersecting);
        },
        { rootMargin },
      );

      observerRef.current = observer;
      observer.observe(element);
    },
    [disconnectObserver, rootMargin],
  );

  useEffect(
    () => () => {
      elementRef.current = null;
      disconnectObserver();
    },
    [disconnectObserver],
  );

  return { ref, isNearViewport };
}
