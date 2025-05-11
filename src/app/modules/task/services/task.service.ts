import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITask } from '../domain/dtos/task.dto';
import { API_URI_CONF, LOCAL_API_PATH } from '../../../../configuration/api-uri.conf';
import { ApiService } from '../../../shared/api/services/api.service';
import { getTasksFilteredOnId, taskSortingOnState } from '../domain/utils/task.utils';
import { ID } from '../../../shared/api/domain/dtos/api.dtos';
import { TaskStateService } from './task.state.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly taskStateService: TaskStateService = inject(TaskStateService);
  private readonly apiService: ApiService = inject(ApiService);
  private readonly httpClient: HttpClient = inject(HttpClient);

  constructor() {
    this.apiService.baseApiUrl = LOCAL_API_PATH;
  }

  create(taskCreate: ITask): void {
    this.apiService.post<ITask>(API_URI_CONF.task.create(), taskCreate, (task: ITask): void =>
      this.taskStateService.setTasks([task, ...this.taskStateService.tasks()]),
    );
  }

  getAll(): void {
    this.apiService.get<ITask[]>(API_URI_CONF.task.base, (tasks: ITask[]): void =>
      this.taskStateService.setTasks(tasks),
    );
  }

  update(id: ID, taskUpdate: ITask): void {
    this.httpClient
      .put<ITask>(`${LOCAL_API_PATH}${API_URI_CONF.task.updateById(id)}`, taskUpdate)
      .subscribe({
        next: (task: ITask): void => {
          // TODO: pas fan de devoir retrier ici
          this.taskStateService.setTasks(
            [task, ...getTasksFilteredOnId(this.taskStateService.tasks(), id)].sort(
              taskSortingOnState,
            ),
          );
        },
      });
  }

  delete(id: ID): void {
    this.httpClient.delete<void>(`${LOCAL_API_PATH}${API_URI_CONF.task.deleteById(id)}`).subscribe({
      next: (): void => {
        this.taskStateService.deleteTask(id);
      },
    });
  }
}
