import type { FurnitureDesign, FurniturePart } from './designTypes';

export type NightstandDesignKey =
  | 'nightstandDrawer'
  | 'nightstandOpen'
  | 'nightstandRound'
  | 'nightstandClassicGullaberg'
  | 'nightstandMidcenturyTrolley';
export type NightstandDesign = FurnitureDesign<'협탁', '협탁'>;

const COORDINATE_SYSTEM = Object.freeze({
  origin: 'floor-center' as const,
  axes: Object.freeze({ x: 'right' as const, y: 'up' as const, z: 'front' as const }),
});

const drawerParts: readonly FurniturePart[] = [
  { id: 'cabinet-body', geometry: 'box', size: [0.35, 0.47, 0.4], position: [0, 0.235, -0.013], material: 'woodLight' },
  { id: 'top', geometry: 'box', size: [0.35, 0.02, 0.4], position: [0, 0.48, -0.013], material: 'woodLight' },
  { id: 'drawer-upper', geometry: 'box', size: [0.31, 0.18, 0.01], position: [0, 0.36, 0.192], material: 'woodLight' },
  { id: 'drawer-lower', geometry: 'box', size: [0.31, 0.18, 0.01], position: [0, 0.14, 0.192], material: 'woodLight' },
  { id: 'grip-upper', geometry: 'box', size: [0.15, 0.02, 0.016], position: [0, 0.405, 0.205], material: 'metalLight' },
  { id: 'grip-lower', geometry: 'box', size: [0.15, 0.02, 0.016], position: [0, 0.185, 0.205], material: 'metalLight' },
];

const openParts: readonly FurniturePart[] = [
  { id: 'base-frame', geometry: 'box', size: [0.37, 0.02, 0.28], position: [0, 0.01, 0], material: 'metal' },
  { id: 'leg-left-front', geometry: 'box', size: [0.025, 0.42, 0.025], position: [-0.16, 0.22, 0.115], material: 'metal' },
  { id: 'leg-left-back', geometry: 'box', size: [0.025, 0.42, 0.025], position: [-0.16, 0.22, -0.115], material: 'metal' },
  { id: 'leg-right-front', geometry: 'box', size: [0.025, 0.42, 0.025], position: [0.16, 0.22, 0.115], material: 'metal' },
  { id: 'leg-right-back', geometry: 'box', size: [0.025, 0.42, 0.025], position: [0.16, 0.22, -0.115], material: 'metal' },
  { id: 'open-shelf', geometry: 'box', size: [0.32, 0.02, 0.23], position: [0, 0.18, 0], material: 'metalLight' },
  { id: 'top', geometry: 'box', size: [0.37, 0.02, 0.28], position: [0, 0.44, 0], material: 'metalLight' },
];

const roundParts: readonly FurniturePart[] = [
  { id: 'foot-left', geometry: 'box', size: [0.025, 0.02, 0.38], position: [-0.17, 0.01, 0], material: 'metal' },
  { id: 'foot-right', geometry: 'box', size: [0.025, 0.02, 0.38], position: [0.17, 0.01, 0], material: 'metal' },
  { id: 'leg-left-front', geometry: 'box', size: [0.025, 0.49, 0.025], position: [-0.17, 0.265, 0.1775], material: 'metal' },
  { id: 'leg-left-back', geometry: 'box', size: [0.025, 0.49, 0.025], position: [-0.17, 0.265, -0.1775], material: 'metal' },
  { id: 'leg-right-front', geometry: 'box', size: [0.025, 0.49, 0.025], position: [0.17, 0.265, 0.1775], material: 'metal' },
  { id: 'leg-right-back', geometry: 'box', size: [0.025, 0.49, 0.025], position: [0.17, 0.265, -0.1775], material: 'metal' },
  { id: 'tray-top', geometry: 'cylinder', size: [0.225, 0.225, 0.025], position: [0, 0.5175, 0], material: 'metalLight' },
  { id: 'tray-surface', geometry: 'cylinder', size: [0.205, 0.205, 0.01], position: [0, 0.505, 0], material: 'metal' },
];

const classicGullabergParts: readonly FurniturePart[] = [
  { id: 'leg-left-front', geometry: 'cylinder', size: [0.024, 0.035, 0.4], position: [-0.22, 0.2, 0.16], material: 'mustardPaint' },
  { id: 'leg-left-back', geometry: 'cylinder', size: [0.024, 0.035, 0.4], position: [-0.22, 0.2, -0.16], material: 'mustardPaint' },
  { id: 'leg-right-front', geometry: 'cylinder', size: [0.024, 0.035, 0.4], position: [0.22, 0.2, 0.16], material: 'mustardPaint' },
  { id: 'leg-right-back', geometry: 'cylinder', size: [0.024, 0.035, 0.4], position: [0.22, 0.2, -0.16], material: 'mustardPaint' },
  { id: 'lower-shelf', geometry: 'roundedBox', size: [0.45, 0.035, 0.35], radius: 0.012, smoothness: 4, position: [0, 0.235, 0], material: 'mustardPaint' },
  { id: 'cabinet-body', geometry: 'roundedBox', size: [0.53, 0.27, 0.38], radius: 0.018, smoothness: 5, position: [0, 0.535, -0.025], material: 'mustardPaint' },
  { id: 'drawer-front', geometry: 'roundedBox', size: [0.45, 0.14, 0.025], radius: 0.01, smoothness: 4, position: [0, 0.54, 0.1775], material: 'mustardPaint' },
  { id: 'drawer-knob', geometry: 'cylinder', size: [0.02, 0.02, 0.025], rotation: [Math.PI / 2, 0, 0], position: [0, 0.54, 0.2025], material: 'woodDark' },
  { id: 'top', geometry: 'roundedBox', size: [0.53, 0.02, 0.43], radius: 0.01, smoothness: 4, position: [0, 0.68, 0], material: 'mustardPaint' },
];

// Kartell Componibili 2: injection-moulded ABS, diameter 0.32 m, height 0.40 m.
function createDoorArcPoints(): readonly (readonly [number, number])[] {
  const start = Math.PI / 2 - 1.02;
  const end = Math.PI / 2 + 1.02;
  const segments = 14;
  const outerRadius = 0.159;
  const innerRadius = 0.154;
  const outer = Array.from({ length: segments + 1 }, (_, index) => {
    const angle = start + ((end - start) * index) / segments;
    return [Math.cos(angle) * outerRadius, Math.sin(angle) * outerRadius] as const;
  });
  const inner = Array.from({ length: segments + 1 }, (_, index) => {
    const angle = end - ((end - start) * index) / segments;
    return [Math.cos(angle) * innerRadius, Math.sin(angle) * innerRadius] as const;
  });
  return Object.freeze([...outer, ...inner]);
}

const componibiliDoorPoints = createDoorArcPoints();

const midcenturyTrolleyParts: readonly FurniturePart[] = [
  { id: 'floor-base', geometry: 'cylinder', size: [0.16, 0.16, 0.025], position: [0, 0.0125, 0], material: 'redPlastic' },
  { id: 'lower-module', geometry: 'cylinder', size: [0.154, 0.154, 0.175], position: [0, 0.1125, 0], material: 'redPlastic' },
  { id: 'center-ring', geometry: 'cylinder', size: [0.16, 0.16, 0.012], position: [0, 0.2, 0], material: 'redPlastic' },
  { id: 'upper-module', geometry: 'cylinder', size: [0.154, 0.154, 0.175], position: [0, 0.2875, 0], material: 'redPlastic' },
  { id: 'top-rim', geometry: 'cylinder', size: [0.16, 0.16, 0.025], position: [0, 0.3875, 0], material: 'redPlastic' },
  { id: 'lower-sliding-door', geometry: 'extrudedPolygon', points: componibiliDoorPoints, height: 0.135, position: [0, 0.1125, 0], material: 'redPlastic' },
  { id: 'upper-sliding-door', geometry: 'extrudedPolygon', points: componibiliDoorPoints, height: 0.135, position: [0, 0.2875, 0], material: 'redPlastic' },
  { id: 'lower-finger-hole', geometry: 'cylinder', size: [0.008, 0.008, 0.006], rotation: [Math.PI / 2, 0, 0], position: [0.06, 0.1125, 0.151], material: 'redVinyl' },
  { id: 'upper-finger-hole', geometry: 'cylinder', size: [0.008, 0.008, 0.006], rotation: [Math.PI / 2, 0, 0], position: [0.06, 0.2875, 0.151], material: 'redVinyl' },
];

export const NIGHTSTAND_DESIGNS: Readonly<Record<NightstandDesignKey, NightstandDesign>> = Object.freeze({
  nightstandDrawer: Object.freeze({
    schemaVersion: '1.0', id: 'nightstand-drawer', name: '서랍형 협탁', furnitureType: '협탁', category: '협탁', variant: '서랍형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.35, depth: 0.426, height: 0.49 }), materials: Object.freeze(['woodLight', 'metalLight'] as const), parts: Object.freeze(drawerParts),
    purchaseUrl: 'https://www.ikea.com/kr/ko/p/kullen-chest-of-2-drawers-white-70355728/',
  }),
  nightstandOpen: Object.freeze({
    schemaVersion: '1.0', id: 'nightstand-open', name: '오픈형 협탁', furnitureType: '협탁', category: '협탁', variant: '오픈형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.37, depth: 0.28, height: 0.45 }), materials: Object.freeze(['metal', 'metalLight'] as const), parts: Object.freeze(openParts),
    purchaseUrl: 'https://www.ikea.com/kr/ko/p/knarrevik-bedside-table-black-80576319/',
  }),
  nightstandRound: Object.freeze({
    schemaVersion: '1.0', id: 'nightstand-round', name: '원형 테이블 협탁', furnitureType: '협탁', category: '협탁', variant: '원형 테이블형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.45, depth: 0.45, height: 0.53 }), materials: Object.freeze(['metal', 'metalLight'] as const), parts: Object.freeze(roundParts),
    purchaseUrl: 'https://www.ikea.com/kr/ko/p/gladom-tray-table-dark-grey-green-50578452/',
  }),
  nightstandClassicGullaberg: Object.freeze({
    schemaVersion: '1.0', id: 'nightstand-classic-gullaberg', name: '클래식 옐로 협탁', furnitureType: '협탁', category: '협탁', variant: '클래식 옐로 서랍형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.53, depth: 0.43, height: 0.69 }), materials: Object.freeze(['mustardPaint', 'woodDark'] as const), parts: Object.freeze(classicGullabergParts),
    purchaseUrl: 'https://www.ikea.com/kr/en/p/gullaberg-bedside-table-yellow-with-1-drawer-with-shelf-50593443/',
  }),
  nightstandMidcenturyTrolley: Object.freeze({
    schemaVersion: '1.0', id: 'nightstand-midcentury-trolley', name: '미드센추리 레드 플라스틱 협탁', furnitureType: '협탁', category: '협탁', variant: '미드센추리 레드 플라스틱형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.32, depth: 0.32, height: 0.4 }), materials: Object.freeze(['redPlastic', 'redVinyl'] as const), parts: Object.freeze(midcenturyTrolleyParts),
    purchaseUrl: 'https://kartellkorea.com/product/4%EC%9B%94-%ED%81%90%EB%A0%88%EC%9D%B4%EC%85%98-25-componibili-2round-%EB%A0%88%EB%93%9C/403/',
  }),
});
