import { cmsClient } from '@/adapters/cms'
import type { ArticleType } from '@/types/blog'
import axios from 'axios'

const isProduction = process.env.NODE_ENV === 'production'

export async function fetchArticlePageContent({
  articleSlug,
}: {
  articleSlug: string
}): Promise<{
  article?: ArticleType
  otherArticles?: ArticleType[]
}> {
  try {
    const articleResponse = await cmsClient.get(`/api/articles`, {
      params: {
        locale: 'fr',
        filters: {
          slug: {
            $eq: articleSlug,
          },
        },
        populate: ['image', 'category', 'author'],
        status: isProduction ? '' : 'draft',
      },
    })

    console.log('articleResponse', articleResponse, articleResponse.data.data)

    if (!articleResponse.data.data?.[0]) {
      console.error(
        `Error: articleResponse.data.data?.[0] is undefined for articleSlug: ${articleSlug}`
      )
      return {}
    }

    const otherArticlesResponse = await cmsClient.get(`/api/articles`, {
      params: {
        locale: 'fr',
        filters: {
          category: {
            slug: {
              $eq: articleResponse.data.data?.[0]?.category?.slug,
            },
          },
        },
        sort: 'publishedAt:desc',
      },
    })

    return {
      article: articleResponse.data.data?.[0],
      otherArticles: otherArticlesResponse?.data?.data ?? [],
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle specific HTTP errors
      console.error('API Error:', error.response?.status, error.response?.data)
    } else {
      // Handle other errors
      console.error('Error:', error)
    }
    return {}
  }
}
