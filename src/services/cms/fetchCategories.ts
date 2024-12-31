import { cmsClient, type CategoryType } from '@/adapters/cmsClient'
import { captureException } from '@sentry/nextjs'

const isProduction = process.env.NODE_ENV === 'production'

export async function fetchCategories(): Promise<CategoryType[]> {
  try {
    const categoriesSearchParams = new URLSearchParams({
      locale: 'fr',
      sort: 'order',
      status: isProduction ? '' : 'draft',
    })

    const categoriesResponse = await cmsClient<{ data: CategoryType[] }>(
      `/api/categories?${categoriesSearchParams}`
    )

    if (!categoriesResponse?.data) {
      console.error('Error: categoriesResponse?.data is undefined')
      return []
    }

    return categoriesResponse.data
  } catch (error) {
    console.error('Error:', error)
    captureException(error)

    return []
  }
}
