import {
  cmsClient,
  type ArticleType,
  type HomepageMetadataType,
  type ImageType,
} from '@/adapters/cmsClient'
import { captureException } from '@sentry/nextjs'

const isProduction = process.env.NEXT_PUBLIC_ENV === 'production'

export async function fetchArticlePageMetadata({
  articleSlug,
}: {
  articleSlug: string
}): Promise<HomepageMetadataType | undefined> {
  try {
    const articleSearchParams = new URLSearchParams({
      locale: 'fr',
      'populate[0]': 'image',
      'populate[1]': 'pageMetadata',
      'filters[slug][$eq]': articleSlug,
      status: isProduction ? '' : 'draft',
    })

    const articleResponse = await cmsClient<{
      data: ArticleType[]
      image: ImageType
    }>(`/api/articles?${articleSearchParams}`)

    if (!articleResponse?.data?.[0]) {
      console.error('Error: articleResponse?.data?.[0] is undefined')
      return
    }

    const { data, image } = articleResponse

    return {
      metaTitle: data[0].pageMetadata?.title,
      metaDescription: data[0].pageMetadata?.description,
      image,
    }
  } catch (error) {
    console.error('Error:', error)
    captureException(error)

    return
  }
}
