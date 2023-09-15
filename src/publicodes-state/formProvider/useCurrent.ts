import { useState } from 'react'

export default function useCurrent() {
  const [currentQuestion, setCurrentQuestion] = useState<null | string>(null)

  const [currentCategory, setCurrentCategory] = useState<null | string>(null)

  return {
    currentQuestion,
    currentCategory,
    setCurrentQuestion: (newCurrentQuestion: string | null) => {
      setCurrentQuestion(newCurrentQuestion)
      if (newCurrentQuestion)
        setCurrentCategory(newCurrentQuestion.split(' . ')[0])
    },
    setCurrentCategory,
  }
}
