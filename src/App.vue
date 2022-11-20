<template>
  <div class="flex w-full h-screen">
    <aside class="w-1/6 bg-gray-100 px-4 py-6 flex flex-col">
      <ul class="w-full flex flex-col items-center font-medium">
        <li class="mb-2 w-full">
          <router-link to="/today">Сегодня</router-link>
        </li>
        <li class="w-full">Входящие</li>
      </ul>

      <sidebar-projects class="mt-auto"/>
    </aside>
    <main class="flex-grow py-6">
      <div class="w-full">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { provideDayJs } from '@/plugins/day';
import sidebarProjects from '@/components/sidebar/projects/sidebar-projects.vue';


export default {
  components: {
    sidebarProjects
  },
  setup() {
    provideDayJs();
  }
};
</script>
