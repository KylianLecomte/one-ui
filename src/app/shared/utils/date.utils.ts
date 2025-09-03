export const LANGUAGES = 'fr-FR';
export const TIME_ZONE = 'UTC';

export function toStringFormDate(d: Date | null | undefined): string | null {
  if (!d) return null;
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function toDate(s: string | null | undefined): Date | null {
  if (!s) return null;
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1, 0, 0, 0, 0);
}

export function todayStr(): string {
  return toStringFormDate(new Date())!;
}

export function tomorrowStr(): string {
  const t = new Date();
  t.setDate(t.getDate() + 1);
  return toStringFormDate(t)!;
}

export function toLocaleString(date: Date | string): string {
  return new Date(date).toLocaleDateString(LANGUAGES, { timeZone: TIME_ZONE });
}

export function toLocalDateString(date: Date | string): string {
  return new Date(date).toLocaleDateString(LANGUAGES, { timeZone: TIME_ZONE });
}

export function toLocalTimeString(date: Date | string): string {
  return new Date(date).toLocaleTimeString(LANGUAGES, { timeZone: TIME_ZONE });
}
