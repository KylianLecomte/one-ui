import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { TaskState, taskInitialState } from '../domain/dtos/task.store.dto';
import { TaskService } from '../services/task.service';
import { TaskDto } from '../domain/dtos/task.dto';

@Injectable({
  providedIn: 'root',
})
export abstract class TaskStoreBase {
  protected $taskState: WritableSignal<TaskState> = signal<TaskState>(taskInitialState);
  protected taskService: TaskService = inject(TaskService);

  $tasks: Signal<TaskDto[]> = computed(() => this.$taskState().tasks);
  $selectedTask: Signal<TaskDto | undefined> = computed(() => this.$taskState().selectedTask);

  $isTasksLoaded: Signal<boolean> = computed(() => this.$taskState().isLoading);
  $isTasksLoading: Signal<boolean> = computed(() => this.$taskState().tasks.length > 0);
}
