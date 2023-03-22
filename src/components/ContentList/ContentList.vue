<template>
  <div>
    <slot :items="items" :isMore="isMore" :isLoading="isLoading" :onFetch="getItems" />
  </div>
</template>

<script setup>
import { shallowRef } from 'vue'
import { useQuery } from '../../index'

const props = defineProps({
  travelId: {
    type: [String, Number]
  },
  userId: {
    type: [String, Number]
  },
  limit: {
    type: Number,
    default: 10
  },
  query: {
    type: String,
    required: true
  },
})

const isLoading = shallowRef(false)
const items = shallowRef([])
const page = shallowRef(1)
const isMore = shallowRef(true)

const getItems = async () => {
  try {
    if (isLoading.value) {
      return
    }

    isLoading.value = true

    const { data: { userContent }} = await useQuery({
      query: props.query,
      variables: {
        travel_id: props.travelId,
        user_id: props.userId,
        page: page.value,
        limit: props.limit
      }
    })

    isMore.value = userContent.length >= props.limit
    items.value = [...items.value, ...userContent]
    page.value++
  } catch (error) {}
  finally {
    isLoading.value = false
  }
}

getItems()
</script>