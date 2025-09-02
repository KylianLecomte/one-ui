import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ToastService } from '../../../../shared/toast/services/toast.service';
import { TabsComponent } from '../../../../shared/menu/tabs/tabs.component';
import { TabComponent } from '../../../../shared/menu/tabs/tab/tab.component';
import {
  END_FREQUENCY_VALUE,
  Frequency,
  FrequencyRule,
  FrequencyType,
  WeekDay,
} from '../../domain/dtos/frequency.type';
import {
  SelectComponent,
  SelectOption,
} from '../../../../shared/form/components/select/select.component';
import { TaskFrequencyWeeklyComponent } from '../task-frequency-weekly/task-frequency-weekly.component';
import { format, today, tomorow } from '../../../../shared/utils/date.utils';
import { InputNumberComponent } from '../../../../shared/form/components/input-number/input-number.component';
import { TaskFrequencyRuleComponent } from '../task-frequency-rule/task-frequency-rule.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ID } from '../../../../shared/api/domain/dtos/api.dtos';
import { FrequencyRuleForm, TaskForm } from '../../domain/dtos/frequency-rule-form.type';
import { TaskDto } from '../../domain/dtos/task.dto';
import { getNewTask } from '../../domain/utils/task.utils';

@Component({
  selector: 'one-task-form',
  imports: [
    ReactiveFormsModule,
    TabsComponent,
    TabComponent,
    TaskFrequencyWeeklyComponent,
    InputNumberComponent,
    SelectComponent,
    TaskFrequencyRuleComponent,
    ButtonComponent,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent {
  protected readonly Frequency = Frequency;
  readonly END_FREQUENCY: SelectOption<END_FREQUENCY_VALUE>[] = [
    { label: 'Date', value: 'Date' },
    { label: "Nombre d'occurence", value: "Nombre d'occurence" },
  ];
  readonly toastService: ToastService = inject(ToastService);
  readonly formBuilder: FormBuilder = inject(FormBuilder);
  readonly taskService: TaskService = inject(TaskService);

  frequencyRules = signal<FrequencyRule[]>([]);
  editingFrequencyRule = computed<boolean>(() => {
    return !!this.frequencyRules().find((rule) => rule.isSelected);
  });
  task: FormGroup = this.formBuilder.group({
    name: this.formBuilder.control<string>('', [Validators.required]),
    description: this.formBuilder.control<string>('', []),
    frequencyRule: this.formBuilder.group({
      weeklyRule: this.formBuilder.group({
        frequencyType: this.formBuilder.control<FrequencyType>(FrequencyType.WEEKLY_BY_DAY, [
          Validators.required,
        ]),
        weekDays: this.formBuilder.control<WeekDay[]>([], []),
        repeatEvery: this.formBuilder.control<number | null>({ value: null, disabled: true }, [
          Validators.required,
        ]),
        periodLength: this.formBuilder.control<number | null>({ value: null, disabled: true }, [
          Validators.required,
        ]),
      }),

      startDate: this.formBuilder.control<string>(today(), [Validators.required]),
      end: this.formBuilder.control<END_FREQUENCY_VALUE>('Date', [Validators.required]),
      endDate: this.formBuilder.control<string | null>(tomorow(), [Validators.required]),
      endNbOccurence: this.formBuilder.control<number | null>(null, [Validators.required]),
    }),
  });
  private readonly DEFAULT_VALUE_FORM_GROUP_TASK: TaskForm = {
    name: '',
    description: '',
    frequencyRule: {
      weeklyRule: {
        weekDays: [],
        frequencyType: FrequencyType.WEEKLY_BY_DAY,
        repeatEvery: { value: null, disabled: true },
        periodLength: { value: null, disabled: true },
      },
      startDate: today(),
      end: 'Date',
      endDate: tomorow(),
      endNbOccurence: null,
    },
  };

  constructor() {
    this.weeklyRule
      ?.get('frequencyType')
      ?.valueChanges.subscribe((frequencyType: FrequencyType) => {
        if (frequencyType === FrequencyType.WEEKLY_BY_DAY) {
          this.weeklyRule?.get('weekDays')?.enable();
          this.weeklyRule?.get('repeatEvery')?.disable();
          this.weeklyRule?.get('periodLength')?.disable();
        } else if (frequencyType === FrequencyType.WEEKLY_REGULAR) {
          this.weeklyRule?.get('weekDays')?.disable();
          this.weeklyRule?.get('repeatEvery')?.enable();
          this.weeklyRule?.get('periodLength')?.enable();
        }
      });

    this.frequencyRule?.get('end')?.valueChanges.subscribe((value) => {
      if (value === 'Date') {
        this.frequencyRule?.get('endDate')?.setValue(tomorow());
        this.frequencyRule?.get('endDate')?.enable();
        this.frequencyRule?.get('endNbOccurence')?.disable();
      } else {
        this.frequencyRule?.get('endDate')?.disable();
        this.frequencyRule?.get('endNbOccurence')?.enable();
      }
    });
  }

  get frequencyRule(): FormGroup {
    return this.task.get('frequencyRule') as FormGroup;
  }

  get endFrequencyValue(): END_FREQUENCY_VALUE {
    return this.frequencyRule.get('end')?.value;
  }

  get weeklyRule(): FormGroup {
    return this.frequencyRule.get('weeklyRule') as FormGroup;
  }

  onAddFrequencyRule(): void {
    const newFrequencyRule: FrequencyRule = {
      id: this.frequencyRules().length + 1,
      isSelected: false,
      weeklyRule: {
        frequencyType: this.weeklyRule.get('frequencyType')?.value,
        weekDays: this.weeklyRule.get('weekDays')?.value,
        repeatEvery: this.weeklyRule.get('repeatEvery')?.value,
        periodLength: this.weeklyRule.get('periodLength')?.value,
      },
      startDate: new Date(this.frequencyRule.get('startDate')?.value),
      end: this.frequencyRule.get('end')?.value,
      endDate: new Date(this.frequencyRule.get('endDate')?.value),
      endNbOccurence: this.frequencyRule.get('endNbOccurence')?.value,
    };
    console.log(newFrequencyRule);

    this.frequencyRules.set([...this.frequencyRules(), newFrequencyRule]);
    console.log(this.frequencyRules());
    this.resetFormFrequency(this.DEFAULT_VALUE_FORM_GROUP_TASK.frequencyRule);
  }

  onSelectTaskFrequencyRule(idTaskFrequencyRule: ID): void {
    let selected: FrequencyRule | null = null;

    this.frequencyRules.set([
      ...this.frequencyRules().map((rule: FrequencyRule) => {
        if (rule.id === idTaskFrequencyRule) {
          selected = rule;
        }
        return { ...rule, isSelected: rule.id === idTaskFrequencyRule };
      }),
    ]);

    if (selected) {
      this.resetFormFrequency(selected);
    }
  }

  onDeleteTaskFrequencyRule(idTaskFrequencyRule: ID): void {
    this.frequencyRules.set([
      ...this.frequencyRules().filter((rule) => rule.id !== idTaskFrequencyRule),
    ]);
  }

  onCancelEditingFrequencyRule(): void {
    this.onSelectTaskFrequencyRule(null);
    this.resetFormFrequency(this.DEFAULT_VALUE_FORM_GROUP_TASK.frequencyRule);
  }

  onSubmitAddNewTask(): void {
    if (!this.task.valid) {
      this.toastService.error("Ajout d'une nouvelle tâche", 'Formulaire invalide');
      return;
    }

    const taskName: string | undefined = this.task.get('name')?.value;
    if (!taskName) {
      this.toastService.error("Ajout d'une nouvelle tâche", 'Nom invalide');
      return;
    }

    const task: TaskDto = getNewTask(taskName, this.task.get('description')?.value);

    this.taskService.create(task, () => this.resetForm());
  }

  resetForm(): void {
    this.task.reset();
  }

  resetFormFrequency(valueToReset: FrequencyRuleForm): void {
    this.frequencyRule.reset({
      ...valueToReset,
      endDate: format(new Date(valueToReset.endDate as string)),
      startDate: format(new Date(valueToReset.startDate as string)),
    });
  }
}
