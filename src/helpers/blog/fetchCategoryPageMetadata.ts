import type { HomepageMetadataType } from '@/types/blog'
import axios from 'axios'

const isProduction = process.env.NEXT_PUBLIC_ENV === 'production'

export async function fetchCategoryPageMetadata({
  locale,
}: {
  locale: string
}): Promise<HomepageMetadataType> {
  try {
    const categoryResponse = await axios.get(
      `${process.env.CMS_URL}/api/category?locale=${locale}&populate[0]=image&fields[0]=metaTitle&fields[1]=metaDescription${
        isProduction ? '' : '&status=draft'
      }`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CMS_TOKEN}`,
        },
      }
    )

    return {
      metaTitle: categoryResponse.data.data.metaTitle,
      metaDescription: categoryResponse.data.data.metaDescription,
      image: categoryResponse.data.data.image,
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
