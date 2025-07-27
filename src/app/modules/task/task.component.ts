import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  Signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from './services/task.service';
import { TaskDto } from './domain/dtos/task.dto';
import { TaskStatus } from './domain/dtos/task-status.enum';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LayoutComponent } from '../../shared/layout/layout.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { ContextMenuService } from '../../shared/menu/context-menu/services/context-menu.service';
import { ContextMenuData } from '../../shared/menu/context-menu/models/context-menu-data.model';
import { ColumnDef, DataDef, TableComponent } from '../../shared/table/table.component';
import { faCircle, faCircleCheck, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { TaskTableComponent } from './components/task-table/task-table.component';
import { ID } from '../../shared/api/domain/dtos/api.dtos';
import { TaskFacade } from './store/task.facade';
import { ToastService } from '../../shared/toast/services/toast.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NewTaskForm, TaskDetailsForm, TaskInlineForm } from './domain/dtos/task-form.dto';

@Component({
  selector: 'one-task',
  imports: [
    ReactiveFormsModule,
    FontAwesomeModule,
    LayoutComponent,
    TaskDetailsComponent,
    FormsModule,
    TaskTableComponent,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  protected readonly faCircle = faCircle;
  protected readonly faTimesCircle = faTimesCircle;
  protected readonly faCircleCheck = faCircleCheck;
  protected readonly faTrashCan = faTrashCan;

  readonly taskService: TaskService = inject(TaskService);
  readonly toastService: ToastService = inject(ToastService);
  readonly formBuilder: FormBuilder = inject(FormBuilder);
  readonly contextMenuService: ContextMenuService = inject(ContextMenuService);

  // taskControl: FormControl = this.formBuilder.control('', [Validators.required]);
  newTaskForm: FormGroup = this.formBuilder.group({
    name: this.formBuilder.control('', [Validators.required]),
  });

  taskInlineForm: FormGroup = this.formBuilder.group({
    name: this.formBuilder.control('', [Validators.required]),
  });

  readonly taskFacade: TaskFacade = inject(TaskFacade);

  $tasks: Signal<TaskDto[]> = this.taskFacade.$tasks;
  $isSelectedTask: Signal<boolean> = this.taskFacade.$isSelectedTask;
  $selectedTask: Signal<TaskDto | undefined> = this.taskFacade.$selectedTask;

  // get tasks(): TaskDto[] {
  //   return this.taskService.tasks();
  // }

  // get selectedTask(): TaskDto | undefined {
  //   return this.taskService.selectedTask();
  // }

  constructor() {
    this.taskFacade.loadTasks();
    // this.taskService.getAll();
    this.subscribeToNewTaskFormChanges();
    this.subscribeToTaskInlineFormChanges();
  }

  subscribeToNewTaskFormChanges(): void {
    this.newTaskForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((newTaskForm: NewTaskForm) => {
        this.taskFacade.setNewTaskForm(newTaskForm);
      });
  }

  subscribeToTaskInlineFormChanges(): void {
    this.taskInlineForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((taskInlineForm: TaskInlineForm) => {
        this.taskFacade.setTaskInlineForm(taskInlineForm);
      });
  }

  onSubmitAddNewTask(): void {
    if (!this.newTaskForm.valid) {
      this.toastService.error("Ajout d'une nouvelle tâche", 'Formulaire invalide');
      return;
    }

    // const task: TaskDto = {
    //   name: this.taskControl.value,
    //   status: TaskStatus.Todo,
    //   stateDate: new Date(),
    //   description: '',
    //   isSelected: false,
    // };

    this.taskFacade.addNewTask();

    // this.taskService.create(task);
    // this.resetForm();
  }

  onNameChange(task: TaskDto): void {
    console.log('test shortcut');
    this.onUpdateTask(task);
  }

  onCheck(task: TaskDto): void {
    console.log('test shortcut');
    this.onUpdateTask(task);
  }

  onUpdateTask(updatedTask: TaskDto): void {
    console.log('test shortcut');
    // this.taskService.update(updatedTask.id, updatedTask);
  }

  onDelete(id: ID): void {
    this.taskService.delete(id);
  }

  onSelectTask(task: TaskDto): void {
    this.taskFacade.selectTask(task);
    // const selectedChanged: boolean = this.selectedTask?.id !== task.id;
    // this.taskService.selectedChange(task, selectedChanged);
  }

  onOpenContextMenuTaskRow(cmData: ContextMenuData): void {
    this.contextMenuService.onOpen(cmData);
  }

  onCloseContextMenuTaskRow(): void {
    this.contextMenuService.onClose();
  }

  // private resetForm(): void {
  // this.taskControl.reset();
  // }
}
