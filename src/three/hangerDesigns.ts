import type { FurnitureDesign, FurniturePart } from './designTypes';

export type HangerDesignKey = 'hangerBasic' | 'hangerShelf' | 'hangerCorner' | 'hangerNaturalMorsning';
export type HangerDesign = FurnitureDesign<'행거', '행거'>;

const COORDINATE_SYSTEM = Object.freeze({
  origin: 'floor-center' as const,
  axes: Object.freeze({ x: 'right' as const, y: 'up' as const, z: 'front' as const }),
});

const basicParts: readonly FurniturePart[] = [
  // IKEA RIGGA: white adjustable rack with a shoe shelf and four casters.
  { id: 'foot-left', geometry: 'box', size: [0.11, 0.045, 0.51], position: [-0.5, 0.07, 0], material: 'paintedWhite' },
  { id: 'foot-right', geometry: 'box', size: [0.11, 0.045, 0.51], position: [0.5, 0.07, 0], material: 'paintedWhite' },
  { id: 'post-left', geometry: 'cylinder', size: [0.022, 0.022, 1.59], position: [-0.5, 0.8625, 0], material: 'paintedWhite' },
  { id: 'post-right', geometry: 'cylinder', size: [0.022, 0.022, 1.59], position: [0.5, 0.8625, 0], material: 'paintedWhite' },
  { id: 'left-extension', geometry: 'cylinder', size: [0.017, 0.017, 0.26], position: [-0.5, 1.598, 0], material: 'metalLight' },
  { id: 'right-extension', geometry: 'cylinder', size: [0.017, 0.017, 0.26], position: [0.5, 1.598, 0], material: 'metalLight' },
  { id: 'hanger-rail', geometry: 'cylinder', size: [0.022, 0.022, 1], position: [0, 1.728, 0], rotation: [0, 0, Math.PI / 2], material: 'paintedWhite' },
  { id: 'lower-stabilizer', geometry: 'cylinder', size: [0.014, 0.014, 1], position: [0, 0.18, 0], rotation: [0, 0, Math.PI / 2], material: 'paintedWhite' },
  { id: 'shoe-rail-front', geometry: 'cylinder', size: [0.012, 0.012, 1], position: [0, 0.17, 0.19], rotation: [0, 0, Math.PI / 2], material: 'paintedWhite' },
  { id: 'shoe-rail-back', geometry: 'cylinder', size: [0.012, 0.012, 1], position: [0, 0.17, -0.19], rotation: [0, 0, Math.PI / 2], material: 'paintedWhite' },
  { id: 'shoe-support-left-front', geometry: 'box', size: [0.025, 0.12, 0.025], position: [-0.5, 0.13, 0.19], material: 'paintedWhite' },
  { id: 'shoe-support-right-front', geometry: 'box', size: [0.025, 0.12, 0.025], position: [0.5, 0.13, 0.19], material: 'paintedWhite' },
  { id: 'shoe-support-left-back', geometry: 'box', size: [0.025, 0.12, 0.025], position: [-0.5, 0.13, -0.19], material: 'paintedWhite' },
  { id: 'shoe-support-right-back', geometry: 'box', size: [0.025, 0.12, 0.025], position: [0.5, 0.13, -0.19], material: 'paintedWhite' },
  ...([-0.5, 0.5] as const).flatMap((x, column) => ([-0.19, 0.19] as const).map((z, row): FurniturePart => ({
    id: `caster-${column + 1}-${row + 1}`,
    geometry: 'cylinder',
    size: [0.035, 0.035, 0.06],
    position: [x, 0.035, z],
    rotation: [0, 0, Math.PI / 2],
    material: 'metal',
  }))),
];

const shelfParts: readonly FurniturePart[] = [
  { id: 'base-shelf', geometry: 'box', size: [0.9, 0.04, 0.36], position: [0, 0.02, 0], material: 'woodDark' },
  { id: 'post-left-back', geometry: 'box', size: [0.04, 1.67, 0.04], position: [-0.43, 0.875, -0.15], material: 'metal' },
  { id: 'post-left-front', geometry: 'box', size: [0.04, 1.67, 0.04], position: [-0.43, 0.875, 0.15], material: 'metal' },
  { id: 'post-right-back', geometry: 'box', size: [0.04, 1.67, 0.04], position: [0.43, 0.875, -0.15], material: 'metal' },
  { id: 'post-right-front', geometry: 'box', size: [0.04, 1.67, 0.04], position: [0.43, 0.875, 0.15], material: 'metal' },
  { id: 'top-shelf', geometry: 'box', size: [0.9, 0.04, 0.36], position: [0, 1.73, 0], material: 'woodLight' },
  { id: 'shoe-shelf', geometry: 'box', size: [0.82, 0.04, 0.3], position: [0, 0.24, 0], material: 'woodLight' },
  { id: 'hanger-rail', geometry: 'cylinder', size: [0.02, 0.02, 0.82], position: [0, 1.48, 0.13], rotation: [0, 0, Math.PI / 2], material: 'metalLight' },
];

const cornerParts: readonly FurniturePart[] = [
  { id: 'base-x', geometry: 'box', size: [0.8, 0.04, 0.08], position: [0, 0.02, -0.36], material: 'metal' },
  { id: 'base-z', geometry: 'box', size: [0.08, 0.04, 0.8], position: [-0.36, 0.02, 0], material: 'metal' },
  { id: 'post-corner', geometry: 'cylinder', size: [0.02, 0.02, 1.71], position: [-0.36, 0.895, -0.36], material: 'metal' },
  { id: 'post-right', geometry: 'cylinder', size: [0.02, 0.02, 1.71], position: [0.36, 0.895, -0.36], material: 'metal' },
  { id: 'post-front', geometry: 'cylinder', size: [0.02, 0.02, 1.71], position: [-0.36, 0.895, 0.36], material: 'metal' },
  { id: 'rail-x', geometry: 'cylinder', size: [0.02, 0.02, 0.72], position: [0, 1.7, -0.36], rotation: [0, 0, Math.PI / 2], material: 'metalLight' },
  { id: 'rail-z', geometry: 'cylinder', size: [0.02, 0.02, 0.72], position: [-0.36, 1.7, 0], rotation: [Math.PI / 2, 0, 0], material: 'metalLight' },
];

// MORSNING bamboo valet stand: 0.54 × 0.47 × 1.39 m.
const naturalMorsningParts: readonly FurniturePart[] = [
  { id: 'foot-left', geometry: 'roundedBox', size: [0.1, 0.035, 0.47], radius: 0.015, smoothness: 4, position: [-0.22, 0.0175, 0], material: 'woodLight' },
  { id: 'foot-right', geometry: 'roundedBox', size: [0.1, 0.035, 0.47], radius: 0.015, smoothness: 4, position: [0.22, 0.0175, 0], material: 'woodLight' },
  { id: 'post-left', geometry: 'roundedBox', size: [0.055, 1.355, 0.055], radius: 0.018, smoothness: 4, position: [-0.22, 0.7125, -0.13], material: 'wood' },
  { id: 'post-right', geometry: 'roundedBox', size: [0.055, 1.355, 0.055], radius: 0.018, smoothness: 4, position: [0.22, 0.7125, -0.13], material: 'wood' },
  { id: 'lower-bar', geometry: 'cylinder', size: [0.018, 0.018, 0.44], position: [0, 0.35, -0.13], rotation: [0, 0, Math.PI / 2], material: 'woodLight' },
  { id: 'mid-bar', geometry: 'cylinder', size: [0.02, 0.02, 0.44], position: [0, 0.83, -0.13], rotation: [0, 0, Math.PI / 2], material: 'woodLight' },
  { id: 'shoulder-rail', geometry: 'cylinder', size: [0.025, 0.025, 0.54], position: [0, 1.365, -0.13], rotation: [0, 0, Math.PI / 2], material: 'wood' },
  { id: 'front-valet-rail', geometry: 'cylinder', size: [0.02, 0.02, 0.44], position: [0, 1.09, 0.16], rotation: [0, 0, Math.PI / 2], material: 'woodLight' },
  { id: 'connector-left', geometry: 'roundedBox', size: [0.04, 0.45, 0.04], radius: 0.012, smoothness: 4, position: [-0.2, 1.205026154116236, 0.015], rotation: [-0.7, 0, 0], material: 'woodLight' },
  { id: 'connector-right', geometry: 'roundedBox', size: [0.04, 0.45, 0.04], radius: 0.012, smoothness: 4, position: [0.2, 1.205026154116236, 0.015], rotation: [-0.7, 0, 0], material: 'woodLight' },
];

export const HANGER_DESIGNS: Readonly<Record<HangerDesignKey, HangerDesign>> = Object.freeze({
  hangerBasic: Object.freeze({
    schemaVersion: '1.0', id: 'hanger-basic', name: '기본 스탠드형 행거', furnitureType: '행거', category: '행거', variant: '기본 스탠드형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.11, depth: 0.51, height: 1.75 }), materials: Object.freeze(['paintedWhite', 'metal', 'metalLight'] as const), parts: Object.freeze(basicParts), purchaseUrl: 'https://www.ikea.com/kr/ko/p/rigga-clothes-rack-white-30231631/',
  }),
  hangerShelf: Object.freeze({
    schemaVersion: '1.0', id: 'hanger-shelf', name: '선반 결합형 행거', furnitureType: '행거', category: '행거', variant: '선반 결합형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.9, depth: 0.36, height: 1.75 }), materials: Object.freeze(['woodDark', 'woodLight', 'metal', 'metalLight'] as const), parts: Object.freeze(shelfParts), purchaseUrl: 'https://www.ikea.com/kr/ko/p/grafjaellet-clothes-rack-with-shoe-storage-anthracite-80570223/',
  }),
  hangerCorner: Object.freeze({
    schemaVersion: '1.0', id: 'hanger-corner', name: '코너형 행거', furnitureType: '행거', category: '행거', variant: '코너형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.8, depth: 0.8, height: 1.75 }), materials: Object.freeze(['metal', 'metalLight'] as const), parts: Object.freeze(cornerParts), purchaseUrl: 'https://www.roomnhome.com/goods/goods_view.php?goodsNo=186797137',
  }),
  hangerNaturalMorsning: Object.freeze({
    schemaVersion: '1.0', id: 'hanger-natural-morsning', name: '내추럴 대나무 발렛 행거', furnitureType: '행거', category: '행거', variant: '내추럴 대나무형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.54, depth: 0.47, height: 1.39 }), materials: Object.freeze(['wood', 'woodLight'] as const), parts: Object.freeze(naturalMorsningParts), purchaseUrl: 'https://www.ikea.com/kr/en/p/morsning-valet-stand-bamboo-70464435/',
  }),
});
