<template>
  <div ref="root">
    <div @click="onClick">
      <slot></slot>
    </div>

    <div
      v-if="isShow"
      class="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center"
      style="background-color: rgba(0,0,0,.4)"
    >
      <div class="p-4 xl:p-10 overflow-hidden w-full h-full">
        <div class="p-2 xl:p-4 bg-black/75 rounded-lg h-full relative">
          <swiper
            ref="target"
            :modules="[Zoom]"
            :initial-slide="active"
            :lazy="true"
            :zoom="true"
            :preload-images="false"
            class="w-auto h-full"
            @slideChange="onSlideChange"
          >
            <swiper-slide v-for="image in images" :key="image.id" class="flex items-center justify-center">
              <div class="swiper-zoom-container">
                <img :data-src="image.src" :src="image.src" :alt="image.src" class="swiper-lazy" loading="lazy" />
              </div>
            </swiper-slide>
          </swiper>
          <div class="absolute top-0 right-0 p-6 z-10">
            <div class="bg-black/50 py-1 px-3 rounded-full text-white text-sm">{{ active + 1 }} из {{ images.length }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import 'swiper/css'
import 'swiper/css/zoom'
// import 'swiper/css/lazy'
import { Zoom } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  text: {
    type: String
  },
  selector: {
    type: String,
    default: 'img'
  }
})

const root = ref(null)
const target = ref(null)
const images = ref([])
const active = ref(0)
const isShow = ref(false)

const show = () => {
  isShow.value = true
  document.body.style.overflow = 'hidden'
}

const hide = () => {
  isShow.value = false
  document.body.style.overflow = ''
}

onClickOutside(target, hide)

const onEsc = (event) => {
  if (event.key === 'Escape') {
    hide()
  }
}

const onSlideChange= (slide) => {
  active.value = slide.activeIndex
}

onMounted(() => {
  document.addEventListener('keydown', onEsc)

  root.value.querySelectorAll(props.selector)
      .forEach(image => images.value.push({...image.dataset}))
})

onBeforeUnmount(() => document.removeEventListener('keydown', onEsc))

const onClick = ({ target }) => {
  if (target.nodeName === 'IMG') {
    for (let index in images.value) {
      if (parseInt(target.dataset.id) === parseInt(images.value[index].id)) {
        active.value = parseInt(index)
        break
      }
    }

    show()
  }
}
</script>

<style lang="scss">
.prose {
  img {
    cursor: pointer;
  }
}
</style>
