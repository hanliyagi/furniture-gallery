import type { FurnitureDesign, FurniturePart } from './designTypes';

export type FullLengthMirrorDesignKey = 'mirrorStanding' | 'mirrorWall' | 'mirrorStorage' | 'mirrorClassicRounded';
export type FullLengthMirrorDesign = FurnitureDesign<'전신거울', '전신거울'>;

const COORDINATE_SYSTEM = Object.freeze({
  origin: 'floor-center' as const,
  axes: Object.freeze({ x: 'right' as const, y: 'up' as const, z: 'front' as const }),
});

const standingParts: readonly FurniturePart[] = [
  { id: 'base-foot', geometry: 'box', size: [0.44, 0.03, 0.36], position: [0, 0.015, 0], material: 'screenFrame' },
  { id: 'frame-left', geometry: 'roundedBox', size: [0.035, 1.55, 0.04], radius: 0.008, smoothness: 4, position: [-0.2075, 0.80, 0.03], material: 'screenFrame' },
  { id: 'frame-right', geometry: 'roundedBox', size: [0.035, 1.55, 0.04], radius: 0.008, smoothness: 4, position: [0.2075, 0.80, 0.03], material: 'screenFrame' },
  { id: 'frame-top', geometry: 'roundedBox', size: [0.45, 0.035, 0.04], radius: 0.008, smoothness: 4, position: [0, 1.575, 0.03], material: 'screenFrame' },
  { id: 'frame-bottom', geometry: 'roundedBox', size: [0.45, 0.035, 0.04], radius: 0.008, smoothness: 4, position: [0, 0.025, 0.03], material: 'screenFrame' },
  { id: 'mirror-panel', geometry: 'box', size: [0.38, 1.46, 0.012], position: [0, 0.80, 0.056], material: 'mirror' },
  { id: 'rear-stand', geometry: 'box', size: [0.035, 1.30, 0.035], position: [0, 0.665, -0.14], material: 'screenFrame' },
  { id: 'rear-clothes-rail', geometry: 'cylinder', size: [0.012, 0.012, 0.35], position: [0, 1.12, -0.13], rotation: [0, 0, Math.PI / 2], material: 'metal' },
  { id: 'ornament-top', geometry: 'ellipsoid', size: [0.13, 0.09, 0.04], position: [0, 1.6375, 0.03], material: 'screenFrame' },
  { id: 'rear-hook-left', geometry: 'cylinder', size: [0.01, 0.01, 0.10], position: [-0.12, 1.105, -0.10], rotation: [Math.PI / 2, 0, 0], material: 'metal' },
  { id: 'rear-hook-right', geometry: 'cylinder', size: [0.01, 0.01, 0.10], position: [0.12, 1.105, -0.10], rotation: [Math.PI / 2, 0, 0], material: 'metal' },
];

const wallParts: readonly FurniturePart[] = [
  { id: 'wall-frame', geometry: 'box', size: [0.42, 1.55, 0.04], position: [0, 0.775, 0.004], material: 'screenFrame' },
  { id: 'wall-mirror-panel', geometry: 'box', size: [0.35, 1.45, 0.012], position: [0, 0.775, 0.03], material: 'mirror' },
  { id: 'mounting-bracket-upper', geometry: 'box', size: [0.20, 0.05, 0.02], position: [0, 1.34, -0.026], material: 'metal' },
  { id: 'mounting-bracket-lower', geometry: 'box', size: [0.20, 0.05, 0.02], position: [0, 0.21, -0.026], material: 'metal' },
];

const storageParts: readonly FurniturePart[] = [
  { id: 'bottom-panel', geometry: 'box', size: [0.48, 0.035, 0.36], position: [0, 0.0175, 0], material: 'paintedWhite' },
  { id: 'back-panel', geometry: 'box', size: [0.035, 1.47, 0.035], position: [0, 0.77, -0.14], material: 'paintedWhite' },
  { id: 'side-left', geometry: 'box', size: [0.035, 1.55, 0.035], position: [-0.225, 0.7925, 0.02], material: 'paintedWhite' },
  { id: 'center-divider', geometry: 'box', size: [0.035, 1.47, 0.035], position: [0, 0.77, -0.14], material: 'paintedWhite' },
  { id: 'side-right', geometry: 'box', size: [0.035, 1.55, 0.035], position: [0.225, 0.7925, 0.02], material: 'paintedWhite' },
  { id: 'top-panel', geometry: 'box', size: [0.48, 0.035, 0.035], position: [0, 1.5675, 0.02], material: 'paintedWhite' },
  { id: 'storage-shelf-lower', geometry: 'cylinder', size: [0.012, 0.012, 0.34], position: [0, 0.48, -0.12], rotation: [0, 0, Math.PI / 2], material: 'metal' },
  { id: 'storage-shelf-upper', geometry: 'cylinder', size: [0.012, 0.012, 0.34], position: [0, 1.24, -0.12], rotation: [0, 0, Math.PI / 2], material: 'metal' },
  { id: 'storage-mirror-panel', geometry: 'box', size: [0.415, 1.45, 0.012], position: [0, 0.80, 0.04], material: 'mirror' },
  { id: 'rear-hook-left', geometry: 'cylinder', size: [0.01, 0.01, 0.09], position: [-0.11, 1.24, -0.12], rotation: [Math.PI / 2, 0, 0], material: 'metal' },
  { id: 'rear-hook-right', geometry: 'cylinder', size: [0.01, 0.01, 0.09], position: [0.11, 1.24, -0.12], rotation: [Math.PI / 2, 0, 0], material: 'metal' },
];

// HOVET is a wide wall mirror; only a small lower spacer and rear anchor are modelled.
const classicRoundedParts: readonly FurniturePart[] = [
  { id: 'base-foot', geometry: 'box', size: [0.78, 0.016, 0.06], position: [0, 0.008, -0.0185], material: 'woodDark' },
  { id: 'rounded-frame', geometry: 'roundedBox', size: [0.78, 1.96, 0.05], radius: 0.006, smoothness: 4, position: [0, 0.988, 0.0115], material: 'woodDark' },
  { id: 'mirror-panel', geometry: 'box', size: [0.70, 1.88, 0.012], position: [0, 0.988, 0.0425], material: 'mirror' },
  { id: 'rear-stand', geometry: 'box', size: [0.16, 0.035, 0.02], position: [0, 1.72, -0.0085], material: 'metal' },
];

export const FULL_LENGTH_MIRROR_DESIGNS: Readonly<Record<FullLengthMirrorDesignKey, FullLengthMirrorDesign>> = Object.freeze({
  mirrorStanding: Object.freeze({
    schemaVersion: '1.0', id: 'mirror-standing', name: '스탠드형 전신거울', furnitureType: '전신거울', category: '전신거울', variant: '스탠드형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.45, depth: 0.36, height: 1.6825 }), materials: Object.freeze(['screenFrame', 'metal', 'mirror'] as const), parts: Object.freeze(standingParts),
  }),
  mirrorWall: Object.freeze({
    schemaVersion: '1.0', id: 'mirror-wall', name: '벽걸이형 전신거울', furnitureType: '전신거울', category: '전신거울', variant: '벽걸이형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.42, depth: 0.072, height: 1.55 }), materials: Object.freeze(['screenFrame', 'metal', 'mirror'] as const), parts: Object.freeze(wallParts),
  }),
  mirrorStorage: Object.freeze({
    schemaVersion: '1.0', id: 'mirror-storage', name: '수납 결합 전신거울', furnitureType: '전신거울', category: '전신거울', variant: '수납 결합형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.485, depth: 0.36, height: 1.585 }), materials: Object.freeze(['paintedWhite', 'metal', 'mirror'] as const), parts: Object.freeze(storageParts),
  }),
  mirrorClassicRounded: Object.freeze({
    schemaVersion: '1.0', id: 'mirror-classic-rounded', name: '내추럴 와이드 전신거울', furnitureType: '전신거울', category: '전신거울', variant: '내추럴 와이드 스탠드형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.78, depth: 0.097, height: 1.968 }), materials: Object.freeze(['woodDark', 'metal', 'mirror'] as const), parts: Object.freeze(classicRoundedParts), purchaseUrl: 'https://www.ikea.com/kr/ko/p/hovet-mirror-oak-effect-brown-20625600/',
  }),
});
