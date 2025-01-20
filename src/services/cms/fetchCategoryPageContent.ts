import type {
  ArticleItemType,
  PopulatedArticleType,
  PopulatedCategoryType,
} from '@/adapters/cmsClient'
import { cmsClient } from '@/adapters/cmsClient'
import { defaultLocale } from '@/i18nConfig'
import { captureException } from '@sentry/nextjs'

const PAGE_SIZE = 12
const isProduction = process.env.NODE_ENV === 'production'

export async function fetchCategoryPageContent({
  slug,
  page,
}: {
  slug: string
  page: number
}): Promise<
  | (Partial<
      PopulatedCategoryType<'questions' | 'image'> & {
        mainArticle: PopulatedArticleType<'image'>
        articles: ArticleItemType[]
      }
    > & {
      pageCount: number
    })
  | undefined
> {
  try {
    const categorySearchParams = new URLSearchParams({
      locale: defaultLocale,
      'filters[slug][$eq]': slug,
      'populate[0]': 'image',
      'populate[1]': 'questions',
      'populate[2]': 'mainArticle',
      'populate[3]': 'mainArticle.image',
      sort: 'questions.order:asc',
      status: isProduction ? '' : 'draft',
    })

    const categoryResponse = await cmsClient<{
      data: [
        PopulatedCategoryType<'questions' | 'image'> & {
          mainArticle: PopulatedArticleType<'image'>
        },
      ]
    }>(`/api/categories?${categorySearchParams}`)

    if (categoryResponse?.data?.length !== 1) {
      console.error(`Error: fetch category error for categorySlug: ${slug}`)
    }

    const {
      data: [category],
    } = categoryResponse

    const articlesSearchParams = new URLSearchParams({
      locale: defaultLocale,
      'fields[0]': 'title',
      'fields[1]': 'description',
      'fields[2]': 'slug',
      'populate[0]': 'image',
      'populate[1]': 'category',
      'filters[documentId][$ne]': category?.mainArticle?.documentId || '',
      'filters[category][$eq]': category?.id || '',
      'pagination[page]': page.toString(),
      'pagination[pageSize]': PAGE_SIZE.toString(),
      sort: 'publishedAt:desc',
      status: isProduction ? '' : 'draft',
    })

    const articlesResponse = await cmsClient<{
      data: ArticleItemType[]
      meta: { pagination: { pageCount: number } }
    }>(`/api/articles?${articlesSearchParams}`)

    const { data: articles, meta } = articlesResponse

    return {
      title: category.title,
      description: category.description,
      mainArticle: category.mainArticle,
      additionalContent: category.htmlContent,
      image: category.image,
      articles,
      pageCount: meta.pagination.pageCount,
      questions: category.questions,
      faqDescription: category.faqDescription,
    }
  } catch (error) {
    console.error('Error:', error)
    captureException(error)
    return undefined
  }
}
