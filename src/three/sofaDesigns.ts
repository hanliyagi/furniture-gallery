import type { FurnitureDesign, FurniturePart } from './designTypes';

export type SofaDesignKey = 'sofaSingle' | 'sofaTwoSeat' | 'sofaModular' | 'sofaClassicEktorp' | 'sofaMidcenturyStockholm';
export type SofaDesign = FurnitureDesign<'소파', '소파'>;

const COORDINATE_SYSTEM = Object.freeze({
  origin: 'floor-center' as const,
  axes: Object.freeze({ x: 'right' as const, y: 'up' as const, z: 'front' as const }),
});

// SÖDERHAMN 1-seat section: 0.93 × 0.99 × 0.83 m.
const singleParts: readonly FurniturePart[] = [
  { id: 'leg-left-front', geometry: 'box', size: [0.06, 0.16, 0.06], position: [-0.37, 0.08, 0.36], material: 'metal' },
  { id: 'leg-left-back', geometry: 'box', size: [0.06, 0.16, 0.06], position: [-0.37, 0.08, -0.34], material: 'metal' },
  { id: 'leg-right-front', geometry: 'box', size: [0.06, 0.16, 0.06], position: [0.37, 0.08, 0.36], material: 'metal' },
  { id: 'leg-right-back', geometry: 'box', size: [0.06, 0.16, 0.06], position: [0.37, 0.08, -0.34], material: 'metal' },
  { id: 'seat-base', geometry: 'roundedBox', size: [0.93, 0.16, 0.91], radius: 0.055, smoothness: 5, position: [0, 0.24, 0.04], material: 'fabricDark' },
  { id: 'seat-cushion', geometry: 'roundedBox', size: [0.85, 0.14, 0.67], radius: 0.06, smoothness: 5, position: [0, 0.39, 0.115], material: 'fabricLight' },
  { id: 'back-support-left', geometry: 'roundedBox', size: [0.055, 0.42, 0.075], radius: 0.018, smoothness: 4, position: [-0.34, 0.39, -0.42], material: 'fabricDark' },
  { id: 'back-support-right', geometry: 'roundedBox', size: [0.055, 0.42, 0.075], radius: 0.018, smoothness: 4, position: [0.34, 0.39, -0.42], material: 'fabricDark' },
  { id: 'back-frame', geometry: 'roundedBox', size: [0.93, 0.46, 0.1], radius: 0.04, smoothness: 5, position: [0, 0.55, -0.445], material: 'fabricDark' },
  { id: 'back-cushion', geometry: 'roundedBox', size: [0.82, 0.44, 0.13], radius: 0.055, smoothness: 5, position: [0, 0.61, -0.36], material: 'fabric' },
];

// GLOSTAD 2-seat sofa: 1.21 × 0.78 × 0.68 m.
const twoSeatParts: readonly FurniturePart[] = [
  { id: 'leg-left-front', geometry: 'box', size: [0.06, 0.23, 0.08], position: [-0.5, 0.115, 0.3], material: 'woodDark' },
  { id: 'leg-left-back', geometry: 'box', size: [0.06, 0.23, 0.08], position: [-0.5, 0.115, -0.3], material: 'woodDark' },
  { id: 'leg-right-front', geometry: 'box', size: [0.06, 0.23, 0.08], position: [0.5, 0.115, 0.3], material: 'woodDark' },
  { id: 'leg-right-back', geometry: 'box', size: [0.06, 0.23, 0.08], position: [0.5, 0.115, -0.3], material: 'woodDark' },
  { id: 'seat-base', geometry: 'roundedBox', size: [1.14, 0.1, 0.78], radius: 0.04, smoothness: 5, position: [0, 0.28, 0], material: 'fabricDark' },
  { id: 'arm-left', geometry: 'roundedBox', size: [0.035, 0.34, 0.78], radius: 0.014, smoothness: 4, position: [-0.5875, 0.4, 0], material: 'fabricDark' },
  { id: 'arm-right', geometry: 'roundedBox', size: [0.035, 0.34, 0.78], radius: 0.014, smoothness: 4, position: [0.5875, 0.4, 0], material: 'fabricDark' },
  { id: 'seat-cushion-left', geometry: 'roundedBox', size: [0.54, 0.08, 0.54], radius: 0.035, smoothness: 5, position: [-0.28, 0.37, 0.06], material: 'fabricLight' },
  { id: 'seat-cushion-right', geometry: 'roundedBox', size: [0.54, 0.08, 0.54], radius: 0.035, smoothness: 5, position: [0.28, 0.37, 0.06], material: 'fabric' },
  { id: 'back-support-left', geometry: 'roundedBox', size: [0.05, 0.34, 0.07], radius: 0.016, smoothness: 4, position: [-0.46, 0.38, -0.35], material: 'fabricDark' },
  { id: 'back-support-right', geometry: 'roundedBox', size: [0.05, 0.34, 0.07], radius: 0.016, smoothness: 4, position: [0.46, 0.38, -0.35], material: 'fabricDark' },
  { id: 'back-frame', geometry: 'roundedBox', size: [1.14, 0.39, 0.1], radius: 0.04, smoothness: 5, position: [0, 0.455, -0.34], material: 'fabricDark' },
  { id: 'back-cushion-left', geometry: 'roundedBox', size: [0.54, 0.27, 0.12], radius: 0.05, smoothness: 5, position: [-0.28, 0.545, -0.28], material: 'fabricLight' },
  { id: 'back-cushion-right', geometry: 'roundedBox', size: [0.54, 0.27, 0.12], radius: 0.05, smoothness: 5, position: [0.28, 0.545, -0.28], material: 'fabric' },
];

// Two JÄTTEBO 1-seat modules: 1.40 × 0.95 × 0.71 m.
const modularParts: readonly FurniturePart[] = [
  { id: 'base-left', geometry: 'roundedBox', size: [0.7, 0.36, 0.95], radius: 0.06, smoothness: 5, position: [-0.35, 0.18, 0], material: 'fabricDark' },
  { id: 'base-right', geometry: 'roundedBox', size: [0.7, 0.36, 0.95], radius: 0.06, smoothness: 5, position: [0.35, 0.18, 0], material: 'fabricDark' },
  { id: 'storage-front-left', geometry: 'box', size: [0.62, 0.22, 0.02], position: [-0.35, 0.17, 0.465], material: 'fabric' },
  { id: 'storage-front-right', geometry: 'box', size: [0.62, 0.22, 0.02], position: [0.35, 0.17, 0.465], material: 'fabric' },
  { id: 'seat-cushion-left', geometry: 'roundedBox', size: [0.66, 0.1, 0.69], radius: 0.045, smoothness: 5, position: [-0.35, 0.41, 0.11], material: 'fabricLight' },
  { id: 'seat-cushion-right', geometry: 'roundedBox', size: [0.66, 0.1, 0.69], radius: 0.045, smoothness: 5, position: [0.35, 0.41, 0.11], material: 'fabric' },
  { id: 'back-support-left', geometry: 'roundedBox', size: [0.055, 0.36, 0.08], radius: 0.018, smoothness: 4, position: [-0.35, 0.34, -0.43], material: 'fabricDark' },
  { id: 'back-support-right', geometry: 'roundedBox', size: [0.055, 0.36, 0.08], radius: 0.018, smoothness: 4, position: [0.35, 0.34, -0.43], material: 'fabricDark' },
  { id: 'back-frame-left', geometry: 'roundedBox', size: [0.7, 0.3, 0.14], radius: 0.05, smoothness: 5, position: [-0.35, 0.51, -0.405], material: 'fabricDark' },
  { id: 'back-frame-right', geometry: 'roundedBox', size: [0.7, 0.3, 0.14], radius: 0.05, smoothness: 5, position: [0.35, 0.51, -0.405], material: 'fabricDark' },
  { id: 'back-cushion-left', geometry: 'roundedBox', size: [0.66, 0.27, 0.14], radius: 0.055, smoothness: 5, position: [-0.35, 0.575, -0.33], material: 'fabricLight' },
  { id: 'back-cushion-right', geometry: 'roundedBox', size: [0.66, 0.27, 0.14], radius: 0.055, smoothness: 5, position: [0.35, 0.575, -0.33], material: 'fabric' },
];

// EKTORP 3-seat sofa: 2.18 × 0.88 × 0.88 m.
const classicEktorpParts: readonly FurniturePart[] = [
  { id: 'floor-skirt', geometry: 'roundedBox', size: [2.18, 0.2, 0.82], radius: 0.07, smoothness: 6, position: [0, 0.1, 0.03], material: 'fabricDark' },
  { id: 'seat-frame', geometry: 'roundedBox', size: [1.76, 0.18, 0.72], radius: 0.065, smoothness: 6, position: [0, 0.29, 0.06], material: 'fabric' },
  { id: 'arm-left', geometry: 'roundedBox', size: [0.24, 0.54, 0.88], radius: 0.1, smoothness: 7, position: [-0.97, 0.37, 0], material: 'fabricLight' },
  { id: 'arm-right', geometry: 'roundedBox', size: [0.24, 0.54, 0.88], radius: 0.1, smoothness: 7, position: [0.97, 0.37, 0], material: 'fabricLight' },
  { id: 'back-frame', geometry: 'roundedBox', size: [1.86, 0.52, 0.16], radius: 0.07, smoothness: 6, position: [0, 0.52, -0.34], material: 'fabricDark' },
  { id: 'seat-cushion-left', geometry: 'roundedBox', size: [0.56, 0.15, 0.58], radius: 0.07, smoothness: 7, position: [-0.59, 0.425, 0.1], material: 'fabricLight' },
  { id: 'seat-cushion-center', geometry: 'roundedBox', size: [0.56, 0.15, 0.58], radius: 0.07, smoothness: 7, position: [0, 0.425, 0.1], material: 'fabric' },
  { id: 'seat-cushion-right', geometry: 'roundedBox', size: [0.56, 0.15, 0.58], radius: 0.07, smoothness: 7, position: [0.59, 0.425, 0.1], material: 'fabricLight' },
  { id: 'back-cushion-left', geometry: 'roundedBox', size: [0.57, 0.43, 0.2], radius: 0.085, smoothness: 7, position: [-0.59, 0.665, -0.24], material: 'fabricLight' },
  { id: 'back-cushion-center', geometry: 'roundedBox', size: [0.57, 0.43, 0.2], radius: 0.085, smoothness: 7, position: [0, 0.665, -0.24], material: 'fabric' },
  { id: 'back-cushion-right', geometry: 'roundedBox', size: [0.57, 0.43, 0.2], radius: 0.085, smoothness: 7, position: [0.59, 0.665, -0.24], material: 'fabricLight' },
];

const marshmallowColors = ['redVinyl', 'yellowVinyl', 'tealFabric', 'blueVinyl', 'orangeFabric'] as const;
const marshmallowSeatRows = [
  { row: 1, y: 0.32, z: 0.22, xs: [-0.375, -0.125, 0.125, 0.375] },
  { row: 2, y: 0.35, z: -0.02, xs: [-0.5, -0.25, 0, 0.25, 0.5] },
] as const;

const marshmallowBackRows = [
  { row: 3, y: 0.49, xs: [-0.5, -0.25, 0, 0.25, 0.5] },
  { row: 4, y: 0.665, xs: [-0.375, -0.125, 0.125, 0.375] },
] as const;

// The original 4-5-5-4 cushion count is retained. The lower nine pads make
// the seat; the upper nine sit at the front ends of the rear mounts so the
// chrome frame remains behind the sitter instead of pressing into their back.
const marshmallowSeatCushions: readonly FurniturePart[] = marshmallowSeatRows.flatMap((row, rowIndex) =>
  row.xs.map((x, columnIndex) => ({
    id: `cushion-${row.row}-${columnIndex + 1}`,
    geometry: 'ellipsoid' as const,
    size: [0.25, 0.10, 0.25] as const,
    position: [x, row.y, row.z] as const,
    material: marshmallowColors[(rowIndex * 2 + columnIndex) % marshmallowColors.length]!,
  })),
);

const marshmallowBackCushions: readonly FurniturePart[] = marshmallowBackRows.flatMap((row, rowIndex) =>
  row.xs.map((x, columnIndex) => ({
    id: `cushion-${row.row}-${columnIndex + 1}`,
    geometry: 'ellipsoid' as const,
    size: [0.25, 0.25, 0.14] as const,
    position: [x, row.y, -0.13] as const,
    material: marshmallowColors[((rowIndex + 2) * 2 + columnIndex) % marshmallowColors.length]!,
  })),
);

const marshmallowSeatMounts: readonly FurniturePart[] = marshmallowSeatRows.flatMap((row) =>
  row.xs.map((x, columnIndex) => ({
    id: `mount-${row.row}-${columnIndex + 1}`,
    geometry: 'cylinder' as const,
    size: [0.012, 0.012, row.row === 1 ? 0.10 : 0.12] as const,
    position: [x, row.row === 1 ? 0.275 : 0.29, row.z] as const,
    material: 'chrome' as const,
  })),
);

const marshmallowBackMounts: readonly FurniturePart[] = marshmallowBackRows.flatMap((row) =>
  row.xs.map((x, columnIndex) => ({
    id: `mount-${row.row}-${columnIndex + 1}`,
    geometry: 'cylinder' as const,
    size: [0.012, 0.012, 0.12] as const,
    rotation: [Math.PI / 2, 0, 0] as const,
    position: [x, row.y, -0.24] as const,
    material: 'chrome' as const,
  })),
);

// Nelson Marshmallow Sofa: 1.32 × 0.74 × 0.79 m, 18 round cushions on a steel frame.
const midcenturyStockholmParts: readonly FurniturePart[] = [
  { id: 'leg-left-front', geometry: 'roundedBox', size: [0.08, 0.025, 0.08], radius: 0.012, smoothness: 4, position: [-0.62, 0.0125, 0.33], material: 'metal' },
  { id: 'leg-left-back', geometry: 'roundedBox', size: [0.08, 0.025, 0.08], radius: 0.012, smoothness: 4, position: [-0.62, 0.0125, -0.33], material: 'metal' },
  { id: 'leg-right-front', geometry: 'roundedBox', size: [0.08, 0.025, 0.08], radius: 0.012, smoothness: 4, position: [0.62, 0.0125, 0.33], material: 'metal' },
  { id: 'leg-right-back', geometry: 'roundedBox', size: [0.08, 0.025, 0.08], radius: 0.012, smoothness: 4, position: [0.62, 0.0125, -0.33], material: 'metal' },
  { id: 'support-left-front', geometry: 'cylinder', size: [0.018, 0.018, 0.21], position: [-0.62, 0.1175, 0.28], material: 'metal' },
  { id: 'support-left-back', geometry: 'cylinder', size: [0.018, 0.018, 0.21], position: [-0.62, 0.1175, -0.28], material: 'metal' },
  { id: 'support-right-front', geometry: 'cylinder', size: [0.018, 0.018, 0.21], position: [0.62, 0.1175, 0.28], material: 'metal' },
  { id: 'support-right-back', geometry: 'cylinder', size: [0.018, 0.018, 0.21], position: [0.62, 0.1175, -0.28], material: 'metal' },
  { id: 'base-side-left', geometry: 'cylinder', size: [0.018, 0.018, 0.56], rotation: [Math.PI / 2, 0, 0], position: [-0.6, 0.2225, 0], material: 'chrome' },
  { id: 'base-side-right', geometry: 'cylinder', size: [0.018, 0.018, 0.56], rotation: [Math.PI / 2, 0, 0], position: [0.6, 0.2225, 0], material: 'chrome' },
  { id: 'seat-rail-front', geometry: 'cylinder', size: [0.018, 0.018, 1.2], rotation: [0, 0, Math.PI / 2], position: [0, 0.245, 0.22], material: 'chrome' },
  { id: 'seat-rail-back', geometry: 'cylinder', size: [0.018, 0.018, 1.2], rotation: [0, 0, Math.PI / 2], position: [0, 0.245, -0.02], material: 'chrome' },
  { id: 'back-upright-left', geometry: 'cylinder', size: [0.018, 0.018, 0.545], position: [-0.6, 0.5125, -0.28], material: 'chrome' },
  { id: 'back-upright-right', geometry: 'cylinder', size: [0.018, 0.018, 0.545], position: [0.6, 0.5125, -0.28], material: 'chrome' },
  { id: 'back-rail-lower', geometry: 'cylinder', size: [0.018, 0.018, 1.2], rotation: [0, 0, Math.PI / 2], position: [0, 0.49, -0.3], material: 'chrome' },
  { id: 'back-rail-upper', geometry: 'cylinder', size: [0.018, 0.018, 1.2], rotation: [0, 0, Math.PI / 2], position: [0, 0.665, -0.3], material: 'chrome' },
  ...marshmallowSeatMounts,
  ...marshmallowBackMounts,
  ...marshmallowSeatCushions,
  ...marshmallowBackCushions,
];

export const SOFA_DESIGNS: Readonly<Record<SofaDesignKey, SofaDesign>> = Object.freeze({
  sofaSingle: Object.freeze({
    schemaVersion: '1.0', id: 'sofa-single', name: '1인용 소파', furnitureType: '소파', category: '소파', variant: '1인형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.93, depth: 0.99, height: 0.83 }), materials: Object.freeze(['metal', 'fabric', 'fabricLight', 'fabricDark'] as const), parts: Object.freeze(singleParts),
  }),
  sofaTwoSeat: Object.freeze({
    schemaVersion: '1.0', id: 'sofa-two-seat', name: '2인용 소파', furnitureType: '소파', category: '소파', variant: '2인형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.21, depth: 0.78, height: 0.68 }), materials: Object.freeze(['woodDark', 'fabric', 'fabricLight', 'fabricDark'] as const), parts: Object.freeze(twoSeatParts),
  }),
  sofaModular: Object.freeze({
    schemaVersion: '1.0', id: 'sofa-modular', name: '모듈형 소파', furnitureType: '소파', category: '소파', variant: '모듈형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.4, depth: 0.95, height: 0.71 }), materials: Object.freeze(['fabric', 'fabricLight', 'fabricDark'] as const), parts: Object.freeze(modularParts),
  }),
  sofaClassicEktorp: Object.freeze({
    schemaVersion: '1.0', id: 'sofa-classic-ektorp', name: '클래식 쿠션 소파', furnitureType: '소파', category: '소파', variant: '클래식 쿠션형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 2.18, depth: 0.88, height: 0.88 }), materials: Object.freeze(['fabric', 'fabricLight', 'fabricDark'] as const), parts: Object.freeze(classicEktorpParts), purchaseUrl: 'https://www.ikea.com/kr/en/p/ektorp-3-seat-sofa-kilanda-light-beige-s49509011/',
  }),
  sofaMidcenturyStockholm: Object.freeze({
    schemaVersion: '1.0', id: 'sofa-midcentury-stockholm', name: '미드센추리 마시멜로 소파', furnitureType: '소파', category: '소파', variant: '미드센추리 컬러 원형 쿠션형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.32, depth: 0.74, height: 0.79 }), materials: Object.freeze(['chrome', 'metal', 'redVinyl', 'yellowVinyl', 'tealFabric', 'blueVinyl', 'orangeFabric'] as const), parts: Object.freeze(midcenturyStockholmParts), purchaseUrl: 'https://hermanmiller.co.jp/collections/furniture-living-room/products/nelson-marshmallow-sofa',
  }),
});
