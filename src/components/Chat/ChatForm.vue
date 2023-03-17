<template>
  <form @submit.prevent="onSubmit">
    <slot :form="form" :reply="reply" :loading="isLoading" />
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useForm } from 'vee-validate'
import { pick } from 'lodash-es'
import useQuery from '../../composables/useQuery'

const props = defineProps({
  chatMessageFields: {
    type:     String,
    required: true,
  },
  chatId: {
    type:     [Number, String],
    required: true,
  },
  store: {
    type: Object,
    required: true
  }
})

const formInitialState = {
  parent_id:  null,
  link_id:    null,
  text:       '',
  images:     [],
}

const form = ref({...formInitialState})
const reply = ref({})
const isLoading = ref(false)

watch(() => props.store.selectedMessages, (newValue) => {
  if (props.store.mode === 'edit') {
    form.value.text = newValue[Object.keys(newValue)[0]].text
  }

  if (props.store.mode === 'reply') {
    const message = newValue[Object.keys(newValue)[0]]

    reply.value = message
    form.value.parent_id = message.id
  }
})

const { handleSubmit, setErrors } = useForm()

const onSubmit = handleSubmit(async () => {
  if (isLoading.value) {
    return
  }

  isLoading.value = true

  const input = pick(form.value, [
    'parent_id',
    'link_id',
    'text',
    'images',
  ])

  input.images = input.images.map(image => parseInt(image.id))

  try {
    await useQuery({
      query: /* GraphQL */`
        mutation createChatMessage($chat_id: ID!, $input: ChatMessageInput!) {
          messageId: createChatMessage(chat_id: $chat_id, input: $input)
        }
      `,
      variables: {
        chat_id: props.chatId,
        input
      }
    })

    form.value = {...formInitialState}
  } catch (error) {
    if (error?.extensions?.validation) {
      setErrors(error.extensions.validation)
    }
  } finally {
    isLoading.value = false
  }
})
</script>
