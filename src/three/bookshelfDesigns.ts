import type { FurnitureDesign, FurniturePart } from './designTypes';

export type BookshelfDesignKey =
  | 'bookshelfLow'
  | 'bookshelfHigh'
  | 'bookshelfDoubleOpen'
  | 'bookshelfClassicHavsta'
  | 'bookshelfMidcenturyStockholm';
export type BookshelfDesign = FurnitureDesign<'책장/오픈 선반', '책장/오픈 선반'>;

const COORDINATE_SYSTEM = Object.freeze({
  origin: 'floor-center' as const,
  axes: Object.freeze({ x: 'right' as const, y: 'up' as const, z: 'front' as const }),
});

const lowParts: readonly FurniturePart[] = [
  { id: 'plinth', geometry: 'box', size: [0.8, 0.06, 0.28], position: [0, 0.03, 0], material: 'woodDark' },
  { id: 'side-left', geometry: 'box', size: [0.04, 1, 0.28], position: [-0.38, 0.56, 0], material: 'wood' },
  { id: 'side-right', geometry: 'box', size: [0.04, 1, 0.28], position: [0.38, 0.56, 0], material: 'wood' },
  { id: 'top', geometry: 'box', size: [0.72, 0.04, 0.28], position: [0, 1.04, 0], material: 'woodLight' },
  { id: 'shelf-lower', geometry: 'box', size: [0.72, 0.03, 0.25], position: [0, 0.35, 0.015], material: 'woodLight' },
  { id: 'shelf-upper', geometry: 'box', size: [0.72, 0.03, 0.25], position: [0, 0.68, 0.015], material: 'woodLight' },
  { id: 'back-panel', geometry: 'box', size: [0.72, 0.98, 0.02], position: [0, 0.55, -0.13], material: 'woodDark' },
];

const highParts: readonly FurniturePart[] = [
  { id: 'plinth', geometry: 'box', size: [0.8, 0.06, 0.28], position: [0, 0.03, 0], material: 'woodDark' },
  { id: 'side-left', geometry: 'box', size: [0.04, 1.96, 0.28], position: [-0.38, 1.04, 0], material: 'woodLight' },
  { id: 'side-right', geometry: 'box', size: [0.04, 1.96, 0.28], position: [0.38, 1.04, 0], material: 'woodLight' },
  { id: 'top', geometry: 'box', size: [0.72, 0.04, 0.28], position: [0, 2, 0], material: 'wood' },
  { id: 'shelf-1', geometry: 'box', size: [0.72, 0.03, 0.25], position: [0, 0.4, 0.015], material: 'wood' },
  { id: 'shelf-2', geometry: 'box', size: [0.72, 0.03, 0.25], position: [0, 0.75, 0.015], material: 'wood' },
  { id: 'shelf-3', geometry: 'box', size: [0.72, 0.03, 0.25], position: [0, 1.1, 0.015], material: 'wood' },
  { id: 'shelf-4', geometry: 'box', size: [0.72, 0.03, 0.25], position: [0, 1.45, 0.015], material: 'wood' },
  { id: 'shelf-5', geometry: 'box', size: [0.72, 0.03, 0.25], position: [0, 1.8, 0.015], material: 'wood' },
  { id: 'back-panel', geometry: 'box', size: [0.72, 1.92, 0.02], position: [0, 1.02, -0.13], material: 'woodDark' },
];

const doubleOpenParts: readonly FurniturePart[] = [
  { id: 'base', geometry: 'box', size: [0.765, 0.055, 0.39], position: [0, 0.0275, 0], material: 'woodDark' },
  { id: 'side-left', geometry: 'box', size: [0.055, 1.41, 0.39], position: [-0.355, 0.76, 0], material: 'woodLight' },
  { id: 'side-right', geometry: 'box', size: [0.055, 1.41, 0.39], position: [0.355, 0.76, 0], material: 'woodLight' },
  { id: 'top', geometry: 'box', size: [0.655, 0.055, 0.39], position: [0, 1.4375, 0], material: 'woodDark' },
  { id: 'center-divider', geometry: 'box', size: [0.055, 1.355, 0.39], position: [0, 0.7325, 0], material: 'woodDark' },
  { id: 'shelf-lower', geometry: 'box', size: [0.655, 0.055, 0.39], position: [0, 0.39, 0], material: 'wood' },
  { id: 'shelf-middle', geometry: 'box', size: [0.655, 0.055, 0.39], position: [0, 0.755, 0], material: 'wood' },
  { id: 'shelf-upper', geometry: 'box', size: [0.655, 0.055, 0.39], position: [0, 1.12, 0], material: 'wood' },
];

const classicHavstaParts: readonly FurniturePart[] = [
  { id: 'plinth', geometry: 'roundedBox', size: [1.21, 0.08, 0.37], radius: 0.012, smoothness: 4, position: [0, 0.04, 0], material: 'paintedWhite' },
  { id: 'side-left', geometry: 'box', size: [0.07, 1.18, 0.35], position: [-0.57, 0.67, 0], material: 'paintedWhite' },
  { id: 'side-right', geometry: 'box', size: [0.07, 1.18, 0.35], position: [0.57, 0.67, 0], material: 'paintedWhite' },
  { id: 'back-panel', geometry: 'box', size: [1.07, 1.18, 0.025], position: [0, 0.67, -0.1725], material: 'paintedWhite' },
  { id: 'bottom-panel', geometry: 'box', size: [1.07, 0.05, 0.35], position: [0, 0.105, 0], material: 'paintedWhite' },
  { id: 'shelf-lower', geometry: 'box', size: [1.07, 0.035, 0.32], position: [0, 0.4, 0.005], material: 'paintedWhite' },
  { id: 'shelf-middle', geometry: 'box', size: [1.07, 0.035, 0.32], position: [0, 0.7, 0.005], material: 'paintedWhite' },
  { id: 'shelf-upper', geometry: 'box', size: [1.07, 0.035, 0.32], position: [0, 1, 0.005], material: 'paintedWhite' },
  { id: 'top', geometry: 'roundedBox', size: [1.07, 0.08, 0.35], radius: 0.012, smoothness: 4, position: [0, 1.3, 0], material: 'paintedWhite' },
  { id: 'glass-door-left', geometry: 'box', size: [0.46, 0.98, 0.012], position: [-0.265, 0.75, 0.179], material: 'glass' },
  { id: 'glass-door-right', geometry: 'box', size: [0.46, 0.98, 0.012], position: [0.265, 0.75, 0.179], material: 'glass' },
  { id: 'door-outer-left', geometry: 'box', size: [0.045, 1.06, 0.025], position: [-0.5125, 0.75, 0.1725], material: 'paintedWhite' },
  { id: 'door-center-left', geometry: 'box', size: [0.035, 1.06, 0.025], position: [-0.0175, 0.75, 0.1725], material: 'paintedWhite' },
  { id: 'door-center-right', geometry: 'box', size: [0.035, 1.06, 0.025], position: [0.0175, 0.75, 0.1725], material: 'paintedWhite' },
  { id: 'door-outer-right', geometry: 'box', size: [0.045, 1.06, 0.025], position: [0.5125, 0.75, 0.1725], material: 'paintedWhite' },
  { id: 'door-rail-bottom', geometry: 'box', size: [1.07, 0.045, 0.025], position: [0, 0.2375, 0.1725], material: 'paintedWhite' },
  { id: 'door-rail-top', geometry: 'box', size: [1.07, 0.045, 0.025], position: [0, 1.2625, 0.1725], material: 'paintedWhite' },
  { id: 'handle-left', geometry: 'cylinder', size: [0.012, 0.012, 0.02], rotation: [Math.PI / 2, 0, 0], position: [-0.055, 0.75, 0.175], material: 'metalLight' },
  { id: 'handle-right', geometry: 'cylinder', size: [0.012, 0.012, 0.02], rotation: [Math.PI / 2, 0, 0], position: [0.055, 0.75, 0.175], material: 'metalLight' },
];

// USM Haller H2: 60 × 15 × 71 in, chromed tube frame with powder-coated steel shelves.
const midcenturyStockholmParts: readonly FurniturePart[] = [
  { id: 'floor-rail-front', geometry: 'roundedBox', size: [1.5, 0.024, 0.024], radius: 0.012, smoothness: 8, position: [0, 0.012, 0.1785], material: 'chrome' },
  { id: 'floor-rail-back', geometry: 'roundedBox', size: [1.5, 0.024, 0.024], radius: 0.012, smoothness: 8, position: [0, 0.012, -0.1785], material: 'chrome' },
  { id: 'post-left-front', geometry: 'cylinder', size: [0.012, 0.012, 1.7794], position: [-0.75, 0.9137, 0.1785], material: 'chrome' },
  { id: 'post-left-back', geometry: 'cylinder', size: [0.012, 0.012, 1.7794], position: [-0.75, 0.9137, -0.1785], material: 'chrome' },
  { id: 'post-center-front', geometry: 'cylinder', size: [0.012, 0.012, 1.7794], position: [0, 0.9137, 0.1785], material: 'chrome' },
  { id: 'post-center-back', geometry: 'cylinder', size: [0.012, 0.012, 1.7794], position: [0, 0.9137, -0.1785], material: 'chrome' },
  { id: 'post-right-front', geometry: 'cylinder', size: [0.012, 0.012, 1.7794], position: [0.75, 0.9137, 0.1785], material: 'chrome' },
  { id: 'post-right-back', geometry: 'cylinder', size: [0.012, 0.012, 1.7794], position: [0.75, 0.9137, -0.1785], material: 'chrome' },
  { id: 'shelf-bottom', geometry: 'box', size: [1.5, 0.022, 0.357], position: [0, 0.035, 0], material: 'gentianBlueMetal' },
  { id: 'shelf-lower', geometry: 'box', size: [1.5, 0.022, 0.357], position: [0, 0.475, 0], material: 'gentianBlueMetal' },
  { id: 'shelf-middle', geometry: 'box', size: [1.5, 0.022, 0.357], position: [0, 0.915, 0], material: 'gentianBlueMetal' },
  { id: 'shelf-upper', geometry: 'box', size: [1.5, 0.022, 0.357], position: [0, 1.355, 0], material: 'gentianBlueMetal' },
  { id: 'shelf-top', geometry: 'box', size: [1.5, 0.022, 0.357], position: [0, 1.7924, 0], material: 'gentianBlueMetal' },
  { id: 'rear-brace-lower', geometry: 'cylinder', size: [0.012, 0.012, 1.5], rotation: [0, 0, Math.PI / 2], position: [0, 0.463, -0.1785], material: 'chrome' },
  { id: 'rear-brace-upper', geometry: 'cylinder', size: [0.012, 0.012, 1.5], rotation: [0, 0, Math.PI / 2], position: [0, 1.343, -0.1785], material: 'chrome' },
];

export const BOOKSHELF_DESIGNS: Readonly<Record<BookshelfDesignKey, BookshelfDesign>> = Object.freeze({
  bookshelfLow: Object.freeze({
    schemaVersion: '1.0', id: 'bookshelf-low', name: '낮은 책장', furnitureType: '책장/오픈 선반', category: '책장/오픈 선반', variant: '낮은 책장', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.8, depth: 0.28, height: 1.06 }), materials: Object.freeze(['wood', 'woodLight', 'woodDark'] as const), parts: Object.freeze(lowParts), purchaseUrl: 'https://www.ikea.com/kr/ko/p/billy-bookcase-white-70522044/',
  }),
  bookshelfHigh: Object.freeze({
    schemaVersion: '1.0', id: 'bookshelf-high', name: '높은 책장', furnitureType: '책장/오픈 선반', category: '책장/오픈 선반', variant: '높은 책장', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.8, depth: 0.28, height: 2.02 }), materials: Object.freeze(['wood', 'woodLight', 'woodDark'] as const), parts: Object.freeze(highParts), purchaseUrl: 'https://www.ikea.com/kr/ko/p/billy-bookcase-white-00522047/',
  }),
  bookshelfDoubleOpen: Object.freeze({
    schemaVersion: '1.0', id: 'bookshelf-double-open', name: '양면 오픈 선반', furnitureType: '책장/오픈 선반', category: '책장/오픈 선반', variant: '양면 오픈형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.765, depth: 0.39, height: 1.465 }), materials: Object.freeze(['wood', 'woodLight', 'woodDark'] as const), parts: Object.freeze(doubleOpenParts), purchaseUrl: 'https://www.ikea.com/kr/ko/p/kallax-shelving-unit-white-20351884/',
  }),
  bookshelfClassicHavsta: Object.freeze({
    schemaVersion: '1.0', id: 'bookshelf-classic-havsta', name: '클래식 유리도어 책장', furnitureType: '책장/오픈 선반', category: '책장/오픈 선반', variant: '클래식 유리도어형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.21, depth: 0.37, height: 1.34 }), materials: Object.freeze(['paintedWhite', 'glass', 'metalLight'] as const), parts: Object.freeze(classicHavstaParts), purchaseUrl: 'https://www.ikea.com/kr/ko/p/havsta-glass-door-cabinet-with-plinth-white-clear-glass-s29563141/',
  }),
  bookshelfMidcenturyStockholm: Object.freeze({
    schemaVersion: '1.0', id: 'bookshelf-midcentury-stockholm', name: '미드센추리 블루 메탈 선반', furnitureType: '책장/오픈 선반', category: '책장/오픈 선반', variant: '미드센추리 블루 메탈형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.524, depth: 0.381, height: 1.8034 }), materials: Object.freeze(['chrome', 'gentianBlueMetal'] as const), parts: Object.freeze(midcenturyStockholmParts), purchaseUrl: 'https://us.usm.com/products/usm-haller-shelving-h2',
  }),
});
