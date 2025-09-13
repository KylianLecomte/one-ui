import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ToastService } from '../../../../shared/toast/services/toast.service';
import { TabsComponent } from '../../../../shared/menu/tabs/tabs.component';
import { TabComponent } from '../../../../shared/menu/tabs/tab/tab.component';
import { SelectComponent } from '../../../../shared/form/components/select/select.component';
import { toDate, todayStr, tomorrowStr } from '../../../../shared/utils/date.utils';
import { InputNumberComponent } from '../../../../shared/form/components/input-number/input-number.component';
import { TaskRepetitionRuleComponent } from '../task-repetition-rule/task-repetition-rule.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TaskDto } from '../../domain/dtos/task.dto';
import { getNewTask } from '../../domain/utils/task.utils';
import { Option } from '../../../../shared/form/components/base/base-input-group-form-control';
import { InputTextComponent } from '../../../../shared/form/components/input-text/input-text.component';
import { TextareaComponent } from '../../../../shared/form/components/textarea/textarea.component';
import { DatePickerComponent } from '../../../../shared/form/components/date-picker/date-picker.component';
import { TaskWeeklyRepetitionComponent } from '../task-weekly-repetition/task-weekly-repetition.component';
import { RepetitionRuleType } from '../../domain/types/repetition-rule.type';
import { WeekDay } from '../../domain/types/week-day.type';
import { EndRepetition } from '../../domain/types/end-repetition.type';
import { RepetitionRuleForm } from '../../domain/dtos/repetition-rule-form.dto';
import { RepetitionRule } from '../../domain/dtos/repetition-rule.dto';
import { RepetitionLabels } from '../../domain/types/repetition.type';

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
  protected readonly EndRepetition = EndRepetition;
  readonly END_REPETITION: Option<EndRepetition>[] = [
    { id: '1', label: 'Date', value: EndRepetition.DATE },
    { id: '2', label: "Nombre d'occurence", value: EndRepetition.NB_OCCURENCE },
  ];
  readonly toastService: ToastService = inject(ToastService);
  readonly fb: FormBuilder = inject(FormBuilder);
  readonly taskService: TaskService = inject(TaskService);
  selectedRepetitionRuleIndex = signal<number | null>(null);
  taskForm: FormGroup = this.fb.group({
    name: this.fb.control<string>('', [Validators.required]),
    description: this.fb.control<string>(''),
    repetitionRules: this.fb.array([] as FormGroup[]),
  });
  repetitionRuleForm: FormGroup = this.fb.group({
    weeklyRule: this.fb.group({
      repetitionRuleType: this.fb.control<RepetitionRuleType>(RepetitionRuleType.WEEKLY_BY_DAY, [
        Validators.required,
      ]),
      weekDays: this.fb.control<WeekDay[]>([]),
      repeatEvery: this.fb.control<number | null>(VALUE_NULL_DISABLED, [Validators.required]),
      periodLength: this.fb.control<number | null>(VALUE_NULL_DISABLED, [Validators.required]),
    }),
    startDate: this.fb.control<string>(todayStr(), [Validators.required]),
    end: this.fb.control<EndRepetition>(EndRepetition.DATE, [Validators.required]),
    endDate: this.fb.control<string | null>(tomorrowStr(), [Validators.required]),
    endNbOccurence: this.fb.control<number | null>(VALUE_NULL_DISABLED, [Validators.required]),
  });

  constructor() {
    console.log(RepetitionRuleType.WEEKLY_BY_DAY, RepetitionRuleType.WEEKLY_BY_DAY.valueOf());
    this.weeklyRule
      ?.get('repetitionRuleType')
      ?.valueChanges.subscribe((repetitionRuleType: RepetitionRuleType) => {
        if (repetitionRuleType === RepetitionRuleType.WEEKLY_BY_DAY) {
          this.weeklyRule?.get('weekDays')?.enable();
          this.weeklyRule?.get('repeatEvery')?.disable();
          this.weeklyRule?.get('repeatEvery')?.patchValue(null);
          this.weeklyRule?.get('periodLength')?.disable();
          this.weeklyRule?.get('periodLength')?.patchValue(null);
        } else if (repetitionRuleType === RepetitionRuleType.WEEKLY_REGULAR) {
          this.weeklyRule?.get('weekDays')?.disable();
          this.weeklyRule?.get('repeatEvery')?.enable();
          this.weeklyRule?.get('repeatEvery')?.patchValue(0);
          this.weeklyRule?.get('periodLength')?.enable();
          this.weeklyRule?.get('periodLength')?.patchValue(0);
        }
      });

    this.repetitionRuleForm?.get('end')?.valueChanges.subscribe((value) => {
      if (value === EndRepetition.DATE) {
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

  get weeklyRule(): FormGroup {
    return this.repetitionRuleForm.get('weeklyRule') as FormGroup;
  }

  get endRepetitionValue(): EndRepetition {
    return this.repetitionRuleForm.get('end')?.value;
  }

  get labelBtnAddRule(): string {
    return this.selectedRepetitionRuleIndex() !== null
      ? 'Modifier la règle de répétition'
      : 'Ajouter la règle de répétition';
  }

  onAddRepetitionRule(): void {
    console.log(this.repetitionRuleForm.getRawValue());
    const formGroup = this.buildRepetitionRuleFormGroup(this.repetitionRuleForm.getRawValue());
    console.log(formGroup);
    const idx = this.selectedRepetitionRuleIndex();

    if (idx === null) {
      this.repetitionRules.push(formGroup);
      console.log(this.repetitionRules);
    } else {
      this.repetitionRules.setControl(idx, formGroup);
    }

    this.resetRepetitionRuleForm();
    this.selectedRepetitionRuleIndex.set(null);
  }

  onEditRepetitionRule(repetitionRuleIdx: number): void {
    this.selectedRepetitionRuleIndex.set(repetitionRuleIdx);
    const formGroup = this.repetitionRules.at(repetitionRuleIdx);
    const value = formGroup.getRawValue() as RepetitionRuleForm;
    this.resetRepetitionRuleForm(value);
  }

  onDeleteRepetitionRule(repetitionRuleIdx: number): void {
    this.repetitionRules.removeAt(repetitionRuleIdx);
    if (this.selectedRepetitionRuleIndex() === repetitionRuleIdx) {
      this.onCancelEditRepetitionRule();
    }
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

    const taskName: string | undefined = this.taskForm.get('name')?.value;
    if (!taskName) {
      this.toastService.error("Ajout d'une nouvelle tâche", 'Nom invalide');
      return;
    }

    const task: TaskDto = getNewTask(taskName, this.taskForm.get('description')?.value);
    task.repetitionRules = this.repetitionRules.controls.map((fg) =>
      this.formRuleToDomain(fg.getRawValue())
    );

    console.log(task);

    this.taskService.create(task, () => this.resetAllForm());
  }

  resetAllForm(): void {
    this.resetTaskForm();
    this.resetRepetitionRuleForm();
  }

  resetTaskForm(): void {
    this.repetitionRules.clear();
    this.taskForm.reset({
      name: '',
      description: '',
      repetitionRules: [],
    });
  }

  resetRepetitionRuleForm(value?: RepetitionRuleForm): void {
    this.repetitionRuleForm.reset(
      value ?? {
        weeklyRule: {
          repetitionRuleType: RepetitionRuleType.WEEKLY_BY_DAY,
          weekDays: [],
          repeatEvery: null,
          periodLength: null,
        },
        startDate: todayStr(),
        end: EndRepetition.DATE,
        endDate: tomorrowStr(),
        endNbOccurence: null,
      }
    );
  }

  formRuleToDomain(form: RepetitionRuleForm): RepetitionRule {
    return {
      weeklyRepetitionRule: { ...form.weeklyRule },
      startDate: toDate(form.startDate)!,
      end: form.end,
      endDate: toDate(form.endDate)!,
      endNbOccurence: form.endNbOccurence,
    } as RepetitionRule;
  }

  private buildRepetitionRuleFormGroup(from: RepetitionRuleForm): FormGroup {
    const fg = this.fb.group({
      weeklyRule: this.fb.group({
        repetitionRuleType: this.fb.control<RepetitionRuleType>(
          from.weeklyRule.repetitionRuleType,
          [Validators.required]
        ),
        weekDays: this.fb.control<WeekDay[]>(from.weeklyRule.weekDays),
        repeatEvery: this.fb.control<number | null>(from.weeklyRule.repeatEvery),
        periodLength: this.fb.control<number | null>(from.weeklyRule.periodLength),
      }),
      startDate: this.fb.control<string>(from.startDate, [Validators.required]),
      end: this.fb.control<EndRepetition>(from.end, [Validators.required]),
      endDate: this.fb.control<string | null>(from.endDate),
      endNbOccurence: this.fb.control<number | null>(from.endNbOccurence),
    });

    return fg;
  }
}
