import type {
  PopulatedArticleType,
  PopulatedAuthorType,
} from '@/adapters/cmsClient'
import { cmsClient } from '@/adapters/cmsClient'
import i18nConfig from '@/i18nConfig'

type Article = PopulatedArticleType<'image' | 'category'> & {
  author: PopulatedAuthorType<'image'>
}

export async function fetchArticlePageContent({
  articleSlug,
  locale,
}: {
  articleSlug: string
  locale: string
}): Promise<
  | {
      article?: Article
      otherArticles?: PopulatedArticleType<'image' | 'category'>[]
    }
  | undefined
> {
  try {
    const articleSearchParams = new URLSearchParams({
      locale: locale ?? i18nConfig.defaultLocale,
      'populate[0]': 'image',
      'populate[1]': 'category',
      'populate[2]': 'author',
      'populate[3]': 'author.image',
      'filters[slug][$eq]': articleSlug,
      sort: 'publishedAt:desc',
    })

    const articleResponse = await cmsClient<{
      data: [Article]
    }>(`/api/articles?${articleSearchParams}`)

    if (articleResponse.data?.length !== 1) {
      console.error(
        `Error: fetch article error for articleSlug: ${articleSlug}`
      )
      return
    }

    const {
      data: [article],
    } = articleResponse

    const categorySlug = article.category?.slug
    const otherArticlesSearchParams = new URLSearchParams({
      locale: locale ?? i18nConfig.defaultLocale,
      'populate[0]': 'image',
      'populate[1]': 'category',
      ...(categorySlug ? { 'filters[category][slug][$eq]': categorySlug } : {}),
      'filters[slug][$ne]': articleSlug,
      sort: 'createdAt:desc',
      'pagination[start]': '0',
      'pagination[limit]': '3',
    })

    const otherArticlesResponse = await cmsClient<{
      data: PopulatedArticleType<'image' | 'category'>[]
    }>(`/api/articles?${otherArticlesSearchParams}`)

    return {
      article,
      otherArticles: otherArticlesResponse?.data ?? [],
    }
  } catch (error) {
    return
  }
}
