import type { FurnitureDesign, FurniturePart } from './designTypes';

export type TvDesignKey = 'tvSmall' | 'tvMedium' | 'tvWide' | 'tvNaturalFrame';
export type TvDesign = FurnitureDesign<'TV', 'TV'>;

const COORDINATE_SYSTEM = Object.freeze({
  origin: 'floor-center' as const,
  axes: Object.freeze({ x: 'right' as const, y: 'up' as const, z: 'front' as const }),
});

const smallParts: readonly FurniturePart[] = [
  { id: 'foot-left', geometry: 'box', size: [0.12, 0.0274, 0.1505], position: [-0.30625, 0.0137, 0], material: 'metal' },
  { id: 'foot-right', geometry: 'box', size: [0.12, 0.0274, 0.1505], position: [0.30625, 0.0137, 0], material: 'metal' },
  { id: 'frame', geometry: 'roundedBox', size: [0.7374, 0.438, 0.0741], radius: 0.018, smoothness: 4, position: [0, 0.2464, 0], material: 'screenFrame' },
  { id: 'display', geometry: 'box', size: [0.7094, 0.399, 0.008], position: [0, 0.2519, 0.04105], material: 'screen' },
  { id: 'brand-mark', geometry: 'box', size: [0.045, 0.008, 0.004], position: [0, 0.0424, 0.03905], material: 'metalLight' },
];

const mediumParts: readonly FurniturePart[] = [
  { id: 'foot-left', geometry: 'box', size: [0.12, 0.0483, 0.191], position: [-0.27745, 0.02415, 0], material: 'metal' },
  { id: 'foot-right', geometry: 'box', size: [0.12, 0.0483, 0.191], position: [0.27745, 0.02415, 0], material: 'metal' },
  { id: 'frame', geometry: 'roundedBox', size: [0.9675, 0.5614, 0.0597], radius: 0.018, smoothness: 4, position: [0, 0.329, 0], material: 'screenFrame' },
  { id: 'display', geometry: 'box', size: [0.9355, 0.5184, 0.008], position: [0, 0.3345, 0.03385], material: 'screen' },
  { id: 'brand-mark', geometry: 'box', size: [0.052, 0.008, 0.004], position: [0, 0.0623, 0.03185], material: 'metalLight' },
];

const wideParts: readonly FurniturePart[] = [
  { id: 'foot-left', geometry: 'box', size: [0.15, 0.0472, 0.237], position: [-0.3373, 0.0236, 0], material: 'metal' },
  { id: 'foot-right', geometry: 'box', size: [0.15, 0.0472, 0.237], position: [0.3373, 0.0236, 0], material: 'metal' },
  { id: 'frame', geometry: 'roundedBox', size: [1.2341, 0.7108, 0.0603], radius: 0.02, smoothness: 4, position: [0, 0.4026, 0], material: 'screenFrame' },
  { id: 'display', geometry: 'box', size: [1.1981, 0.6628, 0.008], position: [0, 0.4096, 0.03415], material: 'screen' },
  { id: 'brand-mark', geometry: 'box', size: [0.06, 0.009, 0.004], position: [0, 0.0612, 0.03215], material: 'metalLight' },
];

// 43-inch The Frame with teak bezel and stand: 0.9695 × 0.1968 × 0.5919 m.
const naturalFrameParts: readonly FurniturePart[] = [
  { id: 'foot-left', geometry: 'roundedBox', size: [0.18, 0.025, 0.1968], radius: 0.012, smoothness: 4, position: [-0.31, 0.0125, 0], material: 'metal' },
  { id: 'foot-right', geometry: 'roundedBox', size: [0.18, 0.025, 0.1968], radius: 0.012, smoothness: 4, position: [0.31, 0.0125, 0], material: 'metal' },
  { id: 'support-left', geometry: 'box', size: [0.025, 0.06, 0.025], position: [-0.31, 0.05, 0], material: 'metal' },
  { id: 'support-right', geometry: 'box', size: [0.025, 0.06, 0.025], position: [0.31, 0.05, 0], material: 'metal' },
  { id: 'rear-panel', geometry: 'roundedBox', size: [0.9695, 0.5469, 0.035], radius: 0.012, smoothness: 4, position: [0, 0.31845, 0], material: 'screenFrame' },
  { id: 'bezel-top', geometry: 'roundedBox', size: [0.9695, 0.026, 0.018], radius: 0.007, smoothness: 4, position: [0, 0.5789, 0.0265], material: 'woodLight' },
  { id: 'bezel-bottom', geometry: 'roundedBox', size: [0.9695, 0.026, 0.018], radius: 0.007, smoothness: 4, position: [0, 0.05795, 0.0265], material: 'woodLight' },
  { id: 'bezel-left', geometry: 'roundedBox', size: [0.026, 0.4949, 0.018], radius: 0.007, smoothness: 4, position: [-0.47175, 0.31845, 0.0265], material: 'woodLight' },
  { id: 'bezel-right', geometry: 'roundedBox', size: [0.026, 0.4949, 0.018], radius: 0.007, smoothness: 4, position: [0.47175, 0.31845, 0.0265], material: 'woodLight' },
  { id: 'art-display', geometry: 'box', size: [0.9175, 0.4949, 0.006], position: [0, 0.31845, 0.0385], material: 'screen' },
];

export const TV_DESIGNS: Readonly<Record<TvDesignKey, TvDesign>> = Object.freeze({
  tvSmall: Object.freeze({
    schemaVersion: '1.0', id: 'tv-small', name: '소형 TV', furnitureType: 'TV', category: 'TV', variant: '소형형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.7374, depth: 0.1505, height: 0.4654 }), materials: Object.freeze(['metal', 'metalLight', 'screenFrame', 'screen'] as const), parts: Object.freeze(smallParts),
  }),
  tvMedium: Object.freeze({
    schemaVersion: '1.0', id: 'tv-medium', name: '중형 TV', furnitureType: 'TV', category: 'TV', variant: '중형형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.9675, depth: 0.191, height: 0.6097 }), materials: Object.freeze(['metal', 'metalLight', 'screenFrame', 'screen'] as const), parts: Object.freeze(mediumParts),
  }),
  tvWide: Object.freeze({
    schemaVersion: '1.0', id: 'tv-wide', name: '와이드형 TV', furnitureType: 'TV', category: 'TV', variant: '와이드형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.2341, depth: 0.237, height: 0.758 }), materials: Object.freeze(['metal', 'metalLight', 'screenFrame', 'screen'] as const), parts: Object.freeze(wideParts),
  }),
  tvNaturalFrame: Object.freeze({
    schemaVersion: '1.0', id: 'tv-natural-frame', name: '내추럴 우드 프레임 TV', furnitureType: 'TV', category: 'TV', variant: '내추럴 우드 프레임형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.9695, depth: 0.1968, height: 0.5919 }), materials: Object.freeze(['metal', 'woodLight', 'screenFrame', 'screen'] as const), parts: Object.freeze(naturalFrameParts), purchaseUrl: 'https://www.samsung.com/sec/tvs/packge-kq43lsf03-tk-d2c/KQ43LSF03-TK/',
  }),
});
