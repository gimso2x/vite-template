import { useAuthStore } from '@/store';
import { useAuthActions } from '../context/auth-provider';

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading);
  const isAuthenticated = useAuthStore((s) => s.accessToken !== null);
  const { logout } = useAuthActions();
  return { user, isAuthenticated, isLoading, logout };
}
