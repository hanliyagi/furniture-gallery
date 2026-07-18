import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from '../src/App';
import { FALLBACK_FURNITURE } from '../src/data/fallbackFurniture';
import { MODEL_KEYS } from '../src/types/furniture';

const appMocks = vi.hoisted(() => ({ useFurnitureData: vi.fn() }));

vi.mock('../src/hooks/useFurnitureData', () => ({ useFurnitureData: appMocks.useFurnitureData }));
vi.mock('../src/three/ScenePreview', () => ({
  ScenePreview: ({ modelKey }: { modelKey: string }) => <div data-testid="scene-preview" data-model-key={modelKey} />,
}));

beforeEach(() => {
  appMocks.useFurnitureData.mockReturnValue({ items: FALLBACK_FURNITURE, status: 'connected' });
});

afterEach(() => {
  cleanup();
  appMocks.useFurnitureData.mockReset();
});

describe('desk gallery application', () => {
  it('shows the reference-style hero and every downloadable furniture card', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: '가구 3D 갤러리' })).toBeVisible();
    expect(screen.getByText(`React Three Fiber로 구현한 21가지 가구 종류와 총 ${MODEL_KEYS.length}개의 디자인을 확인하세요.`)).toBeVisible();
    expect(screen.getAllByRole('article')).toHaveLength(MODEL_KEYS.length);
    expect(screen.getAllByRole('button', { name: /JSON 다운로드$/ })).toHaveLength(MODEL_KEYS.length);
    expect(screen.getByRole('button', { name: '전체 가구 JSON ZIP 다운로드' })).toBeVisible();
    expect(screen.getByRole('textbox', { name: 'variantId 검색' })).toBeVisible();
    expect(screen.getByRole('combobox', { name: '가구 유형 필터' })).toBeVisible();
    expect(screen.getByRole('combobox', { name: '스타일 태그 필터' })).toBeVisible();
    expect(screen.getByRole('combobox', { name: '라이프스타일 태그 필터' })).toBeVisible();
    expect(screen.getByRole('combobox', { name: '호환성 필터' })).toBeVisible();
    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
    expect(screen.queryByRole('navigation', { name: '태그 필터' })).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('API 연결됨');
  });

  it('keeps all built-in designs visible while the API is loading', () => {
    appMocks.useFurnitureData.mockReturnValue({ items: FALLBACK_FURNITURE, status: 'loading' });
    render(<App />);

    expect(screen.getAllByRole('article')).toHaveLength(MODEL_KEYS.length);
    expect(screen.getByRole('status')).toHaveTextContent('API 연결 중');
  });
});
