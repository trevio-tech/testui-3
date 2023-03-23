<template>
  <ClientOnly>
    <slot :items="items" :isMore="isMore" :isLoading="isLoading" :onFetch="getItems" />
  </ClientOnly>
</template>

<script setup>
import { shallowRef, onBeforeMount } from 'vue'
import useQuery from '../../composables/useQuery'

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
  fields: {
    type: String,
    required: true
  },
  query: {
    type: String
  },
  orderBy: {
    type: String
  }
})

const isLoading = shallowRef(false)
const isMore = shallowRef(true)
const items = shallowRef([])
const page = shallowRef(1)

const getItems = async () => {
  if (isLoading.value) {
    return
  }

  isLoading.value = true

  try {
    const { data: { contentList }} = await useQuery({
      query: `
        query contentList ($user_id: ID, $travel_id: ID, $page: Int, $limit: Int, $order_by: String) {
          contentList(user_id: $user_id, travel_id: $travel_id, page: $page, limit: $limit, order_by: $order_by) {
            ${props.fields}
          }
        }
      `,
      variables: {
        travel_id: props.travelId,
        user_id: props.userId,
        page: page.value,
        limit: props.limit,
        query: props.query,
        order_by: props.orderBy
      }
    })

    isMore.value = contentList.length >= props.limit
    contentList.forEach((item) => {
      items.value.push(item)
    })
    page.value++
  } catch (errors) {
    console.log(errors)
  }
  finally {
    isLoading.value = false
  }
}
getItems()
</script>