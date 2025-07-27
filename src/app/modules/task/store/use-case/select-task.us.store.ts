import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { TaskState, taskInitialState } from '../../domain/dtos/task.store.dto';
import { TaskService } from '../../services/task.service';
import { TaskDto } from '../../domain/dtos/task.dto';
import { TaskStoreBase } from '../task.base.store';

@Injectable({
  providedIn: 'root',
})
export class SelectTaskUsStore extends TaskStoreBase {
  // Actions
  selectTaskAction(task: TaskDto): void {
    this.selectTaskReducer(task);
  }

  // Selector

  // Reducers
  private selectTaskReducer(task: TaskDto): void {
    const taskFromList: TaskDto | undefined = this.$taskState().tasks.find(
      (task) => task.id === task.id,
    );
    if (!taskFromList) {
      // TODO message erreur
      return;
    }
    this.$taskState.update((oldState: TaskState) => ({
      ...oldState,
      selectedTask: taskFromList,
    }));
  }

  // Effects
}
