import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RadioComponent } from '../../../../shared/form/components/radio/radio.component';
import { InputNumberComponent } from '../../../../shared/form/components/input-number/input-number.component';
import { CheckboxTagComponent } from '../../../../shared/form/components/checkbox-tag/checkbox-tag.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FrequencyType } from '../../../../shared/frequence/dtos/frequency.type';

@Component({
  selector: 'one-task-frequency-weekly',
  imports: [RadioComponent, InputNumberComponent, CheckboxTagComponent, ReactiveFormsModule],
  templateUrl: './task-frequency-weekly.component.html',
  styleUrl: './task-frequency-weekly.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFrequencyWeeklyComponent {
  protected readonly FrequencyType = FrequencyType;
  weeklyForm = input.required<FormGroup>();
  readonly WEEK_DAY = [
    ['monday', 'L'],
    ['tuesday', 'M'],
    ['wednesday', 'M'],
    ['thursday', 'J'],
    ['friday', 'V'],
    ['saturday', 'S'],
    ['sunday', 'D'],
  ];
}
