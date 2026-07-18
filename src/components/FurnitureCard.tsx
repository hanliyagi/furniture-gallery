import { Download } from 'lucide-react';
import type { FurnitureItem } from '../types/furniture';
import { ScenePreview } from '../three/ScenePreview';
import { downloadFurnitureJson } from '../utils/downloadFurnitureJson';

export interface FurnitureCardProps {
  item: FurnitureItem;
}

export function FurnitureCard({ item }: FurnitureCardProps) {
  const titleId = `furniture-card-${item.id}-title`;
  const variant = item.variants[0] ?? item.name;

  return (
    <article aria-labelledby={titleId} className="furniture-design-card" data-furniture-id={item.id}>
      <ScenePreview modelKey={item.modelKey} className="furniture-design-card__preview" />

      <div className="furniture-design-card__body">
        <div>
          <p className="furniture-design-card__category">{item.category}</p>
          <h2 id={titleId}>{item.name}</h2>
          <p className="furniture-design-card__variant">{item.category} · {variant}</p>
        </div>

        <p className="furniture-design-card__description">{item.description}</p>

        <button
          type="button"
          className="furniture-design-card__download"
          aria-label={`${item.name} JSON 다운로드`}
          onClick={() => downloadFurnitureJson(item.modelKey)}
        >
          <Download size={17} strokeWidth={2} aria-hidden="true" />
          <span>JSON 다운로드</span>
        </button>
      </div>
    </article>
  );
}
