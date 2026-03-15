import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { OptInButton } from '../../src/components/OptInButton';

describe('OptInButton', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders "Opt In" when not opted in', () => {
    const { getByText } = render(
      <OptInButton optedIn={false} onPress={mockOnPress} />,
    );
    expect(getByText('Opt In')).toBeTruthy();
  });

  it('renders "Opt Out" when opted in', () => {
    const { getByText } = render(
      <OptInButton optedIn={true} onPress={mockOnPress} />,
    );
    expect(getByText('Opt Out')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { getByRole } = render(
      <OptInButton optedIn={false} onPress={mockOnPress} />,
    );
    fireEvent.press(getByRole('button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('has correct accessibility label when not opted in', () => {
    const { getByLabelText } = render(
      <OptInButton optedIn={false} onPress={mockOnPress} />,
    );
    expect(getByLabelText('Opt in to this promotion')).toBeTruthy();
  });

  it('has correct accessibility label when opted in', () => {
    const { getByLabelText } = render(
      <OptInButton optedIn={true} onPress={mockOnPress} />,
    );
    expect(getByLabelText('Opt out of this promotion')).toBeTruthy();
  });

  it('does not call onPress when disabled', () => {
    const { getByRole } = render(
      <OptInButton optedIn={false} onPress={mockOnPress} disabled />,
    );
    fireEvent.press(getByRole('button'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('does not call onPress when loading', () => {
    const { getByRole } = render(
      <OptInButton optedIn={false} onPress={mockOnPress} isLoading />,
    );
    fireEvent.press(getByRole('button'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });
});
