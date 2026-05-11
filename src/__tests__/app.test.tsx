import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock TanStack Router
vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router');
  return {
    ...actual,
    RouterProvider: ({ router: _router }: { router: unknown }) => <div>Router Mock</div>,
  };
});

// Mock TanStack Query
vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    QueryClientProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

// Mock TanStack Query hook
vi.mock('@/features/home/hooks/use-sample-query', () => ({
  useSamplePosts: () => ({
    data: [{ id: 1, title: 'Test Post', body: 'Test body' }],
    isLoading: false,
    error: null,
    isSuccess: true,
  }),
}));

describe('App', () => {
  it('renders header logo text', async () => {
    const { default: App } = await import('@/App');
    render(<App />);
    expect(screen.getByText('Template')).toBeInTheDocument();
  });
});
