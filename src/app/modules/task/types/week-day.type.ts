export const WeekDay = {
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
  SATURDAY: 'SATURDAY',
  SUNDAY: 'SUNDAY',
} as const;
export type WeekDay = (typeof WeekDay)[keyof typeof WeekDay];
export const WeekDayLabels: Record<WeekDay, string> = {
  MONDAY: 'lundi',
  TUESDAY: 'mardi',
  WEDNESDAY: 'mercredi',
  THURSDAY: 'jeudi',
  FRIDAY: 'vendredi',
  SATURDAY: 'samedi',
  SUNDAY: 'dimanche',
};
