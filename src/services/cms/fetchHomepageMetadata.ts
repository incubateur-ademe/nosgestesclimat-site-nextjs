import type { ImageType, PopulatedHomePageType } from '@/adapters/cmsClient'
import { cmsClient } from '@/adapters/cmsClient'
import { type Locale } from '@/i18nConfig'
import { captureException } from '@sentry/nextjs'

export async function fetchHomepageMetadata({
  locale,
}: {
  locale: Locale
}): Promise<
  | {
      metaTitle: string
      metaDescription?: string | null
      image?: ImageType | null
    }
  | undefined
> {
  try {
    const searchParams = new URLSearchParams({
      locale,
      'populate[0]': 'image',
      'populate[1]': 'pageMetadata',
    })

    const homepageResponse = await cmsClient<{
      data: PopulatedHomePageType<'image' | 'pageMetadata'>
    }>(`/api/home-page?${searchParams}`)

    if (!homepageResponse?.data) {
      console.error('Error: homepageResponse?.data is undefined')
      return
    }

    const { pageMetadata, image } = homepageResponse.data

    return {
      metaTitle: pageMetadata.title,
      metaDescription: pageMetadata.description,
      image: image,
    }
  } catch (error) {
    captureException(error)

    return
  }
}
