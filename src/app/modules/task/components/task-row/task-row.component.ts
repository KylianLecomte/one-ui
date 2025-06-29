import {
  ChangeDetectionStrategy,
  Component,
  effect,
  HostBinding,
  HostListener,
  input,
  InputSignal,
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

@Component({
  selector: 'one-task-row',
  imports: [ReactiveFormsModule, FontAwesomeModule, FormsModule],
  templateUrl: './task-row.component.html',
  styleUrl: './task-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskRowComponent implements OnInit {
  readonly faTrashCan: IconDefinition = faTrashCan;
  readonly faCircleCheck: IconDefinition = faCircleCheck;
  readonly faCircle: IconDefinition = faCircle;
  readonly faTimesCircle: IconDefinition = faTimesCircle;
  readonly TaskState: typeof TaskState = TaskState;

  taskNameCtrl!: string;

  task: InputSignal<TaskDto> = input.required<TaskDto>();

  selected: OutputEmitterRef<boolean> = output<boolean>();
  updateName: OutputEmitterRef<string> = output<string>();
  check: OutputEmitterRef<TaskState> = output<TaskState>();
  delete: OutputEmitterRef<ID> = output<ID>();
  openContextMenu: OutputEmitterRef<ContextMenuData> = output<ContextMenuData>();
  closeContextMenu: OutputEmitterRef<void> = output<void>();

  @HostBinding('class') hostClass: string = 'row';

  private readonly _contextmenu: ContextMenuItem[] = [
    { libelle: 'Supprimer', action: () => this.onDelete() },
  ];

  constructor() {
    effect((): void => {
      this.hostClass = this.task()?.isSelected ? 'row selected' : 'row ';

      if (this.task()?.isSelected) {
        this.taskNameCtrl = this.task().name;
      }
    });
  }

  ngOnInit(): void {
    this.taskNameCtrl = this.task().name;
  }

  @HostListener('click')
  onSelected(): void {
    this.selected.emit(!this.task().isSelected);
  }

  onCheck(): void {
    const state: TaskState = this.task().state === TaskState.Todo ? TaskState.Done : TaskState.Todo;
    this.check.emit(state);
  }

  @HostListener('window:keydown.delete', ['$event'])
  onDelete(event?: any): void {
    console.log('onDelete');
    const id: ID = this.task().id;
    if (id) {
      this.delete.emit(id);
    }
    event?.stopPropagation();
  }

  onNameChange(name: string): void {
    this.updateName.emit(name);
  }

  onBlur(): void {
    this.onNameChange(this.taskNameCtrl);
  }

  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: MouseEvent): void {
    event.preventDefault();
    this.onSelected();
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
