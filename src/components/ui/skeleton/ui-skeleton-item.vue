<script lang="ts">
import { defineComponent, PropType, h, computed } from 'vue';

enum SKELETON_TYPE {
  TEXT = 'text',
  CIRCLE = 'circle',
  INPUT = 'input',
  BUTTON = 'button'
}

export default defineComponent({
  name: 'uiSkeletonItem',

  props: {
    width: {
      type: String as PropType<string>,
      default: '100px'
    },

    height: {
      type: String as PropType<string>,
      default: '100px'
    },

    size: {
      type: String as PropType<string>,
      default: null
    },

    type: {
      type: String as PropType<SKELETON_TYPE>,
      default: SKELETON_TYPE.TEXT
    }
  },

  setup(props: any) {

    const styles = computed<Record<string, string>>(() => {

      if (props.size) {
        return  {
          width: props.size,
          height: props.size,
        };
      }

      return {
        width: props.width,
        height: props.height,
      };
    });

    const classes = computed<Record<string, boolean>>(() => {

      const classesByType: Record<SKELETON_TYPE, string> = {
        [SKELETON_TYPE.TEXT]: '',
        [SKELETON_TYPE.BUTTON]: 'border border-gray-400 rounded',
        [SKELETON_TYPE.CIRCLE]: 'rounded-full',
        [SKELETON_TYPE.INPUT]: 'border border-gray-400 rounded',
      };

      return {
        'skeleton-animation': true,
        [classesByType[props.type as SKELETON_TYPE]]: true
      };
    });

    const render = () => {
      return h('div', {
        class: classes,
        style: styles,
      });
    };

    render();
  }
});
</script>

<style scoped>

  @keyframes skeleton-loading {
    0% {
      background-color: hsl(200, 20%, 80%);
    }
    100% {
      background-color: hsl(200, 20%, 95%);
    }
  }

  .skeleton-animation {
    @apply cursor-wait;
    @apply relative;
    animation: skeleton-loading 1s linear infinite alternate;
  }

</style>

