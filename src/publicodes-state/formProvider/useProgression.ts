import { useMemo } from 'react'

type Props = {
  missingVariables: Record<string, number>
  everyQuestions: string[]
  everyInactiveRules: string[]
  categories: string[]
  relevantQuestions: string[]
  questionsByCategories: Record<string, string[]>
}

export default function useProgression({
  missingVariables,
  everyQuestions,
  everyInactiveRules,
  relevantQuestions,
  questionsByCategories,
  categories,
}: Props) {
  const missingInputs = useMemo<string[]>(
    () =>
      Object.keys(missingVariables).filter(
        (missingInput: string) =>
          everyQuestions.includes(missingInput) &&
          !everyInactiveRules.includes(missingInput)
      ),
    [missingVariables, everyQuestions, everyInactiveRules]
  )

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

  const remainingQuestionsByCategories = useMemo<Record<string, string[]>>(
    () =>
      categories.reduce(
        (accumulator: Record<string, string[]>, currentValue: string) => ({
          ...accumulator,
          [currentValue]: remainingQuestions.filter((question) =>
            question.includes(currentValue)
          ),
        }),
        {}
      ),
    [remainingQuestions, categories]
  )

  const answeredQuestionsByCategories = useMemo<Record<string, string[]>>(
    () =>
      categories.reduce(
        (accumulator: Record<string, string[]>, currentValue: string) => ({
          ...accumulator,
          [currentValue]: answeredQuestions.filter((question) =>
            question.includes(currentValue)
          ),
        }),
        {}
      ),
    [answeredQuestions, categories]
  )

  const progressionByCategory = useMemo<Record<string, number>>(
    () =>
      categories.reduce(
        (accumulator: Record<string, number>, currentValue: string) => ({
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
