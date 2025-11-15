import { Dto } from '../../../shared/api/domain/dtos/api.dtos';
import { EndRepetitionType } from '../types/end-repetition.type';
import { WeekDay } from '../types/week-day.type';
import { RepetitionRuleType } from '../types/repetition-rule.type';

export interface RepetitionRule extends Dto {
  weeklyRepetitionRule: WeeklyRepetitionRule;
  startDate: string;
  endRepetitionType: EndRepetitionType;
  endDate: string | null;
  endNbOccurence: number | null;
}

export interface WeeklyRepetitionRule extends Dto {
  repetitionRuleType: RepetitionRuleType;
  weekDays: WeekDay[];
  repeatEvery: number | null;
  periodLength: number | null;
}
