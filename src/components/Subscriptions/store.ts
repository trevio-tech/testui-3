import { defineStore } from 'pinia'

export const useSubscriptionsStore = defineStore('subscriptions', {
  state: () => {
    return {
      subscriptions: {}
    }
  },
})