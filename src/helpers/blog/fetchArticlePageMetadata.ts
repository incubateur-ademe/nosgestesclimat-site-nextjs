import type { HomepageMetadataType } from '@/types/blog'
import axios from 'axios'

const isProduction = process.env.NEXT_PUBLIC_ENV === 'production'

export async function fetchArticlePageMetadata({
  locale,
  articleSlug,
}: {
  locale: string
  articleSlug: string
}): Promise<HomepageMetadataType> {
  try {
    const articleResponse = await axios.get(
      `${process.env.CMS_URL}/api/articles?locale=${locale}&filters[slug][$eq]=${articleSlug}&populate[0]=image${
        isProduction ? '' : '&status=draft'
      }`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CMS_TOKEN}`,
        },
      }
    )
    console.log(articleResponse.data)
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
