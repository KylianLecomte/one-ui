import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ToastService } from '../../../../shared/toast/services/toast.service';
import { TaskDto } from '../../domain/dtos/task.dto';
import { getNewTask } from '../../domain/utils/task.utils';

@Component({
  selector: 'one-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
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
