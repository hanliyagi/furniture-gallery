import { describe, expect, it } from 'vitest';
import { getScenePolicy } from '../src/three/modelRegistry';

const CARD_DESKTOP_OPTIONS = {
  detail: false,
  reducedMotion: false,
  mobile: false,
} as const;

describe('getScenePolicy', () => {
  it('returns a reusable immutable card policy with rotation-only controls', () => {
    const policy = getScenePolicy(CARD_DESKTOP_OPTIONS);

    expect(policy).toMatchObject({
      enableZoom: false,
      enablePan: false,
      autoRotate: true,
    });
    expect(policy.dpr).toEqual([1, 1.5]);
    expect(Object.isFrozen(policy)).toBe(true);
    expect(Object.isFrozen(policy.dpr)).toBe(true);
    expect(getScenePolicy(CARD_DESKTOP_OPTIONS)).toBe(policy);
  });

  it('enables zoom and pan for detail controls without automatic rotation', () => {
    expect(
      getScenePolicy({ detail: true, reducedMotion: false, mobile: false }),
    ).toMatchObject({
      enableZoom: true,
      enablePan: true,
      autoRotate: false,
    });
  });

  it('disables automatic rotation when reduced motion is preferred', () => {
    expect(
      getScenePolicy({ detail: false, reducedMotion: true, mobile: false }).autoRotate,
    ).toBe(false);
  });

  it('uses a slower automatic rotation speed on mobile', () => {
    const desktop = getScenePolicy(CARD_DESKTOP_OPTIONS);
    const mobile = getScenePolicy({ detail: false, reducedMotion: false, mobile: true });

    expect(mobile.autoRotateSpeed).toBeLessThan(desktop.autoRotateSpeed);
    expect(mobile.autoRotateSpeed).toBeGreaterThan(0);
  });
});
