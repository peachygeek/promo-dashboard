// Generic full-screen message component used for empty states, errors, etc.
// Accepts an optional action button so callers can offer a "Retry" or similar CTA.
import React from 'react';
import { View, Text, Pressable, StyleSheet, type AccessibilityRole } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../theme';

interface CenteredMessageProps {
  emoji: string;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  role?: AccessibilityRole;
}

export function CenteredMessage({
  emoji,
  title,
  message,
  actionLabel,
  onAction,
  role = 'text',
}: CenteredMessageProps) {
  return (
    <View style={styles.container} accessibilityRole={role}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onAction && (
        <Pressable
          onPress={onAction}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxxl,
    minHeight: 300,
  },
  emoji: {
    fontSize: 48,
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.heading,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  message: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: 300,
    marginBottom: spacing.xl,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    ...typography.subheading,
    color: colors.textInverse,
  },
});
