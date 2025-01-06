import { cmsClient, type ArticleType } from '@/adapters/cmsClient'
import { captureException } from '@sentry/nextjs'

const isProduction = process.env.NODE_ENV === 'production'

export async function fetchArticlePageContent({
  articleSlug,
}: {
  articleSlug: string
}): Promise<{
  article?: ArticleType
  otherArticles?: ArticleType[]
}> {
  try {
    const articleSearchParams = new URLSearchParams({
      locale: 'fr',
      'populate[0]': 'image',
      'populate[1]': 'category',
      'populate[2]': 'author',
      'filters[slug][$eq]': articleSlug,
      status: isProduction ? '' : 'draft',
    })

    const articleResponse = await cmsClient<{ data: ArticleType[] }>(
      `/api/articles?${articleSearchParams}`
    )

    if (!articleResponse.data?.[0]) {
      console.error(
        `Error: articleResponse.data?.[0] is undefined for articleSlug: ${articleSlug}`
      )
      return {}
    }

    const { data } = articleResponse

    const article = data[0]

    const categorySlug = article?.category?.slug
    const otherArticlesSearchParams = new URLSearchParams({
      locale: 'fr',
      'filters[category][slug][$eq]': categorySlug ?? '',
      sort: 'publishedAt:desc',
    })

    const otherArticlesResponse = await cmsClient<{
      data: ArticleType[]
    }>(`/api/articles?${otherArticlesSearchParams}`)

    return {
      article,
      otherArticles: otherArticlesResponse?.data ?? [],
    }
  } catch (error) {
    console.error('Error:', error)
    captureException(error)

    return {}
  }
}
