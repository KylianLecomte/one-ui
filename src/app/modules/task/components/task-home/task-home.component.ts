import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../../shared/toast/services/toast.service';
import { TaskService } from '../../services/task.service';
import { Task, TaskCreate } from '../../domain/dtos/task.dto';
import { TaskState } from '../../domain/dtos/task-state.enum';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { LayoutComponent } from '../../../../shared/components/layout/layout.component';
import { NgClass } from '@angular/common';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'one-task-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FontAwesomeModule,
    LayoutComponent,
    NgClass,
  ],
  templateUrl: './task-home.component.html',
  styleUrl: './task-home.component.scss',
})
export class TaskHomeComponent implements OnInit {
  toastService: ToastService = inject(ToastService);
  taskService: TaskService = inject(TaskService);
  formBuilder: FormBuilder = inject(FormBuilder);
  tasks: Task[] = [];
  taskControl: FormControl = this.formBuilder.control("", [Validators.required]);
  selectedTaskId?: string;
  protected readonly faTrashCan: IconDefinition = faTrashCan;

  get selectedTask(): Task | undefined {
    return this.tasks.find((task: Task): boolean => task.id === this.selectedTaskId);
  }

  ngOnInit(): void {
    this.taskService.getAll().subscribe({
      next: (tasks: Task[]): void => {
        this.tasks = tasks;
      },
      error: (error: any): void => {
        console.error(error);
      },
    })
  }

  onClickAddTask(): void {
    if (!this.taskControl.valid) {
      return;
    }

    const task: TaskCreate = {
      name: this.taskControl.value,
      state: TaskState.Todo,
      stateDate: new Date(),
      description: "" ,
    }

    this.taskService.create(task).subscribe({
      next: (task: Task): void => {
        this.tasks.push(task);
        this.toastService.success("La tâche a été créée", "");
        this.resetForm();
      },
      error: (error: any): void => {
        console.error(error);
      }
    });
  }

  onSelected(taskId: string): void {
    this.selectedTaskId = this.taskIsSelected(taskId) ? undefined : taskId;
  }

  onCheck(task: Task): void {
    task.state = task.state === TaskState.Todo ? TaskState.Done : TaskState.Todo

    this.taskService.update(task.id, task).subscribe({
      next: (): void => {
        this.toastService.success("La tâche a été mise à jour", "")
      },
      error: (error: any): void => {
        console.error(error);
      }
    });
  }

  onDelete(task: Task): void {
    this.taskService.delete(task.id).subscribe({
      next: (): void => {
        this.toastService.success("La tâche a été supprimée", "");
        this.tasks = this.tasks.filter((t: Task): boolean => t.id !== task.id);
      },
      error: (error: any): void => {
        console.error(error);
      }
    });
  }

  taskIsSelected(taskId: string): boolean {
    return this.selectedTaskId === taskId;
  }

  taskIsDone(taskState: TaskState): boolean {
    return taskState === TaskState.Done;
  }

  private resetForm(): void {
    this.taskControl.reset();
  }
}
