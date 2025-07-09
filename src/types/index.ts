export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  name: string;
  deadline: Date;
  status: TaskStatus;
  dependencies: string[]; // array of task ids
}
