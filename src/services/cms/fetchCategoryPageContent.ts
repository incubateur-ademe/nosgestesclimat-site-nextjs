import {
  cmsClient,
  type ArticleType,
  type CategoryType,
  type ImageType,
  type PopulatedCategoryType,
} from '@/adapters/cmsClient'
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
      PopulatedCategoryType<'mainArticle' | 'questions' | 'articles' | 'image'>
    > & {
      pageCount: number
    })
  | undefined
> {
  try {
    const categorySearchParams = new URLSearchParams({
      locale: 'fr',
      'filters[slug][$eq]': slug,
      'populate[0]': 'mainArticle',
      'populate[1]': 'questions',
      'populate[2]': 'mainArticle.image',
      'populate[3]': 'mainArticle.category',
      sort: 'questions.order:asc',
      status: isProduction ? '' : 'draft',
    })

    const categoryResponse = await cmsClient<{
      data: CategoryType[]
      image: ImageType
    }>(`/api/categories?${categorySearchParams}`)

    if (!categoryResponse?.data?.[0]) {
      console.error('Error: categoryResponse?.data?.[0] is undefined')
      return undefined
    }

    const { data, image } = categoryResponse

    const categoryData = data[0]

    const articlesSearchParams = new URLSearchParams({
      locale: 'fr',
      'fields[0]': 'title',
      'fields[1]': 'description',
      'fields[2]': 'slug',
      'populate[0]': 'image',
      'populate[1]': 'category',
      'filters[documentId][$ne]': categoryData?.mainArticle?.documentId || '',
      'filters[category][$eq]': categoryData?.id || '',
      'pagination[page]': page.toString(),
      'pagination[pageSize]': PAGE_SIZE.toString(),
      sort: 'publishedAt:desc',
      status: isProduction ? '' : 'draft',
    })

    const articlesResponse = await cmsClient<{
      data: ArticleType[]
      meta: { pagination: { pageCount: number } }
    }>(`/api/articles?${articlesSearchParams}`)

    const { data: articlesData, meta } = articlesResponse

    return {
      title: categoryData.title,
      description: categoryData.description,
      mainArticle: categoryData.mainArticle,
      additionalContent: categoryData.htmlContent,
      image,
      articles: articlesData,
      pageCount: meta.pagination.pageCount,
      questions: categoryData.questions,
      faqDescription: categoryData.faqDescription,
    }
  } catch (error) {
    console.error('Error:', error)
    captureException(error)
    return undefined
  }
}
