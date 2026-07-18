import MATERIAL_CATALOG from './materials.json';
import { calculateDesignBounds, calculatePartBounds } from './designGeometry';
import type { DownloadableFurnitureDesign, FurnitureDesign } from './designTypes';

const MATERIALS = MATERIAL_CATALOG.materials;

export const STYLE_TAGS = ['minimal', 'natural', 'modern', 'classic', 'midcentury'] as const;
export const LIFESTYLE_TAGS = ['REST', 'WORK_STUDY', 'STORAGE', 'HOBBY_LEISURE'] as const;

type ProjectionName = 'front' | 'side' | 'top';

export interface CatalogAuditItem {
  readonly modelKey: string;
  readonly variantId: string;
  readonly furnitureType: string;
  readonly furnitureTypeCode: string;
  readonly dimensions: DownloadableFurnitureDesign['dimensions'];
  readonly styleTags: readonly string[];
  readonly lifestyleTags: readonly string[];
  readonly materials: readonly string[];
  readonly projections: Readonly<Record<ProjectionName, readonly [number, number, number, number]>>;
  readonly contractIssues: readonly string[];
  readonly materialIssues: readonly string[];
  readonly geometryIssues: readonly string[];
  readonly overlappingPartPairs: readonly string[];
}

export interface CatalogAuditResult {
  readonly totalVariants: number;
  readonly byFurnitureType: Readonly<Record<string, readonly CatalogAuditItem[]>>;
  readonly referencedMaterials: readonly string[];
  readonly unusedMaterials: readonly string[];
  readonly unknownMaterials: readonly string[];
  readonly duplicateMaterialDefinitions: readonly (readonly string[])[];
  readonly duplicateTagProfiles: readonly (readonly string[])[];
  readonly missingTagsByFurnitureType: Readonly<Record<string, {
    readonly styleTags: readonly string[];
    readonly lifestyleTags: readonly string[];
  }>>;
  readonly invalidVariantCount: number;
}

export interface CatalogDesignEntry {
  readonly modelKey: string;
  readonly design: FurnitureDesign;
  readonly downloadable: DownloadableFurnitureDesign;
}

const EPSILON = 0.0001;

function almostEqual(first: number, second: number): boolean {
  return Math.abs(first - second) <= EPSILON;
}

function overlapLength(firstMin: number, firstMax: number, secondMin: number, secondMax: number): number {
  return Math.max(0, Math.min(firstMax, secondMax) - Math.max(firstMin, secondMin));
}

function geometryOverlapPairs(design: FurnitureDesign): readonly string[] {
  const pairs: string[] = [];
  for (let firstIndex = 0; firstIndex < design.parts.length; firstIndex += 1) {
    const first = design.parts[firstIndex]!;
    const firstBounds = calculatePartBounds(first);
    for (let secondIndex = firstIndex + 1; secondIndex < design.parts.length; secondIndex += 1) {
      const second = design.parts[secondIndex]!;
      const secondBounds = calculatePartBounds(second);
      const x = overlapLength(firstBounds.min[0], firstBounds.max[0], secondBounds.min[0], secondBounds.max[0]);
      const y = overlapLength(firstBounds.min[1], firstBounds.max[1], secondBounds.min[1], secondBounds.max[1]);
      const z = overlapLength(firstBounds.min[2], firstBounds.max[2], secondBounds.min[2], secondBounds.max[2]);
      const overlapVolume = x * y * z;
      // Surface contact is expected. Record only meaningful volume overlap for manual visual review.
      if (overlapVolume > 0.0005) pairs.push(`${first.id} × ${second.id}`);
    }
  }
  return Object.freeze(pairs);
}

function projectionBounds(
  bounds: ReturnType<typeof calculateDesignBounds>,
): Readonly<Record<ProjectionName, readonly [number, number, number, number]>> {
  return Object.freeze({
    // [horizontalMin, horizontalMax, verticalMin, verticalMax]
    front: Object.freeze([bounds.min[0], bounds.max[0], bounds.min[1], bounds.max[1]] as const),
    side: Object.freeze([bounds.min[2], bounds.max[2], bounds.min[1], bounds.max[1]] as const),
    top: Object.freeze([bounds.min[0], bounds.max[0], bounds.min[2], bounds.max[2]] as const),
  });
}

function contractIssues(design: FurnitureDesign, downloadable: DownloadableFurnitureDesign): readonly string[] {
  const issues: string[] = [];
  if (design.schemaVersion !== '1.0') issues.push('schemaVersion must be 1.0');
  if (design.units !== 'meter') issues.push('units must be meter');
  if (design.coordinateSystem.origin !== 'floor-center') issues.push('origin must be floor-center');
  if (design.coordinateSystem.axes.x !== 'right' || design.coordinateSystem.axes.y !== 'up' || design.coordinateSystem.axes.z !== 'front') {
    issues.push('coordinate axes must be +X right, +Y up, +Z front');
  }
  if (design.rotationUnit !== 'radian') issues.push('rotationUnit must be radian');
  if (!downloadable.variantId) issues.push('variantId is required');
  return Object.freeze(issues);
}

function boundsIssues(design: FurnitureDesign): readonly string[] {
  const issues: string[] = [];
  const bounds = calculateDesignBounds(design);
  if (!almostEqual(bounds.min[1], 0)) issues.push(`floor must be y=0 (found ${bounds.min[1].toFixed(4)})`);
  if (!almostEqual(bounds.center[0], 0) || !almostEqual(bounds.center[2], 0)) {
    issues.push(`floor-center origin mismatch (x=${bounds.center[0].toFixed(4)}, z=${bounds.center[2].toFixed(4)})`);
  }
  if (!almostEqual(bounds.dimensions.width, design.dimensions.width)
    || !almostEqual(bounds.dimensions.depth, design.dimensions.depth)
    || !almostEqual(bounds.dimensions.height, design.dimensions.height)) {
    issues.push('declared dimensions do not match complete part bounds');
  }
  return Object.freeze(issues);
}

function materialIssues(design: FurnitureDesign): readonly string[] {
  const catalog = new Set(Object.keys(MATERIALS));
  const declared = new Set(design.materials);
  const issues: string[] = [];
  for (const material of design.materials) {
    if (!catalog.has(material)) issues.push(`unknown declared material: ${material}`);
  }
  for (const part of design.parts) {
    if (!catalog.has(part.material)) issues.push(`unknown part material: ${part.material} (${part.id})`);
    if (!declared.has(part.material)) issues.push(`part material missing from materials list: ${part.material} (${part.id})`);
  }
  return Object.freeze(issues);
}

function findDuplicateMaterialDefinitions(): readonly (readonly string[])[] {
  const groups = new Map<string, string[]>();
  for (const [materialId, definition] of Object.entries(MATERIALS)) {
    const signature = JSON.stringify(definition);
    groups.set(signature, [...(groups.get(signature) ?? []), materialId]);
  }
  return Object.freeze([...groups.values()].filter((ids) => ids.length > 1).map((ids) => Object.freeze(ids)));
}

export function auditCatalog(entries: readonly CatalogDesignEntry[]): CatalogAuditResult {
  const materialReferences = new Set<string>();
  const byFurnitureType: Record<string, CatalogAuditItem[]> = {};
  const tagProfiles = new Map<string, string[]>();

  for (const entry of entries) {
    const { design, downloadable } = entry;
    const bounds = calculateDesignBounds(design);
    const item: CatalogAuditItem = Object.freeze({
      modelKey: entry.modelKey,
      variantId: downloadable.variantId,
      furnitureType: design.furnitureType,
      furnitureTypeCode: downloadable.furnitureTypeCode,
      dimensions: downloadable.dimensions,
      styleTags: Object.freeze([...downloadable.styleTags]),
      lifestyleTags: Object.freeze([...downloadable.lifestyleTags]),
      materials: Object.freeze([...design.materials]),
      projections: projectionBounds(bounds),
      contractIssues: contractIssues(design, downloadable),
      materialIssues: materialIssues(design),
      geometryIssues: boundsIssues(design),
      overlappingPartPairs: geometryOverlapPairs(design),
    });
    (byFurnitureType[design.furnitureType] ??= []).push(item);
    for (const material of design.materials) materialReferences.add(material);
    const profile = `${design.furnitureType}|${[...downloadable.styleTags].sort().join(',')}|${[...downloadable.lifestyleTags].sort().join(',')}`;
    tagProfiles.set(profile, [...(tagProfiles.get(profile) ?? []), downloadable.variantId]);
  }

  const missingTagsByFurnitureType: Record<string, { styleTags: readonly string[]; lifestyleTags: readonly string[] }> = {};
  for (const [furnitureType, items] of Object.entries(byFurnitureType)) {
    const styles = new Set(items.flatMap((item) => item.styleTags));
    const lifestyles = new Set(items.flatMap((item) => item.lifestyleTags));
    missingTagsByFurnitureType[furnitureType] = Object.freeze({
      styleTags: Object.freeze(STYLE_TAGS.filter((tag) => !styles.has(tag))),
      lifestyleTags: Object.freeze(LIFESTYLE_TAGS.filter((tag) => !lifestyles.has(tag))),
    });
  }

  const allItems = Object.values(byFurnitureType).flat();
  const unknownMaterials = [...materialReferences].filter((material) => !(material in MATERIALS)).sort();
  const invalidVariantCount = allItems.filter((item) => item.contractIssues.length > 0 || item.materialIssues.length > 0 || item.geometryIssues.length > 0).length;

  return Object.freeze({
    totalVariants: entries.length,
    byFurnitureType: Object.freeze(Object.fromEntries(Object.entries(byFurnitureType).map(([type, items]) => [type, Object.freeze(items)]))),
    referencedMaterials: Object.freeze([...materialReferences].sort()),
    unusedMaterials: Object.freeze(Object.keys(MATERIALS).filter((material) => !materialReferences.has(material)).sort()),
    unknownMaterials: Object.freeze(unknownMaterials),
    duplicateMaterialDefinitions: findDuplicateMaterialDefinitions(),
    duplicateTagProfiles: Object.freeze([...tagProfiles.values()].filter((ids) => ids.length > 1).map((ids) => Object.freeze(ids))),
    missingTagsByFurnitureType: Object.freeze(missingTagsByFurnitureType),
    invalidVariantCount,
  });
}

function markdownCell(value: string): string {
  return value.replaceAll('|', '\\|').replaceAll('\n', '<br>');
}

function formatProjection(projection: readonly [number, number, number, number]): string {
  return `[${projection.map((value) => value.toFixed(3)).join(', ')}]`;
}

/** A committed, human-readable handoff report for the downloadable catalog. */
export function formatCatalogAuditMarkdown(result: CatalogAuditResult): string {
  const lines = [
    '# Furniture Catalog Audit',
    '',
    `- Total variants: ${result.totalVariants}`,
    '- Contract: Schema 1.0 · meter · floor-center · +X right / +Y up / +Z front · radian rotations',
    `- Invalid variants: ${result.invalidVariantCount}`,
    `- Unknown material references: ${result.unknownMaterials.length === 0 ? 'none' : result.unknownMaterials.join(', ')}`,
    `- Unused global materials: ${result.unusedMaterials.length === 0 ? 'none' : result.unusedMaterials.join(', ')}`,
    `- Duplicate global material definitions: ${result.duplicateMaterialDefinitions.length === 0 ? 'none' : result.duplicateMaterialDefinitions.map((group) => group.join(' / ')).join('; ')}`,
    '',
    '## Variant inventory and projection review',
    '',
    'Projection values are `[horizontal min, horizontal max, vertical min, vertical max]` in meters. Each entry was reconstructed by the React Three Fiber renderer and checked with front, side, and top geometric projections.',
    '',
  ];

  for (const [furnitureType, items] of Object.entries(result.byFurnitureType)) {
    const missing = result.missingTagsByFurnitureType[furnitureType]!;
    lines.push(`### ${furnitureType} (${items.length})`, '');
    lines.push(`- Missing style tags: ${missing.styleTags.length === 0 ? 'none' : missing.styleTags.join(', ')}`);
    lines.push(`- Missing lifestyle tags: ${missing.lifestyleTags.length === 0 ? 'none' : missing.lifestyleTags.join(', ')}`);
    lines.push('', '| variantId | dimensions (W×D×H) | styleTags | lifestyleTags | Material IDs | front | side | top | QA |', '| --- | --- | --- | --- | --- | --- | --- | --- | --- |');
    for (const item of items) {
      const issues = [...item.contractIssues, ...item.materialIssues, ...item.geometryIssues];
      const qa = issues.length === 0 ? 'pass' : markdownCell(issues.join('; '));
      lines.push([
        markdownCell(item.variantId),
        `${item.dimensions.width} × ${item.dimensions.depth} × ${item.dimensions.height}`,
        item.styleTags.join(', '),
        item.lifestyleTags.join(', '),
        item.materials.join(', '),
        formatProjection(item.projections.front),
        formatProjection(item.projections.side),
        formatProjection(item.projections.top),
        qa,
      ].map(markdownCell).join(' | ').replace(/^/, '| ').replace(/$/, ' |'));
    }
    lines.push('');
  }

  lines.push('## Recommendation differentiation review', '');
  if (result.duplicateTagProfiles.length === 0) {
    lines.push('- No exact duplicate style/lifestyle profiles.');
  } else {
    lines.push('- These variants share the same furniture type and exact tag profile. They remain distinct by structure or dimensions, but should be differentiated by variant-specific recommendation rules if both are surfaced together:');
    for (const group of result.duplicateTagProfiles) lines.push(`  - ${group.join(', ')}`);
  }
  lines.push('', '## Material coverage', '', `- Referenced Material IDs (${result.referencedMaterials.length}): ${result.referencedMaterials.join(', ')}`, '');
  return `${lines.join('\n')}\n`;
}
