import { Component, computed, inject, OnInit, Signal, TemplateRef, viewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from './services/task.service';
import { TaskDto } from './domain/dtos/task.dto';
import { TaskState } from './domain/dtos/task-state.enum';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LayoutComponent } from '../../shared/layout/layout.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { ContextMenuService } from '../../shared/menu/context-menu/services/context-menu.service';
import { ContextMenuData } from '../../shared/menu/context-menu/models/context-menu-data.model';
import { ColumnDef, DataDef, TableComponent } from '../../shared/table/table.component';
import { faCircle, faCircleCheck, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { debounceTime } from 'rxjs';
import { TaskTableComponent } from "./components/task-table/task-table.component";
import { ID } from '../../shared/api/domain/dtos/api.dtos';

@Component({
  selector: 'one-task',
  imports: [
    ReactiveFormsModule,
    FontAwesomeModule,
    LayoutComponent,
    TaskDetailsComponent,
    FormsModule,
    TaskTableComponent
],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  protected readonly faCircle = faCircle;
  protected readonly faTimesCircle = faTimesCircle;
  protected readonly faCircleCheck = faCircleCheck;
  protected readonly TaskState = TaskState;
  protected readonly faTrashCan = faTrashCan;
  readonly taskService: TaskService = inject(TaskService);
  readonly formBuilder: FormBuilder = inject(FormBuilder);
  readonly contextMenuService: ContextMenuService = inject(ContextMenuService);
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

  onNameChange(task: TaskDto): void {
    this.onUpdateTask(task);
  }

  onCheck(task: TaskDto): void {
    this.onUpdateTask(task);
  }

  onUpdateTask(updatedTask: TaskDto): void {
    this.taskService.update(updatedTask.id, updatedTask);
  }

  onDelete(id: ID): void {
    this.taskService.delete(id);
  }

  onSelectTask(task: TaskDto): void {
    const selectedChanged: boolean = this.selectedTask?.id !== task.id;

    this.taskService.selectedChange(task, selectedChanged);
  }

  onOpenContextMenuTaskRow(cmData: ContextMenuData): void {
    this.contextMenuService.onOpen(cmData);
  }

  onCloseContextMenuTaskRow(): void {
    this.contextMenuService.onClose();
  }

  private resetForm(): void {
    this.taskControl.reset();
  }
}
