import {
  ChangeDetectionStrategy,
  Component,
  effect,
  HostListener,
  inject,
  input,
  output,
  OutputEmitterRef,
  Signal,
} from '@angular/core';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCircle, faCircleCheck, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { TaskStatus } from '../../domain/dtos/task-status.enum';
import { TaskDto } from '../../domain/dtos/task.dto';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { ID } from '../../../../shared/api/domain/dtos/api.dtos';
import {
  ContextMenuData,
  ContextMenuItem,
} from '../../../../shared/menu/context-menu/models/context-menu-data.model';
import { TagComponent } from '../../../../shared/components/tag/tag.component';
import { TaskFacade } from '../../services/task.facade';
import { InlineTaskForm } from '../../domain/dtos/task-form.dto';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'one-task-table',
  imports: [ReactiveFormsModule, FontAwesomeModule, FormsModule],
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

  readonly taskFacade: TaskFacade = inject(TaskFacade);
  readonly formBuilder: FormBuilder = inject(FormBuilder);

  openContextMenu: OutputEmitterRef<ContextMenuData> = output<ContextMenuData>();
  closeContextMenu: OutputEmitterRef<void> = output<void>();

  tasks: Signal<TaskDto[]> = this.taskFacade.tasks;
  selectedTask: Signal<TaskDto | undefined> = this.taskFacade.selectedTask;
  selectedTaskId: Signal<ID | undefined> = this.taskFacade.selectedTaskId;

  inlineTaskForm: FormGroup = this.formBuilder.group({
    name: this.formBuilder.control('', []),
  });

  private readonly _contextmenu: ContextMenuItem[] = [
    { libelle: 'Supprimer', action: (task: TaskDto) => this.onDelete(task) },
  ];

  constructor() {
    this.loadFormInlineTaskEffect();
    this.subscribeToFormChanges();
  }

  private loadFormInlineTaskEffect(): void {
    effect(() => {
      const task: TaskDto | undefined = this.selectedTask();
      if (task) {
        this.inlineTaskForm.setValue({
          name: task.name,
        });
      }
    });
  }

  private subscribeToFormChanges(): void {
    this.inlineTaskForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged((prev, curr) => prev.name === curr.name),
        takeUntilDestroyed(),
      )
      .subscribe((inlineTaskForm: InlineTaskForm) => {
        const task = this.selectedTask();
        if (task) {
          task.name = inlineTaskForm.name ?? task.name;
          this.taskFacade.update(task);
        }
      });
  }

  getSelectedClass(task: TaskDto) {
    return this.isSelectedTask(task) ? 'row selected' : 'row';
  }

  isSelectedTask(task: TaskDto): boolean {
    return task.id === this.selectedTaskId();
  }

  onClickRow(task: TaskDto): void {
    this.taskFacade.select(task.id);
  }

  onCheck(task: TaskDto): void {
    task.status = task.status === TaskStatus.Todo ? TaskStatus.Done : TaskStatus.Todo;
    console.log('onCheck: before update');
    this.taskFacade.update(task);
  }

  @HostListener('window:keydown.delete', ['$event'])
  onDelete(task: TaskDto, event?: any): void {
    const id: ID = task.id;
    if (id) {
      this.taskFacade.delete(id);
    }
    event?.stopPropagation();
  }

  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: MouseEvent, task: TaskDto): void {
    event.preventDefault();
    this.onClickRow(task);
    this.openContextMenu.emit({
      items: this._contextmenu,
      mousePosition: { x: event.clientX, y: event.clientY },
    });
  }

  @HostListener('document:click')
  closeMenu() {
    this.closeContextMenu.emit();
  }
}
