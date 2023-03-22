import { useNuxtApp, useFetch } from 'nuxt/app'

const useQuery = async ({ query, variables = {} }, options = {}) => {
  const { $auth, $config } = useNuxtApp()

  const isFormData = query instanceof FormData

  let body = query

  if (! isFormData) {
    body = {
      query: query
        .trim()
        .replaceAll(/\s+/ig, ' '),
      variables
    }
  }

  options.method = 'POST'

  const { data, refresh, pending } = await useFetch($config.public.GRAPHQL_URL, {
    onRequest({ options }) {
      options.headers = options.headers || {}
      options.headers.Accept = 'application/json'
      options.headers.Authorization = $auth.strategy.token.get()
    },
    body,
    ...options
  })

  if (typeof data.value === 'object' && Object.hasOwn(data.value, 'errors')) {
    throw data.value.errors
  }

  return {
    ...data.value,
    refresh,
    pending
  }
}

export default useQuery
