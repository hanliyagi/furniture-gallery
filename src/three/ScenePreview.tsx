import { ContactShadows, Html, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import {
  Component,
  Suspense,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ComponentRef, KeyboardEvent as ReactKeyboardEvent, ReactNode } from 'react';
import { MathUtils, Spherical, Vector3 } from 'three';
import { useNearViewport } from '../hooks/useNearViewport';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import type { ModelKey } from '../types/furniture';
import { FurnitureModelRenderer } from './FurnitureModelRenderer';
import { getScenePolicy, VIEW_CONFIGS } from './modelRegistry';

const MOBILE_VIEWPORT_QUERY = '(max-width: 767px)';
const CANVAS_GL_OPTIONS = Object.freeze({
  antialias: true,
  powerPreference: 'high-performance' as const,
});
const WEBGL_FALLBACK = <p>이 기기에서는 3D 미리보기를 사용할 수 없습니다.</p>;
const SCENE_ERROR_FALLBACK = (
  <p role="status">3D 미리보기를 표시할 수 없습니다.</p>
);
const SCENE_LOADING_FALLBACK = (
  <Html center>
    <p role="status">3D 모델을 불러오는 중입니다.</p>
  </Html>
);
const DIRECTIONAL_LIGHT_POSITION: [number, number, number] = [4, 6, 3];
const KEYBOARD_ROTATION_STEP = Math.PI / 18;
const KEYBOARD_PAN_RATIO = 0.08;
const KEYBOARD_ZOOM_IN_FACTOR = 0.9;
const KEYBOARD_ZOOM_OUT_FACTOR = 1 / KEYBOARD_ZOOM_IN_FACTOR;
const POLAR_ANGLE_EPSILON = 0.01;
const CARD_KEYBOARD_INSTRUCTIONS =
  '좌우 방향키로 회전하고 Home 키로 초기화합니다.';
const DETAIL_KEYBOARD_INSTRUCTIONS =
  '방향키로 회전하고 W, A, S, D 키로 이동하며 더하기와 빼기 키로 확대·축소하고 Home 키로 초기화합니다.';

type OrbitControlsInstance = ComponentRef<typeof OrbitControls>;

function commitControlsChange(controls: OrbitControlsInstance) {
  controls.object.lookAt(controls.target);
  controls.update();
}

function rotateControls(
  controls: OrbitControlsInstance,
  azimuthDelta: number,
  polarDelta = 0,
) {
  const offset = controls.object.position.clone().sub(controls.target);
  const spherical = new Spherical().setFromVector3(offset);
  spherical.theta += azimuthDelta;
  spherical.phi = MathUtils.clamp(
    spherical.phi + polarDelta,
    POLAR_ANGLE_EPSILON,
    Math.PI - POLAR_ANGLE_EPSILON,
  );
  controls.object.position.copy(controls.target).add(offset.setFromSpherical(spherical));
  commitControlsChange(controls);
}

function panControls(
  controls: OrbitControlsInstance,
  horizontalDirection: number,
  verticalDirection: number,
) {
  const camera = controls.object;
  const distance = camera.position.distanceTo(controls.target);
  const panDistance = Math.max(distance * KEYBOARD_PAN_RATIO, 0.1);
  const panOffset = new Vector3();
  camera.updateMatrix();

  if (horizontalDirection !== 0) {
    panOffset
      .setFromMatrixColumn(camera.matrix, 0)
      .normalize()
      .multiplyScalar(horizontalDirection * panDistance);
  }
  if (verticalDirection !== 0) {
    panOffset.add(
      new Vector3()
        .setFromMatrixColumn(camera.matrix, 1)
        .normalize()
        .multiplyScalar(verticalDirection * panDistance),
    );
  }

  camera.position.add(panOffset);
  controls.target.add(panOffset);
  commitControlsChange(controls);
}

function zoomControls(controls: OrbitControlsInstance, factor: number) {
  const offset = controls.object.position.clone().sub(controls.target);
  const nextDistance = MathUtils.clamp(
    offset.length() * factor,
    controls.minDistance,
    controls.maxDistance,
  );
  controls.object.position.copy(controls.target).add(offset.setLength(nextDistance));
  commitControlsChange(controls);
}

function resetControls(controls: OrbitControlsInstance) {
  const enableDamping = controls.enableDamping;
  controls.enableDamping = false;

  try {
    controls.update();
    controls.reset();
  } finally {
    controls.enableDamping = enableDamping;
  }

  controls.update();
}

interface SceneErrorBoundaryProps {
  children: ReactNode;
}

interface SceneErrorBoundaryState {
  hasError: boolean;
}

class SceneErrorBoundary extends Component<
  SceneErrorBoundaryProps,
  SceneErrorBoundaryState
> {
  state: SceneErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): SceneErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? SCENE_ERROR_FALLBACK : this.props.children;
  }
}

function getMobileMediaQuery(): MediaQueryList | null {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return null;
  return window.matchMedia(MOBILE_VIEWPORT_QUERY);
}

function useIsMobileViewport(): boolean {
  const [mediaQuery] = useState(getMobileMediaQuery);
  const [isMobile, setIsMobile] = useState(() => mediaQuery?.matches ?? false);

  useEffect(() => {
    if (!mediaQuery) return;

    const handleChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mediaQuery]);

  return isMobile;
}

export interface ScenePreviewProps {
  modelKey: ModelKey;
  detail?: boolean;
  className?: string;
}

export function ScenePreview({
  modelKey,
  detail = false,
  className,
}: ScenePreviewProps) {
  const { ref, isNearViewport } = useNearViewport();
  const reducedMotion = usePrefersReducedMotion();
  const mobile = useIsMobileViewport();
  const controlsRef = useRef<OrbitControlsInstance>(null);
  const instructionsId = useId();
  const [hovered, setHovered] = useState(false);
  const [keyboardFocused, setKeyboardFocused] = useState(false);
  const [pointerDown, setPointerDown] = useState(false);
  const viewConfig = VIEW_CONFIGS[modelKey];
  const policy = getScenePolicy({ detail, reducedMotion, mobile });
  const camera = useMemo(
    () => ({ fov: detail ? 42 : 38, position: viewConfig.cameraPosition }),
    [detail, viewConfig],
  );
  const shouldMountCanvas = detail || isNearViewport || keyboardFocused;
  const autoRotate = policy.autoRotate && !hovered && !keyboardFocused && !pointerDown;
  const frameloop = autoRotate || pointerDown ? 'always' : 'demand';
  const setControlsRef = useCallback((controls: OrbitControlsInstance | null) => {
    controlsRef.current = controls;
    controls?.saveState();
  }, []);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;

    const controls = controlsRef.current;
    if (!controls) return;

    switch (event.key) {
      case 'ArrowLeft':
        rotateControls(controls, -KEYBOARD_ROTATION_STEP);
        break;
      case 'ArrowRight':
        rotateControls(controls, KEYBOARD_ROTATION_STEP);
        break;
      case 'ArrowUp':
        if (!detail) return;
        rotateControls(controls, 0, -KEYBOARD_ROTATION_STEP);
        break;
      case 'ArrowDown':
        if (!detail) return;
        rotateControls(controls, 0, KEYBOARD_ROTATION_STEP);
        break;
      case 'w':
      case 'W':
        if (!detail) return;
        panControls(controls, 0, 1);
        break;
      case 'a':
      case 'A':
        if (!detail) return;
        panControls(controls, -1, 0);
        break;
      case 's':
      case 'S':
        if (!detail) return;
        panControls(controls, 0, -1);
        break;
      case 'd':
      case 'D':
        if (!detail) return;
        panControls(controls, 1, 0);
        break;
      case '+':
      case '=':
        if (!detail) return;
        zoomControls(controls, KEYBOARD_ZOOM_IN_FACTOR);
        break;
      case '-':
      case '_':
        if (!detail) return;
        zoomControls(controls, KEYBOARD_ZOOM_OUT_FACTOR);
        break;
      case 'Home':
        resetControls(controls);
        break;
      default:
        return;
    }

    event.preventDefault();
  };

  return (
    <div
      ref={ref}
      role="group"
      tabIndex={0}
      className={className ? `scene-preview ${className}` : 'scene-preview'}
      data-testid="scene-preview"
      aria-label={detail ? '상세 3D 가구 미리보기' : '3D 가구 미리보기'}
      aria-describedby={instructionsId}
      onFocus={() => setKeyboardFocused(true)}
      onBlur={() => setKeyboardFocused(false)}
      onKeyDown={handleKeyDown}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => {
        setHovered(false);
        setPointerDown(false);
      }}
      onPointerDown={() => setPointerDown(true)}
      onPointerUp={() => setPointerDown(false)}
      onPointerCancel={() => setPointerDown(false)}
      onLostPointerCapture={() => setPointerDown(false)}
    >
      <span id={instructionsId} className="visually-hidden">
        {detail ? DETAIL_KEYBOARD_INSTRUCTIONS : CARD_KEYBOARD_INSTRUCTIONS}
      </span>
      {shouldMountCanvas ? (
        <SceneErrorBoundary key={`${modelKey}:${detail ? 'detail' : 'card'}`}>
          <Canvas
            camera={camera}
            dpr={policy.dpr}
            fallback={WEBGL_FALLBACK}
            frameloop={frameloop}
            gl={CANVAS_GL_OPTIONS}
            shadows
          >
            <ambientLight intensity={0.85} />
            <directionalLight
              castShadow
              intensity={1.15}
              position={DIRECTIONAL_LIGHT_POSITION}
            />
            <Suspense fallback={SCENE_LOADING_FALLBACK}>
              <FurnitureModelRenderer modelKey={modelKey} scale={viewConfig.scale} />
            </Suspense>
            <ContactShadows
              position={[0, -0.01, 0]}
              opacity={0.34}
              scale={8}
              blur={2.4}
              far={4.5}
            />
            <OrbitControls
              ref={setControlsRef}
              makeDefault
              target={viewConfig.target}
              enableDamping
              enableZoom={policy.enableZoom}
              enablePan={policy.enablePan}
              autoRotate={autoRotate}
              autoRotateSpeed={policy.autoRotateSpeed}
            />
          </Canvas>
        </SceneErrorBoundary>
      ) : null}
    </div>
  );
}
