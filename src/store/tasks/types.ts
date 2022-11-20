export enum TASK_PRIORITY {
  P1 = 'P1',
  P2 = 'P2',
  P3 = 'P3',
  P4 = 'P4',
}

export interface IMark {
  name: string;
}

export interface ITaskModel {
  title: string,
  description: string;
  isComplete: boolean;
  priority: TASK_PRIORITY;
  marks: IMark[];
  projectId: string | null;
  branchId: string | null;
}

export interface ITask extends ITaskModel{
  created: Date;
  id: string;
  completeDate: Date | null;
}

export interface IState {
  tasks: ITask[]
}
