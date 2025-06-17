import type { ImageType, PopulatedCategoryType } from '@/adapters/cmsClient'
import { cmsClient } from '@/adapters/cmsClient'
import { getLocaleWithoutEs } from '@/helpers/language/getLocaleWithoutEs'
import { type Locale } from '@/i18nConfig'
import { captureException } from '@sentry/nextjs'

export async function fetchCategoryPageMetadata({
  slug,
  locale,
}: {
  slug: string
  locale: Locale
}): Promise<
  | {
      metaTitle: string
      metaDescription: string
      image: ImageType | null
    }
  | undefined
> {
  try {
    const categorySearchParams = new URLSearchParams({
      locale: getLocaleWithoutEs(locale),
      'populate[0]': 'image',
      'populate[1]': 'pageMetadata',
      'filters[slug][$eq]': slug,
    })

    const categoryResponse = await cmsClient<{
      data: [PopulatedCategoryType<'image' | 'pageMetadata'>]
    }>(`/api/categories?${categorySearchParams}`)

    if (categoryResponse?.data.length !== 1) {
      console.error(`Error: fetch category error for categorySlug: ${slug}`)
      return
    }

    const {
      data: [category],
    } = categoryResponse

    return {
      metaTitle: category.pageMetadata.title,
      metaDescription: category.pageMetadata.description ?? '',
      image: category.image,
    }
  } catch (error) {
    captureException(error)

    return
  }
}
