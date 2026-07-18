import type { FurnitureDesign, FurniturePart } from './designTypes';

export type DrawerChestDesignKey =
  | 'drawerChestLowWide'
  | 'drawerChestVertical'
  | 'drawerChestBedside'
  | 'drawerChestClassicGullaberg';
export type DrawerChestDesign = FurnitureDesign<'서랍장', '서랍장'>;

const COORDINATE_SYSTEM = Object.freeze({
  origin: 'floor-center' as const,
  axes: Object.freeze({ x: 'right' as const, y: 'up' as const, z: 'front' as const }),
});

const lowWideParts: readonly FurniturePart[] = [
  { id: 'cabinet-body', geometry: 'box', size: [1.4, 0.7, 0.39], position: [0, 0.35, -0.005], material: 'woodLight' },
  { id: 'top', geometry: 'box', size: [1.4, 0.02, 0.4], position: [0, 0.71, 0], material: 'wood' },
  { id: 'drawer-left-upper', geometry: 'box', size: [0.65, 0.18, 0.015], position: [-0.34, 0.57, 0.1925], material: 'wood' },
  { id: 'drawer-right-upper', geometry: 'box', size: [0.65, 0.18, 0.015], position: [0.34, 0.57, 0.1925], material: 'wood' },
  { id: 'drawer-left-middle', geometry: 'box', size: [0.65, 0.18, 0.015], position: [-0.34, 0.35, 0.1925], material: 'wood' },
  { id: 'drawer-right-middle', geometry: 'box', size: [0.65, 0.18, 0.015], position: [0.34, 0.35, 0.1925], material: 'wood' },
  { id: 'drawer-left-lower', geometry: 'box', size: [0.65, 0.18, 0.015], position: [-0.34, 0.13, 0.1925], material: 'wood' },
  { id: 'drawer-right-lower', geometry: 'box', size: [0.65, 0.18, 0.015], position: [0.34, 0.13, 0.1925], material: 'wood' },
  { id: 'handle-left-upper', geometry: 'box', size: [0.22, 0.025, 0.006], position: [-0.34, 0.57, 0.197], material: 'metal' },
  { id: 'handle-right-upper', geometry: 'box', size: [0.22, 0.025, 0.006], position: [0.34, 0.57, 0.197], material: 'metal' },
  { id: 'handle-left-middle', geometry: 'box', size: [0.22, 0.025, 0.006], position: [-0.34, 0.35, 0.197], material: 'metal' },
  { id: 'handle-right-middle', geometry: 'box', size: [0.22, 0.025, 0.006], position: [0.34, 0.35, 0.197], material: 'metal' },
  { id: 'handle-left-lower', geometry: 'box', size: [0.22, 0.025, 0.006], position: [-0.34, 0.13, 0.197], material: 'metal' },
  { id: 'handle-right-lower', geometry: 'box', size: [0.22, 0.025, 0.006], position: [0.34, 0.13, 0.197], material: 'metal' },
];

const verticalParts: readonly FurniturePart[] = [
  { id: 'tall-cabinet-body', geometry: 'box', size: [0.7, 1.1, 0.39], position: [0, 0.55, -0.005], material: 'woodLight' },
  { id: 'tall-top', geometry: 'box', size: [0.7, 0.02, 0.4], position: [0, 1.11, 0], material: 'woodDark' },
  { id: 'drawer-1', geometry: 'box', size: [0.64, 0.18, 0.015], position: [0, 0.965, 0.1925], material: 'wood' },
  { id: 'drawer-2', geometry: 'box', size: [0.64, 0.18, 0.015], position: [0, 0.755, 0.1925], material: 'wood' },
  { id: 'drawer-3', geometry: 'box', size: [0.64, 0.18, 0.015], position: [0, 0.545, 0.1925], material: 'wood' },
  { id: 'drawer-4', geometry: 'box', size: [0.64, 0.18, 0.015], position: [0, 0.335, 0.1925], material: 'wood' },
  { id: 'drawer-5', geometry: 'box', size: [0.64, 0.18, 0.015], position: [0, 0.125, 0.1925], material: 'wood' },
  { id: 'handle-1', geometry: 'box', size: [0.2, 0.025, 0.006], position: [0, 0.965, 0.197], material: 'metal' },
  { id: 'handle-2', geometry: 'box', size: [0.2, 0.025, 0.006], position: [0, 0.755, 0.197], material: 'metal' },
  { id: 'handle-3', geometry: 'box', size: [0.2, 0.025, 0.006], position: [0, 0.545, 0.197], material: 'metal' },
  { id: 'handle-4', geometry: 'box', size: [0.2, 0.025, 0.006], position: [0, 0.335, 0.197], material: 'metal' },
  { id: 'handle-5', geometry: 'box', size: [0.2, 0.025, 0.006], position: [0, 0.125, 0.197], material: 'metal' },
];

const bedsideParts: readonly FurniturePart[] = [
  { id: 'compact-cabinet-body', geometry: 'box', size: [0.35, 0.47, 0.39], position: [0, 0.235, -0.005], material: 'woodDark' },
  { id: 'compact-top', geometry: 'box', size: [0.35, 0.02, 0.4], position: [0, 0.48, 0], material: 'wood' },
  { id: 'compact-drawer-upper', geometry: 'box', size: [0.31, 0.18, 0.015], position: [0, 0.36, 0.1925], material: 'woodLight' },
  { id: 'compact-drawer-lower', geometry: 'box', size: [0.31, 0.18, 0.015], position: [0, 0.14, 0.1925], material: 'woodLight' },
  { id: 'compact-grip-upper', geometry: 'box', size: [0.14, 0.025, 0.006], position: [0, 0.36, 0.197], material: 'metal' },
  { id: 'compact-grip-lower', geometry: 'box', size: [0.14, 0.025, 0.006], position: [0, 0.14, 0.197], material: 'metal' },
];

const classicGullabergParts: readonly FurniturePart[] = [
  { id: 'leg-left-front', geometry: 'roundedBox', size: [0.075, 0.2, 0.075], radius: 0.016, smoothness: 4, position: [-0.35, 0.1, 0.16], material: 'paintedWhite' },
  { id: 'leg-left-back', geometry: 'roundedBox', size: [0.075, 0.2, 0.075], radius: 0.016, smoothness: 4, position: [-0.35, 0.1, -0.16], material: 'paintedWhite' },
  { id: 'leg-right-front', geometry: 'roundedBox', size: [0.075, 0.2, 0.075], radius: 0.016, smoothness: 4, position: [0.35, 0.1, 0.16], material: 'paintedWhite' },
  { id: 'leg-right-back', geometry: 'roundedBox', size: [0.075, 0.2, 0.075], radius: 0.016, smoothness: 4, position: [0.35, 0.1, -0.16], material: 'paintedWhite' },
  { id: 'cabinet-body', geometry: 'roundedBox', size: [0.83, 0.98, 0.44], radius: 0.018, smoothness: 4, position: [0, 0.69, 0], material: 'paintedWhite' },
  { id: 'top', geometry: 'roundedBox', size: [0.89, 0.04, 0.48], radius: 0.015, smoothness: 4, position: [0, 1.2, 0], material: 'paintedWhite' },
  ...[0.97, 0.68, 0.39].flatMap((y, row): FurniturePart[] => [-0.21, 0.21].flatMap((x, column): FurniturePart[] => {
    const suffix = `${row + 1}-${column + 1}`;
    return [
      { id: `drawer-${suffix}`, geometry: 'roundedBox', size: [0.385, 0.24, 0.025], radius: 0.01, smoothness: 4, position: [x, y, 0.2275], material: 'paintedWhite' },
      { id: `knob-${suffix}`, geometry: 'cylinder', size: [0.018, 0.018, 0.035], position: [x, y, 0.2225], rotation: [Math.PI / 2, 0, 0], material: 'wood' },
    ];
  })),
];

export const DRAWER_CHEST_DESIGNS: Readonly<Record<DrawerChestDesignKey, DrawerChestDesign>> = Object.freeze({
  drawerChestLowWide: Object.freeze({
    schemaVersion: '1.0', id: 'drawer-chest-low-wide', name: '낮은 와이드형 서랍장', furnitureType: '서랍장', category: '서랍장', variant: '낮은 와이드형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.4, depth: 0.4, height: 0.72 }), materials: Object.freeze(['wood', 'woodLight', 'metal'] as const), parts: Object.freeze(lowWideParts), purchaseUrl: 'https://www.ikea.com/kr/ko/p/kullen-chest-of-6-drawers-white-50355734/',
  }),
  drawerChestVertical: Object.freeze({
    schemaVersion: '1.0', id: 'drawer-chest-vertical', name: '세로형 서랍장', furnitureType: '서랍장', category: '서랍장', variant: '세로형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.7, depth: 0.4, height: 1.12 }), materials: Object.freeze(['wood', 'woodLight', 'woodDark', 'metal'] as const), parts: Object.freeze(verticalParts), purchaseUrl: 'https://www.ikea.com/kr/ko/p/kullen-chest-of-5-drawers-white-90355732/',
  }),
  drawerChestBedside: Object.freeze({
    schemaVersion: '1.0', id: 'drawer-chest-bedside', name: '협탁 겸용 서랍장', furnitureType: '서랍장', category: '서랍장', variant: '협탁 겸용형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.35, depth: 0.4, height: 0.49 }), materials: Object.freeze(['wood', 'woodLight', 'woodDark', 'metal'] as const), parts: Object.freeze(bedsideParts), purchaseUrl: 'https://www.ikea.com/kr/ko/p/kullen-chest-of-2-drawers-white-70355728/',
  }),
  drawerChestClassicGullaberg: Object.freeze({
    schemaVersion: '1.0', id: 'drawer-chest-classic-gullaberg', name: '클래식 6단 서랍장', furnitureType: '서랍장', category: '서랍장', variant: '클래식 2열 6서랍형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.89, depth: 0.48, height: 1.22 }), materials: Object.freeze(['paintedWhite', 'wood'] as const), parts: Object.freeze(classicGullabergParts), purchaseUrl: 'https://www.ikea.com/kr/en/p/gullaberg-chest-of-6-drawers-white-anchor-unlock-function-20561778/',
  }),
});
