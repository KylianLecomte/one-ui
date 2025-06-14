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

  task: InputSignal<TaskDto> = input.required<TaskDto>();
  taskNameCtrl!: string;

  selected: OutputEmitterRef<boolean> = output<boolean>();
  updateName: OutputEmitterRef<string> = output<string>();
  check: OutputEmitterRef<TaskState> = output<TaskState>();
  delete: OutputEmitterRef<ID> = output<ID>();

  @HostBinding('class') hostClass: string = 'row';

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
  onDelete(event: any): void {
    const id: ID = this.task().id;
    if (id) {
      this.delete.emit(id);
    }
    event.stopPropagation();
  }

  onNameChange(name: string): void {
    this.updateName.emit(name);
  }

  onBlur(): void {
    this.onNameChange(this.taskNameCtrl);
  }
}
