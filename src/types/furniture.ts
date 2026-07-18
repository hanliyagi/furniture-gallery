export type FurnitureCategory =
  | '책상'
  | '침대'
  | '소파베드'
  | '협탁'
  | '책상 의자'
  | '책장/오픈 선반'
  | '모니터'
  | '옷장'
  | '서랍장'
  | '행거'
  | '소파'
  | '사이드 테이블'
  | 'TV'
  | 'TV장/미디어 콘솔'
  | '다용도 테이블'
  | '파티션·양면 선반'
  | '러그'
  | '화분'
  | '전신거울'
  | '무드등'
  | '커튼·블라인드';

export type ApiStatus = 'loading' | 'connected' | 'fallback';

export const MODEL_KEYS = [
  'deskCompact',
  'deskStorage',
  'deskCorner',
  'deskMidcenturyGlass',
  'bedLowPlatform',
  'bedStorage',
  'bedFabricHeadboard',
  'bedMidcenturyTeal',
  'bedClassicIdanaes',
  'bedLoftDesk',
  'sofaBedCompact',
  'sofaBedFolding',
  'sofaBedDaybed',
  'sofaBedMidcenturyOrange',
  'sofaBedClassicStorage',
  'nightstandDrawer',
  'nightstandOpen',
  'nightstandRound',
  'nightstandClassicGullaberg',
  'nightstandMidcenturyTrolley',
  'chairBasic',
  'chairArmrest',
  'chairCompactSwivel',
  'chairClassicTonstad',
  'chairGamingMatchspel',
  'chairMidcenturyShell',
  'bookshelfLow',
  'bookshelfHigh',
  'bookshelfDoubleOpen',
  'bookshelfClassicHavsta',
  'bookshelfMidcenturyStockholm',
  'monitorBasic',
  'monitorUltrawide',
  'monitorDual',
  'monitorGamingOdyssey',
  'wardrobeHinged',
  'wardrobeSliding',
  'wardrobeOpen',
  'wardrobeNaturalNordkisa',
  'wardrobeClassicGullaberg',
  'drawerChestLowWide',
  'drawerChestVertical',
  'drawerChestBedside',
  'drawerChestClassicGullaberg',
  'hangerBasic',
  'hangerShelf',
  'hangerCorner',
  'hangerNaturalMorsning',
  'sofaSingle',
  'sofaTwoSeat',
  'sofaModular',
  'sofaClassicEktorp',
  'sofaMidcenturyStockholm',
  'sideTableRound',
  'sideTableCoffee',
  'sideTableStorage',
  'sideTableMidcenturyStockholm',
  'tvSmall',
  'tvMedium',
  'tvWide',
  'tvNaturalFrame',
  'mediaConsoleLow',
  'mediaConsoleDrawer',
  'mediaConsoleOpen',
  'mediaConsoleMidcenturyStockholm',
  'multiTableCompact',
  'multiTableTwoSeat',
  'multiTableStorage',
  'multiTableGateleg',
  'partitionShelfSlim',
  'partitionShelfTranslucent',
  'partitionShelfStorage',
  'partitionShelfKallax',
  'rugRound',
  'rugRectangular',
  'rugRunner',
  'rugGeometric',
  'plantTabletop',
  'plantFloor',
  'plantCorner',
  'plantMidcentury',
  'mirrorStanding',
  'mirrorWall',
  'mirrorStorage',
  'mirrorClassicRounded',
  'lampTable',
  'lampFloor',
  'lampIndirect',
  'lampMidcenturyGlobe',
  'curtainFabric',
  'blindRoller',
  'blindWood',
  'curtainBlackout',
] as const;

export type ModelKey = (typeof MODEL_KEYS)[number];

export interface FurnitureItem {
  id: string;
  index: number;
  group: string;
  name: string;
  category: FurnitureCategory;
  variants: string[];
  tags: string[];
  modelKey: ModelKey;
  description: string;
  implementationNote: string;
  purchaseUrl?: string;
}

export interface FurnitureApiResponse {
  items: FurnitureItem[];
}
