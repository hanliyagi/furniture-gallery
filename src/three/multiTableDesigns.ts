import type { FurnitureDesign, FurniturePart } from './designTypes';

export type MultiTableDesignKey = 'multiTableCompact' | 'multiTableTwoSeat' | 'multiTableStorage' | 'multiTableGateleg';
export type MultiTableDesign = FurnitureDesign<'다용도 테이블', '다용도 테이블'>;

const COORDINATE_SYSTEM = Object.freeze({
  origin: 'floor-center' as const,
  axes: Object.freeze({ x: 'right' as const, y: 'up' as const, z: 'front' as const }),
});

// GUNDE folding table, 67 x 67 x 73 cm.
const compactParts: readonly FurniturePart[] = [
  { id: 'leg-left-back', geometry: 'box', size: [0.04, 0.69, 0.04], position: [-0.285, 0.345, -0.285], material: 'metal' },
  { id: 'leg-right-back', geometry: 'box', size: [0.04, 0.69, 0.04], position: [0.285, 0.345, -0.285], material: 'metal' },
  { id: 'leg-left-front', geometry: 'box', size: [0.04, 0.69, 0.04], position: [-0.285, 0.345, 0.285], material: 'metal' },
  { id: 'leg-right-front', geometry: 'box', size: [0.04, 0.69, 0.04], position: [0.285, 0.345, 0.285], material: 'metal' },
  { id: 'brace-back', geometry: 'box', size: [0.61, 0.045, 0.035], position: [0, 0.34, -0.285], material: 'metal' },
  { id: 'brace-front', geometry: 'box', size: [0.61, 0.045, 0.035], position: [0, 0.34, 0.285], material: 'metal' },
  { id: 'tabletop', geometry: 'box', size: [0.67, 0.04, 0.67], position: [0, 0.71, 0], material: 'woodLight' },
];

// NÄSINGE two-seat table, 80 x 60 x 75 cm.
const twoSeatParts: readonly FurniturePart[] = [
  { id: 'leg-left-back', geometry: 'box', size: [0.065, 0.70, 0.065], position: [-0.345, 0.35, -0.245], material: 'woodDark' },
  { id: 'leg-right-back', geometry: 'box', size: [0.065, 0.70, 0.065], position: [0.345, 0.35, -0.245], material: 'woodDark' },
  { id: 'leg-left-front', geometry: 'box', size: [0.065, 0.70, 0.065], position: [-0.345, 0.35, 0.245], material: 'woodDark' },
  { id: 'leg-right-front', geometry: 'box', size: [0.065, 0.70, 0.065], position: [0.345, 0.35, 0.245], material: 'woodDark' },
  { id: 'apron-back', geometry: 'box', size: [0.69, 0.09, 0.04], position: [0, 0.655, -0.245], material: 'wood' },
  { id: 'apron-front', geometry: 'box', size: [0.69, 0.09, 0.04], position: [0, 0.655, 0.245], material: 'wood' },
  { id: 'apron-left', geometry: 'box', size: [0.04, 0.09, 0.49], position: [-0.345, 0.655, 0], material: 'wood' },
  { id: 'apron-right', geometry: 'box', size: [0.04, 0.09, 0.49], position: [0.345, 0.655, 0], material: 'wood' },
  { id: 'tabletop', geometry: 'box', size: [0.8, 0.05, 0.6], position: [0, 0.725, 0], material: 'woodLight' },
];

// IKEA VADHOLMA kitchen island: black steel base, dark oak worktop and two open storage levels.
const storageParts: readonly FurniturePart[] = [
  { id: 'cabinet-plinth', geometry: 'box', size: [1.16, 0.05, 0.69], position: [0, 0.025, 0], material: 'metal' },
  { id: 'side-left', geometry: 'box', size: [0.05, 0.84, 0.05], position: [-0.555, 0.445, 0.31], material: 'metal' },
  { id: 'divider-left', geometry: 'box', size: [0.05, 0.84, 0.05], position: [-0.555, 0.445, -0.31], material: 'metal' },
  { id: 'divider-right', geometry: 'box', size: [0.05, 0.84, 0.05], position: [0.555, 0.445, 0.31], material: 'metal' },
  { id: 'side-right', geometry: 'box', size: [0.05, 0.84, 0.05], position: [0.555, 0.445, -0.31], material: 'metal' },
  { id: 'back-panel', geometry: 'box', size: [1.11, 0.05, 0.05], position: [0, 0.80, -0.31], material: 'metal' },
  { id: 'left-shelf', geometry: 'roundedBox', size: [1.11, 0.035, 0.62], radius: 0.012, smoothness: 3, position: [0, 0.22, 0], material: 'woodDark' },
  { id: 'appliance-shelf', geometry: 'roundedBox', size: [1.11, 0.035, 0.62], radius: 0.012, smoothness: 3, position: [0, 0.52, 0], material: 'woodDark' },
  { id: 'right-shelf', geometry: 'box', size: [1.11, 0.04, 0.04], position: [0, 0.70, 0.31], material: 'metal' },
  { id: 'left-door-open', geometry: 'cylinder', size: [0.018, 0.018, 1.10], position: [0, 0.60, 0.31], rotation: [0, 0, Math.PI / 2], material: 'metalLight' },
  { id: 'left-door-handle', geometry: 'cylinder', size: [0.018, 0.018, 0.62], position: [-0.555, 0.60, 0], rotation: [Math.PI / 2, 0, 0], material: 'metalLight' },
  { id: 'drawer-center', geometry: 'box', size: [0.04, 0.20, 0.04], position: [-0.555, 0.20, 0.31], material: 'metal' },
  { id: 'drawer-right', geometry: 'box', size: [0.04, 0.20, 0.04], position: [0.555, 0.20, 0.31], material: 'metal' },
  { id: 'pull-center', geometry: 'cylinder', size: [0.014, 0.014, 0.94], position: [0, 0.1885, 0.22], rotation: [0, 0, Math.PI / 2], material: 'metal' },
  { id: 'pull-right', geometry: 'cylinder', size: [0.014, 0.014, 0.94], position: [0, 0.1885, -0.22], rotation: [0, 0, Math.PI / 2], material: 'metal' },
  { id: 'countertop', geometry: 'roundedBox', size: [1.26, 0.055, 0.79], radius: 0.018, smoothness: 4, position: [0, 0.8725, 0], material: 'woodDark' },
];

// NORDEN gateleg table, fully opened: 152 x 80 x 74 cm.
// The two gate-leg frames run all the way from the floor to the leaves so the
// extended work surface is visibly and physically supported on both sides.
const gatelegParts: readonly FurniturePart[] = [
  { id: 'center-cabinet', geometry: 'box', size: [0.38, 0.64, 0.64], position: [0, 0.34, 0], material: 'wood' },
  { id: 'center-top', geometry: 'roundedBox', size: [0.42, 0.045, 0.80], radius: 0.012, smoothness: 4, position: [0, 0.7175, 0], material: 'woodLight' },
  { id: 'drop-leaf-left', geometry: 'roundedBox', size: [0.55, 0.04, 0.80], radius: 0.012, smoothness: 4, position: [-0.485, 0.72, 0], material: 'woodLight' },
  { id: 'drop-leaf-right', geometry: 'roundedBox', size: [0.55, 0.04, 0.80], radius: 0.012, smoothness: 4, position: [0.485, 0.72, 0], material: 'woodLight' },
  ...[-0.695, 0.695].flatMap((x, frameIndex): FurniturePart[] => [
    { id: `gate-leg-front-${frameIndex + 1}`, geometry: 'box', size: [0.05, 0.70, 0.05], position: [x, 0.35, 0.345], material: 'woodDark' },
    { id: `gate-leg-back-${frameIndex + 1}`, geometry: 'box', size: [0.05, 0.70, 0.05], position: [x, 0.35, -0.345], material: 'woodDark' },
    { id: `gate-rail-${frameIndex + 1}`, geometry: 'box', size: [0.05, 0.055, 0.74], position: [x, 0.63, 0], material: 'wood' },
    { id: `gate-cross-brace-${frameIndex + 1}`, geometry: 'box', size: [0.05, 0.05, 0.72], position: [x, 0.16, 0], material: 'wood' },
  ]),
  ...[-0.11, 0, 0.11].map((x, index): FurniturePart => ({
    id: `drawer-front-${index + 1}`, geometry: 'box', size: [0.09, 0.14, 0.018], position: [x, 0.43, 0.329], material: 'woodLight',
  })),
  ...[-0.11, 0, 0.11].map((x, index): FurniturePart => ({
    id: `drawer-pull-${index + 1}`, geometry: 'cylinder', size: [0.009, 0.009, 0.045], position: [x, 0.43, 0.345], rotation: [Math.PI / 2, 0, 0], material: 'metal',
  })),
];

export const MULTI_TABLE_DESIGNS: Readonly<Record<MultiTableDesignKey, MultiTableDesign>> = Object.freeze({
  multiTableCompact: Object.freeze({
    schemaVersion: '1.0', id: 'multi-table-compact', name: '1인 컴팩트 다용도 테이블', furnitureType: '다용도 테이블', category: '다용도 테이블', variant: '1인 컴팩트형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.67, depth: 0.67, height: 0.73 }), materials: Object.freeze(['metal', 'woodLight'] as const), parts: Object.freeze(compactParts),
  }),
  multiTableTwoSeat: Object.freeze({
    schemaVersion: '1.0', id: 'multi-table-two-seat', name: '2인용 다용도 테이블', furnitureType: '다용도 테이블', category: '다용도 테이블', variant: '2인형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.8, depth: 0.6, height: 0.75 }), materials: Object.freeze(['wood', 'woodLight', 'woodDark'] as const), parts: Object.freeze(twoSeatParts),
  }),
  multiTableStorage: Object.freeze({
    schemaVersion: '1.0', id: 'multi-table-storage', name: '수납 결합 다용도 테이블', furnitureType: '다용도 테이블', category: '다용도 테이블', variant: '수납 결합형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.26, depth: 0.79, height: 0.9 }), materials: Object.freeze(['woodDark', 'metal', 'metalLight'] as const), parts: Object.freeze(storageParts),
  }),
  multiTableGateleg: Object.freeze({
    schemaVersion: '1.0', id: 'multi-table-gateleg', name: '클래식 게이트레그 다용도 테이블', furnitureType: '다용도 테이블', category: '다용도 테이블', variant: '클래식 확장 수납형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.52, depth: 0.80, height: 0.74 }), materials: Object.freeze(['wood', 'woodLight', 'woodDark', 'metal'] as const), parts: Object.freeze(gatelegParts),
  }),
});
