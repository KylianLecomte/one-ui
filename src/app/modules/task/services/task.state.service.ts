import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { TaskDto } from '../domain/dtos/task.dto';
import { ID } from '../../../shared/api/domain/dtos/api.dtos';
import { getTasksFilteredOnId, toSortedTasks } from '../domain/utils/task.utils';

@Injectable({
  providedIn: 'root',
})
export abstract class TaskStateService {
  private readonly _tasks: WritableSignal<TaskDto[]> = signal([]);

  private readonly _selectedTask: Signal<TaskDto | undefined> = computed(
    (): TaskDto | undefined => {
      return this._tasks().find((t: TaskDto): boolean => t.isSelected);
    },
  );

  get tasks(): Signal<TaskDto[]> {
    return this._tasks.asReadonly();
  }

  get selectedTask(): Signal<TaskDto | undefined> {
    return this._selectedTask;
  }

  selectedChange(targetTask: TaskDto, selectedChanged: boolean): void {
    const taskFounded: TaskDto | undefined = this._tasks().find(
      (t: TaskDto): boolean => t.id === targetTask.id,
    );
    if (taskFounded) {
      const res: TaskDto[] = this._tasks().map((t: TaskDto): TaskDto => {
        if (t.id === taskFounded.id) {
          return { ...t, isSelected: selectedChanged };
        }

        if (selectedChanged) {
          return { ...t, isSelected: false };
        }

        return t;
      });
      this.setTasks(res);
    }
  }

  updateTasks(updatedTask: TaskDto): void {
    const tasksWithUpdatedTask: TaskDto[] = [
      updatedTask,
      ...getTasksFilteredOnId(this.tasks(), updatedTask.id),
    ];

    this.setAndSortTasks(tasksWithUpdatedTask);
  }

  deleteTask(id: ID): void {
    this.setTasks(getTasksFilteredOnId(this._tasks(), id));
  }

  addAndSortTask(task: TaskDto): void {
    this._tasks().push(task);
    this.setAndSortTasks(this._tasks());
  }

  setAndSortTasks(tasks: TaskDto[]): void {
    const lst: TaskDto[] = toSortedTasks(tasks);
    this.setTasks(lst);
  }

  setTasks(tasks: TaskDto[]): void {
    this._tasks.set([...tasks]);
  }
}
