import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { PromotionCard, FilterBar, PromotionCardSkeleton, ErrorFallback, EmptyState } from '../components';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useFilteredPromotions, useToggleOptIn, useBreakpoint } from '../hooks';
import { useFilters } from '../state/FilterContext';
import { getErrorMessage } from '../utils/errors';
import { colors, spacing, layout } from '../theme';
import type { Promotion } from '../types';
import type { PromotionListScreenProps } from '../navigation';

function PromotionListContent({ navigation }: PromotionListScreenProps) {
  const { promotions, isLoading, isError, error, refetch } = useFilteredPromotions();
  const toggleOptIn = useToggleOptIn();
  const { numColumns, isMobile } = useBreakpoint();
  const { resetFilters } = useFilters();

  const handlePress = useCallback(
    (promotionId: number) => {
      navigation.navigate('PromotionDetail', { promotionId });
    },
    [navigation],
  );

  const handleToggleOptIn = useCallback(
    (promotion: Promotion) => {
      toggleOptIn.mutate({ id: promotion.id, optedIn: !promotion.optedIn });
    },
    [toggleOptIn],
  );

  const renderItem = useCallback(
    ({ item }: { item: Promotion }) => (
      <View style={[styles.cardWrapper, !isMobile && styles.cardWrapperMultiCol]}>
        <PromotionCard
          promotion={item}
          onPress={() => handlePress(item.id)}
          onToggleOptIn={() => handleToggleOptIn(item)}
          isToggling={
            toggleOptIn.isPending && toggleOptIn.variables?.id === item.id
          }
        />
      </View>
    ),
    [handlePress, handleToggleOptIn, isMobile, toggleOptIn.isPending, toggleOptIn.variables?.id],
  );

  const keyExtractor = useCallback((item: Promotion) => String(item.id), []);

  if (isError) {
    return (
      <ErrorFallback
        message={getErrorMessage(error, 'Failed to load promotions')}
        onRetry={refetch}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={isLoading ? [] : promotions}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        key={numColumns}
        numColumns={numColumns}
        contentContainerStyle={[
          styles.listContent,
          isMobile ? styles.listContentMobile : styles.listContentDesktop,
        ]}
        columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : undefined}
        ListHeaderComponent={<FilterBar />}
        ListEmptyComponent={
          isLoading ? (
            <View style={styles.skeletonContainer}>
              {Array.from({ length: 6 }).map((_, i) => (
                <View
                  key={i}
                  style={[styles.cardWrapper, !isMobile && styles.cardWrapperMultiCol]}
                >
                  <PromotionCardSkeleton />
                </View>
              ))}
            </View>
          ) : (
            <EmptyState
              title="No promotions found"
              message="Try adjusting your filters or search query to find what you're looking for."
              actionLabel="Clear Filters"
              onAction={resetFilters}
            />
          )
        }
        showsVerticalScrollIndicator={false}
        refreshing={isLoading}
        onRefresh={refetch}
      />
    </View>
  );
}

export function PromotionListScreen(props: PromotionListScreenProps) {
  return (
    <ErrorBoundary>
      <PromotionListContent {...props} />
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingBottom: spacing.xxxl,
  },
  listContentMobile: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  listContentDesktop: {
    paddingHorizontal: spacing.xxxl,
    paddingTop: spacing.lg,
    maxWidth: layout.listMaxWidth,
    alignSelf: 'center',
    width: '100%',
  },
  columnWrapper: {
    gap: spacing.lg,
  },
  cardWrapper: {
    marginBottom: spacing.lg,
  },
  cardWrapperMultiCol: {
    flex: 1,
  },
  skeletonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
});
