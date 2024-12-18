import { cmsClient } from '@/adapters/cms'
import type { HomepageContentType } from '@/types/blog'
import axios from 'axios'

const PAGE_SIZE = 12

const isProduction = process.env.NEXT_PUBLIC_ENV === 'production'

export async function fetchHomepageContent({
  page,
}: {
  page: number
}): Promise<HomepageContentType | undefined> {
  try {
    const homepageResponse = await cmsClient.get(`/api/home-page`, {
      params: {
        locale: 'fr',
        populate: [
          'image',
          'mainArticle',
          'mainArticle.image',
          'mainArticle.category',
        ],
        status: isProduction ? '' : 'draft',
      },
    })

    if (!homepageResponse?.data?.data) {
      console.error('Error: homepageResponse?.data?.data is undefined')
      return undefined
    }

    const articlesResponse = await cmsClient.get(`/api/articles`, {
      params: {
        locale: 'fr',
        fields: ['title', 'description', 'slug'],
        populate: ['image', 'category'],
        'filters[id][$ne]': homepageResponse.data.data.mainArticle.id,
        pagination: {
          page,
          pageSize: PAGE_SIZE,
        },
        status: isProduction ? '' : 'draft',
      },
    })

    return {
      title: homepageResponse.data.data.title,
      description: homepageResponse.data.data.description,
      image: homepageResponse.data.data.image,
      mainArticle: homepageResponse.data.data.mainArticle,
      articles: articlesResponse?.data?.data ?? [],
      pageCount: articlesResponse?.data?.meta?.pagination?.pageCount ?? 0,
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
