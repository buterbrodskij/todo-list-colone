<template>
  <div>
    <template v-if="isLoading">
      <slot v-if="$slots.isLoading" name="isLoading" v-bind="{ isLoading }"></slot>

      <div v-else>
        loading...
      </div>

    </template>

    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from 'vue';

export default defineComponent({
  name: 'ui-skeleton-wrapper',

  props: {
    isLoading: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  }
});
</script>

