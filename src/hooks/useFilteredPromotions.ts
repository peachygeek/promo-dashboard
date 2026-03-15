import { useMemo } from 'react';
import { usePromotions } from './usePromotions';
import { useFilters } from '../state/FilterContext';
import { isWithinDateRange } from '../utils/date';

export function useFilteredPromotions() {
  const { data: promotions, isLoading, isError, error, refetch } = usePromotions();
  const { filters: { category, status, searchQuery, dateRange } } = useFilters();

  const filtered = useMemo(() => {
    if (!promotions) return [];

    return promotions.filter((promo) => {
      if (category !== 'All' && promo.category !== category) return false;
      if (status !== 'All' && promo.status !== status) return false;

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = promo.title.toLowerCase().includes(query);
        const matchesDescription = promo.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDescription) return false;
      }

      if (!isWithinDateRange(promo.startDate, promo.endDate, dateRange.start, dateRange.end)) {
        return false;
      }

      return true;
    });
  }, [promotions, category, status, searchQuery, dateRange]);

  return { promotions: filtered, isLoading, isError, error, refetch };
}
