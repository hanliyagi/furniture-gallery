import type { FurnitureDesign, FurniturePart } from './designTypes';

export type CurtainBlindDesignKey = 'curtainFabric' | 'blindRoller' | 'blindWood' | 'curtainBlackout';
export type CurtainBlindDesign = FurnitureDesign<'커튼·블라인드', '커튼·블라인드'>;

const COORDINATE_SYSTEM = Object.freeze({
  origin: 'floor-center' as const,
  axes: Object.freeze({ x: 'right' as const, y: 'up' as const, z: 'front' as const }),
});

const fabricParts: readonly FurniturePart[] = [
  { id: 'curtain-panel-left', geometry: 'curtain', size: [1.38, 2.45, 0.18], folds: 6, segmentsX: 56, segmentsY: 64, position: [-0.72, 1.225, 0], material: 'fabricDark' },
  { id: 'curtain-panel-right', geometry: 'curtain', size: [1.38, 2.45, 0.18], folds: 6, segmentsX: 56, segmentsY: 64, position: [0.72, 1.225, 0], material: 'fabricDark' },
  { id: 'curtain-header', geometry: 'box', size: [2.90, 0.07, 0.10], position: [0, 2.45, 0], material: 'fabricDark' },
  { id: 'curtain-rod', geometry: 'cylinder', size: [0.03, 0.03, 2.96], position: [0, 2.51, 0], rotation: [0, 0, Math.PI / 2], material: 'metal' },
];

const rollerParts: readonly FurniturePart[] = [
  { id: 'roller-panel', geometry: 'box', size: [1.20, 1.68, 0.018], position: [0, 0.84, 0], material: 'fabricLight' },
  { id: 'roller-bottom-rail', geometry: 'box', size: [1.20, 0.05, 0.04], position: [0, 0.025, 0], material: 'metalLight' },
  { id: 'roller-tube', geometry: 'cylinder', size: [0.05, 0.05, 1.20], position: [0, 1.73, 0], rotation: [0, 0, Math.PI / 2], material: 'metal' },
  { id: 'roller-bracket-left', geometry: 'box', size: [0.04, 0.12, 0.10], position: [-0.62, 1.73, 0], material: 'metal' },
  { id: 'roller-bracket-right', geometry: 'box', size: [0.04, 0.12, 0.10], position: [0.62, 1.73, 0], material: 'metal' },
  { id: 'roller-pull-cord', geometry: 'cylinder', size: [0.008, 0.008, 0.66], position: [0.56, 1.35, 0.006], material: 'fabricDark' },
  { id: 'roller-pull-weight', geometry: 'box', size: [0.035, 0.07, 0.025], position: [0.56, 1.02, 0.006], material: 'metalLight' },
];

const WOOD_SLAT_Y = [0.18, 0.36, 0.54, 0.72, 0.90, 1.08, 1.26, 1.44, 1.62] as const;
const woodParts: readonly FurniturePart[] = [
  { id: 'wood-bottom-rail', geometry: 'box', size: [1.22, 0.08, 0.08], position: [0, 0.04, 0], material: 'woodDark' },
  ...WOOD_SLAT_Y.map((y, index): FurniturePart => ({
    id: `wood-slat-${index + 1}`,
    geometry: 'box',
    size: [1.20, 0.08, 0.055],
    position: [0, y, 0],
    rotation: [0.10 - (index % 3) * 0.05, 0, 0],
    material: index % 2 === 0 ? 'woodLight' : 'wood',
  })),
  { id: 'wood-headrail', geometry: 'box', size: [1.25, 0.10, 0.10], position: [0, 1.75, 0], material: 'woodDark' },
  { id: 'wood-cord-left', geometry: 'box', size: [0.012, 1.70, 0.02], position: [-0.42, 0.85, 0.035], material: 'fabricDark' },
  { id: 'wood-cord-right', geometry: 'box', size: [0.012, 1.70, 0.02], position: [0.42, 0.85, 0.035], material: 'fabricDark' },
];

const blackoutParts: readonly FurniturePart[] = [
  { id: 'blackout-panel-left', geometry: 'curtain', size: [0.86, 2.30, 0.20], folds: 5, segmentsX: 48, segmentsY: 64, position: [-0.44, 1.15, 0], material: 'fabricDark' },
  { id: 'blackout-panel-right', geometry: 'curtain', size: [0.86, 2.30, 0.20], folds: 5, segmentsX: 48, segmentsY: 64, position: [0.44, 1.15, 0], material: 'fabricDark' },
  { id: 'blackout-header', geometry: 'roundedBox', size: [1.74, 0.10, 0.11], radius: 0.02, smoothness: 4, position: [0, 2.32, 0], material: 'metalLight' },
  { id: 'blackout-rod', geometry: 'cylinder', size: [0.03, 0.03, 1.82], position: [0, 2.37, 0], rotation: [0, 0, Math.PI / 2], material: 'metalLight' },
];

export const CURTAIN_BLIND_DESIGNS: Readonly<Record<CurtainBlindDesignKey, CurtainBlindDesign>> = Object.freeze({
  curtainFabric: Object.freeze({
    schemaVersion: '1.0', id: 'curtain-fabric', name: '패브릭 커튼', furnitureType: '커튼·블라인드', category: '커튼·블라인드', variant: '패브릭 커튼', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 2.96, depth: 0.18, height: 2.54 }), materials: Object.freeze(['fabricDark', 'metal'] as const), parts: Object.freeze(fabricParts),
  }),
  blindRoller: Object.freeze({
    schemaVersion: '1.0', id: 'blind-roller', name: '롤 블라인드', furnitureType: '커튼·블라인드', category: '커튼·블라인드', variant: '롤 블라인드', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.28, depth: 0.10, height: 1.79 }), materials: Object.freeze(['fabricLight', 'fabricDark', 'metal', 'metalLight'] as const), parts: Object.freeze(rollerParts),
  }),
  blindWood: Object.freeze({
    schemaVersion: '1.0', id: 'blind-wood', name: '우드 블라인드', furnitureType: '커튼·블라인드', category: '커튼·블라인드', variant: '우드 블라인드', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.25, depth: 0.10, height: 1.80 }), materials: Object.freeze(['wood', 'woodLight', 'woodDark', 'fabricDark'] as const), parts: Object.freeze(woodParts),
  }),
  curtainBlackout: Object.freeze({
    schemaVersion: '1.0', id: 'curtain-blackout', name: '암막 플리츠 커튼', furnitureType: '커튼·블라인드', category: '커튼·블라인드', variant: '암막 플리츠형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 1.82, depth: 0.20, height: 2.40 }), materials: Object.freeze(['fabricDark', 'metalLight'] as const), parts: Object.freeze(blackoutParts), purchaseUrl: 'https://www.ikea.com/kr/ko/p/majgull-room-darkening-curtains-1-pair-dark-grey-turquoise-with-heading-tape-00586020/',
  }),
});
