<template>
  <Combobox @update:model-value="onSelect" class="relative" as="div">
    <ComboboxInput class="input input-default" placeholder="Поиск" @input="onFetch" />

    <TransitionRoot
      v-if="query !== ''"
      leave="transition ease-out duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      @after-leave="query = ''; items = []"
    >
      <div class="absolute mt-2 w-full overflow-hidden rounded-md bg-white shadow">
        <div v-if="items.length === 0" class="select-none py-2 px-4">Ничего не найдено.</div>

        <ComboboxOptions class="max-h-60 overflow-y-auto">
          <ComboboxOption
            v-for="person in items"
            as="template"
            :key="person.id"
            :value="person"
            v-slot="{ active }"
          >
            <li
              class="relative cursor-default select-none py-2 px-4"
              :class="{'bg-stone-100': active,'text-gray-900': !active}"
            >
              <span
                @click="to(person.system_name, person.id)"
                class="flex items-center truncate cursor-pointer">
                <img v-if="person.system_name === 'users'" :src="person.avatar" :alt="person.name"
                     class="w-5 h-5 rounded-full mr-2">
                <span class="text-sm">{{ person.title || person.name }}</span>
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>

        <button type="button" v-if="items.length > 0" @click="onFull" class="text-sm cursor-pointer w-full bg-gray-50 border-t border-t-gray-100 p-4">
          Смотреть все результаты
        </button>
      </div>
    </TransitionRoot>
  </Combobox>
</template>

<script setup>
import { debounce, orderBy } from 'lodash-es'
import { ref } from 'vue'
import { useQuery } from '../../../index'
import { useRouter } from 'nuxt/app'

import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'

const router = useRouter()

const items = ref([])
let query = ref('')
const loading = ref(false)

const onSelect = (item) => {
  to(item.system_name, item.id)
}

const onFull = () => {
  router.push({name: 'search', params: {
    query: query.value
  }})

  query.value = ''
  items.value = []
}

const to = (systemName, id) => {
  const routes = {
    albums: {name: 'albums.show', params: {albumId: id}},
    notes: {name: 'notes.show', params: {noteId: id}},
    questions: {name: 'questions.show', params: {questionId: id}},
    reviews: {name: 'reviews.show', params: {reviewId: id}},
    travels: {name: 'travels.show', params: {travelId: id}},
    users: {name: 'users.show', params: {userId: id}},
  }

  router.push(routes[systemName])

  query.value = ''
  items.value = []
}

const onFetch = debounce(async (event) => {
  if (loading.value) {
    return
  }

  loading.value = true

  query.value = event.target.value

  if (query.value.length === 0) {
    items.value = []
    return
  }

  try {
    const { data } = await useQuery({
      query: `
      query ($query: String!, $searchBy: String) {
        search(query: $query, searchBy: $searchBy) {
          ... on Travel {
            id
            title
            system_name
          }
          ... on Note {
            id
            title
            system_name
          }
          ... on Album {
            id
            title
            system_name
          }
          ... on User {
            id
            name
            avatar
            system_name
          }
        }
      }
    `,
      variables: {
        query: query.value,
      }
    })

  /*... on Question {
      id
      title
      system_name
    }
  ... on Review {
      id
      title
      system_name
    }*/

    items.value = orderBy(data.search, ['system_name'], 'desc')
  } catch (error) {}
  finally {
    loading.value = false
  }
}, 750)
</script>
