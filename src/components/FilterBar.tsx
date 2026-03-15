import React from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../theme';
import { useFilters } from '../state/FilterContext';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { ALL_CATEGORIES, ALL_STATUSES } from '../types';

interface FilterChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

function FilterChip({ label, selected, onPress }: FilterChipProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Filter by ${label}`}
      accessibilityState={{ selected }}
      style={[styles.chip, selected && styles.chipSelected]}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

interface FilterChipRowProps<T extends string> {
  label: string;
  options: readonly T[];
  selected: T;
  onSelect: (value: T) => void;
  formatLabel?: (value: T) => string;
}

function FilterChipRow<T extends string>({
  label,
  options,
  selected,
  onSelect,
  formatLabel,
}: FilterChipRowProps<T>) {
  return (
    <View style={styles.filterSection}>
      <Text style={styles.filterLabel}>{label}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
      >
        {options.map((option) => (
          <FilterChip
            key={option}
            label={formatLabel ? formatLabel(option) : option}
            selected={selected === option}
            onPress={() => onSelect(option)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function formatStatusLabel(status: string): string {
  return status === 'All' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1);
}

export function FilterBar() {
  const { isMobile } = useBreakpoint();
  const {
    filters: { category, status, searchQuery },
    setCategory,
    setStatus,
    setSearchQuery,
    resetFilters,
  } = useFilters();

  const hasActiveFilters = category !== 'All' || status !== 'All' || searchQuery !== '';

  return (
    <View style={[styles.container, isMobile && styles.containerMobile]}>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search promotions..."
          placeholderTextColor={colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
          accessibilityLabel="Search promotions"
          accessibilityRole="search"
        />
        {hasActiveFilters && (
          <Pressable
            onPress={resetFilters}
            accessibilityRole="button"
            accessibilityLabel="Clear all filters"
            style={styles.clearButton}
          >
            <Text style={styles.clearText}>Clear</Text>
          </Pressable>
        )}
      </View>

      <FilterChipRow
        label="Category"
        options={ALL_CATEGORIES}
        selected={category}
        onSelect={setCategory}
      />

      <FilterChipRow
        label="Status"
        options={ALL_STATUSES}
        selected={status}
        onSelect={setStatus}
        formatLabel={formatStatusLabel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  containerMobile: {
    borderRadius: 0,
    marginHorizontal: -spacing.lg,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    ...typography.body,
    color: colors.textPrimary,
    backgroundColor: colors.background,
  },
  clearButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.danger,
  },
  clearText: {
    ...typography.caption,
    color: colors.textInverse,
    fontWeight: '600',
  },
  filterSection: {
    marginBottom: spacing.sm,
  },
  filterLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  chipRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.round,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  chipTextSelected: {
    color: colors.textInverse,
  },
});
