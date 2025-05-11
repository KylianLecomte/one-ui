import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { ITask } from '../domain/dtos/task.dto';
import { ID } from '../../../shared/api/domain/dtos/api.dtos';
import { getTasksFilteredOnId } from '../domain/utils/task.utils';

@Injectable({
  providedIn: 'root',
})
export class TaskStateService {
  private readonly _tasks: WritableSignal<ITask[]> = signal([]);
  private readonly _selectedTask: WritableSignal<ITask | undefined> = signal(undefined);

  constructor() {}

  get tasks(): Signal<ITask[]> {
    return this._tasks.asReadonly();
  }

  get selectedTask(): Signal<ITask | undefined> {
    return this._selectedTask.asReadonly();
  }

  setSelectedTask(task: ITask): void {
    this._selectedTask.set(task);
  }

  setTasks(tasks: ITask[]): void {
    this._tasks.set(tasks);
  }

  selectedTaskNameChanged(name: string): void {
    // TODO: pourquoi obligé le as Task ?
    this._selectedTask.set({ ...this._selectedTask(), name: name } as ITask);
  }

  deleteTask(id: ID): void {
    this._tasks.set([...getTasksFilteredOnId(this._tasks(), id)]);

    if (this._selectedTask() && this._selectedTask()?.id === id) {
      this._selectedTask.set(undefined);
    }
  }
}
