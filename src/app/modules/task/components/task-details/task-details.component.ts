import { Component, effect, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../domain/dtos/task.dto';
import { TaskStateService } from '../../services/task.state.service';

@Component({
  selector: 'one-task-details',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent {
  taskService: TaskService = inject(TaskService);
  taskStateService: TaskStateService = inject(TaskStateService);

  taskNameCtrl!: string;
  taskDescriptionCtrl?: string;

  constructor() {
    effect((): void => {
      const selectedTask: ITask | undefined = this.taskStateService.selectedTask();
      if (selectedTask) {
        this.taskNameCtrl = selectedTask.name;
        this.taskDescriptionCtrl = selectedTask.description;
      }
    });
  }

  onTaskNameChange(value: string): void {
    this.taskStateService.selectedTaskNameChanged(value);
  }

  onBlur(): void {
    const selectedTask: ITask | undefined = this.taskStateService.selectedTask();
    if (selectedTask) {
      this.taskService.update(selectedTask.id, {
        ...selectedTask,
        name: this.taskNameCtrl,
        description: this.taskDescriptionCtrl,
      });
    }
  }
}
