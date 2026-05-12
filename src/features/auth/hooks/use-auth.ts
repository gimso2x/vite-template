import { useAuthStore } from '@/store';

export function useAuth() {
  const { user, accessToken, refreshToken, isLoading } = useAuthStore();
  return { user, accessToken, refreshToken, isAuthenticated: accessToken !== null, isLoading };
}
