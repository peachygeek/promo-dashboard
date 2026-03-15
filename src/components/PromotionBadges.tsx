// Presentational component extracted from PromotionCard to display category & status
// badges. Keeps PromotionCard lean and makes badge styling reusable across screens.
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography, categoryColors } from '../theme';
import type { PromotionCategory, PromotionStatus } from '../types';

interface PromotionBadgesProps {
  category: PromotionCategory;
  status: PromotionStatus;
}

export function PromotionBadges({ category, status }: PromotionBadgesProps) {
  const isActive = status === 'active';

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.badge,
          { backgroundColor: categoryColors[category] },
        ]}
      >
        <Text style={styles.badgeText}>{category}</Text>
      </View>
      <View style={[styles.badge, isActive ? styles.activeBadge : styles.expiredBadge]}>
        <Text style={[styles.statusText, isActive ? styles.activeText : styles.expiredText]}>
          {isActive ? 'Active' : 'Expired'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
  },
  badgeText: {
    ...typography.badge,
    color: colors.textInverse,
  },
  activeBadge: {
    backgroundColor: colors.statusActiveBackground,
  },
  expiredBadge: {
    backgroundColor: colors.statusExpiredBackground,
  },
  statusText: {
    ...typography.badge,
  },
  activeText: {
    color: colors.statusActive,
  },
  expiredText: {
    color: colors.statusExpired,
  },
});
