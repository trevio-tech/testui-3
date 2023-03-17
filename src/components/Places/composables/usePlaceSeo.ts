// @ts-nocheck

import { useSeoMeta } from 'nuxt/app'

interface Place {
  full_name?: string
}

/**
 *
 * @param { any } route
 * @param { object } place
 */
export default (route: any, place: Place) => {
  let title = [
    'Отзывы',
    'о месте',
    place.full_name,
  ]

  if (route.params.stars) {
    title.splice(1, 0, `с оценкой ${route.params.stars},`)
  }

  title = title.join(' ')

  let description = `Читай свежие отзывы о «${place.full_name}» на сайте о путешествиях и туризме Тревио.ру`

  useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
  })

  return {
    title
  }
}