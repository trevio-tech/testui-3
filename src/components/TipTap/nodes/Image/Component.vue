<template>
  <NodeViewWrapper draggable="true" class="relative">
    <NodeToolbar @delete="deleteNode">
      <template #prepend>
        <NodeToolbarItem
          :class="{'bg-green-600': coverId === nodeId}"
          @click="editor.contentComponent.emit('cover', nodeId)"
        >
          {{ coverId === nodeId ? 'На обложке' : 'Сделать обложкой'}}
        </NodeToolbarItem>
      </template>
    </NodeToolbar>

    <img :src="node.attrs.src" :data-id="node.attrs['data-id']" :data-src="node.attrs['data-src']" alt="" style="width: 100%; display: block">
  </NodeViewWrapper>
</template>

<script setup>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
import NodeToolbar from '../../NodeToolbar.vue'
import NodeToolbarItem from '../../NodeToolbarItem.vue'

const props = defineProps(nodeViewProps)
const coverId = parseInt(props.editor.contentComponent.parent.props?.coverId)
const nodeId = parseInt(props.node.attrs['data-id'])
</script>