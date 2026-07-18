import type { FurnitureDesign, FurniturePart } from './designTypes';

export type ChairDesignKey =
  | 'chairBasic'
  | 'chairArmrest'
  | 'chairCompactSwivel'
  | 'chairClassicTonstad'
  | 'chairGamingMatchspel'
  | 'chairMidcenturyShell';
export type ChairDesign = FurnitureDesign<'책상 의자', '책상 의자'>;

const COORDINATE_SYSTEM = Object.freeze({
  origin: 'floor-center' as const,
  axes: Object.freeze({ x: 'right' as const, y: 'up' as const, z: 'front' as const }),
});

const basicParts: readonly FurniturePart[] = [
  { id: 'foot-left-front', geometry: 'box', size: [0.04, 0.04, 0.11], position: [-0.19, 0.02, 0.215], material: 'metal' },
  { id: 'foot-left-back', geometry: 'box', size: [0.04, 0.04, 0.11], position: [-0.19, 0.02, -0.215], material: 'metal' },
  { id: 'foot-right-front', geometry: 'box', size: [0.04, 0.04, 0.11], position: [0.19, 0.02, 0.215], material: 'metal' },
  { id: 'foot-right-back', geometry: 'box', size: [0.04, 0.04, 0.11], position: [0.19, 0.02, -0.215], material: 'metal' },
  { id: 'leg-left-front', geometry: 'box', size: [0.035, 0.4, 0.04], position: [-0.19, 0.22, 0.205], material: 'metal' },
  { id: 'leg-left-back', geometry: 'box', size: [0.035, 0.4, 0.04], position: [-0.19, 0.22, -0.16], material: 'metal' },
  { id: 'leg-right-front', geometry: 'box', size: [0.035, 0.4, 0.04], position: [0.19, 0.22, 0.205], material: 'metal' },
  { id: 'leg-right-back', geometry: 'box', size: [0.035, 0.4, 0.04], position: [0.19, 0.22, -0.16], material: 'metal' },
  { id: 'seat', geometry: 'box', size: [0.46, 0.06, 0.4], position: [0, 0.45, 0.03], material: 'woodLight' },
  { id: 'back-post-left', geometry: 'box', size: [0.03, 0.32, 0.03], position: [-0.19, 0.6, -0.185], material: 'metal' },
  { id: 'back-post-right', geometry: 'box', size: [0.03, 0.32, 0.03], position: [0.19, 0.6, -0.185], material: 'metal' },
  { id: 'backrest', geometry: 'box', size: [0.46, 0.3, 0.04], position: [0, 0.65, -0.18], material: 'woodLight' },
];

const armrestParts: readonly FurniturePart[] = [
  { id: 'base-cross-x', geometry: 'box', size: [0.71, 0.035, 0.055], position: [0, 0.0175, 0], material: 'metal' },
  { id: 'base-cross-z', geometry: 'box', size: [0.055, 0.035, 0.71], position: [0, 0.0175, 0], material: 'metal' },
  { id: 'gas-column', geometry: 'cylinder', size: [0.035, 0.035, 0.46], position: [0, 0.265, 0], material: 'metalLight' },
  { id: 'seat-base', geometry: 'box', size: [0.5, 0.1, 0.49], position: [0, 0.545, 0.04], material: 'fabricDark' },
  { id: 'back-support-link-left', geometry: 'box', size: [0.04, 0.04, 0.16], position: [-0.2, 0.56, -0.27], material: 'metal' },
  { id: 'back-support-link-right', geometry: 'box', size: [0.04, 0.04, 0.16], position: [0.2, 0.56, -0.27], material: 'metal' },
  { id: 'back-support-left', geometry: 'box', size: [0.04, 0.3, 0.04], position: [-0.2, 0.7, -0.335], material: 'metal' },
  { id: 'back-support-right', geometry: 'box', size: [0.04, 0.3, 0.04], position: [0.2, 0.7, -0.335], material: 'metal' },
  { id: 'mesh-back', geometry: 'box', size: [0.5, 0.58, 0.08], position: [0, 0.85, -0.275], material: 'fabric' },
  { id: 'arm-support-left', geometry: 'box', size: [0.08, 0.28, 0.04], position: [-0.27, 0.72, 0.02], material: 'metal' },
  { id: 'arm-support-right', geometry: 'box', size: [0.08, 0.28, 0.04], position: [0.27, 0.72, 0.02], material: 'metal' },
  { id: 'arm-pad-left', geometry: 'box', size: [0.08, 0.04, 0.38], position: [-0.31, 0.88, 0.01], material: 'fabricDark' },
  { id: 'arm-pad-right', geometry: 'box', size: [0.08, 0.04, 0.38], position: [0.31, 0.88, 0.01], material: 'fabricDark' },
];

const compactSwivelParts: readonly FurniturePart[] = [
  { id: 'base-cross-x', geometry: 'box', size: [0.67, 0.035, 0.05], position: [0, 0.0175, 0], material: 'metalLight' },
  { id: 'base-cross-z', geometry: 'box', size: [0.05, 0.035, 0.67], position: [0, 0.0175, 0], material: 'metalLight' },
  { id: 'gas-column', geometry: 'cylinder', size: [0.03, 0.03, 0.425], position: [0, 0.2475, 0], material: 'metal' },
  { id: 'shell-seat', geometry: 'box', size: [0.43, 0.08, 0.43], position: [0, 0.5, 0.03], material: 'fabricDark' },
  { id: 'seat-pad', geometry: 'box', size: [0.4, 0.03, 0.38], position: [0, 0.555, 0.04], material: 'fabric' },
  { id: 'back-support-link', geometry: 'box', size: [0.04, 0.04, 0.1], position: [0, 0.515, -0.205], material: 'metal' },
  { id: 'back-support', geometry: 'box', size: [0.04, 0.25, 0.04], position: [0, 0.62, -0.25], material: 'metal' },
  { id: 'shell-back', geometry: 'box', size: [0.5, 0.38, 0.06], position: [0, 0.71, -0.2], material: 'fabric' },
];

const classicTonstadParts: readonly FurniturePart[] = [
  { id: 'foot-left-front', geometry: 'roundedBox', size: [0.05, 0.04, 0.12], radius: 0.012, smoothness: 4, position: [-0.17, 0.02, 0.22], material: 'woodDark' },
  { id: 'foot-left-back', geometry: 'roundedBox', size: [0.05, 0.04, 0.12], radius: 0.012, smoothness: 4, position: [-0.17, 0.02, -0.22], material: 'woodDark' },
  { id: 'foot-right-front', geometry: 'roundedBox', size: [0.05, 0.04, 0.12], radius: 0.012, smoothness: 4, position: [0.17, 0.02, 0.22], material: 'woodDark' },
  { id: 'foot-right-back', geometry: 'roundedBox', size: [0.05, 0.04, 0.12], radius: 0.012, smoothness: 4, position: [0.17, 0.02, -0.22], material: 'woodDark' },
  { id: 'leg-left-front', geometry: 'cylinder', size: [0.024, 0.034, 0.35], position: [-0.17, 0.215, 0.2], material: 'woodDark' },
  { id: 'leg-left-back', geometry: 'cylinder', size: [0.024, 0.034, 0.35], position: [-0.17, 0.215, -0.2], material: 'woodDark' },
  { id: 'leg-right-front', geometry: 'cylinder', size: [0.024, 0.034, 0.35], position: [0.17, 0.215, 0.2], material: 'woodDark' },
  { id: 'leg-right-back', geometry: 'cylinder', size: [0.024, 0.034, 0.35], position: [0.17, 0.215, -0.2], material: 'woodDark' },
  { id: 'seat-base', geometry: 'roundedBox', size: [0.42, 0.06, 0.46], radius: 0.025, smoothness: 6, position: [0, 0.42, 0.01], material: 'woodLight' },
  { id: 'seat-cushion', geometry: 'roundedBox', size: [0.38, 0.06, 0.4], radius: 0.03, smoothness: 6, position: [0, 0.45, 0.02], material: 'fabricDark' },
  { id: 'back-post-left', geometry: 'roundedBox', size: [0.04, 0.43, 0.05], radius: 0.014, smoothness: 4, position: [-0.16, 0.645, -0.245], material: 'woodDark' },
  { id: 'back-post-right', geometry: 'roundedBox', size: [0.04, 0.43, 0.05], radius: 0.014, smoothness: 4, position: [0.16, 0.645, -0.245], material: 'woodDark' },
  { id: 'upholstered-back', geometry: 'roundedBox', size: [0.42, 0.32, 0.08], radius: 0.04, smoothness: 7, position: [0, 0.7, -0.24], material: 'fabricDark' },
];

const gamingMatchspelParts: readonly FurniturePart[] = [
  { id: 'base-cross-x', geometry: 'roundedBox', size: [0.66, 0.04, 0.07], radius: 0.018, smoothness: 4, position: [0, 0.02, 0], material: 'metal' },
  { id: 'base-cross-z', geometry: 'roundedBox', size: [0.07, 0.04, 0.66], radius: 0.018, smoothness: 4, position: [0, 0.02, 0], material: 'metal' },
  { id: 'gas-column', geometry: 'cylinder', size: [0.038, 0.05, 0.48], position: [0, 0.28, 0], material: 'metalLight' },
  { id: 'seat-base', geometry: 'roundedBox', size: [0.54, 0.12, 0.48], radius: 0.045, smoothness: 6, position: [0, 0.58, 0.03], material: 'fabricDark' },
  { id: 'seat-pad', geometry: 'roundedBox', size: [0.5, 0.07, 0.43], radius: 0.04, smoothness: 6, position: [0, 0.665, 0.04], material: 'fabric' },
  { id: 'back-support-link', geometry: 'roundedBox', size: [0.38, 0.07, 0.16], radius: 0.02, smoothness: 4, position: [0, 0.62, -0.22], material: 'metal' },
  { id: 'back-frame', geometry: 'roundedBox', size: [0.52, 0.5, 0.08], radius: 0.035, smoothness: 6, position: [0, 0.87, -0.24], material: 'metal' },
  { id: 'mesh-back', geometry: 'roundedBox', size: [0.45, 0.43, 0.035], radius: 0.03, smoothness: 6, position: [0, 0.88, -0.193], material: 'fabricLight' },
  { id: 'lumbar-support', geometry: 'roundedBox', size: [0.36, 0.12, 0.045], radius: 0.03, smoothness: 6, position: [0, 0.77, -0.165], material: 'fabricDark' },
  { id: 'arm-support-left', geometry: 'roundedBox', size: [0.055, 0.3, 0.055], radius: 0.016, smoothness: 4, position: [-0.285, 0.76, 0.03], material: 'metalLight' },
  { id: 'arm-support-right', geometry: 'roundedBox', size: [0.055, 0.3, 0.055], radius: 0.016, smoothness: 4, position: [0.285, 0.76, 0.03], material: 'metalLight' },
  { id: 'arm-pad-left', geometry: 'roundedBox', size: [0.08, 0.045, 0.32], radius: 0.018, smoothness: 5, position: [-0.29, 0.925, 0.03], material: 'fabricDark' },
  { id: 'arm-pad-right', geometry: 'roundedBox', size: [0.08, 0.045, 0.32], radius: 0.018, smoothness: 5, position: [0.29, 0.925, 0.03], material: 'fabricDark' },
  { id: 'headrest-support', geometry: 'roundedBox', size: [0.08, 0.2, 0.05], radius: 0.015, smoothness: 4, position: [0, 1.18, -0.24], material: 'metalLight' },
  { id: 'headrest', geometry: 'roundedBox', size: [0.34, 0.16, 0.08], radius: 0.035, smoothness: 6, position: [0, 1.24, -0.24], material: 'fabricDark' },
];

const midcenturyShellParts: readonly FurniturePart[] = [
  { id: 'left-front-leg', geometry: 'roundedBox', size: [0.048, 0.43, 0.048], radius: 0.014, smoothness: 5, position: [-0.21, 0.215, 0.19], material: 'woodDark' },
  { id: 'right-front-leg', geometry: 'roundedBox', size: [0.048, 0.43, 0.048], radius: 0.014, smoothness: 5, position: [0.21, 0.215, 0.19], material: 'woodDark' },
  { id: 'left-back-leg', geometry: 'roundedBox', size: [0.048, 0.43, 0.048], radius: 0.014, smoothness: 5, position: [-0.21, 0.215, -0.19], material: 'woodDark' },
  { id: 'right-back-leg', geometry: 'roundedBox', size: [0.048, 0.43, 0.048], radius: 0.014, smoothness: 5, position: [0.21, 0.215, -0.19], material: 'woodDark' },
  { id: 'front-stretcher', geometry: 'roundedBox', size: [0.45, 0.035, 0.035], radius: 0.012, smoothness: 4, position: [0, 0.31, 0.19], material: 'chrome' },
  { id: 'back-stretcher', geometry: 'roundedBox', size: [0.45, 0.035, 0.035], radius: 0.012, smoothness: 4, position: [0, 0.31, -0.19], material: 'chrome' },
  { id: 'seat-shell', geometry: 'roundedBox', size: [0.56, 0.09, 0.5], radius: 0.055, smoothness: 8, position: [0, 0.47, 0.02], material: 'tealFabric' },
  { id: 'seat-pad', geometry: 'roundedBox', size: [0.46, 0.035, 0.39], radius: 0.025, smoothness: 6, position: [0, 0.525, 0.045], material: 'fabricLight' },
  { id: 'back-support-left', geometry: 'roundedBox', size: [0.04, 0.27, 0.045], radius: 0.012, smoothness: 4, position: [-0.19, 0.635, -0.247], material: 'woodDark' },
  { id: 'back-support-right', geometry: 'roundedBox', size: [0.04, 0.27, 0.045], radius: 0.012, smoothness: 4, position: [0.19, 0.635, -0.247], material: 'woodDark' },
  { id: 'curved-back-shell', geometry: 'roundedBox', size: [0.5, 0.37, 0.08], radius: 0.07, smoothness: 10, position: [0, 0.695, -0.23], material: 'tealFabric' },
];

export const CHAIR_DESIGNS: Readonly<Record<ChairDesignKey, ChairDesign>> = Object.freeze({
  chairBasic: Object.freeze({
    schemaVersion: '1.0', id: 'chair-basic', name: '기본형 책상 의자', furnitureType: '책상 의자', category: '책상 의자', variant: '기본형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.46, depth: 0.54, height: 0.8 }), materials: Object.freeze(['metal', 'woodLight'] as const), parts: Object.freeze(basicParts), purchaseUrl: 'https://www.ikea.com/kr/ko/p/teodores-chair-black-00530622/',
  }),
  chairArmrest: Object.freeze({
    schemaVersion: '1.0', id: 'chair-armrest', name: '팔걸이형 책상 의자', furnitureType: '책상 의자', category: '책상 의자', variant: '팔걸이형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.71, depth: 0.71, height: 1.14 }), materials: Object.freeze(['metal', 'metalLight', 'fabric', 'fabricDark'] as const), parts: Object.freeze(armrestParts), purchaseUrl: 'https://www.ikea.com/kr/ko/p/flintan-office-chair-with-armrests-black-s69424469/',
  }),
  chairCompactSwivel: Object.freeze({
    schemaVersion: '1.0', id: 'chair-compact-swivel', name: '컴팩트 회전형 책상 의자', furnitureType: '책상 의자', category: '책상 의자', variant: '컴팩트 회전형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.67, depth: 0.67, height: 0.9 }), materials: Object.freeze(['metal', 'metalLight', 'fabric', 'fabricDark'] as const), parts: Object.freeze(compactSwivelParts), purchaseUrl: 'https://www.ikea.com/kr/ko/p/loberget-malskaer-swivel-chair-pad-white-dark-grey-s79445452/',
  }),
  chairClassicTonstad: Object.freeze({
    schemaVersion: '1.0', id: 'chair-classic-tonstad', name: '클래식 우드 책상 의자', furnitureType: '책상 의자', category: '책상 의자', variant: '클래식 우드형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.42, depth: 0.56, height: 0.86 }), materials: Object.freeze(['woodLight', 'woodDark', 'fabricDark'] as const), parts: Object.freeze(classicTonstadParts), purchaseUrl: 'https://www.ikea.com/kr/ko/p/tonstad-chair-bomstad-golden-brown-oak-effect-s09602172/',
  }),
  chairGamingMatchspel: Object.freeze({
    schemaVersion: '1.0', id: 'chair-gaming-matchspel', name: '게이밍 책상 의자', furnitureType: '책상 의자', category: '책상 의자', variant: '게이밍 인체공학형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.66, depth: 0.66, height: 1.32 }), materials: Object.freeze(['metal', 'metalLight', 'fabric', 'fabricLight', 'fabricDark'] as const), parts: Object.freeze(gamingMatchspelParts), purchaseUrl: 'https://www.ikea.com/kr/en/p/matchspel-gaming-chair-gunnared-beige-30574285/',
  }),
  chairMidcenturyShell: Object.freeze({
    schemaVersion: '1.0', id: 'chair-midcentury-shell', name: '미드센추리 쉘 책상 의자', furnitureType: '책상 의자', category: '책상 의자', variant: '미드센추리 쉘형', units: 'meter', coordinateSystem: COORDINATE_SYSTEM, rotationUnit: 'radian',
    dimensions: Object.freeze({ width: 0.56, depth: 0.54, height: 0.88 }), materials: Object.freeze(['woodDark', 'chrome', 'tealFabric', 'fabricLight'] as const), parts: Object.freeze(midcenturyShellParts), purchaseUrl: 'https://store.hermanmiller.com/dining-furniture-chairs-stools/eames-molded-plastic-side-chair/1104.html?lang=en_US',
  }),
});
