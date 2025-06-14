import { TaskDto } from '../dtos/task.dto';
import { TaskState } from '../dtos/task-state.enum';
import { ID } from '../../../../shared/api/domain/dtos/api.dtos';

export function toSortedTasks(tasks: TaskDto[]): TaskDto[] {
  return tasks.sort(taskSortingOnState);
}

export function taskSortingOnState(task1: TaskDto, task2: TaskDto): number {
  const name1: string = task1.name.toLowerCase();
  const name2: string = task2.name.toLowerCase();

  if (task1.state === task2.state) {
    if (name1 === name2) {
      return 0;
    }

    return name1 > name2 ? 1 : -1;
  }

  if (
    task1.state === TaskState.Todo ||
    (name1 === TaskState.Done && name2 === TaskState.Canceled)
  ) {
    return -1;
  }

  return 1;
}

export function getTasksFilteredOnId(tasks: TaskDto[], id: ID): TaskDto[] {
  return tasks.filter((t: TaskDto): boolean => t.id !== id);
}

export function unselectTasks(tasks: TaskDto[]): TaskDto[] {
  return tasks.map((task: TaskDto): TaskDto => ({ ...task, isSelected: false }));
}
