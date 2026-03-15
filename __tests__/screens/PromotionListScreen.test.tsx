import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PromotionListScreen } from '../../src/screens/PromotionListScreen';
import { PromotionDetailScreen } from '../../src/screens/PromotionDetailScreen';
import { FilterProvider } from '../../src/state/FilterContext';
import type { RootStackParamList } from '../../src/navigation';

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
];

jest.mock('../../src/hooks/useBreakpoint', () => ({
  useBreakpoint: () => ({
    breakpoint: 'mobile',
    isMobile: true,
    isTablet: false,
    isDesktop: false,
    width: 375,
    numColumns: 1,
  }),
}));

const Stack = createNativeStackNavigator<RootStackParamList>();

function createTestApp() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <FilterProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="PromotionList" component={PromotionListScreen} />
            <Stack.Screen name="PromotionDetail" component={PromotionDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </FilterProvider>
    </QueryClientProvider>
  );
}

beforeEach(() => {
  jest.resetAllMocks();
  global.fetch = jest.fn();
});

describe('PromotionListScreen', () => {
  it('renders promotion cards after loading', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPromotions,
    });

    const { getByText } = render(createTestApp());

    await waitFor(() => {
      expect(getByText('Welcome Bonus')).toBeTruthy();
      expect(getByText('Free Bet Friday')).toBeTruthy();
    });
  });

  it('shows error fallback on API failure', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    const { getByText } = render(createTestApp());

    await waitFor(() => {
      expect(getByText('Oops!')).toBeTruthy();
    });
  });

  it('navigates to detail screen when card is pressed', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPromotions,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPromotions[0],
      });

    const { getByText, getByLabelText } = render(createTestApp());

    await waitFor(() => {
      expect(getByText('Welcome Bonus')).toBeTruthy();
    });

    fireEvent.press(getByLabelText(/Welcome Bonus promotion/));

    await waitFor(() => {
      expect(getByText('Promotion Details')).toBeTruthy();
    });
  });
});
