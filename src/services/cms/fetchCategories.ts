import type { CategoryType } from '@/adapters/cmsClient'
import { cmsClient } from '@/adapters/cmsClient'
import { getLocaleWithoutEs } from '@/helpers/language/getLocaleWithoutEs'
import { type Locale } from '@/i18nConfig'
import { captureException } from '@sentry/nextjs'

export async function fetchCategories({
  locale,
}: {
  locale: Locale
}): Promise<CategoryType[]> {
  try {
    const categoriesSearchParams = new URLSearchParams({
      locale: getLocaleWithoutEs(locale),
      sort: 'order',
    })

    const categoriesResponse = await cmsClient<{ data: CategoryType[] }>(
      `/api/categories?${categoriesSearchParams}`
    )

    return categoriesResponse.data
  } catch (error) {
    captureException(error)

    return []
  }
}
