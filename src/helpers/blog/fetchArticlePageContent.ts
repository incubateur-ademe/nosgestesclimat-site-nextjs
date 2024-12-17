import { cmsClient } from '@/adapters/cms'
import type { ArticleType } from '@/types/blog'
import axios from 'axios'

const isProduction = process.env.NODE_ENV === 'production'

export async function fetchArticlePageContent({
  articleSlug,
  locale,
}: {
  articleSlug: string
  locale: string
}): Promise<{
  article?: ArticleType
  otherArticles?: ArticleType[]
}> {
  try {
    const articleResponse = await cmsClient.get(
      `/api/articles?locale=${locale}&filters[slug][$eq]=${articleSlug}&populate[0]=image&populate[1]=category&populate[2]=author${
        isProduction ? '' : '&status=draft'
      }`
    )
    // console.log(articleResponse.data, articleSlug)

    const otherArticlesResponse = await axios.get(
      `${process.env.CMS_URL}/api/articles?locale=${locale}&filters[category][slug][$eq]=${articleResponse.data.data?.[0].category.slug}&filters[slug][$ne]=${articleSlug}&populate[0]=image&populate[1]=category&populate[2]=author&pagination[limit]=3${
        isProduction ? '' : '&status=draft'
      }`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CMS_TOKEN}`,
        },
      }
    )

    return {
      article: articleResponse.data.data?.[0],
      otherArticles: otherArticlesResponse.data.data,
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
      article: undefined,
      otherArticles: undefined,
    }
  }
}
