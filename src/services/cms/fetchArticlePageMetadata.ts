import type { ImageType, PopulatedArticleType } from '@/adapters/cmsClient'
import { cmsClient } from '@/adapters/cmsClient'
import { captureException } from '@sentry/nextjs'

const isProduction = process.env.NEXT_PUBLIC_ENV === 'production'

export async function fetchArticlePageMetadata({
  articleSlug,
  locale,
}: {
  articleSlug: string
  locale: string
}): Promise<
  | {
      metaTitle: string
      metaDescription: string
      image: ImageType | null
    }
  | undefined
> {
  try {
    const articleSearchParams = new URLSearchParams({
      locale,
      'populate[0]': 'image',
      'populate[1]': 'pageMetadata',
      'filters[slug][$eq]': articleSlug,
      status: isProduction ? '' : 'draft',
    })

    const articleResponse = await cmsClient<{
      data: [PopulatedArticleType<'image' | 'pageMetadata'>]
    }>(`/api/articles?${articleSearchParams}`)

    if (articleResponse?.data?.length !== 1) {
      console.error(
        `Error: fetch article error for articleSlug: ${articleSlug}`
      )
      return
    }

    const {
      data: [article],
    } = articleResponse

    return {
      metaTitle: article.pageMetadata.title,
      metaDescription: article.pageMetadata.description ?? '',
      image: article.image,
    }
  } catch (error) {
    console.error('Error:', error)
    captureException(error)

    return
  }
}
