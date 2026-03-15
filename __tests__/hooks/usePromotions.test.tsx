import React from 'react';
import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePromotions } from '../../src/hooks/usePromotions';

const mockPromotions = [
  {
    id: 1,
    title: 'Welcome Bonus',
    description: 'Test description',
    category: 'Casino',
    status: 'active',
    optedIn: false,
    startDate: '2026-08-01',
    endDate: '2026-08-31',
    imageUrl: 'https://via.placeholder.com/600x300',
  },
  {
    id: 2,
    title: 'Free Bet Friday',
    description: 'Another test',
    category: 'Sports',
    status: 'active',
    optedIn: true,
    startDate: '2026-07-01',
    endDate: '2026-12-31',
    imageUrl: 'https://via.placeholder.com/600x300',
  },
];

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

beforeEach(() => {
  jest.resetAllMocks();
  global.fetch = jest.fn();
});

describe('usePromotions', () => {
  it('starts in loading state', () => {
    (global.fetch as jest.Mock).mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => usePromotions(), { wrapper: createWrapper() });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it('returns promotions on success', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPromotions,
    });

    const { result } = renderHook(() => usePromotions(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockPromotions);
    expect(result.current.data).toHaveLength(2);
  });

  it('handles error state', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    const { result } = renderHook(() => usePromotions(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
