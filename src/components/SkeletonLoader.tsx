import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, type ViewStyle } from 'react-native';
import { colors, borderRadius, spacing } from '../theme';

interface SkeletonLoaderProps {
  width?: ViewStyle['width'];
  height?: number;
  borderRadiusSize?: number;
  style?: ViewStyle;
}

export function SkeletonLoader({
  width = '100%',
  height = 20,
  borderRadiusSize = borderRadius.md,
  style,
}: SkeletonLoaderProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      accessibilityRole="none"
      accessibilityLabel="Loading content"
      style={[
        styles.skeleton,
        { width, height, borderRadius: borderRadiusSize, opacity },
        style,
      ]}
    />
  );
}

export function PromotionCardSkeleton() {
  return (
    <View
      style={styles.card}
      accessibilityRole="none"
      accessibilityLabel="Loading promotion"
    >
      <SkeletonLoader height={150} borderRadiusSize={0} />
      <View style={styles.cardContent}>
        <SkeletonLoader width={80} height={22} borderRadiusSize={borderRadius.round} />
        <SkeletonLoader height={20} style={styles.titleSkeleton} />
        <SkeletonLoader height={14} />
        <SkeletonLoader width="60%" height={14} style={styles.descriptionSkeleton} />
        <View style={styles.cardFooter}>
          <SkeletonLoader width={120} height={14} />
          <SkeletonLoader width={90} height={36} borderRadiusSize={borderRadius.md} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: colors.skeleton,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  cardContent: {
    padding: spacing.lg,
  },
  titleSkeleton: {
    marginTop: spacing.md,
  },
  descriptionSkeleton: {
    marginTop: spacing.xs,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
});
