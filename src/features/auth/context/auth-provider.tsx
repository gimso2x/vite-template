/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, type ReactNode, useCallback } from 'react';
import { useAuthStore } from '@/store';
import { loginApi, signupApi, logoutApi } from '../api';
import type { LoginParams, SignupParams, AuthResponse } from '../types';

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

  const authenticate = useCallback(
    async (action: () => Promise<AuthResponse>) => {
      setLoading(true);
      try {
        setAuth(await action());
      } finally {
        setLoading(false);
      }
    },
    [setAuth, setLoading],
  );

  const login = useCallback((params: LoginParams) => authenticate(() => loginApi(params)), [authenticate]);

  const signup = useCallback((params: SignupParams) => authenticate(() => signupApi(params)), [authenticate]);

  const logout = useCallback(async () => {
    try {
      await logoutApi();
    } finally {
      storeLogout();
    }
  }, [storeLogout]);

  return <AuthContext.Provider value={{ login, signup, logout }}>{children}</AuthContext.Provider>;
}
