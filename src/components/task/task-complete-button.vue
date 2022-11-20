<template>
  <button
    class="self-center rounded-full w-[20px] h-[20px] border border-gray-300 complete-button"
    :class="{completed: startCompleteAnimation}"
    @click="makeCompleteHandler"
    :disabled="startCompleteAnimation"
  ></button>
</template>

<script lang="ts">
import { defineComponent, ref, SetupContext } from 'vue';

export default defineComponent({
  name: 'TaskCompleteButton',

  setup(props, { emit }: SetupContext) {
    const startCompleteAnimation = ref(false);

    const makeCompleteHandler = async () => {
      requestAnimationFrame(() => startCompleteAnimation.value = !startCompleteAnimation.value);

      setTimeout(() => emit('complete'), 700);
    };

    return {
      makeCompleteHandler,
      startCompleteAnimation
    };
  }
});
</script>


<style>
@keyframes completed {
  10% {
    box-shadow: -1px -1px 5px 0 rgba(97, 234, 43, 0.8);
    border-color: rgba(97, 234, 43, 0.8);
  }

  20% {
    box-shadow: -1px -1px 10px 0 rgba(97, 234, 43, 1);
  }

  40% {
    box-shadow: -1px -1px 15px 0 rgba(97, 234, 43, 1);
  }

  60% {
    box-shadow: -1px -1px 20px 0 rgba(97, 234, 43, 1);
  }

  80% {
    box-shadow: -1px -1px 30px 0 rgba(97, 234, 43, 1);
  }

  100% {
    box-shadow: -1px -1px 40px 0 rgba(97, 234, 43, 1);
  }
}

.completed {
  animation: .7s ease-in-out completed;
  @apply flex;
  @apply justify-center;
  @apply items-center;
}

.complete-button:before {
  content: '\2713';
  font-size: 14px;
  @apply text-green-500;
  @apply opacity-0;
  transition: opacity .3s ease-in-out;
}

.completed:before {
  @apply opacity-100;
}
</style>
