import { cmsFetch } from '@/adapters/cmsFetch'
import type { HomepageMetadataType } from '@/types/blog'
import { captureException } from '@sentry/nextjs'

const isProduction = process.env.NEXT_PUBLIC_ENV === 'production'

export async function fetchHomepageMetadata(): Promise<
  HomepageMetadataType | undefined
> {
  try {
    const searchParams = new URLSearchParams({
      locale: 'fr',
      'populate[0]': 'image',
      'populate[1]': 'pageMetadata',
      status: isProduction ? '' : 'draft',
    })

    const homepageResponse = await cmsFetch(`/api/home-page?${searchParams}`)

    if (!homepageResponse?.data) {
      console.error('Error: homepageResponse?.data is undefined')
      return undefined
    }

    const { pageMetadata, image } = homepageResponse.data

    return {
      metaTitle: pageMetadata.title,
      metaDescription: pageMetadata.description,
      image: image,
    }
  } catch (error) {
    console.error('Error:', error)
    captureException(error)

    return undefined
  }
}
