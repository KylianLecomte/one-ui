import { FormControlState } from '@angular/forms';
import { END_FREQUENCY_VALUE, FrequencyType, WeekDay } from './frequency.type';

export interface TaskForm {
  name: string | FormControlState<string>;
  description: string | FormControlState<string>;
  frequencyRule: FrequencyRuleForm;
}

export interface FrequencyRuleForm {
  weeklyRule: FrequencyWeeklyForm;
  startDate: string | FormControlState<string>;
  end: END_FREQUENCY_VALUE | FormControlState<END_FREQUENCY_VALUE>;
  endDate: string | null | FormControlState<string | null>;
  endNbOccurence: number | null | FormControlState<number | null>;
}

export interface FrequencyWeeklyForm {
  frequencyType: FrequencyType | FormControlState<FrequencyType>;
  weekDays: WeekDay[] | FormControlState<WeekDay[]>;
  repeatEvery: number | null | FormControlState<number | null>;
  periodLength: number | null | FormControlState<number | null>;
}
