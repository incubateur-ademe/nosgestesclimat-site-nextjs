import { useMemo } from 'react'

type Props = {
  missingInputs: string[]
  categories: string[]
  relevantQuestions: string[]
  questionsByCategories: {
    [key: string]: string[]
  }
}

export default function useProgression({
  missingInputs,
  relevantQuestions,
  questionsByCategories,
  categories,
}: Props) {
  const remainingQuestions: string[] = useMemo(
    () =>
      relevantQuestions.filter((question) =>
        missingInputs.find((missingInput) => missingInput.includes(question))
      ),
    [relevantQuestions, missingInputs]
  )

  const progression = useMemo(
    () =>
      relevantQuestions.length
        ? (relevantQuestions.length - remainingQuestions.length) /
          relevantQuestions.length
        : 0,
    [relevantQuestions, remainingQuestions]
  )

  const remainingQuestionsByCategories = useMemo(
    () =>
      categories.reduce(
        (accumulator: object, currentValue: string) => ({
          ...accumulator,
          [currentValue]: remainingQuestions.filter((question) =>
            question.includes(currentValue)
          ),
        }),
        {}
      ),
    [remainingQuestions, categories]
  )

  const progressionByCategory = useMemo(
    () =>
      categories.reduce(
        (accumulator: object, currentValue: string) => ({
          ...accumulator,
          [currentValue]: questionsByCategories[currentValue].length
            ? (questionsByCategories[currentValue].length -
                remainingQuestionsByCategories[currentValue].length) /
              questionsByCategories[currentValue].length
            : 0,
        }),
        {}
      ),
    [questionsByCategories, remainingQuestionsByCategories, categories]
  )

  return {
    remainingQuestions,
    progression,
    remainingQuestionsByCategories,
    progressionByCategory,
  }
}
