import { ID } from '../../../../shared/api/domain/dtos/api.dtos';
import { TaskDetailsForm, TaskInlineForm, NewTaskForm as newTaskForm } from './task-form.dto';
import { TaskDto } from './task.dto';

export interface TaskState {
  isAdding: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  newTaskForm?: newTaskForm;
  taskDetailsForm?: TaskDetailsForm;
  taskInlineForm?: TaskInlineForm;
  tasks: TaskDto[];
  selectedTask?: TaskDto;
}

export const taskInitialState: TaskState = {
  isAdding: false,
  isLoading: false,
  isUpdating: false,
  tasks: [],
};
