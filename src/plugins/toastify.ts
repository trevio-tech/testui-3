import 'vue3-toastify/dist/index.css'
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify'

export default ((vueApp, options: ToastContainerOptions = {
  autoClose: 2000,
}) => {
  vueApp.use(Vue3Toasity, options as ToastContainerOptions)
})