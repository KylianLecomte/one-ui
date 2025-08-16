import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RadioComponent } from '../../../../shared/components/radio/radio.component';
import { InputNumberComponent } from '../../../../shared/components/input-number/input-number.component';
import { CheckboxTagComponent } from '../../../../shared/components/checkbox-tag/checkbox-tag.component';

@Component({
  selector: 'one-task-frequency-weekly',
  imports: [RadioComponent, InputNumberComponent, CheckboxTagComponent],
  templateUrl: './task-frequency-weekly.component.html',
  styleUrl: './task-frequency-weekly.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFrequencyWeeklyComponent {
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
