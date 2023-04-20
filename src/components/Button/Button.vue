<template>
  <button
    v-ripple
    :class="classes"
    :type="type"
    :disabled="disabled || loading"
    @click="onClick($event)"
  >
    <Loader v-if="loading" />
    <slot v-if="hasPrependSlot && !loading" name="prepend"></slot>
    <span :style="{visibility: loading ? 'hidden' : 'visible'}"><slot></slot></span>
    <slot v-if="hasAppendSlot && !loading" name="append"></slot>
  </button>
</template>

<script>
import Loader from '../Loader/Loader.vue'

export default {
  name: 'Button',
  components: {
    Loader
  },
  emits: ['click'],
  setup(_, { emit }) {
    const onClick = (event) => emit('click', event)

    return {
      onClick
    }
  },
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator(type) {
        return ['primary', 'secondary', 'danger', 'success'].includes(type)
      },
    },
    type: {
      type: String,
      default: 'button',
      validator(type) {
        return ['button', 'submit', 'reset'].includes(type)
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    hasPrependSlot() {
      return !!this.$slots['prepend'];
    },
    hasAppendSlot() {
      return !!this.$slots['append'];
    },
    classes() {
      const variants = {
        primary:    'text-white bg-sky-400 enabled:hover:bg-sky-500 focus:ring-sky-200 focus:ring-4',
        secondary:  'text-black border border-gray-lightest enabled:hover:bg-gray-lightest',
        danger:     'text-white bg-red enabled:hover:bg-red-dark focus:ring-red-light focus:ring-4',
        success:    'text-white bg-green enabled:hover:bg-green-dark focus:ring-green-light focus:ring-4',
      };

      return {
        'relative font-medium rounded-lg text-sm px-5 h-[42px] focus:outline-none disabled:opacity-75 transition duration-100 ease-in-out': true,
        [variants[this.variant]]: true,
        'flex items-center space-x-2': this.hasAppendSlot || this.hasPrependSlot
      }
    },
  },
}
</script>
