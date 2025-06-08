import { Component, effect, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { TaskDto } from '../../domain/dtos/task.dto';

@Component({
  selector: 'one-task-details',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent {
  taskService: TaskService = inject(TaskService);

  taskNameCtrl!: string;
  taskDescriptionCtrl?: string;

  constructor() {
    effect((): void => {
      const selectedTask: TaskDto | undefined = this.taskService.selectedTask();
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
    const selectedTask: TaskDto | undefined = this.taskService.selectedTask();
    if (selectedTask) {
      this.taskService.update(selectedTask.id, {
        ...selectedTask,
        name: this.taskNameCtrl,
        description: this.taskDescriptionCtrl,
      });
    }
  }
}
