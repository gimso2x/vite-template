import { fetchApi } from '@/lib/api';
import type { LoginParams, SignupParams, AuthResponse } from './types';

export async function loginApi(params: LoginParams) {
  const { data } = await fetchApi<AuthResponse>('/v1/auth/login', {
    method: 'POST',
    body: params,
  });
  return data;
}

export async function signupApi(params: SignupParams) {
  const { data } = await fetchApi<AuthResponse>('/v1/auth/signup', {
    method: 'POST',
    body: params,
  });
  return data;
}

export async function logoutApi() {
  await fetchApi<void>('/v1/auth/logout', { method: 'POST' });
}
