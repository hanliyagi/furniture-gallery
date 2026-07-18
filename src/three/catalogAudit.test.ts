import { describe, expect, it, vi } from 'vitest';
import { create } from '@react-three/test-renderer';
import { createElement } from 'react';
import { getCatalogDesigns, getFurnitureArchiveEntries } from '../utils/downloadFurnitureJson';
import { auditCatalog } from './catalogAudit';
import { FurnitureDesignModel } from './furniture/FurnitureDesignModel';

describe('furniture catalog audit', () => {
  it('keeps every downloadable variant within the Schema 1.0 geometry and material contract', () => {
    const result = auditCatalog(getCatalogDesigns());
    const items = Object.values(result.byFurnitureType).flat();

    expect(result.totalVariants).toBeGreaterThan(0);
    expect(result.unknownMaterials).toEqual([]);
    expect(items.flatMap((item) => item.contractIssues)).toEqual([]);
    expect(items.flatMap((item) => item.materialIssues)).toEqual([]);
    expect(items.flatMap((item) => item.geometryIssues)).toEqual([]);
  });

  it('reconstructs every catalog model through front, side, and top R3F views', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    try {
      const views = [
        { name: 'front', rotation: [0, 0, 0] as const },
        { name: 'side', rotation: [0, Math.PI / 2, 0] as const },
        { name: 'top', rotation: [Math.PI / 2, 0, 0] as const },
      ];

      for (const { design } of getCatalogDesigns()) {
        for (const view of views) {
          const renderer = await create(createElement(
            'group',
            { rotation: view.rotation, name: `${design.id}-${view.name}` },
            createElement(FurnitureDesignModel, { design }),
          ));
          expect(renderer.scene.children).toHaveLength(1);
          expect(renderer.scene.children[0]!.children).toHaveLength(1);
          expect(renderer.scene.children[0]!.children[0]!.children).toHaveLength(design.parts.length);
          await renderer.unmount();
        }
      }
    } finally {
      warn.mockRestore();
      error.mockRestore();
    }
  });

  it('ships every Variant with materials, audit, and changelog in the archive', () => {
    const entries = getFurnitureArchiveEntries();
    expect(entries).toHaveLength(getCatalogDesigns().length + 3);
    expect(entries.map((entry) => entry.name)).toEqual(expect.arrayContaining([
      'materials.json',
      'CHANGELOG.md',
      'CATALOG_AUDIT.md',
      'furniture/chair-midcentury-shell.json',
    ]));
  });
});
