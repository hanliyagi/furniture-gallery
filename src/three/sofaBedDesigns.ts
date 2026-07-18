import type { FurnitureDesign, FurniturePart } from './designTypes';

export type SofaBedDesignKey = 'sofaBedCompact' | 'sofaBedFolding' | 'sofaBedDaybed' | 'sofaBedMidcenturyOrange' | 'sofaBedClassicStorage';
export type SofaBedDesign = FurnitureDesign<'소파베드', '소파베드'>;

const COORDINATE_SYSTEM = Object.freeze({
  origin: 'floor-center' as const,
  axes: Object.freeze({ x: 'right' as const, y: 'up' as const, z: 'front' as const }),
});

const compactParts: readonly FurniturePart[] = [
  { id: 'base', geometry: 'roundedBox', size: [1.42, 0.16, 1], radius: 0.04, smoothness: 5, position: [0, 0.08, 0], material: 'metal' },
  { id: 'back-support-left', geometry: 'box', size: [0.04, 0.42, 0.06], position: [-0.55, 0.37, -0.38], material: 'metal' },
  { id: 'back-support-right', geometry: 'box', size: [0.04, 0.42, 0.06], position: [0.55, 0.37, -0.38], material: 'metal' },
  { id: 'rear-crossbar', geometry: 'box', size: [1.18, 0.08, 0.08], position: [0, 0.34, -0.39], material: 'metal' },
  { id: 'seat-mattress', geometry: 'roundedBox', size: [1.38, 0.22, 0.82], radius: 0.085, smoothness: 5, position: [0, 0.27, 0.05], material: 'fabricLight' },
  { id: 'back-mattress', geometry: 'roundedBox', size: [1.38, 0.49, 0.18], radius: 0.08, smoothness: 5, position: [0, 0.625, -0.38], material: 'fabric' },
  { id: 'front-skirt', geometry: 'roundedBox', size: [1.4, 0.22, 0.08], radius: 0.025, smoothness: 4, position: [0, 0.27, 0.46], material: 'fabric' },
  { id: 'fold-seam', geometry: 'box', size: [1.28, 0.025, 0.025], position: [0, 0.39, -0.28], material: 'fabricDark' },
];

const foldingParts: readonly FurniturePart[] = [
  { id: 'platform', geometry: 'box', size: [2, 0.14, 0.97], position: [0, 0.07, 0], material: 'metal' },
  { id: 'seat-mattress', geometry: 'roundedBox', size: [1.92, 0.18, 0.75], radius: 0.075, smoothness: 5, position: [0, 0.23, 0.08], material: 'fabricLight' },
  { id: 'back-mattress', geometry: 'roundedBox', size: [1.92, 0.58, 0.18], radius: 0.07, smoothness: 5, position: [0, 0.61, -0.38], material: 'fabric' },
  { id: 'back-frame', geometry: 'box', size: [1.96, 0.5, 0.06], position: [0, 0.57, -0.455], material: 'metal' },
  { id: 'hinge-bar', geometry: 'box', size: [1.9, 0.06, 0.06], position: [0, 0.33, -0.25], material: 'metalLight' },
  { id: 'side-hinge-left', geometry: 'box', size: [0.04, 0.28, 0.16], position: [-0.98, 0.25, -0.3], material: 'metal' },
  { id: 'side-hinge-right', geometry: 'box', size: [0.04, 0.28, 0.16], position: [0.98, 0.25, -0.3], material: 'metal' },
  { id: 'rear-support-left', geometry: 'box', size: [0.04, 0.56, 0.08], position: [-0.78, 0.42, -0.43], material: 'metal' },
  { id: 'rear-support-right', geometry: 'box', size: [0.04, 0.56, 0.08], position: [0.78, 0.42, -0.43], material: 'metal' },
  { id: 'rear-crossbar', geometry: 'box', size: [1.64, 0.08, 0.08], position: [0, 0.28, -0.43], material: 'metal' },
];

const daybedParts: readonly FurniturePart[] = [
  // IKEA BRIMNES: white painted frame, two broad drawers and a second bed stored below.
  { id: 'platform', geometry: 'box', size: [2.05, 0.32, 0.87], position: [0, 0.16, 0], material: 'paintedWhite' },
  { id: 'end-left', geometry: 'box', size: [0.08, 0.57, 0.87], position: [-0.985, 0.285, 0], material: 'paintedWhite' },
  { id: 'end-right', geometry: 'box', size: [0.08, 0.57, 0.87], position: [0.985, 0.285, 0], material: 'paintedWhite' },
  { id: 'back-panel', geometry: 'box', size: [2.05, 0.57, 0.08], position: [0, 0.285, -0.395], material: 'paintedWhite' },
  { id: 'drawer-left', geometry: 'box', size: [0.9, 0.22, 0.02], position: [-0.47, 0.16, 0.425], material: 'paintedWhite' },
  { id: 'drawer-right', geometry: 'box', size: [0.9, 0.22, 0.02], position: [0.47, 0.16, 0.425], material: 'paintedWhite' },
  { id: 'drawer-grip-left', geometry: 'box', size: [0.2, 0.025, 0.01], position: [-0.47, 0.19, 0.43], material: 'metalLight' },
  { id: 'drawer-grip-right', geometry: 'box', size: [0.2, 0.025, 0.01], position: [0.47, 0.19, 0.43], material: 'metalLight' },
  { id: 'pullout-bed-frame', geometry: 'box', size: [1.93, 0.13, 0.72], position: [0, 0.225, 0.01], material: 'paintedWhite' },
  { id: 'pullout-mattress', geometry: 'roundedBox', size: [1.91, 0.11, 0.70], radius: 0.045, smoothness: 5, position: [0, 0.345, 0.01], material: 'fabricLight' },
  { id: 'mattress', geometry: 'roundedBox', size: [1.96, 0.18, 0.76], radius: 0.075, smoothness: 5, position: [0, 0.45, 0.02], material: 'fabricLight' },
  { id: 'bolster', geometry: 'roundedBox', size: [1.7, 0.14, 0.18], radius: 0.06, smoothness: 5, position: [0, 0.56, -0.28], material: 'fabric' },
  { id: 'pillow-left', geometry: 'roundedBox', size: [0.38, 0.12, 0.32], radius: 0.05, smoothness: 5, position: [-0.58, 0.57, 0.08], material: 'fabricDark' },
  { id: 'pillow-right', geometry: 'roundedBox', size: [0.38, 0.12, 0.32], radius: 0.05, smoothness: 5, position: [0.58, 0.57, 0.08], material: 'fabricDark' },
];

// Habitat Kota: armless, one-piece tufted click-clack body with exposed tapered wood legs.
const midcenturyOrangeParts: readonly FurniturePart[] = [
  { id: 'leg-left-back', geometry: 'cylinder', size: [0.035, 0.06, 0.15], position: [-0.76, 0.075, -0.31], material: 'woodDark' },
  { id: 'leg-right-back', geometry: 'cylinder', size: [0.035, 0.06, 0.15], position: [0.76, 0.075, -0.31], material: 'woodDark' },
  { id: 'leg-left-front', geometry: 'cylinder', size: [0.035, 0.06, 0.15], position: [-0.76, 0.075, 0.31], material: 'woodDark' },
  { id: 'leg-right-front', geometry: 'cylinder', size: [0.035, 0.06, 0.15], position: [0.76, 0.075, 0.31], material: 'woodDark' },
  { id: 'base-frame', geometry: 'roundedBox', size: [1.89, 0.22, 1.02], radius: 0.1, smoothness: 6, position: [0, 0.25, 0], material: 'orangeFabric' },
  { id: 'rear-support-left', geometry: 'box', size: [0.07, 0.52, 0.08], position: [-0.72, 0.44, -0.43], material: 'woodDark' },
  { id: 'rear-support-right', geometry: 'box', size: [0.07, 0.52, 0.08], position: [0.72, 0.44, -0.43], material: 'woodDark' },
  { id: 'click-clack-hinge', geometry: 'box', size: [1.55, 0.06, 0.08], position: [0, 0.36, -0.39], material: 'brass' },
  { id: 'seat-cushion', geometry: 'roundedBox', size: [1.71, 0.19, 0.68], radius: 0.095, smoothness: 6, position: [0, 0.445, 0.09], material: 'orangeFabric' },
  { id: 'front-roll', geometry: 'roundedBox', size: [1.89, 0.2, 0.22], radius: 0.095, smoothness: 6, position: [0, 0.39, 0.4], material: 'orangeFabric' },
  { id: 'side-roll-left', geometry: 'roundedBox', size: [0.21, 0.24, 0.72], radius: 0.09, smoothness: 6, position: [-0.84, 0.43, 0.08], material: 'orangeFabric' },
  { id: 'side-roll-right', geometry: 'roundedBox', size: [0.21, 0.24, 0.72], radius: 0.09, smoothness: 6, position: [0.84, 0.43, 0.08], material: 'orangeFabric' },
  { id: 'back-frame', geometry: 'roundedBox', size: [1.79, 0.56, 0.18], radius: 0.085, smoothness: 6, position: [0, 0.6, -0.42], material: 'orangeFabric' },
  { id: 'back-seam-1', geometry: 'box', size: [0.012, 0.35, 0.008], position: [-0.596, 0.66, -0.326], material: 'orangeFabricDark' },
  { id: 'back-seam-2', geometry: 'box', size: [0.012, 0.35, 0.008], position: [-0.298, 0.66, -0.326], material: 'orangeFabricDark' },
  { id: 'back-seam-3', geometry: 'box', size: [0.012, 0.35, 0.008], position: [0, 0.66, -0.326], material: 'orangeFabricDark' },
  { id: 'back-seam-4', geometry: 'box', size: [0.012, 0.35, 0.008], position: [0.298, 0.66, -0.326], material: 'orangeFabricDark' },
  { id: 'back-seam-5', geometry: 'box', size: [0.012, 0.35, 0.008], position: [0.596, 0.66, -0.326], material: 'orangeFabricDark' },
  ...[-0.74, -0.445, -0.15, 0.15, 0.445, 0.74].map((x, index): FurniturePart => ({
    id: `back-tuft-${index + 1}`, geometry: 'cylinder', size: [0.032, 0.032, 0.014],
    position: [x, 0.65, -0.323], rotation: [Math.PI / 2, 0, 0], material: 'orangeFabricDark',
  })),
  ...[-0.6, -0.3, 0, 0.3, 0.6].map((x, index): FurniturePart => ({
    id: `seat-tuft-${index + 1}`, geometry: 'cylinder', size: [0.025, 0.025, 0.012],
    position: [x, 0.536, 0.1], material: 'orangeFabricDark',
  })),
];

// IKEA HEMNES: classic painted-wood day-bed with a high rail back and three integrated drawers.
const classicStorageParts: readonly FurniturePart[] = [
  { id: 'floor-plinth', geometry: 'roundedBox', size: [2.09, 0.08, 0.89], radius: 0.018, smoothness: 4, position: [0, 0.04, 0], material: 'paintedWhite' },
  { id: 'storage-body', geometry: 'box', size: [1.95, 0.3, 0.8], position: [0, 0.23, 0], material: 'paintedWhite' },
  { id: 'drawer-left', geometry: 'roundedBox', size: [0.6, 0.22, 0.025], radius: 0.012, smoothness: 4, position: [-0.64, 0.23, 0.4125], material: 'paintedWhite' },
  { id: 'drawer-center', geometry: 'roundedBox', size: [0.6, 0.22, 0.025], radius: 0.012, smoothness: 4, position: [0, 0.23, 0.4125], material: 'paintedWhite' },
  { id: 'drawer-right', geometry: 'roundedBox', size: [0.6, 0.22, 0.025], radius: 0.012, smoothness: 4, position: [0.64, 0.23, 0.4125], material: 'paintedWhite' },
  { id: 'handle-left', geometry: 'cylinder', size: [0.018, 0.018, 0.025], position: [-0.64, 0.23, 0.4325], rotation: [Math.PI / 2, 0, 0], material: 'metalLight' },
  { id: 'handle-center', geometry: 'cylinder', size: [0.018, 0.018, 0.025], position: [0, 0.23, 0.4325], rotation: [Math.PI / 2, 0, 0], material: 'metalLight' },
  { id: 'handle-right', geometry: 'cylinder', size: [0.018, 0.018, 0.025], position: [0.64, 0.23, 0.4325], rotation: [Math.PI / 2, 0, 0], material: 'metalLight' },
  { id: 'mattress-support', geometry: 'box', size: [1.93, 0.06, 0.78], position: [0, 0.41, 0], material: 'woodLight' },
  { id: 'mattress', geometry: 'roundedBox', size: [1.91, 0.18, 0.75], radius: 0.075, smoothness: 6, position: [0, 0.53, 0.02], material: 'fabricLight' },
  { id: 'end-left', geometry: 'roundedBox', size: [0.08, 0.69, 0.89], radius: 0.025, smoothness: 5, position: [-1.005, 0.425, 0], material: 'paintedWhite' },
  { id: 'end-right', geometry: 'roundedBox', size: [0.08, 0.69, 0.89], radius: 0.025, smoothness: 5, position: [1.005, 0.425, 0], material: 'paintedWhite' },
  { id: 'back-lower-rail', geometry: 'roundedBox', size: [1.93, 0.12, 0.08], radius: 0.02, smoothness: 4, position: [0, 0.56, -0.405], material: 'paintedWhite' },
  { id: 'back-top-rail', geometry: 'roundedBox', size: [1.93, 0.08, 0.08], radius: 0.02, smoothness: 4, position: [0, 0.79, -0.405], material: 'paintedWhite' },
  { id: 'back-slat-1', geometry: 'box', size: [0.055, 0.23, 0.055], position: [-0.76, 0.675, -0.405], material: 'paintedWhite' },
  { id: 'back-slat-2', geometry: 'box', size: [0.055, 0.23, 0.055], position: [-0.38, 0.675, -0.405], material: 'paintedWhite' },
  { id: 'back-slat-3', geometry: 'box', size: [0.055, 0.23, 0.055], position: [0, 0.675, -0.405], material: 'paintedWhite' },
  { id: 'back-slat-4', geometry: 'box', size: [0.055, 0.23, 0.055], position: [0.38, 0.675, -0.405], material: 'paintedWhite' },
  { id: 'back-slat-5', geometry: 'box', size: [0.055, 0.23, 0.055], position: [0.76, 0.675, -0.405], material: 'paintedWhite' },
  { id: 'back-cushion-left', geometry: 'roundedBox', size: [0.56, 0.26, 0.14], radius: 0.07, smoothness: 6, position: [-0.31, 0.67, -0.27], material: 'fabric' },
  { id: 'back-cushion-right', geometry: 'roundedBox', size: [0.56, 0.26, 0.14], radius: 0.07, smoothness: 6, position: [0.31, 0.67, -0.27], material: 'fabric' },
];

export const SOFA_BED_DESIGNS: Readonly<Record<SofaBedDesignKey, SofaBedDesign>> = Object.freeze({
  sofaBedCompact: Object.freeze({
    schemaVersion: '1.0', id: 'sofa-bed-compact', name: '컴팩트 소파베드', furnitureType: '소파베드', category: '소파베드', variant: '컴팩트형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.42, depth: 1, height: 0.87 }), materials: Object.freeze(['fabric', 'fabricLight', 'fabricDark', 'metal'] as const), parts: Object.freeze(compactParts),
    purchaseUrl: 'https://www.ikea.com/kr/ko/p/lycksele-murbo-2-seat-sofa-bed-ransta-natural-s69387018/',
  }),
  sofaBedFolding: Object.freeze({
    schemaVersion: '1.0', id: 'sofa-bed-folding', name: '접이식 소파베드', furnitureType: '소파베드', category: '소파베드', variant: '접이식형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 2, depth: 0.97, height: 0.9 }), materials: Object.freeze(['fabric', 'fabricLight', 'metal', 'metalLight'] as const), parts: Object.freeze(foldingParts),
    purchaseUrl: 'https://www.ikea.com/kr/ko/p/nyhamn-3-seat-sofa-bed-with-pocket-spring-mattress-knisa-grey-beige-s69306362/',
  }),
  sofaBedDaybed: Object.freeze({
    schemaVersion: '1.0', id: 'sofa-bed-daybed', name: '데이베드형 소파베드', furnitureType: '소파베드', category: '소파베드', variant: '데이베드형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 2.05, depth: 0.87, height: 0.63 }), materials: Object.freeze(['paintedWhite', 'fabric', 'fabricLight', 'fabricDark', 'metalLight'] as const), parts: Object.freeze(daybedParts),
    purchaseUrl: 'https://www.ikea.com/kr/ko/p/brimnes-day-bed-w-2-drawers-2-mattresses-white-agotnes-firm-s29427064/',
  }),
  sofaBedMidcenturyOrange: Object.freeze({
    schemaVersion: '1.0', id: 'sofa-bed-midcentury-orange', name: '미드센추리 오렌지 소파베드', furnitureType: '소파베드', category: '소파베드', variant: '미드센추리 오렌지형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.89, depth: 1.02, height: 0.88 }), materials: Object.freeze(['woodDark', 'orangeFabric', 'orangeFabricDark', 'brass'] as const), parts: Object.freeze(midcenturyOrangeParts),
    purchaseUrl: 'https://www.habitat.co.uk/product/7571745',
  }),
  sofaBedClassicStorage: Object.freeze({
    schemaVersion: '1.0', id: 'sofa-bed-classic-storage', name: '클래식 3서랍 소파베드', furnitureType: '소파베드', category: '소파베드', variant: '클래식 3서랍형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 2.09, depth: 0.89, height: 0.83 }), materials: Object.freeze(['paintedWhite', 'woodLight', 'fabric', 'fabricLight', 'metalLight'] as const), parts: Object.freeze(classicStorageParts),
    purchaseUrl: 'https://www.ikea.com/kr/en/p/hemnes-day-bed-w-3-drawers-2-mattresses-white-vannareid-extra-firm-s19390947/',
  }),
});
