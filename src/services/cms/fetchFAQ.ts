import type { FAQType } from '@/adapters/cmsClient'
import { cmsClient } from '@/adapters/cmsClient'
import { getLocaleWithoutEs } from '@/helpers/language/getLocaleWithoutEs'
import { type Locale } from '@/i18nConfig'
import { captureException } from '@sentry/nextjs'

export async function fetchFaq({
  locale,
}: {
  locale: Locale
}): Promise<FAQType[] | null> {
  try {
    const faqSearchParams = new URLSearchParams({
      locale: getLocaleWithoutEs(locale),
      sort: 'order',
      populate: 'questions',
    })

    const faqResponse = await cmsClient<{ data: FAQType[] }>(
      `/api/faq-categories?${faqSearchParams}`
    )

    return faqResponse.data
  } catch (error) {
    captureException(error)

    return null
  }
}
