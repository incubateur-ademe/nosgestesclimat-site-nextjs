import { cmsClient } from '@/adapters/cms'
import type { HomepageMetadataType } from '@/types/blog'
import axios from 'axios'

const isProduction = process.env.NEXT_PUBLIC_ENV === 'production'

export async function fetchArticlePageMetadata({
  articleSlug,
}: {
  articleSlug: string
}): Promise<HomepageMetadataType | undefined> {
  try {
    const articleResponse = await cmsClient.get(`/api/articles`, {
      params: {
        locale: 'fr',
        filters: {
          slug: {
            $eq: articleSlug,
          },
        },
        populate: ['image', 'pageMetadata'],
        status: isProduction ? '' : 'draft',
      },
    })

    if (!articleResponse?.data?.data) {
      console.error('Error: articleResponse?.data?.data is undefined')
      return undefined
    }

    return {
      metaTitle: articleResponse.data.data[0].pageMetadata.title,
      metaDescription: articleResponse.data.data[0].pageMetadata.description,
      image: articleResponse.data.data[0].image,
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
