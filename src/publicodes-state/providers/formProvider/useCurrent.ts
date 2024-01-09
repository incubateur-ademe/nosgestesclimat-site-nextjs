import getNamespace from '@/publicodes-state/helpers/getNamespace'
import { useCallback, useState } from 'react'

/**
 * Get and set current question and category.
 *
 * currentCategory could be inferred from current question. It is not deleted for now because it is used in the actions page
 */
export default function useCurrent() {
  const [currentQuestion, setCurrentQuestion] = useState<null | string>(null)

  const [currentCategory, setCurrentCategory] = useState<null | string>(null)

  const exportedSetCurrentQuestion = useCallback(
    (newCurrentQuestion: string | null) => {
      setCurrentQuestion(newCurrentQuestion)
      const newCurrentQuestionNamespace = getNamespace(newCurrentQuestion)
      if (newCurrentQuestion && newCurrentQuestionNamespace) {
        setCurrentCategory(newCurrentQuestionNamespace)
      }
    },
    [setCurrentQuestion, setCurrentCategory]
  )

  return {
    currentQuestion,
    currentCategory,
    setCurrentQuestion: exportedSetCurrentQuestion,
    setCurrentCategory,
  }
}
