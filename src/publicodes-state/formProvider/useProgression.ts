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
  const remainingCategories: string[] = useMemo(
    () =>
      categories.filter((category) =>
        missingInputs.find((missingInput) => missingInput.includes(category))
      ),
    [categories, missingInputs]
  )
  const answeredCategories: string[] = useMemo(
    () =>
      categories.filter(
        (category) =>
          !missingInputs.find((missingInput) => missingInput.includes(category))
      ),
    [categories, missingInputs]
  )

  const remainingQuestions: string[] = useMemo(
    () =>
      relevantQuestions.filter((question) =>
        missingInputs.find((missingInput) => missingInput.includes(question))
      ),
    [relevantQuestions, missingInputs]
  )
  const answeredQuestions: string[] = useMemo(
    () =>
      relevantQuestions.filter(
        (question) =>
          !missingInputs.find((missingInput) => missingInput.includes(question))
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

  const remainingQuestionsByCategories = useMemo<{ [key: string]: string[] }>(
    () =>
      categories.reduce(
        (accumulator: { [key: string]: string[] }, currentValue: string) => ({
          ...accumulator,
          [currentValue]: remainingQuestions.filter((question) =>
            question.includes(currentValue)
          ),
        }),
        {}
      ),
    [remainingQuestions, categories]
  )

  const answeredQuestionsByCategories = useMemo<{ [key: string]: string[] }>(
    () =>
      categories.reduce(
        (accumulator: { [key: string]: string[] }, currentValue: string) => ({
          ...accumulator,
          [currentValue]: answeredQuestions.filter((question) =>
            question.includes(currentValue)
          ),
        }),
        {}
      ),
    [answeredQuestions, categories]
  )

  const progressionByCategory = useMemo<{ [key: string]: number }>(
    () =>
      categories.reduce(
        (accumulator: { [key: string]: number }, currentValue: string) => ({
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
    remainingCategories,
    answeredCategories,
    remainingQuestions,
    answeredQuestions,
    progression,
    remainingQuestionsByCategories,
    answeredQuestionsByCategories,
    progressionByCategory,
  }
}
