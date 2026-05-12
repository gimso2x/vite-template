import { env } from '@/lib/env';
import { ApiError, type ApiResponse, type RequestOptions } from './types';
import type { useAuthStore } from '@/store';

const DEFAULT_HEADERS: Record<string, string> = {
  'Content-Type': 'application/json',
};

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;
let storeRef: typeof useAuthStore | null = null;

async function getStore() {
  if (!storeRef) {
    const mod = await import('@/store');
    storeRef = mod.useAuthStore;
  }
  return storeRef;
}

function buildUrl(path: string, params?: Record<string, string>): string {
  const url = new URL(`${env.VITE_API_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  }
  return url.toString();
}

async function refreshTokens(): Promise<void> {
  const store = await getStore();
  const { refreshToken, setTokens, logout } = store.getState();

  if (!refreshToken) {
    logout();
    throw new ApiError('No refresh token', 401);
  }

  const res = await fetch(buildUrl('/v1/auth/refresh'), {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    logout();
    throw new ApiError('Token refresh failed', 401);
  }

  const data = (await res.json()) as { accessToken: string; refreshToken: string };
  setTokens(data.accessToken, data.refreshToken);
}

async function fetchApi<T>(path: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
  const { method = 'GET', body, headers = {}, params } = options;
  const store = await getStore();
  const accessToken = store.getState().accessToken;

  const headersInit: Record<string, string> = {
    ...DEFAULT_HEADERS,
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...headers,
  };

  const makeRequest = (overrideHeaders?: Record<string, string>) =>
    fetch(buildUrl(path, params), {
      method,
      headers: overrideHeaders ?? headersInit,
      body: body ? JSON.stringify(body) : undefined,
    });

  const res = await makeRequest();

  if (res.status === 401 && path !== '/v1/auth/refresh') {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = refreshTokens().finally(() => {
        isRefreshing = false;
        refreshPromise = null;
      });
    }

    try {
      await refreshPromise;
    } catch {
      throw new ApiError('Unauthorized', 401);
    }

    const newToken = store.getState().accessToken;
    const retryHeaders: Record<string, string> = {
      ...headersInit,
      ...(newToken ? { Authorization: `Bearer ${newToken}` } : {}),
    };

    const retryRes = await makeRequest(retryHeaders);

    if (!retryRes.ok) {
      const errorBody = await retryRes.json().catch(() => ({ message: retryRes.statusText }));
      throw new ApiError(errorBody.message ?? retryRes.statusText, retryRes.status, errorBody.code);
    }

    const retryData = (await retryRes.json()) as T;
    return { data: retryData, status: retryRes.status };
  }

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({ message: res.statusText }));
    throw new ApiError(errorBody.message ?? res.statusText, res.status, errorBody.code);
  }

  if (res.status === 204) {
    return { data: undefined as T, status: res.status };
  }

  const data = (await res.json()) as T;
  return { data, status: res.status };
}

export { fetchApi };
