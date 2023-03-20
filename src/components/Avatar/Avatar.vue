<template>
  <div class="relative">
    <Upload
      v-if="editable"
      class="absolute right-0 top-0 bg-white p-1 rounded-full w-8 h-8 shadow"
      style="margin: 5% 5% 0 0"
      mutation-name="uploadAvatar"
      @update:modelValue="emits('update:modelValue', $event)"
    >
      <UploadCloud />
    </Upload>
    <img
      :alt="alt"
      :src="modelValue"
      class="rounded-full"
      crossorigin="anonymous"
      @load="emits('load', $event)"
    >
  </div>
</template>

<script setup lang="ts">
import { Upload } from '../../index'
import { UploadCloud } from 'lucide-vue-next'

interface Props {
  alt?: string
  editable?: boolean
  modelValue: string
}

const emits = defineEmits(['update:modelValue', 'load'])
const props = defineProps<Props>()
</script>