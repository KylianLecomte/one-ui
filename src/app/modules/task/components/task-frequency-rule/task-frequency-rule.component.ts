import { Component, input } from '@angular/core';
import { Frequency, FrequencyRule } from '../../domain/dtos/frequency.type';
import { getPlurial } from '../../../../shared/utils/string.utils';

@Component({
  selector: 'one-task-frequency-rule',
  imports: [],
  templateUrl: './task-frequency-rule.component.html',
  styleUrl: './task-frequency-rule.component.scss',
})
export class TaskFrequencyRuleComponent {
  frequencyRule = input.required<FrequencyRule>();
  get frequencyType(): string {
    switch (this.frequencyRule().frequencyType) {
      case 'WEEKLY_BY_DAY':
        return this.frequencyRule().weekDay.length > 0
          ? `Les ${this.frequencyRule().weekDay.join(', ')}`
          : '';
      case 'WEEKLY_REGULAR':
        return `${this.frequencyRule().repeatEvery} jour${getPlurial(this.frequencyRule().repeatEvery)} sur ${this.frequencyRule().periodLength}`;
      default:
        return '';
    }
  }

  get frequency(): string {
    switch (this.frequencyRule().frequencyType) {
      case 'WEEKLY_BY_DAY':
      case 'WEEKLY_REGULAR':
        return Frequency.WEEKLY;
      default:
        return '';
    }
  }
}
