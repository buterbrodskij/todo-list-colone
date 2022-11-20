<template>
  <div class="flex flex-col">
    <div class="border border-gray-500 px-2 py-1 rounded">
      <div class="flex flex-col">
        <input type="text" v-model.trim="taskModel.title" class="mb-2 input-1 placeholder:font-medium font-medium" placeholder="Название задачи">
        <textarea v-model.trim="taskModel.description" placeholder="Описание" class="area-1 text-xs"></textarea>

        <div class="flex justify-between mt-4">
          <!--    @TODO ПОМЕТКИ, ПРИОРИТЕТ, И ТД    -->
          <div></div>
          <div class="flex items-center gap-2">
            <task-priority
              :priority="taskModel.priority"
              @change="taskModel.priority = $event"
            ></task-priority>
            <button class="transition-colors duration-300 hover:text-amber-500">
              <icon icon="fa-regular fa-bookmark"></icon>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-3">
      <button class="mx-2 button-1" @click="createTask">Save</button>
      <button @click="cancelHandler" class="mx-2 button-red">Cancel</button>
    </div>
  </div>
</template>


<script lang="ts">
import { PropType, ref, SetupContext } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_TASK_MODEL } from '@/store/tasks/defaults';
import { ITask, ITaskModel } from '@/store/tasks/types';
import cloneDeep from 'lodash/cloneDeep';
import TaskPriority from '@/components/task/task-priority.vue';

export default {
  name: 'TaskEditor',
  components: {
    TaskPriority,
  },
  props: {
    task: {
      type: Object as PropType<ITask>,
      default: null
    }
  },

  emits: ['complete', 'cancel'],

  setup(props: any, { emit }: SetupContext) {
    const taskModel = ref<ITask | ITaskModel>((props.task ? cloneDeep(props.task) : { ...DEFAULT_TASK_MODEL }));

    const clearModel = () => {
      taskModel.value =  { ...DEFAULT_TASK_MODEL };
    };


    const createTask = () => {
      if (!taskModel.value.title) return;

      const newTask = {
        id: uuidv4(),
        created: new Date(),
        ...taskModel.value,
      };

      clearModel();

      emit('complete', newTask);
    };

    const cancelHandler = () => {
      clearModel();

      emit('cancel');
    };


    return {
      taskModel,
      createTask,
      cancelHandler
    };
  }
};
</script>
