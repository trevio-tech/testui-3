<template xmlns="http://www.w3.org/1999/html">
  <Component
    :is="component"
    :to="to"
    :type="as === 'button' ? 'button' : undefined"
    v-bind="$attrs"
    class="flex items-center bg-white w-full text-left py-2 px-3 hover:bg-sky-100 cursor-pointer rounded-lg"
    @click="$emit('click')"
  >
    <span v-if="hasPrependSlot" class="mr-3"><slot name="prepend" /></span>
    <span class="text-sm font-medium text-gray-700"><slot /></span>
    <span v-if="hasAppendSlot" class="ml-3"><slot name="append" /></span>
  </Component>
</template>

<script setup>
import { resolveComponent, computed, useSlots } from 'vue'

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

const slots = useSlots()

const hasPrependSlot = computed(() => !!slots.prepend)
const hasAppendSlot = computed(() => !!slots.append)

const component = computed(() => {
  if (props.to || props.as === 'NuxtLink') return resolveComponent('NuxtLink')
  return props.as
})
</script>
