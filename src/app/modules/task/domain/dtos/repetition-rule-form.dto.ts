import { EndRepetition } from '../types/end-repetition.type';
import { WeeklyRepetitionRule } from './repetition-rule.dto';

export interface RepetitionRuleForm {
  weeklyRule: WeeklyRepetitionRule;
  startDate: string;
  end: EndRepetition;
  endDate: string | null;
  endNbOccurence: number | null;
}
