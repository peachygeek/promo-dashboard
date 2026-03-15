import { useWindowDimensions } from 'react-native';
import { breakpoints, type Breakpoint } from '../theme';

interface BreakpointInfo {
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  numColumns: number;
}

export function useBreakpoint(): BreakpointInfo {
  const { width } = useWindowDimensions();

  let breakpoint: Breakpoint;
  if (width >= breakpoints.wide) {
    breakpoint = 'wide';
  } else if (width >= breakpoints.desktop) {
    breakpoint = 'desktop';
  } else if (width >= breakpoints.tablet) {
    breakpoint = 'tablet';
  } else {
    breakpoint = 'mobile';
  }

  const numColumns = breakpoint === 'mobile' ? 1 : breakpoint === 'tablet' ? 2 : 3;

  return {
    breakpoint,
    isMobile: breakpoint === 'mobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop' || breakpoint === 'wide',
    width,
    numColumns,
  };
}
