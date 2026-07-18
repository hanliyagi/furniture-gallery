import ReactThreeTestRenderer from '@react-three/test-renderer';
import { afterEach, describe, expect, it } from 'vitest';
import { BedClassicIdanaesModel, BedFabricHeadboardModel, BedLoftDeskModel, BedLowPlatformModel, BedMidcenturyTealModel, BedStorageModel } from '../src/three/furniture/BedModel';
import { BookshelfDoubleOpenModel, BookshelfHighModel, BookshelfLowModel } from '../src/three/furniture/BookshelfModel';
import { ChairArmrestModel, ChairBasicModel, ChairCompactSwivelModel } from '../src/three/furniture/DeskChairModel';
import { DeskCompactModel, DeskCornerModel, DeskMidcenturyGlassModel, DeskStorageModel } from '../src/three/furniture/DeskModel';
import { DrawerChestBedsideModel, DrawerChestClassicGullabergModel, DrawerChestLowWideModel, DrawerChestVerticalModel } from '../src/three/furniture/DrawerChestModel';
import { HangerBasicModel, HangerCornerModel, HangerNaturalMorsningModel, HangerShelfModel } from '../src/three/furniture/HangerModel';
import { NightstandDrawerModel, NightstandOpenModel, NightstandRoundModel } from '../src/three/furniture/NightstandModel';
import { MonitorBasicModel, MonitorDualModel, MonitorGamingOdysseyModel, MonitorUltrawideModel } from '../src/three/furniture/MonitorModel';
import { SofaBedClassicStorageModel, SofaBedCompactModel, SofaBedDaybedModel, SofaBedFoldingModel, SofaBedMidcenturyOrangeModel } from '../src/three/furniture/SofaBedModel';
import { SofaClassicEktorpModel, SofaMidcenturyStockholmModel, SofaModularModel, SofaSingleModel, SofaTwoSeatModel } from '../src/three/furniture/SofaModel';
import { SideTableCoffeeModel, SideTableMidcenturyStockholmModel, SideTableRoundModel, SideTableStorageModel } from '../src/three/furniture/SideTableModel';
import { WardrobeClassicGullabergModel, WardrobeHingedModel, WardrobeNaturalNordkisaModel, WardrobeOpenModel, WardrobeSlidingModel } from '../src/three/furniture/WardrobeModel';
import { MediaConsoleDrawerModel, MediaConsoleLowModel, MediaConsoleMidcenturyStockholmModel, MediaConsoleOpenModel } from '../src/three/furniture/MediaConsoleModel';
import { TvMediumModel, TvNaturalFrameModel, TvSmallModel, TvWideModel } from '../src/three/furniture/TvMonitorModel';
import { MultiTableCompactModel, MultiTableStorageModel, MultiTableTwoSeatModel } from '../src/three/furniture/MultiTableModel';
import { PartitionShelfSlimModel, PartitionShelfStorageModel, PartitionShelfTranslucentModel } from '../src/three/furniture/PartitionShelfModel';
import { RugRectangularModel, RugRoundModel, RugRunnerModel } from '../src/three/furniture/RugModel';
import { PlantCornerModel, PlantFloorModel, PlantTabletopModel } from '../src/three/furniture/PlantModel';
import { MirrorClassicRoundedModel, MirrorStandingModel, MirrorStorageModel, MirrorWallModel } from '../src/three/furniture/FullLengthMirrorModel';
import { LampFloorModel, LampIndirectModel, LampMidcenturyGlobeModel, LampTableModel } from '../src/three/furniture/MoodLampModel';
import { BlindRollerModel, BlindWoodModel, CurtainBlackoutModel, CurtainFabricModel } from '../src/three/furniture/CurtainBlindModel';
import { MODEL_COMPONENTS, VIEW_CONFIGS } from '../src/three/modelRegistry';
import { MODEL_KEYS } from '../src/types/furniture';

const renderers: Awaited<ReturnType<typeof ReactThreeTestRenderer.create>>[] = [];

afterEach(async () => {
  await Promise.all(renderers.splice(0).map((renderer) => renderer.unmount()));
});

describe('desk model registry', () => {
  it('registers all furniture variants with view configs', () => {
    expect(Object.keys(MODEL_COMPONENTS)).toEqual(MODEL_KEYS);
    expect(Object.keys(VIEW_CONFIGS)).toEqual(MODEL_KEYS);
  });

  it.each([
    ['compact', DeskCompactModel, 'desk-compact', 'cable-tray'],
    ['storage', DeskStorageModel, 'desk-storage', 'drawer-3'],
    ['corner', DeskCornerModel, 'desk-corner', 'corner-desktop'],
    ['midcentury glass desk', DeskMidcenturyGlassModel, 'desk-midcentury-glass', 'glass-top'],
    ['low-platform bed', BedLowPlatformModel, 'bed-low-platform', 'mattress-upper'],
    ['storage bed', BedStorageModel, 'bed-storage', 'drawer-left'],
    ['fabric-headboard bed', BedFabricHeadboardModel, 'bed-fabric-headboard', 'fabric-headboard'],
    ['midcentury teal bed', BedMidcenturyTealModel, 'bed-midcentury-teal', 'teal-headboard'],
    ['classic upholstered bed', BedClassicIdanaesModel, 'bed-classic-idanaes', 'tuft-center-upper'],
    ['loft desk bed', BedLoftDeskModel, 'bed-loft-desk', 'desk-top'],
    ['compact sofa bed', SofaBedCompactModel, 'sofa-bed-compact', 'seat-mattress'],
    ['folding sofa bed', SofaBedFoldingModel, 'sofa-bed-folding', 'hinge-bar'],
    ['daybed sofa bed', SofaBedDaybedModel, 'sofa-bed-daybed', 'bolster'],
    ['midcentury orange sofa bed', SofaBedMidcenturyOrangeModel, 'sofa-bed-midcentury-orange', 'click-clack-hinge'],
    ['classic storage sofa bed', SofaBedClassicStorageModel, 'sofa-bed-classic-storage', 'drawer-center'],
    ['drawer nightstand', NightstandDrawerModel, 'nightstand-drawer', 'drawer-upper'],
    ['open nightstand', NightstandOpenModel, 'nightstand-open', 'open-shelf'],
    ['round nightstand', NightstandRoundModel, 'nightstand-round', 'tray-top'],
    ['basic chair', ChairBasicModel, 'chair-basic', 'backrest'],
    ['armrest chair', ChairArmrestModel, 'chair-armrest', 'arm-pad-left'],
    ['compact swivel chair', ChairCompactSwivelModel, 'chair-compact-swivel', 'shell-back'],
    ['low bookshelf', BookshelfLowModel, 'bookshelf-low', 'shelf-lower'],
    ['high bookshelf', BookshelfHighModel, 'bookshelf-high', 'shelf-5'],
    ['double-sided open bookshelf', BookshelfDoubleOpenModel, 'bookshelf-double-open', 'center-divider'],
    ['basic monitor', MonitorBasicModel, 'monitor-basic', 'display'],
    ['ultrawide monitor', MonitorUltrawideModel, 'monitor-ultrawide', 'wide-display'],
    ['dual monitor', MonitorDualModel, 'monitor-dual', 'display-right'],
    ['gaming monitor', MonitorGamingOdysseyModel, 'monitor-gaming-odyssey', 'gaming-display'],
    ['hinged wardrobe', WardrobeHingedModel, 'wardrobe-hinged', 'door-left'],
    ['sliding wardrobe', WardrobeSlidingModel, 'wardrobe-sliding', 'sliding-door-left'],
    ['open wardrobe', WardrobeOpenModel, 'wardrobe-open', 'hanging-rail'],
    ['natural wardrobe', WardrobeNaturalNordkisaModel, 'wardrobe-natural-nordkisa', 'door-slat-4'],
    ['classic wardrobe', WardrobeClassicGullabergModel, 'wardrobe-classic-gullaberg', 'door-center-mirror'],
    ['low wide drawer chest', DrawerChestLowWideModel, 'drawer-chest-low-wide', 'drawer-left-upper'],
    ['vertical drawer chest', DrawerChestVerticalModel, 'drawer-chest-vertical', 'drawer-5'],
    ['bedside drawer chest', DrawerChestBedsideModel, 'drawer-chest-bedside', 'compact-drawer-upper'],
    ['classic drawer chest', DrawerChestClassicGullabergModel, 'drawer-chest-classic-gullaberg', 'drawer-2-2'],
    ['basic hanger', HangerBasicModel, 'hanger-basic', 'hanger-rail'],
    ['shelf hanger', HangerShelfModel, 'hanger-shelf', 'shoe-shelf'],
    ['corner hanger', HangerCornerModel, 'hanger-corner', 'rail-z'],
    ['natural valet hanger', HangerNaturalMorsningModel, 'hanger-natural-morsning', 'shoulder-rail'],
    ['single sofa', SofaSingleModel, 'sofa-single', 'back-cushion'],
    ['two-seat sofa', SofaTwoSeatModel, 'sofa-two-seat', 'back-cushion-right'],
    ['modular sofa', SofaModularModel, 'sofa-modular', 'storage-front-left'],
    ['classic cushion sofa', SofaClassicEktorpModel, 'sofa-classic-ektorp', 'back-cushion-center'],
    ['midcentury wood sofa', SofaMidcenturyStockholmModel, 'sofa-midcentury-stockholm', 'back-rail-upper'],
    ['round side table', SideTableRoundModel, 'side-table-round', 'tabletop'],
    ['low coffee table', SideTableCoffeeModel, 'side-table-coffee', 'magazine-shelf'],
    ['storage side table', SideTableStorageModel, 'side-table-storage', 'shelf-wide'],
    ['midcentury side table', SideTableMidcenturyStockholmModel, 'side-table-midcentury-stockholm', 'round-top'],
    ['small TV', TvSmallModel, 'tv-small', 'display'],
    ['medium TV', TvMediumModel, 'tv-medium', 'display'],
    ['wide TV', TvWideModel, 'tv-wide', 'display'],
    ['natural frame TV', TvNaturalFrameModel, 'tv-natural-frame', 'art-display'],
    ['low media console', MediaConsoleLowModel, 'media-console-low', 'media-shelf'],
    ['drawer media console', MediaConsoleDrawerModel, 'media-console-drawer', 'drawer-front-left'],
    ['open media console', MediaConsoleOpenModel, 'media-console-open', 'shelf-left'],
    ['midcentury media console', MediaConsoleMidcenturyStockholmModel, 'media-console-midcentury-stockholm', 'drop-door-top-right'],
    ['compact multi table', MultiTableCompactModel, 'multi-table-compact', 'tabletop'],
    ['two-seat multi table', MultiTableTwoSeatModel, 'multi-table-two-seat', 'apron-front'],
    ['storage multi table', MultiTableStorageModel, 'multi-table-storage', 'appliance-shelf'],
    ['slim partition', PartitionShelfSlimModel, 'partition-shelf-slim', 'slat-4'],
    ['translucent partition', PartitionShelfTranslucentModel, 'partition-shelf-translucent', 'panel-center'],
    ['storage partition shelf', PartitionShelfStorageModel, 'partition-shelf-storage', 'center-divider'],
    ['round rug', RugRoundModel, 'rug-round', 'round-inset'],
    ['rectangular rug', RugRectangularModel, 'rug-rectangular', 'rect-inset'],
    ['runner rug', RugRunnerModel, 'rug-runner', 'stripe-front'],
    ['tabletop plant', PlantTabletopModel, 'plant-tabletop', 'leaf-1'],
    ['floor plant', PlantFloorModel, 'plant-floor', 'leaf-1'],
    ['corner plant', PlantCornerModel, 'plant-corner', 'leaf-1'],
    ['standing mirror', MirrorStandingModel, 'mirror-standing', 'mirror-panel'],
    ['wall mirror', MirrorWallModel, 'mirror-wall', 'wall-mirror-panel'],
    ['storage mirror', MirrorStorageModel, 'mirror-storage', 'storage-shelf-upper'],
    ['classic rounded mirror', MirrorClassicRoundedModel, 'mirror-classic-rounded', 'mirror-panel'],
    ['table mood lamp', LampTableModel, 'lamp-table', 'table-shade'],
    ['floor mood lamp', LampFloorModel, 'lamp-floor', 'floor-shade'],
    ['LED mood lamp', LampIndirectModel, 'lamp-indirect', 'led-diffuser'],
    ['midcentury globe mood lamp', LampMidcenturyGlobeModel, 'lamp-midcentury-globe', 'globe-diffuser'],
    ['fabric curtain', CurtainFabricModel, 'curtain-fabric', 'curtain-panel-left'],
    ['roller blind', BlindRollerModel, 'blind-roller', 'roller-panel'],
    ['wood blind', BlindWoodModel, 'blind-wood', 'wood-slat-5'],
    ['blackout curtain', CurtainBlackoutModel, 'curtain-blackout', 'blackout-panel-left'],
  ] as const)('renders the %s variant as real, shadow-casting geometry', async (_label, Model, rootName, cuePart) => {
    const renderer = await ReactThreeTestRenderer.create(<Model />);
    renderers.push(renderer);

    expect(renderer.scene.findByProps({ name: rootName }).instance.isObject3D).toBe(true);
    const cue = renderer.scene.findByProps({ name: cuePart });
    expect(cue.type).toBe('Mesh');
    expect(cue.props.castShadow).toBe(true);
    expect(cue.props.receiveShadow).toBe(true);
  });
});
