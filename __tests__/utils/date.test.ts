import { formatDate, isExpired, isWithinDateRange, getDaysRemaining } from '../../src/utils/date';

describe('formatDate', () => {
  it('formats a date string to readable format', () => {
    const result = formatDate('2026-08-15');
    expect(result).toContain('Aug');
    expect(result).toContain('15');
    expect(result).toContain('2026');
  });
});

describe('isExpired', () => {
  it('returns true for past dates', () => {
    expect(isExpired('2020-01-01')).toBe(true);
  });

  it('returns false for future dates', () => {
    expect(isExpired('2030-12-31')).toBe(false);
  });
});

describe('isWithinDateRange', () => {
  it('returns true when no range is set', () => {
    expect(isWithinDateRange('2026-01-01', '2026-12-31', null, null)).toBe(true);
  });

  it('returns true when promotion overlaps range', () => {
    expect(isWithinDateRange('2026-06-01', '2026-09-30', '2026-08-01', '2026-10-31')).toBe(true);
  });

  it('returns false when promotion ends before range start', () => {
    expect(isWithinDateRange('2026-01-01', '2026-03-31', '2026-06-01', '2026-12-31')).toBe(false);
  });

  it('returns false when promotion starts after range end', () => {
    expect(isWithinDateRange('2026-10-01', '2026-12-31', '2026-01-01', '2026-06-30')).toBe(false);
  });
});

describe('getDaysRemaining', () => {
  it('returns 0 for past dates', () => {
    expect(getDaysRemaining('2020-01-01')).toBe(0);
  });

  it('returns a positive number for future dates', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 10);
    const dateStr = futureDate.toISOString().split('T')[0];
    const result = getDaysRemaining(dateStr);
    expect(result).toBeGreaterThanOrEqual(9);
    expect(result).toBeLessThanOrEqual(11);
  });
});
