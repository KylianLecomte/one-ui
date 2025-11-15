import { inject, Injectable } from '@angular/core';
import { TaskDto } from '../dtos/task.dto';
import { API_URI_CONF, LOCAL_API_PATH } from '../../../../configuration/api-uri.conf';
import { ApiService } from '../../../shared/api/services/api.service';
import { ID } from '../../../shared/api/domain/dtos/api.dtos';
import { TaskStateService } from './task.state.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends TaskStateService {
  private readonly apiService: ApiService = inject(ApiService);

  constructor() {
    super();
    this.apiService.baseApiUrl = LOCAL_API_PATH;
  }

  create(taskCreate: TaskDto, successFn?: (task: TaskDto) => void): void {
    this.apiService.post<TaskDto>(API_URI_CONF.task.create(), taskCreate, (task: TaskDto) => {
      this.addStateTask(task);

      if (successFn) {
        successFn(task);
      }
    });
  }

  getAll(): void {
    this.isTasksLoading.set(true);

    this.apiService.get<TaskDto[]>(
      API_URI_CONF.task.base,
      (tasks: TaskDto[]): void => {
        this.updateTasks(tasks);
        this.isTasksLoaded.set(true);
        this.isTasksLoading.set(false);
        this.selectedTaskId.set(undefined);
      },
      (): void => {
        this.isTasksLoaded.set(false);
        this.isTasksLoading.set(false);
      }
    );
  }

  update(taskUpdated: TaskDto, successFn?: (task: TaskDto) => void): void {
    console.log(taskUpdated);
    return this.apiService.put<TaskDto>(
      API_URI_CONF.task.updateById(),
      taskUpdated,
      (taskUpdated: TaskDto) => {
        this.updateStateTask(taskUpdated);
        if (successFn) {
          successFn(taskUpdated);
        }
      }
    );
  }

  delete(id: ID): void {
    return this.apiService.delete<void>(`${API_URI_CONF.task.deleteById(id)}`, () =>
      this.deleteStateTask(id)
    );
  }
}
