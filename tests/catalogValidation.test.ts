import { describe, expect, it } from 'vitest';
import MATERIAL_CATALOG from '../src/three/materials.json';
import { getCatalogDesigns } from '../src/utils/downloadFurnitureJson';
import { buildCatalogBundle } from '../src/catalog/catalogValidation';

describe('furniture catalog validation', () => {
  it('traverses the complete catalog deterministically and reports tag/material coverage', () => {
    const first = buildCatalogBundle(getCatalogDesigns(), MATERIAL_CATALOG);
    const second = buildCatalogBundle(getCatalogDesigns(), MATERIAL_CATALOG);
    expect(first).toEqual(second);
    expect(first.manifest).toHaveLength(getCatalogDesigns().length);
    expect(new Set(first.manifest.map((item) => item.variantId)).size).toBe(first.manifest.length);
    expect(first.report.countsByMaterial).not.toEqual({});
    expect(first.report.countsByStyleTag).not.toEqual({});
  });

  it('classifies unsupported geometry without replacing or crashing it', () => {
    const result = buildCatalogBundle([{
      downloadable: { variantId: 'tube-variant', styleTags: ['minimal'], lifestyleTags: ['REST'] },
      design: {
        schemaVersion: '1.0', units: 'meter', rotationUnit: 'radian', name: 'Tube', furnitureType: '테스트',
        coordinateSystem: { origin: 'floor-center', axes: { x: 'right', y: 'up', z: 'front' } },
        dimensions: { width: 1, depth: 1, height: 1 }, materials: ['wood'],
        parts: [{ id: 'stem', geometry: 'tube', material: 'wood', position: [0, 0, 0] }],
      },
    }], MATERIAL_CATALOG);
    expect(result.manifest[0]!.compatibility).toBe('incompatible');
    expect(result.manifest[0]!.unsupportedGeometry[0]).toMatchObject({ geometry: 'tube', partIds: ['stem'], count: 1 });
  });

  it('continues after an invalid item and reports duplicate IDs, part IDs and material references', () => {
    const valid = getCatalogDesigns()[0]!;
    const malformed = {
      downloadable: { variantId: valid.downloadable.variantId, styleTags: ['unknown'], lifestyleTags: ['UNKNOWN'] },
      design: { schemaVersion: 'wrong', units: 'cm', rotationUnit: 'degree', dimensions: { width: 0, depth: 1, height: 1 }, materials: ['missing'], parts: [
        { id: 'same', geometry: 'box', material: 'missing', position: [0, 0, 0] },
        { id: 'same', geometry: 'box', material: 'missing', position: [0, 0, 0] },
      ] },
    };
    const result = buildCatalogBundle([malformed, valid], MATERIAL_CATALOG);
    expect(result.manifest).toHaveLength(2);
    expect(result.report.invalidVariants).toBe(2);
    expect(result.manifest[0]!.errors).toEqual(expect.arrayContaining(['duplicate part ID: same', 'unknown material reference: missing']));
    expect(result.manifest[0]!.warnings).toEqual(expect.arrayContaining(['unknown styleTag: unknown', 'unknown lifestyleTag: UNKNOWN']));
  });
});
