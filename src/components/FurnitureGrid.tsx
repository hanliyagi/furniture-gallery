import type { FurnitureItem } from '../types/furniture';
import { FurnitureCard } from './FurnitureCard';

export interface FurnitureGridProps {
  items: readonly FurnitureItem[];
}

export function FurnitureGrid({ items }: FurnitureGridProps) {
  return (
    <section aria-label="가구 디자인 목록" className="furniture-design-grid">
      {items.map((item) => <FurnitureCard key={item.id} item={item} />)}
    </section>
  );
}
