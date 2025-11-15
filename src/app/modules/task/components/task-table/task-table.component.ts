import {
  ChangeDetectionStrategy,
  Component,
  effect,
  HostListener,
  inject,
  Signal,
} from '@angular/core';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCircle, faCircleCheck, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { TaskStatus } from '../../types/task-status.type';
import { TaskDto } from '../../dtos/task.dto';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { ID } from '../../../../shared/api/domain/dtos/api.dtos';
import { ContextMenuItem } from '../../../../shared/menu/context-menu/models/context-menu-data.model';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContextMenuService } from '../../../../shared/menu/context-menu/services/context-menu.service';
import { TaskService } from '../../services/task.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'one-task-table',
  imports: [ReactiveFormsModule, FontAwesomeModule, FormsModule, ButtonComponent],
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskTableComponent {
  readonly faTrashCan: IconDefinition = faTrashCan;
  readonly faCircleCheck: IconDefinition = faCircleCheck;
  readonly faCircle: IconDefinition = faCircle;
  readonly faTimesCircle: IconDefinition = faTimesCircle;
  readonly TaskStatus: typeof TaskStatus = TaskStatus;

  readonly taskService: TaskService = inject(TaskService);
  readonly formBuilder: FormBuilder = inject(FormBuilder);
  readonly contextMenuService: ContextMenuService = inject(ContextMenuService);

  tasks: Signal<TaskDto[]> = this.taskService.tasks;
  selectedTask: Signal<TaskDto | undefined> = this.taskService.selectedTask;
  selectedTaskId: Signal<ID | undefined> = this.taskService.selectedTaskId;

  taskForm: FormGroup = this.formBuilder.group({
    name: this.formBuilder.control('', []),
    description: this.formBuilder.control('', []),
  });

  private readonly _contextmenu: ContextMenuItem[] = [
    { libelle: 'Supprimer', action: (task: TaskDto) => this.onDelete(task) },
  ];

  constructor() {
    this.loadFormTaskEffect();
    this.subscribeToFormChanges();
    this.taskService.getAll();
  }

  isSelectedTask(task: TaskDto): boolean {
    return task.id === this.selectedTaskId();
  }

  getSelectedClass(task: TaskDto) {
    return this.isSelectedTask(task) ? 'task selected' : 'task';
  }

  onClickRow(task: TaskDto): void {
    this.taskService.updateStateSelected(task.id);
  }

  onCheck(task: TaskDto): void {
    task.status = task.status === TaskStatus.TODO ? TaskStatus.DONE : TaskStatus.TODO;
    this.taskService.update(task);
  }

  @HostListener('window:keydown.delete', ['$event'])
  onDelete(task: TaskDto, event?: any): void {
    const id: ID = task.id;
    if (id) {
      this.taskService.delete(id);
    }
    event?.stopPropagation();
  }

  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: MouseEvent): void {
    event.preventDefault();
    this.contextMenuService.onOpen({
      items: this._contextmenu,
      mousePosition: { x: event.clientX, y: event.clientY },
    });
  }

  @HostListener('document:click')
  closeMenu() {
    this.contextMenuService.onClose();
  }

  private loadFormTaskEffect(): void {
    effect(() => {
      const task: TaskDto | undefined = this.selectedTask();
      if (task) {
        this.taskForm.setValue(
          {
            name: task.name,
            description: task.description,
          },
          { emitEvent: false }
        );
      }
    });
  }

  private subscribeToFormChanges(): void {
    this.taskForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(
          (prev, curr) => prev.name === curr.name && prev.description === curr.description
        ),
        takeUntilDestroyed()
      )
      .subscribe((taskDto: TaskDto) => {
        const task: TaskDto | undefined = this.selectedTask();
        if (task) {
          task.name = taskDto.name ?? task.name;
          task.description = taskDto.description ?? task.description;
          this.taskService.update(task);
        }
      });
  }
}
