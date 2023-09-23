import { useCallback, useState } from 'react'

export default function useCurrent() {
  const [currentQuestion, setCurrentQuestion] = useState<null | string>(null)

  const [currentCategory, setCurrentCategory] = useState<null | string>(null)

  const exportedSetCurrentQuestion = useCallback(
    (newCurrentQuestion: string | null) => {
      setCurrentQuestion(newCurrentQuestion)
      if (newCurrentQuestion)
        setCurrentCategory(newCurrentQuestion.split(' . ')[0])
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
