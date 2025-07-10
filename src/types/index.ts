export type Team = 'BL ThinkLab' | 'Connection Team' | 'Special task team';

export type TaskStatus = 'Pending' | 'Working' | 'QA' | 'Done';

export interface Task {
  id: string;
  name: string;
  description: string;
  assignee: string;
  deadline: Date;
  status: TaskStatus;
  team: Team;
  currentCount: number;
  expectedCount: number;
}
