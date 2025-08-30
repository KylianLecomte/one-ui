export const Frequency = {
  WEEKLY: 'Hebdomadaire',
  MONTHLY: 'Mensuel',
  FIX: 'Fix',
} as const;
export type Frequency = (typeof Frequency)[keyof typeof Frequency];

export const FrequencyType = {
  WEEKLY_BY_DAY: 'WEEKLY_BY_DAY',
  WEEKLY_REGULAR: 'WEEKLY_REGULAR',
} as const;
export type FrequencyType = (typeof FrequencyType)[keyof typeof FrequencyType];

export const WeekDay = {
  MONDAY: 'lundi',
  TUESDAY: 'mardi',
  WEDNESDAY: 'mercredi',
  THURSDAY: 'jeudi',
  FRIDAY: 'vendredi',
  SATURDAY: 'samedi',
  SUNDAY: 'dimanche',
} as const;
export type WeekDay = (typeof WeekDay)[keyof typeof WeekDay];

export interface FrequencyRule {
  frequencyType: FrequencyType;
  weekDay: WeekDay[];
  repeatEvery: number;
  periodLength: number;
  start: Date;
  startDate: Date;
  end: Date;
  endDate: Date;
  endNbOccurence: number;
}
