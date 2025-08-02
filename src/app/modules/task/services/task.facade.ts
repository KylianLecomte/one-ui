import { computed, inject, Injectable, Signal } from '@angular/core';
import { TaskDto } from '../domain/dtos/task.dto';
import { TaskService } from './task.service';
import { ID } from '../../../shared/api/domain/dtos/api.dtos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskFacade {
  private readonly taskService: TaskService = inject(TaskService);

  isSelectedTask: Signal<boolean> = computed(() => !!this.taskService.selectedTaskId);
  tasks: Signal<TaskDto[]> = this.taskService.tasks;
  selectedTask: Signal<TaskDto | undefined> = this.taskService.selectedTask;
  selectedTaskId: Signal<ID | undefined> = this.taskService.selectedTaskId;

  private readonly showState: boolean = true;

  constructor() {
    if (this.showState) {
      console.log('isSelectedTask : ', this.isSelectedTask());
      console.log('tasks : ', this.tasks());
      console.log('selectedTask : ', this.selectedTask());
      console.log('selectedTaskId : ', this.selectedTaskId());
    }
  }

  create(taskDto: TaskDto): Observable<TaskDto> {
    return this.taskService.create(taskDto);
  }

  getAll(): Observable<TaskDto[]> {
    return this.taskService.getAll();
  }

  select(id: ID): void {
    this.taskService.updateStateSelected(id);
  }

  update(taskDto: TaskDto): Observable<TaskDto> {
    return this.taskService.update(taskDto);
  }

  delete(id: ID): Observable<void> {
    return this.taskService.delete(id);
  }
}
