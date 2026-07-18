import type { ModelKey } from '../types/furniture';
import { MODEL_KEYS } from '../types/furniture';
import { PURCHASE_URLS } from '../data/purchaseUrls';
import { CATALOG_CHANGELOG } from '../data/catalogChangelog';
import MATERIAL_CATALOG from '../three/materials.json';
import { auditCatalog, formatCatalogAuditMarkdown } from '../three/catalogAudit';
import { BED_DESIGNS } from '../three/bedDesigns';
import { BOOKSHELF_DESIGNS } from '../three/bookshelfDesigns';
import { CHAIR_DESIGNS } from '../three/chairDesigns';
import { DESK_DESIGNS } from '../three/deskDesigns';
import { DRAWER_CHEST_DESIGNS } from '../three/drawerChestDesigns';
import type {
  DownloadableFurnitureDesign,
  FurnitureDesign,
  FurnitureLifestyleTag,
  FurnitureStyleTag,
} from '../three/designTypes';
import { NIGHTSTAND_DESIGNS } from '../three/nightstandDesigns';
import { MONITOR_DESIGNS } from '../three/monitorDesigns';
import { SOFA_BED_DESIGNS } from '../three/sofaBedDesigns';
import { SIDE_TABLE_DESIGNS } from '../three/sideTableDesigns';
import { SOFA_DESIGNS } from '../three/sofaDesigns';
import { WARDROBE_DESIGNS } from '../three/wardrobeDesigns';
import { HANGER_DESIGNS } from '../three/hangerDesigns';
import { MEDIA_CONSOLE_DESIGNS } from '../three/mediaConsoleDesigns';
import { TV_DESIGNS } from '../three/tvDesigns';
import { MULTI_TABLE_DESIGNS } from '../three/multiTableDesigns';
import { PARTITION_SHELF_DESIGNS } from '../three/partitionShelfDesigns';
import { RUG_DESIGNS } from '../three/rugDesigns';
import { PLANT_DESIGNS } from '../three/plantDesigns';
import { FULL_LENGTH_MIRROR_DESIGNS } from '../three/fullLengthMirrorDesigns';
import { MOOD_LAMP_DESIGNS } from '../three/moodLampDesigns';
import { CURTAIN_BLIND_DESIGNS } from '../three/curtainBlindDesigns';

const FURNITURE_DESIGNS: Readonly<Record<ModelKey, FurnitureDesign>> = Object.freeze({
  ...DESK_DESIGNS,
  ...BED_DESIGNS,
  ...SOFA_BED_DESIGNS,
  ...NIGHTSTAND_DESIGNS,
  ...CHAIR_DESIGNS,
  ...BOOKSHELF_DESIGNS,
  ...MONITOR_DESIGNS,
  ...WARDROBE_DESIGNS,
  ...DRAWER_CHEST_DESIGNS,
  ...HANGER_DESIGNS,
  ...SOFA_DESIGNS,
  ...SIDE_TABLE_DESIGNS,
  ...TV_DESIGNS,
  ...MEDIA_CONSOLE_DESIGNS,
  ...MULTI_TABLE_DESIGNS,
  ...PARTITION_SHELF_DESIGNS,
  ...RUG_DESIGNS,
  ...PLANT_DESIGNS,
  ...FULL_LENGTH_MIRROR_DESIGNS,
  ...MOOD_LAMP_DESIGNS,
  ...CURTAIN_BLIND_DESIGNS,
});

/**
 * Returns the source design alongside the exported JSON contract.  Keeping this
 * in one place lets catalog QA inspect exactly the same registry that powers
 * the gallery and the downloadable archive.
 */
export function getCatalogDesigns(): readonly Readonly<{
  modelKey: ModelKey;
  design: FurnitureDesign;
  downloadable: DownloadableFurnitureDesign;
}>[] {
  return Object.freeze(MODEL_KEYS.map((modelKey) => Object.freeze({
    modelKey,
    design: FURNITURE_DESIGNS[modelKey],
    downloadable: getDownloadableDesign(modelKey),
  })));
}

const TYPE_METADATA: Readonly<Record<string, {
  readonly code: string;
  readonly styleTags: readonly FurnitureStyleTag[];
  readonly lifestyleTags: readonly FurnitureLifestyleTag[];
}>> = Object.freeze({
  책상: { code: 'DESK', styleTags: ['minimal', 'modern'], lifestyleTags: ['WORK_STUDY'] },
  침대: { code: 'BED', styleTags: ['natural', 'minimal'], lifestyleTags: ['REST'] },
  소파베드: { code: 'SOFA_BED', styleTags: ['modern', 'minimal'], lifestyleTags: ['REST'] },
  협탁: { code: 'NIGHTSTAND', styleTags: ['minimal', 'natural'], lifestyleTags: ['REST', 'STORAGE'] },
  '책상 의자': { code: 'DESK_CHAIR', styleTags: ['modern', 'minimal'], lifestyleTags: ['WORK_STUDY'] },
  '책장/오픈 선반': { code: 'BOOKSHELF', styleTags: ['minimal', 'modern'], lifestyleTags: ['STORAGE', 'WORK_STUDY'] },
  모니터: { code: 'MONITOR', styleTags: ['modern', 'minimal'], lifestyleTags: ['WORK_STUDY'] },
  옷장: { code: 'WARDROBE', styleTags: ['minimal', 'modern'], lifestyleTags: ['STORAGE'] },
  서랍장: { code: 'DRAWER_CHEST', styleTags: ['minimal', 'modern'], lifestyleTags: ['STORAGE'] },
  행거: { code: 'HANGER', styleTags: ['minimal', 'modern'], lifestyleTags: ['STORAGE'] },
  소파: { code: 'SOFA', styleTags: ['modern', 'natural'], lifestyleTags: ['REST', 'HOBBY_LEISURE'] },
  '사이드 테이블': { code: 'SIDE_TABLE', styleTags: ['minimal', 'natural'], lifestyleTags: ['REST', 'HOBBY_LEISURE'] },
  TV: { code: 'TV', styleTags: ['modern', 'minimal'], lifestyleTags: ['HOBBY_LEISURE'] },
  'TV장/미디어 콘솔': { code: 'MEDIA_CONSOLE', styleTags: ['minimal', 'modern'], lifestyleTags: ['STORAGE', 'HOBBY_LEISURE'] },
  '다용도 테이블': { code: 'MULTI_TABLE', styleTags: ['minimal', 'modern'], lifestyleTags: ['WORK_STUDY', 'HOBBY_LEISURE'] },
  '파티션·양면 선반': { code: 'PARTITION_SHELF', styleTags: ['modern', 'minimal'], lifestyleTags: ['STORAGE', 'WORK_STUDY'] },
  러그: { code: 'RUG', styleTags: ['natural', 'minimal'], lifestyleTags: ['REST'] },
  화분: { code: 'PLANT', styleTags: ['natural', 'minimal'], lifestyleTags: ['REST'] },
  전신거울: { code: 'FULL_LENGTH_MIRROR', styleTags: ['modern', 'minimal'], lifestyleTags: ['STORAGE'] },
  무드등: { code: 'MOOD_LAMP', styleTags: ['modern', 'minimal'], lifestyleTags: ['REST'] },
  '커튼·블라인드': { code: 'CURTAIN_BLIND', styleTags: ['minimal', 'natural'], lifestyleTags: ['REST'] },
});

const DESIGN_METADATA_OVERRIDES: Readonly<Partial<Record<ModelKey, {
  readonly styleTags: readonly FurnitureStyleTag[];
  readonly lifestyleTags: readonly FurnitureLifestyleTag[];
}>>> = Object.freeze({
  deskCompact: {
    styleTags: Object.freeze(['minimal', 'classic'] as const),
    lifestyleTags: Object.freeze(['WORK_STUDY'] as const),
  },
  deskStorage: {
    styleTags: Object.freeze(['natural', 'classic'] as const),
    lifestyleTags: Object.freeze(['WORK_STUDY', 'STORAGE'] as const),
  },
  deskCorner: {
    styleTags: Object.freeze(['minimal', 'modern'] as const),
    lifestyleTags: Object.freeze(['WORK_STUDY', 'STORAGE', 'HOBBY_LEISURE'] as const),
  },
  multiTableGateleg: {
    styleTags: Object.freeze(['classic', 'natural'] as const),
    lifestyleTags: Object.freeze(['STORAGE', 'HOBBY_LEISURE'] as const),
  },
  partitionShelfKallax: {
    styleTags: Object.freeze(['minimal', 'natural'] as const),
    lifestyleTags: Object.freeze(['STORAGE', 'HOBBY_LEISURE'] as const),
  },
  rugGeometric: {
    styleTags: Object.freeze(['midcentury', 'modern'] as const),
    lifestyleTags: Object.freeze(['REST', 'HOBBY_LEISURE'] as const),
  },
  plantMidcentury: {
    styleTags: Object.freeze(['midcentury', 'modern'] as const),
    lifestyleTags: Object.freeze(['REST', 'HOBBY_LEISURE'] as const),
  },
  bedMidcenturyTeal: {
    styleTags: Object.freeze(['midcentury', 'modern'] as const),
    lifestyleTags: Object.freeze(['REST'] as const),
  },
  bedClassicIdanaes: {
    styleTags: Object.freeze(['classic', 'natural'] as const),
    lifestyleTags: Object.freeze(['REST'] as const),
  },
  bedLoftDesk: {
    styleTags: Object.freeze(['modern', 'minimal'] as const),
    lifestyleTags: Object.freeze(['REST', 'WORK_STUDY', 'STORAGE'] as const),
  },
  sofaBedClassicStorage: {
    styleTags: Object.freeze(['classic', 'natural'] as const),
    lifestyleTags: Object.freeze(['REST', 'STORAGE', 'HOBBY_LEISURE'] as const),
  },
  sofaBedMidcenturyOrange: {
    styleTags: Object.freeze(['midcentury', 'modern'] as const),
    lifestyleTags: Object.freeze(['REST', 'HOBBY_LEISURE'] as const),
  },
  nightstandClassicGullaberg: {
    styleTags: Object.freeze(['classic', 'natural'] as const),
    lifestyleTags: Object.freeze(['REST', 'STORAGE'] as const),
  },
  nightstandMidcenturyTrolley: {
    styleTags: Object.freeze(['midcentury', 'modern'] as const),
    lifestyleTags: Object.freeze(['REST', 'STORAGE'] as const),
  },
  chairClassicTonstad: {
    styleTags: Object.freeze(['classic', 'natural'] as const),
    lifestyleTags: Object.freeze(['WORK_STUDY'] as const),
  },
  chairGamingMatchspel: {
    styleTags: Object.freeze(['modern', 'minimal'] as const),
    lifestyleTags: Object.freeze(['WORK_STUDY', 'HOBBY_LEISURE'] as const),
  },
  chairMidcenturyShell: {
    styleTags: Object.freeze(['midcentury', 'modern'] as const),
    lifestyleTags: Object.freeze(['WORK_STUDY', 'HOBBY_LEISURE'] as const),
  },
  bookshelfClassicHavsta: {
    styleTags: Object.freeze(['classic', 'natural'] as const),
    lifestyleTags: Object.freeze(['STORAGE', 'REST', 'HOBBY_LEISURE'] as const),
  },
  bookshelfMidcenturyStockholm: {
    styleTags: Object.freeze(['midcentury', 'modern'] as const),
    lifestyleTags: Object.freeze(['STORAGE', 'HOBBY_LEISURE'] as const),
  },
  monitorGamingOdyssey: {
    styleTags: Object.freeze(['modern', 'minimal'] as const),
    lifestyleTags: Object.freeze(['WORK_STUDY', 'HOBBY_LEISURE'] as const),
  },
  wardrobeNaturalNordkisa: {
    styleTags: Object.freeze(['natural', 'minimal'] as const),
    lifestyleTags: Object.freeze(['STORAGE'] as const),
  },
  wardrobeClassicGullaberg: {
    styleTags: Object.freeze(['classic', 'natural'] as const),
    lifestyleTags: Object.freeze(['STORAGE'] as const),
  },
  drawerChestClassicGullaberg: {
    styleTags: Object.freeze(['classic', 'natural'] as const),
    lifestyleTags: Object.freeze(['STORAGE'] as const),
  },
  hangerNaturalMorsning: {
    styleTags: Object.freeze(['natural', 'minimal'] as const),
    lifestyleTags: Object.freeze(['STORAGE'] as const),
  },
  sofaClassicEktorp: {
    styleTags: Object.freeze(['classic', 'natural'] as const),
    lifestyleTags: Object.freeze(['REST', 'HOBBY_LEISURE'] as const),
  },
  sofaMidcenturyStockholm: {
    styleTags: Object.freeze(['midcentury', 'modern'] as const),
    lifestyleTags: Object.freeze(['REST', 'HOBBY_LEISURE'] as const),
  },
  sideTableMidcenturyStockholm: {
    styleTags: Object.freeze(['midcentury', 'modern'] as const),
    lifestyleTags: Object.freeze(['REST', 'HOBBY_LEISURE'] as const),
  },
  tvNaturalFrame: {
    styleTags: Object.freeze(['modern', 'natural'] as const),
    lifestyleTags: Object.freeze(['HOBBY_LEISURE'] as const),
  },
  mediaConsoleMidcenturyStockholm: {
    styleTags: Object.freeze(['midcentury', 'modern'] as const),
    lifestyleTags: Object.freeze(['STORAGE', 'HOBBY_LEISURE'] as const),
  },
  mirrorClassicRounded: {
    styleTags: Object.freeze(['classic', 'natural'] as const),
    lifestyleTags: Object.freeze(['REST', 'HOBBY_LEISURE'] as const),
  },
  lampMidcenturyGlobe: {
    styleTags: Object.freeze(['midcentury', 'modern'] as const),
    lifestyleTags: Object.freeze(['REST', 'HOBBY_LEISURE'] as const),
  },
  curtainBlackout: {
    styleTags: Object.freeze(['modern', 'minimal'] as const),
    lifestyleTags: Object.freeze(['REST', 'HOBBY_LEISURE'] as const),
  },
});

export function getDownloadableDesign(modelKey: ModelKey): DownloadableFurnitureDesign {
  const design = FURNITURE_DESIGNS[modelKey];
  const metadata = TYPE_METADATA[design.furnitureType];
  if (!metadata) throw new Error(`Unknown furniture type: ${design.furnitureType}`);
  const override = DESIGN_METADATA_OVERRIDES[modelKey];
  const { id, category: _category, purchaseUrl, ...downloadFields } = design;
  void _category;
  const lifestyleTags = override?.lifestyleTags
    ?? (design.variant.includes('수납') && !metadata.lifestyleTags.includes('STORAGE')
      ? [...metadata.lifestyleTags.slice(0, 1), 'STORAGE'] as const
      : metadata.lifestyleTags);
  const styleTags = override?.styleTags
    ?? (design.variant.includes('미드센추리')
      ? ['midcentury', 'modern'] as const
      : metadata.styleTags);

  return Object.freeze({
    ...downloadFields,
    variantId: id,
    furnitureTypeCode: metadata.code,
    styleTags: Object.freeze([...styleTags]),
    lifestyleTags: Object.freeze([...lifestyleTags]),
    purchaseUrl: purchaseUrl ?? PURCHASE_URLS[modelKey] ?? null,
  });
}

export function serializeFurnitureDesign(modelKey: ModelKey): string {
  return `${JSON.stringify(getDownloadableDesign(modelKey), null, 2)}\n`;
}

export function downloadFurnitureJson(modelKey: ModelKey): void {
  const design = getDownloadableDesign(modelKey);
  const blob = new Blob([serializeFurnitureDesign(modelKey)], {
    type: 'application/json;charset=utf-8',
  });
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = objectUrl;
  link.download = `${design.variantId}.json`;
  link.hidden = true;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(objectUrl);
}

interface ArchiveEntry {
  readonly name: string;
  readonly content: string;
}

const CRC32_TABLE = new Uint32Array(256).map((_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) value = (value >>> 1) ^ (value & 1 ? 0xedb88320 : 0);
  return value >>> 0;
});

function crc32(content: Uint8Array): number {
  let value = 0xffffffff;
  for (const byte of content) value = CRC32_TABLE[(value ^ byte) & 0xff]! ^ (value >>> 8);
  return (value ^ 0xffffffff) >>> 0;
}

function writeUint16(target: Uint8Array, offset: number, value: number): void {
  new DataView(target.buffer).setUint16(offset, value, true);
}

function writeUint32(target: Uint8Array, offset: number, value: number): void {
  new DataView(target.buffer).setUint32(offset, value, true);
}

function createStoredZip(entries: readonly ArchiveEntry[]): Uint8Array<ArrayBuffer> {
  const encoder = new TextEncoder();
  const files = entries.map(({ name, content }) => ({
    name: encoder.encode(name),
    content: encoder.encode(content),
  }));
  const localSize = files.reduce((total, file) => total + 30 + file.name.length + file.content.length, 0);
  const centralSize = files.reduce((total, file) => total + 46 + file.name.length, 0);
  const archive = new Uint8Array(localSize + centralSize + 22);
  let offset = 0;
  const localOffsets: number[] = [];

  for (const file of files) {
    const checksum = crc32(file.content);
    localOffsets.push(offset);
    writeUint32(archive, offset, 0x04034b50);
    writeUint16(archive, offset + 4, 20);
    writeUint16(archive, offset + 6, 0);
    writeUint16(archive, offset + 8, 0);
    writeUint16(archive, offset + 10, 0);
    writeUint16(archive, offset + 12, 0);
    writeUint32(archive, offset + 14, checksum);
    writeUint32(archive, offset + 18, file.content.length);
    writeUint32(archive, offset + 22, file.content.length);
    writeUint16(archive, offset + 26, file.name.length);
    writeUint16(archive, offset + 28, 0);
    archive.set(file.name, offset + 30);
    archive.set(file.content, offset + 30 + file.name.length);
    offset += 30 + file.name.length + file.content.length;
  }

  const centralOffset = offset;
  for (const [index, file] of files.entries()) {
    const checksum = crc32(file.content);
    writeUint32(archive, offset, 0x02014b50);
    writeUint16(archive, offset + 4, 20);
    writeUint16(archive, offset + 6, 20);
    writeUint16(archive, offset + 8, 0);
    writeUint16(archive, offset + 10, 0);
    writeUint16(archive, offset + 12, 0);
    writeUint16(archive, offset + 14, 0);
    writeUint32(archive, offset + 16, checksum);
    writeUint32(archive, offset + 20, file.content.length);
    writeUint32(archive, offset + 24, file.content.length);
    writeUint16(archive, offset + 28, file.name.length);
    writeUint16(archive, offset + 30, 0);
    writeUint16(archive, offset + 32, 0);
    writeUint16(archive, offset + 34, 0);
    writeUint16(archive, offset + 36, 0);
    writeUint32(archive, offset + 38, 0);
    writeUint32(archive, offset + 42, localOffsets[index]!);
    archive.set(file.name, offset + 46);
    offset += 46 + file.name.length;
  }

  writeUint32(archive, offset, 0x06054b50);
  writeUint16(archive, offset + 4, 0);
  writeUint16(archive, offset + 6, 0);
  writeUint16(archive, offset + 8, files.length);
  writeUint16(archive, offset + 10, files.length);
  writeUint32(archive, offset + 12, centralSize);
  writeUint32(archive, offset + 16, centralOffset);
  writeUint16(archive, offset + 20, 0);

  return archive;
}

export function getFurnitureArchiveEntries(): readonly ArchiveEntry[] {
  return Object.freeze([
    ...MODEL_KEYS.map((modelKey) => {
      const design = getDownloadableDesign(modelKey);
      return Object.freeze({ name: `furniture/${design.variantId}.json`, content: serializeFurnitureDesign(modelKey) });
    }),
    Object.freeze({ name: 'materials.json', content: `${JSON.stringify(MATERIAL_CATALOG, null, 2)}\n` }),
    Object.freeze({ name: 'CHANGELOG.md', content: CATALOG_CHANGELOG }),
    Object.freeze({ name: 'CATALOG_AUDIT.md', content: formatCatalogAuditMarkdown(auditCatalog(getCatalogDesigns())) }),
  ]);
}

export function createFurnitureArchive(): Blob {
  const archive = createStoredZip(getFurnitureArchiveEntries());
  return new Blob([archive.buffer], { type: 'application/zip' });
}

export function downloadAllFurnitureJson(): void {
  const objectUrl = URL.createObjectURL(createFurnitureArchive());
  const link = document.createElement('a');

  link.href = objectUrl;
  link.download = 'furniture-gallery-json.zip';
  link.hidden = true;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(objectUrl);
}
