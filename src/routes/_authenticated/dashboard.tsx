import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '@/features/auth/hooks/use-auth';

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useAuth();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>안녕하세요, {user?.name}님!</p>
      <p>이곳은 인증이 필요한 페이지입니다.</p>
    </div>
  );
}
