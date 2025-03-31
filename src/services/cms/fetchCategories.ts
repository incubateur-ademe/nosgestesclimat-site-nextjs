import type { CategoryType } from '@/adapters/cmsClient'
import { cmsClient } from '@/adapters/cmsClient'
import i18nConfig from '@/i18nConfig'
import { captureException } from '@sentry/nextjs'

export async function fetchCategories(): Promise<CategoryType[]> {
  try {
    const categoriesSearchParams = new URLSearchParams({
      locale: i18nConfig.defaultLocale,
      sort: 'order',
    })

    const categoriesResponse = await cmsClient<{ data: CategoryType[] }>(
      `/api/categories?${categoriesSearchParams}`
    )

    return categoriesResponse.data
  } catch (error) {
    console.error('Error:', error)
    captureException(error)

    return []
  }
}
