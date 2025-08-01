import { computed, inject, Injectable, Signal } from '@angular/core';
import { TaskDto } from '../domain/dtos/task.dto';
import { TaskService } from './task.service';
import { ID } from '../../../shared/api/domain/dtos/api.dtos';

@Injectable({
  providedIn: 'root',
})
export class TaskFacade {
  private taskService: TaskService = inject(TaskService);

  private showState: boolean = true;

  constructor() {
    if (this.showState) {
      console.log('isSelectedTask : ', this.isSelectedTask());
      console.log('tasks : ', this.tasks());
      console.log('selectedTask : ', this.selectedTask());
      console.log('selectedTaskId : ', this.selectedTaskId());
    }
  }

  isSelectedTask: Signal<boolean> = computed(() => !!this.taskService.selectedTaskId);

  tasks: Signal<TaskDto[]> = this.taskService.tasks;
  selectedTask: Signal<TaskDto | undefined> = this.taskService.selectedTask;
  selectedTaskId: Signal<ID | undefined> = this.taskService.selectedTaskId;

  create(taskDto: TaskDto, callbackSuccess?: () => void): void {
    this.taskService.create(taskDto, callbackSuccess);
  }

  getAll(): void {
    this.taskService.getAll();
  }

  select(id: ID): void {
    this.taskService.updateStateSelected(id);
  }

  update(taskDto: TaskDto): void {
    this.taskService.update(taskDto);
  }

  delete(id: ID): void {
    this.taskService.delete(id);
  }
}
