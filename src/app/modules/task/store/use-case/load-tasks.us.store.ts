import { Injectable } from '@angular/core';
import { TaskState } from '../../domain/dtos/task.store.dto';
import { TaskDto } from '../../domain/dtos/task.dto';
import { toSortedTasks } from '../../domain/utils/task.utils';
import { TaskStoreBase } from '../task.base.store';

@Injectable({
  providedIn: 'root',
})
export class LoadTaskUsStore extends TaskStoreBase {
  // Actions
  loadTasksAction(): void {
    this.loadTasksEffect();
  }

  getTasksAction(): void {
    this.getTasksReducer();
    this.getTasksEffect();
  }

  getTasksResultAction(tasks: TaskDto[]): void {
    this.getTasksResultReducer(tasks);
  }

  // Selectors

  // Reducers
  private getTasksReducer(): void {
    this.$taskState.update((oldState: TaskState) => ({
      ...oldState,
      isLoading: true,
      tasks: [],
    }));
  }

  private getTasksResultReducer(tasks?: TaskDto[]): void {
    this.$taskState.update((oldState: TaskState) => {
      const updatedTaskList: TaskDto[] = tasks ? tasks : oldState.tasks;
      return {
        ...oldState,
        selectedTask: undefined,
        isLoading: false,
        tasks: [...toSortedTasks(updatedTaskList)],
      };
    });
  }

  // Effects
  private loadTasksEffect(): void {
    if (!this.$isTasksLoading()) {
      this.getTasksAction();
    }
  }

  private getTasksEffect(): void {
    this.taskService.getAll((data: TaskDto[]) => this.getTasksResultAction(data));
  }
}
