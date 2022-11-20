<template>
  <div>
    <ui-skeleton-wrapper :is-loading="isLoading">
      <template #isLoading>
        <ui-skeleton-item v-for="item in 5" :key="item" width="100%" height="40px"/>
      </template>

      <ul class="mb-2 bg-gray-300">
        <li
          v-for="project in projects"
          :key="project.id">
          <button
            @click="$emit('go-to', project.id)"
            class="flex items-center transition cursor-pointer px-2 py-1 w-full h-full hover:bg-gray-200"
          >
            <span class="rounded-full w-[10px] h-[10px] mr-2" :style ="`background-color: ${project.color}`"></span>
            {{ project.name }}
          </button>
        </li>
      </ul>
    </ui-skeleton-wrapper>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IProject } from '@/store/projects/types';
import uiSkeletonWrapper from '@/components/ui/skeleton/ui-skeleton-wrapper.vue';
import uiSkeletonItem from '@/components/ui/skeleton/ui-skeleton-item.vue';
export default defineComponent({
  name: 'sidebarProjectsList',

  components: {
    uiSkeletonWrapper,
    uiSkeletonItem
  },

  props: {
    isLoading: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    projects: {
      type: Array as PropType<IProject[]>,
      default: () => []
    }
  },

  setup() {

  }
});
</script>

