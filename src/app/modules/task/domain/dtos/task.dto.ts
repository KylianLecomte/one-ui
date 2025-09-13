import { TaskStatus } from '../types/task-status.type';
import { Dto } from '../../../../shared/api/domain/dtos/api.dtos';
import { RepetitionRule } from './repetition-rule.dto';

export interface TaskDto extends Dto {
  name: string;
  status: TaskStatus;
  statusDate?: Date;
  description?: string;
  repetitionRules: RepetitionRule[];
}
