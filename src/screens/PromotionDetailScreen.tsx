import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { ErrorFallback, OptInButton, SkeletonLoader, PromotionBadges } from '../components';
import { usePromotion, useToggleOptIn, useBreakpoint } from '../hooks';
import { formatDate, getDaysRemaining, formatDaysRemaining } from '../utils/date';
import { getErrorMessage } from '../utils/errors';
import { colors, spacing, borderRadius, typography, shadows, layout } from '../theme';
import type { PromotionDetailScreenProps } from '../navigation';

function DetailSkeleton() {
  return (
    <View style={styles.skeletonContainer}>
      <SkeletonLoader height={250} borderRadiusSize={0} />
      <View style={styles.skeletonContent}>
        <SkeletonLoader width={100} height={24} borderRadiusSize={borderRadius.round} />
        <SkeletonLoader height={28} style={{ marginTop: spacing.md }} />
        <SkeletonLoader height={16} style={{ marginTop: spacing.md }} />
        <SkeletonLoader height={16} style={{ marginTop: spacing.xs }} />
        <SkeletonLoader width="70%" height={16} style={{ marginTop: spacing.xs }} />
      </View>
    </View>
  );
}

function PromotionDetailContent({ route }: PromotionDetailScreenProps) {
  const { promotionId } = route.params;
  const { data: promotion, isLoading, isError, error, refetch } = usePromotion(promotionId);
  const toggleOptIn = useToggleOptIn();
  const { isDesktop } = useBreakpoint();

  if (isLoading) return <DetailSkeleton />;

  if (isError || !promotion) {
    return (
      <ErrorFallback
        message={getErrorMessage(error, 'Failed to load promotion details')}
        onRetry={refetch}
      />
    );
  }

  const isActive = promotion.status === 'active';
  const daysRemaining = isActive ? getDaysRemaining(promotion.endDate) : 0;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.scrollContent,
        isDesktop && styles.scrollContentDesktop,
      ]}
    >
      <View style={[styles.card, isDesktop && styles.cardDesktop]}>
        <Image
          source={{ uri: promotion.imageUrl }}
          style={[styles.image, isDesktop && styles.imageDesktop]}
          accessibilityLabel={`${promotion.title} promotional image`}
          resizeMode="cover"
        />

        <View style={[styles.content, isDesktop && styles.contentDesktop]}>
          <View style={styles.headerRow}>
            <PromotionBadges category={promotion.category} status={promotion.status} />
          </View>

          <Text style={styles.title}>{promotion.title}</Text>
          <Text style={styles.description}>{promotion.description}</Text>

          <View style={styles.metaSection}>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Start Date</Text>
              <Text style={styles.metaValue}>{formatDate(promotion.startDate)}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>End Date</Text>
              <Text style={styles.metaValue}>{formatDate(promotion.endDate)}</Text>
            </View>
            {isActive && (
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Time Remaining</Text>
                <Text style={[styles.metaValue, daysRemaining <= 7 && styles.urgentText]}>
                  {formatDaysRemaining(daysRemaining)}
                </Text>
              </View>
            )}
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Status</Text>
              <Text style={styles.metaValue}>
                {promotion.optedIn ? 'You are opted in' : 'Not opted in'}
              </Text>
            </View>
          </View>

          {isActive && (
            <View style={styles.actionSection}>
              <OptInButton
                optedIn={promotion.optedIn}
                onPress={() =>
                  toggleOptIn.mutate({ id: promotion.id, optedIn: !promotion.optedIn })
                }
                isLoading={toggleOptIn.isPending}
              />
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

export function PromotionDetailScreen(props: PromotionDetailScreenProps) {
  return (
    <ErrorBoundary>
      <PromotionDetailContent {...props} />
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl,
  },
  scrollContentDesktop: {
    paddingHorizontal: spacing.xxxl,
    paddingTop: spacing.xl,
    maxWidth: layout.detailMaxWidth,
    alignSelf: 'center',
    width: '100%',
  },
  card: {
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  cardDesktop: {
    borderRadius: borderRadius.lg,
    ...shadows.md,
  },
  image: {
    width: '100%',
    height: 220,
    backgroundColor: colors.skeleton,
  },
  imageDesktop: {
    height: 300,
  },
  content: {
    padding: spacing.xl,
  },
  contentDesktop: {
    padding: spacing.xxxl,
  },
  headerRow: {
    marginBottom: spacing.md,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  metaSection: {
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.lg,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  metaLabel: {
    ...typography.body,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  metaValue: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  urgentText: {
    color: colors.danger,
  },
  actionSection: {
    marginTop: spacing.xxl,
    alignItems: 'flex-start',
  },
  skeletonContainer: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  skeletonContent: {
    padding: spacing.xl,
  },
});
