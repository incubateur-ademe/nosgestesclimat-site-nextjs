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
        status: isProduction ? undefined : 'draft',
      },
    })

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
      },
    })

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
