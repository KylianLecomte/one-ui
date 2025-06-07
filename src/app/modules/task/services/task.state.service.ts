import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { ITask } from '../domain/dtos/task.dto';
import { ID } from '../../../shared/api/domain/dtos/api.dtos';
import { getTasksFilteredOnId } from '../domain/utils/task.utils';

@Injectable({
  providedIn: 'root',
})
export abstract class TaskStateService {
  private readonly _tasks: WritableSignal<ITask[]> = signal([]);
  private readonly _selectedTask: WritableSignal<ITask | undefined> = signal(undefined);

  get tasks(): Signal<ITask[]> {
    return this._tasks.asReadonly();
  }

  get selectedTask(): Signal<ITask | undefined> {
    return this._selectedTask.asReadonly();
  }

  get selectedTaskValue(): ITask | undefined {
    return this._selectedTask();
  }

  setSelectedTask(task: ITask): void {
    this._selectedTask.set(task);
  }

  setTasks(tasks: ITask[]): void {
    this._tasks.set(tasks);
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

  setObject(object: ITask): void {
    this._selectedTask.set(object);
  }

  setObjects(objects: ITask[]): void {
    this._tasks.set(objects);
  }
}
