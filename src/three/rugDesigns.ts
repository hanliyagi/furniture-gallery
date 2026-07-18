import type { FurnitureDesign, FurniturePart } from './designTypes';

export type RugDesignKey = 'rugRound' | 'rugRectangular' | 'rugRunner' | 'rugGeometric';
export type RugDesign = FurnitureDesign<'러그', '러그'>;

const COORDINATE_SYSTEM = Object.freeze({
  origin: 'floor-center' as const,
  axes: Object.freeze({ x: 'right' as const, y: 'up' as const, z: 'front' as const }),
});

// STOENSE round rug: diameter 130 cm, 18 mm thick.
const roundParts: readonly FurniturePart[] = [
  { id: 'round-base', geometry: 'cylinder', size: [0.65, 0.65, 0.012], position: [0, 0.006, 0], material: 'fabricDark' },
  { id: 'round-inset', geometry: 'cylinder', size: [0.60, 0.60, 0.006], position: [0, 0.015, 0], material: 'fabric' },
];

// TIPHEDE flatwoven rug: 120 x 180 cm, 2 mm thick.
const rectangularParts: readonly FurniturePart[] = [
  { id: 'rect-base', geometry: 'box', size: [1.2, 0.001, 1.8], position: [0, 0.0005, 0], material: 'fabricDark' },
  { id: 'rect-inset', geometry: 'box', size: [1.12, 0.001, 1.72], position: [0, 0.0015, 0], material: 'fabricLight' },
];

// Compact studio runner: 70 x 180 cm, 6 mm thick.
const runnerParts: readonly FurniturePart[] = [
  { id: 'runner-base', geometry: 'box', size: [0.70, 0.004, 1.80], position: [0, 0.002, 0], material: 'fabric' },
  { id: 'runner-inset', geometry: 'box', size: [0.62, 0.002, 1.72], position: [0, 0.005, 0], material: 'fabricDark' },
  { id: 'stripe-front', geometry: 'box', size: [0.62, 0.002, 0.08], position: [0, 0.005, 0.68], material: 'fabricLight' },
  { id: 'stripe-back', geometry: 'box', size: [0.62, 0.002, 0.08], position: [0, 0.005, -0.68], material: 'fabricLight' },
];

// BUSENKEL harlequin-pattern rug: a flat base with inset colour blocks keeps
// the pattern visibly woven into a single, floor-contacting rug.
const geometricParts: readonly FurniturePart[] = [
  { id: 'geometric-base', geometry: 'roundedBox', size: [1.30, 0.006, 1.60], radius: 0.018, smoothness: 3, position: [0, 0.003, 0], material: 'fabricLight' },
  { id: 'diamond-teal', geometry: 'box', size: [0.42, 0.003, 0.42], position: [-0.28, 0.0075, 0.30], rotation: [0, Math.PI / 4, 0], material: 'tealFabric' },
  { id: 'diamond-orange', geometry: 'box', size: [0.42, 0.003, 0.42], position: [0.28, 0.0075, -0.30], rotation: [0, Math.PI / 4, 0], material: 'orangeFabric' },
  { id: 'diamond-dark', geometry: 'box', size: [0.32, 0.003, 0.32], position: [0.28, 0.0075, 0.30], rotation: [0, Math.PI / 4, 0], material: 'fabricDark' },
  { id: 'diamond-warm', geometry: 'box', size: [0.32, 0.003, 0.32], position: [-0.28, 0.0075, -0.30], rotation: [0, Math.PI / 4, 0], material: 'orangeFabricDark' },
];

export const RUG_DESIGNS: Readonly<Record<RugDesignKey, RugDesign>> = Object.freeze({
  rugRound: Object.freeze({
    schemaVersion: '1.0', id: 'rug-round', name: '원형 러그', furnitureType: '러그', category: '러그', variant: '원형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.3, depth: 1.3, height: 0.018 }), materials: Object.freeze(['fabric', 'fabricDark'] as const), parts: Object.freeze(roundParts),
  }),
  rugRectangular: Object.freeze({
    schemaVersion: '1.0', id: 'rug-rectangular', name: '직사각형 러그', furnitureType: '러그', category: '러그', variant: '직사각형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.2, depth: 1.8, height: 0.002 }), materials: Object.freeze(['fabricLight', 'fabricDark'] as const), parts: Object.freeze(rectangularParts),
  }),
  rugRunner: Object.freeze({
    schemaVersion: '1.0', id: 'rug-runner', name: '러너형 러그', furnitureType: '러그', category: '러그', variant: '러너형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.70, depth: 1.80, height: 0.006 }), materials: Object.freeze(['fabric', 'fabricLight', 'fabricDark'] as const), parts: Object.freeze(runnerParts),
  }),
  rugGeometric: Object.freeze({
    schemaVersion: '1.0', id: 'rug-geometric', name: '미드센추리 기하학 러그', furnitureType: '러그', category: '러그', variant: '미드센추리 기하학형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.30, depth: 1.60, height: 0.009 }), materials: Object.freeze(['fabricLight', 'fabricDark', 'tealFabric', 'orangeFabric', 'orangeFabricDark'] as const), parts: Object.freeze(geometricParts),
  }),
});
