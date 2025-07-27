import {
  computed,
  effect,
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { taskInitialState, TaskState } from '../domain/dtos/task.store.dto';
import { ID, JSONObject } from '../../../shared/api/domain/dtos/api.dtos';
import { TaskDto } from '../domain/dtos/task.dto';
import { TaskService } from '../services/task.service';
import { getNewTask, getTasksFilteredOnId, toSortedTasks } from '../domain/utils/task.utils';
import { TaskDetailsForm, NewTaskForm, TaskInlineForm } from '../domain/dtos/task-form.dto';

@Injectable({
  providedIn: 'root',
})
export class TaskStore {
  private $taskState: WritableSignal<TaskState> = signal<TaskState>(taskInitialState);
  private taskService: TaskService = inject(TaskService);

  constructor() {
    effect(() => {
      console.log('STATE', this.$taskState());
    });

    effect(() => {
      console.log('TASKS', this.$tasks());
    });

    effect(() => {
      console.log('SELECTEDID', this.$selectedTask());
    });

    effect(() => {
      console.log('SELECTEDTASK', this.$selectedTask());
    });

    effect(() => {
      console.log('ISSELECTEDTASK', this.$isSelectedTask());
    });
  }

  // Actions
  setNewTaskFormAction(newTaskForm: NewTaskForm): void {
    this.setNewTaskFormReducer(newTaskForm);
  }

  setTaskInlineFormAction(taskInlineForm: TaskInlineForm): void {
    this.setTaskInlineFormReducer(taskInlineForm);
  }

  updateTaskInlineAction(): void {
    this.updateTaskInlineReducer();
    this.updateTaskInlineEffect();
  }

  updateTaskInlineSuccessAction(): void {
    this.updateTaskInlineSuccessReducer();
    this.updateTaskInlineSuccessEffect();
  }

  updateTaskInlineErrorAction(): void {
    this.updateTaskInlineErrorReducer();
  }

  addNewTaskAction(): void {
    this.addNewTaskReducer();
    this.addNewTaskEffect();
  }

  addNewTaskSuccessAction() {
    this.addNewTaskSuccessReducer();
    this.addNewTaskSuccessEffect();
  }

  addNewTaskErrorAction() {
    this.addNewTaskErrorReducer();
    // this.addNewTaskErrorEffect();
  }

  loadTasksAction(): void {
    this.loadTasksEffect();
  }

  getTasksAction(): void {
    this.getTasksReducer();
    this.getTasksEffect();
  }

  getTasksResultAction(tasks: TaskDto[]): void {
    this.getTasksResultReducer(tasks);
  }

  // selectTaskAction(task: TaskDto): void {
  //   this.selectTaskReducer(task);
  // }

  setTaskFormAction(taskDetails: TaskDetailsForm): void {
    this.setTaskFormReducer(taskDetails);
  }

  updateTaskDetailsAction(): void {
    this.updateTaskDetailsReducer();
    this.updateTaskDetailsEffect();
  }

  updateTaskDetailsSuccessAction(): void {
    this.updateTaskDetailsSuccessReducer();
    this.updateTaskDetailsSuccessEffect();
  }

  updateTaskDetailsErrorAction(): void {
    this.updateTaskDetailsErrorReducer();
  }

  // Selectors
  $isTasksLoaded: Signal<boolean> = computed(() => this.$taskState().isLoading);
  $isTasksLoading: Signal<boolean> = computed(() => this.$taskState().tasks.length > 0);

  $tasks: Signal<TaskDto[]> = computed(() => this.$taskState().tasks);
  $selectedTask: Signal<TaskDto | undefined> = computed(() => this.$taskState().selectedTask);
  $newTaskForm: Signal<NewTaskForm | undefined> = computed(() => this.$taskState().newTaskForm);
  $taskDetailsForm: Signal<TaskDetailsForm | undefined> = computed(
    () => this.$taskState().taskDetailsForm,
  );
  $taskInlineForm: Signal<TaskInlineForm | undefined> = computed(
    () => this.$taskState().taskInlineForm,
  );
  $isSelectedTask: Signal<boolean> = computed(() => !!this.$taskState().selectedTask);

  // Reducers
  setNewTaskFormReducer(newTaskForm: NewTaskForm): void {
    this.$taskState.update((oldState: TaskState) => ({
      ...oldState,
      newTaskForm: { ...newTaskForm },
    }));
  }

  addNewTaskReducer(): void {
    this.$taskState.update((oldState: TaskState) => ({
      ...oldState,
      isAdding: true,
    }));
  }

  addNewTaskSuccessReducer(): void {
    this.$taskState.update((oldState: TaskState) => ({
      ...oldState,
      isAdding: false,
      newTaskForm: undefined,
    }));
  }

  addNewTaskErrorReducer(): void {
    this.$taskState.update((oldState: TaskState) => ({
      ...oldState,
      isAdding: false,
    }));
  }

  setTaskInlineFormReducer(taskInlineForm: TaskInlineForm): void {
    this.$taskState.update((oldState: TaskState) => ({
      ...oldState,
      taskInlineForm: { ...taskInlineForm },
    }));
  }

  updateTaskInlineReducer(): void {
    this.$taskState.update((oldState: TaskState) => ({
      ...oldState,
      isUpdating: true,
    }));
  }

  updateTaskInlineSuccessReducer(): void {
    this.$taskState.update((oldState: TaskState) => ({
      ...oldState,
      isUpdating: false,
    }));
  }

  updateTaskInlineErrorReducer(): void {
    this.$taskState.update((oldState: TaskState) => ({
      ...oldState,
      isUpdating: false,
    }));
  }

  getTasksReducer(): void {
    this.$taskState.update((oldState: TaskState) => ({
      ...oldState,
      isLoading: true,
      tasks: [],
    }));
  }

  getTasksResultReducer(tasks?: TaskDto[]): void {
    this.$taskState.update((oldState: TaskState) => {
      const updatedTaskList: TaskDto[] = tasks ? tasks : oldState.tasks;
      return {
        ...oldState,
        selectedTask: undefined,
        isLoading: false,
        tasks: [...toSortedTasks(updatedTaskList)],
      };
    });
  }

  // selectTaskReducer(task: TaskDto): void {
  //   const taskFromList: TaskDto | undefined = this.$taskState().tasks.find(
  //     (task) => task.id === task.id,
  //   );
  //   if (!taskFromList) {
  //     // TODO message erreur
  //     return;
  //   }
  //   this.$taskState.update((oldState: TaskState) => ({
  //     ...oldState,
  //     selectedTask: taskFromList,
  //   }));
  // }

  setTaskFormReducer(taskDetails: TaskDetailsForm): void {
    this.$taskState.update((oldState: TaskState) => ({
      ...oldState,
      taskDetailsForm: {
        ...taskDetails,
      },
    }));
  }

  updateTaskDetailsReducer(): void {
    this.$taskState.update((oldState: TaskState) => ({
      ...oldState,
      isUpdating: true,
    }));
  }

  updateTaskDetailsSuccessReducer(): void {
    this.$taskState.update((oldState: TaskState) => ({
      ...oldState,
      isUpdating: false,
    }));
  }

  updateTaskDetailsResultReducer(taskUpdated: TaskDto): void {
    this.$taskState.update((oldState: TaskState) => {
      const tasks: TaskDto[] = getTasksFilteredOnId(oldState.tasks, taskUpdated.id);

      return {
        ...oldState,
        isUpdating: false,
        tasks: [...toSortedTasks(tasks)],
      };
    });
  }

  updateTaskDetailsErrorReducer(): void {
    this.$taskState.update((oldState: TaskState) => ({
      ...oldState,
      isUpdating: false,
    }));
  }

  // Effects
  addNewTaskEffect(): void {
    const taskName: string | undefined = this.$newTaskForm()?.name;
    if (!taskName) {
      this.addNewTaskErrorAction();
      return;
    }

    const newTask: TaskDto = getNewTask(taskName);
    console.log('newTask', newTask);
    this.taskService.create(
      newTask,
      (_: TaskDto) => this.addNewTaskSuccessAction(),
      () => this.addNewTaskErrorAction(),
    );
  }

  addNewTaskSuccessEffect(): void {
    this.loadTasksAction();
  }

  updateTaskInlineEffect(): void {
    const task: TaskDto | undefined = this.$selectedTask();
    const taskInlineForm: TaskInlineForm | undefined = this.$taskInlineForm();
    if (!task || !taskInlineForm) {
      this.updateTaskInlineErrorAction();
      return;
    }

    const updatedTask: TaskDto = { ...task, ...taskInlineForm };
    this.taskService.update(
      updatedTask.id,
      updatedTask,
      (_: TaskDto) => this.updateTaskInlineSuccessAction(),
      () => this.updateTaskInlineErrorAction(),
    );
  }

  updateTaskInlineSuccessEffect(): void {
    this.loadTasksAction();
  }

  loadTasksEffect(): void {
    if (!this.$isTasksLoading()) {
      this.getTasksAction();
    }
  }

  getTasksEffect(): void {
    this.taskService.getAll((data: TaskDto[]) => this.getTasksResultAction(data));
  }

  updateTaskDetailsEffect(): void {
    const task: TaskDto | undefined = this.$selectedTask();
    const taskDetailsForm: TaskDetailsForm | undefined = this.$taskDetailsForm();
    if (!task || !taskDetailsForm) {
      this.updateTaskDetailsErrorAction();
      return;
    }
    const updatedTask: TaskDto = { ...task, ...taskDetailsForm };
    this.taskService.update(
      updatedTask.id,
      updatedTask,
      (_: TaskDto) => this.updateTaskDetailsSuccessAction(),
      () => this.updateTaskDetailsErrorAction(),
    );
  }

  updateTaskDetailsSuccessEffect(): void {
    this.loadTasksAction();
  }
}
