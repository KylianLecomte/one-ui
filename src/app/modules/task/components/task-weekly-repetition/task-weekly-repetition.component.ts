import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { InputNumberComponent } from '../../../../shared/form/components/input-number/input-number.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RepetitionRuleType, WeekDay } from '../../domain/dtos/repetition-rule-type';
import { CheckboxTagGroupComponent } from '../../../../shared/form/components/checkbox-tag-group/checkbox-tag-group.component';
import { Option } from '../../../../shared/form/components/base/base-input-group-form-control';
import { RadioComponent } from '../../../../shared/form/components/radio/radio.component';
import { InputTextComponent } from '../../../../shared/form/components/input-text/input-text.component';

@Component({
  selector: 'one-task-weekly-repetition',
  imports: [
    InputNumberComponent,
    ReactiveFormsModule,
    CheckboxTagGroupComponent,
    RadioComponent,
    InputTextComponent,
  ],
  templateUrl: './task-weekly-repetition.component.html',
  styleUrl: './task-weekly-repetition.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskWeeklyRepetitionComponent {
  protected readonly RepetitionRuleType = RepetitionRuleType;

  weeklyForm = input.required<FormGroup>();

  readonly WEEK_DAY_OPTS: Option[] = [
    { id: 'MONDAY', value: WeekDay.MONDAY, label: 'L' },
    { id: 'TUESDAY', value: WeekDay.TUESDAY, label: 'M' },
    { id: 'WEDNESDAY', value: WeekDay.WEDNESDAY, label: 'M' },
    { id: 'THURSDAY', value: WeekDay.THURSDAY, label: 'J' },
    { id: 'FRIDAY', value: WeekDay.FRIDAY, label: 'V' },
    { id: 'SATURDAY', value: WeekDay.SATURDAY, label: 'S' },
    { id: 'SUNDAY', value: WeekDay.SUNDAY, label: 'D' },
  ];
}
