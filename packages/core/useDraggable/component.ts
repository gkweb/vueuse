import { defineComponent, h, reactive, ref, unref } from 'vue-demi'
import { useDraggable, UseDraggableOptions, useStorage } from '@vueuse/core'
import { RenderableComponent } from '../types'

export interface UseDraggableProps extends UseDraggableOptions, RenderableComponent {
  /**
   * When provided, use `useStorage` to preserve element's position
   */
  storageKey?: string

  /**
   * Storage type
   *
   * @default 'local'
   */
  storageType?: 'local' | 'session'
}

export const UseDraggable = defineComponent<UseDraggableProps>({
  name: 'UseDraggable',
  props: [
    'storageKey',
    'initialValue',
    'exact',
    'preventDefault',
    'pointerTypes',
    'as',
  ] as unknown as undefined,
  setup(props, { slots }) {
    const target = ref()
    const initialValue = props.storageKey
      ? useStorage(
        props.storageKey,
        unref(props.initialValue) || { x: 0, y: 0 },
        props.storageType === 'session' ? sessionStorage : localStorage,
      )
      : props.initialValue || { x: 0, y: 0 }

    const data = reactive(useDraggable(target, {
      ...props,
      initialValue,
    }))

    return () => {
      if (slots.default)
        return h(props.as || 'div', { ref: target, style: `touch-action:none;${data.style}` }, slots.default(data))
    }
  },
})
