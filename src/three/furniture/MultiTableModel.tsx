import { memo } from 'react';
import { MULTI_TABLE_DESIGNS, type MultiTableDesignKey } from '../multiTableDesigns';
import type { GroupProps } from '../modelRegistry';
import { FurnitureDesignModel } from './FurnitureDesignModel';

function createMultiTableVariantModel(modelKey: MultiTableDesignKey) {
  return memo(function MultiTableVariantModel(props: GroupProps) {
    return <FurnitureDesignModel {...props} design={MULTI_TABLE_DESIGNS[modelKey]} />;
  });
}

export const MultiTableCompactModel = createMultiTableVariantModel('multiTableCompact');
export const MultiTableTwoSeatModel = createMultiTableVariantModel('multiTableTwoSeat');
export const MultiTableStorageModel = createMultiTableVariantModel('multiTableStorage');
export const MultiTableGatelegModel = createMultiTableVariantModel('multiTableGateleg');
