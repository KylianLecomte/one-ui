export const LANGUAGES = 'fr-FR';
export const TIME_ZONE = 'UTC';

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function today(): string {
  return new Date().toISOString().split('T')[0];
}

export function tomorow(): string {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return formatDate(tomorrow);
}

export function toLocaleString(date: Date | string) {
  return new Date(date).toLocaleDateString(LANGUAGES, { timeZone: TIME_ZONE });
}

export function toLocalDateString(date: Date | string) {
  return new Date(date).toLocaleDateString(LANGUAGES, { timeZone: TIME_ZONE });
}

export function toLocalTimeString(date: Date | string) {
  return new Date(date).toLocaleTimeString(LANGUAGES, { timeZone: TIME_ZONE });
}
