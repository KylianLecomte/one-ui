import { ChangeDetectionStrategy, Component, effect, inject, Signal, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ToastService } from '../../../../shared/toast/services/toast.service';
import { TabsComponent } from '../../../../shared/menu/tabs/tabs.component';
import { TabComponent } from '../../../../shared/menu/tabs/tab/tab.component';
import { SelectComponent } from '../../../../shared/form/components/select/select.component';
import { todayStr, tomorrowStr } from '../../../../shared/utils/date.utils';
import { InputNumberComponent } from '../../../../shared/form/components/input-number/input-number.component';
import { TaskRepetitionRuleComponent } from '../task-repetition-rule/task-repetition-rule.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TaskDto } from '../../dtos/task.dto';
import { Option } from '../../../../shared/form/components/base/base-input-group-form-control';
import { InputTextComponent } from '../../../../shared/form/components/input-text/input-text.component';
import { TextareaComponent } from '../../../../shared/form/components/textarea/textarea.component';
import { DatePickerComponent } from '../../../../shared/form/components/date-picker/date-picker.component';
import { TaskWeeklyRepetitionComponent } from '../task-weekly-repetition/task-weekly-repetition.component';
import { RepetitionRuleType } from '../../types/repetition-rule.type';
import { WeekDay } from '../../types/week-day.type';
import { EndRepetitionType } from '../../types/end-repetition.type';
import { RepetitionRule } from '../../dtos/repetition-rule.dto';
import { RepetitionLabels } from '../../types/repetition.type';
import { getNewTask } from '../../utils/task.utils';

export const VALUE_NULL_DISABLED = { value: null, disabled: true };

@Component({
  selector: 'one-task-form',
  imports: [
    ReactiveFormsModule,
    TabsComponent,
    TabComponent,
    TaskWeeklyRepetitionComponent,
    InputNumberComponent,
    SelectComponent,
    TaskRepetitionRuleComponent,
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
  protected readonly RepetitionLabels = RepetitionLabels;
  protected readonly EndRepetition = EndRepetitionType;
  readonly END_REPETITION: Option<EndRepetitionType>[] = [
    { id: '1', label: 'Date', value: EndRepetitionType.DATE },
    { id: '2', label: "Nombre d'occurence", value: EndRepetitionType.NB_OCCURENCE },
  ];

  readonly toastService: ToastService = inject(ToastService);
  readonly fb: FormBuilder = inject(FormBuilder);
  readonly taskService: TaskService = inject(TaskService);

  selectedTask: Signal<TaskDto | undefined> = this.taskService.selectedTask;
  selectedRepetitionRuleIndex = signal<number | null>(null);

  taskForm: FormGroup = this.fb.group({
    name: this.fb.control<string>('', [Validators.required]),
    description: this.fb.control<string>(''),
    repetitionRules: this.fb.array([] as FormGroup[]),
  });

  // Create component for repetitionruleform
  repetitionRuleForm: FormGroup = this.fb.group({
    weeklyRepetitionRule: this.fb.group({
      repetitionRuleType: this.fb.control<RepetitionRuleType>(RepetitionRuleType.WEEKLY_BY_DAY, [
        Validators.required,
      ]),
      weekDays: this.fb.control<WeekDay[]>([]),
      repeatEvery: this.fb.control<number | null>(VALUE_NULL_DISABLED, [Validators.required]),
      periodLength: this.fb.control<number | null>(VALUE_NULL_DISABLED, [Validators.required]),
    }),
    startDate: this.fb.control<string>(todayStr(), [Validators.required]),
    endRepetitionType: this.fb.control<EndRepetitionType>(EndRepetitionType.DATE, [
      Validators.required,
    ]),
    endDate: this.fb.control<string | null>(tomorrowStr(), [Validators.required]),
    endNbOccurence: this.fb.control<number | null>(VALUE_NULL_DISABLED, [Validators.required]),
  });

  constructor() {
    this.loadFormTaskEffect();

    this.weeklyRepetitionRule
      ?.get('repetitionRuleType')
      ?.valueChanges.subscribe((repetitionRuleType: RepetitionRuleType) => {
        if (repetitionRuleType === RepetitionRuleType.WEEKLY_BY_DAY) {
          this.weeklyRepetitionRule?.get('weekDays')?.enable();
          this.weeklyRepetitionRule?.get('repeatEvery')?.disable();
          this.weeklyRepetitionRule?.get('repeatEvery')?.patchValue(null);
          this.weeklyRepetitionRule?.get('periodLength')?.disable();
          this.weeklyRepetitionRule?.get('periodLength')?.patchValue(null);
        } else if (repetitionRuleType === RepetitionRuleType.WEEKLY_REGULAR) {
          this.weeklyRepetitionRule?.get('weekDays')?.disable();
          this.weeklyRepetitionRule?.get('repeatEvery')?.enable();
          this.weeklyRepetitionRule?.get('repeatEvery')?.patchValue(0);
          this.weeklyRepetitionRule?.get('periodLength')?.enable();
          this.weeklyRepetitionRule?.get('periodLength')?.patchValue(0);
        }
      });

    this.repetitionRuleForm?.get('endRepetitionType')?.valueChanges.subscribe((value) => {
      if (value === EndRepetitionType.DATE) {
        this.repetitionRuleForm?.get('endDate')?.setValue(tomorrowStr());
        this.repetitionRuleForm?.get('endDate')?.enable();
        this.repetitionRuleForm?.get('endNbOccurence')?.disable();
        this.repetitionRuleForm?.get('endNbOccurence')?.patchValue(null);
      } else {
        this.repetitionRuleForm?.get('endDate')?.disable();
        this.repetitionRuleForm?.get('endNbOccurence')?.enable();
        this.repetitionRuleForm?.get('endNbOccurence')?.patchValue(0);
      }
    });
  }

  get repetitionRules(): FormArray<FormGroup> {
    return this.taskForm.get('repetitionRules') as FormArray<FormGroup>;
  }

  get weeklyRepetitionRule(): FormGroup {
    return this.repetitionRuleForm.get('weeklyRepetitionRule') as FormGroup;
  }

  get endRepetitionValue(): EndRepetitionType {
    return this.repetitionRuleForm.get('endRepetitionType')?.value;
  }

  get labelBtnAddRule(): string {
    return this.selectedRepetitionRuleIndex() !== null
      ? 'Modifier la règle de répétition'
      : 'Ajouter la règle de répétition';
  }

  onAddRepetitionRule(): void {
    const formGroup = this.buildRepetitionRuleFormGroup(this.repetitionRuleForm.getRawValue());
    const idx = this.selectedRepetitionRuleIndex();

    if (idx === null) {
      this.repetitionRules.push(formGroup);
    } else {
      this.repetitionRules.setControl(idx, formGroup);
    }

    this.resetRepetitionRuleForm();
    this.selectedRepetitionRuleIndex.set(null);
  }

  onEditRepetitionRule(repetitionRuleIdx: number): void {
    this.selectedRepetitionRuleIndex.set(repetitionRuleIdx);
    const formGroup = this.repetitionRules.at(repetitionRuleIdx);
    const value: RepetitionRule = formGroup.getRawValue();
    this.resetRepetitionRuleForm(value);
  }

  onDeleteRepetitionRule(repetitionRuleIdx: number): void {
    this.repetitionRules.removeAt(repetitionRuleIdx);
    if (this.selectedRepetitionRuleIndex() === repetitionRuleIdx) {
      this.onCancelEditRepetitionRule();
    }
  }

  onCancelTask(): void {
    this.taskService.updateStateSelected();
    this.onCancelEditRepetitionRule();
  }

  onCancelEditRepetitionRule(): void {
    this.selectedRepetitionRuleIndex.set(null);
    this.resetRepetitionRuleForm();
  }

  onSubmitTask(): void {
    if (!this.taskForm.valid) {
      this.toastService.error("Ajout d'une nouvelle tâche", 'Formulaire invalide');
      return;
    }

    const selectedTask: TaskDto | undefined = this.selectedTask();

    if (selectedTask) {
      this.submitUpdatingTask(selectedTask);
    } else {
      this.submitNewTask();
    }
  }

  submitNewTask(): void {
    const task: TaskDto = getNewTask(
      this.taskForm.get('name')!.value,
      this.taskForm.get('description')?.value
    );
    task.repetitionRules = this.repetitionRules.controls.map((fg) => fg.getRawValue());
    this.taskService.create(task, () => this.resetAllForm());
  }

  submitUpdatingTask(selectedTask: TaskDto): void {
    const task: TaskDto = {
      ...selectedTask,
      name: this.taskForm.get('name')!.value,
      description: this.taskForm.get('description')?.value,
      repetitionRules: this.repetitionRules.controls.map((fg) => fg.getRawValue()),
    };
    this.taskService.update(task, () => this.resetAllForm());
  }

  resetAllForm(forms?: { taskForm?: TaskDto; ruleForm?: RepetitionRule }): void {
    this.resetTaskForm(forms?.taskForm);
    this.resetRepetitionRuleForm(forms?.ruleForm);
  }

  resetTaskForm(value?: TaskDto): void {
    // TODO create constant typed
    this.taskForm.patchValue({
      name: value?.name || '',
      description: value?.description || '',
    });

    this.repetitionRules.clear();

    if (value?.repetitionRules) {
      value.repetitionRules.forEach((rule) =>
        this.repetitionRules.push(this.buildRepetitionRuleFormGroup(rule))
      );
    }
  }

  resetRepetitionRuleForm(value?: RepetitionRule): void {
    // TODO create constant typed
    this.repetitionRuleForm.reset(
      value ?? {
        weeklyRepetitionRule: {
          repetitionRuleType: RepetitionRuleType.WEEKLY_BY_DAY,
          weekDays: [],
          repeatEvery: null,
          periodLength: null,
        },
        startDate: todayStr(),
        endRepetitionType: EndRepetitionType.DATE,
        endDate: tomorrowStr(),
        endNbOccurence: null,
      }
    );
  }

  private loadFormTaskEffect(): void {
    effect(() => {
      const task: TaskDto | undefined = this.selectedTask();
      this.resetAllForm(task ? { taskForm: { ...task } } : undefined);

      if (!task) {
        this.onCancelTask();
      }
    });
  }

  // TODO Move it in other file
  private buildRepetitionRuleFormGroup(ruleForm: RepetitionRule): FormGroup {
    return this.fb.group({
      weeklyRepetitionRule: this.fb.group({
        repetitionRuleType: this.fb.control<RepetitionRuleType>(
          ruleForm.weeklyRepetitionRule.repetitionRuleType,
          [Validators.required]
        ),
        weekDays: this.fb.control<WeekDay[]>(ruleForm.weeklyRepetitionRule.weekDays),
        repeatEvery: this.fb.control<number | null>(ruleForm.weeklyRepetitionRule.repeatEvery),
        periodLength: this.fb.control<number | null>(ruleForm.weeklyRepetitionRule.periodLength),
      }),
      startDate: this.fb.control<string>(ruleForm.startDate, [Validators.required]),
      endRepetitionType: this.fb.control<EndRepetitionType>(ruleForm.endRepetitionType, [
        Validators.required,
      ]),
      endDate: this.fb.control<string | null>(ruleForm.endDate),
      endNbOccurence: this.fb.control<number | null>(ruleForm.endNbOccurence),
    });
  }
}
