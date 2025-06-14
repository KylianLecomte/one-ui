import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from './services/task.service';
import { TaskDto } from './domain/dtos/task.dto';
import { TaskState } from './domain/dtos/task-state.enum';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LayoutComponent } from '../../shared/layout/layout.component';
import { TaskRowComponent } from './components/task-row/task-row.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { ID } from '../../shared/api/domain/dtos/api.dtos';

@Component({
  selector: 'one-task',
  imports: [
    ReactiveFormsModule,
    FontAwesomeModule,
    LayoutComponent,
    TaskRowComponent,
    TaskDetailsComponent,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  taskService: TaskService = inject(TaskService);
  formBuilder: FormBuilder = inject(FormBuilder);

  taskControl: FormControl = this.formBuilder.control('', [Validators.required]);

  get tasks(): TaskDto[] {
    return this.taskService.tasks();
  }

  get selectedTask(): TaskDto | undefined {
    return this.taskService.selectedTask();
  }

  ngOnInit(): void {
    this.taskService.getAll();
  }

  onClickAddTask(): void {
    if (!this.taskControl.valid) {
      return;
    }

    const task: TaskDto = {
      name: this.taskControl.value,
      state: TaskState.Todo,
      stateDate: new Date(),
      description: '',
      isSelected: false,
    };

    this.taskService.create(task);
    this.resetForm();
  }

  onUpdateTaskName(name: string, task: TaskDto): void {
    task.name = name;
    this.onUpdateTask(task);
  }

  onCheckTask(state: TaskState, task: TaskDto): void {
    task.state = state;
    this.onUpdateTask(task);
  }

  onUpdateTask(updatedTask: TaskDto): void {
    this.taskService.update(updatedTask.id, updatedTask);
  }

  onDeleteTask(taskId: ID): void {
    this.taskService.delete(taskId);
  }

  onSelectTask(selected: boolean, task: TaskDto): void {
    this.taskService.selectedChange(task, selected);
  }

  private resetForm(): void {
    this.taskControl.reset();
  }
}
