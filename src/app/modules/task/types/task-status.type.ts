export const TaskStatus = {
  TODO: 'TODO',
  DONE: 'DONE',
  CANCELED: 'CANCELED',
} as const;
export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
