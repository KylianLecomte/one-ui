import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'one-task-details',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent {
  // readonly taskFacade: TaskFacade = inject(TaskFacade);
  // readonly formBuilder: FormBuilder = inject(FormBuilder);
  //
  // selectedTask: Signal<TaskDto | undefined> = this.taskFacade.selectedTask;
  //
  // taskForm: FormGroup = this.formBuilder.group({
  //   name: this.formBuilder.control('', []),
  //   description: this.formBuilder.control('', []),
  // });
  //
  // constructor() {
  //   this.loadFormTaskEffect();
  //   this.subscribeToFormChanges();
  // }
  //
  // private loadFormTaskEffect(): void {
  //   effect(() => {
  //     const task: TaskDto | undefined = this.selectedTask();
  //     if (task) {
  //       this.taskForm.setValue({
  //         name: task.name,
  //         description: task.description,
  //       });
  //     }
  //   });
  // }
  //
  // private subscribeToFormChanges(): void {
  //   this.taskForm.valueChanges
  //     .pipe(
  //       debounceTime(300),
  //       distinctUntilChanged(
  //         (prev, curr) => prev.name === curr.name && prev.description === curr.description,
  //       ),
  //       takeUntilDestroyed(),
  //     )
  //     .subscribe((taskForm: TaskForm) => {
  //       const task = this.selectedTask();
  //       if (task) {
  //         task.name = taskForm.name ?? task.name;
  //         task.description = taskForm.description ?? task.description;
  //         this.taskFacade.update(task);
  //       }
  //     });
  // }
}
