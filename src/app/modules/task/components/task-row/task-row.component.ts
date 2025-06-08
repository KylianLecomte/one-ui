import {
  Component,
  computed,
  effect,
  HostBinding,
  HostListener,
  inject,
  input,
  InputSignal,
  OnInit,
  Signal,
} from '@angular/core';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCircle, faCircleCheck, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { TaskState } from '../../domain/dtos/task-state.enum';
import { TaskDto } from '../../domain/dtos/task.dto';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'one-task-row',
  imports: [ReactiveFormsModule, FontAwesomeModule, FormsModule],
  templateUrl: './task-row.component.html',
  styleUrl: './task-row.component.scss',
})
export class TaskRowComponent implements OnInit {
  readonly faTrashCan: IconDefinition = faTrashCan;
  readonly faCircleCheck: IconDefinition = faCircleCheck;
  readonly faCircle: IconDefinition = faCircle;
  readonly faTimesCircle: IconDefinition = faTimesCircle;
  readonly TaskState: typeof TaskState = TaskState;

  // TODO remove
  taskService: TaskService = inject(TaskService);

  task: InputSignal<TaskDto> = input.required<TaskDto>();
  taskNameCtrl!: string;

  @HostBinding('class') hostClass: string = 'row';

  isSelected: Signal<boolean> = computed(
    (): boolean => this.taskService.selectedTask()?.id === this.task().id,
  );

  constructor() {
    effect((): void => {
      this.hostClass = this.isSelected() ? 'row selected' : 'row ';

      const selectedTask: TaskDto | undefined = this.taskService.selectedTask();
      if (selectedTask && selectedTask?.id === this.task().id) {
        this.taskNameCtrl = selectedTask.name;
      }
    });
  }

  ngOnInit(): void {
    this.taskNameCtrl = this.task().name;
  }

  @HostListener('click')
  onSelected(): void {
    this.taskService.setSelectedTask(this.task());
  }

  onCheck(): void {
    this.task().state = this.task().state === TaskState.Todo ? TaskState.Done : TaskState.Todo;

    // TODO remove
    this.taskService.update(this.task().id, this.task());
  }

  @HostListener('window:keydown.delete', ['$event'])
  onDelete(event: any): void {
    // TODO remove
    this.taskService.delete(this.task().id);
    event.stopPropagation();
  }

  onTaskNameChange(value: string): void {
    this.taskService.selectedTaskNameChanged(value);
  }

  onBlur(): void {
    this.taskService.update(this.task().id, {
      ...this.task(),
      name: this.taskNameCtrl,
    });
  }
}
