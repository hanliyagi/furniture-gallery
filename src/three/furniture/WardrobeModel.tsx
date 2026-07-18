import { memo } from 'react';
import { WARDROBE_DESIGNS, type WardrobeDesignKey } from '../wardrobeDesigns';
import type { GroupProps } from '../modelRegistry';
import { FurnitureDesignModel } from './FurnitureDesignModel';

function createWardrobeVariantModel(modelKey: WardrobeDesignKey) {
  return memo(function WardrobeVariantModel(props: GroupProps) {
    return <FurnitureDesignModel {...props} design={WARDROBE_DESIGNS[modelKey]} />;
  });
}

export const WardrobeHingedModel = createWardrobeVariantModel('wardrobeHinged');
export const WardrobeSlidingModel = createWardrobeVariantModel('wardrobeSliding');
export const WardrobeOpenModel = createWardrobeVariantModel('wardrobeOpen');
export const WardrobeNaturalNordkisaModel = createWardrobeVariantModel('wardrobeNaturalNordkisa');
export const WardrobeClassicGullabergModel = createWardrobeVariantModel('wardrobeClassicGullaberg');
