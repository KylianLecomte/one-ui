import {
  Component,
  computed,
  effect,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnInit,
  Signal,
} from '@angular/core';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCircle, faCircleCheck, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { TaskState } from '../../domain/dtos/task-state.enum';
import { ITask } from '../../domain/dtos/task.dto';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { TaskStateService } from '../../services/task.state.service';

@Component({
  selector: 'one-task-row',
  standalone: true,
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

  taskService: TaskService = inject(TaskService);
  taskStateService: TaskStateService = inject(TaskStateService);

  @Input({ required: true }) task!: ITask;
  taskNameCtrl!: string;

  @HostBinding('class') hostClass: string = 'row';

  isSelected: Signal<boolean> = computed(
    (): boolean => this.taskStateService.selectedTask()?.id === this.task.id,
  );

  constructor() {
    effect((): void => {
      this.hostClass = this.isSelected() ? 'row selected' : 'row ';

      const selectedTask: ITask | undefined = this.taskStateService.selectedTask();
      if (selectedTask && selectedTask?.id === this.task.id) {
        this.taskNameCtrl = selectedTask.name;
      }
    });
  }

  ngOnInit(): void {
    this.taskNameCtrl = this.task.name;
  }

  @HostListener('click')
  onSelected(): void {
    this.taskStateService.setSelectedTask(this.task);
  }

  onCheck(): void {
    this.task.state = this.task.state === TaskState.Todo ? TaskState.Done : TaskState.Todo;

    this.taskService.update(this.task.id, this.task);
  }

  @HostListener('window:keydown.delete', ['$event'])
  onDelete(event: any): void {
    this.taskService.delete(this.task.id);
    event.stopPropagation();
  }

  onTaskNameChange(value: string): void {
    this.taskStateService.selectedTaskNameChanged(value);
  }

  onBlur(): void {
    this.taskService.update(this.task.id, {
      ...this.task,
      name: this.taskNameCtrl,
    });
  }
}
