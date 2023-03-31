import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import { ApolloLink, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { createLighthouseSubscriptionLink } from './subscription-link'

export default (nuxtApp) => {
  window.Pusher = Pusher

  const GRAPHQL_URL = nuxtApp.$config.public.GRAPHQL_URL
  const WEBSOCKETS_APP_KEY = nuxtApp.$config.public.WEBSOCKETS_APP_KEY
  const WEBSOCKETS_HOST = nuxtApp.$config.public.WEBSOCKETS_HOST

  console.log(WEBSOCKETS_HOST)

  const echo = new Echo({
    broadcaster: 'pusher',
    key: WEBSOCKETS_APP_KEY,
    wsHost: WEBSOCKETS_HOST,
    wsPort: 6001,
    cluster: 'mt1',
    forceTLS: false,
    encrypted: true,
    authEndpoint: `${GRAPHQL_URL}/subscriptions/auth`,
    auth: {
      headers: {
        Authorization: nuxtApp.$auth.strategy.token.get()
      }
    },
  })

  echo.connector.pusher.connection.bind('connected', function () {
    echo.options.auth.headers['X-Socket-ID'] = echo.socketId()
  })

  return new ApolloClient({
    link: ApolloLink.from([
      createLighthouseSubscriptionLink(echo),
      createHttpLink({
        uri: GRAPHQL_URL,
      }),
    ]),
    cache: new InMemoryCache(),
  })
}