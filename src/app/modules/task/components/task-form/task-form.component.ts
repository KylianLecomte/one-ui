import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ToastService } from '../../../../shared/toast/services/toast.service';
import { TabsComponent } from '../../../../shared/menu/tabs/tabs.component';
import { TabComponent } from '../../../../shared/menu/tab/tab.component';
import {
  Frequency,
  FrequencyType,
  WeekDay,
} from '../../../../shared/frequence/dtos/frequency.type';
import {
  SelectComponent,
  SelectOption,
} from '../../../../shared/form/components/select/select.component';
import { TaskFrequencyWeeklyComponent } from '../task-frequency-weekly/task-frequency-weekly.component';
import { today, tomorow } from '../../../../shared/utils/date.utils';
import { InputNumberComponent } from '../../../../shared/form/components/input-number/input-number.component';

type START_FREQUENCY_VALUE = 'Maintenant' | 'Date';
type END_FREQUENCY_VALUE = 'Maintenant' | 'Date' | "Nombre d'occurence";

@Component({
  selector: 'one-task-form',
  imports: [
    ReactiveFormsModule,
    TabsComponent,
    TabComponent,
    TaskFrequencyWeeklyComponent,
    InputNumberComponent,
    SelectComponent,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent {
  protected readonly Frequency = Frequency;
  readonly START_FREQUENCY: SelectOption<START_FREQUENCY_VALUE>[] = [
    { label: 'Maintenant', value: 'Maintenant' },
    { label: 'Date', value: 'Date' },
  ];
  readonly END_FREQUENCY: SelectOption<END_FREQUENCY_VALUE>[] = [
    { label: 'Maintenant', value: 'Maintenant' },
    { label: 'Date', value: 'Date' },
    { label: "Nombre d'occurence", value: "Nombre d'occurence" },
  ];
  readonly toastService: ToastService = inject(ToastService);
  readonly formBuilder: FormBuilder = inject(FormBuilder);
  readonly taskService: TaskService = inject(TaskService);

  taskFg: FormGroup = this.formBuilder.group({
    name: this.formBuilder.control<string>('', [Validators.required]),
    description: this.formBuilder.control<string>('', []),
    frequencyRuleFg: this.formBuilder.group({
      weeklyFg: this.formBuilder.group({
        frequencyType: this.formBuilder.control<FrequencyType>(FrequencyType.WEEKLY_BY_DAY, [
          Validators.required,
        ]),

        selectedDays: this.formBuilder.control<WeekDay[]>([], []),

        repeatEvery: this.formBuilder.control<number | null>({ value: null, disabled: true }, [
          Validators.required,
        ]),
        periodLength: this.formBuilder.control<number | null>({ value: null, disabled: true }, [
          Validators.required,
        ]),
      }),

      start: this.formBuilder.control<string>('Maintenant', [Validators.required]),
      startDate: this.formBuilder.control<string>({ value: today(), disabled: true }, [
        Validators.required,
      ]),
      end: this.formBuilder.control<string>('Date', [Validators.required]),
      endDate: this.formBuilder.control<string | null>(tomorow(), [Validators.required]),
      endNbOccurence: this.formBuilder.control<number | null>(null, [Validators.required]),
    }),
  });

  constructor() {
    this.weeklyFg?.get('frequencyType')?.valueChanges.subscribe((frequencyType: FrequencyType) => {
      console.log('frequencyType change', frequencyType);
      if (frequencyType === FrequencyType.WEEKLY_BY_DAY) {
        this.weeklyFg?.get('selectedDays')?.enable();
        this.weeklyFg?.get('repeatEvery')?.disable();
        this.weeklyFg?.get('periodLength')?.disable();
      } else if (frequencyType === FrequencyType.WEEKLY_REGULAR) {
        this.weeklyFg?.get('selectedDays')?.disable();
        this.weeklyFg?.get('repeatEvery')?.enable();
        this.weeklyFg?.get('periodLength')?.enable();
      }
    });

    this.frequencyRuleFg?.get('start')?.valueChanges.subscribe((value) => {
      if (value === 'Maintenant') {
        this.frequencyRuleFg?.get('startDate')?.setValue(today());
        this.frequencyRuleFg?.get('startDate')?.disable();
      } else {
        this.frequencyRuleFg?.get('startDate')?.enable();
      }
    });

    this.frequencyRuleFg?.get('end')?.valueChanges.subscribe((value) => {
      if (value === 'Maintenant') {
        this.frequencyRuleFg?.get('startDate')?.setValue(tomorow());
        this.frequencyRuleFg?.get('endDate')?.disable();
        this.frequencyRuleFg?.get('endNbOccurence')?.disable();
      } else if (value === 'Date') {
        this.frequencyRuleFg?.get('endDate')?.enable();
        this.frequencyRuleFg?.get('endNbOccurence')?.disable();
      } else {
        this.frequencyRuleFg?.get('endDate')?.disable();
        this.frequencyRuleFg?.get('endNbOccurence')?.enable();
      }
    });
  }

  get frequencyRuleFg(): FormGroup {
    return this.taskFg.get('frequencyRuleFg') as FormGroup;
  }

  get endFrequencyValue(): END_FREQUENCY_VALUE {
    return this.frequencyRuleFg.get('end')?.value;
  }

  get weeklyFg(): FormGroup {
    return this.frequencyRuleFg.get('weeklyFg') as FormGroup;
  }

  onSubmitAddNewTask(): void {
    // console.log(this.taskFg.get('name')?.value);
    // console.log(this.taskFg.get('description')?.value);
    // console.log(this.weeklyFg?.get('selectedDays')?.value);

    console.log(this.frequencyRuleFg?.get('end')?.value);

    // console.log(this.frequencyRuleFg?.get('start')?.value);
    // console.log(this.frequencyRuleFg?.get('startDate')?.value);
    // console.log(this.frequencyRuleFg?.get('end')?.value);
    // console.log(this.frequencyRuleFg?.get('endDate')?.value);
    // console.log(this.frequencyRuleFg?.get('endNbOccurence')?.value);

    // if (!this.taskFg.valid) {
    //   this.toastService.error("Ajout d'une nouvelle tâche", 'Formulaire invalide');
    //   return;
    // }
    //
    // const taskName: string | undefined = this.taskFg.get('name')?.value;
    // if (!taskName) {
    //   this.toastService.error("Ajout d'une nouvelle tâche", 'Nom invalide');
    //   return;
    // }
    //
    // const task: TaskDto = getNewTask(taskName, this.taskFg.get('description')?.value);
    //
    // this.taskService.create(task, () => this.resetForm());
  }

  private resetForm(): void {
    this.taskFg.reset();
  }
}
