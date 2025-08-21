import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ToastService } from '../../../../shared/toast/services/toast.service';
import { TaskDto } from '../../domain/dtos/task.dto';
import { getNewTask } from '../../domain/utils/task.utils';
import { TabsComponent } from '../../../../shared/menu/tabs/tabs.component';
import { TabComponent } from '../../../../shared/menu/tab/tab.component';
import {
  Frequency,
  FrequencyType,
  WeekDay,
} from '../../../../shared/frequence/dtos/frequency.type';
import { SelectComponent } from '../../../../shared/form/components/select/select.component';

@Component({
  selector: 'one-task-form',
  imports: [ReactiveFormsModule, TabsComponent, TabComponent, SelectComponent],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent {
  protected readonly Frequency = Frequency;
  readonly START_FREQUENCY: string[] = ['Maintenant', 'Date'];
  readonly END_FREQUENCY: string[] = ['Maintenant', 'Date', "Nombre d'occurence"];
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

        repeatEvery: this.formBuilder.control<number | null>(null, [Validators.required]),
        periodLength: this.formBuilder.control<number | null>(null, [Validators.required]),
      }),

      start: this.formBuilder.control<string>('', [Validators.required]),
      startDate: this.formBuilder.control<Date>(new Date(), [Validators.required]),
      end: this.formBuilder.control<string>('', [Validators.required]),
      endDate: this.formBuilder.control<Date | null>(null, [Validators.required]),
      endNbOccurence: this.formBuilder.control<number | null>(null, [Validators.required]),
    }),
  });

  constructor() {
    this.weeklyFg?.get('frequencyType')?.valueChanges.subscribe((frequencyType: FrequencyType) => {
      if (frequencyType === FrequencyType.WEEKLY_BY_DAY) {
        this.weeklyFg?.get('repeatEvery')?.disable();
        this.weeklyFg?.get('periodLength')?.disable();
      } else if (frequencyType === FrequencyType.WEEKLY_REGULAR) {
        this.weeklyFg?.get('selectedDays')?.disable();
      }
    });
  }

  get frequencyRuleFg(): FormGroup {
    return this.taskFg.get('frequencyRuleFg') as FormGroup;
  }

  get weeklyFg(): FormGroup {
    return this.frequencyRuleFg.get('weeklyForm') as FormGroup;
  }

  onSubmitAddNewTask(): void {
    if (!this.taskFg.valid) {
      this.toastService.error("Ajout d'une nouvelle tâche", 'Formulaire invalide');
      return;
    }

    const taskName: string | undefined = this.taskFg.get('name')?.value;
    if (!taskName) {
      this.toastService.error("Ajout d'une nouvelle tâche", 'Nom invalide');
      return;
    }

    const task: TaskDto = getNewTask(taskName, this.taskFg.get('description')?.value);

    this.taskService.create(task, () => this.resetForm());
  }

  private resetForm(): void {
    this.taskFg.reset();
  }
}
