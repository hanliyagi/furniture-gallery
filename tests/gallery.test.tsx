import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { FurnitureCard } from '../src/components/FurnitureCard';
import { FurnitureGrid } from '../src/components/FurnitureGrid';
import { FALLBACK_FURNITURE } from '../src/data/fallbackFurniture';
import { DESK_DESIGNS } from '../src/three/deskDesigns';
import type { DownloadableFurnitureDesign } from '../src/three/designTypes';
import { MODEL_KEYS } from '../src/types/furniture';
import { serializeFurnitureDesign } from '../src/utils/downloadFurnitureJson';

const scenePreviewMock = vi.hoisted(() =>
  vi.fn((props: { modelKey: string; className?: string }) => {
    void props;
    return null;
  }),
);

vi.mock('../src/three/ScenePreview', () => ({ ScenePreview: scenePreviewMock }));

beforeEach(() => {
  scenePreviewMock.mockClear();
  vi.stubGlobal('URL', {
    ...URL,
    createObjectURL: vi.fn(() => 'blob:desk-design'),
    revokeObjectURL: vi.fn(),
  });
  vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined);
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('desk furniture cards', () => {
  it('renders every furniture variant without tag UI', () => {
    render(<FurnitureGrid items={FALLBACK_FURNITURE} />);

    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(MODEL_KEYS.length);
    expect(cards.map((card) => within(card).getByRole('heading').textContent)).toEqual([
      '컴팩트 책상', '수납 결합 책상', '코너 책상',
      '로우 플랫폼 침대', '수납형 침대', '패브릭 헤드 침대',
      '컴팩트 소파베드', '접이식 소파베드', '데이베드형 소파베드',
      '서랍형 협탁', '오픈형 협탁', '원형 테이블 협탁',
      '기본형 책상 의자', '팔걸이형 책상 의자', '컴팩트 회전형 책상 의자',
      '낮은 책장', '높은 책장', '양면 오픈 선반',
      '기본형 모니터', '울트라와이드 모니터', '듀얼 모니터',
      '여닫이형 옷장', '슬라이딩형 옷장', '오픈형 옷장',
      '낮은 와이드형 서랍장', '세로형 서랍장', '협탁 겸용 서랍장',
      '기본 스탠드형 행거', '선반 결합형 행거', '코너형 행거',
      '1인용 소파', '2인용 소파', '모듈형 소파',
      '원형 사이드 테이블', '낮은 커피 테이블', '수납형 사이드 테이블',
      '소형 TV', '중형 TV', '와이드형 TV',
      '낮은 콘솔형 TV장', '서랍형 미디어 콘솔', '오픈 선반형 미디어 콘솔',
      '1인 컴팩트 다용도 테이블', '2인용 다용도 테이블', '수납 결합 다용도 테이블',
      '슬림 파티션', '반투명 파티션', '수납 결합 양면 선반',
      '원형 러그', '직사각형 러그', '러너형 러그',
      '소형 테이블 화분', '중형 바닥 화분', '대형 코너 화분',
      '스탠드형 전신거울', '벽걸이형 전신거울', '수납 결합 전신거울',
      '테이블 무드등', '스탠드 무드등', 'LED 무드등',
      '패브릭 커튼', '롤 블라인드', '우드 블라인드',
      '미드센추리 글라스 책상', '미드센추리 터쿼이즈 침대', '미드센추리 오렌지 소파베드',
      '클래식 버튼 패브릭 침대', '책상 수납 로프트 침대', '클래식 3서랍 소파베드',
      '클래식 옐로 협탁', '미드센추리 레드 플라스틱 협탁',
      '클래식 우드 책상 의자', '게이밍 책상 의자',
      '클래식 유리도어 책장', '미드센추리 블루 메탈 선반',
      '오디세이 게이밍 모니터', '내추럴 슬라이딩 오픈 옷장', '클래식 미러 옷장', '클래식 6단 서랍장',
      '내추럴 대나무 발렛 행거', '클래식 쿠션 소파', '미드센추리 마시멜로 소파',
      '미드센추리 투명 플라스틱 테이블', '내추럴 우드 프레임 TV', '미드센추리 골든 옐로 TV장',
      '클래식 게이트레그 다용도 테이블', '오픈 수납 파티션 선반', '미드센추리 기하학 러그', '미드센추리 레드 화분',
      '내추럴 와이드 전신거울', '미드센추리 글로브 무드등', '암막 플리츠 커튼',
      '미드센추리 쉘 책상 의자',
    ]);
    expect(screen.queryByText(/#컴팩트/)).not.toBeInTheDocument();
    expect(screen.getByText('서랍장 · 낮은 와이드형')).toBeVisible();
    expect(screen.getByText('행거 · 기본 스탠드형')).toBeVisible();
    expect(screen.getByText('소파 · 1인형')).toBeVisible();
    expect(screen.getByText('사이드 테이블 · 원형 사이드형')).toBeVisible();
    expect(screen.getByText('TV · 소형형')).toBeVisible();
    expect(screen.getByText('TV장/미디어 콘솔 · 낮은 콘솔형')).toBeVisible();
    expect(screen.getByText('다용도 테이블 · 1인 컴팩트형')).toBeVisible();
    expect(screen.getByText('파티션·양면 선반 · 슬림 파티션')).toBeVisible();
    expect(screen.getByText('러그 · 원형')).toBeVisible();
    expect(screen.getByText('화분 · 소형 테이블형')).toBeVisible();
    expect(screen.getByText('전신거울 · 스탠드형')).toBeVisible();
    expect(screen.getByText('무드등 · 테이블 램프형')).toBeVisible();
    expect(screen.getByText('커튼·블라인드 · 패브릭 커튼')).toBeVisible();
    expect(scenePreviewMock.mock.calls.map(([props]) => props.modelKey)).toEqual([
      'deskCompact', 'deskStorage', 'deskCorner',
      'bedLowPlatform', 'bedStorage', 'bedFabricHeadboard',
      'sofaBedCompact', 'sofaBedFolding', 'sofaBedDaybed',
      'nightstandDrawer', 'nightstandOpen', 'nightstandRound',
      'chairBasic', 'chairArmrest', 'chairCompactSwivel',
      'bookshelfLow', 'bookshelfHigh', 'bookshelfDoubleOpen',
      'monitorBasic', 'monitorUltrawide', 'monitorDual',
      'wardrobeHinged', 'wardrobeSliding', 'wardrobeOpen',
      'drawerChestLowWide', 'drawerChestVertical', 'drawerChestBedside',
      'hangerBasic', 'hangerShelf', 'hangerCorner',
      'sofaSingle', 'sofaTwoSeat', 'sofaModular',
      'sideTableRound', 'sideTableCoffee', 'sideTableStorage',
      'tvSmall', 'tvMedium', 'tvWide',
      'mediaConsoleLow', 'mediaConsoleDrawer', 'mediaConsoleOpen',
      'multiTableCompact', 'multiTableTwoSeat', 'multiTableStorage',
      'partitionShelfSlim', 'partitionShelfTranslucent', 'partitionShelfStorage',
      'rugRound', 'rugRectangular', 'rugRunner',
      'plantTabletop', 'plantFloor', 'plantCorner',
      'mirrorStanding', 'mirrorWall', 'mirrorStorage',
      'lampTable', 'lampFloor', 'lampIndirect',
      'curtainFabric', 'blindRoller', 'blindWood',
      'deskMidcenturyGlass', 'bedMidcenturyTeal', 'sofaBedMidcenturyOrange',
      'bedClassicIdanaes', 'bedLoftDesk', 'sofaBedClassicStorage',
      'nightstandClassicGullaberg', 'nightstandMidcenturyTrolley',
      'chairClassicTonstad', 'chairGamingMatchspel',
      'bookshelfClassicHavsta', 'bookshelfMidcenturyStockholm',
      'monitorGamingOdyssey', 'wardrobeNaturalNordkisa', 'wardrobeClassicGullaberg', 'drawerChestClassicGullaberg',
      'hangerNaturalMorsning', 'sofaClassicEktorp', 'sofaMidcenturyStockholm',
      'sideTableMidcenturyStockholm', 'tvNaturalFrame', 'mediaConsoleMidcenturyStockholm',
      'multiTableGateleg', 'partitionShelfKallax', 'rugGeometric', 'plantMidcentury',
      'mirrorClassicRounded', 'lampMidcenturyGlobe', 'curtainBlackout',
      'chairMidcenturyShell',
    ]);
  });

  it('downloads the clicked design as a named JSON file', async () => {
    const user = userEvent.setup();
    const item = FALLBACK_FURNITURE[1]!;
    render(<FurnitureCard item={item} />);

    await user.click(screen.getByRole('button', { name: '수납 결합 책상 JSON 다운로드' }));

    expect(URL.createObjectURL).toHaveBeenCalledOnce();
    expect(HTMLAnchorElement.prototype.click).toHaveBeenCalledOnce();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:desk-design');
  });

  it('serializes the exact render definition with dimensions, materials, and parts', () => {
    const json = JSON.parse(serializeFurnitureDesign('deskCorner')) as DownloadableFurnitureDesign;
    expect(json.variantId).toBe('desk-corner');
    expect(json).not.toHaveProperty('id');
    expect(json).not.toHaveProperty('category');
    expect(json.furnitureTypeCode).toBe('DESK');
    expect(json.styleTags).toEqual(['minimal', 'modern']);
    expect(json.lifestyleTags).toEqual(['WORK_STUDY', 'STORAGE', 'HOBBY_LEISURE']);
    expect(json.variant).toBe('코너형');
    expect(json.purchaseUrl).toBe('https://www.ikea.com/kr/ko/p/micke-corner-workstation-white-20354284/');
    expect(json.dimensions).toEqual(DESK_DESIGNS.deskCorner.dimensions);
    expect(json.parts).toHaveLength(DESK_DESIGNS.deskCorner.parts.length);
    expect(json.parts.map(({ id }) => id)).toContain('corner-desktop');
    expect(json.parts.map(({ id }) => id)).toContain('magnetic-board');

    const bedJson = JSON.parse(serializeFurnitureDesign('bedStorage')) as DownloadableFurnitureDesign;
    expect(bedJson.variantId).toBe('bed-storage');
    expect(bedJson.lifestyleTags).toEqual(['REST', 'STORAGE']);
    expect(bedJson.parts.map(({ id }) => id)).toContain('drawer-left');

    expect(JSON.parse(serializeFurnitureDesign('deskCompact'))).toMatchObject({
      schemaVersion: '1.0',
      styleTags: ['minimal', 'classic'],
      lifestyleTags: ['WORK_STUDY'],
    });
    expect(JSON.parse(serializeFurnitureDesign('deskStorage'))).toMatchObject({
      schemaVersion: '1.0',
      styleTags: ['natural', 'classic'],
      lifestyleTags: ['WORK_STUDY', 'STORAGE'],
    });

    for (const modelKey of ['deskMidcenturyGlass', 'bedMidcenturyTeal', 'sofaBedMidcenturyOrange'] as const) {
      const midcenturyJson = JSON.parse(serializeFurnitureDesign(modelKey)) as DownloadableFurnitureDesign;
      expect(midcenturyJson.styleTags).toEqual(['midcentury', 'modern']);
    }

    expect(JSON.parse(serializeFurnitureDesign('bedClassicIdanaes'))).toMatchObject({
      styleTags: ['classic', 'natural'], lifestyleTags: ['REST'],
    });
    expect(JSON.parse(serializeFurnitureDesign('bedLoftDesk'))).toMatchObject({
      styleTags: ['modern', 'minimal'], lifestyleTags: ['REST', 'WORK_STUDY', 'STORAGE'],
    });
    expect(JSON.parse(serializeFurnitureDesign('sofaBedClassicStorage'))).toMatchObject({
      styleTags: ['classic', 'natural'], lifestyleTags: ['REST', 'STORAGE', 'HOBBY_LEISURE'],
    });
    expect(JSON.parse(serializeFurnitureDesign('nightstandClassicGullaberg'))).toMatchObject({
      styleTags: ['classic', 'natural'], lifestyleTags: ['REST', 'STORAGE'],
    });
    expect(JSON.parse(serializeFurnitureDesign('nightstandMidcenturyTrolley'))).toMatchObject({
      styleTags: ['midcentury', 'modern'], lifestyleTags: ['REST', 'STORAGE'],
    });
    expect(JSON.parse(serializeFurnitureDesign('chairClassicTonstad'))).toMatchObject({
      styleTags: ['classic', 'natural'], lifestyleTags: ['WORK_STUDY'],
    });
    expect(JSON.parse(serializeFurnitureDesign('chairGamingMatchspel'))).toMatchObject({
      styleTags: ['modern', 'minimal'], lifestyleTags: ['WORK_STUDY', 'HOBBY_LEISURE'],
    });
    expect(JSON.parse(serializeFurnitureDesign('bookshelfClassicHavsta'))).toMatchObject({
      styleTags: ['classic', 'natural'], lifestyleTags: ['STORAGE', 'REST', 'HOBBY_LEISURE'],
    });
    expect(JSON.parse(serializeFurnitureDesign('bookshelfMidcenturyStockholm'))).toMatchObject({
      styleTags: ['midcentury', 'modern'], lifestyleTags: ['STORAGE', 'HOBBY_LEISURE'],
    });
    expect(JSON.parse(serializeFurnitureDesign('monitorGamingOdyssey'))).toMatchObject({
      styleTags: ['modern', 'minimal'], lifestyleTags: ['WORK_STUDY', 'HOBBY_LEISURE'],
    });
    expect(JSON.parse(serializeFurnitureDesign('wardrobeNaturalNordkisa'))).toMatchObject({
      styleTags: ['natural', 'minimal'], lifestyleTags: ['STORAGE'],
    });
    expect(JSON.parse(serializeFurnitureDesign('wardrobeClassicGullaberg'))).toMatchObject({
      styleTags: ['classic', 'natural'], lifestyleTags: ['STORAGE'],
    });
    expect(JSON.parse(serializeFurnitureDesign('drawerChestClassicGullaberg'))).toMatchObject({
      styleTags: ['classic', 'natural'], lifestyleTags: ['STORAGE'],
    });

    for (const modelKey of MODEL_KEYS) {
      const downloadable = JSON.parse(serializeFurnitureDesign(modelKey)) as DownloadableFurnitureDesign;
      expect(downloadable.variantId).toBe(FALLBACK_FURNITURE.find((item) => item.modelKey === modelKey)?.id);
      expect(downloadable.schemaVersion).toBe('1.0');
      expect(downloadable).toEqual(expect.objectContaining({
        variantId: expect.any(String),
        name: expect.any(String),
        furnitureType: expect.any(String),
        furnitureTypeCode: expect.any(String),
        variant: expect.any(String),
        units: 'meter',
        coordinateSystem: expect.any(Object),
        rotationUnit: 'radian',
        dimensions: expect.any(Object),
        materials: expect.any(Array),
        parts: expect.any(Array),
        styleTags: expect.any(Array),
        lifestyleTags: expect.any(Array),
        purchaseUrl: expect.any(String),
      }));
      expect(downloadable.parts.every(({ id }) => id.length > 0)).toBe(true);
      expect(downloadable.styleTags.length).toBeGreaterThanOrEqual(1);
      expect(downloadable.styleTags.length).toBeLessThanOrEqual(2);
      expect(downloadable.lifestyleTags.length).toBeGreaterThanOrEqual(1);
      expect(downloadable.lifestyleTags.length).toBeLessThanOrEqual(3);
      expect(downloadable.purchaseUrl?.startsWith('https://')).toBe(true);
    }
  });
});
