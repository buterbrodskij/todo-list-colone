<template>
  <div class="container mx-auto">
    <div class="flex justify-between mb-6">
      <div class="flex">
        <h1 class="font-bold mr-2">Сегодня</h1>
        <span> {{ dayJs(new Date()).format('MMM D') }}</span>
      </div>

      <button>filters</button>
    </div>

    <div class="w-1/2 mx-auto">
      <div class="flex flex-col">
        <template v-if="activeTask.length">
          <ul class="flex flex-col">
            <li v-for="task in activeTask" :key="task.id" class="w-full">
              <task :task="task" @make-complete="makeCompleteHandler"/>
            </li>
          </ul>
        </template>
        <div v-else class="flex flex-col items-center">
          <icon-empty-list class="text-amber-500 h-[300px]"/>
          <p class="font-medium">Пока нет новых задач...</p>
        </div>
      </div>
      <div class="mt-8">
        <task-editor v-if="editorIsShown" @complete="taskCreateHandler($event)" @cancel="editorIsShown = false"/>
        <button v-if="!editorIsShown" @click="editorIsShown = true" class="button-1">Добавить</button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useDayJs } from '@/plugins/day';
import TaskEditor from '@/components/task-editor/task-editor.vue';
import iconEmptyList from '@icons/todoEmptyList.vue';
import { useTasksStore } from '@/store/tasks';
import Task from '@/components/task/task.vue';

export default defineComponent({
  name: 'Today',

  components: {
    TaskEditor,
    iconEmptyList,
    Task
  },

  setup() {
    const dayJs = useDayJs();
    const taskStore = useTasksStore();


    const editorIsShown = ref(false);
    const activeTask = computed(() => taskStore.activeTask);

    return {
      dayJs,
      editorIsShown,
      taskCreateHandler: taskStore.addTask,
      makeCompleteHandler: taskStore.changeComplete,
      activeTask
    };
  }
});
</script>
