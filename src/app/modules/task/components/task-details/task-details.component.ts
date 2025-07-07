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
  task: InputSignal<TaskDto> = input.required<TaskDto>();
  update: OutputEmitterRef<TaskDto> = output<TaskDto>();

  onTaskNameChange(name: string): void {
    this.task().name = name;
    this.update.emit(this.task());
  }

  onBlur(): void {
    console.log(this.task());
    this.update.emit(this.task());
  }
}
