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
import { TaskFacade } from './services/task.facade';
import { ToastService } from '../../shared/toast/services/toast.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AddTaskForm, TaskForm, InlineTaskForm } from './domain/dtos/task-form.dto';
import { getNewTask } from './domain/utils/task.utils';

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
  readonly toastService: ToastService = inject(ToastService);
  readonly formBuilder: FormBuilder = inject(FormBuilder);
  readonly contextMenuService: ContextMenuService = inject(ContextMenuService);
  readonly taskFacade: TaskFacade = inject(TaskFacade);

  newTaskForm: FormGroup = this.formBuilder.group({
    name: this.formBuilder.control('', [Validators.required]),
  });

  isSelectedTask: Signal<boolean> = this.taskFacade.isSelectedTask;

  constructor() {
    this.taskFacade.getAll();
  }

  onSubmitAddNewTask(): void {
    if (!this.newTaskForm.valid) {
      this.toastService.error("Ajout d'une nouvelle tâche", 'Formulaire invalide');
      return;
    }

    const taskName: string | undefined = this.newTaskForm.get('name')?.value;
    if (!taskName) {
      this.toastService.error("Ajout d'une nouvelle tâche", 'Nom invalide');
      return;
    }

    const task: TaskDto = getNewTask(taskName);

    this.taskFacade.create(task, () => this.resetForm());
  }

  private resetForm(): void {
    this.newTaskForm.reset();
  }
}
