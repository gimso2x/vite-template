import { env } from '@/lib/env';
import { ApiError, type ApiResponse, type RequestOptions } from './types';

const DEFAULT_HEADERS: Record<string, string> = {
  'Content-Type': 'application/json',
};

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

function buildUrl(path: string, params?: Record<string, string>): string {
  const url = new URL(`${env.VITE_API_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  }
  return url.toString();
}

async function refreshTokens(): Promise<void> {
  const { useAuthStore } = await import('@/store');
  const { refreshToken, setTokens, logout } = useAuthStore.getState();

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

  // Dynamic import to avoid circular dependency
  const { useAuthStore } = await import('@/store');
  const accessToken = useAuthStore.getState().accessToken;

  const headersInit: Record<string, string> = {
    ...DEFAULT_HEADERS,
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...headers,
  };

  const res = await fetch(buildUrl(path, params), {
    method,
    headers: headersInit,
    body: body ? JSON.stringify(body) : undefined,
  });

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

    const newToken = useAuthStore.getState().accessToken;
    const retryHeaders: Record<string, string> = {
      ...headersInit,
      ...(newToken ? { Authorization: `Bearer ${newToken}` } : {}),
    };

    const retryRes = await fetch(buildUrl(path, params), {
      method,
      headers: retryHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

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

  // Handle 204 No Content
  if (res.status === 204) {
    return { data: undefined as T, status: res.status };
  }

  const data = (await res.json()) as T;
  return { data, status: res.status };
}

export { fetchApi };
