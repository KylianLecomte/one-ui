import { Dto } from '../../../../shared/api/domain/dtos/api.dtos';

export type END_FREQUENCY_VALUE = 'date' | 'nbOccurence';

export const Frequency = {
  WEEKLY: 'Hebdomadaire',
  MONTHLY: 'Mensuel',
  FIX: 'Fix',
} as const;
export type Frequency = (typeof Frequency)[keyof typeof Frequency];

export const FrequencyType = {
  WEEKLY_BY_DAY: 'Par jour',
  WEEKLY_REGULAR: 'Régulier',
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

export interface FrequencyRuleForm {
  weeklyRule: WeeklyRule;
  startDate: string;
  end: END_FREQUENCY_VALUE;
  endDate: string | null;
  endNbOccurence: number | null;
}

export interface FrequencyRule extends Dto {
  weeklyRule: WeeklyRule;
  startDate: Date;
  end: END_FREQUENCY_VALUE;
  endDate: Date | null;
  endNbOccurence: number | null;
}

export interface WeeklyRule extends Dto {
  frequencyType: FrequencyType;
  weekDays: WeekDay[];
  repeatEvery: number | null;
  periodLength: number | null;
}
