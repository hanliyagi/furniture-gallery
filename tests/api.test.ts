import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { FALLBACK_FURNITURE } from '../src/data/fallbackFurniture';
import {
  FURNITURE_REQUEST_TIMEOUT_MS,
  useFurnitureData,
} from '../src/hooks/useFurnitureData';
import { fetchFurniture, isFurnitureItem, parseFurnitureResponse } from '../src/lib/api';
import type { FurnitureItem } from '../src/types/furniture';

const VALID_ITEMS: FurnitureItem[] = FALLBACK_FURNITURE.map((item) => ({
  ...item,
  variants: [...item.variants],
  tags: [...item.tags],
}));

function jsonResponse(value: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(value), {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
}

function createDeferred<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((promiseResolve, promiseReject) => {
    resolve = promiseResolve;
    reject = promiseReject;
  });

  return { promise, resolve, reject };
}

function responseWithInvalidRecord(field: keyof FurnitureItem, value: unknown): unknown {
  return {
    items: VALID_ITEMS.map((item, index) =>
      index === 0
        ? {
            ...item,
            [field]: value,
          }
        : item,
    ),
  };
}

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('furniture response validation', () => {
  it('accepts a complete furniture record', () => {
    expect(isFurnitureItem(VALID_ITEMS[0])).toBe(true);
  });

  it.each<[keyof FurnitureItem, unknown]>([
    ['id', 1],
    ['index', '1'],
    ['group', 1],
    ['name', 1],
    ['category', 'invalid-category'],
    ['variants', ['valid', 1]],
    ['tags', ['valid', 1]],
    ['modelKey', 'invalid-model'],
    ['description', 1],
    ['implementationNote', 1],
    ['purchaseUrl', 'http://insecure.example.test/desk'],
  ])('rejects an invalid %s field', (field, value) => {
    const invalidRecord = {
      ...VALID_ITEMS[0],
      [field]: value,
    };

    expect(isFurnitureItem(invalidRecord)).toBe(false);
  });

  it('parses an envelope containing the complete valid catalog', () => {
    expect(parseFurnitureResponse({ items: VALID_ITEMS })).toEqual(VALID_ITEMS);
  });

  it.each([null, [], {}, { items: 'not-an-array' }])(
    'rejects a malformed response envelope',
    (value) => {
      expect(() => parseFurnitureResponse(value)).toThrow();
    },
  );

  it('rejects a malformed record', () => {
    expect(() => parseFurnitureResponse(responseWithInvalidRecord('name', null))).toThrow();
  });

  it('rejects a response containing fewer than sixty-six items', () => {
    expect(() => parseFurnitureResponse({ items: VALID_ITEMS.slice(0, 62) })).toThrow();
  });

  it('rejects duplicate furniture IDs', () => {
    const duplicateItems = VALID_ITEMS.map((item, index) =>
      index === 1 ? { ...item, id: VALID_ITEMS[0]!.id } : item,
    );

    expect(() => parseFurnitureResponse({ items: duplicateItems })).toThrow();
  });
});

describe('fetchFurniture', () => {
  it('normalizes the base URL, calls /api/furniture, and passes through the signal', async () => {
    const controller = new AbortController();
    let requestedUrl: string | undefined;
    let requestedSignal: AbortSignal | null | undefined;
    const fetchImpl: typeof fetch = async (input, init) => {
      requestedUrl = String(input);
      requestedSignal = init?.signal;
      return jsonResponse({ items: VALID_ITEMS });
    };

    const items = await fetchFurniture(
      'https://furniture.example.test///',
      controller.signal,
      fetchImpl,
    );

    expect(items).toEqual(VALID_ITEMS);
    expect(requestedUrl).toBe('https://furniture.example.test/api/furniture');
    expect(requestedSignal).toBe(controller.signal);
  });

  it('throws a clear error for a non-OK response', async () => {
    const fetchImpl: typeof fetch = async () => new Response(null, { status: 503 });

    await expect(
      fetchFurniture('https://furniture.example.test', undefined, fetchImpl),
    ).rejects.toThrow('Furniture API returned 503');
  });

  it('rejects a malformed JSON envelope returned by the server', async () => {
    const fetchImpl: typeof fetch = async () => jsonResponse({ furniture: VALID_ITEMS });

    await expect(
      fetchFurniture('https://furniture.example.test', undefined, fetchImpl),
    ).rejects.toThrow();
  });

  it('passes an abort through without converting it into another error', async () => {
    const controller = new AbortController();
    let requestedSignal: AbortSignal | null | undefined;
    const fetchImpl: typeof fetch = (_input, init) => {
      requestedSignal = init?.signal;

      return new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => {
          reject(new DOMException('The operation was aborted.', 'AbortError'));
        });
      });
    };
    const request = fetchFurniture(
      'https://furniture.example.test',
      controller.signal,
      fetchImpl,
    );

    controller.abort();

    await expect(request).rejects.toMatchObject({ name: 'AbortError' });
    expect(requestedSignal).toBe(controller.signal);
  });
});

describe('useFurnitureData', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_API_BASE_URL', 'http://localhost:4000');
  });

  it('transitions from loading to connected with API furniture', async () => {
    const response = createDeferred<Response>();
    let requestedUrl: string | undefined;
    const fetchImpl: typeof fetch = (input) => {
      requestedUrl = String(input);
      return response.promise;
    };
    vi.stubGlobal('fetch', fetchImpl);

    const { result } = renderHook(() => useFurnitureData());

    expect(result.current.status).toBe('loading');
    expect(requestedUrl).toBe('http://localhost:4000/api/furniture');

    await act(async () => {
      response.resolve(jsonResponse({ items: VALID_ITEMS }));
      await response.promise;
    });

    await waitFor(() => expect(result.current.status).toBe('connected'));
    expect(result.current.items).toEqual(VALID_ITEMS);
    expect(result.current.errorMessage).toBeUndefined();
  });

  it('transitions from loading to fallback with built-in data and a Korean error message', async () => {
    vi.stubEnv('VITE_API_BASE_URL', 'https://api.example.test/');
    const response = createDeferred<Response>();
    let requestedUrl: string | undefined;
    const fetchImpl: typeof fetch = (input) => {
      requestedUrl = String(input);
      return response.promise;
    };
    vi.stubGlobal('fetch', fetchImpl);

    const { result } = renderHook(() => useFurnitureData());

    expect(result.current.status).toBe('loading');
    expect(requestedUrl).toBe('https://api.example.test/api/furniture');

    await act(async () => {
      response.reject(new Error('network unavailable'));
      await response.promise.catch(() => undefined);
    });

    await waitFor(() => expect(result.current.status).toBe('fallback'));
    expect(result.current.items).toBe(FALLBACK_FURNITURE);
    expect(result.current.errorMessage).toBe('API 연결에 실패해 내장 데이터를 표시합니다.');
  });

  it('uses bundled furniture immediately when no API address is configured', async () => {
    vi.stubEnv('VITE_API_BASE_URL', '');
    const fetchImpl = vi.fn<typeof fetch>();
    vi.stubGlobal('fetch', fetchImpl);

    const { result } = renderHook(() => useFurnitureData());

    await waitFor(() => expect(result.current.status).toBe('fallback'));
    expect(fetchImpl).not.toHaveBeenCalled();
    expect(result.current.items).toBe(FALLBACK_FURNITURE);
    expect(result.current.errorMessage).toBe('API 주소가 설정되지 않아 내장 데이터를 표시합니다.');
  });

  it('aborts a pending request and falls back after the 9-second deadline', async () => {
    vi.useFakeTimers();
    expect(FURNITURE_REQUEST_TIMEOUT_MS).toBe(9_000);
    let requestedSignal: AbortSignal | null | undefined;
    const fetchImpl: typeof fetch = (_input, init) => {
      requestedSignal = init?.signal;

      return new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener(
          'abort',
          () => reject(new DOMException('The operation was aborted.', 'AbortError')),
          { once: true },
        );
      });
    };
    vi.stubGlobal('fetch', fetchImpl);

    const { result, unmount } = renderHook(() => useFurnitureData());

    expect(result.current.status).toBe('loading');
    expect(requestedSignal?.aborted).toBe(false);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(FURNITURE_REQUEST_TIMEOUT_MS);
    });

    expect(requestedSignal?.aborted).toBe(true);
    expect(result.current.status).toBe('fallback');
    expect(result.current.items).toBe(FALLBACK_FURNITURE);
    expect(result.current.errorMessage).toBe('API 연결에 실패해 내장 데이터를 표시합니다.');
    expect(vi.getTimerCount()).toBe(0);

    unmount();
  });

  it('ignores a successful response from an abort-ignoring fetch after the deadline', async () => {
    vi.useFakeTimers();
    const response = createDeferred<Response>();
    let requestedSignal: AbortSignal | null | undefined;
    const fetchImpl: typeof fetch = (_input, init) => {
      requestedSignal = init?.signal;
      return response.promise;
    };
    vi.stubGlobal('fetch', fetchImpl);

    const { result, unmount } = renderHook(() => useFurnitureData());

    await act(async () => {
      await vi.advanceTimersByTimeAsync(FURNITURE_REQUEST_TIMEOUT_MS);
    });
    const deadlineState = result.current;

    await act(async () => {
      response.resolve(jsonResponse({ items: VALID_ITEMS }));
      await response.promise;
      await Promise.resolve();
    });

    expect(requestedSignal?.aborted).toBe(true);
    expect(result.current.status).toBe('fallback');
    expect(result.current).toBe(deadlineState);
    unmount();
  });

  it('ignores a non-abort rejection from an abort-ignoring fetch after the deadline', async () => {
    vi.useFakeTimers();
    const response = createDeferred<Response>();
    let requestedSignal: AbortSignal | null | undefined;
    const fetchImpl: typeof fetch = (_input, init) => {
      requestedSignal = init?.signal;
      return response.promise;
    };
    vi.stubGlobal('fetch', fetchImpl);

    const { result, unmount } = renderHook(() => useFurnitureData());

    await act(async () => {
      await vi.advanceTimersByTimeAsync(FURNITURE_REQUEST_TIMEOUT_MS);
    });
    const deadlineState = result.current;

    await act(async () => {
      response.reject(new Error('late network failure'));
      await response.promise.catch(() => undefined);
      await Promise.resolve();
    });

    expect(requestedSignal?.aborted).toBe(true);
    expect(result.current.status).toBe('fallback');
    expect(result.current).toBe(deadlineState);
    unmount();
  });

  it('aborts on unmount without changing loading into fallback', async () => {
    vi.useFakeTimers();
    let requestedSignal: AbortSignal | null | undefined;
    const fetchImpl: typeof fetch = (_input, init) => {
      requestedSignal = init?.signal;

      return new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => {
          reject(new DOMException('The operation was aborted.', 'AbortError'));
        });
      });
    };
    vi.stubGlobal('fetch', fetchImpl);

    const { result, unmount } = renderHook(() => useFurnitureData());

    expect(result.current.status).toBe('loading');
    expect(requestedSignal?.aborted).toBe(false);
    expect(vi.getTimerCount()).toBe(1);

    unmount();

    expect(requestedSignal?.aborted).toBe(true);
    expect(vi.getTimerCount()).toBe(0);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10_000);
      await Promise.resolve();
    });
    expect(result.current.status).toBe('loading');
    expect(result.current.errorMessage).toBeUndefined();
  });
});
