<script setup>
import { computed } from 'vue'
import useOverlay from './useOverlay.ts'

const overlay = useOverlay()

const count = computed(() => overlay.stack.length)

const onHide = () => {
  if (typeof overlay.stack[0]?.onHide === 'function') {
    overlay.stack[0].onHide()
  }

  overlay.hide()
}
</script>

<template>
  <div v-if="count" class="overlay">
    <div
        tabindex="-1"
        aria-hidden="true"
        class="absolute left-0 top-0 right-0 bottom-0 grid grid-cols-12 h-full"
    >
      <component
          class="absolute"
          :is="overlay.component"
          :key="overlay.key"
          :style="{
        zIndex: index + 1
        }"
          v-bind="overlay.props"
          v-for="(overlay, index) in overlay.stack"
          v-on="overlay.on"
          role="dialog"
      ></component>
    </div>
    <div class="overlay-backdrop"
         @click="onHide" :style="{
      zIndex: count - 1
    }"></div>
  </div>
</template>

<style>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: hidden;
}
.overlay-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0,0,0,.4);
  z-index: 1;
}
</style>