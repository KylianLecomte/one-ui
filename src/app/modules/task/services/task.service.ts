import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskDto } from '../domain/dtos/task.dto';
import { API_URI_CONF, LOCAL_API_PATH } from '../../../../configuration/api-uri.conf';
import { ApiService } from '../../../shared/api/services/api.service';
import { ID } from '../../../shared/api/domain/dtos/api.dtos';
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

  create(taskCreate: TaskDto): void {
    this.apiService.post<TaskDto>(API_URI_CONF.task.create(), taskCreate, (task: TaskDto): void => {
      task.isSelected = false;
      this.addAndSortTask(task);
    });
  }

  getAll(): void {
    this.apiService.get<TaskDto[]>(API_URI_CONF.task.base, (tasks: TaskDto[]): void => {
      unselectTasks(tasks);
      this.setAndSortTasks(tasks);
    });
  }

  update(id: ID, taskUpdate: TaskDto): void {
    this.httpClient
      .put<TaskDto>(`${LOCAL_API_PATH}${API_URI_CONF.task.updateById(id)}`, taskUpdate)
      .subscribe({
        next: (task: TaskDto): void => {
          task.isSelected = taskUpdate.isSelected;
          this.updateTasks(task);
        },
      });
  }

  delete(id: ID): void {
    this.httpClient.delete<void>(`${LOCAL_API_PATH}${API_URI_CONF.task.deleteById(id)}`).subscribe({
      next: (): void => {
        this.deleteTask(id);
      },
    });
  }
}
