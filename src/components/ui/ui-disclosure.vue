<template>
  <Disclosure v-slot="{ open }">
    <transition
      v-if="placementIsTop"
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-out"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <DisclosurePanel class="text-gray-500 pt-1">
        <slot name="content"></slot>
      </DisclosurePanel>
    </transition>

    <div class="flex items-center px-2 py-1 rounded bg-gray-200" @click="triggerFullRow ? doToggle() : (() => true)">
      <slot></slot>
      <DisclosureButton class="ml-auto" ref="toggle" @click.stop>
        <icon
          icon="fa-solid fa-chevron-down"
          size="xs"
          :rotation="open ? iconRotate.open : iconRotate.close"
          class="transition duration-200">
        </icon>
      </DisclosureButton>
    </div>

    <transition
      v-if="placementIsBottom"
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-out"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <DisclosurePanel class="text-gray-500 pl-2 pt-1">
        <slot name="content"></slot>
      </DisclosurePanel>
    </transition>
  </Disclosure>
</template>

<script lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue';
import { computed, defineComponent, PropType, ref, SetupContext, VueElement } from 'vue';


export default defineComponent({
  name: 'ui-disclosure',

  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  },

  props: {
    triggerFullRow: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String as PropType<string>,
      validator: (val: string) => ['top', 'bottom'].includes(val),
      default: 'top'
    }
  },

  setup(props) {
    const toggle = ref<typeof DisclosureButton | null>(null);
    const placementIsTop = computed<boolean>(() => props.placement === 'top');
    const placementIsBottom = computed<boolean>(() => props.placement === 'bottom');
    const iconRotate = computed<Record<string, number>>(() => {

      if (placementIsTop.value) {
        return {
          open: 180,
          close: 90
        };
      }

      return {
        open: 90,
        close: 0
      };
    });
    const doToggle = () => {
      if (toggle.value) {
        toggle.value.$el.click();
      }
    };

    return {
      doToggle,
      toggle,
      placementIsBottom,
      placementIsTop,
      iconRotate
    };
  }
});
</script>
