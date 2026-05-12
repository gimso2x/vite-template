import { useAuthStore } from '@/store';

export function useAuth() {
  const { user, token, isAuthenticated, isLoading } = useAuthStore();
  return { user, token, isAuthenticated, isLoading };
}
