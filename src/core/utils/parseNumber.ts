export function parseNumber(
  value: string | number | undefined | null,
): number | null {
  if (value == null) {
    return null;
  }

  if (typeof value === 'number') {
    return value;
  }

  const trimmed = value.trim();
  const NUMBER_REGEX = /[^\d.]/;
  if (NUMBER_REGEX.test(trimmed)) {
    return null;
  }

  const parsed = parseFloat(trimmed);
  if (isNaN(parsed)) {
    return null;
  }

  return parsed;
}
