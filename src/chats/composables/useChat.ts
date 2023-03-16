import useQuery from '../../composables/useQuery'
import { groupBy } from 'lodash-es'
import { ref } from 'vue'

const stacks = ref({})
const activeChatId = ref()
const messageFields = ref('id')

const addMessage = (message) => {
  if (Object.hasOwn(stacks.value, message.stack)) {
    stacks.value[message.stack].push(message)
  } else {
    stacks.value[message.stack] = [
      message
    ]
  }
}

const getMessages = async (chatId: string) => {
  activeChatId.value = chatId
  const [modelType, modelId] = chatId.split('-')

  const {data: {chatMessages}} = await useQuery({
    query: `
      query($model_type: String!, $model_id: ID!) {
        chatMessages(model_type: $model_type, model_id: $model_id) {
          ${messageFields.value}
        }
      }
    `, variables: {
      model_type: modelType,
      model_id:   modelId
    }
  })

  stacks.value = groupBy(chatMessages, 'stack')
}

/**
 * Какие поля должен вернуться для каждого сообщения чата.
 * @param fields
 */
const setMessageFields = (fields: string) => {
  messageFields.value = fields
}

export default () => {
  return {
    stacks,
    activeChatId,
    getMessages,
    addMessage,
    setMessageFields,
  }
}
