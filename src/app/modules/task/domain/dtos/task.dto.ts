import { TaskState } from './task-state.enum';
import { Dto } from '../../../../shared/api/domain/dtos/api.dtos';

export interface TaskDto extends Dto {
  name: string;
  state: TaskState;
  stateDate?: Date;
  description?: string;
}
