import { cmsClient } from '@/adapters/cms'
import type { HomepageMetadataType } from '@/types/blog'
import axios from 'axios'

const isProduction = process.env.NEXT_PUBLIC_ENV === 'production'

export async function fetchHomepageMetadata(): Promise<
  HomepageMetadataType | undefined
> {
  try {
    const homepageResponse = await cmsClient.get(`/api/home-page`, {
      params: {
        locale: 'fr',
        populate: ['image', 'pageMetadata'],
        status: isProduction ? '' : 'draft',
      },
    })

    if (!homepageResponse?.data?.data) {
      return undefined
    }

    return {
      metaTitle: homepageResponse.data.data.pageMetadata.title,
      metaDescription: homepageResponse.data.data.pageMetadata.description,
      image: homepageResponse.data.data.image,
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
