<template>
  <div class="flex items-center space-x-1">
    <svg
      v-for="star in stars" :fill="star <= modelValue ? '#f5d04e' : '#e0e0e0'"
      :key="star"
      :width="size"
      :height="size"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      :class="{'cursor-pointer': !inactive}"
      @click="onClick(star)"
    >
      <path
          d="M 30.335938 12.546875 L 20.164063 11.472656 L 16 2.132813 L 11.835938 11.472656 L 1.664063 12.546875 L 9.261719 19.394531 L 7.140625 29.398438 L 16 24.289063 L 24.859375 29.398438 L 22.738281 19.394531 Z"/>
    </svg>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [Number, String],
  },
  stars: {
    type: Number,
    default: 5
  },
  size: {
    type: String,
    default: '24px'
  },
  inactive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const onClick = (star) => {
  if (props.inactive) {
    return
  }

  emit('update:modelValue', star)
}
</script>