import { cmsClient } from '@/adapters/cms'
import type { CategoryPageContentType } from '@/types/blog'
import axios from 'axios'

const PAGE_SIZE = 12
const isProduction = process.env.NODE_ENV === 'production'

export async function fetchCategoryPageContent({
  slug,
  page,
}: {
  slug: string
  page: number
}): Promise<CategoryPageContentType | undefined> {
  try {
    const categoryResponse = await cmsClient.get(`/api/categories`, {
      params: {
        locale: 'fr',
        'filters[slug][$eq]': slug,
        populate: [
          'mainArticle',
          'questions',
          'mainArticle.image',
          'mainArticle.category',
        ],
        status: isProduction ? '' : 'draft',
      },
    })

    if (!categoryResponse?.data?.data?.[0]) {
      console.error('Error: categoryResponse?.data?.data?.[0] is undefined')
      return undefined
    }

    const articlesResponse = await cmsClient.get('/api/articles', {
      params: {
        locale: 'fr',
        fields: ['title', 'description', 'slug'],
        populate: ['image', 'category'],
        'filters[documentId][$ne]':
          categoryResponse.data.data[0]?.mainArticle?.documentId,
        'filters[category][$eq]': categoryResponse.data.data[0]?.id,
        pagination: {
          page,
          pageSize: PAGE_SIZE,
        },
        sort: 'publishedAt:desc',
        status: isProduction ? '' : 'draft',
      },
    })

    return {
      title: categoryResponse.data.data[0].title,
      description: categoryResponse.data.data[0].description,
      mainArticle: categoryResponse.data.data[0].mainArticle,
      additionalContent: categoryResponse.data.data[0].htmlContent,
      image: categoryResponse.data.data[0].image,
      articles: articlesResponse.data.data,
      pageCount: articlesResponse.data.meta.pagination.pageCount,
      questions: categoryResponse.data.data[0].questions,
      faqDescription: categoryResponse.data.data[0].faqDescription,
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
