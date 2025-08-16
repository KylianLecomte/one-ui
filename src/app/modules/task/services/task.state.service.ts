import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { TaskDto } from '../domain/dtos/task.dto';
import { ID } from '../../../shared/api/domain/dtos/api.dtos';
import { getTasksFilteredOnId, toSortedTasks } from '../domain/utils/task.utils';

@Injectable({
  providedIn: 'root',
})
export abstract class TaskStateService {
  tasks: WritableSignal<TaskDto[]> = signal([]);

  selectedTaskId: WritableSignal<ID | undefined> = signal(undefined);
  selectedTask: Signal<TaskDto | undefined> = computed(() =>
    this.getTaskById(this.selectedTaskId())
  );

  isTasksLoaded: WritableSignal<boolean> = signal(false);
  isTasksLoading: WritableSignal<boolean> = signal(false);

  updateStateSelected(id: ID): void {
    const taskFounded: TaskDto | undefined = this.getTaskById(id);
    if (taskFounded) {
      this.selectedTaskId.set(taskFounded.id);
    }
  }

  protected updateStateTask(updatedTask: TaskDto): void {
    const newTasks: TaskDto[] = getTasksFilteredOnId(this.tasks(), updatedTask.id);
    newTasks.push(updatedTask);

    this.updateTasks(newTasks);
  }

  protected deleteStateTask(id: ID): void {
    const newTasks: TaskDto[] = getTasksFilteredOnId(this.tasks(), id);

    this.updateTasks(newTasks);
  }

  protected addStateTask(task: TaskDto): void {
    this.tasks().push(task);

    this.updateTasks(this.tasks());
  }

  protected updateTasks(tasks: TaskDto[]): void {
    this.tasks.update(() => [...toSortedTasks(tasks)]);
  }

  private getTaskById(id?: ID): TaskDto | undefined {
    if (!id) {
      return undefined;
    }

    return this.tasks().find((t) => t.id === id);
  }
}
