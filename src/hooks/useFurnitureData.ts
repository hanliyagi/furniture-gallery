import { useEffect, useState } from 'react';
import { FALLBACK_FURNITURE } from '../data/fallbackFurniture';
import { fetchFurniture } from '../lib/api';
import type { ApiStatus, FurnitureItem } from '../types/furniture';

const FALLBACK_ERROR_MESSAGE = 'API 연결에 실패해 내장 데이터를 표시합니다.';
const UNCONFIGURED_API_MESSAGE = 'API 주소가 설정되지 않아 내장 데이터를 표시합니다.';
export const FURNITURE_REQUEST_TIMEOUT_MS = 9_000;

interface FurnitureDataState {
  items: readonly FurnitureItem[];
  status: ApiStatus;
  errorMessage?: string;
}

const INITIAL_STATE: FurnitureDataState = {
  items: FALLBACK_FURNITURE,
  status: 'loading',
};

export function useFurnitureData(): FurnitureDataState {
  const [state, setState] = useState<FurnitureDataState>(INITIAL_STATE);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    let abortCause: 'deadline' | 'cleanup' | undefined;
    const baseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
    const publishFallback = (errorMessage = FALLBACK_ERROR_MESSAGE) => {
      if (!active) return;

      setState({
        items: FALLBACK_FURNITURE,
        status: 'fallback',
        errorMessage,
      });
    };

    // The gallery's geometry and metadata are bundled with the web app, so a
    // fresh clone remains usable even when the optional API has not been started.
    if (!baseUrl) {
      publishFallback(UNCONFIGURED_API_MESSAGE);

      return () => {
        active = false;
        controller.abort();
      };
    }
    const timeoutId = window.setTimeout(() => {
      if (!active) return;

      abortCause = 'deadline';
      window.clearTimeout(timeoutId);
      controller.abort();
      publishFallback();
    }, FURNITURE_REQUEST_TIMEOUT_MS);

    void fetchFurniture(baseUrl, controller.signal)
      .then((items) => {
        window.clearTimeout(timeoutId);
        if (active && abortCause !== 'deadline') {
          setState({ items, status: 'connected' });
        }
      })
      .catch(() => {
        window.clearTimeout(timeoutId);
        if (!active || abortCause === 'deadline' || abortCause === 'cleanup') {
          return;
        }

        publishFallback();
      });

    return () => {
      active = false;
      abortCause = 'cleanup';
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  return state;
}
