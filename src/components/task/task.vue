<template>
  <div class="flex flex-col pb-8 pt-2 border-b border-gray-400">
    <div class="flex">
      <div class="flex mr-4">
        <task-complete-button @complete="makeCompleteHandler" />
      </div>

      <div class="flex-grow">
        <p class="font-medium truncate">{{ task.title }}</p>
        <span class="text-gray-500">{{ task.description }}</span>
      </div>

      <div class="w-1/6 flex items-start gap-2">
        <task-priority :priority="task.priority" @change="changePriority(task.id, $event)"/>
        <button
          @click="isEdit = true"
          class="transition-colors duration-300 hover:text-amber-500">
          <icon icon="fa-regular fa-pen-to-square"></icon>
        </button>
        <button class="transition-colors duration-300 hover:text-red-500" @click="removeTaskHandler">
          <icon icon="fa-regular fa-trash-alt"></icon>
        </button>
      </div>
    </div>

    <task-editor v-if="isEdit" :task="task" @complete="editHandler" @cancel="isEdit = false" class="mt-6" />
  </div>
</template>


<script lang="ts">
import { defineComponent, PropType, ref, toRefs, unref } from 'vue';
import { ITask, TASK_PRIORITY } from '@/store/tasks/types';
import TaskPriority from '@/components/task/task-priority.vue';
import { useTasksStore } from '@/store/tasks';
import taskEditor from '@/components/task-editor/task-editor.vue';
import TaskCompleteButton from '@/components/task/task-complete-button.vue';

interface ITaskActions {
  makeComplete: (taskId: string) => void;
  changePriority: (taskId: string, priority: TASK_PRIORITY) => void;
  edit: (task: ITask) => void;
  remove: (taskId: string) => void;
}

export default defineComponent({
  name: 'task',

  components: {
    TaskPriority,
    taskEditor,
    TaskCompleteButton
  },

  props: {
    task: {
      type: Object as PropType<ITask>,
      required: true
    },

    actions: {
      type: Object as PropType<ITaskActions>,
      default: (): ITaskActions  => {
        const taskStore = useTasksStore();
        return {
          makeComplete: taskStore.changeComplete,
          changePriority: taskStore.changePriority,
          edit: taskStore.edit,
          remove: taskStore.remove
        };
      }
    }

  },

  setup(props) {
    const { task } = toRefs(props);
    const { makeComplete, changePriority, edit, remove } = unref<ITaskActions>(props.actions);
    const isEdit = ref(false);

    const makeCompleteHandler = async () => {
      makeComplete(task.value.id);
    };

    const editHandler = (task: ITask) => {

      edit(task);

      isEdit.value = false;
    };

    const removeTaskHandler = () => {

      remove(task.value.id);
    };


    return {
      isEdit,
      makeCompleteHandler,
      changePriority,
      editHandler,
      removeTaskHandler
    };
  }
});
</script>
