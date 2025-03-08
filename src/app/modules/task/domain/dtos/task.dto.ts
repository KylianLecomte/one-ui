import { TaskState } from './task-state.enum';

export type Task = {
  id: string;
  name: string;
  state: TaskState;
  stateDate?: Date;
  description?: string;
};

export type TaskCreate = Omit<Task, 'id'>;

export type TaskUpdate = Partial<Omit<Task, 'id'>>;
