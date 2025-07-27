import { TaskStatus } from './task-status.enum';
import { Dto } from '../../../../shared/api/domain/dtos/api.dtos';

export interface TaskDto extends Dto {
  name: string;
  status: TaskStatus;
  statusDate?: Date;
  description?: string;
  isSelected: boolean;
}
