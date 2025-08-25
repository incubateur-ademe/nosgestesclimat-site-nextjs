import type { ImageType, PopulatedBlogCategoryType } from '@/adapters/cmsClient'
import { cmsClient } from '@/adapters/cmsClient'
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
      locale,
      'populate[0]': 'image',
      'populate[1]': 'pageMetadata',
      'filters[slug][$eq]': slug,
    })

    const categoryResponse = await cmsClient<{
      data: [PopulatedBlogCategoryType<'image' | 'pageMetadata'>]
    }>(`/api/blog-categories?${categorySearchParams}`)

    if (categoryResponse?.data.length !== 1) {
      console.error(`Error: fetch blogCategory error for categorySlug: ${slug}`)
      return
    }

    const {
      data: [blogCategory],
    } = categoryResponse

    return {
      metaTitle: blogCategory.pageMetadata.title,
      metaDescription: blogCategory.pageMetadata.description ?? '',
      image: blogCategory.image,
    }
  } catch (error) {
    captureException(error)

    return
  }
}
