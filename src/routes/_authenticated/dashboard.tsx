import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '@/features/auth/hooks/use-auth';
import './dashboard.scss';

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <section className="dashboard__header">
        <h1 className="dashboard__title">Dashboard</h1>
        <p className="dashboard__greeting">
          안녕하세요, <strong>{user?.name}</strong>님
        </p>
      </section>

      <section className="dashboard__content">
        <div className="dashboard__card">
          <h2 className="dashboard__card-title">빠른 시작</h2>
          <p className="dashboard__card-text">이곳은 인증이 필요한 보호된 페이지입니다.</p>
          <p className="dashboard__card-text">이 템플릿을 기반으로 대시보드 기능을 확장하세요.</p>
        </div>

        <div className="dashboard__card">
          <h2 className="dashboard__card-title">계정 정보</h2>
          <dl className="dashboard__info">
            <dt>이름</dt>
            <dd>{user?.name}</dd>
            <dt>이메일</dt>
            <dd>{user?.email}</dd>
          </dl>
        </div>
      </section>
    </div>
  );
}
