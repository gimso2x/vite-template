/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, type ReactNode, useCallback } from 'react';
import { fetchApi } from '@/lib/api';
import { useAuthStore, type AuthUser } from '@/store';

type LoginParams = { email: string; password: string };
type SignupParams = { email: string; password: string; name: string };
type AuthResponse = {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
};

type AuthContextValue = {
  login: (params: LoginParams) => Promise<void>;
  signup: (params: SignupParams) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuthActions() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthActions must be used within AuthProvider');
  return ctx;
}

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const { setAuth, logout: storeLogout, setLoading } = useAuthStore();

  const login = useCallback(
    async (params: LoginParams) => {
      setLoading(true);
      try {
        const { data } = await fetchApi<AuthResponse>('/v1/auth/login', {
          method: 'POST',
          body: params,
        });
        setAuth(data.user, data.accessToken, data.refreshToken);
      } finally {
        setLoading(false);
      }
    },
    [setAuth, setLoading],
  );

  const signup = useCallback(
    async (params: SignupParams) => {
      setLoading(true);
      try {
        const { data } = await fetchApi<AuthResponse>('/v1/auth/signup', {
          method: 'POST',
          body: params,
        });
        setAuth(data.user, data.accessToken, data.refreshToken);
      } finally {
        setLoading(false);
      }
    },
    [setAuth, setLoading],
  );

  const logout = useCallback(async () => {
    try {
      await fetchApi<void>('/v1/auth/logout', { method: 'POST' });
    } finally {
      storeLogout();
    }
  }, [storeLogout]);

  return <AuthContext.Provider value={{ login, signup, logout }}>{children}</AuthContext.Provider>;
}
