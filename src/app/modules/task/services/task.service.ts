import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, TaskCreate, TaskUpdate } from '../domain/dtos/task.dto';
import {
  API_URI_CONF,
  LOCAL_API_PATH,
} from '../../../../configuration/api-uri.conf';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  httpClient: HttpClient = inject(HttpClient);

  getAll(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(
      `${LOCAL_API_PATH}${API_URI_CONF.task.base}`,
    );
  }

  create(taskCreate: TaskCreate): Observable<Task> {
    return this.httpClient.post<Task>(
      `${LOCAL_API_PATH}${API_URI_CONF.task.create()}`,
      taskCreate,
    );
  }

  update(id: string, taskUpdate: TaskUpdate): Observable<Task> {
    return this.httpClient.put<Task>(
      `${LOCAL_API_PATH}${API_URI_CONF.task.updateById(id)}`,
      taskUpdate,
    );
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(
      `${LOCAL_API_PATH}${API_URI_CONF.task.deleteById(id)}`,
    );
  }
}
