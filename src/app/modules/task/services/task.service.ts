import { inject, Injectable } from '@angular/core';
import { TaskDto } from '../domain/dtos/task.dto';
import { API_URI_CONF, LOCAL_API_PATH } from '../../../../configuration/api-uri.conf';
import { ApiService } from '../../../shared/api/services/api.service';
import { ID } from '../../../shared/api/domain/dtos/api.dtos';
import { TaskStateService } from './task.state.service';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends TaskStateService {
  private readonly apiService: ApiService = inject(ApiService);

  constructor() {
    super();
    this.apiService.baseApiUrl = LOCAL_API_PATH;
  }

  create(taskCreate: TaskDto): Observable<TaskDto> {
    return this.apiService.post<TaskDto>(API_URI_CONF.task.create(), taskCreate).pipe(
      tap((task: TaskDto) => {
        this.addStateTask(task);
      }),
    );
  }

  getAll(): Observable<TaskDto[]> {
    this.isTasksLoading.set(true);

    return this.apiService.get<TaskDto[]>(API_URI_CONF.task.base).pipe(
      tap((tasks: TaskDto[]) => {
        this.updateTasks(tasks);
        this.isTasksLoaded.set(true);
        this.isTasksLoading.set(false);
        this.selectedTaskId.set(undefined);
      }),
      catchError((error) => {
        this.isTasksLoaded.set(false);
        this.isTasksLoading.set(false);
        return throwError(() => error);
      }),
    );
  }

  update(taskUpdated: TaskDto): Observable<TaskDto> {
    return this.apiService
      .put<TaskDto>(API_URI_CONF.task.updateById(taskUpdated.id), taskUpdated)
      .pipe(
        tap((taskUpdated: TaskDto) => {
          this.updateStateTask(taskUpdated);
        }),
      );
  }

  delete(id: ID): Observable<void> {
    return this.apiService
      .delete<void>(`${API_URI_CONF.task.deleteById(id)}`)
      .pipe(tap(() => this.deleteStateTask(id)));
  }
}
