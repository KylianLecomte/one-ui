import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ToastService } from '../../../../shared/toast/services/toast.service';
import { TaskDto } from '../../domain/dtos/task.dto';
import { getNewTask } from '../../domain/utils/task.utils';
import { TabsComponent } from '../../../../shared/menu/tabs/tabs.component';
import { TabComponent } from '../../../../shared/menu/tab/tab.component';
import { Frequency } from '../../../../shared/dtos/frequency.type';
import { TaskFrequencyWeeklyComponent } from '../task-frequency-weekly/task-frequency-weekly.component';
import { SelectComponent } from '../../../../shared/components/select/select.component';

@Component({
  selector: 'one-task-form',
  imports: [
    ReactiveFormsModule,
    TabsComponent,
    TabComponent,
    TaskFrequencyWeeklyComponent,
    SelectComponent,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  protected readonly Frequency = Frequency;
  readonly START_FREQUENCY: string[] = ['Maintenant', 'Date'];
  readonly END_FREQUENCY: string[] = ['Maintenant', 'Date', "Nombre d'occurence"];
  readonly toastService: ToastService = inject(ToastService);
  readonly formBuilder: FormBuilder = inject(FormBuilder);
  readonly taskService: TaskService = inject(TaskService);
  taskForm: FormGroup = this.formBuilder.group({
    name: this.formBuilder.control('', [Validators.required]),
    description: this.formBuilder.control('', []),
  });

  onSubmitAddNewTask(): void {
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

    this.taskService.create(task, () => this.resetForm());
  }

  private resetForm(): void {
    this.taskForm.reset();
  }
}
