import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PromotionCard } from '../../src/components/PromotionCard';
import type { Promotion } from '../../src/types';

const activePromotion: Promotion = {
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

const expiredPromotion: Promotion = {
  ...activePromotion,
  id: 2,
  status: 'expired',
  endDate: '2025-06-30',
};

const optedInPromotion: Promotion = {
  ...activePromotion,
  id: 3,
  optedIn: true,
};

describe('PromotionCard', () => {
  const mockOnPress = jest.fn();
  const mockOnToggleOptIn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders promotion title', () => {
    const { getByText } = render(
      <PromotionCard
        promotion={activePromotion}
        onPress={mockOnPress}
        onToggleOptIn={mockOnToggleOptIn}
      />,
    );

    expect(getByText('Welcome Bonus')).toBeTruthy();
  });

  it('renders category badge', () => {
    const { getByText } = render(
      <PromotionCard
        promotion={activePromotion}
        onPress={mockOnPress}
        onToggleOptIn={mockOnToggleOptIn}
      />,
    );

    expect(getByText('Casino')).toBeTruthy();
  });

  it('renders active status badge for active promotions', () => {
    const { getByText } = render(
      <PromotionCard
        promotion={activePromotion}
        onPress={mockOnPress}
        onToggleOptIn={mockOnToggleOptIn}
      />,
    );

    expect(getByText('Active')).toBeTruthy();
  });

  it('renders expired status badge for expired promotions', () => {
    const { getByText } = render(
      <PromotionCard
        promotion={expiredPromotion}
        onPress={mockOnPress}
        onToggleOptIn={mockOnToggleOptIn}
      />,
    );

    expect(getByText('Expired')).toBeTruthy();
  });

  it('renders opt-in button for active promotions', () => {
    const { getByText } = render(
      <PromotionCard
        promotion={activePromotion}
        onPress={mockOnPress}
        onToggleOptIn={mockOnToggleOptIn}
      />,
    );

    expect(getByText('Opt In')).toBeTruthy();
  });

  it('renders opt-out button when already opted in', () => {
    const { getByText } = render(
      <PromotionCard
        promotion={optedInPromotion}
        onPress={mockOnPress}
        onToggleOptIn={mockOnToggleOptIn}
      />,
    );

    expect(getByText('Opt Out')).toBeTruthy();
  });

  it('does not render opt-in button for expired promotions', () => {
    const { queryByText } = render(
      <PromotionCard
        promotion={expiredPromotion}
        onPress={mockOnPress}
        onToggleOptIn={mockOnToggleOptIn}
      />,
    );

    expect(queryByText('Opt In')).toBeNull();
    expect(queryByText('Opt Out')).toBeNull();
  });

  it('calls onPress when card is pressed', () => {
    const { getByLabelText } = render(
      <PromotionCard
        promotion={activePromotion}
        onPress={mockOnPress}
        onToggleOptIn={mockOnToggleOptIn}
      />,
    );

    fireEvent.press(getByLabelText(/Welcome Bonus promotion\./));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('calls onToggleOptIn when opt-in button is pressed', () => {
    const { getByLabelText } = render(
      <PromotionCard
        promotion={activePromotion}
        onPress={mockOnPress}
        onToggleOptIn={mockOnToggleOptIn}
      />,
    );

    fireEvent.press(getByLabelText('Opt in to this promotion'));
    expect(mockOnToggleOptIn).toHaveBeenCalledTimes(1);
  });

  it('renders the description text', () => {
    const { getByText } = render(
      <PromotionCard
        promotion={activePromotion}
        onPress={mockOnPress}
        onToggleOptIn={mockOnToggleOptIn}
      />,
    );

    expect(getByText('Get a 100% match on your first deposit.')).toBeTruthy();
  });

  it('renders complete card structure for active promotion', () => {
    const { getByText, getByLabelText } = render(
      <PromotionCard
        promotion={activePromotion}
        onPress={mockOnPress}
        onToggleOptIn={mockOnToggleOptIn}
      />,
    );

    expect(getByText('Welcome Bonus')).toBeTruthy();
    expect(getByText('Casino')).toBeTruthy();
    expect(getByText('Active')).toBeTruthy();
    expect(getByText('Opt In')).toBeTruthy();
    expect(getByLabelText('Welcome Bonus promotional image')).toBeTruthy();
  });
});
