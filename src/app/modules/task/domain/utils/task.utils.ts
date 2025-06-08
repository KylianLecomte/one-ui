import { TaskDto } from '../dtos/task.dto';
import { TaskState } from '../dtos/task-state.enum';
import { ID } from '../../../../shared/api/domain/dtos/api.dtos';

export function taskSortingOnState(task1: TaskDto, task2: TaskDto): number {
  if (task1.state === task2.state) {
    if (task1.name === task2.name) {
      return 0;
    }

    return task1.name > task2.name ? 1 : -1;
  }

  if (
    task1.state === TaskState.Todo ||
    (task1.name === TaskState.Done && task2.name === TaskState.Canceled)
  ) {
    return -1;
  }

  return 1;
}

export function getTasksFilteredOnId(tasks: TaskDto[], id: ID): TaskDto[] {
  return tasks.filter((t: TaskDto): boolean => t.id !== id);
}
