import { memo } from 'react';
import { BOOKSHELF_DESIGNS, type BookshelfDesignKey } from '../bookshelfDesigns';
import type { GroupProps } from '../modelRegistry';
import { FurnitureDesignModel } from './FurnitureDesignModel';

function createBookshelfVariantModel(modelKey: BookshelfDesignKey) {
  return memo(function BookshelfVariantModel(props: GroupProps) {
    return <FurnitureDesignModel {...props} design={BOOKSHELF_DESIGNS[modelKey]} />;
  });
}

export const BookshelfLowModel = createBookshelfVariantModel('bookshelfLow');
export const BookshelfHighModel = createBookshelfVariantModel('bookshelfHigh');
export const BookshelfDoubleOpenModel = createBookshelfVariantModel('bookshelfDoubleOpen');
export const BookshelfClassicHavstaModel = createBookshelfVariantModel('bookshelfClassicHavsta');
export const BookshelfMidcenturyStockholmModel = createBookshelfVariantModel('bookshelfMidcenturyStockholm');
