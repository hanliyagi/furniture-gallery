import type { FurnitureDesign, FurniturePart } from './designTypes';

export type PartitionShelfDesignKey = 'partitionShelfSlim' | 'partitionShelfTranslucent' | 'partitionShelfStorage' | 'partitionShelfKallax';
export type PartitionShelfDesign = FurnitureDesign<'파티션·양면 선반', '파티션·양면 선반'>;

const COORDINATE_SYSTEM = Object.freeze({
  origin: 'floor-center' as const,
  axes: Object.freeze({ x: 'right' as const, y: 'up' as const, z: 'front' as const }),
});

const slimParts: readonly FurniturePart[] = [
  // IKEA NÄMMARÖ: three linked folding slat panels, not a single fixed screen.
  { id: 'foot-left', geometry: 'box', size: [0.50, 0.045, 0.07], position: [-0.47, 0.0225, 0], rotation: [0, -0.28, 0], material: 'woodDark' },
  { id: 'foot-right', geometry: 'box', size: [0.50, 0.045, 0.07], position: [0.47, 0.0225, 0], rotation: [0, 0.28, 0], material: 'woodDark' },
  { id: 'post-left', geometry: 'box', size: [0.045, 1.35, 0.045], position: [-0.72, 0.6975, 0.10], material: 'woodDark' },
  { id: 'post-right', geometry: 'box', size: [0.045, 1.35, 0.045], position: [0.72, 0.6975, 0.10], material: 'woodDark' },
  { id: 'bottom-rail', geometry: 'box', size: [1.50, 0.08, 0.32], position: [0, 0.06, 0], material: 'wood' },
  { id: 'top-rail', geometry: 'box', size: [1.50, 0.08, 0.32], position: [0, 1.37, 0], material: 'wood' },
  ...[-0.18, -0.12, -0.06, 0, 0.06, 0.12, 0.18].map((x, index): FurniturePart => ({
    id: `slat-${index + 1}`, geometry: 'box', size: [0.032, 1.26, 0.026], position: [x, 0.72, 0], material: 'woodLight',
  })),
  ...([-0.47, 0.47] as const).flatMap((x, panelIndex) => [
    { id: `panel-${panelIndex + 1}-inner-post`, geometry: 'box' as const, size: [0.045, 1.35, 0.045] as const, position: [x + (panelIndex === 0 ? 0.25 : -0.25), 0.6975, 0.10] as const, material: 'woodDark' as const },
    ...[-0.18, -0.12, -0.06, 0, 0.06, 0.12, 0.18].map((offset, slatIndex): FurniturePart => ({
      id: `panel-${panelIndex + 1}-slat-${slatIndex + 1}`,
      geometry: 'box', size: [0.032, 1.26, 0.026],
      position: [x + offset, 0.72, 0.14], rotation: [0, panelIndex === 0 ? -0.28 : 0.28, 0], material: 'woodLight',
    })),
    { id: `hinge-${panelIndex + 1}`, geometry: 'cylinder' as const, size: [0.016, 0.016, 1.30] as const, position: [panelIndex === 0 ? -0.25 : 0.25, 0.72, 0.14] as const, material: 'metal' as const },
  ]),
];

const translucentParts: readonly FurniturePart[] = [
  // IKEA RISÖR: three hinged, opaque black-and-white folding room-divider panels.
  { id: 'foot-left', geometry: 'box', size: [0.48, 0.045, 0.07], position: [-0.48, 0.0225, 0], rotation: [0, -0.24, 0], material: 'screenFrame' },
  { id: 'foot-right', geometry: 'box', size: [0.48, 0.045, 0.07], position: [0.48, 0.0225, 0], rotation: [0, 0.24, 0], material: 'screenFrame' },
  { id: 'post-left', geometry: 'box', size: [0.04, 1.48, 0.04], position: [-0.74, 0.76, 0.10], material: 'screenFrame' },
  { id: 'post-right', geometry: 'box', size: [0.04, 1.48, 0.04], position: [0.74, 0.76, 0.10], material: 'screenFrame' },
  { id: 'bottom-rail', geometry: 'box', size: [1.50, 0.08, 0.30], position: [0, 0.04, 0], material: 'screenFrame' },
  { id: 'middle-rail', geometry: 'box', size: [0.50, 0.04, 0.04], position: [0, 0.76, 0], material: 'screenFrame' },
  { id: 'top-rail', geometry: 'box', size: [1.50, 0.08, 0.30], position: [0, 1.48, 0], material: 'screenFrame' },
  { id: 'panel-left', geometry: 'box', size: [0.44, 1.36, 0.018], position: [-0.48, 0.76, 0.06895454053766667], rotation: [0, -0.24, 0], material: 'paintedWhite' },
  { id: 'panel-center', geometry: 'box', size: [0.44, 1.36, 0.018], position: [0, 0.76, 0], material: 'paintedWhite' },
  { id: 'panel-right', geometry: 'box', size: [0.44, 1.36, 0.018], position: [0.48, 0.76, 0.06895454053766667], rotation: [0, 0.24, 0], material: 'paintedWhite' },
  ...([-0.25, 0.25] as const).map((x, index): FurniturePart => ({
    id: `panel-hinge-${index + 1}`, geometry: 'cylinder', size: [0.014, 0.014, 1.36], position: [x, 0.76, 0.10], material: 'screenFrame',
  })),
];

const storageParts: readonly FurniturePart[] = [
  // Same IKEA KALLAX 2 × 4 unit as the linked SKU, presented vertically.
  { id: 'plinth', geometry: 'roundedBox', size: [0.77, 0.04, 0.39], radius: 0.012, smoothness: 3, position: [0, 0.02, 0], material: 'paintedWhite' },
  { id: 'side-left', geometry: 'roundedBox', size: [0.04, 1.43, 0.39], radius: 0.008, smoothness: 3, position: [-0.365, 0.755, 0], material: 'paintedWhite' },
  { id: 'side-right', geometry: 'roundedBox', size: [0.04, 1.43, 0.39], radius: 0.008, smoothness: 3, position: [0.365, 0.755, 0], material: 'paintedWhite' },
  { id: 'center-divider', geometry: 'roundedBox', size: [0.035, 1.43, 0.39], radius: 0.007, smoothness: 3, position: [0, 0.755, 0], material: 'paintedWhite' },
  { id: 'shelf-1', geometry: 'roundedBox', size: [0.69, 0.035, 0.39], radius: 0.007, smoothness: 3, position: [0, 0.36, 0], material: 'paintedWhite' },
  { id: 'shelf-2', geometry: 'roundedBox', size: [0.69, 0.035, 0.39], radius: 0.007, smoothness: 3, position: [0, 0.735, 0], material: 'paintedWhite' },
  { id: 'shelf-3', geometry: 'roundedBox', size: [0.69, 0.035, 0.39], radius: 0.007, smoothness: 3, position: [0, 1.11, 0], material: 'paintedWhite' },
  { id: 'top-panel', geometry: 'roundedBox', size: [0.77, 0.04, 0.39], radius: 0.012, smoothness: 3, position: [0, 1.47, 0], material: 'paintedWhite' },
];

// IKEA KALLAX 4 x 2 shelving unit, laid horizontally as a low room divider.
// The full-depth white panels make eight open cubbies accessible from both sides.
const kallaxParts: readonly FurniturePart[] = [
  { id: 'top-panel', geometry: 'roundedBox', size: [1.47, 0.04, 0.39], radius: 0.012, smoothness: 3, position: [0, 0.75, 0], material: 'paintedWhite' },
  { id: 'bottom-panel', geometry: 'roundedBox', size: [1.47, 0.04, 0.39], radius: 0.012, smoothness: 3, position: [0, 0.02, 0], material: 'paintedWhite' },
  { id: 'side-left', geometry: 'roundedBox', size: [0.04, 0.69, 0.39], radius: 0.008, smoothness: 3, position: [-0.715, 0.385, 0], material: 'paintedWhite' },
  { id: 'side-right', geometry: 'roundedBox', size: [0.04, 0.69, 0.39], radius: 0.008, smoothness: 3, position: [0.715, 0.385, 0], material: 'paintedWhite' },
  { id: 'vertical-divider-left', geometry: 'roundedBox', size: [0.035, 0.69, 0.39], radius: 0.007, smoothness: 3, position: [-0.35, 0.385, 0], material: 'paintedWhite' },
  { id: 'vertical-divider-center', geometry: 'roundedBox', size: [0.035, 0.69, 0.39], radius: 0.007, smoothness: 3, position: [0, 0.385, 0], material: 'paintedWhite' },
  { id: 'vertical-divider-right', geometry: 'roundedBox', size: [0.035, 0.69, 0.39], radius: 0.007, smoothness: 3, position: [0.35, 0.385, 0], material: 'paintedWhite' },
  { id: 'horizontal-divider', geometry: 'roundedBox', size: [1.32, 0.035, 0.39], radius: 0.007, smoothness: 3, position: [0, 0.385, 0], material: 'paintedWhite' },
];

export const PARTITION_SHELF_DESIGNS: Readonly<Record<PartitionShelfDesignKey, PartitionShelfDesign>> = Object.freeze({
  partitionShelfSlim: Object.freeze({
    schemaVersion: '1.0', id: 'partition-shelf-slim', name: '슬림 파티션', furnitureType: '파티션·양면 선반', category: '파티션·양면 선반', variant: '슬림 파티션', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.5, depth: 0.32, height: 1.41 }), materials: Object.freeze(['metal', 'wood', 'woodLight', 'woodDark'] as const), parts: Object.freeze(slimParts),
  }),
  partitionShelfTranslucent: Object.freeze({
    schemaVersion: '1.0', id: 'partition-shelf-translucent', name: '반투명 파티션', furnitureType: '파티션·양면 선반', category: '파티션·양면 선반', variant: '반투명형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.52, depth: 0.30, height: 1.52 }), materials: Object.freeze(['paintedWhite', 'screenFrame'] as const), parts: Object.freeze(translucentParts),
  }),
  partitionShelfStorage: Object.freeze({
    schemaVersion: '1.0', id: 'partition-shelf-storage', name: '수납 결합 양면 선반', furnitureType: '파티션·양면 선반', category: '파티션·양면 선반', variant: '수납 결합형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.77, depth: 0.39, height: 1.49 }), materials: Object.freeze(['paintedWhite'] as const), parts: Object.freeze(storageParts),
  }),
  partitionShelfKallax: Object.freeze({
    schemaVersion: '1.0', id: 'partition-shelf-kallax', name: '오픈 수납 파티션 선반', furnitureType: '파티션·양면 선반', category: '파티션·양면 선반', variant: '오픈 수납 취미형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.47, depth: 0.39, height: 0.77 }), materials: Object.freeze(['paintedWhite'] as const), parts: Object.freeze(kallaxParts),
  }),
});
