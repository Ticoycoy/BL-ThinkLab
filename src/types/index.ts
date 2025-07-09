export type Team = 'Research Team' | 'Connection Team' | 'Special task team';

export type TaskStatus = 'Pending' | 'Working' | 'QA' | 'Done';

export interface Task {
  id: string;
  name: string;
  deadline: Date;
  status: TaskStatus;
  dependencies: string[]; // array of task ids
  team: Team;
  currentCount: number;
  expectedCount: number;
}
