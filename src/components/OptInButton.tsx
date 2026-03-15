import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, borderRadius, spacing, typography } from '../theme';

interface OptInButtonProps {
  optedIn: boolean;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function OptInButton({ optedIn, onPress, isLoading = false, disabled = false }: OptInButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || isLoading}
      accessibilityRole="button"
      accessibilityLabel={optedIn ? 'Opt out of this promotion' : 'Opt in to this promotion'}
      accessibilityState={{ disabled: disabled || isLoading }}
      style={({ pressed }) => [
        styles.button,
        optedIn ? styles.optedIn : styles.optedOut,
        pressed && styles.pressed,
        (disabled || isLoading) && styles.disabled,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={optedIn ? colors.danger : colors.textInverse}
        />
      ) : (
        <Text
          style={[styles.text, optedIn ? styles.optedInText : styles.optedOutText]}
        >
          {optedIn ? 'Opt Out' : 'Opt In'}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
    minHeight: 36,
  },
  optedOut: {
    backgroundColor: colors.primary,
  },
  optedIn: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.danger,
  },
  text: {
    ...typography.subheading,
    fontSize: 13,
  },
  optedOutText: {
    color: colors.textInverse,
  },
  optedInText: {
    color: colors.danger,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
});
