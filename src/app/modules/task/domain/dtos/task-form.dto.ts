import { TaskDto } from './task.dto';
import { FormControl } from '@angular/forms';

export interface TaskFormDto extends TaskDto {
  nameCtrl: FormControl;
}

export interface TaskDetailsForm {
  name?: string;
  descrption?: string;
}

export interface TaskInlineForm {
  name: string;
}

export interface NewTaskForm {
  name: string;
}
