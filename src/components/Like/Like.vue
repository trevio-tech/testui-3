<template>
  <button
    type="button"
    class="px-2.5 h-[28px] text-sm flex items-center rounded-lg overflow-hidden"
    :class="{[like.isLiked ? 'bg-red-100' : 'bg-slate-100']: true}"
    :title="like.isLiked ? 'Вам понравилось' : 'Мне нравится'"
    @click="onClick">
    <Heart class="h-4 w-4 mr-1" :class="{[like.isLiked ? 'text-red-500' : 'text-gray-500']: true}" />
    <span class="min-w-[12px] text-slate-600 font-medium text-right">{{ like.count }}</span>
  </button>
</template>

<script setup>
import useQuery from '../../composables/useQuery'
import { Heart } from 'lucide-vue-next'
import { ref } from 'vue'

const props = defineProps({
  modelType: {
    type: String,
    required: true,
  },
  modelId: {
    type: [Number, String],
    required: true,
  },

  isLiked: {
    type: Boolean,
    default: false,
  },

  count: {
    type: Number,
    default: 0,
  },
})

const like = ref({
  isLiked: props.isLiked,
  count: props.count,
})

const isLoading = ref(false)

const CREATE_LIKE = `
  mutation($model_type: String!, $model_id: ID!) {
    like: createLike(model_type: $model_type, model_id: $model_id)
  }
`

const DELETE_LIKE = `
  mutation($model_type: String!, $model_id: ID!) {
    like: deleteLike(model_type: $model_type, model_id: $model_id)
  }
`

const onClick = async () => {
  if (isLoading.value) {
    return
  }

  isLoading.value = true

  try {
    const { data } = await useQuery({
      query: like.value.isLiked
        ? DELETE_LIKE
        : CREATE_LIKE,
      variables: {
        model_type:  props.modelType,
        model_id:    props.modelId,
      }
    })

    like.value.isLiked = (data.like === 'like');

    if (like.value.isLiked) {
      like.value.count++;
    } else if (like.value.count > 0) {
      like.value.count--;
    }
  } catch (errors) {
    console.log(errors)
  }
  finally {
    isLoading.value = false
  }
}
</script>
