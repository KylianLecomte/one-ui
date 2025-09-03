export function getPlurial(value: number | null | undefined) {
  return value && value > 1 ? 's' : '';
}
