<template>
  <IsLoggedIn>
    <slot :onSubmit="onSubmit" :isSubscribed="isSubscribed" :isLoading="isLoading" />
  </IsLoggedIn>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import useQuery from '../../composables/useQuery'
import IsLoggedIn from '../IsLoggedIn.vue'
import { useSubscriptionsStore } from './store'
import { toast } from 'vue3-toastify'

const props = defineProps({
  modelType: {
    type: String,
  },
  modelId: {
    type: [Number, String],
  },
})

const store = useSubscriptionsStore()

const isSubscribed = ref(
  Object.hasOwn(store.subscriptions, props.modelType + props.modelId)
)
const isLoading = ref(false)

const onSubmit = async (modelType: string, modelId: string|number) => {
  if (isLoading.value) {
    return
  }

  isLoading.value = true

  try {
    const { data } = await useQuery({
      query: `
        mutation subscribeUnsubscribe($model_type: String!, $model_id: ID!) {
          subscribeUnsubscribe(model_type: $model_type, model_id: $model_id)
        }
      `,
      variables: {
        model_type: props.modelType,
        model_id: props.modelId
      }
    })

    isSubscribed.value = data.subscribeUnsubscribe === 'subscribe'

    if (isSubscribed.value) {
      store.subscriptions[props.modelType + props.modelId] = true
    } else {
      delete store.subscriptions[props.modelType + props.modelId]
    }
  } catch (errors) {
    toast(errors[0].extensions.debugMessage, {
      type: 'error'
    })
  } finally {
    isLoading.value = false
  }
}
</script>
