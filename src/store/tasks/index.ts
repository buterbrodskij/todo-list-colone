import { defineStore } from 'pinia';
import { IState, ITask, TASK_PRIORITY } from '@/store/tasks/types';

export const useTasksStore = defineStore('tasks', {
  state: (): IState => {
    return {
      tasks: []
    };
  },

  actions: {
    addTask(task: ITask) {
      this.tasks.push(task);
    },

    removeTask(taskId: string) {
      const taskIndex = this.tasks.findIndex(({ id }) => id === taskId);
      this.tasks.splice(taskIndex, 1);
    },

    changeComplete(taskId: string) {
      const task = this.taskById(taskId);

      if (task) {
        task.isComplete = !task.isComplete;
      }
    },

    changePriority(taskId: string, priority: TASK_PRIORITY) {
      const task = this.taskById(taskId);

      if (task) {
        task.priority = priority;
      }
    },

    edit(editedTask: ITask) {
      const taskIndex = this.tasks.findIndex(({ id }) => id === editedTask.id);

      if (taskIndex !== -1) {
        this.tasks[taskIndex] = editedTask;
      }
    },

    remove(taskId: string) {
      this.tasks = this.tasks.filter(({ id }) => id !== taskId);
    }
  },
  getters: {
    activeTask: (state) => state.tasks.filter(({ isComplete }: ITask) => !isComplete),
    taskById: (state) => (taskId: string) => state.tasks.find(({ id }) => id === taskId) ?? null,
    tasksByProjectId: (state) => (id: string) => state.tasks.filter(({ projectId }) => projectId === id),
    tasksByBranchId: (state) => (id: string) => state.tasks.filter(({ branchId }) => branchId === id),
  }
});
