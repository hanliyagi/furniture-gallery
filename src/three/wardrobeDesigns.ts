import type { FurnitureDesign, FurniturePart } from './designTypes';

export type WardrobeDesignKey =
  | 'wardrobeHinged'
  | 'wardrobeSliding'
  | 'wardrobeOpen'
  | 'wardrobeNaturalNordkisa'
  | 'wardrobeClassicGullaberg';
export type WardrobeDesign = FurnitureDesign<'옷장', '옷장'>;

const COORDINATE_SYSTEM = Object.freeze({
  origin: 'floor-center' as const,
  axes: Object.freeze({ x: 'right' as const, y: 'up' as const, z: 'front' as const }),
});

const hingedParts: readonly FurniturePart[] = [
  { id: 'plinth', geometry: 'box', size: [0.79, 0.08, 0.55], position: [0, 0.04, 0], material: 'woodDark' },
  { id: 'side-left', geometry: 'box', size: [0.04, 1.68, 0.55], position: [-0.375, 0.92, 0], material: 'woodLight' },
  { id: 'side-right', geometry: 'box', size: [0.04, 1.68, 0.55], position: [0.375, 0.92, 0], material: 'woodLight' },
  { id: 'top', geometry: 'box', size: [0.71, 0.04, 0.55], position: [0, 1.74, 0], material: 'wood' },
  { id: 'back-panel', geometry: 'box', size: [0.71, 1.64, 0.02], position: [0, 0.9, -0.265], material: 'woodDark' },
  { id: 'door-left', geometry: 'box', size: [0.345, 1.6, 0.025], position: [-0.18, 0.9, 0.2625], material: 'wood' },
  { id: 'door-right', geometry: 'box', size: [0.345, 1.6, 0.025], position: [0.18, 0.9, 0.2625], material: 'wood' },
  { id: 'hinge-left-lower', geometry: 'box', size: [0.03, 0.05, 0.04], position: [-0.355, 0.35, 0.25], material: 'metal' },
  { id: 'hinge-left-upper', geometry: 'box', size: [0.03, 0.05, 0.04], position: [-0.355, 1.45, 0.25], material: 'metal' },
  { id: 'hinge-right-lower', geometry: 'box', size: [0.03, 0.05, 0.04], position: [0.355, 0.35, 0.25], material: 'metal' },
  { id: 'hinge-right-upper', geometry: 'box', size: [0.03, 0.05, 0.04], position: [0.355, 1.45, 0.25], material: 'metal' },
  { id: 'handle-left', geometry: 'box', size: [0.02, 0.18, 0.012], position: [-0.035, 0.93, 0.269], material: 'metal' },
  { id: 'handle-right', geometry: 'box', size: [0.02, 0.18, 0.012], position: [0.035, 0.93, 0.269], material: 'metal' },
];

const slidingParts: readonly FurniturePart[] = [
  { id: 'plinth', geometry: 'box', size: [1.17, 0.08, 0.55], position: [0, 0.04, 0], material: 'woodDark' },
  { id: 'side-left', geometry: 'box', size: [0.04, 1.68, 0.55], position: [-0.565, 0.92, 0], material: 'woodLight' },
  { id: 'side-right', geometry: 'box', size: [0.04, 1.68, 0.55], position: [0.565, 0.92, 0], material: 'woodLight' },
  { id: 'top', geometry: 'box', size: [1.09, 0.04, 0.55], position: [0, 1.74, 0], material: 'wood' },
  { id: 'back-panel', geometry: 'box', size: [1.09, 1.64, 0.02], position: [0, 0.9, -0.265], material: 'woodDark' },
  { id: 'lower-track', geometry: 'box', size: [1.09, 0.025, 0.04], position: [0, 0.1075, 0.24], material: 'metalLight' },
  { id: 'upper-track', geometry: 'box', size: [1.09, 0.025, 0.04], position: [0, 1.6675, 0.24], material: 'metalLight' },
  { id: 'sliding-door-left', geometry: 'box', size: [0.56, 1.56, 0.025], position: [-0.285, 0.9, 0.2625], material: 'wood' },
  { id: 'sliding-door-right', geometry: 'box', size: [0.56, 1.56, 0.025], position: [0.285, 0.9, 0.2375], material: 'woodLight' },
  { id: 'recessed-grip', geometry: 'box', size: [0.018, 0.32, 0.01], position: [-0.015, 0.93, 0.27], material: 'metal' },
];

const openParts: readonly FurniturePart[] = [
  { id: 'base-frame', geometry: 'box', size: [0.99, 0.04, 0.51], position: [0, 0.02, 0], material: 'metal' },
  { id: 'post-left-front', geometry: 'box', size: [0.04, 1.65, 0.04], position: [-0.46, 0.845, 0.22], material: 'metal' },
  { id: 'post-left-back', geometry: 'box', size: [0.04, 1.65, 0.04], position: [-0.46, 0.845, -0.22], material: 'metal' },
  { id: 'post-right-front', geometry: 'box', size: [0.04, 1.65, 0.04], position: [0.46, 0.845, 0.22], material: 'metal' },
  { id: 'post-right-back', geometry: 'box', size: [0.04, 1.65, 0.04], position: [0.46, 0.845, -0.22], material: 'metal' },
  { id: 'top-frame', geometry: 'box', size: [0.99, 0.06, 0.51], position: [0, 1.7, 0], material: 'metal' },
  { id: 'top-shelf', geometry: 'box', size: [0.91, 0.04, 0.47], position: [0, 1.62, 0], material: 'woodLight' },
  { id: 'center-divider', geometry: 'box', size: [0.04, 1.15, 0.47], position: [0.15, 0.595, 0], material: 'metalLight' },
  { id: 'shelf-lower', geometry: 'box', size: [0.34, 0.04, 0.47], position: [0.32, 0.4, 0], material: 'woodLight' },
  { id: 'shelf-middle', geometry: 'box', size: [0.34, 0.04, 0.47], position: [0.32, 0.75, 0], material: 'woodLight' },
  { id: 'shelf-upper', geometry: 'box', size: [0.34, 0.04, 0.47], position: [0.32, 1.1, 0], material: 'woodLight' },
  { id: 'rail-bracket-left', geometry: 'box', size: [0.105, 0.04, 0.18], position: [-0.4075, 1.42, -0.15], material: 'metalLight' },
  { id: 'rail-bracket-right', geometry: 'box', size: [0.105, 0.04, 0.18], position: [0.4075, 1.42, -0.15], material: 'metalLight' },
  { id: 'hanging-rail', geometry: 'cylinder', size: [0.025, 0.025, 0.75], position: [0, 1.42, -0.15], rotation: [0, 0, Math.PI / 2], material: 'metalLight' },
];

const naturalNordkisaParts: readonly FurniturePart[] = [
  { id: 'base-shelf', geometry: 'roundedBox', size: [1.2, 0.07, 0.47], radius: 0.018, smoothness: 4, position: [0, 0.035, 0], material: 'woodLight' },
  { id: 'post-left-front', geometry: 'roundedBox', size: [0.055, 1.79, 0.055], radius: 0.014, smoothness: 4, position: [-0.5725, 0.965, 0.2075], material: 'wood' },
  { id: 'post-left-back', geometry: 'roundedBox', size: [0.055, 1.79, 0.055], radius: 0.014, smoothness: 4, position: [-0.5725, 0.965, -0.2075], material: 'wood' },
  { id: 'post-right-front', geometry: 'roundedBox', size: [0.055, 1.79, 0.055], radius: 0.014, smoothness: 4, position: [0.5725, 0.965, 0.2075], material: 'wood' },
  { id: 'post-right-back', geometry: 'roundedBox', size: [0.055, 1.79, 0.055], radius: 0.014, smoothness: 4, position: [0.5725, 0.965, -0.2075], material: 'wood' },
  { id: 'top-shelf', geometry: 'roundedBox', size: [1.09, 0.055, 0.415], radius: 0.014, smoothness: 4, position: [0, 1.8325, 0], material: 'woodLight' },
  { id: 'center-divider', geometry: 'box', size: [0.045, 1.52, 0.415], position: [0.17, 0.83, 0], material: 'wood' },
  { id: 'shelf-lower', geometry: 'roundedBox', size: [0.375, 0.045, 0.415], radius: 0.01, smoothness: 4, position: [0.36, 0.38, 0], material: 'woodLight' },
  { id: 'shelf-middle', geometry: 'roundedBox', size: [0.375, 0.045, 0.415], radius: 0.01, smoothness: 4, position: [0.36, 0.82, 0], material: 'woodLight' },
  { id: 'shelf-upper', geometry: 'roundedBox', size: [0.375, 0.045, 0.415], radius: 0.01, smoothness: 4, position: [0.36, 1.26, 0], material: 'woodLight' },
  { id: 'hanging-rail', geometry: 'cylinder', size: [0.018, 0.018, 0.69], position: [-0.2, 1.51, -0.19], rotation: [0, 0, Math.PI / 2], material: 'metalLight' },
  { id: 'door-rail-bottom', geometry: 'roundedBox', size: [0.47, 0.055, 0.035], radius: 0.012, smoothness: 4, position: [-0.31, 0.13, 0.2175], material: 'woodDark' },
  { id: 'door-rail-top', geometry: 'roundedBox', size: [0.47, 0.055, 0.035], radius: 0.012, smoothness: 4, position: [-0.31, 1.73, 0.2175], material: 'woodDark' },
  ...Array.from({ length: 7 }, (_, index): FurniturePart => ({
    id: `door-slat-${index + 1}`,
    geometry: 'roundedBox',
    size: [0.038, 1.6, 0.035],
    radius: 0.009,
    smoothness: 3,
    position: [-0.49 + index * 0.06, 0.93, 0.2175],
    material: index % 2 === 0 ? 'wood' : 'woodLight',
  })),
];

const classicGullabergParts: readonly FurniturePart[] = [
  { id: 'leg-left-front', geometry: 'roundedBox', size: [0.09, 0.18, 0.09], radius: 0.018, smoothness: 4, position: [-0.54, 0.09, 0.25], material: 'paintedWhite' },
  { id: 'leg-left-back', geometry: 'roundedBox', size: [0.09, 0.18, 0.09], radius: 0.018, smoothness: 4, position: [-0.54, 0.09, -0.25], material: 'paintedWhite' },
  { id: 'leg-right-front', geometry: 'roundedBox', size: [0.09, 0.18, 0.09], radius: 0.018, smoothness: 4, position: [0.54, 0.09, 0.25], material: 'paintedWhite' },
  { id: 'leg-right-back', geometry: 'roundedBox', size: [0.09, 0.18, 0.09], radius: 0.018, smoothness: 4, position: [0.54, 0.09, -0.25], material: 'paintedWhite' },
  { id: 'bottom-panel', geometry: 'box', size: [1.18, 0.06, 0.6], position: [0, 0.21, 0], material: 'paintedWhite' },
  { id: 'side-left', geometry: 'box', size: [0.06, 1.72, 0.6], position: [-0.56, 1.07, 0], material: 'paintedWhite' },
  { id: 'side-right', geometry: 'box', size: [0.06, 1.72, 0.6], position: [0.56, 1.07, 0], material: 'paintedWhite' },
  { id: 'center-divider-left', geometry: 'box', size: [0.035, 1.69, 0.6], position: [-0.19, 1.085, 0], material: 'paintedWhite' },
  { id: 'center-divider-right', geometry: 'box', size: [0.035, 1.69, 0.6], position: [0.19, 1.085, 0], material: 'paintedWhite' },
  { id: 'back-panel', geometry: 'box', size: [1.12, 1.72, 0.02], position: [0, 1.07, -0.31], material: 'paintedWhite' },
  { id: 'top-moulding', geometry: 'roundedBox', size: [1.28, 0.08, 0.64], radius: 0.018, smoothness: 4, position: [0, 1.97, 0], material: 'paintedWhite' },
  { id: 'door-left', geometry: 'roundedBox', size: [0.35, 1.48, 0.025], radius: 0.012, smoothness: 4, position: [-0.37, 1.18, 0.3075], material: 'paintedWhite' },
  { id: 'door-center-frame', geometry: 'roundedBox', size: [0.35, 1.48, 0.025], radius: 0.012, smoothness: 4, position: [0, 1.18, 0.3075], material: 'paintedWhite' },
  { id: 'door-center-mirror', geometry: 'roundedBox', size: [0.29, 1.36, 0.008], radius: 0.008, smoothness: 4, position: [0, 1.2, 0.316], material: 'mirror' },
  { id: 'door-right', geometry: 'roundedBox', size: [0.35, 1.48, 0.025], radius: 0.012, smoothness: 4, position: [0.37, 1.18, 0.3075], material: 'paintedWhite' },
  { id: 'drawer-left', geometry: 'roundedBox', size: [0.53, 0.22, 0.025], radius: 0.01, smoothness: 4, position: [-0.28, 0.36, 0.3075], material: 'paintedWhite' },
  { id: 'drawer-right', geometry: 'roundedBox', size: [0.53, 0.22, 0.025], radius: 0.01, smoothness: 4, position: [0.28, 0.36, 0.3075], material: 'paintedWhite' },
  { id: 'door-knob-left', geometry: 'cylinder', size: [0.018, 0.018, 0.035], position: [-0.23, 1.12, 0.3025], rotation: [Math.PI / 2, 0, 0], material: 'wood' },
  { id: 'door-knob-center', geometry: 'cylinder', size: [0.018, 0.018, 0.035], position: [0.14, 1.12, 0.3025], rotation: [Math.PI / 2, 0, 0], material: 'wood' },
  { id: 'door-knob-right', geometry: 'cylinder', size: [0.018, 0.018, 0.035], position: [0.51, 1.12, 0.3025], rotation: [Math.PI / 2, 0, 0], material: 'wood' },
  { id: 'drawer-knob-left', geometry: 'cylinder', size: [0.018, 0.018, 0.035], position: [-0.28, 0.36, 0.3025], rotation: [Math.PI / 2, 0, 0], material: 'wood' },
  { id: 'drawer-knob-right', geometry: 'cylinder', size: [0.018, 0.018, 0.035], position: [0.28, 0.36, 0.3025], rotation: [Math.PI / 2, 0, 0], material: 'wood' },
];

export const WARDROBE_DESIGNS: Readonly<Record<WardrobeDesignKey, WardrobeDesign>> = Object.freeze({
  wardrobeHinged: Object.freeze({
    schemaVersion: '1.0', id: 'wardrobe-hinged', name: '여닫이형 옷장', furnitureType: '옷장', category: '옷장', variant: '여닫이형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.79, depth: 0.55, height: 1.76 }), materials: Object.freeze(['wood', 'woodLight', 'woodDark', 'metal'] as const), parts: Object.freeze(hingedParts), purchaseUrl: 'https://www.ikea.com/kr/ko/p/kleppstad-wardrobe-with-2-doors-white-10437237/',
  }),
  wardrobeSliding: Object.freeze({
    schemaVersion: '1.0', id: 'wardrobe-sliding', name: '슬라이딩형 옷장', furnitureType: '옷장', category: '옷장', variant: '슬라이딩형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.17, depth: 0.55, height: 1.76 }), materials: Object.freeze(['wood', 'woodLight', 'woodDark', 'metal', 'metalLight'] as const), parts: Object.freeze(slidingParts), purchaseUrl: 'https://www.ikea.com/kr/ko/p/kleppstad-wardrobe-with-sliding-doors-white-30437241/',
  }),
  wardrobeOpen: Object.freeze({
    schemaVersion: '1.0', id: 'wardrobe-open', name: '오픈형 옷장', furnitureType: '옷장', category: '옷장', variant: '오픈형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.99, depth: 0.51, height: 1.73 }), materials: Object.freeze(['woodLight', 'metal', 'metalLight'] as const), parts: Object.freeze(openParts), purchaseUrl: 'https://www.ikea.com/kr/ko/p/jonaxel-wardrobe-combination-white-s89297658/',
  }),
  wardrobeNaturalNordkisa: Object.freeze({
    schemaVersion: '1.0', id: 'wardrobe-natural-nordkisa', name: '내추럴 슬라이딩 오픈 옷장', furnitureType: '옷장', category: '옷장', variant: '내추럴 슬라이딩 오픈형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.2, depth: 0.47, height: 1.86 }), materials: Object.freeze(['wood', 'woodLight', 'woodDark', 'metalLight'] as const), parts: Object.freeze(naturalNordkisaParts), purchaseUrl: 'https://www.ikea.com/kr/en/p/nordkisa-open-wardrobe-with-sliding-door-bamboo-80439469/',
  }),
  wardrobeClassicGullaberg: Object.freeze({
    schemaVersion: '1.0', id: 'wardrobe-classic-gullaberg', name: '클래식 미러 옷장', furnitureType: '옷장', category: '옷장', variant: '클래식 3도어 미러형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.28, depth: 0.64, height: 2.01 }), materials: Object.freeze(['paintedWhite', 'wood', 'mirror'] as const), parts: Object.freeze(classicGullabergParts), purchaseUrl: 'https://www.ikea.com/kr/en/p/gullaberg-wardrobe-white-90573952/',
  }),
});
