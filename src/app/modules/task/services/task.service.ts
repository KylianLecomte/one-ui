import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskDto } from '../domain/dtos/task.dto';
import { API_URI_CONF, LOCAL_API_PATH } from '../../../../configuration/api-uri.conf';
import { ApiService } from '../../../shared/api/services/api.service';
import { ID, JSONObject } from '../../../shared/api/domain/dtos/api.dtos';
import { TaskStateService } from './task.state.service';
import { unselectTasks } from '../domain/utils/task.utils';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends TaskStateService {
  private readonly apiService: ApiService = inject(ApiService);
  private readonly httpClient: HttpClient = inject(HttpClient);

  constructor() {
    super();
    this.apiService.baseApiUrl = LOCAL_API_PATH;
  }

  create(taskCreate: TaskDto, callbackSuccess?: () => void): void {
    this.apiService.post<TaskDto>(API_URI_CONF.task.create(), taskCreate, (task: TaskDto) => {
      if (callbackSuccess) {
        callbackSuccess();
      }
      this.addStateTask(task);
    });
  }

  getAll(): void {
    this.isTasksLoading.set(true);

    return this.apiService.get<TaskDto[]>(
      API_URI_CONF.task.base,
      (tasks: TaskDto[]) => {
        this.updateTasks(tasks);
        this.isTasksLoaded.set(true);
        this.isTasksLoading.set(false);
        this.selectedTaskId.set(undefined);
      },
      () => {
        this.isTasksLoaded.set(false);
        this.isTasksLoading.set(false);
      },
    );
  }

  update(
    taskUpdated: TaskDto,
    nextCallback?: (data: TaskDto) => void,
    errorCallback?: (error: JSONObject) => void,
  ): void {
    this.apiService.put<TaskDto>(
      API_URI_CONF.task.updateById(taskUpdated.id),
      taskUpdated,
      (taskUpdated: TaskDto) => {
        this.updateStateTask(taskUpdated);
      },
      errorCallback,
    );
  }

  delete(id: ID): void {
    this.httpClient.delete<void>(`${LOCAL_API_PATH}${API_URI_CONF.task.deleteById(id)}`).subscribe({
      next: (): void => {
        this.deleteStateTask(id);
      },
    });
  }
}
