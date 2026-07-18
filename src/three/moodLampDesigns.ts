import type { FurnitureDesign, FurniturePart, Vector3Tuple } from './designTypes';

export type MoodLampDesignKey = 'lampTable' | 'lampFloor' | 'lampIndirect' | 'lampMidcenturyGlobe';
export type MoodLampDesign = FurnitureDesign<'무드등', '무드등'>;

const COORDINATE_SYSTEM = Object.freeze({
  origin: 'floor-center' as const,
  axes: Object.freeze({ x: 'right' as const, y: 'up' as const, z: 'front' as const }),
});

const tableParts: readonly FurniturePart[] = [
  { id: 'table-base', geometry: 'cylinder', size: [0.12, 0.12, 0.04], position: [0, 0.02, 0], material: 'metal' },
  { id: 'table-stem', geometry: 'cylinder', size: [0.015, 0.018, 0.25], position: [0, 0.165, 0], material: 'metalLight' },
  { id: 'table-bulb', geometry: 'ellipsoid', size: [0.09, 0.11, 0.09], position: [0, 0.34, 0], material: 'light' },
  { id: 'table-shade', geometry: 'cylinder', size: [0.09, 0.14, 0.18], position: [0, 0.37, 0], material: 'lampShade' },
];

const floorParts: readonly FurniturePart[] = [
  { id: 'floor-base', geometry: 'cylinder', size: [0.20, 0.20, 0.04], position: [0, 0.02, 0], material: 'metal' },
  { id: 'floor-stem', geometry: 'cylinder', size: [0.018, 0.022, 1.20], position: [0, 0.64, 0], material: 'metalLight' },
  { id: 'floor-bulb', geometry: 'ellipsoid', size: [0.13, 0.15, 0.13], position: [0, 1.28, 0], material: 'light' },
  { id: 'floor-shade', geometry: 'cylinder', size: [0.15, 0.26, 0.28], position: [0, 1.34, 0], material: 'lampShade' },
];

const indirectParts: readonly FurniturePart[] = [
  { id: 'led-bottom-pad', geometry: 'cylinder', size: [0.095, 0.095, 0.016], position: [0, 0.008, 0], material: 'paintedWhite' },
  { id: 'led-wood-base', geometry: 'cylinder', size: [0.072, 0.075, 0.030], position: [0, 0.031, 0], material: 'paintedWhite' },
  { id: 'led-inner-light', geometry: 'roundedBox', size: [0.045, 0.255, 0.045], radius: 0.014, smoothness: 4, position: [0, 0.1735, 0], material: 'paintedWhite' },
  { id: 'led-diffuser', geometry: 'roundedBox', size: [0.135, 0.075, 0.040], radius: 0.020, smoothness: 4, position: [0, 0.325, 0.015], material: 'ledDiffuser' },
  { id: 'led-top-glow', geometry: 'roundedBox', size: [0.105, 0.012, 0.025], radius: 0.006, smoothness: 3, position: [0, 0.3685, 0.025], material: 'light' },
];

// A low coloured-glass globe lamp, suitable for a lounge or media corner.
const midcenturyGlobeParts: readonly FurniturePart[] = [
  { id: 'globe-base', geometry: 'cylinder', size: [0.14, 0.14, 0.02], position: [0, 0.01, 0], material: 'redPlastic' },
  { id: 'globe-neck', geometry: 'cylinder', size: [0.09, 0.09, 0.06], position: [0, 0.04, 0], material: 'redPlastic' },
  { id: 'globe-light', geometry: 'ellipsoid', size: [0.22, 0.22, 0.22], position: [0, 0.17, 0], material: 'light' },
  { id: 'globe-diffuser', geometry: 'ellipsoid', size: [0.23, 0.23, 0.23], position: [0, 0.17, 0], material: 'ledDiffuser' },
];

export interface MoodLampLightConfig {
  readonly position: Vector3Tuple;
  readonly intensity: number;
  readonly distance: number;
}

export const MOOD_LAMP_LIGHTS: Readonly<Record<MoodLampDesignKey, MoodLampLightConfig>> = Object.freeze({
  lampTable: Object.freeze({ position: [0, 0.35, 0.03] as const, intensity: 8, distance: 1.5 }),
  lampFloor: Object.freeze({ position: [0, 1.31, 0.03] as const, intensity: 12, distance: 2.6 }),
  lampIndirect: Object.freeze({ position: [0, 0.35, 0.04] as const, intensity: 10, distance: 1.8 }),
  lampMidcenturyGlobe: Object.freeze({ position: [0, 0.17, 0] as const, intensity: 9, distance: 1.7 }),
});

export const MOOD_LAMP_DESIGNS: Readonly<Record<MoodLampDesignKey, MoodLampDesign>> = Object.freeze({
  lampTable: Object.freeze({
    schemaVersion: '1.0', id: 'lamp-table', name: '테이블 무드등', furnitureType: '무드등', category: '무드등', variant: '테이블 램프형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.28, depth: 0.28, height: 0.46 }), materials: Object.freeze(['metal', 'metalLight', 'lampShade', 'light'] as const), parts: Object.freeze(tableParts),
  }),
  lampFloor: Object.freeze({
    schemaVersion: '1.0', id: 'lamp-floor', name: '스탠드 무드등', furnitureType: '무드등', category: '무드등', variant: '스탠드형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.52, depth: 0.52, height: 1.48 }), materials: Object.freeze(['metal', 'metalLight', 'lampShade', 'light'] as const), parts: Object.freeze(floorParts),
  }),
  lampIndirect: Object.freeze({
    schemaVersion: '1.0', id: 'lamp-indirect', name: 'LED 무드등', furnitureType: '무드등', category: '무드등', variant: 'LED 단스탠드형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.19, depth: 0.19, height: 0.3745 }), materials: Object.freeze(['paintedWhite', 'ledDiffuser', 'light'] as const), parts: Object.freeze(indirectParts),
  }),
  lampMidcenturyGlobe: Object.freeze({
    schemaVersion: '1.0', id: 'lamp-midcentury-globe', name: '미드센추리 글로브 무드등', furnitureType: '무드등', category: '무드등', variant: '미드센추리 글로브형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.28, depth: 0.28, height: 0.285 }), materials: Object.freeze(['redPlastic', 'ledDiffuser', 'light'] as const), parts: Object.freeze(midcenturyGlobeParts), purchaseUrl: 'https://www.ikea.com/kr/ko/p/fado-table-lamp-pink-glass-60592631/',
  }),
});
