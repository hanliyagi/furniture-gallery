import type { CatalogDesignEntry } from '../three/catalogAudit';

export const WEB_GEOMETRIES = Object.freeze(['box', 'roundedBox', 'cylinder', 'extrudedPolygon'] as const);
export const KNOWN_GEOMETRIES = Object.freeze([
  ...WEB_GEOMETRIES, 'ellipsoid', 'tube', 'leaf', 'planter', 'curtain',
] as const);
export const KNOWN_STYLE_TAGS = Object.freeze(['minimal', 'natural', 'modern', 'classic', 'midcentury'] as const);
export const KNOWN_LIFESTYLE_TAGS = Object.freeze(['REST', 'WORK_STUDY', 'STORAGE', 'HOBBY_LEISURE'] as const);

export type Compatibility = 'compatible' | 'incompatible' | 'invalid';

export interface CatalogManifestItem {
  readonly variantId: string;
  readonly name: string;
  readonly furnitureType: string;
  readonly dimensions: { readonly width: number; readonly depth: number; readonly height: number };
  readonly styleTags: readonly string[];
  readonly lifestyleTags: readonly string[];
  readonly materialIds: readonly string[];
  readonly geometryTypes: readonly string[];
  readonly partCount: number;
  readonly compatibility: Compatibility;
  readonly errors: readonly string[];
  readonly warnings: readonly string[];
  readonly unsupportedGeometry: readonly { readonly geometry: string; readonly partIds: readonly string[]; readonly count: number }[];
}

export interface CatalogReport {
  readonly totalVariants: number;
  readonly compatibleVariants: number;
  readonly incompatibleVariants: number;
  readonly invalidVariants: number;
  readonly countsByFurnitureType: Readonly<Record<string, number>>;
  readonly countsByStyleTag: Readonly<Record<string, number>>;
  readonly countsByLifestyleTag: Readonly<Record<string, number>>;
  readonly countsByGeometry: Readonly<Record<string, number>>;
  readonly countsByMaterial: Readonly<Record<string, number>>;
  readonly unsupportedGeometryVariants: readonly Pick<CatalogManifestItem, 'variantId' | 'unsupportedGeometry'>[];
  readonly validationErrors: readonly { readonly variantId: string; readonly errors: readonly string[] }[];
  readonly validationWarnings: readonly { readonly variantId: string; readonly warnings: readonly string[] }[];
  readonly missingTagsByFurnitureType: Readonly<Record<string, { readonly styleTags: readonly string[]; readonly lifestyleTags: readonly string[] }>>;
  readonly unusedMaterials: readonly string[];
  readonly duplicateCandidates: readonly (readonly string[])[];
  readonly materialIssues: readonly string[];
}

export interface CatalogBundle {
  readonly manifest: readonly CatalogManifestItem[];
  readonly report: CatalogReport;
}

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asArray(value: unknown): readonly unknown[] { return Array.isArray(value) ? value : []; }
function increment(target: Record<string, number>, values: readonly string[]): void {
  for (const value of values) target[value] = (target[value] ?? 0) + 1;
}
function sortedCounts(counts: Record<string, number>): Readonly<Record<string, number>> {
  return Object.freeze(Object.fromEntries(Object.entries(counts).sort(([a], [b]) => a.localeCompare(b))));
}
function sorted(values: Iterable<string>): readonly string[] { return Object.freeze([...values].sort()); }
function finiteNumber(value: unknown): value is number { return typeof value === 'number' && Number.isFinite(value); }
function validColor(value: unknown): boolean { return typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value); }

function materialValidation(materials: unknown): readonly string[] {
  if (!isRecord(materials)) return Object.freeze(['materials.json: materials must be an object']);
  const issues: string[] = [];
  for (const [id, raw] of Object.entries(materials)) {
    if (!isRecord(raw)) { issues.push(`material ${id}: definition must be an object`); continue; }
    if (!validColor(raw.color)) issues.push(`material ${id}: color must be #RRGGBB`);
    for (const key of ['roughness', 'metalness', 'opacity'] as const) {
      if (raw[key] !== undefined && (!finiteNumber(raw[key]) || raw[key] < 0 || raw[key] > 1)) issues.push(`material ${id}: ${key} must be 0..1`);
    }
    if (raw.emissive !== undefined && !validColor(raw.emissive)) issues.push(`material ${id}: emissive must be #RRGGBB`);
  }
  return Object.freeze(issues.sort());
}

function hasNonFinite(value: unknown): boolean {
  if (typeof value === 'number') return !Number.isFinite(value);
  if (Array.isArray(value)) return value.some(hasNonFinite);
  return isRecord(value) && Object.values(value).some(hasNonFinite);
}

function validateEntry(entry: unknown, materialIds: ReadonlySet<string>): CatalogManifestItem {
  const source = isRecord(entry) ? entry : {};
  const downloadable = isRecord(source.downloadable) ? source.downloadable : source;
  const design = isRecord(source.design) ? source.design : downloadable;
  const parts = asArray(design.parts);
  const variantId = typeof downloadable.variantId === 'string' ? downloadable.variantId : '';
  const errors: string[] = [];
  const warnings: string[] = [];
  if (!variantId) errors.push('variantId is required');
  if (design.schemaVersion !== '1.0') errors.push('schemaVersion must be 1.0');
  if (design.units !== 'meter') errors.push('units must be meter');
  const coordinateSystem = isRecord(design.coordinateSystem) ? design.coordinateSystem : {};
  const axes = isRecord(coordinateSystem.axes) ? coordinateSystem.axes : {};
  if (coordinateSystem.origin !== 'floor-center') errors.push('origin must be floor-center');
  if (axes.x !== 'right' || axes.y !== 'up' || axes.z !== 'front') errors.push('axes must be +X right, +Y up, +Z front');
  if (design.rotationUnit !== 'radian') errors.push('rotationUnit must be radian');
  const rawDimensions = isRecord(design.dimensions) ? design.dimensions : {};
  const dimensions = {
    width: finiteNumber(rawDimensions.width) ? rawDimensions.width : 0,
    depth: finiteNumber(rawDimensions.depth) ? rawDimensions.depth : 0,
    height: finiteNumber(rawDimensions.height) ? rawDimensions.height : 0,
  };
  for (const [key, value] of Object.entries(dimensions)) if (value <= 0) errors.push(`dimensions.${key} must be greater than 0`);
  if (parts.length === 0) errors.push('parts must not be empty');
  if (hasNonFinite(design)) errors.push('NaN or Infinity is not allowed');
  const partIds = new Set<string>();
  const actualMaterials = new Set<string>();
  const geometryParts = new Map<string, string[]>();
  for (const [index, rawPart] of parts.entries()) {
    const part = isRecord(rawPart) ? rawPart : {};
    const id = typeof part.id === 'string' ? part.id : '';
    if (!id) errors.push(`part ${index}: id is required`);
    else if (partIds.has(id)) errors.push(`duplicate part ID: ${id}`);
    else partIds.add(id);
    const material = typeof part.material === 'string' ? part.material : '';
    if (!materialIds.has(material)) errors.push(`unknown material reference: ${material || `part ${id || index}`}`);
    else actualMaterials.add(material);
    const geometry = typeof part.geometry === 'string' ? part.geometry : '';
    if (!geometry) errors.push(`part ${id || index}: geometry is required`);
    else geometryParts.set(geometry, [...(geometryParts.get(geometry) ?? []), id || String(index)]);
  }
  const declaredMaterials = new Set(asArray(design.materials).filter((value): value is string => typeof value === 'string'));
  for (const material of actualMaterials) if (!declaredMaterials.has(material)) errors.push(`part material missing from materials list: ${material}`);
  for (const material of declaredMaterials) if (!materialIds.has(material)) errors.push(`unknown declared material: ${material}`);
  for (const material of declaredMaterials) if (!actualMaterials.has(material)) warnings.push(`declared material is unused by parts: ${material}`);
  const styleTags = asArray(downloadable.styleTags).filter((value): value is string => typeof value === 'string');
  const lifestyleTags = asArray(downloadable.lifestyleTags).filter((value): value is string => typeof value === 'string');
  for (const tag of styleTags) if (!KNOWN_STYLE_TAGS.includes(tag as never)) warnings.push(`unknown styleTag: ${tag}`);
  for (const tag of lifestyleTags) if (!KNOWN_LIFESTYLE_TAGS.includes(tag as never)) warnings.push(`unknown lifestyleTag: ${tag}`);
  const unsupportedGeometry = [...geometryParts.entries()]
    .filter(([geometry]) => !WEB_GEOMETRIES.includes(geometry as never))
    .map(([geometry, ids]) => Object.freeze({ geometry, partIds: Object.freeze([...ids]), count: ids.length }))
    .sort((a, b) => a.geometry.localeCompare(b.geometry));
  const compatibility: Compatibility = errors.length > 0 ? 'invalid' : unsupportedGeometry.length > 0 ? 'incompatible' : 'compatible';
  return Object.freeze({
    variantId: variantId || '(missing variantId)',
    name: typeof design.name === 'string' ? design.name : '',
    furnitureType: typeof design.furnitureType === 'string' ? design.furnitureType : '',
    dimensions: Object.freeze(dimensions), styleTags: Object.freeze(styleTags), lifestyleTags: Object.freeze(lifestyleTags),
    materialIds: sorted(actualMaterials), geometryTypes: sorted(geometryParts.keys()), partCount: parts.length, compatibility,
    errors: Object.freeze(errors.sort()), warnings: Object.freeze(warnings.sort()), unsupportedGeometry: Object.freeze(unsupportedGeometry),
  });
}

/** Pure, deterministic validation. `generatedAt` intentionally belongs only to CLI output. */
export function buildCatalogBundle(entries: readonly unknown[], materialCatalog: unknown): CatalogBundle {
  const materialRoot = isRecord(materialCatalog) && isRecord(materialCatalog.materials) ? materialCatalog.materials : {};
  const materialIds = new Set(Object.keys(materialRoot));
  const manifest = entries.map((entry) => validateEntry(entry, materialIds));
  const duplicateIds = new Set<string>();
  for (const item of manifest) if (manifest.filter((candidate) => candidate.variantId === item.variantId).length > 1) duplicateIds.add(item.variantId);
  const withDuplicateErrors = manifest.map((item) => duplicateIds.has(item.variantId)
    ? Object.freeze({ ...item, compatibility: 'invalid' as const, errors: Object.freeze([...item.errors, `duplicate variantId: ${item.variantId}`].sort()) })
    : item);
  const byType: Record<string, number> = {}; const byStyle: Record<string, number> = {}; const byLifestyle: Record<string, number> = {};
  const byGeometry: Record<string, number> = {}; const byMaterial: Record<string, number> = {}; const tagsByType = new Map<string, { styles: Set<string>; lifestyles: Set<string> }>();
  const signatures = new Map<string, string[]>();
  for (const item of withDuplicateErrors) {
    increment(byType, [item.furnitureType || '(missing)']); increment(byStyle, item.styleTags); increment(byLifestyle, item.lifestyleTags);
    increment(byGeometry, item.geometryTypes); increment(byMaterial, item.materialIds);
    const tags = tagsByType.get(item.furnitureType) ?? { styles: new Set<string>(), lifestyles: new Set<string>() };
    item.styleTags.forEach((tag) => tags.styles.add(tag)); item.lifestyleTags.forEach((tag) => tags.lifestyles.add(tag)); tagsByType.set(item.furnitureType, tags);
    const signature = `${item.furnitureType}|${item.dimensions.width}|${item.dimensions.depth}|${item.dimensions.height}|${[...item.styleTags].sort().join(',')}|${[...item.lifestyleTags].sort().join(',')}`;
    signatures.set(signature, [...(signatures.get(signature) ?? []), item.variantId]);
  }
  const missingTagsByFurnitureType = Object.fromEntries([...tagsByType.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([type, tags]) => [type, Object.freeze({
    styleTags: Object.freeze(KNOWN_STYLE_TAGS.filter((tag) => !tags.styles.has(tag))),
    lifestyleTags: Object.freeze(KNOWN_LIFESTYLE_TAGS.filter((tag) => !tags.lifestyles.has(tag))),
  })]));
  const materialIssues = materialValidation(materialRoot);
  const report: CatalogReport = Object.freeze({
    totalVariants: withDuplicateErrors.length,
    compatibleVariants: withDuplicateErrors.filter((item) => item.compatibility === 'compatible').length,
    incompatibleVariants: withDuplicateErrors.filter((item) => item.compatibility === 'incompatible').length,
    invalidVariants: withDuplicateErrors.filter((item) => item.compatibility === 'invalid').length,
    countsByFurnitureType: sortedCounts(byType), countsByStyleTag: sortedCounts(byStyle), countsByLifestyleTag: sortedCounts(byLifestyle),
    countsByGeometry: sortedCounts(byGeometry), countsByMaterial: sortedCounts(byMaterial),
    unsupportedGeometryVariants: Object.freeze(withDuplicateErrors.filter((item) => item.unsupportedGeometry.length > 0).map(({ variantId, unsupportedGeometry }) => Object.freeze({ variantId, unsupportedGeometry }))),
    validationErrors: Object.freeze(withDuplicateErrors.filter((item) => item.errors.length > 0).map(({ variantId, errors }) => Object.freeze({ variantId, errors }))),
    validationWarnings: Object.freeze(withDuplicateErrors.filter((item) => item.warnings.length > 0).map(({ variantId, warnings }) => Object.freeze({ variantId, warnings }))),
    missingTagsByFurnitureType: Object.freeze(missingTagsByFurnitureType), unusedMaterials: Object.freeze([...materialIds].filter((id) => !byMaterial[id]).sort()),
    duplicateCandidates: Object.freeze([...signatures.values()].filter((ids) => ids.length > 1).map((ids) => Object.freeze(ids.sort()))), materialIssues,
  });
  return Object.freeze({ manifest: Object.freeze(withDuplicateErrors), report });
}

export function withGeneratedAt<T extends object>(value: T, generatedAt: string): T & { readonly generatedAt: string } {
  return Object.freeze({ ...value, generatedAt });
}

export function getBundleForCatalog(entries: readonly CatalogDesignEntry[], materialCatalog: unknown): CatalogBundle {
  return buildCatalogBundle(entries, materialCatalog);
}
