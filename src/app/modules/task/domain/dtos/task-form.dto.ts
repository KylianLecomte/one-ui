import { TaskState } from './task-state.enum';
import { Dto } from '../../../../shared/api/domain/dtos/api.dtos';
import { TaskDto } from './task.dto';
import { FormControl } from '@angular/forms';

export interface TaskFormDto extends TaskDto {
  nameCtrl: FormControl
}
