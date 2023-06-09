import { reactive, markRaw, watch } from 'vue'
import { useBreakpoints } from '@vueuse/core'

export default {
  install: (app) => {
    let stack = reactive([])
    let eventListenerAdded = false;

    const breakpoints = useBreakpoints({
      laptop: 1024,
    })

    const show = (component, attributes = {on: {}, props: {}}) => {
      if (! attributes?.on) {
        attributes.on = {};
      }

      return new Promise((resolve) => {
        const overlay = {
          key: Math.random().toString(36).substring(2),
          component: markRaw(component),
          ...attributes
        }

        stack.push(overlay)

        if (stack.length > 0) {
          document.body.style.overflow = 'hidden'

          if (document.body.scrollHeight > window.innerHeight && breakpoints.greater('laptop').value) {
            document.body.style.paddingRight = '17px'
          }
        }

        resolve()
      })
    }

    const hide = () => {
      stack.splice(stack.length - 1, 1)

      if (stack.length === 0) {
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
      }
    }

    const hideAll = () => stack.length = 0;

    const onKeydown = (event) => {
      if (stack.length && event.key === 'Escape') {
        hide()
      }
    }

    watch(stack, (newValue) => {
      if (newValue.length === 0) {
        document.removeEventListener('keydown', onKeydown)
        eventListenerAdded = false
      } else if (! eventListenerAdded) {
        document.addEventListener('keydown', onKeydown)
        eventListenerAdded = true
      }
    })

    app.config.globalProperties.$overlay = {
      stack,
      show,
      hide,
      hideAll,
    }
  }
}