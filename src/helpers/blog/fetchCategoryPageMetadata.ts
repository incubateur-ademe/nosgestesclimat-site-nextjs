import { cmsClient } from '@/adapters/cms'
import type { HomepageMetadataType } from '@/types/blog'
import axios from 'axios'

const isProduction = process.env.NEXT_PUBLIC_ENV === 'production'

export async function fetchCategoryPageMetadata({
  slug,
}: {
  slug: string
}): Promise<HomepageMetadataType | undefined> {
  try {
    const categoryResponse = await cmsClient.get(`/api/categories`, {
      params: {
        locale: 'fr',
        populate: ['image', 'pageMetadata'],
        'filters[slug][$eq]': slug,
        status: isProduction ? '' : 'draft',
      },
    })

    if (!categoryResponse?.data?.data?.[0]) {
      return undefined
    }

    return {
      metaTitle: categoryResponse.data.data[0].pageMetadata?.title,
      metaDescription: categoryResponse.data.data[0].pageMetadata?.description,
      image: categoryResponse.data.data[0].image,
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle specific HTTP errors
      console.error('API Error:', error.response?.status, error.response?.data)
    } else {
      // Handle other errors
      console.error('Error:', error)
    }
    return undefined
  }
}
