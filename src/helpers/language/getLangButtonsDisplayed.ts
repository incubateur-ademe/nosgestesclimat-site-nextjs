import { fetchArticlePageContent } from '@/services/cms/fetchArticlePageContent'
import { fetchCategoryPageContent } from '@/services/cms/fetchCategoryPageContent'

export type LangButtonsConfigType = {
  fr: boolean
  en: boolean
  es: boolean
}

type Props = {
  category?: string
  article?: string
}

const getAllTrueOrFalseValue = (value: boolean): LangButtonsConfigType => ({
  fr: value,
  en: value,
  es: value,
})

const ALL_FALSE_VALUE = getAllTrueOrFalseValue(false)
const FR_EN_ACTIVATED_VALUE = {
  fr: true,
  en: true,
  es: false,
}

export async function getLangButtonsDisplayed({
  category,
  article,
}: Props = {}) {
  // Blog landing page - no es version
  if (!category && !article) {
    return FR_EN_ACTIVATED_VALUE
  }

  if (category && !article) {
    const result = await fetchCategoryPageContent({
      slug: category,
      locale: 'en',
      page: 1,
    })

    // Si le contenu n'existe pas en anglais, on ne montre pas les boutons de langue
    if (!result || !result?.title || !result?.description) {
      return ALL_FALSE_VALUE
    }
  }

  // Si nous sommes sur une page d'article
  if (category && article) {
    const result = await fetchArticlePageContent({
      articleSlug: article,
      locale: 'en',
    })

    // Si le contenu n'existe pas en anglais, on ne montre pas les boutons de langue
    if (!result || !result?.article) {
      return ALL_FALSE_VALUE
    }
  }

  return FR_EN_ACTIVATED_VALUE
}
