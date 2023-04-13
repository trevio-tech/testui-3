<template>
  <div>
    <Field :name="name" :rules="rules" v-slot="{ errorMessage }">
      <label v-if="label" class="font-medium text-sm">{{ label }}<span v-if="required" class="text-red-400 ml-1">*</span></label>
      <div class="mt-1">
        <slot :hasError="errorMessage !== undefined" />
      </div>
      <p v-if="errorMessage" class="mt-1 text-red-500 font-medium text-xs">{{ errorMessage }}</p>
      <p v-if="!!$slots.help && !errorMessage" class="mt-1 text-gray-500 font-medium text-xs">
        <slot name="help"></slot>
      </p>
    </Field>
  </div>
</template>

<script setup>
import { Field } from 'vee-validate'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
  },
  required: {
    type: Boolean
  },
  rules: {
    type: [String, Array, Object]
  }
})
</script>