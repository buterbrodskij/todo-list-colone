import { ITaskModel, TASK_PRIORITY } from '@/store/tasks/types';

export const DEFAULT_TASK_MODEL: ITaskModel = Object.freeze({
  title: '',
  description: '',
  completeDate: null,
  isComplete: false,
  marks: [],
  priority: TASK_PRIORITY.P4,
  projectId: null,
  branchId: null
});
