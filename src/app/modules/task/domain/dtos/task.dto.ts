import { TaskStatus } from './task-status.enum';
import { Dto } from '../../../../shared/api/domain/dtos/api.dtos';
import { FrequencyRule } from './frequency.type';

export interface TaskDto extends Dto {
  name: string;
  status: TaskStatus;
  statusDate?: Date;
  description?: string;
  frequencyRules: FrequencyRule[];
}
