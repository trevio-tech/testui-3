<template>
  <div class="relative flex items-center">
    <div v-if="hasPrependSlot" @click="$emit('click-prepend', $event)"
         class="absolute z-10 w-10 h-10 flex items-center justify-center">
      <slot name="prepend"></slot>
    </div>
    <input
      :class="[...classes, `input-${hasError ? 'danger' : variant}`]"
      :disabled="disabled"
      :maxlength="maxlength"
      :type="type"
      :value="modelValue"
      :name="name"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      @input="onInput"
    >
    <div v-if="hasAppendSlot" @click="$emit('click-append', $event)"
         class="absolute right-0 z-10 w-10 h-10 flex items-center justify-center">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script setup>
import './styles.scss'
import { computed, useSlots } from 'vue'

const emit = defineEmits([
    'click-prepend', 'click-append', 'update:modelValue'
])

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [String, Number]
  },
  maxlength: {
    type: String
  },
  placeholder: {
    type: String
  },
  autocomplete: {
    type: String
  },
  variant: {
    type: String,
    default: 'default',
    validator(type) {
      return ['default', 'danger', 'success'].includes(type)
    },
  },
  type: {
    type: String,
    default: 'text',
    validator(type) {
      return ['text', 'date', 'email', 'password', 'number', 'url'].includes(type)
    },
  },
  name: {
    type: String
  },
  hasError: {
    type: Boolean
  }
})

const slots = useSlots()

const hasPrependSlot = computed(() => {
  return !!slots.prepend;
})

const hasAppendSlot = computed(() => {
  return !!slots.append;
})

const classes = computed(() => {
  let paddingX = 'px-2.5';

  if (hasPrependSlot.value && hasAppendSlot.value) {
    paddingX = 'px-9'
  } else if (hasPrependSlot.value && !hasAppendSlot.value) {
    paddingX = 'pl-9 pr-2.5'
  } else if (hasAppendSlot.value && !hasPrependSlot.value) {
    paddingX = 'pl-2.5 pr-10'
  }

  return [
    `${paddingX} input`
  ]
})

const onInput = (event) => {
  emit('update:modelValue', props.type === 'number' ? parseInt(event.target.value) : event.target.value)
}
</script>
