import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtoolsPanel } from '@tanstack/router-devtools';
import { ErrorBoundary } from '@/components/common/error-boundary';
import LoadingSpinner from '@/components/common/loading-spinner';
import NotFound from '@/components/common/not-found';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
  pendingComponent: LoadingSpinner,
  errorComponent: ({ error }) => (
    <ErrorBoundary fallback={<RootError message={error.message} />}>
      <Outlet />
    </ErrorBoundary>
  ),
});

function RootComponent() {
  return (
    <ErrorBoundary>
      <Outlet />
      <TanStackDevtools
        plugins={[
          {
            id: 'react-query',
            name: 'React Query',
            render: <ReactQueryDevtoolsPanel />,
          },
          {
            id: 'router',
            name: 'Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </ErrorBoundary>
  );
}

function RootError({ message }: { message: string }) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>오류가 발생했습니다</h2>
      <p>{message}</p>
    </div>
  );
}
