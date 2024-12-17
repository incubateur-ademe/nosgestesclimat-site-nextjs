import type { HomepageMetadataType } from '@/types/blog'
import axios from 'axios'

const isProduction = process.env.NEXT_PUBLIC_ENV === 'production'

export async function fetchCategoryPageMetadata({
  locale,
  slug,
}: {
  locale: string
  slug: string
}): Promise<HomepageMetadataType> {
  try {
    const categoryResponse = await axios.get(
      `${process.env.CMS_URL}/api/categories?locale=${locale}&populate[0]=image&populate[1]=pageMetadata&filters[slug][$eq]=${slug}${
        isProduction ? '' : '&status=draft'
      }`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CMS_TOKEN}`,
        },
      }
    )

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
