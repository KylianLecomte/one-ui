import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { TaskDto } from '../domain/dtos/task.dto';
import { ID } from '../../../shared/api/domain/dtos/api.dtos';
import { getTasksFilteredOnId } from '../domain/utils/task.utils';

@Injectable({
  providedIn: 'root',
})
export abstract class TaskStateService {
  private readonly _tasks: WritableSignal<TaskDto[]> = signal([]);
  private readonly _selectedTask: WritableSignal<TaskDto | undefined> = signal(undefined);

  get tasks(): Signal<TaskDto[]> {
    return this._tasks.asReadonly();
  }

  get selectedTask(): Signal<TaskDto | undefined> {
    return this._selectedTask.asReadonly();
  }

  get selectedTaskValue(): TaskDto | undefined {
    return this._selectedTask();
  }

  setSelectedTask(task: TaskDto): void {
    this._selectedTask.set({ ...task });
  }

  setTasks(tasks: TaskDto[]): void {
    this._tasks.set([...tasks]);
  }

  selectedTaskNameChanged(name: string): void {
    if (!this.selectedTaskValue) {
      return;
    }

    this._selectedTask.set({ ...this.selectedTaskValue, name: name });
  }

  deleteTask(id: ID): void {
    this._tasks.set([...getTasksFilteredOnId(this._tasks(), id)]);

    if (this._selectedTask() && this._selectedTask()?.id === id) {
      this._selectedTask.set(undefined);
    }
  }
}
