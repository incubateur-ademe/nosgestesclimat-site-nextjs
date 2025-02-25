import type { CategoryType } from '@/adapters/cmsClient'
import { cmsClient } from '@/adapters/cmsClient'
import { defaultLocale } from '@/i18nConfig'
import { captureException } from '@sentry/nextjs'

const isProduction = process.env.NODE_ENV === 'production'

export async function fetchCategories(): Promise<CategoryType[]> {
  try {
    const categoriesSearchParams = new URLSearchParams({
      locale: defaultLocale,
      sort: 'order',
      ...(isProduction ? { status: 'published' } : { status: 'draft' }),
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
