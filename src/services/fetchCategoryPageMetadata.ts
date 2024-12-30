import { cmsFetch } from '@/adapters/cmsFetch'
import type { HomepageMetadataType } from '@/types/blog'
import { captureException } from '@sentry/nextjs'

const isProduction = process.env.NEXT_PUBLIC_ENV === 'production'

export async function fetchCategoryPageMetadata({
  slug,
}: {
  slug: string
}): Promise<HomepageMetadataType | undefined> {
  try {
    const categorySearchParams = new URLSearchParams({
      locale: 'fr',
      'populate[0]': 'image',
      'populate[1]': 'pageMetadata',
      'filters[slug][$eq]': slug,
      status: isProduction ? '' : 'draft',
    })

    const categoryResponse = await cmsFetch(
      `/api/categories?${categorySearchParams}`
    )

    if (!categoryResponse?.data[0]) {
      console.error('Error: categoryResponse?.data?.[0] is undefined')
      return undefined
    }

    const { data, image } = categoryResponse

    return {
      metaTitle: data[0].pageMetadata?.title,
      metaDescription: data[0].pageMetadata?.description,
      image,
    }
  } catch (error) {
    console.error('Error:', error)
    captureException(error)

    return undefined
  }
}
