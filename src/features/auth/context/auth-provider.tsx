/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, type ReactNode, useCallback } from 'react';
import { useAuthStore } from '@/store';
import { loginApi, signupApi, logoutApi } from '../api';
import type { LoginParams, SignupParams } from '../types';

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
        const { user, accessToken, refreshToken } = await loginApi(params);
        setAuth(user, accessToken, refreshToken);
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
        const { user, accessToken, refreshToken } = await signupApi(params);
        setAuth(user, accessToken, refreshToken);
      } finally {
        setLoading(false);
      }
    },
    [setAuth, setLoading],
  );

  const logout = useCallback(async () => {
    try {
      await logoutApi();
    } finally {
      storeLogout();
    }
  }, [storeLogout]);

  return <AuthContext.Provider value={{ login, signup, logout }}>{children}</AuthContext.Provider>;
}
