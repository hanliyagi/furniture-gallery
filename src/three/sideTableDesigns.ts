import type { FurnitureDesign, FurniturePart } from './designTypes';

export type SideTableDesignKey = 'sideTableRound' | 'sideTableCoffee' | 'sideTableStorage' | 'sideTableMidcenturyStockholm';
export type SideTableDesign = FurnitureDesign<'사이드 테이블', '사이드 테이블'>;

const COORDINATE_SYSTEM = Object.freeze({
  origin: 'floor-center' as const,
  axes: Object.freeze({ x: 'right' as const, y: 'up' as const, z: 'front' as const }),
});

const roundParts: readonly FurniturePart[] = [
  { id: 'leg-left', geometry: 'box', size: [0.04, 0.47, 0.04], position: [-0.17, 0.235, 0], material: 'woodDark' },
  { id: 'leg-right', geometry: 'box', size: [0.04, 0.47, 0.04], position: [0.17, 0.235, 0], material: 'woodDark' },
  { id: 'leg-back', geometry: 'box', size: [0.04, 0.47, 0.04], position: [0, 0.235, -0.17], material: 'woodDark' },
  { id: 'leg-front', geometry: 'box', size: [0.04, 0.47, 0.04], position: [0, 0.235, 0.17], material: 'woodDark' },
  { id: 'brace-x', geometry: 'box', size: [0.38, 0.04, 0.04], position: [0, 0.16, 0], material: 'wood' },
  { id: 'brace-z', geometry: 'box', size: [0.04, 0.04, 0.38], position: [0, 0.16, 0], material: 'wood' },
  { id: 'tabletop', geometry: 'cylinder', size: [0.245, 0.245, 0.04], position: [0, 0.49, 0], material: 'woodLight' },
];

const coffeeParts: readonly FurniturePart[] = [
  { id: 'leg-left-back', geometry: 'box', size: [0.05, 0.4, 0.05], position: [-0.4, 0.2, -0.225], material: 'woodDark' },
  { id: 'leg-right-back', geometry: 'box', size: [0.05, 0.4, 0.05], position: [0.4, 0.2, -0.225], material: 'woodDark' },
  { id: 'leg-left-front', geometry: 'box', size: [0.05, 0.4, 0.05], position: [-0.4, 0.2, 0.225], material: 'woodDark' },
  { id: 'leg-right-front', geometry: 'box', size: [0.05, 0.4, 0.05], position: [0.4, 0.2, 0.225], material: 'woodDark' },
  { id: 'magazine-shelf', geometry: 'box', size: [0.78, 0.025, 0.43], position: [0, 0.18, 0], material: 'woodLight' },
  { id: 'tabletop', geometry: 'box', size: [0.9, 0.05, 0.55], position: [0, 0.425, 0], material: 'wood' },
];

const storageParts: readonly FurniturePart[] = [
  { id: 'bottom-panel', geometry: 'box', size: [0.8, 0.06, 0.31], position: [0, 0.03, 0], material: 'woodDark' },
  { id: 'side-left', geometry: 'box', size: [0.04, 0.42, 0.31], position: [-0.38, 0.27, 0], material: 'wood' },
  { id: 'side-right', geometry: 'box', size: [0.04, 0.42, 0.31], position: [0.38, 0.27, 0], material: 'wood' },
  { id: 'partition', geometry: 'box', size: [0.04, 0.42, 0.31], position: [0.08, 0.27, 0], material: 'wood' },
  { id: 'shelf-wide', geometry: 'box', size: [0.42, 0.03, 0.27], position: [-0.15, 0.29, 0], material: 'woodLight' },
  { id: 'shelf-narrow', geometry: 'box', size: [0.26, 0.03, 0.27], position: [0.23, 0.2, 0], material: 'woodLight' },
  { id: 'top-panel', geometry: 'box', size: [0.8, 0.04, 0.31], position: [0, 0.5, 0], material: 'woodDark' },
];

// Kartell Tip Top: transparent moulded-plastic pedestal, diameter 0.48 m, height 0.51 m.
const midcenturyStockholmParts: readonly FurniturePart[] = [
  { id: 'floor-base', geometry: 'cylinder', size: [0.16, 0.16, 0.025], position: [0, 0.0125, 0], material: 'transparentAmberPlastic' },
  { id: 'sculpted-stem', geometry: 'cylinder', size: [0.08, 0.15, 0.415], position: [0, 0.2325, 0], material: 'transparentAmberPlastic' },
  { id: 'neck', geometry: 'cylinder', size: [0.17, 0.08, 0.045], position: [0, 0.45, 0], material: 'transparentAmberPlastic' },
  { id: 'round-top', geometry: 'cylinder', size: [0.24, 0.24, 0.04], position: [0, 0.49, 0], material: 'redPlastic' },
];

export const SIDE_TABLE_DESIGNS: Readonly<Record<SideTableDesignKey, SideTableDesign>> = Object.freeze({
  sideTableRound: Object.freeze({
    schemaVersion: '1.0', id: 'side-table-round', name: '원형 사이드 테이블', furnitureType: '사이드 테이블', category: '사이드 테이블', variant: '원형 사이드형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.49, depth: 0.49, height: 0.51 }), materials: Object.freeze(['wood', 'woodLight', 'woodDark'] as const), parts: Object.freeze(roundParts),
  }),
  sideTableCoffee: Object.freeze({
    schemaVersion: '1.0', id: 'side-table-coffee', name: '낮은 커피 테이블', furnitureType: '사이드 테이블', category: '사이드 테이블', variant: '낮은 커피형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.9, depth: 0.55, height: 0.45 }), materials: Object.freeze(['wood', 'woodLight', 'woodDark'] as const), parts: Object.freeze(coffeeParts),
  }),
  sideTableStorage: Object.freeze({
    schemaVersion: '1.0', id: 'side-table-storage', name: '수납형 사이드 테이블', furnitureType: '사이드 테이블', category: '사이드 테이블', variant: '수납형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.8, depth: 0.31, height: 0.52 }), materials: Object.freeze(['wood', 'woodLight', 'woodDark'] as const), parts: Object.freeze(storageParts),
  }),
  sideTableMidcenturyStockholm: Object.freeze({
    schemaVersion: '1.0', id: 'side-table-midcentury-stockholm', name: '미드센추리 투명 플라스틱 테이블', furnitureType: '사이드 테이블', category: '사이드 테이블', variant: '미드센추리 투명 플라스틱형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.48, depth: 0.48, height: 0.51 }), materials: Object.freeze(['transparentAmberPlastic', 'redPlastic'] as const), parts: Object.freeze(midcenturyStockholmParts), purchaseUrl: 'https://www.kartell.com/mk/en/kter/shop/product/tip-top/kar08600b4',
  }),
});
