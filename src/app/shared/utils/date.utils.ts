import { formatDate } from '@angular/common';

export const LANGUAGES = 'fr-FR';
export const TIME_ZONE = 'UTC';

export function format(date: Date): string {
  console.log(date.toISOString().split('T')[0]);
  console.log(formatDate(date, 'yyyy-MM-dd', 'en-US'));

  return formatDate(date, 'yyyy-MM-dd', 'en-US');
  // return formatDate(date, 'dd-MM-yyyy', 'fr-FR');
}

export function today(): string {
  return format(new Date());
}

export function tomorow(): string {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return format(tomorrow);
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
