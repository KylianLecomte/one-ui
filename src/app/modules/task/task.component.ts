import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from './services/task.service';
import { TaskDto } from './domain/dtos/task.dto';
import { TaskState } from './domain/dtos/task-state.enum';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LayoutComponent } from '../../shared/layout/layout.component';
import { TaskRowComponent } from './components/task-row/task-row.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';

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

  get selectedTask(): TaskDto | undefined {
    return this.taskService.selectedTask();
  }

  get tasks(): TaskDto[] {
    return this.taskService.tasks();
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
    };

    this.taskService.create(task);
    this.resetForm();
  }

  private resetForm(): void {
    this.taskControl.reset();
  }
}
