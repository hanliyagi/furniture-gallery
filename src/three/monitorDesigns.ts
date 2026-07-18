import type { FurnitureDesign, FurniturePart } from './designTypes';

export type MonitorDesignKey = 'monitorBasic' | 'monitorUltrawide' | 'monitorDual' | 'monitorGamingOdyssey';
export type MonitorDesign = FurnitureDesign<'모니터', '모니터'>;

const COORDINATE_SYSTEM = Object.freeze({
  origin: 'floor-center' as const,
  axes: Object.freeze({ x: 'right' as const, y: 'up' as const, z: 'front' as const }),
});

const basicParts: readonly FurniturePart[] = [
  { id: 'base', geometry: 'box', size: [0.24, 0.02, 0.181], position: [0, 0.01, 0], material: 'metal' },
  { id: 'stem', geometry: 'box', size: [0.035, 0.19, 0.035], position: [0, 0.115, -0.02], material: 'metalLight' },
  { id: 'frame', geometry: 'roundedBox', size: [0.556, 0.303, 0.035], radius: 0.012, smoothness: 4, position: [0, 0.2655, 0], material: 'screenFrame' },
  { id: 'display', geometry: 'box', size: [0.516, 0.263, 0.01], position: [0, 0.2655, 0.0225], material: 'screen' },
  { id: 'lower-bezel', geometry: 'box', size: [0.516, 0.018, 0.008], position: [0, 0.125, 0.0235], material: 'metalLight' },
];

const ultrawideParts: readonly FurniturePart[] = [
  { id: 'base', geometry: 'box', size: [0.32, 0.025, 0.223], position: [0, 0.0125, 0], material: 'metal' },
  { id: 'stem', geometry: 'box', size: [0.04, 0.235, 0.04], position: [0, 0.1425, -0.025], material: 'metalLight' },
  { id: 'wide-frame', geometry: 'roundedBox', size: [0.809, 0.34, 0.04], radius: 0.014, smoothness: 4, position: [0, 0.313, 0], material: 'screenFrame' },
  { id: 'wide-display', geometry: 'box', size: [0.769, 0.3, 0.01], position: [0, 0.313, 0.025], material: 'screen' },
  { id: 'wide-lower-bezel', geometry: 'box', size: [0.769, 0.02, 0.008], position: [0, 0.153, 0.026], material: 'metalLight' },
];

const dualParts: readonly FurniturePart[] = [
  { id: 'base', geometry: 'box', size: [0.34, 0.02, 0.181], position: [0, 0.01, 0], material: 'metal' },
  { id: 'center-column', geometry: 'box', size: [0.04, 0.2, 0.04], position: [0, 0.12, -0.02], material: 'metalLight' },
  { id: 'crossbar', geometry: 'box', size: [0.95, 0.035, 0.035], position: [0, 0.22, -0.02], material: 'metalLight' },
  { id: 'frame-left', geometry: 'roundedBox', size: [0.556, 0.293, 0.035], radius: 0.012, smoothness: 4, position: [-0.288, 0.2705, 0], material: 'screenFrame' },
  { id: 'frame-right', geometry: 'roundedBox', size: [0.556, 0.293, 0.035], radius: 0.012, smoothness: 4, position: [0.288, 0.2705, 0], material: 'screenFrame' },
  { id: 'display-left', geometry: 'box', size: [0.516, 0.253, 0.01], position: [-0.288, 0.2705, 0.0225], material: 'screen' },
  { id: 'display-right', geometry: 'box', size: [0.516, 0.253, 0.01], position: [0.288, 0.2705, 0.0225], material: 'screen' },
];

const gamingOdysseyParts: readonly FurniturePart[] = [
  { id: 'stand-base', geometry: 'roundedBox', size: [0.36, 0.025, 0.2635], radius: 0.012, smoothness: 4, position: [0, 0.0125, 0], material: 'metal' },
  { id: 'stand-neck', geometry: 'roundedBox', size: [0.055, 0.235, 0.055], radius: 0.012, smoothness: 4, position: [0, 0.1425, -0.055], material: 'metal' },
  { id: 'rear-mount', geometry: 'roundedBox', size: [0.16, 0.13, 0.045], radius: 0.012, smoothness: 4, position: [0, 0.235, -0.035], material: 'metalLight' },
  { id: 'gaming-frame', geometry: 'roundedBox', size: [0.7142, 0.4184, 0.07], radius: 0.018, smoothness: 5, position: [0, 0.3727, 0], material: 'screenFrame' },
  { id: 'gaming-display', geometry: 'roundedBox', size: [0.6742, 0.3744, 0.008], radius: 0.009, smoothness: 4, position: [0, 0.3787, 0.039], material: 'screen' },
  { id: 'gaming-lower-bezel', geometry: 'box', size: [0.6742, 0.022, 0.008], position: [0, 0.1855, 0.04], material: 'metalLight' },
  { id: 'center-mark', geometry: 'roundedBox', size: [0.05, 0.01, 0.006], radius: 0.003, smoothness: 3, position: [0, 0.178, 0.047], material: 'brass' },
];

export const MONITOR_DESIGNS: Readonly<Record<MonitorDesignKey, MonitorDesign>> = Object.freeze({
  monitorBasic: Object.freeze({
    schemaVersion: '1.0', id: 'monitor-basic', name: '기본형 모니터', furnitureType: '모니터', category: '모니터', variant: '기본형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.556, depth: 0.181, height: 0.417 }), materials: Object.freeze(['metal', 'metalLight', 'screenFrame', 'screen'] as const), parts: Object.freeze(basicParts), purchaseUrl: 'https://www.lge.co.kr/monitors/24u631a',
  }),
  monitorUltrawide: Object.freeze({
    schemaVersion: '1.0', id: 'monitor-ultrawide', name: '울트라와이드 모니터', furnitureType: '모니터', category: '모니터', variant: '울트라와이드형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.809, depth: 0.223, height: 0.483 }), materials: Object.freeze(['metal', 'metalLight', 'screenFrame', 'screen'] as const), parts: Object.freeze(ultrawideParts), purchaseUrl: 'https://www.samsung.com/sec/monitors/high-resolution-ls34c500gakxkr-d2c/LS34C500GAKXKR/',
  }),
  monitorDual: Object.freeze({
    schemaVersion: '1.0', id: 'monitor-dual', name: '듀얼 모니터', furnitureType: '모니터', category: '모니터', variant: '듀얼 모니터형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.132, depth: 0.181, height: 0.417 }), materials: Object.freeze(['metal', 'metalLight', 'screenFrame', 'screen'] as const), parts: Object.freeze(dualParts), purchaseUrl: 'https://www.devicemart.co.kr/goods/view?no=15258546',
  }),
  monitorGamingOdyssey: Object.freeze({
    schemaVersion: '1.0', id: 'monitor-gaming-odyssey', name: '오디세이 게이밍 모니터', furnitureType: '모니터', category: '모니터', variant: '32인치 게이밍형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.7142, depth: 0.2635, height: 0.5819 }), materials: Object.freeze(['metal', 'metalLight', 'screenFrame', 'screen', 'brass'] as const), parts: Object.freeze(gamingOdysseyParts), purchaseUrl: 'https://www.samsung.com/sec/monitors/gaming-ls32dg504ekxkr-d2c/LS32DG504EKXKR/',
  }),
});
