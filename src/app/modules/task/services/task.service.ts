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

  create(
    taskCreate: TaskDto,
    nextCallback: (data: TaskDto) => void,
    errorCallback?: (error: JSONObject) => void,
  ): void {
    this.apiService.post<TaskDto>(
      API_URI_CONF.task.create(),
      taskCreate,
      nextCallback,
      errorCallback,
    );
  }

  // getAll(): void {
  //   this.apiService.get<TaskDto[]>(API_URI_CONF.task.base, (tasks: TaskDto[]): void => {
  //     unselectTasks(tasks);
  //     this.setAndSortTasks(tasks);
  //   });
  // }

  getAll(
    nextCallback: (data: TaskDto[]) => void,
    errorCallback?: (error: JSONObject) => void,
  ): void {
    return this.apiService.get<TaskDto[]>(API_URI_CONF.task.base, nextCallback, errorCallback);
  }

  // update(id: ID, taskUpdated: TaskDto): void {
  //   console.log(id, taskUpdated);
  //   this.httpClient
  //     .put<TaskDto>(`${LOCAL_API_PATH}${API_URI_CONF.task.updateById(id)}`, taskUpdated)
  //     .subscribe({
  //       next: (task: TaskDto): void => {
  //         console.log('new task', task);
  //         task.isSelected = taskUpdated.isSelected;
  //         this.updateTasks(task);
  //       },
  //     });
  // }

  update(
    id: ID,
    taskUpdated: TaskDto,
    nextCallback: (data: TaskDto) => void,
    errorCallback?: (error: JSONObject) => void,
  ): void {
    console.log(id, taskUpdated);
    this.apiService.put<TaskDto>(
      API_URI_CONF.task.updateById(id),
      taskUpdated,
      nextCallback,
      errorCallback,
    );
  }

  delete(id: ID): void {
    this.httpClient.delete<void>(`${LOCAL_API_PATH}${API_URI_CONF.task.deleteById(id)}`).subscribe({
      next: (): void => {
        this.deleteTask(id);
      },
    });
  }
}
