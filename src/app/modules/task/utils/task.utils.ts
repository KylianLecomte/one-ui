import { TaskDto } from '../dtos/task.dto';
import { TaskStatus } from '../types/task-status.type';
import { ID } from '../../../shared/api/domain/dtos/api.dtos';
import { todayStr } from '../../../shared/utils/date.utils';

export function toSortedTasks(tasks: TaskDto[]): TaskDto[] {
  return tasks.sort(taskSortingOnStatus);
}

export function taskSortingOnStatus(task1: TaskDto, task2: TaskDto): number {
  const name1: string = task1.name.toLowerCase();
  const name2: string = task2.name.toLowerCase();

  if (task1.status === task2.status) {
    if (name1 === name2) {
      return task1.id && task2.id && task1.id > task2.id ? 1 : -1;
    }

    return name1 > name2 ? 1 : -1;
  }

  if (
    task1.status === TaskStatus.TODO ||
    (name1 === TaskStatus.DONE && name2 === TaskStatus.CANCELED)
  ) {
    return -1;
  }

  return 1;
}

export function getTasksFilteredOnId(tasks: TaskDto[], id: ID): TaskDto[] {
  return tasks.filter((t: TaskDto): boolean => t.id !== id);
}

export function getNewTask(
  taskName: string,
  description?: string,
  existingTask?: TaskDto
): TaskDto {
  return {
    name: taskName,
    status: TaskStatus.TODO,
    statusDate: todayStr(),
    description: description ?? '',
    repetitionRules: [],
  };
}
