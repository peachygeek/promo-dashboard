import React, { createContext, useCallback, useContext, useMemo, useReducer, type ReactNode } from 'react';
import type { PromotionCategory, PromotionFilters, PromotionStatus } from '../types';

type FilterAction =
  | { type: 'SET_CATEGORY'; payload: PromotionCategory | 'All' }
  | { type: 'SET_STATUS'; payload: PromotionStatus | 'All' }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_DATE_RANGE'; payload: { start: string | null; end: string | null } }
  | { type: 'RESET' };

interface FilterContextValue {
  filters: PromotionFilters;
  setCategory: (category: PromotionCategory | 'All') => void;
  setStatus: (status: PromotionStatus | 'All') => void;
  setSearchQuery: (query: string) => void;
  setDateRange: (start: string | null, end: string | null) => void;
  resetFilters: () => void;
}

const initialFilters: PromotionFilters = {
  category: 'All',
  status: 'All',
  searchQuery: '',
  dateRange: { start: null, end: null },
};

function filterReducer(state: PromotionFilters, action: FilterAction): PromotionFilters {
  switch (action.type) {
    case 'SET_CATEGORY':
      return { ...state, category: action.payload };
    case 'SET_STATUS':
      return { ...state, status: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_DATE_RANGE':
      return { ...state, dateRange: action.payload };
    case 'RESET':
      return initialFilters;
  }
}

const FilterContext = createContext<FilterContextValue | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, dispatch] = useReducer(filterReducer, initialFilters);

  const setCategory = useCallback(
    (category: PromotionCategory | 'All') => dispatch({ type: 'SET_CATEGORY', payload: category }),
    [],
  );
  const setStatus = useCallback(
    (status: PromotionStatus | 'All') => dispatch({ type: 'SET_STATUS', payload: status }),
    [],
  );
  const setSearchQuery = useCallback(
    (query: string) => dispatch({ type: 'SET_SEARCH_QUERY', payload: query }),
    [],
  );
  const setDateRange = useCallback(
    (start: string | null, end: string | null) =>
      dispatch({ type: 'SET_DATE_RANGE', payload: { start, end } }),
    [],
  );
  const resetFilters = useCallback(() => dispatch({ type: 'RESET' }), []);

  const value = useMemo<FilterContextValue>(
    () => ({ filters, setCategory, setStatus, setSearchQuery, setDateRange, resetFilters }),
    [filters, setCategory, setStatus, setSearchQuery, setDateRange, resetFilters],
  );

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

export function useFilters(): FilterContextValue {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}
