import type { FurnitureDesign, FurniturePart } from './designTypes';

export type MediaConsoleDesignKey =
  | 'mediaConsoleLow'
  | 'mediaConsoleDrawer'
  | 'mediaConsoleOpen'
  | 'mediaConsoleMidcenturyStockholm';
export type MediaConsoleDesign = FurnitureDesign<'TV장/미디어 콘솔', 'TV장/미디어 콘솔'>;

const COORDINATE_SYSTEM = Object.freeze({
  origin: 'floor-center' as const,
  axes: Object.freeze({ x: 'right' as const, y: 'up' as const, z: 'front' as const }),
});

// LACK TV bench, 120 x 35 x 36 cm.
const lowParts: readonly FurniturePart[] = [
  { id: 'leg-left-back', geometry: 'box', size: [0.06, 0.28, 0.06], position: [-0.54, 0.14, -0.135], material: 'woodDark' },
  { id: 'leg-right-back', geometry: 'box', size: [0.06, 0.28, 0.06], position: [0.54, 0.14, -0.135], material: 'woodDark' },
  { id: 'leg-left-front', geometry: 'box', size: [0.06, 0.28, 0.06], position: [-0.54, 0.14, 0.135], material: 'woodDark' },
  { id: 'leg-right-front', geometry: 'box', size: [0.06, 0.28, 0.06], position: [0.54, 0.14, 0.135], material: 'woodDark' },
  { id: 'media-shelf', geometry: 'box', size: [1.08, 0.03, 0.29], position: [0, 0.12, 0], material: 'woodLight' },
  { id: 'console-top', geometry: 'box', size: [1.2, 0.08, 0.35], position: [0, 0.32, 0], material: 'wood' },
];

// BESTÅ TV bench with drawers, 120 x 42 x 48 cm.
const drawerParts: readonly FurniturePart[] = [
  { id: 'plinth', geometry: 'box', size: [1.2, 0.06, 0.39], position: [0, 0.03, -0.015], material: 'woodDark' },
  { id: 'side-left', geometry: 'box', size: [0.04, 0.37, 0.39], position: [-0.58, 0.245, -0.015], material: 'wood' },
  { id: 'side-right', geometry: 'box', size: [0.04, 0.37, 0.39], position: [0.58, 0.245, -0.015], material: 'wood' },
  { id: 'center-divider', geometry: 'box', size: [0.04, 0.37, 0.39], position: [0, 0.245, -0.015], material: 'wood' },
  { id: 'back-panel', geometry: 'box', size: [1.12, 0.34, 0.03], position: [0, 0.23, -0.195], material: 'woodDark' },
  { id: 'drawer-box-left', geometry: 'box', size: [0.56, 0.27, 0.36], position: [-0.3, 0.255, 0.005], material: 'woodLight' },
  { id: 'drawer-box-right', geometry: 'box', size: [0.56, 0.27, 0.36], position: [0.3, 0.255, 0.005], material: 'woodLight' },
  { id: 'drawer-front-left', geometry: 'box', size: [0.56, 0.27, 0.02], position: [-0.3, 0.255, 0.195], material: 'wood' },
  { id: 'drawer-front-right', geometry: 'box', size: [0.56, 0.27, 0.02], position: [0.3, 0.255, 0.195], material: 'wood' },
  { id: 'pull-left', geometry: 'box', size: [0.18, 0.025, 0.005], position: [-0.3, 0.255, 0.2075], material: 'metal' },
  { id: 'pull-right', geometry: 'box', size: [0.18, 0.025, 0.005], position: [0.3, 0.255, 0.2075], material: 'metal' },
  { id: 'console-top', geometry: 'box', size: [1.2, 0.05, 0.42], position: [0, 0.455, 0], material: 'woodDark' },
];

// BESTÅ open TV bench, 120 x 40 x 64 cm.
const openParts: readonly FurniturePart[] = [
  { id: 'foot-left-back', geometry: 'box', size: [0.08, 0.06, 0.08], position: [-0.54, 0.03, -0.14], material: 'metal' },
  { id: 'foot-right-back', geometry: 'box', size: [0.08, 0.06, 0.08], position: [0.54, 0.03, -0.14], material: 'metal' },
  { id: 'foot-left-front', geometry: 'box', size: [0.08, 0.06, 0.08], position: [-0.54, 0.03, 0.14], material: 'metal' },
  { id: 'foot-right-front', geometry: 'box', size: [0.08, 0.06, 0.08], position: [0.54, 0.03, 0.14], material: 'metal' },
  { id: 'bottom-panel', geometry: 'box', size: [1.2, 0.04, 0.4], position: [0, 0.08, 0], material: 'woodDark' },
  { id: 'side-left', geometry: 'box', size: [0.06, 0.52, 0.4], position: [-0.57, 0.36, 0], material: 'wood' },
  { id: 'side-right', geometry: 'box', size: [0.06, 0.52, 0.4], position: [0.57, 0.36, 0], material: 'wood' },
  { id: 'center-divider', geometry: 'box', size: [0.04, 0.5, 0.36], position: [0, 0.35, 0], material: 'wood' },
  { id: 'back-panel', geometry: 'box', size: [1.08, 0.5, 0.02], position: [0, 0.35, -0.19], material: 'woodDark' },
  { id: 'shelf-left', geometry: 'box', size: [0.54, 0.04, 0.36], position: [-0.29, 0.36, 0], material: 'woodLight' },
  { id: 'shelf-right', geometry: 'box', size: [0.54, 0.04, 0.36], position: [0.29, 0.36, 0], material: 'woodLight' },
  { id: 'top-panel', geometry: 'box', size: [1.2, 0.04, 0.4], position: [0, 0.62, 0], material: 'woodDark' },
];

// USM Haller Media O3: 50 × 15 × 26 in, 2 × 2 modules with two diagonal drop-down doors.
const midcenturyStockholmParts: readonly FurniturePart[] = [
  { id: 'foot-left-front', geometry: 'cylinder', size: [0.012, 0.012, 0.02], position: [-0.623, 0.01, 0.1785], material: 'chrome' },
  { id: 'foot-center-front', geometry: 'cylinder', size: [0.012, 0.012, 0.02], position: [0, 0.01, 0.1785], material: 'chrome' },
  { id: 'foot-right-front', geometry: 'cylinder', size: [0.012, 0.012, 0.02], position: [0.623, 0.01, 0.1785], material: 'chrome' },
  { id: 'foot-left-back', geometry: 'cylinder', size: [0.012, 0.012, 0.02], position: [-0.623, 0.01, -0.1785], material: 'chrome' },
  { id: 'foot-center-back', geometry: 'cylinder', size: [0.012, 0.012, 0.02], position: [0, 0.01, -0.1785], material: 'chrome' },
  { id: 'foot-right-back', geometry: 'cylinder', size: [0.012, 0.012, 0.02], position: [0.623, 0.01, -0.1785], material: 'chrome' },
  { id: 'post-left-front', geometry: 'cylinder', size: [0.012, 0.012, 0.6264], position: [-0.623, 0.3332, 0.1785], material: 'chrome' },
  { id: 'post-center-front', geometry: 'cylinder', size: [0.012, 0.012, 0.6264], position: [0, 0.3332, 0.1785], material: 'chrome' },
  { id: 'post-right-front', geometry: 'cylinder', size: [0.012, 0.012, 0.6264], position: [0.623, 0.3332, 0.1785], material: 'chrome' },
  { id: 'post-left-back', geometry: 'cylinder', size: [0.012, 0.012, 0.6264], position: [-0.623, 0.3332, -0.1785], material: 'chrome' },
  { id: 'post-center-back', geometry: 'cylinder', size: [0.012, 0.012, 0.6264], position: [0, 0.3332, -0.1785], material: 'chrome' },
  { id: 'post-right-back', geometry: 'cylinder', size: [0.012, 0.012, 0.6264], position: [0.623, 0.3332, -0.1785], material: 'chrome' },
  { id: 'bottom-panel', geometry: 'box', size: [1.222, 0.014, 0.333], position: [0, 0.142, 0], material: 'goldenYellowMetal' },
  { id: 'middle-shelf', geometry: 'box', size: [1.222, 0.014, 0.333], position: [0, 0.39, 0], material: 'goldenYellowMetal' },
  { id: 'top-panel', geometry: 'box', size: [1.222, 0.014, 0.333], position: [0, 0.6384, 0], material: 'goldenYellowMetal' },
  { id: 'side-left', geometry: 'box', size: [0.014, 0.4964, 0.333], position: [-0.605, 0.39, 0], material: 'goldenYellowMetal' },
  { id: 'side-right', geometry: 'box', size: [0.014, 0.4964, 0.333], position: [0.605, 0.39, 0], material: 'goldenYellowMetal' },
  { id: 'center-divider', geometry: 'box', size: [0.014, 0.4964, 0.333], position: [0, 0.39, 0], material: 'goldenYellowMetal' },
  { id: 'back-panel', geometry: 'box', size: [1.198, 0.4964, 0.014], position: [0, 0.39, -0.1595], material: 'goldenYellowMetal' },
  { id: 'drop-door-top-right', geometry: 'roundedBox', size: [0.584, 0.222, 0.012], radius: 0.008, smoothness: 4, position: [0.302, 0.5205, 0.169], material: 'goldenYellowMetal' },
  { id: 'drop-door-bottom-left', geometry: 'roundedBox', size: [0.584, 0.222, 0.012], radius: 0.008, smoothness: 4, position: [-0.302, 0.272, 0.169], material: 'goldenYellowMetal' },
  { id: 'door-handle-top-right', geometry: 'cylinder', size: [0.018, 0.018, 0.012], rotation: [Math.PI / 2, 0, 0], position: [0.302, 0.5205, 0.181], material: 'chrome' },
  { id: 'door-handle-bottom-left', geometry: 'cylinder', size: [0.018, 0.018, 0.012], rotation: [Math.PI / 2, 0, 0], position: [-0.302, 0.272, 0.181], material: 'chrome' },
  { id: 'front-rail-bottom', geometry: 'cylinder', size: [0.012, 0.012, 1.246], rotation: [0, 0, Math.PI / 2], position: [0, 0.132, 0.1785], material: 'chrome' },
  { id: 'front-rail-middle', geometry: 'cylinder', size: [0.012, 0.012, 1.246], rotation: [0, 0, Math.PI / 2], position: [0, 0.39, 0.1785], material: 'chrome' },
  { id: 'front-rail-top', geometry: 'cylinder', size: [0.012, 0.012, 1.246], rotation: [0, 0, Math.PI / 2], position: [0, 0.6484, 0.1785], material: 'chrome' },
  { id: 'back-rail-bottom', geometry: 'cylinder', size: [0.012, 0.012, 1.246], rotation: [0, 0, Math.PI / 2], position: [0, 0.132, -0.1785], material: 'chrome' },
  { id: 'back-rail-middle', geometry: 'cylinder', size: [0.012, 0.012, 1.246], rotation: [0, 0, Math.PI / 2], position: [0, 0.39, -0.1785], material: 'chrome' },
  { id: 'back-rail-top', geometry: 'cylinder', size: [0.012, 0.012, 1.246], rotation: [0, 0, Math.PI / 2], position: [0, 0.6484, -0.1785], material: 'chrome' },
];

export const MEDIA_CONSOLE_DESIGNS: Readonly<Record<MediaConsoleDesignKey, MediaConsoleDesign>> = Object.freeze({
  mediaConsoleLow: Object.freeze({
    schemaVersion: '1.0', id: 'media-console-low', name: '낮은 콘솔형 TV장', furnitureType: 'TV장/미디어 콘솔', category: 'TV장/미디어 콘솔', variant: '낮은 콘솔형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.2, depth: 0.35, height: 0.36 }), materials: Object.freeze(['wood', 'woodLight', 'woodDark'] as const), parts: Object.freeze(lowParts),
  }),
  mediaConsoleDrawer: Object.freeze({
    schemaVersion: '1.0', id: 'media-console-drawer', name: '서랍형 미디어 콘솔', furnitureType: 'TV장/미디어 콘솔', category: 'TV장/미디어 콘솔', variant: '서랍형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.2, depth: 0.42, height: 0.48 }), materials: Object.freeze(['wood', 'woodLight', 'woodDark', 'metal'] as const), parts: Object.freeze(drawerParts),
  }),
  mediaConsoleOpen: Object.freeze({
    schemaVersion: '1.0', id: 'media-console-open', name: '오픈 선반형 미디어 콘솔', furnitureType: 'TV장/미디어 콘솔', category: 'TV장/미디어 콘솔', variant: '오픈 선반형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.2, depth: 0.4, height: 0.64 }), materials: Object.freeze(['wood', 'woodLight', 'woodDark', 'metal'] as const), parts: Object.freeze(openParts),
  }),
  mediaConsoleMidcenturyStockholm: Object.freeze({
    schemaVersion: '1.0', id: 'media-console-midcentury-stockholm', name: '미드센추리 골든 옐로 TV장', furnitureType: 'TV장/미디어 콘솔', category: 'TV장/미디어 콘솔', variant: '미드센추리 골든 옐로 메탈형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.27, depth: 0.381, height: 0.6604 }), materials: Object.freeze(['chrome', 'goldenYellowMetal'] as const), parts: Object.freeze(midcenturyStockholmParts), purchaseUrl: 'https://us.usm.com/products/usm-haller-media-o3',
  }),
});
