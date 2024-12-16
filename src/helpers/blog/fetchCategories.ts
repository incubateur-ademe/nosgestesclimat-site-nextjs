import type { CategoryType } from '@/types/blog'
import axios from 'axios'

const isProduction = process.env.NODE_ENV === 'production'

export async function fetchCategories(): Promise<CategoryType[]> {
  try {
    const categoriesResponse = await axios.get(
      `${process.env.CMS_URL}/api/categories?locale=fr&sort[0]=order${
        isProduction ? '' : '&status=draft'
      }`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CMS_TOKEN}`,
        },
      }
    )

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
