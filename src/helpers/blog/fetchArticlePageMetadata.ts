import type { HomepageMetadataType } from '@/types/blog'
import axios from 'axios'

const isProduction = process.env.NEXT_PUBLIC_ENV === 'production'

export async function fetchArticlePageMetadata({
  locale,
}: {
  locale: string
}): Promise<HomepageMetadataType> {
  try {
    const articleResponse = await axios.get(
      `${process.env.CMS_URL}/api/article?locale=${locale}&populate[0]=image&fields[0]=metaTitle&fields[1]=metaDescription${
        isProduction ? '' : '&status=draft'
      }`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CMS_TOKEN}`,
        },
      }
    )

    return {
      metaTitle: articleResponse.data.data.metaTitle,
      metaDescription: articleResponse.data.data.metaDescription,
      image: articleResponse.data.data.image,
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
