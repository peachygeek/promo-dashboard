import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../theme';
import { formatDate, getDaysRemaining, formatDaysRemaining } from '../utils/date';
import { PromotionBadges } from './PromotionBadges';
import { OptInButton } from './OptInButton';
import type { Promotion } from '../types';

interface PromotionCardProps {
  promotion: Promotion;
  onPress: () => void;
  onToggleOptIn: () => void;
  isToggling?: boolean;
}

export function PromotionCard({
  promotion,
  onPress,
  onToggleOptIn,
  isToggling = false,
}: PromotionCardProps) {
  const isActive = promotion.status === 'active';
  const daysRemaining = isActive ? getDaysRemaining(promotion.endDate) : 0;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${promotion.title} promotion. ${promotion.category}. ${isActive ? 'Active' : 'Expired'}. Press to view details.`}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <Image
        source={{ uri: promotion.imageUrl }}
        style={styles.image}
        accessibilityLabel={`${promotion.title} promotional image`}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View style={styles.badgesWrapper}>
          <PromotionBadges category={promotion.category} status={promotion.status} />
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {promotion.title}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {promotion.description}
        </Text>

        <View style={styles.footer}>
          <View style={styles.dateInfo}>
            <Text style={styles.dateText}>
              {formatDate(promotion.startDate)} – {formatDate(promotion.endDate)}
            </Text>
            {isActive && daysRemaining <= 30 && (
              <Text style={styles.daysRemaining}>
                {formatDaysRemaining(daysRemaining)} left
              </Text>
            )}
          </View>

          {isActive && (
            <OptInButton
              optedIn={promotion.optedIn}
              onPress={onToggleOptIn}
              isLoading={isToggling}
            />
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.md,
  },
  cardPressed: {
    opacity: 0.95,
    transform: [{ scale: 0.99 }],
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: colors.skeleton,
  },
  content: {
    padding: spacing.lg,
  },
  badgesWrapper: {
    marginBottom: spacing.md,
  },
  title: {
    ...typography.heading,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  dateInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  dateText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  daysRemaining: {
    ...typography.caption,
    color: colors.accent,
    fontWeight: '600',
    marginTop: 2,
  },
});
