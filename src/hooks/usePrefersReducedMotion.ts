import { useEffect, useState } from 'react';

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function getMediaQueryList(): MediaQueryList | null {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return null;
  return window.matchMedia(REDUCED_MOTION_QUERY);
}

export function usePrefersReducedMotion(): boolean {
  const [mediaQueryList] = useState(getMediaQueryList);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => mediaQueryList?.matches ?? false,
  );

  useEffect(() => {
    if (!mediaQueryList) return;

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    if (typeof mediaQueryList.addEventListener === 'function') {
      mediaQueryList.addEventListener('change', handleChange);
      return () => mediaQueryList.removeEventListener('change', handleChange);
    }

    mediaQueryList.addListener(handleChange);
    return () => mediaQueryList.removeListener(handleChange);
  }, [mediaQueryList]);

  return prefersReducedMotion;
}
