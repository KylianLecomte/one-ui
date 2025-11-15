import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { InputNumberComponent } from '../../../../shared/form/components/input-number/input-number.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RepetitionRuleType, RepetitionRuleTypeLabels } from '../../types/repetition-rule.type';
import { CheckboxTagGroupComponent } from '../../../../shared/form/components/checkbox-tag-group/checkbox-tag-group.component';
import { Option } from '../../../../shared/form/components/base/base-input-group-form-control';
import { RadioComponent } from '../../../../shared/form/components/radio/radio.component';
import { WeekDay } from '../../types/week-day.type';

@Component({
  selector: 'one-task-weekly-repetition',
  imports: [InputNumberComponent, ReactiveFormsModule, CheckboxTagGroupComponent, RadioComponent],
  templateUrl: './task-weekly-repetition.component.html',
  styleUrl: './task-weekly-repetition.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskWeeklyRepetitionComponent {
  protected readonly RepetitionRuleType = RepetitionRuleType;
  protected readonly RepetitionRuleTypeLabels = RepetitionRuleTypeLabels;

  weeklyForm = input.required<FormGroup>();

  readonly WEEK_DAY_OPTS: Option[] = [
    { id: WeekDay.MONDAY, value: WeekDay.MONDAY, label: 'L' },
    { id: WeekDay.TUESDAY, value: WeekDay.TUESDAY, label: 'M' },
    { id: WeekDay.WEDNESDAY, value: WeekDay.WEDNESDAY, label: 'M' },
    { id: WeekDay.THURSDAY, value: WeekDay.THURSDAY, label: 'J' },
    { id: WeekDay.FRIDAY, value: WeekDay.FRIDAY, label: 'V' },
    { id: WeekDay.SATURDAY, value: WeekDay.SATURDAY, label: 'S' },
    { id: WeekDay.SUNDAY, value: WeekDay.SUNDAY, label: 'D' },
  ];
}
