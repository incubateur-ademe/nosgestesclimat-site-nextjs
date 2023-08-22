import { useState, useEffect, useMemo } from 'react'

type Props = {
  engine: any
  situation: any
  remainingQuestions: any[]
  categories: string[]
}

export default function useCurrent({ remainingQuestions, categories }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState<null | any>(null)
  useEffect(() => {
    if (!currentQuestion) {
      setCurrentQuestion(remainingQuestions[0])
    }
  }, [currentQuestion, remainingQuestions])

  const currentCategory = useMemo(
    () =>
      currentQuestion
        ? categories.find(
            (category) => category === currentQuestion.split(' . ')[0]
          )
        : null,
    [categories, currentQuestion]
  )

  return {
    currentQuestion,
    currentCategory,
    setCurrentQuestion,
  }
}
