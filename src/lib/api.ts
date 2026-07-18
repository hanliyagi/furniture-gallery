import { MODEL_KEYS } from '../types/furniture';
import type { FurnitureItem } from '../types/furniture';

const REQUIRED_ITEM_COUNT = MODEL_KEYS.length;
const FURNITURE_CATEGORIES: ReadonlySet<string> = new Set([
  '책상', '침대', '소파베드', '협탁', '책상 의자', '책장/오픈 선반', '모니터', '옷장', '서랍장', '행거', '소파', '사이드 테이블', 'TV', 'TV장/미디어 콘솔', '다용도 테이블', '파티션·양면 선반', '러그', '화분', '전신거울', '무드등', '커튼·블라인드',
]);
const FURNITURE_MODEL_KEYS: ReadonlySet<string> = new Set(MODEL_KEYS);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === 'string');
}

function isPurchaseUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

export function isFurnitureItem(value: unknown): value is FurnitureItem {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.index === 'number' &&
    Number.isFinite(value.index) &&
    typeof value.group === 'string' &&
    typeof value.name === 'string' &&
    typeof value.category === 'string' &&
    FURNITURE_CATEGORIES.has(value.category) &&
    isStringArray(value.variants) &&
    isStringArray(value.tags) &&
    typeof value.modelKey === 'string' &&
    FURNITURE_MODEL_KEYS.has(value.modelKey) &&
    typeof value.description === 'string' &&
    typeof value.implementationNote === 'string' &&
    (value.purchaseUrl === undefined || isPurchaseUrl(value.purchaseUrl))
  );
}

export function parseFurnitureResponse(value: unknown): FurnitureItem[] {
  if (!isRecord(value) || !Array.isArray(value.items)) {
    throw new Error('Furniture API response must contain an items array');
  }

  if (value.items.length !== REQUIRED_ITEM_COUNT) {
    throw new Error(`Furniture API must return exactly ${REQUIRED_ITEM_COUNT} items`);
  }

  const items: FurnitureItem[] = [];
  const ids = new Set<string>();

  for (const [index, item] of value.items.entries()) {
    if (!isFurnitureItem(item)) {
      throw new Error(`Furniture API returned an invalid item at index ${index}`);
    }
    if (ids.has(item.id)) {
      throw new Error(`Furniture API returned duplicate furniture id: ${item.id}`);
    }

    ids.add(item.id);
    items.push(item);
  }

  return items;
}

export async function fetchFurniture(
  baseUrl: string,
  signal?: AbortSignal,
  fetchImpl: typeof fetch = fetch,
): Promise<FurnitureItem[]> {
  const normalizedBaseUrl = baseUrl.replace(/\/+$/, '');
  const response = await fetchImpl(`${normalizedBaseUrl}/api/furniture`, { signal });

  if (!response.ok) {
    throw new Error(`Furniture API returned ${response.status}`);
  }

  return parseFurnitureResponse(await response.json());
}
