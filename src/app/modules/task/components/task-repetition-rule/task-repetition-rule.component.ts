import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { getPlurial } from '../../../../shared/utils/string.utils';
import { getValuesFromMap } from '../../../../shared/utils/record.utils';
import { toLocaleDateString } from '../../../../shared/utils/date.utils';
import { NgClass } from '@angular/common';
import { ID } from '../../../../shared/api/domain/dtos/api.dtos';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { RepetitionRule } from '../../domain/dtos/repetition-rule.dto';
import { RepetitionRuleType } from '../../domain/types/repetition-rule.type';
import { WeekDayLabels } from '../../domain/types/week-day.type';
import { Repetition, RepetitionLabels } from '../../domain/types/repetition.type';
import { EndRepetitionType } from '../../domain/types/end-repetition.type';

@Component({
  selector: 'one-task-repetition-rule',
  imports: [NgClass, ButtonComponent, FontAwesomeModule],
  templateUrl: './task-repetition-rule.component.html',
  styleUrl: './task-repetition-rule.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskRepetitionRuleComponent {
  readonly faTrashCan: IconDefinition = faTrashCan;
  repetitionRule = input.required<RepetitionRule>();
  isSelected = input<boolean>(false);
  select = output<ID>();
  delete = output<ID>();

  get repetitionRuleType(): string {
    switch (this.repetitionRule().weeklyRepetitionRule.repetitionRuleType) {
      case RepetitionRuleType.WEEKLY_BY_DAY:
        return this.repetitionRule().weeklyRepetitionRule.weekDays.length > 0
          ? `Tous les ${getValuesFromMap(this.repetitionRule().weeklyRepetitionRule.weekDays, WeekDayLabels)}`
          : '';
      case RepetitionRuleType.WEEKLY_REGULAR:
        return `${this.repetitionRule().weeklyRepetitionRule.repeatEvery} jour${getPlurial(this.repetitionRule().weeklyRepetitionRule.repeatEvery)} sur ${this.repetitionRule().weeklyRepetitionRule.periodLength}`;
      default:
        return '';
    }
  }

  get repetition(): string {
    switch (this.repetitionRule().weeklyRepetitionRule.repetitionRuleType) {
      case RepetitionRuleType.WEEKLY_BY_DAY:
      case RepetitionRuleType.WEEKLY_REGULAR:
        return getValuesFromMap(Repetition.WEEKLY, RepetitionLabels);
      default:
        return '';
    }
  }

  get startEnd(): string {
    const start = toLocaleDateString(this.repetitionRule().startDate);
    const endDate: Date | null = this.repetitionRule().endDate;
    const end = endDate ? toLocaleDateString(endDate) : null;
    const nbOcurrence = this.repetitionRule().endNbOccurence;

    if (this.repetitionRule().endRepetitionType === EndRepetitionType.DATE && end) {
      return `Du ${start} au ${end}`;
    } else if (this.repetitionRule().endRepetitionType === EndRepetitionType.NB_OCCURENCE) {
      return `${nbOcurrence} occurence${getPlurial(nbOcurrence)} à partir du ${start}`;
    }

    return '';
  }

  onSelect() {
    this.select.emit(this.repetitionRule().id);
  }

  onDelete() {
    this.delete.emit(this.repetitionRule().id);
  }
}
