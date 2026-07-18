import type { FurnitureDesign, FurniturePart } from './designTypes';

export type DeskDesignKey = 'deskCompact' | 'deskStorage' | 'deskCorner' | 'deskMidcenturyGlass';
export type DeskPart = FurniturePart;
export type DeskDesign = FurnitureDesign<'책상', '책상'>;

const COORDINATE_SYSTEM = Object.freeze({
  origin: 'floor-center' as const,
  axes: Object.freeze({ x: 'right' as const, y: 'up' as const, z: 'front' as const }),
});

const compactParts: readonly DeskPart[] = [
  // IKEA LAGKAPTEN / ADILS: slim white top over four independent, round steel legs.
  { id: 'top', geometry: 'roundedBox', size: [1.2, 0.035, 0.6], radius: 0.008, smoothness: 3, position: [0, 0.7125, 0], material: 'paintedWhite' },
  { id: 'left-frame-front', geometry: 'cylinder', size: [0.018, 0.025, 0.695], position: [-0.54, 0.3475, 0.24], material: 'metalLight' },
  { id: 'left-frame-back', geometry: 'cylinder', size: [0.018, 0.025, 0.695], position: [-0.54, 0.3475, -0.24], material: 'metalLight' },
  { id: 'right-frame-front', geometry: 'cylinder', size: [0.018, 0.025, 0.695], position: [0.54, 0.3475, 0.24], material: 'metalLight' },
  { id: 'right-frame-back', geometry: 'cylinder', size: [0.018, 0.025, 0.695], position: [0.54, 0.3475, -0.24], material: 'metalLight' },
  { id: 'left-foot', geometry: 'cylinder', size: [0.027, 0.027, 0.018], position: [-0.54, 0.009, 0.24], material: 'metal' },
  { id: 'right-foot', geometry: 'cylinder', size: [0.027, 0.027, 0.018], position: [0.54, 0.009, 0.24], material: 'metal' },
  { id: 'left-upper-rail', geometry: 'cylinder', size: [0.028, 0.028, 0.015], position: [-0.54, 0.675, 0.24], material: 'metal' },
  { id: 'right-upper-rail', geometry: 'cylinder', size: [0.028, 0.028, 0.015], position: [0.54, 0.675, 0.24], material: 'metal' },
  { id: 'rear-brace', geometry: 'cylinder', size: [0.027, 0.027, 0.018], position: [-0.54, 0.009, -0.24], material: 'metal' },
  { id: 'cable-tray', geometry: 'cylinder', size: [0.027, 0.027, 0.018], position: [0.54, 0.009, -0.24], material: 'metal' },
  { id: 'cable-tray-bracket-left', geometry: 'cylinder', size: [0.028, 0.028, 0.015], position: [-0.54, 0.675, -0.24], material: 'metal' },
  { id: 'cable-tray-bracket-right', geometry: 'cylinder', size: [0.028, 0.028, 0.015], position: [0.54, 0.675, -0.24], material: 'metal' },
];

const storageParts: readonly DeskPart[] = [
  { id: 'top', geometry: 'box', size: [1.4, 0.035, 0.62], position: [0, 0.7125, 0], material: 'woodLight' },
  { id: 'left-panel', geometry: 'box', size: [0.035, 0.695, 0.56], position: [-0.6825, 0.3475, 0], material: 'wood' },
  { id: 'pedestal-body', geometry: 'box', size: [0.34, 0.695, 0.56], position: [0.51, 0.3475, 0], material: 'wood' },
  { id: 'drawer-1', geometry: 'box', size: [0.3, 0.18, 0.03], position: [0.51, 0.585, 0.285], material: 'woodDark' },
  { id: 'drawer-2', geometry: 'box', size: [0.3, 0.18, 0.03], position: [0.51, 0.385, 0.285], material: 'woodDark' },
  { id: 'drawer-3', geometry: 'box', size: [0.3, 0.16, 0.03], position: [0.51, 0.195, 0.285], material: 'woodDark' },
  { id: 'handle-1', geometry: 'box', size: [0.1, 0.015, 0.015], position: [0.51, 0.585, 0.3025], material: 'metal' },
  { id: 'handle-2', geometry: 'box', size: [0.1, 0.015, 0.015], position: [0.51, 0.385, 0.3025], material: 'metal' },
  { id: 'handle-3', geometry: 'box', size: [0.1, 0.015, 0.015], position: [0.51, 0.195, 0.3025], material: 'metal' },
  { id: 'open-shelf', geometry: 'box', size: [1.02, 0.04, 0.5], position: [-0.16, 0.18, 0], material: 'wood' },
  { id: 'modesty-panel', geometry: 'box', size: [1.02, 0.34, 0.03], position: [-0.16, 0.47, -0.275], material: 'woodDark' },
  { id: 'front-apron', geometry: 'box', size: [1.02, 0.08, 0.04], position: [-0.16, 0.655, 0.27], material: 'woodDark' },
];

const cornerParts: readonly DeskPart[] = [
  {
    id: 'corner-desktop',
    geometry: 'extrudedPolygon',
    points: [
      [-0.8, -0.5], [0.5, -0.5], [0.5, 0.06], [0.47, 0.22], [0.39, 0.36],
      [0.27, 0.46], [0.12, 0.5], [-0.12, 0.5], [-0.27, 0.46], [-0.46, 0.42],
      [-0.66, 0.38], [-0.77, 0.26], [-0.8, 0.1],
    ],
    height: 0.04,
    position: [0.15, 0.735, 0],
    material: 'paintedWhite',
  },
  { id: 'left-cabinet', geometry: 'box', size: [0.5, 0.715, 0.44], position: [-0.4, 0.3575, -0.2], material: 'paintedWhite' },
  { id: 'left-cabinet-door', geometry: 'box', size: [0.45, 0.54, 0.025], position: [-0.4, 0.36, 0.0325], material: 'paintedWhite' },
  { id: 'left-door-handle', geometry: 'box', size: [0.025, 0.12, 0.018], position: [-0.2, 0.36, 0.054], material: 'metalLight' },
  { id: 'right-side-panel', geometry: 'box', size: [0.04, 0.715, 0.52], position: [0.61, 0.3575, -0.16], material: 'paintedWhite' },
  { id: 'rear-support-panel', geometry: 'box', size: [0.34, 0.715, 0.04], position: [0.27, 0.3575, -0.46], material: 'paintedWhite' },
  { id: 'cable-tray', geometry: 'box', size: [0.42, 0.05, 0.14], position: [0.23, 0.66, -0.38], material: 'paintedWhite' },
  { id: 'cable-bracket-left', geometry: 'box', size: [0.03, 0.055, 0.03], position: [0.07, 0.69, -0.38], material: 'metalLight' },
  { id: 'cable-bracket-right', geometry: 'box', size: [0.03, 0.055, 0.03], position: [0.39, 0.69, -0.38], material: 'metalLight' },
  { id: 'hutch-side-left', geometry: 'box', size: [0.04, 0.645, 0.34], position: [-0.33, 1.0775, -0.31], material: 'paintedWhite' },
  { id: 'hutch-divider-left', geometry: 'box', size: [0.03, 0.645, 0.3], position: [-0.02, 1.0775, -0.33], material: 'paintedWhite' },
  { id: 'hutch-divider-right', geometry: 'box', size: [0.03, 0.645, 0.3], position: [0.32, 1.0775, -0.33], material: 'paintedWhite' },
  { id: 'hutch-side-right', geometry: 'box', size: [0.04, 0.645, 0.34], position: [0.63, 1.0775, -0.31], material: 'paintedWhite' },
  { id: 'hutch-top', geometry: 'box', size: [1, 0.04, 0.34], position: [0.15, 1.4, -0.31], material: 'paintedWhite' },
  { id: 'left-shelf-lower', geometry: 'box', size: [0.31, 0.03, 0.3], position: [-0.175, 0.96, -0.33], material: 'paintedWhite' },
  { id: 'left-shelf-upper', geometry: 'box', size: [0.31, 0.03, 0.3], position: [-0.175, 1.18, -0.33], material: 'paintedWhite' },
  { id: 'right-shelf-lower', geometry: 'box', size: [0.31, 0.03, 0.3], position: [0.475, 0.96, -0.33], material: 'paintedWhite' },
  { id: 'right-shelf-upper', geometry: 'box', size: [0.31, 0.03, 0.3], position: [0.475, 1.18, -0.33], material: 'paintedWhite' },
  { id: 'magnetic-board', geometry: 'box', size: [0.31, 0.54, 0.025], position: [0.15, 1.025, -0.4875], material: 'metalLight' },
];

// Denali glass-top desk: clear top, walnut trestles and brass support caps.
const midcenturyGlassParts: readonly DeskPart[] = [
  { id: 'glass-top', geometry: 'roundedBox', size: [1.75, 0.018, 0.74], radius: 0.009, smoothness: 5, position: [0, 0.803, 0], material: 'glass' },
  { id: 'left-runner', geometry: 'roundedBox', size: [0.12, 0.08, 0.54], radius: 0.025, smoothness: 4, position: [-0.62, 0.04, 0], material: 'woodDark' },
  { id: 'right-runner', geometry: 'roundedBox', size: [0.12, 0.08, 0.54], radius: 0.025, smoothness: 4, position: [0.62, 0.04, 0], material: 'woodDark' },
  { id: 'left-leg-front', geometry: 'cylinder', size: [0.035, 0.06, 0.72], position: [-0.62, 0.36, 0.22], material: 'woodDark' },
  { id: 'left-leg-back', geometry: 'cylinder', size: [0.035, 0.06, 0.72], position: [-0.62, 0.36, -0.22], material: 'woodDark' },
  { id: 'right-leg-front', geometry: 'cylinder', size: [0.035, 0.06, 0.72], position: [0.62, 0.36, 0.22], material: 'woodDark' },
  { id: 'right-leg-back', geometry: 'cylinder', size: [0.035, 0.06, 0.72], position: [0.62, 0.36, -0.22], material: 'woodDark' },
  { id: 'left-trestle', geometry: 'roundedBox', size: [0.12, 0.08, 0.56], radius: 0.02, smoothness: 4, position: [-0.62, 0.72, 0], material: 'woodDark' },
  { id: 'right-trestle', geometry: 'roundedBox', size: [0.12, 0.08, 0.56], radius: 0.02, smoothness: 4, position: [0.62, 0.72, 0], material: 'woodDark' },
  { id: 'center-stretcher', geometry: 'roundedBox', size: [1.24, 0.08, 0.08], radius: 0.02, smoothness: 4, position: [0, 0.7, 0], material: 'woodDark' },
  { id: 'brass-cap-left-front', geometry: 'cylinder', size: [0.035, 0.035, 0.04], position: [-0.62, 0.777, 0.22], material: 'brass' },
  { id: 'brass-cap-left-back', geometry: 'cylinder', size: [0.035, 0.035, 0.04], position: [-0.62, 0.777, -0.22], material: 'brass' },
  { id: 'brass-cap-right-front', geometry: 'cylinder', size: [0.035, 0.035, 0.04], position: [0.62, 0.777, 0.22], material: 'brass' },
  { id: 'brass-cap-right-back', geometry: 'cylinder', size: [0.035, 0.035, 0.04], position: [0.62, 0.777, -0.22], material: 'brass' },
];

export const DESK_DESIGNS: Readonly<Record<DeskDesignKey, DeskDesign>> = Object.freeze({
  deskCompact: Object.freeze({
    schemaVersion: '1.0', id: 'desk-compact', name: '컴팩트 책상', furnitureType: '책상', category: '책상', variant: '컴팩트형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    purchaseUrl: 'https://www.ikea.com/kr/ko/p/lagkapten-adils-desk-white-s09416759/',
    dimensions: Object.freeze({ width: 1.2, depth: 0.6, height: 0.73 }), materials: Object.freeze(['paintedWhite', 'metal', 'metalLight'] as const), parts: Object.freeze(compactParts),
  }),
  deskStorage: Object.freeze({
    schemaVersion: '1.0', id: 'desk-storage', name: '수납 결합 책상', furnitureType: '책상', category: '책상', variant: '수납 결합형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    purchaseUrl: 'https://www.ikea.com/kr/ko/p/micke-desk-black-brown-60354277/',
    dimensions: Object.freeze({ width: 1.4, depth: 0.62, height: 0.73 }), materials: Object.freeze(['woodLight', 'wood', 'woodDark', 'metal'] as const), parts: Object.freeze(storageParts),
  }),
  deskCorner: Object.freeze({
    schemaVersion: '1.0', id: 'desk-corner', name: '코너 책상', furnitureType: '책상', category: '책상', variant: '코너형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    purchaseUrl: 'https://www.ikea.com/kr/ko/p/micke-corner-workstation-white-20354284/',
    dimensions: Object.freeze({ width: 1.3, depth: 1, height: 1.42 }), materials: Object.freeze(['paintedWhite', 'metalLight'] as const), parts: Object.freeze(cornerParts),
  }),
  deskMidcenturyGlass: Object.freeze({
    schemaVersion: '1.0', id: 'desk-midcentury-glass', name: '미드센추리 글라스 책상', furnitureType: '책상', category: '책상', variant: '미드센추리 글라스형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    purchaseUrl: 'https://www.oldbonesco.com/products/denali-glass-top-desk',
    dimensions: Object.freeze({ width: 1.75, depth: 0.74, height: 0.812 }), materials: Object.freeze(['glass', 'woodDark', 'brass'] as const), parts: Object.freeze(midcenturyGlassParts),
  }),
});

export function getDeskDesign(modelKey: DeskDesignKey): DeskDesign {
  return DESK_DESIGNS[modelKey];
}
