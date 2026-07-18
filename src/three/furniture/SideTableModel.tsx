import { memo } from 'react';
import { SIDE_TABLE_DESIGNS, type SideTableDesignKey } from '../sideTableDesigns';
import type { GroupProps } from '../modelRegistry';
import { FurnitureDesignModel } from './FurnitureDesignModel';

function createSideTableVariantModel(modelKey: SideTableDesignKey) {
  return memo(function SideTableVariantModel(props: GroupProps) {
    return <FurnitureDesignModel {...props} design={SIDE_TABLE_DESIGNS[modelKey]} />;
  });
}

export const SideTableRoundModel = createSideTableVariantModel('sideTableRound');
export const SideTableCoffeeModel = createSideTableVariantModel('sideTableCoffee');
export const SideTableStorageModel = createSideTableVariantModel('sideTableStorage');
export const SideTableMidcenturyStockholmModel = createSideTableVariantModel('sideTableMidcenturyStockholm');

// Keep the former single-model export while shared catalog code migrates to all variants.
export const SideTableModel = SideTableRoundModel;
