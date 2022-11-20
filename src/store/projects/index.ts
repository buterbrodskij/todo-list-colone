import { defineStore } from 'pinia';
import { IProject, IState } from '@/store/projects/types';

export const useProjectStore = defineStore('projects', {
  state: (): IState => {
    return {
      projects: []
    };
  },

  actions: {
    async getAllProjects() {
      const mock: IProject[] = [
        {
          id: 'id',
          name: 'test',
          isFavorite: false,
          desk: 'desk',
          color: '#077211',
          created: new Date()
        }
      ];

      try {
        const { projects } = await new Promise(resolve => {
          setTimeout(() => resolve({ projects: mock }), 500);
        });

        this.projects = projects;
      } catch (e) {
        /** @TODO  обработка */
      }
    }
  },

  getters: {
    getProjectById: (state) => (projectId: string) => state.projects.find(({ id }) => id === projectId)
  }
});
