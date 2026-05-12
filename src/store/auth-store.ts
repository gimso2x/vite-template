import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
};

type AuthActions = {
  setAuth: (user: AuthUser, accessToken: string, refreshToken: string) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,

      setAuth: (user, accessToken, refreshToken) => set({ user, accessToken, refreshToken, isLoading: false }),

      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),

      setLoading: (isLoading) => set({ isLoading }),

      logout: () => set({ user: null, accessToken: null, refreshToken: null, isLoading: false }),
    }),
    {
      name: 'auth-storage',
      version: 1,
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
      migrate: (
        persisted,
        version,
      ): { user: AuthUser | null; accessToken: string | null; refreshToken: string | null } => {
        if (version === 0) {
          const old = persisted as Record<string, unknown>;
          return { user: (old['user'] as AuthUser) ?? null, accessToken: null, refreshToken: null };
        }
        const data = persisted as Record<string, unknown>;
        return {
          user: (data['user'] as AuthUser) ?? null,
          accessToken: (data['accessToken'] as string) ?? null,
          refreshToken: (data['refreshToken'] as string) ?? null,
        };
      },
    },
  ),
);

export function isAuthenticated(): boolean {
  return useAuthStore.getState().accessToken !== null;
}
