import { cmsClient } from '@/adapters/cms'
import type { CategoryType } from '@/types/blog'
import axios from 'axios'

const isProduction = process.env.NODE_ENV === 'production'

export async function fetchCategories(): Promise<CategoryType[]> {
  try {
    const categoriesResponse = await cmsClient.get(`/api/categories`, {
      params: {
        locale: 'fr',
        sort: ['order'],
        status: isProduction ? '' : 'draft',
      },
    })

    if (!categoriesResponse?.data?.data) {
      console.error('Error: categoriesResponse?.data?.data is undefined')
      return []
    }

    return categoriesResponse.data.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle specific HTTP errors
      console.error('API Error:', error.response?.status, error.response?.data)
    } else {
      // Handle other errors
      console.error('Error:', error)
    }
    return []
  }
}
