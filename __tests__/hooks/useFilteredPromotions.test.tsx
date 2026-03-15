import React, { type ReactNode } from 'react';
import { renderHook, waitFor, act } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFilteredPromotions } from '../../src/hooks/useFilteredPromotions';
import { FilterProvider, useFilters } from '../../src/state/FilterContext';

const mockPromotions = [
  {
    id: 1,
    title: 'Welcome Bonus',
    description: 'Get a 100% match.',
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
    description: 'Free bet every Friday.',
    category: 'Sports',
    status: 'active',
    optedIn: true,
    startDate: '2026-07-01',
    endDate: '2026-12-31',
    imageUrl: 'https://via.placeholder.com/600x300',
  },
  {
    id: 3,
    title: 'Loyalty Cashback',
    description: 'Earn 10% cashback.',
    category: 'Casino',
    status: 'expired',
    optedIn: false,
    startDate: '2026-01-01',
    endDate: '2026-06-30',
    imageUrl: 'https://via.placeholder.com/600x300',
  },
];

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <FilterProvider>{children}</FilterProvider>
      </QueryClientProvider>
    );
  };
}

beforeEach(() => {
  jest.resetAllMocks();
  global.fetch = jest.fn();
});

describe('useFilteredPromotions', () => {
  it('returns all promotions when no filters are set', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPromotions,
    });

    const { result } = renderHook(() => useFilteredPromotions(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.promotions).toHaveLength(3);
  });

  it('filters by category', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPromotions,
    });

    const { result } = renderHook(
      () => {
        const filtered = useFilteredPromotions();
        const { setCategory } = useFilters();
        return { ...filtered, setCategory };
      },
      { wrapper: createWrapper() },
    );

    act(() => {
      result.current.setCategory('Casino');
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.promotions).toHaveLength(2);
    expect(result.current.promotions.every((p) => p.category === 'Casino')).toBe(true);
  });

  it('filters by status', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPromotions,
    });

    const { result } = renderHook(
      () => {
        const filtered = useFilteredPromotions();
        const { setStatus } = useFilters();
        return { ...filtered, setStatus };
      },
      { wrapper: createWrapper() },
    );

    act(() => {
      result.current.setStatus('expired');
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.promotions).toHaveLength(1);
    expect(result.current.promotions[0].title).toBe('Loyalty Cashback');
  });

  it('filters by search query', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPromotions,
    });

    const { result } = renderHook(
      () => {
        const filtered = useFilteredPromotions();
        const { setSearchQuery } = useFilters();
        return { ...filtered, setSearchQuery };
      },
      { wrapper: createWrapper() },
    );

    act(() => {
      result.current.setSearchQuery('bonus');
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.promotions).toHaveLength(1);
    expect(result.current.promotions[0].title).toBe('Welcome Bonus');
  });

  it('applies multiple filters simultaneously', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPromotions,
    });

    const { result } = renderHook(
      () => {
        const filtered = useFilteredPromotions();
        const { setCategory, setStatus } = useFilters();
        return { ...filtered, setCategory, setStatus };
      },
      { wrapper: createWrapper() },
    );

    act(() => {
      result.current.setCategory('Casino');
      result.current.setStatus('active');
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.promotions).toHaveLength(1);
    expect(result.current.promotions[0].title).toBe('Welcome Bonus');
  });
});
