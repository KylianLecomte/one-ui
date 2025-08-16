import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CheckboxComponent } from '../../../../shared/components/checkbox/checkbox.component';
import { RadioComponent } from '../../../../shared/components/radio/radio.component';
import {
  InputNumberComponent
} from '../../../../shared/components/input-number/input-number.component';

@Component({
  selector: 'one-task-frequency-weekly',
  imports: [CheckboxComponent, RadioComponent, InputNumberComponent],
  templateUrl: './task-frequency-weekly.component.html',
  styleUrl: './task-frequency-weekly.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFrequencyWeeklyComponent {
  readonly WEEK_DAY = [
    ['monday', 'Lundi'],
    ['tuesday', 'Mardi'],
    ['wednesday', 'Mercredi'],
    ['thursday', 'Jeudi'],
    ['friday', 'Vendredi'],
    ['saturday', 'Samedi'],
    ['sunday', 'Dimanche'],
  ];
}
