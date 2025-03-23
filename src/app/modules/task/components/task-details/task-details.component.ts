import {
  Component,
  effect,
  inject,
  Input,
  WritableSignal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../domain/dtos/task.dto';

@Component({
  selector: 'one-task-details',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent {
  taskService: TaskService = inject(TaskService);

  @Input({ required: true }) task!: WritableSignal<Task | undefined>;
  taskNameCtrl!: string;
  taskDescriptionCtrl?: string;

  constructor() {
    effect((): void => {
      const selectedTask: Task | undefined = this.task();
      if (selectedTask) {
        this.taskNameCtrl = selectedTask.name;
        this.taskDescriptionCtrl = selectedTask.description;
      }
    });
  }

  onTaskNameChange(value: string): void {
    this.taskService.selectedTaskNameChanged(value);
  }

  onBlur(): void {
    const selectedTask: Task | undefined = this.task();
    if (selectedTask) {
      this.taskService.update(selectedTask.id, {
        ...this.task(),
        name: this.taskNameCtrl,
        description: this.taskDescriptionCtrl,
      });
    }
  }
}
