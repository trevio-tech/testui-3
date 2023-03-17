<template>
    <Combobox v-model="selectedItems" @update:modelValue="onSelect">
      <ComboboxInput
          :class="[`input-${hasError ? 'danger' : variant}`]"
          :displayValue="(place) => place?.[keyName]"
          ref="input"
          class="input"
          autocomplete="off"
          placeholder="Поиск места"
          @input="onChange"
      />

      <div v-if="items.length" class="relative z-50">
        <TransitionRoot
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
          <ComboboxOptions
              class="absolute w-full left-0 top-full mt-2 max-h-60 overflow-auto rounded bg-white shadow-lg ring-1 ring-gray-200 focus:outline-none"
          >
            <ComboboxOption
                v-for="item in items"
                as="template"
                :key="item[keyId]"
                :value="item"
                v-slot="{ selected, active }"
            >
              <div
                  class="relative cursor-pointer select-none p-2"
                  :class="{
                  'bg-gray-100': active,
                  'text-gray-900': !active,
                }"
              >
                <span class="block truncate text-sm" :class="{ 'font-medium': selected, 'font-normal': !selected }">
                  {{ item[keyName] }}
                </span>
              </div>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { nextTick, ref } from 'vue'
import debounce from 'lodash/debounce'
import useQuery from '../../../composables/useQuery'

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  TransitionRoot,
} from '@headlessui/vue'

const emit = defineEmits([
  'update:modelValue'
])

const props = defineProps({
  modelValue: {
    type: Object,
  },
  searchBy: {
    type: Array,
  },
  clearAfterSelect: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: 'default',
    validator(type) {
      return ['default', 'danger', 'success'].includes(type)
    },
  },
  hasError: {
    type: Boolean,
    default: false
  },
})

let selectedItems = ref(props.modelValue)
const items = ref([])
const keyName = 'full_name'
const keyId = 'id'
const input = ref(null)

const onSelect = async (place) => {
  emit('update:modelValue', place)

  if (props.clearAfterSelect) {
    await nextTick()
    selectedItems = ref({
      [keyId]: null,
      [keyName]: ''
    })
    input.value.el.value = ''
    items.value = []
  }
}

const onChange = debounce(async (event) => {
  try {
    if (event.target.value.length > 0) {
      const { data: { searchPlaces } } = useQuery({
        query: `
          query ($query: String!, $search_by: [String]) {
            searchPlaces(query: $query, search_by: $search_by) {
              id
              name
              full_name
            }
          }
        `,
        variables: {
          query: event.target.value,
          search_by: props.searchBy
        }
      })

      items.value = searchPlaces
    }
  } catch (error) {}
}, 250)
</script>
