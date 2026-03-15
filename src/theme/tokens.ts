import type { PromotionCategory } from '../types';

export const colors = {
  primary: '#4A90D9',
  primaryDark: '#357ABD',
  secondary: '#2ECC71',
  accent: '#F39C12',
  danger: '#E74C3C',
  dangerDark: '#C0392B',

  background: '#F5F7FA',
  surface: '#FFFFFF',
  surfaceHover: '#F0F4F8',
  border: '#E1E8ED',
  borderLight: '#F0F0F0',

  textPrimary: '#2C3E50',
  textSecondary: '#7F8C8D',
  textInverse: '#FFFFFF',
  textMuted: '#BDC3C7',

  statusActive: '#27AE60',
  statusActiveBackground: '#E8F8F0',
  statusExpired: '#95A5A6',
  statusExpiredBackground: '#F0F0F0',

  optedInBackground: '#EBF5FB',
  optedInBorder: '#4A90D9',

  skeleton: '#E1E8ED',
  skeletonHighlight: '#F5F7FA',

  overlay: 'rgba(0, 0, 0, 0.5)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 9999,
} as const;

export const typography = {
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
    letterSpacing: -0.5,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600' as const,
    letterSpacing: -0.3,
  },
  subheading: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  badge: {
    fontSize: 11,
    fontWeight: '600' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  },
} as const;

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
} as const;

export const categoryColors: Record<PromotionCategory, string> = {
  Casino: '#4A90D9',
  Sports: '#2ECC71',
  'Live Casino': '#1ABC9C',
  Poker: '#E67E22',
  General: '#9B59B6',
};

export const layout = {
  listMaxWidth: 1280,
  detailMaxWidth: 960,
} as const;

export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
} as const;

export type Breakpoint = keyof typeof breakpoints;
