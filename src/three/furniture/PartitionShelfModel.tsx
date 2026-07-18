import { memo } from 'react';
import { PARTITION_SHELF_DESIGNS, type PartitionShelfDesignKey } from '../partitionShelfDesigns';
import type { GroupProps } from '../modelRegistry';
import { FurnitureDesignModel } from './FurnitureDesignModel';

function createPartitionShelfVariantModel(modelKey: PartitionShelfDesignKey) {
  return memo(function PartitionShelfVariantModel(props: GroupProps) {
    return <FurnitureDesignModel {...props} design={PARTITION_SHELF_DESIGNS[modelKey]} />;
  });
}

export const PartitionShelfSlimModel = createPartitionShelfVariantModel('partitionShelfSlim');
export const PartitionShelfTranslucentModel = createPartitionShelfVariantModel('partitionShelfTranslucent');
export const PartitionShelfStorageModel = createPartitionShelfVariantModel('partitionShelfStorage');
export const PartitionShelfKallaxModel = createPartitionShelfVariantModel('partitionShelfKallax');
