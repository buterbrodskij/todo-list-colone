<template>
  <div>
    <ui-disclosure placement="top">
      <router-link to="/projects">
        <span class="font-medium">Проекты</span>
      </router-link>

      <template v-slot:content>
        <sidebar-projects-list @go-to="goToProject" :is-loading="projectsIsLoading" :projects="projects"/>
      </template>
    </ui-disclosure>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, computed } from 'vue';
import uiDisclosure from '@/components/ui/ui-disclosure.vue';
import sidebarProjectsList from '@/components/sidebar/projects/sidebar-projects-list.vue';
import { useRouter } from 'vue-router';
import { IProject } from '@/store/projects/types';
import { useProjectStore } from '@/store/projects';

export default defineComponent({
  name: 'sidebarProjects',

  components: {
    uiDisclosure,
    sidebarProjectsList
  },

  setup() {
    const router = useRouter();
    const projectStore = useProjectStore();

    onBeforeMount(async () => {
      try {
        projectsIsLoading.value = true;
        await projectStore.getAllProjects();
      } catch (e) {
        console.error(e);
      } finally {
        projectsIsLoading.value = false;
      }
    });

    const projectsIsLoading = ref<boolean>(false);
    const projects = computed<IProject[]>(() => projectStore.projects);


    const goToProject = (id: string) => {
      router.push({
        name: 'project',
        params: {
          id
        }
      });
    };


    return {
      goToProject,
      projects,
      projectsIsLoading
    };
  }
});
</script>

