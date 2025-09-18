import { EndRepetitionType } from '../types/end-repetition.type';
import { WeeklyRepetitionRule } from './repetition-rule.dto';

export interface RepetitionRuleForm {
  weeklyRule: WeeklyRepetitionRule;
  startDate: string;
  endRepetitionType: EndRepetitionType;
  endDate: string | null;
  endNbOccurence: number | null;
}
