import { useMemo } from 'react'

type Props = {
  categories: string[]
  questionsByCategories: {
    [key: string]: string[]
  }
  currentQuestion: string
  currentCategory: string
  setCurrentQuestion: any
  setCurrentCategory: any
}

export default function useNavigation({
  categories,
  questionsByCategories,
  currentQuestion,
  currentCategory,
  setCurrentQuestion,
  setCurrentCategory,
}: Props) {
  const currentQuestionIndex = useMemo(
    () => questionsByCategories[currentCategory]?.indexOf(currentQuestion),
    [questionsByCategories, currentQuestion, currentCategory]
  )

  const currentCategoryIndex = useMemo(
    () => categories?.indexOf(currentCategory),
    [categories, currentCategory]
  )

  const noPrevQuestion = useMemo(
    () => currentQuestionIndex === 0,
    [currentQuestionIndex]
  )
  const noNextQuestion = useMemo(
    () =>
      currentQuestionIndex ===
      questionsByCategories[currentCategory]?.length - 1,
    [questionsByCategories, currentQuestionIndex, currentCategory]
  )

  const noPrevCategory = useMemo(
    () => currentCategoryIndex === 0,
    [currentCategoryIndex]
  )
  const noNextCategory = useMemo(
    () => currentCategoryIndex === categories.length - 1,
    [currentCategoryIndex, categories]
  )

  const gotoPrevQuestion = () => {
    if (noPrevQuestion) return

    const newCurrentQuestion =
      questionsByCategories[currentCategory][currentQuestionIndex - 1]

    setCurrentQuestion(newCurrentQuestion)
    return newCurrentQuestion
  }
  const gotoNextQuestion = () => {
    if (noNextQuestion) return

    const newCurrentQuestion =
      questionsByCategories[currentCategory][currentQuestionIndex + 1]

    setCurrentQuestion(newCurrentQuestion)
    return newCurrentQuestion
  }

  const gotoPrevCategory = () => {
    if (noPrevCategory) return

    const newCurrentCategory = categories[currentCategoryIndex - 1]
    const newCurrentQuestion =
      questionsByCategories[newCurrentCategory][
        questionsByCategories[newCurrentCategory].length - 1
      ]

    setCurrentCategory(newCurrentCategory)
    setCurrentQuestion(newCurrentQuestion)

    return newCurrentCategory
  }
  const gotoNextCategory = () => {
    if (noNextCategory) return

    const newCurrentCategory = categories[currentCategoryIndex + 1]

    setCurrentCategory(newCurrentCategory)
    setCurrentQuestion(null)

    return newCurrentCategory
  }

  return {
    gotoPrevQuestion,
    gotoNextQuestion,
    gotoPrevCategory,
    gotoNextCategory,
    noPrevQuestion,
    noNextQuestion,
    noPrevCategory,
    noNextCategory,
  }
}
