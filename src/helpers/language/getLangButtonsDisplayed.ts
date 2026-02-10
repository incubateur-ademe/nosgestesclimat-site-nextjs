'use server'

import { fetchArticlePageContent } from '@/services/cms/fetchArticlePageContent'
import { fetchCategoryPageContent } from '@/services/cms/fetchCategoryPageContent'

export interface LangButtonsConfigType {
  fr: boolean
  en: boolean
}

interface Props {
  category?: string
  article?: string
  landingPageSlug?: string
}

const ALL_TRUE_VALUE = {
  fr: true,
  en: true,
}
const ALL_FALSE_VALUE = {
  fr: false,
  en: false,
}

export async function getLangButtonsDisplayed({
  category,
  article,
  landingPageSlug,
}: Props = {}) {
  // Thematic landing pages aren't translated
  if (landingPageSlug) {
    return ALL_FALSE_VALUE
  }

  // Article page
  if (category && article) {
    const result = await fetchArticlePageContent({
      articleSlug: article,
      categorySlug: category,
      locale: 'en',
    })

    return result?.article ? ALL_TRUE_VALUE : ALL_FALSE_VALUE
  }

  // Category page
  if (category) {
    const result = await fetchCategoryPageContent({
      slug: category,
      locale: 'en',
      page: 1,
    })

    return result?.title && result?.description
      ? ALL_TRUE_VALUE
      : ALL_FALSE_VALUE
  }

  return ALL_TRUE_VALUE
}
