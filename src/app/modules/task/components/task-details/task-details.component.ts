import { Component, effect, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskDto } from '../../domain/dtos/task.dto';

@Component({
  selector: 'one-task-details',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent {
  taskNameCtrl!: string;
  taskDescriptionCtrl?: string;

  task: InputSignal<TaskDto> = input.required<TaskDto>();
  update: OutputEmitterRef<TaskDto> = output<TaskDto>();

  constructor() {
    effect((): void => {
      const selectedTask: TaskDto = this.task();
      if (selectedTask) {
        this.taskNameCtrl = selectedTask.name;
        this.taskDescriptionCtrl = selectedTask.description;
      }
    });
  }

  onTaskNameChange(name: string): void {
    this.task().name = name;
    this.update.emit(this.task());
  }

  onBlur(): void {
    this.task().name = this.taskNameCtrl;
    this.task().description = this.taskDescriptionCtrl;
    this.update.emit(this.task());
  }
}
