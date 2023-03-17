// @ts-nocheck
import { useSeoMeta, useHead } from 'nuxt/app'

export default (route) => {
  let heading = 'Поиск'


  if (route.params.query) {
    heading += ` по запросу «${route.params.query}»`
  }

  useHead({
    link: [
      {
        href: '/search',
        rel: 'canonical',
      },
    ],
  })

  useSeoMeta({
    title: heading,
    ogTitle: heading,
    /*description: 'This is my amazing site, let me tell you all about it.',
    ogDescription: 'This is my amazing site, let me tell you all about it.',
    ogImage: 'https://example.com/image.png',
    twitterCard: 'summary_large_image',*/
  })


  return {
    heading
  }
}