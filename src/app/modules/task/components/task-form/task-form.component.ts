import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ToastService } from '../../../../shared/toast/services/toast.service';
import { TabsComponent } from '../../../../shared/menu/tabs/tabs.component';
import { TabComponent } from '../../../../shared/menu/tabs/tab/tab.component';
import {
  END_FREQUENCY_VALUE,
  Frequency,
  FrequencyRule,
  FrequencyRuleForm,
  FrequencyType,
  WeekDay,
} from '../../domain/dtos/frequency.type';
import { SelectComponent } from '../../../../shared/form/components/select/select.component';
import { TaskFrequencyWeeklyComponent } from '../task-frequency-weekly/task-frequency-weekly.component';
import { toDate, todayStr, tomorrowStr } from '../../../../shared/utils/date.utils';
import { InputNumberComponent } from '../../../../shared/form/components/input-number/input-number.component';
import { TaskFrequencyRuleComponent } from '../task-frequency-rule/task-frequency-rule.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ID } from '../../../../shared/api/domain/dtos/api.dtos';
import { TaskDto } from '../../domain/dtos/task.dto';
import { getNewTask } from '../../domain/utils/task.utils';
import { Option } from '../../../../shared/form/components/base/base-input-group-form-control';
import { InputTextComponent } from '../../../../shared/form/components/input-text/input-text.component';
import { TextareaComponent } from '../../../../shared/form/components/textarea/textarea.component';
import {
  DatePickerComponent
} from '../../../../shared/form/components/date-picker/date-picker.component';

export const VALUE_NULL_DISABLED = { value: null, disabled: true };

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
    InputTextComponent,
    TextareaComponent,
    DatePickerComponent,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent {
  protected readonly Frequency = Frequency;
  readonly END_FREQUENCY: Option<END_FREQUENCY_VALUE>[] = [
    { id: '1', label: 'Date', value: 'date' },
    { id: '2', label: "Nombre d'occurence", value: 'nbOccurence' },
  ];
  readonly toastService: ToastService = inject(ToastService);
  readonly fb: FormBuilder = inject(FormBuilder);
  readonly taskService: TaskService = inject(TaskService);

  selectedfrequencyRuleIndex = signal<number | null>(null);

  taskForm: FormGroup = this.fb.group({
    name: this.fb.control<string>('', [Validators.required]),
    description: this.fb.control<string>(''),
    frequencyRules: this.fb.array([] as FormGroup[]),
  });

  frequencyRuleForm: FormGroup = this.fb.group({
    weeklyRule: this.fb.group({
      frequencyType: this.fb.control<FrequencyType>(FrequencyType.WEEKLY_BY_DAY, [
        Validators.required,
      ]),
      weekDays: this.fb.control<WeekDay[]>([]),
      repeatEvery: this.fb.control<number | null>(VALUE_NULL_DISABLED, [Validators.required]),
      periodLength: this.fb.control<number | null>(VALUE_NULL_DISABLED, [Validators.required]),
    }),
    startDate: this.fb.control<string>(todayStr(), [Validators.required]),
    end: this.fb.control<END_FREQUENCY_VALUE>('date', [Validators.required]),
    endDate: this.fb.control<string | null>(tomorrowStr(), [Validators.required]),
    endNbOccurence: this.fb.control<number | null>(VALUE_NULL_DISABLED, [Validators.required]),
  });

  constructor() {
    this.weeklyRule
      ?.get('frequencyType')
      ?.valueChanges.subscribe((frequencyType: FrequencyType) => {
        if (frequencyType === FrequencyType.WEEKLY_BY_DAY) {
          this.weeklyRule?.get('weekDays')?.enable();
          this.weeklyRule?.get('repeatEvery')?.disable();
          this.weeklyRule?.get('repeatEvery')?.patchValue(null);
          this.weeklyRule?.get('periodLength')?.disable();
          this.weeklyRule?.get('periodLength')?.patchValue(null);
        } else if (frequencyType === FrequencyType.WEEKLY_REGULAR) {
          this.weeklyRule?.get('weekDays')?.disable();
          this.weeklyRule?.get('repeatEvery')?.enable();
          this.weeklyRule?.get('repeatEvery')?.patchValue(0);
          this.weeklyRule?.get('periodLength')?.enable();
          this.weeklyRule?.get('periodLength')?.patchValue(0);
        }
      });

    this.frequencyRuleForm?.get('end')?.valueChanges.subscribe((value) => {
      if (value === 'date') {
        this.frequencyRuleForm?.get('endDate')?.setValue(tomorrowStr());
        this.frequencyRuleForm?.get('endDate')?.enable();
        this.frequencyRuleForm?.get('endNbOccurence')?.disable();
        this.frequencyRuleForm?.get('endNbOccurence')?.patchValue(null);
      } else {
        this.frequencyRuleForm?.get('endDate')?.disable();
        this.frequencyRuleForm?.get('endNbOccurence')?.enable();
        this.frequencyRuleForm?.get('endNbOccurence')?.patchValue(0);
      }
    });
  }

  get frequencyRules(): FormArray<FormGroup> {
    return this.taskForm.get('frequencyRules') as FormArray<FormGroup>;
  }

  get weeklyRule(): FormGroup {
    return this.frequencyRuleForm.get('weeklyRule') as FormGroup;
  }

  get endFrequencyValue(): END_FREQUENCY_VALUE {
    return this.frequencyRuleForm.get('end')?.value;
  }

  onAddFrequencyRule(): void {
    console.log(this.frequencyRuleForm);
    const formGroup = this.buildFrequencyRuleFormGroup(this.frequencyRuleForm.getRawValue());
    const idx = this.selectedfrequencyRuleIndex();

    if (idx === null) {
      this.frequencyRules.push(formGroup);
    } else {
      this.frequencyRules.setControl(idx, formGroup);
    }

    this.resetFrequencyRuleForm();
  }

  onEditFrequencyRule(frequencyRuleIdx: number): void {
    this.selectedfrequencyRuleIndex.set(frequencyRuleIdx);
    const formGroup = this.frequencyRules.at(frequencyRuleIdx);
    const value = formGroup.getRawValue() as FrequencyRuleForm;
    this.resetFrequencyRuleForm(value);
  }

  onDeleteFrequencyRule(frequencyRuleIdx: number): void {
    this.frequencyRules.removeAt(frequencyRuleIdx);
    if (this.selectedfrequencyRuleIndex() === frequencyRuleIdx) {
      this.onCancelEditFrequencyRule();
    }
  }

  onCancelEditFrequencyRule(): void {
    this.selectedfrequencyRuleIndex.set(null);
    this.resetFrequencyRuleForm();
  }

  onSubmitTask(): void {
    if (!this.taskForm.valid) {
      this.toastService.error("Ajout d'une nouvelle tâche", 'Formulaire invalide');
      return;
    }

    const taskName: string | undefined = this.taskForm.get('name')?.value;
    if (!taskName) {
      this.toastService.error("Ajout d'une nouvelle tâche", 'Nom invalide');
      return;
    }

    const task: TaskDto = getNewTask(taskName, this.taskForm.get('description')?.value);
    task.frequencyRules = this.frequencyRules.controls.map((fg) =>
      this.formRuleToDomain(fg.getRawValue())
    );

    this.taskService.create(task, () => this.resetAllForm());
  }

  resetAllForm(): void {
    this.resetTaskForm();
    this.resetFrequencyRuleForm();
  }

  resetTaskForm(): void {
    this.frequencyRules.clear();
    this.taskForm.reset({
      name: '',
      description: '',
      frequencyRules: [],
    });
  }

  resetFrequencyRuleForm(value?: FrequencyRuleForm): void {
    this.frequencyRuleForm.reset(
      value ?? {
        weeklyRule: {
          frequencyType: FrequencyType.WEEKLY_BY_DAY,
          weekDays: [],
          repeatEvery: null,
          periodLength: null,
        },
        startDate: todayStr(),
        end: 'date',
        endDate: tomorrowStr(),
        endNbOccurence: null,
      }
    );
  }

  formRuleToDomain(form: FrequencyRuleForm): FrequencyRule {
    return {
      id: crypto.randomUUID() as unknown as ID,
      weeklyRule: { ...form.weeklyRule },
      startDate: toDate(form.startDate)!,
      end: form.end,
      endDate: toDate(form.endDate)!,
      endNbOccurence: form.endNbOccurence,
    } as FrequencyRule;
  }

  private buildFrequencyRuleFormGroup(from: FrequencyRuleForm): FormGroup {
    const fg = this.fb.group({
      weeklyRule: this.fb.group({
        frequencyType: this.fb.control<FrequencyType>(from.weeklyRule.frequencyType, [
          Validators.required,
        ]),
        weekDays: this.fb.control<WeekDay[]>(from.weeklyRule.weekDays),
        repeatEvery: this.fb.control<number | null>(from.weeklyRule.repeatEvery),
        periodLength: this.fb.control<number | null>(from.weeklyRule.periodLength),
      }),
      startDate: this.fb.control<string>(from.startDate, [Validators.required]),
      end: this.fb.control<END_FREQUENCY_VALUE>(from.end, [Validators.required]),
      endDate: this.fb.control<string | null>(from.endDate),
      endNbOccurence: this.fb.control<number | null>(from.endNbOccurence),
    });

    return fg;
  }
}
