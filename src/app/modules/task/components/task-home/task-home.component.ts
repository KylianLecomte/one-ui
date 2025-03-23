import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task, TaskCreate } from '../../domain/dtos/task.dto';
import { TaskState } from '../../domain/dtos/task-state.enum';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LayoutComponent } from '../../../../shared/components/layout/layout.component';
import { TaskRowComponent } from '../task-row/task-row.component';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'one-task-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FontAwesomeModule,
    LayoutComponent,
    TaskRowComponent,
    TaskDetailsComponent,
  ],
  templateUrl: './task-home.component.html',
  styleUrl: './task-home.component.scss',
})
export class TaskHomeComponent implements OnInit {
  taskService: TaskService = inject(TaskService);
  formBuilder: FormBuilder = inject(FormBuilder);
  taskControl: FormControl = this.formBuilder.control('', [
    Validators.required,
  ]);

  get selectedTask(): Task | undefined {
    return this.taskService.selectedTask();
  }

  get selectedTaskSignal(): WritableSignal<Task | undefined> {
    return this.taskService.selectedTask;
  }

  get tasks(): Task[] {
    return this.taskService.tasks();
  }

  ngOnInit(): void {
    this.taskService.getAll();
  }

  onClickAddTask(): void {
    if (!this.taskControl.valid) {
      return;
    }

    const task: TaskCreate = {
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
