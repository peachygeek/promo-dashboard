import { fetchPromotions, fetchPromotionById, toggleOptIn } from '../../src/api/promotionsApi';

const mockPromotion = {
  id: 1,
  title: 'Welcome Bonus',
  description: 'Get a 100% match on your first deposit.',
  category: 'Casino',
  status: 'active',
  optedIn: false,
  startDate: '2026-08-01',
  endDate: '2026-08-31',
  imageUrl: 'https://via.placeholder.com/600x300',
};

const mockPromotions = [
  mockPromotion,
  {
    id: 2,
    title: 'Free Bet Friday',
    description: 'Place a qualifying bet.',
    category: 'Sports',
    status: 'active',
    optedIn: true,
    startDate: '2026-07-01',
    endDate: '2026-12-31',
    imageUrl: 'https://via.placeholder.com/600x300',
  },
];

beforeEach(() => {
  jest.resetAllMocks();
  global.fetch = jest.fn();
});

describe('fetchPromotions', () => {
  it('fetches all promotions with correct URL and headers', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPromotions,
    });

    const result = await fetchPromotions();

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/promotions'),
      expect.objectContaining({
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    expect(result).toEqual(mockPromotions);
  });

  it('throws ApiError on non-ok response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    await expect(fetchPromotions()).rejects.toThrow('Request failed: Internal Server Error');
  });

  it('throws on network error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchPromotions()).rejects.toThrow('Network error');
  });
});

describe('fetchPromotionById', () => {
  it('fetches a single promotion by id', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPromotion,
    });

    const result = await fetchPromotionById(1);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/promotions/1'),
      expect.objectContaining({
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    expect(result).toEqual(mockPromotion);
  });

  it('throws on 404', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(fetchPromotionById(999)).rejects.toThrow('Request failed: Not Found');
  });
});

describe('toggleOptIn', () => {
  it('sends PATCH request with correct body', async () => {
    const updated = { ...mockPromotion, optedIn: true };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => updated,
    });

    const result = await toggleOptIn(1, true);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/promotions/1'),
      expect.objectContaining({
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optedIn: true }),
      }),
    );
    expect(result.optedIn).toBe(true);
  });

  it('throws on server error during opt-in toggle', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    await expect(toggleOptIn(1, true)).rejects.toThrow('Request failed');
  });
});
