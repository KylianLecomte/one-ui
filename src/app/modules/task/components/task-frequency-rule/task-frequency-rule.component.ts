import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Frequency, FrequencyRule, FrequencyType, WeekDay } from '../../domain/dtos/frequency.type';
import { getPlurial } from '../../../../shared/utils/string.utils';
import { getValuesFromMap } from '../../../../shared/utils/record.utils';
import { toLocaleString } from '../../../../shared/utils/date.utils';
import { NgClass } from '@angular/common';
import { ID } from '../../../../shared/api/domain/dtos/api.dtos';

@Component({
  selector: 'one-task-frequency-rule',
  imports: [NgClass],
  templateUrl: './task-frequency-rule.component.html',
  styleUrl: './task-frequency-rule.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFrequencyRuleComponent {
  protected readonly FrequencyType = FrequencyType;
  frequencyRule = input.required<FrequencyRule>();
  select = output<ID>();

  get frequencyType(): string {
    switch (this.frequencyRule().frequencyType) {
      case 'WEEKLY_BY_DAY':
        return this.frequencyRule().weekDay.length > 0
          ? `Tous les ${getValuesFromMap(this.frequencyRule().weekDay, WeekDay)}`
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
        return getValuesFromMap(Frequency.WEEKLY, Frequency);
      default:
        return '';
    }
  }

  get startEnd(): string {
    const start = toLocaleString(this.frequencyRule().startDate);
    const end = toLocaleString(this.frequencyRule().endDate);
    const nbOcurrence = this.frequencyRule().endNbOccurence;

    if (this.frequencyRule().end === 'Date') {
      return `Du ${start} au ${end}`;
    } else if (this.frequencyRule().end === "Nombre d'occurence") {
      return `${nbOcurrence} occurence${getPlurial(nbOcurrence)} à partir du ${start}`;
    }

    return '';
  }

  onSelect() {
    console.log('onSelect', this.frequencyRule());
    this.select.emit(this.frequencyRule().id);
  }
}
