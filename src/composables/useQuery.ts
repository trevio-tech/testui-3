import { useNuxtApp } from 'nuxt/app'

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

  const { data, errors, refresh, pending } = await $fetch($config.public.GRAPHQL_URL, {
    onRequest({ options }) {
      options.headers = options.headers || {}
      options.headers.Accept = 'application/json'
      options.headers.Authorization = $auth.strategy.token.get()
    },
    body,
    ...options
  })

  if (errors) {
    throw errors
  }

  return {
    data,
    refresh,
    pending
  }
}

export default useQuery
