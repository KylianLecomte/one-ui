import { TaskDto } from './task.dto';
import { FormControl } from '@angular/forms';

export interface TaskFormDto extends TaskDto {
  nameCtrl: FormControl;
}

export interface TaskForm {
  name?: string;
  description?: string;
}

export interface AddTaskForm {
  name: string;
}
