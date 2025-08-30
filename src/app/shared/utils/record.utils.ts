export function getValuesFromMap<T extends Record<string, string>>(
  value: string | string[] | null | undefined,
  map: T,
  join: string = ', '
): string {
  if (!value) return '';

  if (Array.isArray(value)) {
    return value.map((v) => map[v as keyof T] ?? v).join(', ');
  }

  return map[value as keyof T] ?? value;
}
