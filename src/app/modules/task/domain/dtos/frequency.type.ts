import { Dto } from '../../../../shared/api/domain/dtos/api.dtos';

export type START_FREQUENCY_VALUE = 'Maintenant' | 'Date';
export type END_FREQUENCY_VALUE = 'Date' | "Nombre d'occurence";

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

export interface FrequencyRule extends Dto {
  isSelected: boolean;

  weeklyRule: WeeklyRule;

  startDate: Date;
  end: END_FREQUENCY_VALUE;
  endDate: Date;
  endNbOccurence: number;
}

export interface WeeklyRule extends Dto {
  frequencyType: FrequencyType;
  weekDays: WeekDay[];
  repeatEvery: number;
  periodLength: number;
}
