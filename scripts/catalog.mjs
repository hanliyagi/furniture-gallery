import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createJiti } from 'jiti';

const command = process.argv[2] ?? 'validate';
const root = resolve(import.meta.dirname, '..');
const jiti = createJiti(import.meta.url);
const { getCatalogDesigns, serializeFurnitureDesign } = jiti(resolve(root, 'src/utils/downloadFurnitureJson.ts'));
const { buildCatalogBundle, withGeneratedAt } = jiti(resolve(root, 'src/catalog/catalogValidation.ts'));
const materialCatalog = jiti(resolve(root, 'src/three/materials.json'));
const { CATALOG_CHANGELOG } = jiti(resolve(root, 'src/data/catalogChangelog.ts'));

const bundle = buildCatalogBundle(getCatalogDesigns(), materialCatalog);
const generatedAt = new Date().toISOString();
const manifest = withGeneratedAt({ variants: bundle.manifest }, generatedAt);
const report = withGeneratedAt(bundle.report, generatedAt);

function writeJson(path, value) { writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`); }
function printSummary() {
  console.log(JSON.stringify({
    totalVariants: bundle.report.totalVariants, compatibleVariants: bundle.report.compatibleVariants,
    incompatibleVariants: bundle.report.incompatibleVariants, invalidVariants: bundle.report.invalidVariants,
    materialCount: Object.keys(materialCatalog.materials).length,
    unsupportedGeometry: Object.keys(bundle.report.countsByGeometry).filter((geometry) => !['box', 'roundedBox', 'cylinder', 'extrudedPolygon'].includes(geometry)),
  }, null, 2));
}

if (command === 'validate') {
  printSummary();
  if (bundle.report.invalidVariants > 0 || bundle.report.materialIssues.length > 0) process.exitCode = 1;
} else if (command === 'report') {
  const output = resolve(root, 'catalog-output');
  mkdirSync(output, { recursive: true });
  writeJson(resolve(output, 'catalog-manifest.json'), manifest);
  writeJson(resolve(output, 'catalog-report.json'), report);
  console.log(`Wrote ${resolve(output, 'catalog-manifest.json')} and catalog-report.json`);
  printSummary();
} else if (command === 'export') {
  const output = resolve(root, 'catalog-output');
  const packageRoot = resolve(output, 'furniture-gallery-catalog');
  rmSync(packageRoot, { recursive: true, force: true });
  mkdirSync(resolve(packageRoot, 'variants'), { recursive: true });
  for (const entry of getCatalogDesigns()) {
    const design = entry.downloadable;
    writeFileSync(resolve(packageRoot, 'variants', `${design.variantId}.json`), serializeFurnitureDesign(entry.modelKey));
  }
  writeJson(resolve(packageRoot, 'materials.json'), materialCatalog);
  writeJson(resolve(packageRoot, 'catalog-manifest.json'), manifest);
  writeJson(resolve(packageRoot, 'catalog-report.json'), report);
  writeFileSync(resolve(packageRoot, 'CHANGELOG.md'), `${CATALOG_CHANGELOG}\n\n## Delivery comparison\n\n- This is the first generated delivery package; no previous exported baseline was supplied.\n- Added/changed/deleted variant and material IDs cannot be calculated until a previous package is provided.\n- Web-incompatible geometry is listed in catalog-report.json.\n`);
  const archive = resolve(output, 'furniture-gallery-catalog.zip');
  rmSync(archive, { force: true });
  execFileSync('zip', ['-qr', archive, 'furniture-gallery-catalog'], { cwd: output, stdio: 'inherit' });
  console.log(`Wrote ${packageRoot} and ${archive}`);
  printSummary();
} else {
  console.error(`Unknown catalog command: ${command}`);
  process.exitCode = 2;
}
