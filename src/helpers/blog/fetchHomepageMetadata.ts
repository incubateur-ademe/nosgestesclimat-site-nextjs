import type { HomepageMetadataType } from '@/types/blog'
import axios from 'axios'

const isProduction = process.env.NEXT_PUBLIC_ENV === 'production'

export async function fetchHomepageMetadata({
  locale,
}: {
  locale: string
}): Promise<HomepageMetadataType> {
  try {
    const homepageResponse = await axios.get(
      `${process.env.CMS_URL}/api/home-page?locale=${locale}&populate[0]=image&populate[1]=pageMetadata${
        isProduction ? '' : '&status=draft'
      }`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CMS_TOKEN}`,
        },
      }
    )

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
    return {
      metaTitle: '',
      metaDescription: '',
      image: {
        url: '',
        alternativeText: '',
      },
    }
  }
}
