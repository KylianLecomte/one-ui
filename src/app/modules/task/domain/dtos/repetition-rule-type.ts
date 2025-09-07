import { Dto } from '../../../../shared/api/domain/dtos/api.dtos';

export type END_REPETITION_VALUE = 'date' | 'nbOccurence';

export const Repetition = {
  WEEKLY: 'Hebdomadaire',
  MONTHLY: 'Mensuel',
  FIX: 'Fix',
} as const;
export type Repetition = (typeof Repetition)[keyof typeof Repetition];

export const RepetitionRuleType = {
  WEEKLY_BY_DAY: 'Par jour',
  WEEKLY_REGULAR: 'Régulier',
} as const;
export type RepetitionRuleType = (typeof RepetitionRuleType)[keyof typeof RepetitionRuleType];

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

export interface RepetitionRuleForm {
  weeklyRule: WeeklyRepetitionRule;
  startDate: string;
  end: END_REPETITION_VALUE;
  endDate: string | null;
  endNbOccurence: number | null;
}

export interface RepetitionRule extends Dto {
  weeklyRepetitionRule: WeeklyRepetitionRule;
  startDate: Date;
  end: END_REPETITION_VALUE;
  endDate: Date | null;
  endNbOccurence: number | null;
}

export interface WeeklyRepetitionRule extends Dto {
  repetitionRuleType: RepetitionRuleType;
  weekDays: WeekDay[];
  repeatEvery: number | null;
  periodLength: number | null;
}
