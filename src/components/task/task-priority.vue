<template>
  <div>
    <ui-select v-model="selectedPriority" :options="options">
      <button :class="[content.class, 'p-1 rounded text-xs']">
        <icon icon="fa-solid fa-flag" size="xl"></icon>
      </button>
    </ui-select>
  </div>
</template>


<script lang="ts">
import { computed, defineComponent, PropType, SetupContext } from 'vue';
import { TASK_PRIORITY } from '@/store/tasks/types';
import uiSelect from '@/components/ui/ui-select.vue';

interface IPriority {
  label: string;
  value: TASK_PRIORITY;
  class: string
}

export default defineComponent({
  name: 'TaskPriority',

  components: {
    uiSelect,
  },

  props: {
    priority: {
      type: String as PropType<TASK_PRIORITY>,
      required: true
    },

    readonly: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },

  setup(props, { emit }: SetupContext) {
    const PRIORITY_OPTIONS: Record<TASK_PRIORITY, IPriority> = {
      [TASK_PRIORITY.P1]: {
        label: 'Приоритет 1',
        value: TASK_PRIORITY.P1,
        class: 'text-red-600 text-white',
      },

      [TASK_PRIORITY.P2]: {
        label: 'Приоритет 2',
        value: TASK_PRIORITY.P2,
        class: 'text-orange-400 text-white',
      },

      [TASK_PRIORITY.P3]: {
        label: 'Приоритет 3',
        value: TASK_PRIORITY.P3,
        class: 'text-green-800 text-white',
      },

      [TASK_PRIORITY.P4]: {
        label: 'Приоритет 4',
        value: TASK_PRIORITY.P4,
        class: 'text-green-400 text-white',
      },
    };

    const options = Object.values(PRIORITY_OPTIONS);

    const selectedPriority = computed<TASK_PRIORITY>({
      get() {
        return props.priority;
      },

      set(value) {
        emit('change', value);
      }
    });

    const content = computed<IPriority>(() => PRIORITY_OPTIONS[selectedPriority.value]);

    return {
      content,
      selectedPriority,
      options
    };
  }
});
</script>
