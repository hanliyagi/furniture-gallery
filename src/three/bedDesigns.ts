import type { FurnitureDesign, FurniturePart } from './designTypes';

export type BedDesignKey =
  | 'bedLowPlatform'
  | 'bedStorage'
  | 'bedFabricHeadboard'
  | 'bedMidcenturyTeal'
  | 'bedClassicIdanaes'
  | 'bedLoftDesk';
export type BedDesign = FurnitureDesign<'침대', '침대'>;

const COORDINATE_SYSTEM = Object.freeze({
  origin: 'floor-center' as const,
  axes: Object.freeze({ x: 'right' as const, y: 'up' as const, z: 'front' as const }),
});

const lowPlatformParts: readonly FurniturePart[] = [
  { id: 'lower-side-left', geometry: 'box', size: [0.06, 0.23, 2.05], position: [-0.385, 0.115, 0], material: 'wood' },
  { id: 'lower-side-right', geometry: 'box', size: [0.06, 0.23, 2.05], position: [0.385, 0.115, 0], material: 'wood' },
  { id: 'lower-head', geometry: 'box', size: [0.71, 0.23, 0.06], position: [0, 0.115, -0.995], material: 'wood' },
  { id: 'lower-foot', geometry: 'box', size: [0.71, 0.23, 0.06], position: [0, 0.115, 0.995], material: 'wood' },
  { id: 'upper-side-left', geometry: 'box', size: [0.06, 0.23, 2.05], position: [-0.385, 0.345, 0], material: 'woodLight' },
  { id: 'upper-side-right', geometry: 'box', size: [0.06, 0.23, 2.05], position: [0.385, 0.345, 0], material: 'woodLight' },
  { id: 'upper-head', geometry: 'box', size: [0.71, 0.23, 0.06], position: [0, 0.345, -0.995], material: 'woodLight' },
  { id: 'upper-foot', geometry: 'box', size: [0.71, 0.23, 0.06], position: [0, 0.345, 0.995], material: 'woodLight' },
  { id: 'mattress-lower', geometry: 'roundedBox', size: [0.8, 0.08, 2], radius: 0.035, smoothness: 5, position: [0, 0.5, 0], material: 'fabricLight' },
  { id: 'mattress-upper', geometry: 'roundedBox', size: [0.8, 0.08, 2], radius: 0.035, smoothness: 5, position: [0, 0.58, 0], material: 'fabric' },
  { id: 'pillow', geometry: 'roundedBox', size: [0.52, 0.08, 0.28], radius: 0.035, smoothness: 5, position: [0, 0.66, -0.67], material: 'fabricLight' },
  { id: 'runner', geometry: 'roundedBox', size: [0.74, 0.03, 0.38], radius: 0.012, smoothness: 4, position: [0, 0.635, 0.55], material: 'fabricDark' },
];

const storageParts: readonly FurniturePart[] = [
  { id: 'storage-base', geometry: 'box', size: [0.94, 0.36, 2.06], position: [0, 0.18, 0], material: 'woodLight' },
  { id: 'mattress', geometry: 'roundedBox', size: [0.9, 0.2, 1.96], radius: 0.065, smoothness: 5, position: [0, 0.46, 0], material: 'fabricLight' },
  { id: 'head-panel', geometry: 'box', size: [0.96, 0.47, 0.05], position: [0, 0.235, -1.005], material: 'woodLight' },
  { id: 'foot-panel', geometry: 'box', size: [0.96, 0.47, 0.05], position: [0, 0.235, 1.005], material: 'woodLight' },
  { id: 'drawer-left', geometry: 'box', size: [0.01, 0.2, 0.94], position: [-0.465, 0.18, 0.28], material: 'woodLight' },
  { id: 'drawer-right', geometry: 'box', size: [0.01, 0.2, 0.94], position: [0.465, 0.18, 0.28], material: 'woodLight' },
  { id: 'handle-left', geometry: 'box', size: [0.01, 0.03, 0.16], position: [-0.475, 0.2, 0.28], material: 'metal' },
  { id: 'handle-right', geometry: 'box', size: [0.01, 0.03, 0.16], position: [0.475, 0.2, 0.28], material: 'metal' },
  { id: 'pillow-left', geometry: 'roundedBox', size: [0.34, 0.08, 0.25], radius: 0.035, smoothness: 5, position: [-0.21, 0.595, -0.63], material: 'fabric' },
  { id: 'pillow-right', geometry: 'roundedBox', size: [0.34, 0.08, 0.25], radius: 0.035, smoothness: 5, position: [0.21, 0.595, -0.63], material: 'fabric' },
];

const fabricHeadboardParts: readonly FurniturePart[] = [
  { id: 'upholstered-frame', geometry: 'roundedBox', size: [0.94, 0.28, 2.06], radius: 0.065, smoothness: 5, position: [0, 0.14, 0], material: 'fabricDark' },
  { id: 'mattress', geometry: 'roundedBox', size: [0.9, 0.2, 2], radius: 0.065, smoothness: 5, position: [0, 0.38, 0.02], material: 'fabricLight' },
  { id: 'fabric-headboard', geometry: 'roundedBox', size: [0.94, 0.85, 0.1], radius: 0.045, smoothness: 5, position: [0, 0.425, -0.98], material: 'fabric' },
  { id: 'headboard-inset', geometry: 'roundedBox', size: [0.84, 0.68, 0.025], radius: 0.018, smoothness: 4, position: [0, 0.49, -0.9225], material: 'fabricDark' },
  { id: 'pillow-left', geometry: 'roundedBox', size: [0.34, 0.08, 0.27], radius: 0.035, smoothness: 5, position: [-0.21, 0.515, -0.62], material: 'fabric' },
  { id: 'pillow-right', geometry: 'roundedBox', size: [0.34, 0.08, 0.27], radius: 0.035, smoothness: 5, position: [0.21, 0.515, -0.62], material: 'fabric' },
  { id: 'blanket', geometry: 'roundedBox', size: [0.86, 0.03, 0.46], radius: 0.012, smoothness: 4, position: [0, 0.49, 0.55], material: 'fabricDark' },
];

// Ashley platform bed: turquoise velvet, walnut rails and warm accent cushions.
const midcenturyTealParts: readonly FurniturePart[] = [
  { id: 'leg-left-head', geometry: 'cylinder', size: [0.045, 0.07, 0.2], position: [-0.78, 0.1, -0.95], material: 'woodDark' },
  { id: 'leg-right-head', geometry: 'cylinder', size: [0.045, 0.07, 0.2], position: [0.78, 0.1, -0.95], material: 'woodDark' },
  { id: 'leg-left-foot', geometry: 'cylinder', size: [0.045, 0.07, 0.2], position: [-0.78, 0.1, 0.95], material: 'woodDark' },
  { id: 'leg-right-foot', geometry: 'cylinder', size: [0.045, 0.07, 0.2], position: [0.78, 0.1, 0.95], material: 'woodDark' },
  { id: 'side-rail-left', geometry: 'roundedBox', size: [0.09, 0.24, 2.15], radius: 0.025, smoothness: 4, position: [-0.855, 0.28, 0.05], material: 'woodDark' },
  { id: 'side-rail-right', geometry: 'roundedBox', size: [0.09, 0.24, 2.15], radius: 0.025, smoothness: 4, position: [0.855, 0.28, 0.05], material: 'woodDark' },
  { id: 'head-rail', geometry: 'roundedBox', size: [1.71, 0.24, 0.1], radius: 0.025, smoothness: 4, position: [0, 0.28, -1.075], material: 'woodDark' },
  { id: 'foot-rail', geometry: 'roundedBox', size: [1.71, 0.24, 0.1], radius: 0.025, smoothness: 4, position: [0, 0.28, 1.105], material: 'woodDark' },
  { id: 'mattress-support', geometry: 'box', size: [1.62, 0.08, 2.06], position: [0, 0.36, 0.04], material: 'wood' },
  { id: 'mattress', geometry: 'roundedBox', size: [1.64, 0.22, 2.04], radius: 0.075, smoothness: 5, position: [0, 0.51, 0.04], material: 'fabricLight' },
  { id: 'teal-headboard', geometry: 'roundedBox', size: [1.8, 0.85, 0.12], radius: 0.055, smoothness: 5, position: [0, 0.765, -1.095], material: 'tealFabric' },
  { id: 'tuft-left-upper', geometry: 'cylinder', size: [0.018, 0.018, 0.015], position: [-0.48, 0.93, -1.0275], rotation: [Math.PI / 2, 0, 0], material: 'brass' },
  { id: 'tuft-center-upper', geometry: 'cylinder', size: [0.018, 0.018, 0.015], position: [0, 0.93, -1.0275], rotation: [Math.PI / 2, 0, 0], material: 'brass' },
  { id: 'tuft-right-upper', geometry: 'cylinder', size: [0.018, 0.018, 0.015], position: [0.48, 0.93, -1.0275], rotation: [Math.PI / 2, 0, 0], material: 'brass' },
  { id: 'tuft-left-lower', geometry: 'cylinder', size: [0.018, 0.018, 0.015], position: [-0.48, 0.68, -1.0275], rotation: [Math.PI / 2, 0, 0], material: 'brass' },
  { id: 'tuft-center-lower', geometry: 'cylinder', size: [0.018, 0.018, 0.015], position: [0, 0.68, -1.0275], rotation: [Math.PI / 2, 0, 0], material: 'brass' },
  { id: 'tuft-right-lower', geometry: 'cylinder', size: [0.018, 0.018, 0.015], position: [0.48, 0.68, -1.0275], rotation: [Math.PI / 2, 0, 0], material: 'brass' },
  { id: 'pillow-left', geometry: 'roundedBox', size: [0.58, 0.12, 0.34], radius: 0.05, smoothness: 5, position: [-0.34, 0.66, -0.62], material: 'orangeFabric' },
  { id: 'pillow-right', geometry: 'roundedBox', size: [0.58, 0.12, 0.34], radius: 0.05, smoothness: 5, position: [0.34, 0.66, -0.62], material: 'fabric' },
  { id: 'teal-runner', geometry: 'roundedBox', size: [1.54, 0.035, 0.48], radius: 0.016, smoothness: 4, position: [0, 0.6375, 0.64], material: 'tealFabric' },
];

// IKEA IDANÄS: button-tufted upholstery, turned wood feet and a generous sloped-looking headboard.
const classicIdanaesParts: readonly FurniturePart[] = [
  { id: 'leg-left-head', geometry: 'cylinder', size: [0.045, 0.065, 0.2], position: [-0.72, 0.1, -1.01], material: 'woodDark' },
  { id: 'leg-right-head', geometry: 'cylinder', size: [0.045, 0.065, 0.2], position: [0.72, 0.1, -1.01], material: 'woodDark' },
  { id: 'leg-left-foot', geometry: 'cylinder', size: [0.045, 0.065, 0.2], position: [-0.72, 0.1, 1.01], material: 'woodDark' },
  { id: 'leg-right-foot', geometry: 'cylinder', size: [0.045, 0.065, 0.2], position: [0.72, 0.1, 1.01], material: 'woodDark' },
  { id: 'side-rail-left', geometry: 'roundedBox', size: [0.13, 0.25, 2.08], radius: 0.04, smoothness: 5, position: [-0.72, 0.32, 0], material: 'fabricDark' },
  { id: 'side-rail-right', geometry: 'roundedBox', size: [0.13, 0.25, 2.08], radius: 0.04, smoothness: 5, position: [0.72, 0.32, 0], material: 'fabricDark' },
  { id: 'foot-rail', geometry: 'roundedBox', size: [1.45, 0.24, 0.14], radius: 0.045, smoothness: 5, position: [0, 0.3, 1.04], material: 'fabricDark' },
  { id: 'mattress-support', geometry: 'box', size: [1.4, 0.08, 2], position: [0, 0.42, 0], material: 'woodDark' },
  { id: 'mattress', geometry: 'roundedBox', size: [1.4, 0.28, 2], radius: 0.09, smoothness: 6, position: [0, 0.58, 0], material: 'fabricLight' },
  { id: 'headboard', geometry: 'roundedBox', size: [1.57, 0.92, 0.14], radius: 0.065, smoothness: 6, position: [0, 0.75, -1.04], material: 'fabricDark' },
  { id: 'headboard-inner', geometry: 'roundedBox', size: [1.39, 0.7, 0.025], radius: 0.04, smoothness: 5, position: [0, 0.78, -0.9575], material: 'fabricDark' },
  { id: 'tuft-left-upper', geometry: 'cylinder', size: [0.018, 0.018, 0.012], position: [-0.43, 0.94, -0.939], rotation: [Math.PI / 2, 0, 0], material: 'woodDark' },
  { id: 'tuft-center-upper', geometry: 'cylinder', size: [0.018, 0.018, 0.012], position: [0, 0.94, -0.939], rotation: [Math.PI / 2, 0, 0], material: 'woodDark' },
  { id: 'tuft-right-upper', geometry: 'cylinder', size: [0.018, 0.018, 0.012], position: [0.43, 0.94, -0.939], rotation: [Math.PI / 2, 0, 0], material: 'woodDark' },
  { id: 'tuft-left-lower', geometry: 'cylinder', size: [0.018, 0.018, 0.012], position: [-0.43, 0.69, -0.939], rotation: [Math.PI / 2, 0, 0], material: 'woodDark' },
  { id: 'tuft-center-lower', geometry: 'cylinder', size: [0.018, 0.018, 0.012], position: [0, 0.69, -0.939], rotation: [Math.PI / 2, 0, 0], material: 'woodDark' },
  { id: 'tuft-right-lower', geometry: 'cylinder', size: [0.018, 0.018, 0.012], position: [0.43, 0.69, -0.939], rotation: [Math.PI / 2, 0, 0], material: 'woodDark' },
  { id: 'pillow-left', geometry: 'roundedBox', size: [0.56, 0.11, 0.34], radius: 0.055, smoothness: 6, position: [-0.32, 0.765, -0.66], material: 'fabric' },
  { id: 'pillow-right', geometry: 'roundedBox', size: [0.56, 0.11, 0.34], radius: 0.055, smoothness: 6, position: [0.32, 0.765, -0.66], material: 'fabric' },
];

// IKEA SMÅSTAD: a 90x200 loft bed with an integrated desk, wardrobe, shelves and ladder.
const loftDeskParts: readonly FurniturePart[] = [
  { id: 'post-left-back', geometry: 'box', size: [0.08, 1.74, 0.08], position: [-0.995, 0.87, -0.48], material: 'paintedWhite' },
  { id: 'post-left-front', geometry: 'box', size: [0.08, 1.74, 0.08], position: [-0.995, 0.87, 0.48], material: 'paintedWhite' },
  { id: 'post-right-back', geometry: 'box', size: [0.08, 1.74, 0.08], position: [0.995, 0.87, -0.48], material: 'paintedWhite' },
  { id: 'post-right-front', geometry: 'box', size: [0.08, 1.74, 0.08], position: [0.995, 0.87, 0.48], material: 'paintedWhite' },
  { id: 'upper-back-rail', geometry: 'box', size: [1.99, 0.22, 0.08], position: [0, 1.49, -0.48], material: 'paintedWhite' },
  { id: 'upper-front-rail', geometry: 'box', size: [1.99, 0.22, 0.08], position: [0, 1.49, 0.48], material: 'paintedWhite' },
  { id: 'upper-left-rail', geometry: 'box', size: [0.08, 0.22, 0.88], position: [-0.995, 1.49, 0], material: 'paintedWhite' },
  { id: 'upper-right-rail', geometry: 'box', size: [0.08, 0.22, 0.88], position: [0.995, 1.49, 0], material: 'paintedWhite' },
  { id: 'mattress-support', geometry: 'box', size: [1.91, 0.08, 0.88], position: [0, 1.39, 0], material: 'woodLight' },
  { id: 'loft-mattress', geometry: 'roundedBox', size: [1.9, 0.16, 0.86], radius: 0.055, smoothness: 5, position: [0, 1.51, 0], material: 'fabricLight' },
  { id: 'guard-back', geometry: 'box', size: [1.9, 0.08, 0.06], position: [0, 1.78, -0.49], material: 'paintedWhite' },
  { id: 'guard-front', geometry: 'box', size: [1.28, 0.08, 0.06], position: [-0.27, 1.78, 0.49], material: 'paintedWhite' },
  { id: 'guard-front-left-support', geometry: 'box', size: [0.06, 0.28, 0.06], position: [-0.87, 1.65, 0.49], material: 'paintedWhite' },
  { id: 'guard-front-right-support', geometry: 'box', size: [0.06, 0.28, 0.06], position: [0.33, 1.65, 0.49], material: 'paintedWhite' },
  { id: 'guard-back-left-support', geometry: 'box', size: [0.06, 0.28, 0.06], position: [-0.87, 1.65, -0.49], material: 'paintedWhite' },
  { id: 'guard-back-right-support', geometry: 'box', size: [0.06, 0.28, 0.06], position: [0.87, 1.65, -0.49], material: 'paintedWhite' },
  { id: 'wardrobe-body', geometry: 'box', size: [0.5, 1.4, 0.66], position: [-0.72, 0.7, -0.05], material: 'paintedWhite' },
  { id: 'wardrobe-door', geometry: 'box', size: [0.46, 1.3, 0.025], position: [-0.72, 0.7, 0.2925], material: 'paintedWhite' },
  { id: 'wardrobe-handle', geometry: 'box', size: [0.025, 0.18, 0.025], position: [-0.51, 0.78, 0.31], material: 'metalLight' },
  { id: 'desk-left-panel', geometry: 'box', size: [0.05, 0.73, 0.58], position: [-0.275, 0.365, 0.1], material: 'paintedWhite' },
  { id: 'desk-right-panel', geometry: 'box', size: [0.05, 0.73, 0.58], position: [0.92, 0.365, 0.1], material: 'paintedWhite' },
  { id: 'desk-top', geometry: 'roundedBox', size: [1.25, 0.05, 0.58], radius: 0.018, smoothness: 4, position: [0.32, 0.755, 0.1], material: 'paintedWhite' },
  { id: 'desk-back-brace', geometry: 'box', size: [1.15, 0.22, 0.04], position: [0.32, 0.62, -0.21], material: 'paintedWhite' },
  { id: 'shelf-back', geometry: 'box', size: [1.15, 0.62, 0.04], position: [0.32, 1.08, -0.43], material: 'paintedWhite' },
  { id: 'shelf-lower', geometry: 'box', size: [1.15, 0.04, 0.28], position: [0.32, 0.84, -0.31], material: 'paintedWhite' },
  { id: 'shelf-upper', geometry: 'box', size: [1.15, 0.04, 0.28], position: [0.32, 1.16, -0.31], material: 'paintedWhite' },
  { id: 'ladder-left', geometry: 'box', size: [0.05, 1.42, 0.06], position: [0.68, 0.71, 0.49], material: 'metalLight' },
  { id: 'ladder-right', geometry: 'box', size: [0.05, 1.42, 0.06], position: [0.9, 0.71, 0.49], material: 'metalLight' },
  { id: 'ladder-rung-1', geometry: 'box', size: [0.22, 0.045, 0.06], position: [0.79, 0.28, 0.49], material: 'metalLight' },
  { id: 'ladder-rung-2', geometry: 'box', size: [0.22, 0.045, 0.06], position: [0.79, 0.56, 0.49], material: 'metalLight' },
  { id: 'ladder-rung-3', geometry: 'box', size: [0.22, 0.045, 0.06], position: [0.79, 0.84, 0.49], material: 'metalLight' },
  { id: 'ladder-rung-4', geometry: 'box', size: [0.22, 0.045, 0.06], position: [0.79, 1.12, 0.49], material: 'metalLight' },
  { id: 'loft-pillow', geometry: 'roundedBox', size: [0.45, 0.08, 0.32], radius: 0.04, smoothness: 5, position: [-0.64, 1.63, -0.22], material: 'fabric' },
];

export const BED_DESIGNS: Readonly<Record<BedDesignKey, BedDesign>> = Object.freeze({
  bedLowPlatform: Object.freeze({
    schemaVersion: '1.0', id: 'bed-low-platform', name: '로우 플랫폼 침대', furnitureType: '침대', category: '침대', variant: '로우 플랫폼형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.83, depth: 2.05, height: 0.7 }), materials: Object.freeze(['wood', 'woodLight', 'fabric', 'fabricLight', 'fabricDark'] as const), parts: Object.freeze(lowPlatformParts),
    purchaseUrl: 'https://www.ikea.com/kr/ko/p/utaker-stackable-bed-with-2-mattresses-pine-agotnes-firm-s49428133/',
  }),
  bedStorage: Object.freeze({
    schemaVersion: '1.0', id: 'bed-storage', name: '수납형 침대', furnitureType: '침대', category: '침대', variant: '수납형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.96, depth: 2.06, height: 0.635 }), materials: Object.freeze(['woodLight', 'fabric', 'fabricLight', 'metal'] as const), parts: Object.freeze(storageParts),
    purchaseUrl: 'https://www.ikea.com/kr/ko/p/brimnes-bed-frame-with-storage-white-loenset-s39278346/',
  }),
  bedFabricHeadboard: Object.freeze({
    schemaVersion: '1.0', id: 'bed-fabric-headboard', name: '패브릭 헤드 침대', furnitureType: '침대', category: '침대', variant: '패브릭 헤드형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.94, depth: 2.06, height: 0.85 }), materials: Object.freeze(['fabric', 'fabricLight', 'fabricDark'] as const), parts: Object.freeze(fabricHeadboardParts),
    purchaseUrl: 'https://www.ikea.com/kr/ko/p/slattum-upholstered-bed-frame-vissle-dark-grey-60571252/',
  }),
  bedMidcenturyTeal: Object.freeze({
    schemaVersion: '1.0', id: 'bed-midcentury-teal', name: '미드센추리 터쿼이즈 침대', furnitureType: '침대', category: '침대', variant: '미드센추리 터쿼이즈형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.8, depth: 2.31, height: 1.19 }), materials: Object.freeze(['wood', 'woodDark', 'fabric', 'fabricLight', 'tealFabric', 'orangeFabric', 'brass'] as const), parts: Object.freeze(midcenturyTealParts),
    purchaseUrl: 'https://midinmod.com/products/ashley-platform-queen-bed-dark-teal-velvet',
  }),
  bedClassicIdanaes: Object.freeze({
    schemaVersion: '1.0', id: 'bed-classic-idanaes', name: '클래식 버튼 패브릭 침대', furnitureType: '침대', category: '침대', variant: '클래식 버튼형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.57, depth: 2.22, height: 1.21 }), materials: Object.freeze(['woodDark', 'fabric', 'fabricLight', 'fabricDark'] as const), parts: Object.freeze(classicIdanaesParts),
    purchaseUrl: 'https://www.ikea.com/kr/en/p/idanaes-upholstered-bed-frame-gunnared-dark-grey-80458938/',
  }),
  bedLoftDesk: Object.freeze({
    schemaVersion: '1.0', id: 'bed-loft-desk', name: '책상 수납 로프트 침대', furnitureType: '침대', category: '침대', variant: '책상 수납 로프트형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 2.07, depth: 1.04, height: 1.82 }), materials: Object.freeze(['paintedWhite', 'woodLight', 'fabric', 'fabricLight', 'metalLight'] as const), parts: Object.freeze(loftDeskParts),
    purchaseUrl: 'https://www.ikea.com/kr/en/p/smastad-loft-bed-frame-w-desk-and-storage-white-30454037/',
  }),
});
