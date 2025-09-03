import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from '../../../../shared/toast/services/toast.service';
import { TaskService } from '../../services/task.service';
import { TabsComponent } from '../../../../shared/menu/tabs/tabs.component';
import { TabComponent } from '../../../../shared/menu/tabs/tab/tab.component';
import {
  SelectComponent,
  SelectOption,
} from '../../../../shared/form/components/select/select.component';
import { InputNumberComponent } from '../../../../shared/form/components/input-number/input-number.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ID } from '../../../../shared/api/domain/dtos/api.dtos';
import {
  END_FREQUENCY_VALUE,
  Frequency,
  FrequencyRule,
  FrequencyType,
  WeekDay,
} from '../../domain/dtos/frequency.type';
import { TaskDto } from '../../domain/dtos/task.dto';
import { getNewTask } from '../../domain/utils/task.utils';

// ---------- Utils ----------
function toFormDate(d: Date | null | undefined): string | null {
  if (!d) return null;
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function fromFormDate(s: string | null | undefined): Date | null {
  if (!s) return null;
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1, 0, 0, 0, 0);
}

function todayStr(): string {
  return toFormDate(new Date())!;
}

function tomorrowStr(): string {
  const t = new Date();
  t.setDate(t.getDate() + 1);
  return toFormDate(t)!;
}

// ---------- Types de formulaire ----------
interface WeeklyRuleForm {
  frequencyType: FrequencyType;
  weekDays: WeekDay[];
  repeatEvery: number | null;
  periodLength: number | null;
}

interface FrequencyRuleForm {
  weeklyRule: WeeklyRuleForm;
  startDate: string;
  end: END_FREQUENCY_VALUE;
  endDate: string | null;
  endNbOccurence: number | null;
}

// ---------- Validators ----------
function endRuleValidator(group: FormGroup) {
  const end: END_FREQUENCY_VALUE = group.get('end')?.value;
  const endDate: string | null = group.get('endDate')?.value;
  const endNb: number | null = group.get('endNbOccurence')?.value;

  if (end === 'Date') {
    if (!endDate) return { endDateRequired: true };
  } else if (end === "Nombre d'occurence") {
    if (endNb == null) return { endNbOccurenceRequired: true };
    if (endNb <= 0) return { endNbOccurencePositive: true };
  }
  return null;
}

function weeklyValidators(group: FormGroup) {
  const type: FrequencyType = group.get('frequencyType')?.value;
  const weekDays = group.get('weekDays') as FormControl<WeekDay[]>;
  const repeatEvery = group.get('repeatEvery') as FormControl<number | null>;
  const periodLength = group.get('periodLength') as FormControl<number | null>;

  weekDays.clearValidators();
  repeatEvery.clearValidators();
  periodLength.clearValidators();

  if (type === FrequencyType.WEEKLY_BY_DAY) {
    weekDays.addValidators([
      Validators.required,
      (c) => (c.value?.length ? null : { weekDaysEmpty: true }),
    ]);
  } else if (type === FrequencyType.WEEKLY_REGULAR) {
    repeatEvery.addValidators([Validators.required, Validators.min(1)]);
    periodLength.addValidators([Validators.required, Validators.min(1)]);
  }

  weekDays.updateValueAndValidity({ emitEvent: false });
  repeatEvery.updateValueAndValidity({ emitEvent: false });
  periodLength.updateValueAndValidity({ emitEvent: false });
}

// ---------- Component ----------
@Component({
  selector: 'one-task-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TabsComponent,
    TabComponent,
    SelectComponent,
    InputNumberComponent,
    ButtonComponent,
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent {
  protected readonly Frequency = Frequency;
  readonly END_FREQUENCY: SelectOption<END_FREQUENCY_VALUE>[] = [
    { label: 'Date', value: 'Date' },
    { label: "Nombre d'occurence", value: "Nombre d'occurence" },
  ];
  selectedRuleIndex = signal<number | null>(null);
  editingRule = computed(() => this.selectedRuleIndex() !== null);
  private readonly fb = inject(FormBuilder);
  // Formulaire principal
  taskForm: FormGroup = this.fb.group({
    name: this.fb.control<string>('', { validators: [Validators.required] }),
    description: this.fb.control<string>(''),
    frequencyRules: this.fb.array([] as FormGroup[]),
  });

  // Formulaire temporaire pour ajouter/éditer une règle
  ruleEditor: FormGroup = this.fb.group(
    {
      weeklyRule: this.fb.group({
        frequencyType: this.fb.control<FrequencyType>(FrequencyType.WEEKLY_BY_DAY, {
          validators: [Validators.required],
        }),
        weekDays: this.fb.control<WeekDay[]>([]),
        repeatEvery: this.fb.control<number | null>(null),
        periodLength: this.fb.control<number | null>(null),
      }),
      startDate: this.fb.control<string>(todayStr(), { validators: [Validators.required] }),
      end: this.fb.control<END_FREQUENCY_VALUE>('Date', { validators: [Validators.required] }),
      endDate: this.fb.control<string | null>(tomorrowStr()),
      endNbOccurence: this.fb.control<number | null>(null),
    },
    { validators: [endRuleValidator] }
  );
  private readonly toast = inject(ToastService);
  private readonly taskService = inject(TaskService);

  constructor() {
    // Validators dynamiques sur weeklyRule
    this.weeklyRuleFG
      .get('frequencyType')!
      .valueChanges.pipe(takeUntilDestroyed())
      .subscribe(() => weeklyValidators(this.weeklyRuleFG));

    weeklyValidators(this.weeklyRuleFG);

    // Validators dynamiques sur end
    this.ruleEditor
      .get('end')!
      .valueChanges.pipe(takeUntilDestroyed())
      .subscribe((v: END_FREQUENCY_VALUE) => {
        if (v === 'Date') {
          this.ruleEditor.patchValue(
            {
              endDate: this.ruleEditor.get('endDate')?.value ?? tomorrowStr(),
              endNbOccurence: null,
            },
            { emitEvent: false }
          );
        } else {
          this.ruleEditor.patchValue({ endDate: null }, { emitEvent: false });
        }
        this.ruleEditor.updateValueAndValidity({ emitEvent: false });
      });
  }

  get frequencyRulesFA(): FormArray<FormGroup> {
    return this.taskForm.get('frequencyRules') as FormArray<FormGroup>;
  }

  get weeklyRuleFG(): FormGroup {
    return this.ruleEditor.get('weeklyRule') as FormGroup;
  }

  // ---------- Actions ----------
  addOrUpdateRule(): void {
    if (this.ruleEditor.invalid) {
      this.ruleEditor.markAllAsTouched();
      this.toast.error('Règle de fréquence', 'Formulaire invalide');
      return;
    }

    const formValue = this.ruleEditor.getRawValue() as FrequencyRuleForm;
    const fg = this.buildRuleFormGroup(formValue);
    const idx = this.selectedRuleIndex();

    if (idx === null) {
      // const domain = this.formRuleToDomain(formValue);
      // const fg = this.buildRuleFormGroup(this.domainRuleToForm(domain));
      this.frequencyRulesFA.push(fg);
    } else {
      // const domain = this.formRuleToDomain(formValue);
      this.frequencyRulesFA.setControl(idx, fg);
    }

    this.cancelEdit();
  }

  editRule(index: number): void {
    this.selectedRuleIndex.set(index);
    const fg = this.frequencyRulesFA.at(index) as FormGroup;
    const value = fg.getRawValue() as FrequencyRuleForm;
    this.ruleEditor.reset(value);
    weeklyValidators(this.weeklyRuleFG);
  }

  deleteRule(index: number): void {
    this.frequencyRulesFA.removeAt(index);
    if (this.selectedRuleIndex() === index) this.cancelEdit();
  }

  cancelEdit(): void {
    this.selectedRuleIndex.set(null);
    this.ruleEditor.reset({
      weeklyRule: {
        frequencyType: FrequencyType.WEEKLY_BY_DAY,
        weekDays: [],
        repeatEvery: null,
        periodLength: null,
      },
      startDate: todayStr(),
      end: 'Date',
      endDate: tomorrowStr(),
      endNbOccurence: null,
    });
    weeklyValidators(this.weeklyRuleFG);
  }

  onSubmitTask(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      this.toast.error("Ajout d'une nouvelle tâche", 'Formulaire invalide');
      return;
    }

    const name = this.taskForm.get('name')!.value?.trim();
    if (!name) {
      this.toast.error("Ajout d'une nouvelle tâche", 'Nom invalide');
      return;
    }

    const task: TaskDto = getNewTask(name, this.taskForm.get('description')!.value);
    const rules: FrequencyRule[] = (this.frequencyRulesFA.controls as FormGroup[]).map((fg) =>
      this.formRuleToDomain(fg.getRawValue() as FrequencyRuleForm)
    );

    this.taskService.create(task, () => this.resetAll());
  }

  resetAll(): void {
    this.taskForm.reset();
    this.frequencyRulesFA.clear();
    this.cancelEdit();
  }

  // ---------- Mapping ----------
  private formRuleToDomain(form: FrequencyRuleForm): FrequencyRule {
    return {
      id: crypto.randomUUID() as unknown as ID,
      weeklyRule: { ...form.weeklyRule },
      startDate: fromFormDate(form.startDate)!,
      end: form.end,
      endDate: fromFormDate(form.endDate)!,
      endNbOccurence: form.endNbOccurence,
    } as FrequencyRule;
  }

  private domainRuleToForm(rule: FrequencyRule): FrequencyRuleForm {
    return {
      weeklyRule: { ...rule.weeklyRule },
      startDate: toFormDate(rule.startDate)!,
      end: rule.end,
      endDate: toFormDate(rule.endDate),
      endNbOccurence: rule.endNbOccurence ?? null,
    };
  }

  private buildRuleFormGroup(from: FrequencyRuleForm): FormGroup {
    const fg = this.fb.group(
      {
        weeklyRule: this.fb.group({
          frequencyType: this.fb.control<FrequencyType>(from.weeklyRule.frequencyType, {
            validators: [Validators.required],
          }),
          weekDays: this.fb.control<WeekDay[]>(from.weeklyRule.weekDays),
          repeatEvery: this.fb.control<number | null>(from.weeklyRule.repeatEvery),
          periodLength: this.fb.control<number | null>(from.weeklyRule.periodLength),
        }),
        startDate: this.fb.control<string>(from.startDate, { validators: [Validators.required] }),
        end: this.fb.control<END_FREQUENCY_VALUE>(from.end, { validators: [Validators.required] }),
        endDate: this.fb.control<string | null>(from.endDate),
        endNbOccurence: this.fb.control<number | null>(from.endNbOccurence),
      },
      { validators: [endRuleValidator] }
    );

    weeklyValidators(fg.get('weeklyRule') as FormGroup);
    return fg;
  }
}
