import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskDto } from './domain/dtos/task.dto';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TaskTableComponent } from './components/task-table/task-table.component';
import { ToastService } from '../../shared/toast/services/toast.service';
import { getNewTask } from './domain/utils/task.utils';
import { TaskService } from './services/task.service';

@Component({
  selector: 'one-task',
  imports: [ReactiveFormsModule, FontAwesomeModule, FormsModule, TaskTableComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  readonly toastService: ToastService = inject(ToastService);
  readonly formBuilder: FormBuilder = inject(FormBuilder);
  readonly taskService: TaskService = inject(TaskService);

  newTaskForm: FormGroup = this.formBuilder.group({
    name: this.formBuilder.control('', [Validators.required]),
  });

  constructor() {
    this.taskService.getAll();
  }

  onSubmitAddNewTask(): void {
    if (!this.newTaskForm.valid) {
      this.toastService.error("Ajout d'une nouvelle tâche", 'Formulaire invalide');
      return;
    }

    const taskName: string | undefined = this.newTaskForm.get('name')?.value;
    if (!taskName) {
      this.toastService.error("Ajout d'une nouvelle tâche", 'Nom invalide');
      return;
    }

    const task: TaskDto = getNewTask(taskName);

    this.taskService.create(task, () => this.resetForm());
  }

  private resetForm(): void {
    this.newTaskForm.reset();
  }
}
