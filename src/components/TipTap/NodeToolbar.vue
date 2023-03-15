<template>
  <div class="node-toolbar">
    <div class="node-toolbar-tools">
      <slot name="prepend"></slot>
      <NodeToolbarItem title="Удалить" @click="onDelete" @mouseleave="confirmDeletion = 0" :class="{'bg-red-500': confirmDeletion}">
        <X class="w-5 h-5 text-white" />
      </NodeToolbarItem>
    </div>
  </div>
</template>

<script setup>
import NodeToolbarItem from './NodeToolbarItem.vue'
import { X } from 'lucide-vue-next'
import { ref } from 'vue'

const emit = defineEmits(['delete'])

const confirmDeletion = ref(0)

const onDelete = () => {
  if (confirmDeletion.value === 2) {
    emit('delete')
  }

  confirmDeletion.value++
}
</script>

<style lang="scss">
.node-toolbar {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
}
.node-toolbar-tools {
  display: flex;
  align-items: center;
  margin-left: auto;
  background-color: rgba(0,0,0,.72);
  overflow: hidden;
}
.node-toolbar-tool {
  display: flex;
  align-items: center;
  color: #fcfcfc;
  min-width: 28px;
  height: 28px;
  padding: 4px 8px;
}
</style>