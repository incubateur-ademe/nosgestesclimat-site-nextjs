export const postThumbnailClickMatomo = (slug: string) => [
  'trackEvent',
  'blog',
  'article',
  slug,
]
