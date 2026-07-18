# Furniture JSON Catalog Changelog

## 2026-07-18 — Catalog audit and targeted Variant addition

### Visual corrections

- Restored `plant-midcentury` as a red plastic midcentury floor plant with soil, curved stems, leaves, and leaf veins.
- Moved the exposed back-support posts behind the visible cushions on the classic wood and midcentury shell desk chairs.

### Added Variant

- `chair-midcentury-shell` (`chairMidcenturyShell`)
  - Type: 책상 의자 / `DESK_CHAIR`
  - Dimensions: 0.56 × 0.54 × 0.88 m
  - Tags: `midcentury`, `modern` / `WORK_STUDY`, `HOBBY_LEISURE`
  - Material IDs: `woodDark`, `chrome`, `tealFabric`, `fabricLight`
  - Purchase URL: Herman Miller Eames Molded Plastic Side Chair

### Material changes

- None. The audit found no unresolved Material ID references, unused global materials, or duplicate material definitions.

### Contract and geometry QA

- All catalog Variants use Schema 1.0, meter units, `floor-center` origin, +X right / +Y up / +Z front, and radian rotations.
- Each Variant was rebuilt through the React Three Fiber renderer in front, side, and top views and checked with geometric projections.
- The downloadable archive includes this changelog, `materials.json`, and `CATALOG_AUDIT.md`.
