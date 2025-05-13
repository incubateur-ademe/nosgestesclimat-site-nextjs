import { t } from '@/helpers/metadata/fakeMetadataT'
import { useEffect } from 'react'

export function useUpdatePageTitle({
  category,
  countCategoryQuestions,
  currentQuestionIndex,
}: {
  category: string
  countCategoryQuestions: number
  currentQuestionIndex: number
}) {
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      document.title = t(
        'Calculateur d’empreinte carbone et eau - Nos Gestes Climat'
      )
    }
  }, [])

  // Update the page title when the question changes
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      document.title = t(
        `Calculateur, question ${currentQuestionIndex} sur ${countCategoryQuestions} de la catégorie ${category} - Nos Gestes Climat`
      )
    }
  }, [category, currentQuestionIndex, countCategoryQuestions])
}
