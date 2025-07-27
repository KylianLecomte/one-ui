import {
  Component,
  effect,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Signal,
} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskDto } from '../../domain/dtos/task.dto';
import { TaskFacade } from '../../store/task.facade';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TaskDetailsForm } from '../../domain/dtos/task-form.dto';

@Component({
  selector: 'one-task-details',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent {
  readonly taskFacade: TaskFacade = inject(TaskFacade);
  readonly formBuilder: FormBuilder = inject(FormBuilder);

  $selectedTask: Signal<TaskDto | undefined> = this.taskFacade.$selectedTask;
  // task: InputSignal<TaskDto> = input.required<TaskDto>();
  // update: OutputEmitterRef<TaskDto> = output<TaskDto>();

  taskForm: FormGroup = this.formBuilder.group({
    name: this.formBuilder.control('', []),
    description: this.formBuilder.control('', []),
  });

  constructor() {
    this.loadFormTaskEffect();
    this.subscribeToFormChanges();
  }

  private loadFormTaskEffect(): void {
    effect(() => {
      const task: TaskDto | undefined = this.taskFacade.$selectedTask();
      if (task) {
        this.taskForm.setValue({
          name: task.name,
          description: task.description,
        });
      }
    });
  }

  private subscribeToFormChanges(): void {
    this.taskForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((value: TaskDetailsForm) => {
        this.taskFacade.updateTaskDetails(value);
      });
  }

  // onTaskNameChange(name: string): void {
  // this.task().name = name;
  // this.update.emit(this.task());
  //   this.taskFacade.updateTask();
  // }

  // onBlur(): void {
  // console.log(this.task());
  // this.update.emit(this.task());
  //   this.taskFacade.updateTask();
  // }
}
