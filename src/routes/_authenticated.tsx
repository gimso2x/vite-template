import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { isAuthenticated } from '@/store';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: '/login' });
    }
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
