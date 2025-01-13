import type {
  ArticleItemType,
  MetaType,
  PopulatedArticleType,
  PopulatedHomePageType,
} from '@/adapters/cmsClient'
import { cmsClient } from '@/adapters/cmsClient'
import { captureException } from '@sentry/nextjs'

const PAGE_SIZE = 12

const isProduction = process.env.NEXT_PUBLIC_ENV === 'production'

export async function fetchHomepageContent({
  page,
  locale,
}: {
  page: number
  locale: string
}): Promise<
  | (Partial<PopulatedHomePageType<'image'>> & {
      pageCount: number
      mainArticle: PopulatedArticleType<'image' | 'category'>
      articles: ArticleItemType[]
    })
  | undefined
> {
  try {
    const homepageSearchParams = new URLSearchParams({
      locale,
      'populate[0]': 'image',
      'populate[1]': 'mainArticle',
      'populate[2]': 'mainArticle.image',
      'populate[3]': 'mainArticle.category',
      status: isProduction ? '' : 'draft',
    })

    const homepageResponse = await cmsClient<{
      data: PopulatedHomePageType<'image'> & {
        mainArticle: PopulatedArticleType<'image' | 'category'>
      }
    }>(`/api/home-page?${homepageSearchParams}`)
    console.log('homepageresponse', homepageResponse)
    if (!homepageResponse?.data) {
      console.error('Error: homepageResponse?.data is undefined')
      return undefined
    }

    const { mainArticle, image, title, description } = homepageResponse.data

    const articlesSearchParams: Record<string, string> = {
      locale,
      'fields[0]': 'title',
      'fields[1]': 'description',
      'fields[2]': 'slug',
      'populate[0]': 'image',
      'populate[1]': 'category',
      'pagination[page]': page.toString(),
      'pagination[pageSize]': PAGE_SIZE.toString(),
      sort: 'publishedAt:desc',
      status: isProduction ? '' : 'draft',
    }

    if (mainArticle) {
      articlesSearchParams['filters[id][$ne]'] = mainArticle.id
    }

    const articlesResponse = await cmsClient<{
      data: ArticleItemType[]
      meta: MetaType
    }>(`/api/articles?${new URLSearchParams(articlesSearchParams)}`)

    const { data, meta } = articlesResponse

    return {
      title,
      description,
      image,
      mainArticle,
      articles: data ?? [],
      pageCount: meta?.pagination?.pageCount ?? 0,
    }
  } catch (error) {
    console.error('Error:', error)
    captureException(error)

    return undefined
  }
}
