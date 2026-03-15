export function formatDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function isExpired(endDate: string): boolean {
  const end = new Date(endDate + 'T23:59:59');
  return end < new Date();
}

export function isWithinDateRange(
  startDate: string,
  endDate: string,
  rangeStart: string | null,
  rangeEnd: string | null,
): boolean {
  if (!rangeStart && !rangeEnd) return true;

  const promoStart = new Date(startDate);
  const promoEnd = new Date(endDate);

  if (rangeStart) {
    const filterStart = new Date(rangeStart);
    if (promoEnd < filterStart) return false;
  }

  if (rangeEnd) {
    const filterEnd = new Date(rangeEnd);
    if (promoStart > filterEnd) return false;
  }

  return true;
}

export function getDaysRemaining(endDate: string): number {
  const end = new Date(endDate + 'T23:59:59');
  const now = new Date();
  const diff = end.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function formatDaysRemaining(days: number): string {
  return `${days} day${days !== 1 ? 's' : ''}`;
}
