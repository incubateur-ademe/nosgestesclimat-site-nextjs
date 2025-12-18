import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useMemo } from 'react'

import {
  MUST_ASK_QUESTIONS,
  MUST_NOT_ASK_QUESTIONS,
  NON_PRIORITY_QUESTIONS,
  PRIORITY_QUESTIONS,
} from '@/publicodes-state/constants/questions'
import getSortedQuestionsList from '@/publicodes-state/helpers/getSortedQuestionsList'
import type {
  Entries,
  MissingVariables,
  SafeEvaluate,
  Situation,
} from '../../../types'

interface Props {
  root: DottedName
  safeEvaluate: SafeEvaluate
  categories: DottedName[]
  subcategories: DottedName[]
  situation: Situation
  foldedSteps: DottedName[]
  everyQuestions: DottedName[]
  everyMosaicChildrenWithParent: Record<DottedName, DottedName[]>
  currentQuestion: DottedName | null
}

/**
 * This is were we get all the questions of the form in the correct order
 */
export default function useQuestions({
  root,
  safeEvaluate,
  categories,
  subcategories,
  situation,
  foldedSteps,
  everyQuestions,
  everyMosaicChildrenWithParent,
  currentQuestion,
}: Props) {
  const missingVariables = useMemo(
    () => {
      const tempMissingVariables = Object.fromEntries(
        (
          Object.entries(
            safeEvaluate(root)?.missingVariables || {}
          ) as Entries<MissingVariables>
        ).filter((missingVariable) =>
          everyQuestions.includes(missingVariable[0])
        )
      ) as MissingVariables

      // We take every mosaic parent to add it to the missing variables with the max score of its children
      ;(
        Object.entries(everyMosaicChildrenWithParent) as [
          DottedName,
          DottedName[],
        ][]
      ).forEach(([mosaicParent, mosaicChildren]) => {
        const isMosaicParentNotApplicable =
          safeEvaluate({
            'est non applicable': mosaicParent,
          })?.nodeValue === true
        if (isMosaicParentNotApplicable) {
          delete tempMissingVariables[mosaicParent]
          mosaicChildren.forEach((mosaicChild) => {
            delete tempMissingVariables[mosaicChild]
          })
        }
        const maxMissingVariableScoreInMosaic = Math.max(
          ...mosaicChildren.map((child) => {
            return tempMissingVariables[child] || 0
          })
        )
        if (
          !isNaN(maxMissingVariableScoreInMosaic) &&
          maxMissingVariableScoreInMosaic > 0
        ) {
          tempMissingVariables[mosaicParent] = maxMissingVariableScoreInMosaic
          mosaicChildren.forEach((mosaicChild) => {
            delete tempMissingVariables[mosaicChild]
          })
        }
      })

      // We artificially set the missing variables of the whiteList to a high value
      PRIORITY_QUESTIONS.forEach((dottedName) => {
        if (dottedName in tempMissingVariables) {
          tempMissingVariables[dottedName] += 100000
        }
      })

      // We artificially set the missing variables of the blackList to a negative value
      NON_PRIORITY_QUESTIONS.forEach((dottedName) => {
        if (dottedName in tempMissingVariables) {
          tempMissingVariables[dottedName] -= 1000
        }
      })

      // We artificially add some questions in the missing variables.
      MUST_ASK_QUESTIONS.forEach((dottedName) => {
        tempMissingVariables[dottedName] = 1
      })

      return tempMissingVariables
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [safeEvaluate, root, everyQuestions, situation]
  )

  const remainingQuestions = useMemo(() => {
    // We take every questions
    const questionsToSort = everyQuestions
      // We remove all that are in mosaics,
      .filter(
        (question) =>
          !Object.values(everyMosaicChildrenWithParent)
            .flat()
            .find((mosaic) => mosaic === question)
      )
      // all that are in folded steps
      .filter((question) => !foldedSteps.includes(question))
      // and all that are not missing
      .filter((question) =>
        Object.keys(missingVariables).find((missingVariable) =>
          missingVariable.includes(question)
        )
      )
      .filter((question) => !MUST_NOT_ASK_QUESTIONS.has(question))
    // then we sort them by category, subcategory and missing variables
    return getSortedQuestionsList({
      questions: questionsToSort,
      categories,
      subcategories,
      missingVariables,
    })
  }, [
    everyQuestions,
    everyMosaicChildrenWithParent,
    foldedSteps,
    missingVariables,
    categories,
    subcategories,
  ])

  const relevantAnsweredQuestions = useMemo(
    () =>
      foldedSteps.filter((foldedStep) => {
        // checks that there is still a question associated to the folded step
        if (!everyQuestions.includes(foldedStep)) {
          return false
        }
        return true
      }),
    [foldedSteps, everyQuestions]
  )

  const relevantQuestions = useMemo(() => {
    const unsortedRelevantQuestions = [
      /**
       * We add every answered questions to display and every not answered
       * questions to display to get every relevant questions
       */
      ...relevantAnsweredQuestions,
      ...remainingQuestions,
    ].filter((question) => !MUST_NOT_ASK_QUESTIONS.has(question))

    const currentQuestionIndex = currentQuestion
      ? unsortedRelevantQuestions.indexOf(currentQuestion)
      : -1

    if (currentQuestionIndex === -1) {
      return unsortedRelevantQuestions
    }

    const preCurrentQuestionList: DottedName[] =
      unsortedRelevantQuestions.slice(0, currentQuestionIndex + 1)

    const postCurrentQuestionList: DottedName[] = getSortedQuestionsList({
      questions: unsortedRelevantQuestions.slice(currentQuestionIndex + 1),
      categories,
      subcategories,
      missingVariables,
    })

    return [...preCurrentQuestionList, ...postCurrentQuestionList]
  }, [relevantAnsweredQuestions, remainingQuestions, currentQuestion])

  const questionsByCategories = useMemo(
    () =>
      categories.reduce(
        (accumulator, currentValue) => ({
          ...accumulator,
          [currentValue]: relevantQuestions.filter((question) =>
            question.includes(currentValue)
          ),
        }),
        {} as Record<DottedName, DottedName[]>
      ),
    [relevantQuestions, categories]
  )

  return {
    missingVariables,
    remainingQuestions,
    relevantAnsweredQuestions,
    relevantQuestions,
    questionsByCategories,
  }
}
