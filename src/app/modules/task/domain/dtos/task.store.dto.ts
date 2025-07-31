import { ID } from '../../../../shared/api/domain/dtos/api.dtos';
import { TaskForm, InlineTaskForm, AddTaskForm } from './task-form.dto';
import { TaskDto } from './task.dto';

export interface TaskState {
  isAdding: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  addTaskForm?: AddTaskForm;
  taskForm?: TaskForm;
  inlineTaskForm?: InlineTaskForm;
  tasks: TaskDto[];
  selectedTask?: TaskDto;
}

export const taskInitialState: TaskState = {
  isAdding: false,
  isLoading: false,
  isUpdating: false,
  tasks: [],
};
