import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RadioComponent } from '../../../../shared/form/components/radio/radio.component';
import { InputNumberComponent } from '../../../../shared/form/components/input-number/input-number.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FrequencyType } from '../../../../shared/frequence/dtos/frequency.type';
import { CheckboxTagGroupComponent } from '../../../../shared/form/components/checkbox-tag-group/checkbox-tag-group.component';
import { Option } from '../../../../shared/form/components/base/base-input-group-form-control';

@Component({
  selector: 'one-task-frequency-weekly',
  imports: [RadioComponent, InputNumberComponent, ReactiveFormsModule, CheckboxTagGroupComponent],
  templateUrl: './task-frequency-weekly.component.html',
  styleUrl: './task-frequency-weekly.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFrequencyWeeklyComponent {
  protected readonly FrequencyType = FrequencyType;

  weeklyForm = input.required<FormGroup>();

  readonly WEEK_DAY: Option[] = [
    { id: 'MONDAY', value: 'MONDAY', label: 'L' },
    { id: 'TUESDAY', value: 'TUESDAY', label: 'M' },
    { id: 'WEDNESDAY', value: 'WEDNESDAY', label: 'M' },
    { id: 'THURSDAY', value: 'THURSDAY', label: 'J' },
    { id: 'FRIDAY', value: 'FRIDAY', label: 'V' },
    { id: 'SATURDAY', value: 'SATURDAY', label: 'S' },
    { id: 'SUNDAY', value: 'SUNDAY', label: 'D' },
  ];
}
