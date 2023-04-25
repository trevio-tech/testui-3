<template>
  <div class="relative rounded-full">
    <Upload
      v-if="editable"
      class="absolute right-0 top-0 bg-white p-1 rounded-full w-8 h-8 shadow overflow-hidden"
      mutation-name="uploadAvatar"
      v-slot="{ isUploading }"
      @update:modelValue="emits('update:modelValue', $event)"
    >
      <UploadCloud />
      <Loader v-if="isUploading" />
    </Upload>
    <img
      :alt="alt"
      :src="modelValue"
      class="rounded-full w-full"
      crossorigin="anonymous"
      @load="emits('load', $event)"
    >
  </div>
</template>

<script setup lang="ts">
import { Upload, Loader } from '../../index'
import { UploadCloud } from 'lucide-vue-next'

interface Props {
  alt?: string
  editable?: boolean
  modelValue: string
}

const emits = defineEmits(['update:modelValue', 'load'])
const props = defineProps<Props>()
</script>