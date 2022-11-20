<template>
  <div>
    <Listbox v-model="model">
      <ListboxButton>
        <slot></slot>
      </ListboxButton>
      <ListboxOptions class="bg-gray-200 px-2 mt-2 absolute">
        <ListboxOption
          v-for="option in proxyOptions"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
          :class="[
            'text-black font-medium cursor-pointer px-2 py-1'
          ]"
        >
          {{ option.label }}
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, SetupContext } from 'vue';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue';

type OptionType = {
  label: string,
  value: any,
  disabled: boolean
}

export default defineComponent({
  name: 'ui-select',

  components: {
    ListboxButton,
    Listbox,
    ListboxOptions,
    ListboxOption
  },

  props: {
    modelValue: {
      type: [String, Number, Object] as PropType<string | number | object>,
      default: ''
    },
    options: {
      type: Array as PropType<Array<object | number | string>>,
      required: true
    },

    optionDisabled: {
      type: Function,
      default: (item: object & {disabled: boolean}) => Boolean(item.disabled),
    },

    labelKey: {
      type: String as PropType<string>,
      default: 'label'
    },

    valueKey: {
      type: String as PropType<string>,
      default: 'value'
    }
  },

  setup(props, { emit }: SetupContext) {
    const model = computed({
      get() {
        return props.modelValue;
      },

      set(value) {
        console.log(value);
        emit('update:modelValue', value);
      }
    });
    console.log(props.options);
    const proxyOptions = computed<OptionType[]>(() => {
      if (typeof props.options[0] === 'object') {
        return props.options
          .map((option: any) => {
            console.log(option, 'option');
            return {
              label: option[props.labelKey],
              value: option[props.valueKey],
              disabled: props.optionDisabled(option)
            };
          });
      }

      return props.options.map(option => {
        return {
          label: option,
          value: option,
          disabled: props.optionDisabled(option)
        };
      });
    });


    return {
      model,
      proxyOptions
    };
  }

});
</script>
