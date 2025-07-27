import { inject, Injectable, Signal } from '@angular/core';
import { TaskDto } from '../domain/dtos/task.dto';
import { TaskStore } from './task.store';
import { NewTaskForm, TaskDetailsForm, TaskInlineForm } from '../domain/dtos/task-form.dto';
import { SelectTaskUsStore } from './use-case/select-task.us.store';
import { LoadTaskUsStore } from './use-case/load-tasks.us.store';

@Injectable({
  providedIn: 'root',
})
export class TaskFacade {
  private taskStore: TaskStore = inject(TaskStore);
  private selectTaskUsStore: SelectTaskUsStore = inject(SelectTaskUsStore);
  private loadTaskUsStore: LoadTaskUsStore = inject(LoadTaskUsStore);

  $isSelectedTask: Signal<boolean> = this.taskStore.$isSelectedTask;

  $tasks: Signal<TaskDto[]> = this.taskStore.$tasks;
  $selectedTask: Signal<TaskDto | undefined> = this.taskStore.$selectedTask;

  selectTask(task: TaskDto): void {
    this.selectTaskUsStore.selectTaskAction(task);
  }

  setNewTaskForm(newTaskForm: NewTaskForm): void {
    this.taskStore.setNewTaskFormAction(newTaskForm);
  }

  setTaskInlineForm(taskInlineForm: TaskInlineForm): void {
    this.taskStore.setTaskInlineFormAction(taskInlineForm);
    this.taskStore.updateTaskInlineAction();
  }

  loadTasks(): void {
    this.loadTaskUsStore.loadTasksAction();
  }

  addNewTask(): void {
    this.taskStore.addNewTaskAction();
  }

  updateTaskDetails(TaskDetails: TaskDetailsForm): void {
    this.taskStore.setTaskFormAction(TaskDetails);
    this.taskStore.updateTaskDetailsAction();
  }
}
