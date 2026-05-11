import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtoolsPanel } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackDevtools 
        plugins={[
          {
            id: 'react-query',
            name: 'React Query',
            render: <ReactQueryDevtoolsPanel />
          },
          {
            id: 'router',
            name: 'Router',
            render: <TanStackRouterDevtoolsPanel />
          }
        ]}
      />
    </>
  ),
})
