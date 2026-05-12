import { createContext, useContext, type ReactNode, useCallback } from 'react';
import { fetchApi } from '@/lib/api';
import { useAuthStore, type AuthUser } from '@/store';

type LoginParams = { email: string; password: string };
type SignupParams = { email: string; password: string; name: string };
type AuthResponse = { user: AuthUser; token: string };

type AuthContextValue = {
  login: (params: LoginParams) => Promise<void>;
  signup: (params: SignupParams) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuthActions() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthActions must be used within AuthProvider');
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { setUser, logout: storeLogout, setLoading } = useAuthStore();

  const login = useCallback(
    async (params: LoginParams) => {
      setLoading(true);
      try {
        const { data } = await fetchApi<AuthResponse>('/v1/auth/login', {
          method: 'POST',
          body: params,
        });
        setUser(data.user, data.token);
      } finally {
        setLoading(false);
      }
    },
    [setUser, setLoading],
  );

  const signup = useCallback(
    async (params: SignupParams) => {
      setLoading(true);
      try {
        const { data } = await fetchApi<AuthResponse>('/v1/auth/signup', {
          method: 'POST',
          body: params,
        });
        setUser(data.user, data.token);
      } finally {
        setLoading(false);
      }
    },
    [setUser, setLoading],
  );

  const logout = useCallback(() => {
    storeLogout();
  }, [storeLogout]);

  return <AuthContext.Provider value={{ login, signup, logout }}>{children}</AuthContext.Provider>;
}
