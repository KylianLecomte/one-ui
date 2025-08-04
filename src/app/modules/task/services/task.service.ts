import { inject, Injectable } from '@angular/core';
import { TaskDto } from '../domain/dtos/task.dto';
import { API_URI_CONF, LOCAL_API_PATH } from '../../../../configuration/api-uri.conf';
import { ApiService } from '../../../shared/api/services/api.service';
import { ID } from '../../../shared/api/domain/dtos/api.dtos';
import { TaskStateService } from './task.state.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends TaskStateService {
  // tasksResource: HttpResourceRef<TaskDto[]>;
  private readonly apiService: ApiService = inject(ApiService);

  constructor() {
    super();
    this.apiService.baseApiUrl = LOCAL_API_PATH;

    // this.defineTasksResource();
  }

  // defineTasksResource() {
  //   this.tasksResource = httpResource<TaskDto[]>(
  //     () => ({
  //       url: API_URI_CONF.task.base,
  //       method: 'GET',
  //     }),
  //     { defaultValue: [] },
  //   );
  // }

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
      },
    );
  }

  update(taskUpdated: TaskDto): void {
    return this.apiService.put<TaskDto>(
      API_URI_CONF.task.updateById(taskUpdated.id),
      taskUpdated,
      (taskUpdated: TaskDto) => this.updateStateTask(taskUpdated),
    );
  }

  delete(id: ID): void {
    return this.apiService.delete<void>(`${API_URI_CONF.task.deleteById(id)}`, () =>
      this.deleteStateTask(id),
    );
  }
}
