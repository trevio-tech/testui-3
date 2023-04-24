<template>
  <div ref="root" class="textarea">
    <textarea
      :aria-label="label"
      :disabled="disabled"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :rows="rows"
      :value="modelValue"
      @input="onInput"
    />
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: String,
  },
  label: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  required: {
    type: Boolean,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  rows: {
    type: [String, Number],
    default: 2
  },
  hasError: {
    type: Boolean
  }
})

const root = ref()

onMounted(() => root.value.dataset.replicatedText = props.modelValue)

const onInput = (event) => {
 emit('update:modelValue', root.value.dataset.replicatedText = event.target.value)
}
</script>

<style lang="scss">
.textarea {
  position: relative;

  textarea {
    @apply overflow-hidden resize-none border border-slate-200 focus:ring-blue-100 focus:border-blue-200 w-full rounded-lg text-sm p-2 focus:outline-none focus:ring-4 disabled:opacity-75 transition duration-100 ease-in-out;
  }
}

/**
 * https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas
 */
.textarea {
  display: grid;

  textarea {
    grid-area: 1 / 1 / 2 / 2;
  }
}
.textarea::after {
  @apply p-2 w-full text-sm border border-transparent;
  content: attr(data-replicated-text) ' ';
  grid-area: 1 / 1 / 2 / 2;
  visibility: hidden;
  white-space: pre-wrap;
}
</style>