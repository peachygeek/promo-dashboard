import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FilterBar } from '../../src/components/FilterBar';
import { FilterProvider } from '../../src/state/FilterContext';

jest.mock('../../src/hooks/useBreakpoint', () => ({
  useBreakpoint: () => ({
    breakpoint: 'desktop',
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    width: 1200,
    numColumns: 3,
  }),
}));

function renderWithProvider() {
  return render(
    <FilterProvider>
      <FilterBar />
    </FilterProvider>,
  );
}

describe('FilterBar', () => {
  it('renders the search input', () => {
    const { getByLabelText } = renderWithProvider();
    expect(getByLabelText('Search promotions')).toBeTruthy();
  });

  it('renders all category filter chips', () => {
    const { getByText } = renderWithProvider();

    expect(getByText('All')).toBeTruthy();
    expect(getByText('Casino')).toBeTruthy();
    expect(getByText('Sports')).toBeTruthy();
    expect(getByText('Live Casino')).toBeTruthy();
    expect(getByText('Poker')).toBeTruthy();
    expect(getByText('General')).toBeTruthy();
  });

  it('renders all status filter chips', () => {
    const { getAllByText, getByText } = renderWithProvider();

    const allButtons = getAllByText('All');
    expect(allButtons.length).toBeGreaterThanOrEqual(2);
    expect(getByText('Active')).toBeTruthy();
    expect(getByText('Expired')).toBeTruthy();
  });

  it('selects category chip when pressed', () => {
    const { getByLabelText } = renderWithProvider();

    const casinoChip = getByLabelText('Filter by Casino');
    fireEvent.press(casinoChip);

    expect(casinoChip.props.accessibilityState?.selected).toBe(true);
  });

  it('selects status chip when pressed', () => {
    const { getByLabelText } = renderWithProvider();

    const activeChip = getByLabelText('Filter by Active');
    fireEvent.press(activeChip);

    expect(activeChip.props.accessibilityState?.selected).toBe(true);
  });

  it('updates search query on text input', () => {
    const { getByLabelText } = renderWithProvider();

    const searchInput = getByLabelText('Search promotions');
    fireEvent.changeText(searchInput, 'bonus');

    expect(searchInput.props.value).toBe('bonus');
  });

  it('shows clear button when filters are active', () => {
    const { getByText } = renderWithProvider();

    fireEvent.press(getByText('Casino'));
    expect(getByText('Clear')).toBeTruthy();
  });

  it('resets filters when clear is pressed', () => {
    const { getByText, getByLabelText } = renderWithProvider();

    fireEvent.press(getByText('Casino'));
    fireEvent.press(getByText('Clear'));

    const allCategoryChip = getByLabelText('Filter by All');
    expect(allCategoryChip.props.accessibilityState?.selected).toBe(true);
  });
});
