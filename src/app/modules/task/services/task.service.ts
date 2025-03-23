import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task, TaskCreate, TaskUpdate } from '../domain/dtos/task.dto';
import {
  API_URI_CONF,
  LOCAL_API_PATH,
} from '../../../../configuration/api-uri.conf';
import { ApiService } from '../../../shared/api/services/api.service';
import { taskSortingOnState } from '../domain/utils/task.utils';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks: WritableSignal<Task[]> = signal([]);
  selectedTask: WritableSignal<Task | undefined> = signal(undefined);
  private readonly apiService: ApiService = inject(ApiService);
  private readonly httpClient: HttpClient = inject(HttpClient);

  constructor() {
    this.apiService.baseApiUrl = LOCAL_API_PATH;
  }

  getAll(): void {
    this.apiService.get<Task[]>(API_URI_CONF.task.base).subscribe({
      next: (tasks: Task[]): void => {
        this.tasks.set(tasks);
      },
    });
  }

  create(taskCreate: TaskCreate): void {
    this.apiService
      .post<TaskCreate, Task>(API_URI_CONF.task.create(), taskCreate)
      .subscribe({
        next: (task: Task): void => {
          this.tasks.set([task, ...this.tasks()]);
        },
      });
  }

  update(id: string, taskUpdate: TaskUpdate): void {
    this.httpClient
      .put<Task>(
        `${LOCAL_API_PATH}${API_URI_CONF.task.updateById(id)}`,
        taskUpdate,
      )
      .subscribe({
        next: (task: Task): void => {
          // TODO: pas fan de devoir retrier ici
          this.tasks.set(
            [task, ...this.getTasksFilteredOnId(id)].sort(taskSortingOnState),
          );
        },
      });
  }

  delete(id: string): void {
    this.httpClient
      .delete<void>(`${LOCAL_API_PATH}${API_URI_CONF.task.deleteById(id)}`)
      .subscribe({
        next: (): void => {
          this.tasks.set([...this.getTasksFilteredOnId(id)]);
        },
      });
  }

  selectedTaskChanged(task: Task): void {
    this.selectedTask.set(task);
  }

  selectedTaskNameChanged(name: string): void {
    // TODO: pourquoi obligé le as Task ?
    this.selectedTask.set({ ...this.selectedTask(), name: name } as Task);
  }

  selectedTaskDescriptionChanged(description: string): void {
    // TODO: pourquoi obligé le as Task ?
    this.selectedTask.set({
      ...this.selectedTask(),
      description: description,
    } as Task);
  }

  private getTasksFilteredOnId(id: string): Task[] {
    return this.tasks().filter((t: Task): boolean => t.id !== id);
  }
}
