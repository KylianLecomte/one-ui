export const LANGUAGES = 'fr-FR';
export const TIME_ZONE = 'Europe/Paris';

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

export function toLocaleDateString(date: Date | string): string {
  if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const [y, m, d] = date.split('-');
    return `${d}/${m}/${y}`;
  }
  return new Date(date).toLocaleDateString(LANGUAGES, { timeZone: TIME_ZONE });
}
