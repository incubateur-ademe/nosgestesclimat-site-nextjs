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
      `${process.env.CMS_URL}/api/home-page?locale=${locale}&populate[0]=metaImage&fields[0]=metaTitle&fields[1]=metaDescription${
        isProduction ? '' : '&status=draft'
      }`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CMS_TOKEN}`,
        },
      }
    )

    return {
      metaTitle: homepageResponse.data.data.metaTitle,
      metaDescription: homepageResponse.data.data.metaDescription,
      metaImage: homepageResponse.data.data.metaImage,
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
      metaImage: {
        url: '',
        alternativeText: '',
      },
    }
  }
}
