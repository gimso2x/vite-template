import { env } from '@/lib/env';
import { ApiError, type ApiResponse, type RequestOptions } from './types';

const DEFAULT_HEADERS: Record<string, string> = {
  'Content-Type': 'application/json',
};

function getToken(): string | null {
  try {
    return localStorage.getItem('auth_token');
  } catch {
    return null;
  }
}

function buildUrl(path: string, params?: Record<string, string>): string {
  const url = new URL(path, env.VITE_API_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  }
  return url.toString();
}

async function fetchApi<T>(path: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
  const { method = 'GET', body, headers = {}, params } = options;

  const token = getToken();
  const headersInit: Record<string, string> = {
    ...DEFAULT_HEADERS,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  const res = await fetch(buildUrl(path, params), {
    method,
    headers: headersInit,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({ message: res.statusText }));
    throw new ApiError(errorBody.message ?? res.statusText, res.status, errorBody.code);
  }

  const data = (await res.json()) as T;
  return { data, status: res.status };
}

export { fetchApi };
