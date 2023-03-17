<template>
  <Combobox :model-value="selectedTags" @update:modelValue="onSelect" multiple>
    <div class="input input-default min-h-10" style="height: auto">
      <div class="flex items-center flex-wrap gap-2 w-full">
        <div v-for="(tag, index) in selectedTags" :key="tag[keyId]">
          <slot name="selected" :item="tag" :onDelete="onDelete" :index="index">
            <div class="flex rounded items-center py-0.5 h-5 pl-2 pr-1 bg-indigo-500 text-xs text-white">
              <div class="mr-2 max-w-60 truncate">{{ tag[keyName] }}</div>
              <X class="w-4 h-4 cursor-pointer rounded" @click="onDelete(index)" />
            </div>
          </slot>
        </div>

        <div class="flex-auto">
          <ComboboxInput
            class="w-full focus:outline-none"
            autocomplete="off"
            :placeholder="placeholder"
            :display-value="(tag) => tag?.[keyName]"
            ref="input"
            @input="onInput"
          />
        </div>
      </div>
    </div>

    <div v-if="items.length" class="relative z-50">
      <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="query = ''"
      >
        <ComboboxOptions
            class="absolute w-full left-0 top-full mt-1 max-h-60 overflow-auto rounded bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ComboboxOption v-for="item in items" as="template" v-slot="{ selected, active }" :key="item[keyId]" :value="item">
            <slot name="option" :selected="selected" :active="active" :item="item">
              <div class="relative cursor-default select-none p-2.5" :class="{'bg-stone-100': active}">
                <span class="flex items-center space-x-2 truncate" :class="{ 'font-medium': selected }">
                  <span>{{ item[keyName] }}</span>
                  <span v-if="! item[keyId]" class="text-xs text-green-dark">(создать)</span>
                </span>
              </div>
            </slot>
          </ComboboxOption>
        </ComboboxOptions>
      </TransitionRoot>
    </div>
  </Combobox>
</template>

<script setup>
import debounce from 'lodash/debounce'
import { ref } from 'vue'
import useQuery from '../../composables/useQuery'

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  TransitionRoot,
} from '@headlessui/vue'
import {
  X
} from 'lucide-vue-next'

const emit = defineEmits([
  'update:modelValue'
])

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  selectCallback: {
    type: Function,
  },
  placeholder: {
    type: String,
    default: 'Добавить тег',
  },
  skipCreation: {
    type: Boolean,
    default: false
  },
  keyName: {
    type: String,
    default: 'name',
  },
  keyId: {
    type: String,
    default: 'id',
  },
  setErrors: {
    type: Function
  },

  searchMutationName: {
    type: String,
    default: 'searchTags'
  },
  searchMutation: {
    type: String,
    default: `
      query ($query: String!) {
        searchTags (query: $query) {
          id
          name
        }
      }`
  }
})

const query = ref('')
const selectedTags = ref(props.modelValue)
const items = ref([])
const input = ref()

const onSelect = async (tags) => {
  if (props.selectCallback) {
    // Закрываем список.
    items.value = []
    query.value = ''
    input.value.$el.value = ''

    try {
      let tag = tags.at(-1)

      // Если последний выбранный тег был добавлен вручную,
      // то отправляем запрос на его создание на сервере.
      // После создания, заменяем тег на тот что вернул сервер.
      if (tag.id === null) {
        const newTag = await props.selectCallback(tag)

        if (newTag) {
          tags.splice(-1, 1, newTag)
        }
      }

      emit('update:modelValue', selectedTags.value = tags)
    } catch (errors) {
      if (errors[0].message === 'validation' && props.setErrors) {
        props.setErrors(errors[0]['extensions']['validation'])
      } else {
        console.log(errors)
      }
    }
  }
}

const onInput = debounce(async (event) => {
  if (event.target.value.length > 0) {
    const { data } = useQuery({
      query: props.searchMutation,
      variables: {
        query: event.target.value
      }
    })

    items.value = data[props.searchMutationName]

    // Если тег не найден в результатах поиска,
    // то добавляем его в выпадающий список вручную.
    if (props.skipCreation === false) {
      if (items.value.filter(tag => tag[props.keyName] === event.target.value.toLowerCase()).length === 0) {
        items.value.unshift({
          id: null,
          [props.keyName]: event.target.value
        })
      }
    }
  }
}, 250)

const onDelete = (index) => {
  selectedTags.value.splice(index, 1)
  emit('update:modelValue', selectedTags.value)
}
</script>
