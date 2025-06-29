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

@Component({
  selector: 'one-task',
  imports: [
    ReactiveFormsModule,
    FontAwesomeModule,
    LayoutComponent,
    TaskDetailsComponent,
    TableComponent,
    FormsModule,
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
  protected readonly stateCellTemplate = viewChild<TemplateRef<unknown>>('stateCellTemplate');
  protected readonly nameCellTemplate = viewChild<TemplateRef<unknown>>('nameCellTemplate');
  protected readonly trashCellTemplate = viewChild<TemplateRef<unknown>>('trashCellTemplate');
  readonly taskService: TaskService = inject(TaskService);
  readonly formBuilder: FormBuilder = inject(FormBuilder);
  readonly contextMenuService: ContextMenuService = inject(ContextMenuService);
  taskControl: FormControl = this.formBuilder.control('', [Validators.required]);

  columns: Signal<ColumnDef[]> = computed(() => {
    const stateCellTemplate = this.stateCellTemplate();
    const nameCellTemplate = this.nameCellTemplate();
    const trashCellTemplate = this.trashCellTemplate();

    return [
      { dataKey: 'state', cellTemplate: stateCellTemplate },
      { dataKey: 'name', cellTemplate: nameCellTemplate },
      { dataKey: 'trash', cellTemplate: trashCellTemplate },
    ];
  });

  datas: Signal<DataDef<TaskDto>[]> = computed(() => {
    return this.tasks.map((t) => {
      const formCtrl = this.formBuilder.control(t.name);
      formCtrl.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
        value && this.onNameChange(value, t);
      });

      return {
        data: t,
        form: formCtrl,
      };
    });
  });

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

  // onUpdateTaskName(name: string, task: TaskDto): void {
  //   task.name = name;
  //   this.onUpdateTask(task);
  // }

  onBlur(task: TaskDto): void {
    console.log('onBlur');
    // this.onNameChange(this.taskNameCtrl);
    // task.name = ...;
    this.onUpdateTask(task);
  }

  onNameChange(name: string, task: TaskDto): void {
    console.log('onNameChange', name);

    task.name = name;
    this.onUpdateTask(task);
  }

  // onCheck(): void {
  //   console.log('onCheck');
  //
  //   const state: TaskState = this.task().state === TaskState.Todo ? TaskState.Done : TaskState.Todo;
  //   this.check.emit(state);
  // }

  onCheck(task: TaskDto): void {
    task.state = task.state === TaskState.Todo ? TaskState.Done : TaskState.Todo;
    this.onUpdateTask(task);
  }

  onUpdateTask(updatedTask: TaskDto): void {
    this.taskService.update(updatedTask.id, updatedTask);
  }

  // onDeleteTask(taskId: ID): void {
  //   this.taskService.delete(taskId);
  // }

  // @HostListener('window:keydown.delete', ['$event'])
  onDelete(task: TaskDto, event?: any): void {
    console.log('onDelete');
    // const id: ID = this.task().id;
    // if (id) {
    //   this.delete.emit(id);
    // }
    // event?.stopPropagation();

    this.taskService.delete(task.id);
  }

  onSelectTask(task: TaskDto): void {
    const selected: boolean = this.selectedTask?.id === task.id;

    this.taskService.selectedChange(task, selected);
  }

  onOpenContextMenuTaskRow(cmData: ContextMenuData): void {
    this.contextMenuService.onOpen(cmData);
  }

  onCloseContextMenuTaskRow(): void {
    this.contextMenuService.onClose();
  }

  click(obj: any): void {
    console.log(obj);
  }

  private resetForm(): void {
    this.taskControl.reset();
  }
}
