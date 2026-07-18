import { memo } from 'react';
import { MONITOR_DESIGNS, type MonitorDesignKey } from '../monitorDesigns';
import type { GroupProps } from '../modelRegistry';
import { FurnitureDesignModel } from './FurnitureDesignModel';

function createMonitorVariantModel(modelKey: MonitorDesignKey) {
  return memo(function MonitorVariantModel(props: GroupProps) {
    return <FurnitureDesignModel {...props} design={MONITOR_DESIGNS[modelKey]} />;
  });
}

export const MonitorBasicModel = createMonitorVariantModel('monitorBasic');
export const MonitorUltrawideModel = createMonitorVariantModel('monitorUltrawide');
export const MonitorDualModel = createMonitorVariantModel('monitorDual');
export const MonitorGamingOdysseyModel = createMonitorVariantModel('monitorGamingOdyssey');
