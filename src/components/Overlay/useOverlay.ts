import { useNuxtApp } from 'nuxt/app'

export default () => {
  return useNuxtApp()
      .vueApp.config.globalProperties.$overlay
}
