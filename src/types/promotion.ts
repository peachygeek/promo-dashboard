export type PromotionStatus = 'active' | 'expired';

export type PromotionCategory = 'Casino' | 'Sports' | 'Live Casino' | 'Poker' | 'General';

export interface Promotion {
  id: number;
  title: string;
  description: string;
  category: PromotionCategory;
  status: PromotionStatus;
  optedIn: boolean;
  startDate: string;
  endDate: string;
  imageUrl: string;
}

export interface PromotionFilters {
  category: PromotionCategory | 'All';
  status: PromotionStatus | 'All';
  searchQuery: string;
  dateRange: {
    start: string | null;
    end: string | null;
  };
}

export const ALL_CATEGORIES: readonly (PromotionCategory | 'All')[] = [
  'All',
  'Casino',
  'Sports',
  'Live Casino',
  'Poker',
  'General',
];

export const ALL_STATUSES: readonly (PromotionStatus | 'All')[] = ['All', 'active', 'expired'];
