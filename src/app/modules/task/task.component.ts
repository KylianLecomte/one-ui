import { Component, inject, Signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskDto } from './domain/dtos/task.dto';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LayoutComponent } from '../../shared/layout/layout.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { ContextMenuService } from '../../shared/menu/context-menu/services/context-menu.service';
import { TaskTableComponent } from './components/task-table/task-table.component';
import { TaskFacade } from './services/task.facade';
import { ToastService } from '../../shared/toast/services/toast.service';
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
    this.taskFacade.getAll().subscribe();
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

    this.taskFacade.create(task).subscribe(() => {
      this.resetForm();
    });
  }

  private resetForm(): void {
    this.newTaskForm.reset();
  }
}
