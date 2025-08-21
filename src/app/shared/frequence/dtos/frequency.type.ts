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
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
  SATURDAY: 'SATURDAY',
  SUNDAY: 'SUNDAY',
} as const;
export type WeekDay = (typeof WeekDay)[keyof typeof WeekDay];

export interface FrequencyRule {
  frequencyType: FrequencyType;
  weekDay: WeekDay[];
  repeatEvery: number;
  periodLength: number;
  start: Date;
  endDate: Date;
  endNbOccurence: number;
}
