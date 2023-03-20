<template>
  <Component
    :is="component"
    :to="to"
    :type="as === 'button' ? 'button' : undefined"
    v-bind="$attrs"
    class="block bg-white w-full text-left py-2 px-4 hover:bg-sky-100 cursor-pointer rounded-lg"
    @click="$emit('click')"
  >
    <slot />
  </Component>
</template>

<script setup>
import { resolveComponent, computed } from 'vue'

defineEmits(['click'])

const props = defineProps({
  as: {
    type: String,
    default: 'button'
  },
  to: {
    type: [String, Object]
  }
})

const component = computed(() => {
  if (props.to || props.as === 'NuxtLink') return resolveComponent('NuxtLink')
  return props.as
})
</script>
