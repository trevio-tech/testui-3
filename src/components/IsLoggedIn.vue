<template>
  <div @click="onClick" class="cursor-pointer">
    <slot></slot>
  </div>
</template>

<style scoped>
:slotted(*) {
  pointer-events: v-bind(pointerEvents);
}
</style>

<script setup>
import { useNuxtApp } from 'nuxt/app'
import { defineAsyncComponent, ref, watch } from 'vue'
import { useOverlay } from '../index'

const overlay = useOverlay()
const { $auth } = useNuxtApp()
const pointerEvents = ref($auth.loggedIn ? 'auto' : 'none')

watch(() => $auth.loggedIn, (loggedIn) => {
  pointerEvents.value = loggedIn ? 'auto' : 'none'
})

const onClick = async () => {
  if (! $auth.loggedIn) {

    overlay.show(
        defineAsyncComponent(() => import('~/components/users/components/Authentication/LoginRegisterDialog.vue'))
    )
  }
}
</script>