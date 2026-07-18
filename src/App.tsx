import { Download } from 'lucide-react';
import { useMemo, useState } from 'react';
import MATERIAL_CATALOG from './three/materials.json';
import { buildCatalogBundle, KNOWN_LIFESTYLE_TAGS, KNOWN_STYLE_TAGS, type Compatibility } from './catalog/catalogValidation';
import { ApiStatusBadge } from './components/ApiStatusBadge';
import { FurnitureGrid } from './components/FurnitureGrid';
import { useFurnitureData } from './hooks/useFurnitureData';
import { MODEL_KEYS } from './types/furniture';
import { downloadAllFurnitureJson, getCatalogDesigns } from './utils/downloadFurnitureJson';

export function App() {
  const { items, status, errorMessage } = useFurnitureData();
  const bundle = useMemo(() => buildCatalogBundle(getCatalogDesigns(), MATERIAL_CATALOG), []);
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [style, setStyle] = useState('');
  const [lifestyle, setLifestyle] = useState('');
  const [compatibility, setCompatibility] = useState<Compatibility | ''>('');
  const [selectedId, setSelectedId] = useState('');
  const byVariant = useMemo(() => new Map(bundle.manifest.map((variant) => [variant.variantId, variant])), [bundle]);
  const filtered = items.filter((item) => {
    const variant = byVariant.get(item.id);
    if (!variant) return false;
    const needle = query.trim().toLowerCase();
    return (!needle || item.id.toLowerCase().includes(needle))
      && (!type || variant.furnitureType === type)
      && (!style || variant.styleTags.includes(style))
      && (!lifestyle || variant.lifestyleTags.includes(lifestyle))
      && (!compatibility || variant.compatibility === compatibility);
  });
  const selected = byVariant.get(selectedId);

  return (
    <div className="desk-gallery-page">
      <header className="desk-gallery-topbar">
        <a className="desk-gallery-brand" href="#gallery-title" aria-label="Furniture Gallery">
          <span>FURNITURE</span>
          <span>3D Furniture Library</span>
        </a>
        <div className="desk-gallery-topbar__actions">
          <ApiStatusBadge status={status} errorMessage={errorMessage} />
          <button
            type="button"
            className="desk-gallery-archive-download"
            onClick={downloadAllFurnitureJson}
            aria-label="전체 가구 JSON ZIP 다운로드"
          >
            <Download size={16} strokeWidth={2.2} aria-hidden="true" />
            <span>전체 JSON ZIP 다운로드</span>
          </button>
        </div>
      </header>

      <main className="desk-gallery-main">
        <section className="desk-gallery-hero" aria-labelledby="gallery-title">
          <p className="desk-gallery-eyebrow">3D Furniture Library</p>
          <h1 id="gallery-title">가구 3D 갤러리</h1>
          <p>React Three Fiber로 구현한 21가지 가구 종류와 총 {MODEL_KEYS.length}개의 디자인을 확인하세요.</p>
        </section>

        <section className="catalog-controls" aria-label="가구 카탈로그 검증 및 필터">
          <div className="catalog-controls__summary" aria-live="polite">
            <strong>전체 {bundle.report.totalVariants}</strong>
            <span>호환 {bundle.report.compatibleVariants}</span>
            <span>비호환 {bundle.report.incompatibleVariants}</span>
            <span>오류 {bundle.report.invalidVariants}</span>
          </div>
          <div className="catalog-controls__filters">
            <input aria-label="variantId 검색" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="variantId 검색" />
            <select aria-label="가구 유형 필터" value={type} onChange={(event) => setType(event.target.value)}><option value="">모든 유형</option>{Object.keys(bundle.report.countsByFurnitureType).map((value) => <option key={value} value={value}>{value}</option>)}</select>
            <select aria-label="스타일 태그 필터" value={style} onChange={(event) => setStyle(event.target.value)}><option value="">모든 스타일</option>{KNOWN_STYLE_TAGS.map((value) => <option key={value} value={value}>{value}</option>)}</select>
            <select aria-label="라이프스타일 태그 필터" value={lifestyle} onChange={(event) => setLifestyle(event.target.value)}><option value="">모든 라이프스타일</option>{KNOWN_LIFESTYLE_TAGS.map((value) => <option key={value} value={value}>{value}</option>)}</select>
            <select aria-label="호환성 필터" value={compatibility} onChange={(event) => setCompatibility(event.target.value as Compatibility | '')}><option value="">전체 호환성</option><option value="compatible">compatible</option><option value="incompatible">incompatible</option><option value="invalid">invalid</option></select>
          </div>
          <select className="catalog-controls__selection" aria-label="Variant 상세 선택" value={selectedId} onChange={(event) => setSelectedId(event.target.value)}>
            <option value="">Variant 상세 정보 선택</option>{bundle.manifest.map((variant) => <option key={variant.variantId} value={variant.variantId}>{variant.variantId}</option>)}
          </select>
          {selected && <div className="catalog-controls__detail">
            <strong>{selected.variantId} · {selected.compatibility}</strong>
            <span>{selected.dimensions.width} × {selected.dimensions.depth} × {selected.dimensions.height}m</span>
            <span>Materials: {selected.materialIds.join(', ') || '없음'}</span>
            <span>Geometry: {selected.geometryTypes.join(', ') || '없음'}</span>
            {selected.unsupportedGeometry.length > 0 && <span>미지원: {selected.unsupportedGeometry.map((item) => `${item.geometry} (${item.partIds.join(', ')})`).join('; ')}</span>}
            {selected.errors.length > 0 && <span>오류: {selected.errors.join('; ')}</span>}
            {selected.warnings.length > 0 && <span>경고: {selected.warnings.join('; ')}</span>}
            <span>보기: front / side / top은 카드 3D 미리보기의 방향키와 Home 키로 조작할 수 있습니다.</span>
          </div>}
        </section>

        <FurnitureGrid items={filtered} />
      </main>
    </div>
  );
}
