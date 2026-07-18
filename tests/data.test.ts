import { describe, expect, it } from 'vitest';
import { FALLBACK_FURNITURE } from '../src/data/fallbackFurniture';
import { BED_DESIGNS } from '../src/three/bedDesigns';
import { BOOKSHELF_DESIGNS } from '../src/three/bookshelfDesigns';
import { CHAIR_DESIGNS } from '../src/three/chairDesigns';
import { DESK_DESIGNS } from '../src/three/deskDesigns';
import { DRAWER_CHEST_DESIGNS } from '../src/three/drawerChestDesigns';
import { calculateDesignBounds, calculatePartBounds } from '../src/three/designGeometry';
import type { FurnitureDesign, FurniturePart } from '../src/three/designTypes';
import { NIGHTSTAND_DESIGNS } from '../src/three/nightstandDesigns';
import { MONITOR_DESIGNS } from '../src/three/monitorDesigns';
import { HANGER_DESIGNS } from '../src/three/hangerDesigns';
import { SOFA_BED_DESIGNS } from '../src/three/sofaBedDesigns';
import { SIDE_TABLE_DESIGNS } from '../src/three/sideTableDesigns';
import { SOFA_DESIGNS } from '../src/three/sofaDesigns';
import { WARDROBE_DESIGNS } from '../src/three/wardrobeDesigns';
import { MEDIA_CONSOLE_DESIGNS } from '../src/three/mediaConsoleDesigns';
import { TV_DESIGNS } from '../src/three/tvDesigns';
import { MULTI_TABLE_DESIGNS } from '../src/three/multiTableDesigns';
import { PARTITION_SHELF_DESIGNS } from '../src/three/partitionShelfDesigns';
import { RUG_DESIGNS } from '../src/three/rugDesigns';
import { PLANT_DESIGNS } from '../src/three/plantDesigns';
import { FULL_LENGTH_MIRROR_DESIGNS } from '../src/three/fullLengthMirrorDesigns';
import { MOOD_LAMP_DESIGNS, MOOD_LAMP_LIGHTS } from '../src/three/moodLampDesigns';
import { CURTAIN_BLIND_DESIGNS } from '../src/three/curtainBlindDesigns';
import { createFabricCurtainGeometry } from '../src/three/curtainGeometry';
import { MATERIALS } from '../src/three/materials';
import MATERIAL_CATALOG from '../src/three/materials.json';
import { MODEL_KEYS } from '../src/types/furniture';

function getPart(design: FurnitureDesign, partId: string) {
  const part = design.parts.find(({ id }) => id === partId);
  if (!part) throw new Error(`Missing ${design.id} part: ${partId}`);
  return part;
}

function extent(part: FurniturePart, axis: 0 | 1 | 2): [number, number] {
  const bounds = calculatePartBounds(part);
  return [bounds.min[axis], bounds.max[axis]];
}

function overlaps(left: [number, number], right: [number, number]): boolean {
  const epsilon = 1e-6;
  return left[1] + epsilon >= right[0] && right[1] + epsilon >= left[0];
}

function touches(left: FurniturePart, right: FurniturePart): boolean {
  return ([0, 1, 2] as const).every((axis) => overlaps(extent(left, axis), extent(right, axis)));
}

function createProceduralPlantSupportMap(leafCount: number): Record<string, string> {
  const supportMap: Record<string, string> = { soil: 'pot' };
  for (let index = 1; index <= leafCount; index += 1) {
    supportMap[`stem-${index}`] = 'soil';
    supportMap[`leaf-${index}`] = `stem-${index}`;
    supportMap[`leaf-vein-${index}`] = `leaf-${index}`;
  }
  return supportMap;
}

describe('shared materials', () => {
  it('keeps the standalone material JSON aligned with renderer materials', () => {
    expect(MATERIAL_CATALOG.schemaVersion).toBe('1.0');
    expect(MATERIAL_CATALOG.materials).toEqual(MATERIALS);
  });

  it('keeps mirror surfaces bright in previews without an environment map', () => {
    expect(MATERIALS.mirror.roughness).toBeLessThan(0.15);
    expect(MATERIALS.mirror.metalness).toBeLessThan(0.5);
    expect(MATERIALS.mirror.emissiveIntensity ?? 0).toBeGreaterThan(0);
  });

  it('renders every mood lamp in a visibly switched-on state', () => {
    expect(MATERIALS.light.emissiveIntensity ?? 0).toBeGreaterThan(2);
    expect(MATERIALS.lampShade.emissiveIntensity ?? 0).toBeGreaterThan(0.5);
    expect(Object.values(MOOD_LAMP_LIGHTS).every(({ intensity }) => intensity >= 8)).toBe(true);
    expect(getPart(MOOD_LAMP_DESIGNS.lampTable, 'table-shade').material).toBe('lampShade');
    expect(getPart(MOOD_LAMP_DESIGNS.lampFloor, 'floor-shade').material).toBe('lampShade');
  });

  it('builds fabric curtains as continuous curved pleated surfaces', () => {
    const leftPanel = getPart(CURTAIN_BLIND_DESIGNS.curtainFabric, 'curtain-panel-left');
    expect(leftPanel.geometry).toBe('curtain');
    if (leftPanel.geometry !== 'curtain') throw new Error('Expected a curved curtain panel');

    const geometry = createFabricCurtainGeometry(leftPanel);
    const positions = geometry.getAttribute('position');
    const zValues = Array.from({ length: positions.count }, (_, index) => positions.getZ(index));
    expect(Math.max(...zValues) - Math.min(...zValues)).toBeGreaterThan(0.13);
    expect(new Set(zValues.map((value) => value.toFixed(4))).size).toBeGreaterThan(12);
    geometry.dispose();
  });
});

describe('purchase catalog data', () => {
  it('keeps purchaseUrl aligned between catalog items and downloadable JSON', () => {
    const expected = [
      {
        catalogIndex: 0, design: DESK_DESIGNS.deskCompact,
        purchaseUrl: 'https://www.ikea.com/kr/ko/p/lagkapten-adils-desk-white-s09416759/',
      },
      {
        catalogIndex: 1, design: DESK_DESIGNS.deskStorage,
        purchaseUrl: 'https://www.ikea.com/kr/ko/p/micke-desk-black-brown-60354277/',
      },
      {
        catalogIndex: 2, design: DESK_DESIGNS.deskCorner,
        purchaseUrl: 'https://www.ikea.com/kr/ko/p/micke-corner-workstation-white-20354284/',
      },
      { catalogIndex: 3, design: BED_DESIGNS.bedLowPlatform, purchaseUrl: 'https://www.ikea.com/kr/ko/p/utaker-stackable-bed-with-2-mattresses-pine-agotnes-firm-s49428133/' },
      { catalogIndex: 4, design: BED_DESIGNS.bedStorage, purchaseUrl: 'https://www.ikea.com/kr/ko/p/brimnes-bed-frame-with-storage-white-loenset-s39278346/' },
      { catalogIndex: 5, design: BED_DESIGNS.bedFabricHeadboard, purchaseUrl: 'https://www.ikea.com/kr/ko/p/slattum-upholstered-bed-frame-vissle-dark-grey-60571252/' },
      { catalogIndex: 6, design: SOFA_BED_DESIGNS.sofaBedCompact, purchaseUrl: 'https://www.ikea.com/kr/ko/p/lycksele-murbo-2-seat-sofa-bed-ransta-natural-s69387018/' },
      { catalogIndex: 7, design: SOFA_BED_DESIGNS.sofaBedFolding, purchaseUrl: 'https://www.ikea.com/kr/ko/p/nyhamn-3-seat-sofa-bed-with-pocket-spring-mattress-knisa-grey-beige-s69306362/' },
      { catalogIndex: 8, design: SOFA_BED_DESIGNS.sofaBedDaybed, purchaseUrl: 'https://www.ikea.com/kr/ko/p/brimnes-day-bed-w-2-drawers-2-mattresses-white-agotnes-firm-s29427064/' },
      { catalogIndex: 9, design: NIGHTSTAND_DESIGNS.nightstandDrawer, purchaseUrl: 'https://www.ikea.com/kr/ko/p/kullen-chest-of-2-drawers-white-70355728/' },
      { catalogIndex: 10, design: NIGHTSTAND_DESIGNS.nightstandOpen, purchaseUrl: 'https://www.ikea.com/kr/ko/p/knarrevik-bedside-table-black-80576319/' },
      { catalogIndex: 11, design: NIGHTSTAND_DESIGNS.nightstandRound, purchaseUrl: 'https://www.ikea.com/kr/ko/p/gladom-tray-table-dark-grey-green-50578452/' },
      { catalogIndex: 12, design: CHAIR_DESIGNS.chairBasic, purchaseUrl: 'https://www.ikea.com/kr/ko/p/teodores-chair-black-00530622/' },
      { catalogIndex: 13, design: CHAIR_DESIGNS.chairArmrest, purchaseUrl: 'https://www.ikea.com/kr/ko/p/flintan-office-chair-with-armrests-black-s69424469/' },
      { catalogIndex: 14, design: CHAIR_DESIGNS.chairCompactSwivel, purchaseUrl: 'https://www.ikea.com/kr/ko/p/loberget-malskaer-swivel-chair-pad-white-dark-grey-s79445452/' },
      { catalogIndex: 15, design: BOOKSHELF_DESIGNS.bookshelfLow, purchaseUrl: 'https://www.ikea.com/kr/ko/p/billy-bookcase-white-70522044/' },
      { catalogIndex: 16, design: BOOKSHELF_DESIGNS.bookshelfHigh, purchaseUrl: 'https://www.ikea.com/kr/ko/p/billy-bookcase-white-00522047/' },
      { catalogIndex: 17, design: BOOKSHELF_DESIGNS.bookshelfDoubleOpen, purchaseUrl: 'https://www.ikea.com/kr/ko/p/kallax-shelving-unit-white-20351884/' },
      { catalogIndex: 18, design: MONITOR_DESIGNS.monitorBasic, purchaseUrl: 'https://www.lge.co.kr/monitors/24u631a' },
      { catalogIndex: 19, design: MONITOR_DESIGNS.monitorUltrawide, purchaseUrl: 'https://www.samsung.com/sec/monitors/high-resolution-ls34c500gakxkr-d2c/LS34C500GAKXKR/' },
      { catalogIndex: 20, design: MONITOR_DESIGNS.monitorDual, purchaseUrl: 'https://www.devicemart.co.kr/goods/view?no=15258546' },
      { catalogIndex: 21, design: WARDROBE_DESIGNS.wardrobeHinged, purchaseUrl: 'https://www.ikea.com/kr/ko/p/kleppstad-wardrobe-with-2-doors-white-10437237/' },
      { catalogIndex: 22, design: WARDROBE_DESIGNS.wardrobeSliding, purchaseUrl: 'https://www.ikea.com/kr/ko/p/kleppstad-wardrobe-with-sliding-doors-white-30437241/' },
      { catalogIndex: 23, design: WARDROBE_DESIGNS.wardrobeOpen, purchaseUrl: 'https://www.ikea.com/kr/ko/p/jonaxel-wardrobe-combination-white-s89297658/' },
      { catalogIndex: 24, design: DRAWER_CHEST_DESIGNS.drawerChestLowWide, purchaseUrl: 'https://www.ikea.com/kr/ko/p/kullen-chest-of-6-drawers-white-50355734/' },
      { catalogIndex: 25, design: DRAWER_CHEST_DESIGNS.drawerChestVertical, purchaseUrl: 'https://www.ikea.com/kr/ko/p/kullen-chest-of-5-drawers-white-90355732/' },
      { catalogIndex: 26, design: DRAWER_CHEST_DESIGNS.drawerChestBedside, purchaseUrl: 'https://www.ikea.com/kr/ko/p/kullen-chest-of-2-drawers-white-70355728/' },
      { catalogIndex: 27, design: HANGER_DESIGNS.hangerBasic, purchaseUrl: 'https://www.ikea.com/kr/ko/p/rigga-clothes-rack-white-30231631/' },
      { catalogIndex: 28, design: HANGER_DESIGNS.hangerShelf, purchaseUrl: 'https://www.ikea.com/kr/ko/p/grafjaellet-clothes-rack-with-shoe-storage-anthracite-80570223/' },
      { catalogIndex: 29, design: HANGER_DESIGNS.hangerCorner, purchaseUrl: 'https://www.roomnhome.com/goods/goods_view.php?goodsNo=186797137' },
      { catalogIndex: 63, design: DESK_DESIGNS.deskMidcenturyGlass, purchaseUrl: 'https://www.oldbonesco.com/products/denali-glass-top-desk' },
      { catalogIndex: 64, design: BED_DESIGNS.bedMidcenturyTeal, purchaseUrl: 'https://midinmod.com/products/ashley-platform-queen-bed-dark-teal-velvet' },
      { catalogIndex: 65, design: SOFA_BED_DESIGNS.sofaBedMidcenturyOrange, purchaseUrl: 'https://www.habitat.co.uk/product/7571745' },
      { catalogIndex: 66, design: BED_DESIGNS.bedClassicIdanaes, purchaseUrl: 'https://www.ikea.com/kr/en/p/idanaes-upholstered-bed-frame-gunnared-dark-grey-80458938/' },
      { catalogIndex: 67, design: BED_DESIGNS.bedLoftDesk, purchaseUrl: 'https://www.ikea.com/kr/en/p/smastad-loft-bed-frame-w-desk-and-storage-white-30454037/' },
      { catalogIndex: 68, design: SOFA_BED_DESIGNS.sofaBedClassicStorage, purchaseUrl: 'https://www.ikea.com/kr/en/p/hemnes-day-bed-w-3-drawers-2-mattresses-white-vannareid-extra-firm-s19390947/' },
      { catalogIndex: 69, design: NIGHTSTAND_DESIGNS.nightstandClassicGullaberg, purchaseUrl: 'https://www.ikea.com/kr/en/p/gullaberg-bedside-table-yellow-with-1-drawer-with-shelf-50593443/' },
      { catalogIndex: 70, design: NIGHTSTAND_DESIGNS.nightstandMidcenturyTrolley, purchaseUrl: 'https://kartellkorea.com/product/4%EC%9B%94-%ED%81%90%EB%A0%88%EC%9D%B4%EC%85%98-25-componibili-2round-%EB%A0%88%EB%93%9C/403/' },
      { catalogIndex: 71, design: CHAIR_DESIGNS.chairClassicTonstad, purchaseUrl: 'https://www.ikea.com/kr/ko/p/tonstad-chair-bomstad-golden-brown-oak-effect-s09602172/' },
      { catalogIndex: 72, design: CHAIR_DESIGNS.chairGamingMatchspel, purchaseUrl: 'https://www.ikea.com/kr/en/p/matchspel-gaming-chair-gunnared-beige-30574285/' },
      { catalogIndex: 73, design: BOOKSHELF_DESIGNS.bookshelfClassicHavsta, purchaseUrl: 'https://www.ikea.com/kr/ko/p/havsta-glass-door-cabinet-with-plinth-white-clear-glass-s29563141/' },
      { catalogIndex: 74, design: BOOKSHELF_DESIGNS.bookshelfMidcenturyStockholm, purchaseUrl: 'https://us.usm.com/products/usm-haller-shelving-h2' },
      { catalogIndex: 75, design: MONITOR_DESIGNS.monitorGamingOdyssey, purchaseUrl: 'https://www.samsung.com/sec/monitors/gaming-ls32dg504ekxkr-d2c/LS32DG504EKXKR/' },
      { catalogIndex: 76, design: WARDROBE_DESIGNS.wardrobeNaturalNordkisa, purchaseUrl: 'https://www.ikea.com/kr/en/p/nordkisa-open-wardrobe-with-sliding-door-bamboo-80439469/' },
      { catalogIndex: 77, design: WARDROBE_DESIGNS.wardrobeClassicGullaberg, purchaseUrl: 'https://www.ikea.com/kr/en/p/gullaberg-wardrobe-white-90573952/' },
      { catalogIndex: 78, design: DRAWER_CHEST_DESIGNS.drawerChestClassicGullaberg, purchaseUrl: 'https://www.ikea.com/kr/en/p/gullaberg-chest-of-6-drawers-white-anchor-unlock-function-20561778/' },
      { catalogIndex: 79, design: HANGER_DESIGNS.hangerNaturalMorsning, purchaseUrl: 'https://www.ikea.com/kr/en/p/morsning-valet-stand-bamboo-70464435/' },
      { catalogIndex: 80, design: SOFA_DESIGNS.sofaClassicEktorp, purchaseUrl: 'https://www.ikea.com/kr/en/p/ektorp-3-seat-sofa-kilanda-light-beige-s49509011/' },
      { catalogIndex: 81, design: SOFA_DESIGNS.sofaMidcenturyStockholm, purchaseUrl: 'https://hermanmiller.co.jp/collections/furniture-living-room/products/nelson-marshmallow-sofa' },
      { catalogIndex: 82, design: SIDE_TABLE_DESIGNS.sideTableMidcenturyStockholm, purchaseUrl: 'https://www.kartell.com/mk/en/kter/shop/product/tip-top/kar08600b4' },
      { catalogIndex: 83, design: TV_DESIGNS.tvNaturalFrame, purchaseUrl: 'https://www.samsung.com/sec/tvs/packge-kq43lsf03-tk-d2c/KQ43LSF03-TK/' },
      { catalogIndex: 84, design: MEDIA_CONSOLE_DESIGNS.mediaConsoleMidcenturyStockholm, purchaseUrl: 'https://us.usm.com/products/usm-haller-media-o3' },
      { catalogIndex: 92, design: CHAIR_DESIGNS.chairMidcenturyShell, purchaseUrl: 'https://store.hermanmiller.com/dining-furniture-chairs-stools/eames-molded-plastic-side-chair/1104.html?lang=en_US' },
    ] as const;

    for (const item of expected) {
      const catalogItem = FALLBACK_FURNITURE[item.catalogIndex]!;
      expect(catalogItem.purchaseUrl).toBe(item.purchaseUrl);
      expect(item.design.purchaseUrl).toBe(item.purchaseUrl);
      expect(new URL(item.purchaseUrl).protocol).toBe('https:');
    }
  });

  it('contains the complete catalog in order', () => {
    expect(FALLBACK_FURNITURE.map(({ id, name, variants, modelKey }) => ({ id, name, variants, modelKey }))).toEqual([
      { id: 'desk-compact', name: '컴팩트 책상', variants: ['컴팩트형'], modelKey: 'deskCompact' },
      { id: 'desk-storage', name: '수납 결합 책상', variants: ['수납 결합형'], modelKey: 'deskStorage' },
      { id: 'desk-corner', name: '코너 책상', variants: ['코너형'], modelKey: 'deskCorner' },
      { id: 'bed-low-platform', name: '로우 플랫폼 침대', variants: ['로우 플랫폼형'], modelKey: 'bedLowPlatform' },
      { id: 'bed-storage', name: '수납형 침대', variants: ['수납형'], modelKey: 'bedStorage' },
      { id: 'bed-fabric-headboard', name: '패브릭 헤드 침대', variants: ['패브릭 헤드형'], modelKey: 'bedFabricHeadboard' },
      { id: 'sofa-bed-compact', name: '컴팩트 소파베드', variants: ['컴팩트형'], modelKey: 'sofaBedCompact' },
      { id: 'sofa-bed-folding', name: '접이식 소파베드', variants: ['접이식형'], modelKey: 'sofaBedFolding' },
      { id: 'sofa-bed-daybed', name: '데이베드형 소파베드', variants: ['데이베드형'], modelKey: 'sofaBedDaybed' },
      { id: 'nightstand-drawer', name: '서랍형 협탁', variants: ['서랍형'], modelKey: 'nightstandDrawer' },
      { id: 'nightstand-open', name: '오픈형 협탁', variants: ['오픈형'], modelKey: 'nightstandOpen' },
      { id: 'nightstand-round', name: '원형 테이블 협탁', variants: ['원형 테이블형'], modelKey: 'nightstandRound' },
      { id: 'chair-basic', name: '기본형 책상 의자', variants: ['기본형'], modelKey: 'chairBasic' },
      { id: 'chair-armrest', name: '팔걸이형 책상 의자', variants: ['팔걸이형'], modelKey: 'chairArmrest' },
      { id: 'chair-compact-swivel', name: '컴팩트 회전형 책상 의자', variants: ['컴팩트 회전형'], modelKey: 'chairCompactSwivel' },
      { id: 'bookshelf-low', name: '낮은 책장', variants: ['낮은 책장'], modelKey: 'bookshelfLow' },
      { id: 'bookshelf-high', name: '높은 책장', variants: ['높은 책장'], modelKey: 'bookshelfHigh' },
      { id: 'bookshelf-double-open', name: '양면 오픈 선반', variants: ['양면 오픈형'], modelKey: 'bookshelfDoubleOpen' },
      { id: 'monitor-basic', name: '기본형 모니터', variants: ['기본형'], modelKey: 'monitorBasic' },
      { id: 'monitor-ultrawide', name: '울트라와이드 모니터', variants: ['울트라와이드형'], modelKey: 'monitorUltrawide' },
      { id: 'monitor-dual', name: '듀얼 모니터', variants: ['듀얼 모니터형'], modelKey: 'monitorDual' },
      { id: 'wardrobe-hinged', name: '여닫이형 옷장', variants: ['여닫이형'], modelKey: 'wardrobeHinged' },
      { id: 'wardrobe-sliding', name: '슬라이딩형 옷장', variants: ['슬라이딩형'], modelKey: 'wardrobeSliding' },
      { id: 'wardrobe-open', name: '오픈형 옷장', variants: ['오픈형'], modelKey: 'wardrobeOpen' },
      { id: 'drawer-chest-low-wide', name: '낮은 와이드형 서랍장', variants: ['낮은 와이드형'], modelKey: 'drawerChestLowWide' },
      { id: 'drawer-chest-vertical', name: '세로형 서랍장', variants: ['세로형'], modelKey: 'drawerChestVertical' },
      { id: 'drawer-chest-bedside', name: '협탁 겸용 서랍장', variants: ['협탁 겸용형'], modelKey: 'drawerChestBedside' },
      { id: 'hanger-basic', name: '기본 스탠드형 행거', variants: ['기본 스탠드형'], modelKey: 'hangerBasic' },
      { id: 'hanger-shelf', name: '선반 결합형 행거', variants: ['선반 결합형'], modelKey: 'hangerShelf' },
      { id: 'hanger-corner', name: '코너형 행거', variants: ['코너형'], modelKey: 'hangerCorner' },
      { id: 'sofa-single', name: '1인용 소파', variants: ['1인형'], modelKey: 'sofaSingle' },
      { id: 'sofa-two-seat', name: '2인용 소파', variants: ['2인형'], modelKey: 'sofaTwoSeat' },
      { id: 'sofa-modular', name: '모듈형 소파', variants: ['모듈형'], modelKey: 'sofaModular' },
      { id: 'side-table-round', name: '원형 사이드 테이블', variants: ['원형 사이드형'], modelKey: 'sideTableRound' },
      { id: 'side-table-coffee', name: '낮은 커피 테이블', variants: ['낮은 커피형'], modelKey: 'sideTableCoffee' },
      { id: 'side-table-storage', name: '수납형 사이드 테이블', variants: ['수납형'], modelKey: 'sideTableStorage' },
      { id: 'tv-small', name: '소형 TV', variants: ['소형형'], modelKey: 'tvSmall' },
      { id: 'tv-medium', name: '중형 TV', variants: ['중형형'], modelKey: 'tvMedium' },
      { id: 'tv-wide', name: '와이드형 TV', variants: ['와이드형'], modelKey: 'tvWide' },
      { id: 'media-console-low', name: '낮은 콘솔형 TV장', variants: ['낮은 콘솔형'], modelKey: 'mediaConsoleLow' },
      { id: 'media-console-drawer', name: '서랍형 미디어 콘솔', variants: ['서랍형'], modelKey: 'mediaConsoleDrawer' },
      { id: 'media-console-open', name: '오픈 선반형 미디어 콘솔', variants: ['오픈 선반형'], modelKey: 'mediaConsoleOpen' },
      { id: 'multi-table-compact', name: '1인 컴팩트 다용도 테이블', variants: ['1인 컴팩트형'], modelKey: 'multiTableCompact' },
      { id: 'multi-table-two-seat', name: '2인용 다용도 테이블', variants: ['2인형'], modelKey: 'multiTableTwoSeat' },
      { id: 'multi-table-storage', name: '수납 결합 다용도 테이블', variants: ['수납 결합형'], modelKey: 'multiTableStorage' },
      { id: 'partition-shelf-slim', name: '슬림 파티션', variants: ['슬림 파티션'], modelKey: 'partitionShelfSlim' },
      { id: 'partition-shelf-translucent', name: '반투명 파티션', variants: ['반투명형'], modelKey: 'partitionShelfTranslucent' },
      { id: 'partition-shelf-storage', name: '수납 결합 양면 선반', variants: ['수납 결합형'], modelKey: 'partitionShelfStorage' },
      { id: 'rug-round', name: '원형 러그', variants: ['원형'], modelKey: 'rugRound' },
      { id: 'rug-rectangular', name: '직사각형 러그', variants: ['직사각형'], modelKey: 'rugRectangular' },
      { id: 'rug-runner', name: '러너형 러그', variants: ['러너형'], modelKey: 'rugRunner' },
      { id: 'plant-tabletop', name: '소형 테이블 화분', variants: ['소형 테이블형'], modelKey: 'plantTabletop' },
      { id: 'plant-floor', name: '중형 바닥 화분', variants: ['중형 바닥형'], modelKey: 'plantFloor' },
      { id: 'plant-corner', name: '대형 코너 화분', variants: ['대형 코너형'], modelKey: 'plantCorner' },
      { id: 'mirror-standing', name: '스탠드형 전신거울', variants: ['스탠드형'], modelKey: 'mirrorStanding' },
      { id: 'mirror-wall', name: '벽걸이형 전신거울', variants: ['벽걸이형'], modelKey: 'mirrorWall' },
      { id: 'mirror-storage', name: '수납 결합 전신거울', variants: ['수납 결합형'], modelKey: 'mirrorStorage' },
      { id: 'lamp-table', name: '테이블 무드등', variants: ['테이블 램프형'], modelKey: 'lampTable' },
      { id: 'lamp-floor', name: '스탠드 무드등', variants: ['스탠드형'], modelKey: 'lampFloor' },
      { id: 'lamp-indirect', name: 'LED 무드등', variants: ['LED 단스탠드형'], modelKey: 'lampIndirect' },
      { id: 'curtain-fabric', name: '패브릭 커튼', variants: ['패브릭 커튼'], modelKey: 'curtainFabric' },
      { id: 'blind-roller', name: '롤 블라인드', variants: ['롤 블라인드'], modelKey: 'blindRoller' },
      { id: 'blind-wood', name: '우드 블라인드', variants: ['우드 블라인드'], modelKey: 'blindWood' },
      { id: 'desk-midcentury-glass', name: '미드센추리 글라스 책상', variants: ['미드센추리 글라스형'], modelKey: 'deskMidcenturyGlass' },
      { id: 'bed-midcentury-teal', name: '미드센추리 터쿼이즈 침대', variants: ['미드센추리 터쿼이즈형'], modelKey: 'bedMidcenturyTeal' },
      { id: 'sofa-bed-midcentury-orange', name: '미드센추리 오렌지 소파베드', variants: ['미드센추리 오렌지형'], modelKey: 'sofaBedMidcenturyOrange' },
      { id: 'bed-classic-idanaes', name: '클래식 버튼 패브릭 침대', variants: ['클래식 버튼형'], modelKey: 'bedClassicIdanaes' },
      { id: 'bed-loft-desk', name: '책상 수납 로프트 침대', variants: ['책상 수납 로프트형'], modelKey: 'bedLoftDesk' },
      { id: 'sofa-bed-classic-storage', name: '클래식 3서랍 소파베드', variants: ['클래식 3서랍형'], modelKey: 'sofaBedClassicStorage' },
      { id: 'nightstand-classic-gullaberg', name: '클래식 옐로 협탁', variants: ['클래식 옐로 서랍형'], modelKey: 'nightstandClassicGullaberg' },
      { id: 'nightstand-midcentury-trolley', name: '미드센추리 레드 플라스틱 협탁', variants: ['미드센추리 레드 플라스틱형'], modelKey: 'nightstandMidcenturyTrolley' },
      { id: 'chair-classic-tonstad', name: '클래식 우드 책상 의자', variants: ['클래식 우드형'], modelKey: 'chairClassicTonstad' },
      { id: 'chair-gaming-matchspel', name: '게이밍 책상 의자', variants: ['게이밍 인체공학형'], modelKey: 'chairGamingMatchspel' },
      { id: 'bookshelf-classic-havsta', name: '클래식 유리도어 책장', variants: ['클래식 유리도어형'], modelKey: 'bookshelfClassicHavsta' },
      { id: 'bookshelf-midcentury-stockholm', name: '미드센추리 블루 메탈 선반', variants: ['미드센추리 블루 메탈형'], modelKey: 'bookshelfMidcenturyStockholm' },
      { id: 'monitor-gaming-odyssey', name: '오디세이 게이밍 모니터', variants: ['32인치 게이밍형'], modelKey: 'monitorGamingOdyssey' },
      { id: 'wardrobe-natural-nordkisa', name: '내추럴 슬라이딩 오픈 옷장', variants: ['내추럴 슬라이딩 오픈형'], modelKey: 'wardrobeNaturalNordkisa' },
      { id: 'wardrobe-classic-gullaberg', name: '클래식 미러 옷장', variants: ['클래식 3도어 미러형'], modelKey: 'wardrobeClassicGullaberg' },
      { id: 'drawer-chest-classic-gullaberg', name: '클래식 6단 서랍장', variants: ['클래식 2열 6서랍형'], modelKey: 'drawerChestClassicGullaberg' },
      { id: 'hanger-natural-morsning', name: '내추럴 대나무 발렛 행거', variants: ['내추럴 대나무형'], modelKey: 'hangerNaturalMorsning' },
      { id: 'sofa-classic-ektorp', name: '클래식 쿠션 소파', variants: ['클래식 쿠션형'], modelKey: 'sofaClassicEktorp' },
      { id: 'sofa-midcentury-stockholm', name: '미드센추리 마시멜로 소파', variants: ['미드센추리 컬러 원형 쿠션형'], modelKey: 'sofaMidcenturyStockholm' },
      { id: 'side-table-midcentury-stockholm', name: '미드센추리 투명 플라스틱 테이블', variants: ['미드센추리 투명 플라스틱형'], modelKey: 'sideTableMidcenturyStockholm' },
      { id: 'tv-natural-frame', name: '내추럴 우드 프레임 TV', variants: ['내추럴 우드 프레임형'], modelKey: 'tvNaturalFrame' },
      { id: 'media-console-midcentury-stockholm', name: '미드센추리 골든 옐로 TV장', variants: ['미드센추리 골든 옐로 메탈형'], modelKey: 'mediaConsoleMidcenturyStockholm' },
      { id: 'multi-table-gateleg', name: '클래식 게이트레그 다용도 테이블', variants: ['클래식 확장 수납형'], modelKey: 'multiTableGateleg' },
      { id: 'partition-shelf-kallax', name: '오픈 수납 파티션 선반', variants: ['오픈 수납 취미형'], modelKey: 'partitionShelfKallax' },
      { id: 'rug-geometric', name: '미드센추리 기하학 러그', variants: ['미드센추리 기하학형'], modelKey: 'rugGeometric' },
      { id: 'plant-midcentury', name: '미드센추리 레드 화분', variants: ['미드센추리 플라스틱형'], modelKey: 'plantMidcentury' },
      { id: 'mirror-classic-rounded', name: '내추럴 와이드 전신거울', variants: ['내추럴 와이드 스탠드형'], modelKey: 'mirrorClassicRounded' },
      { id: 'lamp-midcentury-globe', name: '미드센추리 글로브 무드등', variants: ['미드센추리 글로브형'], modelKey: 'lampMidcenturyGlobe' },
      { id: 'curtain-blackout', name: '암막 플리츠 커튼', variants: ['암막 플리츠형'], modelKey: 'curtainBlackout' },
      { id: 'chair-midcentury-shell', name: '미드센추리 쉘 책상 의자', variants: ['미드센추리 쉘형'], modelKey: 'chairMidcenturyShell' },
    ]);
    expect(MODEL_KEYS).toEqual([
      'deskCompact', 'deskStorage', 'deskCorner', 'deskMidcenturyGlass',
      'bedLowPlatform', 'bedStorage', 'bedFabricHeadboard', 'bedMidcenturyTeal', 'bedClassicIdanaes', 'bedLoftDesk',
      'sofaBedCompact', 'sofaBedFolding', 'sofaBedDaybed', 'sofaBedMidcenturyOrange', 'sofaBedClassicStorage',
      'nightstandDrawer', 'nightstandOpen', 'nightstandRound', 'nightstandClassicGullaberg', 'nightstandMidcenturyTrolley',
      'chairBasic', 'chairArmrest', 'chairCompactSwivel', 'chairClassicTonstad', 'chairGamingMatchspel', 'chairMidcenturyShell',
      'bookshelfLow', 'bookshelfHigh', 'bookshelfDoubleOpen', 'bookshelfClassicHavsta', 'bookshelfMidcenturyStockholm',
      'monitorBasic', 'monitorUltrawide', 'monitorDual', 'monitorGamingOdyssey',
      'wardrobeHinged', 'wardrobeSliding', 'wardrobeOpen', 'wardrobeNaturalNordkisa', 'wardrobeClassicGullaberg',
      'drawerChestLowWide', 'drawerChestVertical', 'drawerChestBedside', 'drawerChestClassicGullaberg',
      'hangerBasic', 'hangerShelf', 'hangerCorner', 'hangerNaturalMorsning',
      'sofaSingle', 'sofaTwoSeat', 'sofaModular', 'sofaClassicEktorp', 'sofaMidcenturyStockholm',
      'sideTableRound', 'sideTableCoffee', 'sideTableStorage', 'sideTableMidcenturyStockholm',
      'tvSmall', 'tvMedium', 'tvWide', 'tvNaturalFrame',
      'mediaConsoleLow', 'mediaConsoleDrawer', 'mediaConsoleOpen', 'mediaConsoleMidcenturyStockholm',
      'multiTableCompact', 'multiTableTwoSeat', 'multiTableStorage', 'multiTableGateleg',
      'partitionShelfSlim', 'partitionShelfTranslucent', 'partitionShelfStorage', 'partitionShelfKallax',
      'rugRound', 'rugRectangular', 'rugRunner', 'rugGeometric',
      'plantTabletop', 'plantFloor', 'plantCorner', 'plantMidcentury',
      'mirrorStanding', 'mirrorWall', 'mirrorStorage', 'mirrorClassicRounded',
      'lampTable', 'lampFloor', 'lampIndirect', 'lampMidcenturyGlobe',
      'curtainFabric', 'blindRoller', 'blindWood', 'curtainBlackout',
    ]);
  });

  it('uses independent geometry definitions for every design', () => {
    const partIdSets = Object.values(DESK_DESIGNS).map(({ parts }) => parts.map(({ id }) => id));
    expect(new Set(partIdSets.map((ids) => ids.join('|'))).size).toBe(4);
    expect(DESK_DESIGNS.deskCompact.parts.map(({ id }) => id)).toContain('right-frame-back');
    expect(DESK_DESIGNS.deskStorage.parts.map(({ id }) => id)).toContain('drawer-3');
    expect(DESK_DESIGNS.deskCorner.parts.map(({ id }) => id)).toContain('corner-desktop');
    expect(DESK_DESIGNS.deskCorner.parts.map(({ id }) => id)).toContain('magnetic-board');
    expect(DESK_DESIGNS.deskMidcenturyGlass.parts.map(({ id }) => id)).toContain('glass-top');
    expect(new Set(Object.values(BED_DESIGNS).map(({ parts }) => parts.map(({ id }) => id).join('|'))).size).toBe(6);
    expect(new Set(Object.values(SOFA_BED_DESIGNS).map(({ parts }) => parts.map(({ id }) => id).join('|'))).size).toBe(5);
    expect(new Set(Object.values(NIGHTSTAND_DESIGNS).map(({ parts }) => parts.map(({ id }) => id).join('|'))).size).toBe(5);
    expect(new Set(Object.values(CHAIR_DESIGNS).map(({ parts }) => parts.map(({ id }) => id).join('|'))).size).toBe(6);
    expect(new Set(Object.values(BOOKSHELF_DESIGNS).map(({ parts }) => parts.map(({ id }) => id).join('|'))).size).toBe(5);
    expect(new Set(Object.values(MONITOR_DESIGNS).map(({ parts }) => parts.map(({ id }) => id).join('|'))).size).toBe(4);
    expect(new Set(Object.values(WARDROBE_DESIGNS).map(({ parts }) => parts.map(({ id }) => id).join('|'))).size).toBe(5);
    expect(new Set(Object.values(DRAWER_CHEST_DESIGNS).map(({ parts }) => parts.map(({ id }) => id).join('|'))).size).toBe(4);
    expect(new Set(Object.values(HANGER_DESIGNS).map(({ parts }) => parts.map(({ id }) => id).join('|'))).size).toBe(4);
    expect(new Set(Object.values(SIDE_TABLE_DESIGNS).map(({ parts }) => parts.map(({ id }) => id).join('|'))).size).toBe(4);
    expect(new Set(Object.values(SOFA_DESIGNS).map(({ parts }) => parts.map(({ id }) => id).join('|'))).size).toBe(5);
    expect(new Set(Object.values(TV_DESIGNS).map(({ parts }) => JSON.stringify(parts))).size).toBe(4);
    expect(new Set(Object.values(MEDIA_CONSOLE_DESIGNS).map(({ parts }) => parts.map(({ id }) => id).join('|'))).size).toBe(4);
    expect(new Set(Object.values(MULTI_TABLE_DESIGNS).map(({ parts }) => parts.map(({ id }) => id).join('|'))).size).toBe(4);
    expect(new Set(Object.values(PARTITION_SHELF_DESIGNS).map(({ parts }) => parts.map(({ id }) => id).join('|'))).size).toBe(4);
    expect(new Set(Object.values(RUG_DESIGNS).map(({ parts }) => parts.map(({ id }) => id).join('|'))).size).toBe(4);
    expect(PLANT_DESIGNS.plantTabletop.parts.filter(({ geometry }) => geometry === 'leaf')).toHaveLength(5);
    expect(PLANT_DESIGNS.plantFloor.parts.filter(({ geometry }) => geometry === 'leaf')).toHaveLength(14);
    expect(PLANT_DESIGNS.plantCorner.parts.filter(({ geometry }) => geometry === 'leaf')).toHaveLength(9);
    expect(PLANT_DESIGNS.plantMidcentury.parts.filter(({ geometry }) => geometry === 'leaf')).toHaveLength(9);
    expect(PLANT_DESIGNS.plantMidcentury.parts.filter(({ id }) => id.startsWith('stem-'))).toHaveLength(9);
    expect(PLANT_DESIGNS.plantFloor.dimensions.height).toBeCloseTo(0.4, 6);
    expect(PLANT_DESIGNS.plantCorner.dimensions.height).toBeCloseTo(0.9, 6);
    expect(Object.values(PLANT_DESIGNS).every(({ parts }) => parts.find(({ id }) => id === 'pot')?.geometry === 'planter')).toBe(true);
    expect(PLANT_DESIGNS.plantTabletop.parts.find(({ id }) => id === 'pot')?.material).toBe('ceramic');
    expect(PLANT_DESIGNS.plantFloor.parts.find(({ id }) => id === 'pot')?.material).toBe('terracotta');
    expect(PLANT_DESIGNS.plantCorner.parts.find(({ id }) => id === 'pot')?.material).toBe('ceramic');
    expect(Object.values(PLANT_DESIGNS).every(({ parts }) => parts.some(({ geometry }) => geometry === 'tube'))).toBe(true);
    expect(Object.values(PLANT_DESIGNS).every(({ parts }) => parts.some(({ geometry }) => geometry === 'leaf'))).toBe(true);
    expect(PLANT_DESIGNS.plantMidcentury.parts.find(({ id }) => id === 'pot')?.material).toBe('redPlastic');
    for (const design of Object.values(PLANT_DESIGNS)) {
      const leafCount = design.parts.filter(({ geometry }) => geometry === 'leaf').length;
      expect(design.parts.filter(({ id }) => id.startsWith('leaf-vein-'))).toHaveLength(leafCount);
      for (let index = 1; index <= leafCount; index += 1) {
        const stem = design.parts.find(({ id }) => id === `stem-${index}`);
        const leaf = design.parts.find(({ id }) => id === `leaf-${index}`);
        const vein = design.parts.find(({ id }) => id === `leaf-vein-${index}`);
        expect(stem?.geometry).toBe('tube');
        expect(leaf?.geometry).toBe('leaf');
        expect(vein?.geometry).toBe('tube');
        if (stem?.geometry === 'tube' && leaf?.geometry === 'leaf' && vein?.geometry === 'tube') {
          expect(stem.curvePoints[2].map((value, axis) => value + stem.position[axis]!))
            .toEqual(leaf.position);
          expect(vein.position).toEqual(leaf.position);
          expect(vein.rotation).toEqual(leaf.rotation);
          expect(vein.curvePoints[0][1]).toBeLessThan(0);
          expect(vein.curvePoints[2][1]).toBeGreaterThan(0);
        }
      }
    }
    expect(new Set(Object.values(PLANT_DESIGNS).map(({ parts }) => JSON.stringify(parts))).size).toBe(4);
    expect(new Set(Object.values(FULL_LENGTH_MIRROR_DESIGNS).map(({ parts }) => JSON.stringify(parts))).size).toBe(4);
    expect(new Set(Object.values(MOOD_LAMP_DESIGNS).map(({ parts }) => JSON.stringify(parts))).size).toBe(4);
    expect(new Set(Object.values(CURTAIN_BLIND_DESIGNS).map(({ parts }) => JSON.stringify(parts))).size).toBe(4);
  });

  it('derives exact dimensions from geometry with every model centered on the floor origin', () => {
    for (const design of [
      ...Object.values(DESK_DESIGNS),
      ...Object.values(BED_DESIGNS),
      ...Object.values(SOFA_BED_DESIGNS),
      ...Object.values(NIGHTSTAND_DESIGNS),
      ...Object.values(CHAIR_DESIGNS),
      ...Object.values(BOOKSHELF_DESIGNS),
      ...Object.values(MONITOR_DESIGNS),
      ...Object.values(WARDROBE_DESIGNS),
      ...Object.values(DRAWER_CHEST_DESIGNS),
      ...Object.values(HANGER_DESIGNS),
      ...Object.values(SIDE_TABLE_DESIGNS),
      ...Object.values(SOFA_DESIGNS),
      ...Object.values(TV_DESIGNS),
      ...Object.values(MEDIA_CONSOLE_DESIGNS),
      ...Object.values(MULTI_TABLE_DESIGNS),
      ...Object.values(PARTITION_SHELF_DESIGNS),
      ...Object.values(RUG_DESIGNS),
      ...Object.values(PLANT_DESIGNS),
      ...Object.values(FULL_LENGTH_MIRROR_DESIGNS),
      ...Object.values(MOOD_LAMP_DESIGNS),
      ...Object.values(CURTAIN_BLIND_DESIGNS),
    ]) {
      expect(design.schemaVersion).toBe('1.0');
      const bounds = calculateDesignBounds(design);

      expect(bounds.dimensions.width).toBeCloseTo(design.dimensions.width, 8);
      expect(bounds.dimensions.depth).toBeCloseTo(design.dimensions.depth, 8);
      expect(bounds.dimensions.height).toBeCloseTo(design.dimensions.height, 8);
      expect(bounds.min[1]).toBeCloseTo(0, 10);
      expect(bounds.center[0]).toBeCloseTo(0, 10);
      expect(bounds.center[2]).toBeCloseTo(0, 10);
      expect(design.coordinateSystem).toEqual({
        origin: 'floor-center',
        axes: { x: 'right', y: 'up', z: 'front' },
      });
      expect(design.rotationUnit).toBe('radian');
      expect(design.units).toBe('meter');
      expect(design.category).toBe(design.furnitureType);
      for (const part of design.parts) {
        if ('size' in part) {
          expect(part.size.every((value) => value > 0)).toBe(true);
        } else if (part.geometry === 'tube') {
          expect(part.radius).toBeGreaterThan(0);
          expect(part.tubularSegments).toBeGreaterThan(0);
          expect(part.radialSegments).toBeGreaterThan(0);
        } else if (part.geometry === 'extrudedPolygon') {
          expect(part.height).toBeGreaterThan(0);
          expect(part.points.length).toBeGreaterThanOrEqual(3);
        } else {
          expect(part.width).toBeGreaterThan(0);
          expect(part.height).toBeGreaterThan(0);
          expect(part.curveSegments).toBeGreaterThan(0);
        }
        expect(design.materials).toContain(part.material);
      }
    }
  });

  it('keeps every chair back support behind its visible back cushion', () => {
    const checks = [
      [CHAIR_DESIGNS.chairBasic, 'back-post-left', 'backrest'],
      [CHAIR_DESIGNS.chairArmrest, 'back-support-left', 'mesh-back'],
      [CHAIR_DESIGNS.chairCompactSwivel, 'back-support', 'shell-back'],
      [CHAIR_DESIGNS.chairClassicTonstad, 'back-post-left', 'upholstered-back'],
      [CHAIR_DESIGNS.chairGamingMatchspel, 'back-frame', 'mesh-back'],
      [CHAIR_DESIGNS.chairMidcenturyShell, 'back-support-left', 'curved-back-shell'],
    ] as const;

    for (const [design, supportId, cushionId] of checks) {
      const support = extent(getPart(design, supportId), 2);
      const cushion = extent(getPart(design, cushionId), 2);
      expect(support[1]).toBeLessThan(cushion[1]);
    }
  });



  it('connects the four ADILS-style legs to the compact desktop', () => {
    const design = DESK_DESIGNS.deskCompact;
    const top = getPart(design, 'top');

    for (const legId of ['left-frame-front', 'left-frame-back', 'right-frame-front', 'right-frame-back']) {
      const leg = getPart(design, legId);
      expect(overlaps(extent(leg, 1), extent(top, 1))).toBe(true);
    }
  });

  it('spans the storage shelf and rear panel between both supporting sides', () => {
    const design = DESK_DESIGNS.deskStorage;
    const leftPanel = getPart(design, 'left-panel');
    const pedestal = getPart(design, 'pedestal-body');

    for (const supportedPartId of ['open-shelf', 'modesty-panel']) {
      const supportedPart = getPart(design, supportedPartId);
      expect(overlaps(extent(supportedPart, 0), extent(leftPanel, 0))).toBe(true);
      expect(overlaps(extent(supportedPart, 0), extent(pedestal, 0))).toBe(true);
    }
  });

  it('builds the MICKE-style corner workstation as one supported floor-standing structure', () => {
    const design = DESK_DESIGNS.deskCorner;
    const desktop = getPart(design, 'corner-desktop');

    expect(desktop).toMatchObject({
      geometry: 'extrudedPolygon',
      height: 0.04,
      position: [0.15, 0.735, 0],
      material: 'paintedWhite',
    });
    if (desktop.geometry !== 'extrudedPolygon') throw new Error('corner-desktop must be an extruded polygon');
    expect(desktop.rotation).toBeUndefined();
    expect(desktop.points[0]).toEqual([-0.8, -0.5]);
    expect(desktop.points.at(-1)).toEqual([-0.8, 0.1]);
    expect(desktop.points[0]).not.toEqual(desktop.points.at(-1));
    expect(calculatePartBounds(desktop)).toEqual({
      min: [-0.65, 0.715, -0.5],
      max: [0.65, 0.755, 0.5],
    });

    for (const supportId of ['left-cabinet', 'right-side-panel', 'rear-support-panel']) {
      expect(touches(desktop, getPart(design, supportId))).toBe(true);
    }
    for (const uprightId of ['hutch-side-left', 'hutch-divider-left', 'hutch-divider-right', 'hutch-side-right', 'magnetic-board']) {
      expect(touches(desktop, getPart(design, uprightId))).toBe(true);
    }

    const top = getPart(design, 'hutch-top');
    expect(touches(top, getPart(design, 'hutch-side-left'))).toBe(true);
    expect(touches(top, getPart(design, 'hutch-side-right'))).toBe(true);

    for (const [shelfId, leftId, rightId] of [
      ['left-shelf-lower', 'hutch-side-left', 'hutch-divider-left'],
      ['left-shelf-upper', 'hutch-side-left', 'hutch-divider-left'],
      ['right-shelf-lower', 'hutch-divider-right', 'hutch-side-right'],
      ['right-shelf-upper', 'hutch-divider-right', 'hutch-side-right'],
    ] as const) {
      const shelf = getPart(design, shelfId);
      expect(touches(shelf, getPart(design, leftId))).toBe(true);
      expect(touches(shelf, getPart(design, rightId))).toBe(true);
    }

    const tray = getPart(design, 'cable-tray');
    for (const bracketId of ['cable-bracket-left', 'cable-bracket-right']) {
      const bracket = getPart(design, bracketId);
      expect(touches(bracket, desktop)).toBe(true);
      expect(touches(bracket, tray)).toBe(true);
    }
    expect(touches(getPart(design, 'left-cabinet-door'), getPart(design, 'left-cabinet'))).toBe(true);
    expect(touches(getPart(design, 'left-door-handle'), getPart(design, 'left-cabinet-door'))).toBe(true);
  });

  it.each([
    ['midcentury glass desk', DESK_DESIGNS.deskMidcenturyGlass, ['left-runner', 'right-runner'], {
      'left-leg-front': 'left-runner', 'left-leg-back': 'left-runner',
      'right-leg-front': 'right-runner', 'right-leg-back': 'right-runner',
      'left-trestle': 'left-leg-front', 'right-trestle': 'right-leg-front',
      'center-stretcher': 'left-trestle',
      'brass-cap-left-front': 'left-trestle', 'brass-cap-left-back': 'left-trestle',
      'brass-cap-right-front': 'right-trestle', 'brass-cap-right-back': 'right-trestle',
      'glass-top': 'brass-cap-left-front',
    }],
    ['midcentury teal bed', BED_DESIGNS.bedMidcenturyTeal, [
      'leg-left-head', 'leg-right-head', 'leg-left-foot', 'leg-right-foot',
    ], {
      'side-rail-left': 'leg-left-head', 'side-rail-right': 'leg-right-head',
      'head-rail': 'side-rail-left', 'foot-rail': 'side-rail-left',
      'mattress-support': 'side-rail-left', mattress: 'mattress-support',
      'teal-headboard': 'head-rail',
      'tuft-left-upper': 'teal-headboard', 'tuft-center-upper': 'teal-headboard',
      'tuft-right-upper': 'teal-headboard', 'tuft-left-lower': 'teal-headboard',
      'tuft-center-lower': 'teal-headboard', 'tuft-right-lower': 'teal-headboard',
      'pillow-left': 'mattress', 'pillow-right': 'mattress', 'teal-runner': 'mattress',
    }],
    ['classic upholstered bed', BED_DESIGNS.bedClassicIdanaes, [
      'leg-left-head', 'leg-right-head', 'leg-left-foot', 'leg-right-foot',
    ], {
      'side-rail-left': 'leg-left-head', 'side-rail-right': 'leg-right-head',
      'foot-rail': 'side-rail-left', 'mattress-support': 'side-rail-left', mattress: 'mattress-support',
      headboard: 'side-rail-left', 'headboard-inner': 'headboard',
      'tuft-left-upper': 'headboard-inner', 'tuft-center-upper': 'headboard-inner',
      'tuft-right-upper': 'headboard-inner', 'tuft-left-lower': 'headboard-inner',
      'tuft-center-lower': 'headboard-inner', 'tuft-right-lower': 'headboard-inner',
      'pillow-left': 'mattress', 'pillow-right': 'mattress',
    }],
    ['loft desk bed', BED_DESIGNS.bedLoftDesk, [
      'post-left-back', 'post-left-front', 'post-right-back', 'post-right-front',
      'wardrobe-body', 'desk-left-panel', 'desk-right-panel', 'ladder-left', 'ladder-right',
    ], {
      'upper-back-rail': 'post-left-back', 'upper-front-rail': 'post-left-front',
      'upper-left-rail': 'post-left-back', 'upper-right-rail': 'post-right-back',
      'mattress-support': 'upper-back-rail', 'loft-mattress': 'mattress-support',
      'guard-back': 'guard-back-left-support', 'guard-front': 'guard-front-left-support',
      'guard-front-left-support': 'upper-front-rail', 'guard-front-right-support': 'upper-front-rail',
      'guard-back-left-support': 'upper-back-rail', 'guard-back-right-support': 'upper-back-rail',
      'wardrobe-door': 'wardrobe-body', 'wardrobe-handle': 'wardrobe-door',
      'desk-top': 'desk-left-panel', 'desk-back-brace': 'desk-top',
      'shelf-back': 'upper-back-rail', 'shelf-lower': 'shelf-back', 'shelf-upper': 'shelf-back',
      'ladder-rung-1': 'ladder-left', 'ladder-rung-2': 'ladder-left',
      'ladder-rung-3': 'ladder-left', 'ladder-rung-4': 'ladder-left',
      'loft-pillow': 'loft-mattress',
    }],
    ['midcentury orange sofa bed', SOFA_BED_DESIGNS.sofaBedMidcenturyOrange, [
      'leg-left-back', 'leg-right-back', 'leg-left-front', 'leg-right-front',
    ], {
      'base-frame': 'leg-left-front',
      'rear-support-left': 'base-frame', 'rear-support-right': 'base-frame',
      'click-clack-hinge': 'base-frame',
      'seat-cushion': 'base-frame', 'front-roll': 'base-frame',
      'side-roll-left': 'base-frame', 'side-roll-right': 'base-frame', 'back-frame': 'base-frame',
      'back-seam-1': 'back-frame', 'back-seam-2': 'back-frame', 'back-seam-3': 'back-frame',
      'back-seam-4': 'back-frame', 'back-seam-5': 'back-frame',
      'back-tuft-1': 'back-frame', 'back-tuft-2': 'back-frame', 'back-tuft-3': 'back-frame',
      'back-tuft-4': 'back-frame', 'back-tuft-5': 'back-frame', 'back-tuft-6': 'back-frame',
      'seat-tuft-1': 'seat-cushion', 'seat-tuft-2': 'seat-cushion', 'seat-tuft-3': 'seat-cushion',
      'seat-tuft-4': 'seat-cushion', 'seat-tuft-5': 'seat-cushion',
    }],
    ['classic storage sofa bed', SOFA_BED_DESIGNS.sofaBedClassicStorage, 'floor-plinth', {
      'storage-body': 'floor-plinth', 'drawer-left': 'storage-body', 'drawer-center': 'storage-body',
      'drawer-right': 'storage-body', 'handle-left': 'drawer-left', 'handle-center': 'drawer-center',
      'handle-right': 'drawer-right', 'mattress-support': 'storage-body', mattress: 'mattress-support',
      'end-left': 'floor-plinth', 'end-right': 'floor-plinth', 'back-lower-rail': 'end-left',
      'back-top-rail': 'back-slat-1', 'back-slat-1': 'back-lower-rail', 'back-slat-2': 'back-lower-rail',
      'back-slat-3': 'back-lower-rail', 'back-slat-4': 'back-lower-rail', 'back-slat-5': 'back-lower-rail',
      'back-cushion-left': 'mattress', 'back-cushion-right': 'mattress',
    }],
    ['low-platform bed', BED_DESIGNS.bedLowPlatform, ['lower-side-left', 'lower-side-right'], {
      'lower-head': 'lower-side-left', 'lower-foot': 'lower-side-left',
      'upper-side-left': 'lower-side-left', 'upper-side-right': 'lower-side-right',
      'upper-head': 'upper-side-left', 'upper-foot': 'upper-side-left',
      'mattress-lower': 'upper-side-left', 'mattress-upper': 'mattress-lower',
      pillow: 'mattress-upper', runner: 'mattress-upper',
    }],
    ['storage bed', BED_DESIGNS.bedStorage, 'storage-base', {
      mattress: 'storage-base', 'head-panel': 'storage-base', 'foot-panel': 'storage-base',
      'drawer-left': 'storage-base', 'drawer-right': 'storage-base',
      'handle-left': 'drawer-left', 'handle-right': 'drawer-right', 'pillow-left': 'mattress', 'pillow-right': 'mattress',
    }],
    ['fabric-headboard bed', BED_DESIGNS.bedFabricHeadboard, 'upholstered-frame', {
      mattress: 'upholstered-frame', 'fabric-headboard': 'upholstered-frame', 'headboard-inset': 'fabric-headboard', 'pillow-left': 'mattress',
      'pillow-right': 'mattress', blanket: 'mattress',
    }],
    ['compact sofa bed', SOFA_BED_DESIGNS.sofaBedCompact, 'base', {
      'back-support-left': 'base', 'back-support-right': 'base', 'seat-mattress': 'base',
      'rear-crossbar': 'back-support-left', 'back-mattress': 'rear-crossbar',
      'front-skirt': 'base', 'fold-seam': 'seat-mattress',
    }],
    ['folding sofa bed', SOFA_BED_DESIGNS.sofaBedFolding, 'platform', {
      'seat-mattress': 'platform', 'back-mattress': 'seat-mattress', 'back-frame': 'back-mattress',
      'hinge-bar': 'seat-mattress', 'side-hinge-left': 'platform', 'side-hinge-right': 'platform',
      'rear-support-left': 'platform', 'rear-support-right': 'platform', 'rear-crossbar': 'rear-support-left',
    }],
    ['daybed sofa bed', SOFA_BED_DESIGNS.sofaBedDaybed, 'platform', {
      'end-left': 'platform', 'end-right': 'platform', 'back-panel': 'platform',
      'drawer-left': 'platform', 'drawer-right': 'platform', 'drawer-grip-left': 'drawer-left',
      'drawer-grip-right': 'drawer-right', 'pullout-bed-frame': 'platform', 'pullout-mattress': 'pullout-bed-frame', mattress: 'pullout-mattress', bolster: 'mattress',
      'pillow-left': 'mattress', 'pillow-right': 'mattress',
    }],
    ['drawer nightstand', NIGHTSTAND_DESIGNS.nightstandDrawer, 'cabinet-body', {
      top: 'cabinet-body', 'drawer-upper': 'cabinet-body', 'drawer-lower': 'cabinet-body',
      'grip-upper': 'drawer-upper', 'grip-lower': 'drawer-lower',
    }],
    ['open nightstand', NIGHTSTAND_DESIGNS.nightstandOpen, 'base-frame', {
      'leg-left-front': 'base-frame', 'leg-left-back': 'base-frame', 'leg-right-front': 'base-frame',
      'leg-right-back': 'base-frame', 'open-shelf': 'leg-left-front', top: 'leg-left-front',
    }],
    ['round nightstand', NIGHTSTAND_DESIGNS.nightstandRound, ['foot-left', 'foot-right'], {
      'leg-left-front': 'foot-left', 'leg-left-back': 'foot-left',
      'leg-right-front': 'foot-right', 'leg-right-back': 'foot-right',
      'tray-top': 'leg-left-front', 'tray-surface': 'tray-top',
    }],
    ['classic yellow nightstand', NIGHTSTAND_DESIGNS.nightstandClassicGullaberg, [
      'leg-left-front', 'leg-left-back', 'leg-right-front', 'leg-right-back',
    ], {
      'lower-shelf': 'leg-left-front', 'cabinet-body': 'leg-left-front',
      'drawer-front': 'cabinet-body', 'drawer-knob': 'drawer-front', top: 'cabinet-body',
    }],
    ['midcentury trolley nightstand', NIGHTSTAND_DESIGNS.nightstandMidcenturyTrolley, 'floor-base', {
      'lower-module': 'floor-base', 'center-ring': 'lower-module', 'upper-module': 'center-ring',
      'top-rim': 'upper-module', 'lower-sliding-door': 'lower-module', 'upper-sliding-door': 'upper-module',
      'lower-finger-hole': 'lower-sliding-door', 'upper-finger-hole': 'upper-sliding-door',
    }],
    ['basic chair', CHAIR_DESIGNS.chairBasic, [
      'foot-left-front', 'foot-left-back', 'foot-right-front', 'foot-right-back',
    ], {
      'leg-left-front': 'foot-left-front', 'leg-left-back': 'foot-left-back',
      'leg-right-front': 'foot-right-front', 'leg-right-back': 'foot-right-back', seat: 'leg-left-front',
      'back-post-left': 'seat', 'back-post-right': 'seat', backrest: 'back-post-left',
    }],
    ['armrest chair', CHAIR_DESIGNS.chairArmrest, 'base-cross-x', {
      'base-cross-z': 'base-cross-x', 'gas-column': 'base-cross-x', 'seat-base': 'gas-column',
      'back-support-link-left': 'seat-base', 'back-support-link-right': 'seat-base',
      'back-support-left': 'back-support-link-left', 'back-support-right': 'back-support-link-right',
      'mesh-back': 'back-support-left',
      'arm-support-left': 'seat-base', 'arm-support-right': 'seat-base', 'arm-pad-left': 'arm-support-left',
      'arm-pad-right': 'arm-support-right',
    }],
    ['compact swivel chair', CHAIR_DESIGNS.chairCompactSwivel, 'base-cross-x', {
      'base-cross-z': 'base-cross-x', 'gas-column': 'base-cross-x', 'shell-seat': 'gas-column',
      'seat-pad': 'shell-seat', 'back-support-link': 'shell-seat', 'back-support': 'back-support-link',
      'shell-back': 'back-support',
    }],
    ['classic wood chair', CHAIR_DESIGNS.chairClassicTonstad, [
      'foot-left-front', 'foot-left-back', 'foot-right-front', 'foot-right-back',
    ], {
      'leg-left-front': 'foot-left-front', 'leg-left-back': 'foot-left-back',
      'leg-right-front': 'foot-right-front', 'leg-right-back': 'foot-right-back',
      'seat-base': 'leg-left-front', 'seat-cushion': 'seat-base',
      'back-post-left': 'seat-base', 'back-post-right': 'seat-base', 'upholstered-back': 'back-post-left',
    }],
    ['gaming chair', CHAIR_DESIGNS.chairGamingMatchspel, 'base-cross-x', {
      'base-cross-z': 'base-cross-x', 'gas-column': 'base-cross-x', 'seat-base': 'gas-column',
      'seat-pad': 'seat-base', 'back-support-link': 'seat-base', 'back-frame': 'back-support-link',
      'mesh-back': 'back-frame', 'lumbar-support': 'mesh-back',
      'arm-support-left': 'seat-base', 'arm-support-right': 'seat-base',
      'arm-pad-left': 'arm-support-left', 'arm-pad-right': 'arm-support-right',
      'headrest-support': 'back-frame', headrest: 'headrest-support',
    }],
    ['low bookshelf', BOOKSHELF_DESIGNS.bookshelfLow, 'plinth', {
      'side-left': 'plinth', 'side-right': 'plinth', top: 'side-left', 'shelf-lower': 'side-left',
      'shelf-upper': 'side-left', 'back-panel': 'plinth',
    }],
    ['high bookshelf', BOOKSHELF_DESIGNS.bookshelfHigh, 'plinth', {
      'side-left': 'plinth', 'side-right': 'plinth', top: 'side-left', 'shelf-1': 'side-left',
      'shelf-2': 'side-left', 'shelf-3': 'side-left', 'shelf-4': 'side-left', 'shelf-5': 'side-left',
      'back-panel': 'plinth',
    }],
    ['double-sided open bookshelf', BOOKSHELF_DESIGNS.bookshelfDoubleOpen, 'base', {
      'side-left': 'base', 'side-right': 'base', top: 'side-left', 'center-divider': 'base',
      'shelf-lower': 'side-left', 'shelf-middle': 'side-left', 'shelf-upper': 'side-left',
    }],
    ['classic glass-door bookshelf', BOOKSHELF_DESIGNS.bookshelfClassicHavsta, 'plinth', {
      'side-left': 'plinth', 'side-right': 'plinth', 'back-panel': 'plinth', 'bottom-panel': 'plinth',
      'shelf-lower': 'side-left', 'shelf-middle': 'side-left', 'shelf-upper': 'side-left', top: 'side-left',
      'glass-door-left': 'door-outer-left', 'glass-door-right': 'door-outer-right',
      'door-outer-left': 'door-rail-bottom', 'door-center-left': 'door-rail-bottom',
      'door-center-right': 'door-rail-bottom', 'door-outer-right': 'door-rail-bottom',
      'door-rail-bottom': 'glass-door-left', 'door-rail-top': 'glass-door-left',
      'handle-left': 'glass-door-left', 'handle-right': 'glass-door-right',
    }],
    ['midcentury open shelf', BOOKSHELF_DESIGNS.bookshelfMidcenturyStockholm, [
      'floor-rail-front', 'floor-rail-back',
    ], {
      'post-left-front': 'floor-rail-front', 'post-left-back': 'floor-rail-back',
      'post-center-front': 'floor-rail-front', 'post-center-back': 'floor-rail-back',
      'post-right-front': 'floor-rail-front', 'post-right-back': 'floor-rail-back',
      'shelf-bottom': 'post-left-front', 'shelf-lower': 'post-left-front',
      'shelf-middle': 'post-left-front', 'shelf-upper': 'post-left-front', 'shelf-top': 'post-left-front',
      'rear-brace-lower': 'post-left-back', 'rear-brace-upper': 'post-left-back',
    }],
    ['basic monitor', MONITOR_DESIGNS.monitorBasic, 'base', {
      stem: 'base', frame: 'stem', display: 'frame', 'lower-bezel': 'display',
    }],
    ['ultrawide monitor', MONITOR_DESIGNS.monitorUltrawide, 'base', {
      stem: 'base', 'wide-frame': 'stem', 'wide-display': 'wide-frame', 'wide-lower-bezel': 'wide-display',
    }],
    ['dual monitor', MONITOR_DESIGNS.monitorDual, 'base', {
      'center-column': 'base', crossbar: 'center-column', 'frame-left': 'crossbar', 'frame-right': 'crossbar',
      'display-left': 'frame-left', 'display-right': 'frame-right',
    }],
    ['gaming monitor', MONITOR_DESIGNS.monitorGamingOdyssey, 'stand-base', {
      'stand-neck': 'stand-base', 'rear-mount': 'stand-neck', 'gaming-frame': 'rear-mount',
      'gaming-display': 'gaming-frame', 'gaming-lower-bezel': 'gaming-display', 'center-mark': 'gaming-lower-bezel',
    }],
    ['hinged wardrobe', WARDROBE_DESIGNS.wardrobeHinged, 'plinth', {
      'side-left': 'plinth', 'side-right': 'plinth', top: 'side-left', 'back-panel': 'plinth',
      'hinge-left-lower': 'side-left', 'hinge-left-upper': 'side-left',
      'hinge-right-lower': 'side-right', 'hinge-right-upper': 'side-right',
      'door-left': 'hinge-left-lower', 'door-right': 'hinge-right-lower',
      'handle-left': 'door-left', 'handle-right': 'door-right',
    }],
    ['sliding wardrobe', WARDROBE_DESIGNS.wardrobeSliding, 'plinth', {
      'side-left': 'plinth', 'side-right': 'plinth', top: 'side-left', 'back-panel': 'plinth',
      'lower-track': 'side-left', 'upper-track': 'side-left', 'sliding-door-left': 'lower-track',
      'sliding-door-right': 'lower-track', 'recessed-grip': 'sliding-door-left',
    }],
    ['open wardrobe', WARDROBE_DESIGNS.wardrobeOpen, 'base-frame', {
      'post-left-front': 'base-frame', 'post-left-back': 'base-frame', 'post-right-front': 'base-frame',
      'post-right-back': 'base-frame', 'top-frame': 'post-left-front', 'top-shelf': 'post-left-front',
      'center-divider': 'base-frame', 'shelf-lower': 'center-divider', 'shelf-middle': 'center-divider',
      'shelf-upper': 'center-divider', 'rail-bracket-left': 'post-left-back',
      'rail-bracket-right': 'post-right-back', 'hanging-rail': 'rail-bracket-left',
    }],
    ['natural sliding open wardrobe', WARDROBE_DESIGNS.wardrobeNaturalNordkisa, 'base-shelf', {
      'post-left-front': 'base-shelf', 'post-left-back': 'base-shelf',
      'post-right-front': 'base-shelf', 'post-right-back': 'base-shelf',
      'top-shelf': 'post-left-front', 'center-divider': 'base-shelf',
      'shelf-lower': 'center-divider', 'shelf-middle': 'center-divider', 'shelf-upper': 'center-divider',
      'hanging-rail': 'post-left-back', 'door-rail-bottom': 'post-left-front',
      'door-rail-top': 'post-left-front',
      'door-slat-1': 'door-rail-bottom', 'door-slat-2': 'door-rail-bottom',
      'door-slat-3': 'door-rail-bottom', 'door-slat-4': 'door-rail-bottom',
      'door-slat-5': 'door-rail-bottom', 'door-slat-6': 'door-rail-bottom', 'door-slat-7': 'door-rail-bottom',
    }],
    ['classic mirror wardrobe', WARDROBE_DESIGNS.wardrobeClassicGullaberg, [
      'leg-left-front', 'leg-left-back', 'leg-right-front', 'leg-right-back',
    ], {
      'bottom-panel': 'leg-left-front', 'side-left': 'bottom-panel', 'side-right': 'bottom-panel',
      'center-divider-left': 'bottom-panel', 'center-divider-right': 'bottom-panel', 'back-panel': 'bottom-panel',
      'top-moulding': 'side-left', 'door-left': 'side-left', 'door-center-frame': 'center-divider-left',
      'door-center-mirror': 'door-center-frame', 'door-right': 'side-right',
      'drawer-left': 'side-left', 'drawer-right': 'side-right',
      'door-knob-left': 'door-left', 'door-knob-center': 'door-center-frame', 'door-knob-right': 'door-right',
      'drawer-knob-left': 'drawer-left', 'drawer-knob-right': 'drawer-right',
    }],
    ['low wide drawer chest', DRAWER_CHEST_DESIGNS.drawerChestLowWide, 'cabinet-body', {
      top: 'cabinet-body',
      'drawer-left-upper': 'cabinet-body', 'drawer-right-upper': 'cabinet-body',
      'drawer-left-middle': 'cabinet-body', 'drawer-right-middle': 'cabinet-body',
      'drawer-left-lower': 'cabinet-body', 'drawer-right-lower': 'cabinet-body',
      'handle-left-upper': 'drawer-left-upper', 'handle-right-upper': 'drawer-right-upper',
      'handle-left-middle': 'drawer-left-middle', 'handle-right-middle': 'drawer-right-middle',
      'handle-left-lower': 'drawer-left-lower', 'handle-right-lower': 'drawer-right-lower',
    }],
    ['vertical drawer chest', DRAWER_CHEST_DESIGNS.drawerChestVertical, 'tall-cabinet-body', {
      'tall-top': 'tall-cabinet-body',
      'drawer-1': 'tall-cabinet-body', 'drawer-2': 'tall-cabinet-body', 'drawer-3': 'tall-cabinet-body',
      'drawer-4': 'tall-cabinet-body', 'drawer-5': 'tall-cabinet-body',
      'handle-1': 'drawer-1', 'handle-2': 'drawer-2', 'handle-3': 'drawer-3',
      'handle-4': 'drawer-4', 'handle-5': 'drawer-5',
    }],
    ['bedside drawer chest', DRAWER_CHEST_DESIGNS.drawerChestBedside, 'compact-cabinet-body', {
      'compact-top': 'compact-cabinet-body',
      'compact-drawer-upper': 'compact-cabinet-body', 'compact-drawer-lower': 'compact-cabinet-body',
      'compact-grip-upper': 'compact-drawer-upper', 'compact-grip-lower': 'compact-drawer-lower',
    }],
    ['classic drawer chest', DRAWER_CHEST_DESIGNS.drawerChestClassicGullaberg, [
      'leg-left-front', 'leg-left-back', 'leg-right-front', 'leg-right-back',
    ], {
      'cabinet-body': 'leg-left-front', top: 'cabinet-body',
      'drawer-1-1': 'cabinet-body', 'drawer-1-2': 'cabinet-body',
      'drawer-2-1': 'cabinet-body', 'drawer-2-2': 'cabinet-body',
      'drawer-3-1': 'cabinet-body', 'drawer-3-2': 'cabinet-body',
      'knob-1-1': 'drawer-1-1', 'knob-1-2': 'drawer-1-2',
      'knob-2-1': 'drawer-2-1', 'knob-2-2': 'drawer-2-2',
      'knob-3-1': 'drawer-3-1', 'knob-3-2': 'drawer-3-2',
    }],
    ['basic hanger', HANGER_DESIGNS.hangerBasic, ['caster-1-1', 'caster-1-2', 'caster-2-1', 'caster-2-2'], {
      'foot-left': 'caster-1-1', 'foot-right': 'caster-2-1', 'post-left': 'foot-left', 'post-right': 'foot-right',
      'left-extension': 'post-left', 'right-extension': 'post-right', 'hanger-rail': 'left-extension', 'lower-stabilizer': 'post-left',
      'shoe-support-left-front': 'foot-left', 'shoe-support-right-front': 'foot-right',
      'shoe-support-left-back': 'foot-left', 'shoe-support-right-back': 'foot-right',
      'shoe-rail-front': 'shoe-support-left-front', 'shoe-rail-back': 'shoe-support-left-back',
    }],
    ['shelf hanger', HANGER_DESIGNS.hangerShelf, 'base-shelf', {
      'post-left-back': 'base-shelf', 'post-left-front': 'base-shelf',
      'post-right-back': 'base-shelf', 'post-right-front': 'base-shelf',
      'top-shelf': 'post-left-front', 'shoe-shelf': 'post-left-front', 'hanger-rail': 'post-left-front',
    }],
    ['corner hanger', HANGER_DESIGNS.hangerCorner, 'base-x', {
      'base-z': 'base-x', 'post-corner': 'base-x', 'post-right': 'base-x', 'post-front': 'base-z',
      'rail-x': 'post-right', 'rail-z': 'post-front',
    }],
    ['natural valet hanger', HANGER_DESIGNS.hangerNaturalMorsning, ['foot-left', 'foot-right'], {
      'post-left': 'foot-left', 'post-right': 'foot-right', 'lower-bar': 'post-left',
      'mid-bar': 'post-left', 'shoulder-rail': 'post-left', 'connector-left': 'post-left',
      'connector-right': 'post-right', 'front-valet-rail': 'connector-left',
    }],
    ['round side table', SIDE_TABLE_DESIGNS.sideTableRound, [
      'leg-left', 'leg-right', 'leg-back', 'leg-front',
    ], {
      'brace-x': 'leg-left', 'brace-z': 'leg-back', tabletop: 'leg-left',
    }],
    ['low coffee table', SIDE_TABLE_DESIGNS.sideTableCoffee, [
      'leg-left-back', 'leg-right-back', 'leg-left-front', 'leg-right-front',
    ], {
      'magazine-shelf': 'leg-left-front', tabletop: 'leg-left-front',
    }],
    ['storage side table', SIDE_TABLE_DESIGNS.sideTableStorage, 'bottom-panel', {
      'side-left': 'bottom-panel', 'side-right': 'bottom-panel', partition: 'bottom-panel',
      'shelf-wide': 'side-left', 'shelf-narrow': 'partition', 'top-panel': 'side-left',
    }],
    ['midcentury side table', SIDE_TABLE_DESIGNS.sideTableMidcenturyStockholm, 'floor-base', {
      'sculpted-stem': 'floor-base', neck: 'sculpted-stem', 'round-top': 'neck',
    }],
    ['single sofa', SOFA_DESIGNS.sofaSingle, [
      'leg-left-front', 'leg-left-back', 'leg-right-front', 'leg-right-back',
    ], {
      'seat-base': 'leg-left-front', 'seat-cushion': 'seat-base',
      'back-support-left': 'seat-base', 'back-support-right': 'seat-base',
      'back-frame': 'back-support-left',
      'back-cushion': 'back-frame',
    }],
    ['two-seat sofa', SOFA_DESIGNS.sofaTwoSeat, [
      'leg-left-front', 'leg-left-back', 'leg-right-front', 'leg-right-back',
    ], {
      'seat-base': 'leg-left-front', 'arm-left': 'seat-base', 'arm-right': 'seat-base',
      'seat-cushion-left': 'seat-base', 'seat-cushion-right': 'seat-base',
      'back-support-left': 'seat-base', 'back-support-right': 'seat-base',
      'back-frame': 'back-support-left',
      'back-cushion-left': 'back-frame', 'back-cushion-right': 'back-frame',
    }],
    ['modular sofa', SOFA_DESIGNS.sofaModular, ['base-left', 'base-right'], {
      'storage-front-left': 'base-left', 'storage-front-right': 'base-right',
      'seat-cushion-left': 'base-left', 'seat-cushion-right': 'base-right',
      'back-support-left': 'base-left', 'back-support-right': 'base-right',
      'back-frame-left': 'back-support-left', 'back-frame-right': 'back-support-right',
      'back-cushion-left': 'back-frame-left', 'back-cushion-right': 'back-frame-right',
    }],
    ['classic cushion sofa', SOFA_DESIGNS.sofaClassicEktorp, 'floor-skirt', {
      'seat-frame': 'floor-skirt', 'arm-left': 'floor-skirt', 'arm-right': 'floor-skirt',
      'back-frame': 'seat-frame', 'seat-cushion-left': 'seat-frame',
      'seat-cushion-center': 'seat-frame', 'seat-cushion-right': 'seat-frame',
      'back-cushion-left': 'back-frame', 'back-cushion-center': 'back-frame',
      'back-cushion-right': 'back-frame',
    }],
    ['midcentury wood sofa', SOFA_DESIGNS.sofaMidcenturyStockholm, [
      'leg-left-front', 'leg-left-back', 'leg-right-front', 'leg-right-back',
    ], {
      'support-left-front': 'leg-left-front', 'support-left-back': 'leg-left-back',
      'support-right-front': 'leg-right-front', 'support-right-back': 'leg-right-back',
      'base-side-left': 'support-left-front', 'base-side-right': 'support-right-front',
      'seat-rail-front': 'base-side-left', 'seat-rail-back': 'base-side-left',
      'back-upright-left': 'base-side-left', 'back-upright-right': 'base-side-right',
      'back-rail-lower': 'back-upright-left', 'back-rail-upper': 'back-upright-left',
      ...Object.fromEntries([4, 5, 5, 4].flatMap((count, rowIndex) =>
        Array.from({ length: count }, (_, columnIndex) => [
          `mount-${rowIndex + 1}-${columnIndex + 1}`,
          rowIndex === 0 ? 'seat-rail-front' : rowIndex === 1 ? 'seat-rail-back'
            : rowIndex === 2 ? 'back-rail-lower' : 'back-rail-upper',
        ]),
      )),
      ...Object.fromEntries([4, 5, 5, 4].flatMap((count, rowIndex) =>
        Array.from({ length: count }, (_, columnIndex) => [
          `cushion-${rowIndex + 1}-${columnIndex + 1}`,
          `mount-${rowIndex + 1}-${columnIndex + 1}`,
        ]),
      )),
    }],
    ['small TV', TV_DESIGNS.tvSmall, ['foot-left', 'foot-right'], {
      frame: 'foot-left', display: 'frame', 'brand-mark': 'frame',
    }],
    ['medium TV', TV_DESIGNS.tvMedium, ['foot-left', 'foot-right'], {
      frame: 'foot-left', display: 'frame', 'brand-mark': 'frame',
    }],
    ['wide TV', TV_DESIGNS.tvWide, ['foot-left', 'foot-right'], {
      frame: 'foot-left', display: 'frame', 'brand-mark': 'frame',
    }],
    ['natural frame TV', TV_DESIGNS.tvNaturalFrame, ['foot-left', 'foot-right'], {
      'support-left': 'foot-left', 'support-right': 'foot-right', 'rear-panel': 'support-left',
      'bezel-top': 'rear-panel', 'bezel-bottom': 'rear-panel', 'bezel-left': 'rear-panel',
      'bezel-right': 'rear-panel', 'art-display': 'bezel-left',
    }],
    ['low media console', MEDIA_CONSOLE_DESIGNS.mediaConsoleLow, [
      'leg-left-back', 'leg-right-back', 'leg-left-front', 'leg-right-front',
    ], {
      'media-shelf': 'leg-left-back', 'console-top': 'leg-left-back',
    }],
    ['drawer media console', MEDIA_CONSOLE_DESIGNS.mediaConsoleDrawer, 'plinth', {
      'side-left': 'plinth', 'side-right': 'plinth', 'center-divider': 'plinth', 'back-panel': 'plinth',
      'drawer-box-left': 'side-left', 'drawer-box-right': 'side-right',
      'drawer-front-left': 'drawer-box-left', 'drawer-front-right': 'drawer-box-right',
      'pull-left': 'drawer-front-left', 'pull-right': 'drawer-front-right', 'console-top': 'side-left',
    }],
    ['open media console', MEDIA_CONSOLE_DESIGNS.mediaConsoleOpen, [
      'foot-left-back', 'foot-right-back', 'foot-left-front', 'foot-right-front',
    ], {
      'bottom-panel': 'foot-left-back', 'side-left': 'bottom-panel', 'side-right': 'bottom-panel',
      'center-divider': 'bottom-panel', 'back-panel': 'bottom-panel', 'shelf-left': 'side-left',
      'shelf-right': 'side-right', 'top-panel': 'side-left',
    }],
    ['midcentury media console', MEDIA_CONSOLE_DESIGNS.mediaConsoleMidcenturyStockholm, [
      'foot-left-front', 'foot-center-front', 'foot-right-front', 'foot-left-back', 'foot-center-back', 'foot-right-back',
    ], {
      'post-left-front': 'foot-left-front', 'post-center-front': 'foot-center-front', 'post-right-front': 'foot-right-front',
      'post-left-back': 'foot-left-back', 'post-center-back': 'foot-center-back', 'post-right-back': 'foot-right-back',
      'bottom-panel': 'post-left-front', 'middle-shelf': 'post-center-front', 'top-panel': 'post-right-front',
      'side-left': 'bottom-panel', 'side-right': 'bottom-panel', 'center-divider': 'bottom-panel', 'back-panel': 'bottom-panel',
      'drop-door-top-right': 'top-panel', 'drop-door-bottom-left': 'middle-shelf',
      'door-handle-top-right': 'drop-door-top-right', 'door-handle-bottom-left': 'drop-door-bottom-left',
      'front-rail-bottom': 'post-left-front', 'front-rail-middle': 'post-center-front', 'front-rail-top': 'post-right-front',
      'back-rail-bottom': 'post-left-back', 'back-rail-middle': 'post-center-back', 'back-rail-top': 'post-right-back',
    }],
    ['compact multi table', MULTI_TABLE_DESIGNS.multiTableCompact, [
      'leg-left-back', 'leg-right-back', 'leg-left-front', 'leg-right-front',
    ], {
      'brace-back': 'leg-left-back', 'brace-front': 'leg-left-front', tabletop: 'leg-left-front',
    }],
    ['two-seat multi table', MULTI_TABLE_DESIGNS.multiTableTwoSeat, [
      'leg-left-back', 'leg-right-back', 'leg-left-front', 'leg-right-front',
    ], {
      'apron-back': 'leg-left-back', 'apron-front': 'leg-left-front', 'apron-left': 'leg-left-front',
      'apron-right': 'leg-right-front', tabletop: 'leg-left-front',
    }],
    ['storage multi table', MULTI_TABLE_DESIGNS.multiTableStorage, 'cabinet-plinth', {
      'side-left': 'cabinet-plinth', 'divider-left': 'cabinet-plinth',
      'divider-right': 'cabinet-plinth', 'side-right': 'cabinet-plinth',
      'back-panel': 'divider-left', 'left-shelf': 'side-left',
      'appliance-shelf': 'divider-left', 'right-shelf': 'divider-right',
      'left-door-open': 'side-left', 'left-door-handle': 'side-left',
      'drawer-center': 'side-left', 'drawer-right': 'divider-right',
      'pull-center': 'left-shelf', 'pull-right': 'left-shelf', countertop: 'side-left',
    }],
    ['slim partition', PARTITION_SHELF_DESIGNS.partitionShelfSlim, ['foot-left', 'foot-right'], {
      'post-left': 'foot-left', 'post-right': 'foot-right', 'bottom-rail': 'post-left', 'top-rail': 'post-left',
      'slat-1': 'bottom-rail', 'slat-2': 'bottom-rail', 'slat-3': 'bottom-rail', 'slat-4': 'bottom-rail',
      'slat-5': 'bottom-rail', 'slat-6': 'bottom-rail', 'slat-7': 'bottom-rail',
      'panel-1-inner-post': 'foot-left', 'panel-2-inner-post': 'foot-right',
      ...Object.fromEntries(Array.from({ length: 7 }, (_, index) => [`panel-1-slat-${index + 1}`, 'bottom-rail'])),
      ...Object.fromEntries(Array.from({ length: 7 }, (_, index) => [`panel-2-slat-${index + 1}`, 'bottom-rail'])),
      'hinge-1': 'bottom-rail', 'hinge-2': 'bottom-rail',
    }],
    ['translucent partition', PARTITION_SHELF_DESIGNS.partitionShelfTranslucent, ['foot-left', 'foot-right'], {
      'post-left': 'foot-left', 'post-right': 'foot-right', 'bottom-rail': 'post-left',
      'middle-rail': 'panel-center', 'top-rail': 'post-left', 'panel-left': 'bottom-rail',
      'panel-center': 'bottom-rail', 'panel-right': 'bottom-rail',
      'panel-hinge-1': 'bottom-rail', 'panel-hinge-2': 'bottom-rail',
    }],
    ['storage partition shelf', PARTITION_SHELF_DESIGNS.partitionShelfStorage, 'plinth', {
      'side-left': 'plinth', 'side-right': 'plinth', 'center-divider': 'plinth', 'shelf-1': 'side-left',
      'shelf-2': 'side-left', 'shelf-3': 'side-left', 'top-panel': 'side-left',
    }],
    ['KALLAX open partition shelf', PARTITION_SHELF_DESIGNS.partitionShelfKallax, 'bottom-panel', {
      'side-left': 'bottom-panel', 'side-right': 'bottom-panel',
      'vertical-divider-left': 'bottom-panel', 'vertical-divider-center': 'bottom-panel',
      'vertical-divider-right': 'bottom-panel', 'horizontal-divider': 'vertical-divider-left',
      'top-panel': 'side-left',
    }],
    ['round rug', RUG_DESIGNS.rugRound, 'round-base', {
      'round-inset': 'round-base',
    }],
    ['rectangular rug', RUG_DESIGNS.rugRectangular, 'rect-base', {
      'rect-inset': 'rect-base',
    }],
    ['runner rug', RUG_DESIGNS.rugRunner, 'runner-base', {
      'runner-inset': 'runner-base', 'stripe-front': 'runner-base', 'stripe-back': 'runner-base',
    }],
    ['tabletop plant', PLANT_DESIGNS.plantTabletop, 'pot', createProceduralPlantSupportMap(5)],
    ['floor plant', PLANT_DESIGNS.plantFloor, 'pot', createProceduralPlantSupportMap(14)],
    ['corner plant', PLANT_DESIGNS.plantCorner, 'pot', createProceduralPlantSupportMap(9)],
    ['standing mirror', FULL_LENGTH_MIRROR_DESIGNS.mirrorStanding, 'base-foot', {
      'frame-left': 'base-foot', 'frame-right': 'base-foot', 'frame-bottom': 'base-foot',
      'frame-top': 'frame-left', 'mirror-panel': 'frame-left', 'rear-stand': 'base-foot',
      'rear-clothes-rail': 'rear-stand', 'ornament-top': 'frame-top', 'rear-hook-left': 'rear-clothes-rail', 'rear-hook-right': 'rear-clothes-rail',
    }],
    ['wall mirror', FULL_LENGTH_MIRROR_DESIGNS.mirrorWall, 'wall-frame', {
      'wall-mirror-panel': 'wall-frame', 'mounting-bracket-upper': 'wall-frame',
      'mounting-bracket-lower': 'wall-frame',
    }],
    ['storage mirror', FULL_LENGTH_MIRROR_DESIGNS.mirrorStorage, 'bottom-panel', {
      'back-panel': 'bottom-panel', 'side-left': 'bottom-panel', 'center-divider': 'bottom-panel',
      'side-right': 'bottom-panel', 'top-panel': 'side-left', 'storage-shelf-lower': 'center-divider',
      'storage-shelf-upper': 'center-divider', 'storage-mirror-panel': 'side-left',
      'rear-hook-left': 'storage-shelf-upper', 'rear-hook-right': 'storage-shelf-upper',
    }],
    ['classic rounded mirror', FULL_LENGTH_MIRROR_DESIGNS.mirrorClassicRounded, 'base-foot', {
      'rounded-frame': 'base-foot', 'mirror-panel': 'rounded-frame', 'rear-stand': 'rounded-frame',
    }],
    ['table mood lamp', MOOD_LAMP_DESIGNS.lampTable, 'table-base', {
      'table-stem': 'table-base', 'table-bulb': 'table-stem', 'table-shade': 'table-bulb',
    }],
    ['floor mood lamp', MOOD_LAMP_DESIGNS.lampFloor, 'floor-base', {
      'floor-stem': 'floor-base', 'floor-bulb': 'floor-stem', 'floor-shade': 'floor-bulb',
    }],
    ['LED mood lamp', MOOD_LAMP_DESIGNS.lampIndirect, 'led-bottom-pad', {
      'led-wood-base': 'led-bottom-pad', 'led-inner-light': 'led-wood-base',
      'led-diffuser': 'led-inner-light', 'led-top-glow': 'led-diffuser',
    }],
    ['midcentury globe mood lamp', MOOD_LAMP_DESIGNS.lampMidcenturyGlobe, 'globe-base', {
      'globe-neck': 'globe-base', 'globe-light': 'globe-neck', 'globe-diffuser': 'globe-light',
    }],
    ['fabric curtain', CURTAIN_BLIND_DESIGNS.curtainFabric, [
      'curtain-panel-left', 'curtain-panel-right',
    ], {
      'curtain-header': 'curtain-panel-left', 'curtain-rod': 'curtain-header',
    }],
    ['roller blind', CURTAIN_BLIND_DESIGNS.blindRoller, ['roller-panel', 'roller-bottom-rail'], {
      'roller-tube': 'roller-panel', 'roller-bracket-left': 'roller-tube',
      'roller-bracket-right': 'roller-tube', 'roller-pull-cord': 'roller-panel',
      'roller-pull-weight': 'roller-pull-cord',
    }],
    ['wood blind', CURTAIN_BLIND_DESIGNS.blindWood, ['wood-bottom-rail', 'wood-cord-left', 'wood-cord-right'], {
      'wood-slat-1': 'wood-cord-left', 'wood-slat-2': 'wood-cord-left',
      'wood-slat-3': 'wood-cord-left', 'wood-slat-4': 'wood-cord-left',
      'wood-slat-5': 'wood-cord-left', 'wood-slat-6': 'wood-cord-left',
      'wood-slat-7': 'wood-cord-left', 'wood-slat-8': 'wood-cord-left',
      'wood-slat-9': 'wood-cord-left', 'wood-headrail': 'wood-cord-left',
    }],
    ['blackout curtain', CURTAIN_BLIND_DESIGNS.curtainBlackout, [
      'blackout-panel-left', 'blackout-panel-right',
    ], {
      'blackout-header': 'blackout-panel-left', 'blackout-rod': 'blackout-header',
    }],
  ] as const)('keeps every added part in the %s physically supported', (label, design, groundPartIdOrIds, supportMap) => {
    void label;
    const groundPartIds: readonly string[] = typeof groundPartIdOrIds === 'string'
      ? [groundPartIdOrIds]
      : groundPartIdOrIds;
    expect(Object.keys(supportMap).sort()).toEqual(
      design.parts.map(({ id }) => id).filter((id) => !groundPartIds.includes(id)).sort(),
    );

    for (const [partId, supportId] of Object.entries(supportMap)) {
      expect(
        touches(getPart(design, partId), getPart(design, supportId)),
        `${design.id}: ${partId} must touch ${supportId}`,
      ).toBe(true);
    }

    for (const groundPartId of groundPartIds) {
      expect(extent(getPart(design, groundPartId), 1)[0]).toBe(0);
    }
  });
});
