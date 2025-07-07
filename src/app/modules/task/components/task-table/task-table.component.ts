import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  HostBinding,
  HostListener,
  input,
  OnInit,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCircle, faCircleCheck, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { TaskState } from '../../domain/dtos/task-state.enum';
import { TaskDto } from '../../domain/dtos/task.dto';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { ID } from '../../../../shared/api/domain/dtos/api.dtos';
import {
  ContextMenuData,
  ContextMenuItem,
} from '../../../../shared/menu/context-menu/models/context-menu-data.model';
import { TaskFormDto } from '../../domain/dtos/task-form.dto';

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
  readonly TaskState: typeof TaskState = TaskState;

  tasks = input.required<TaskDto[]>();

  check: OutputEmitterRef<TaskDto> = output<TaskDto>();
  delete: OutputEmitterRef<ID> = output<ID>();
  selected: OutputEmitterRef<TaskDto> = output<TaskDto>();
  updateName: OutputEmitterRef<TaskDto> = output<TaskDto>();
  openContextMenu: OutputEmitterRef<ContextMenuData> = output<ContextMenuData>();
  closeContextMenu: OutputEmitterRef<void> = output<void>();

  private readonly _contextmenu: ContextMenuItem[] = [
    { libelle: 'Supprimer', action: (task: TaskDto) => this.onDelete(task) },
  ];

  isSelectedClass(task: TaskDto) {
    return task?.isSelected ? 'row selected' : 'row';
  }

  onClickRow(task: TaskDto): void {
    task.isSelected = !task.isSelected;
    this.selected.emit(task);
  }

  onCheck(task: TaskDto): void {
    task.state = task.state === TaskState.Todo ? TaskState.Done : TaskState.Todo;
    this.check.emit(task);
  }

  @HostListener('window:keydown.delete', ['$event'])
  onDelete(task: TaskDto, event?: any): void {
    console.log('onDelete');
    const id: ID = task.id;
    if (id) {
      this.delete.emit(id);
    }
    event?.stopPropagation();
  }

  onBlur(task: TaskDto): void {
    console.log("TASK.TABLE:onblur", task);
    this.updateName.emit(task);
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
