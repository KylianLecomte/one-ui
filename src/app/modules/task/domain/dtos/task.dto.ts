import { TaskState } from './task-state.enum';
import { IDto } from '../../../../shared/api/domain/dtos/api.dtos';

export interface ITask extends IDto {
  name: string;
  state: TaskState;
  stateDate?: Date;
  description?: string;
}
