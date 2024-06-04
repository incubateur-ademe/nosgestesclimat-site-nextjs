import { DottedName as NGCDottedName } from '@incubateur-ademe/nosgestesclimat'
import { PublicodesExpression } from 'publicodes'
import { useMemo } from 'react'
import getIsMissing from '../../helpers/getIsMissing'

import getSortedQuestionsList from '@/publicodes-state/helpers/getSortedQuestionsList'
import {
  DottedName,
  NGCEvaluatedNode,
  NGCRuleNode,
  Situation,
} from '../../types'

type Props = {
  root: string
  safeGetRule: (rule: DottedName) => NGCRuleNode | null
  safeEvaluate: (rule: PublicodesExpression) => NGCEvaluatedNode | null
  categories: string[]
  subcategories: Record<string, string[]>
  situation: Situation
  foldedSteps: string[]
  everyQuestions: string[]
  everyMosaicChildrenWithParent: Record<string, string[]>
  rawMissingVariables: Record<string, number>
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
  rawMissingVariables,
}: Props) {
  // We use the DottedName type from nosgestesclimat to make sure the build will break when using rules that are not in the model.
  const priorityQuestions: NGCDottedName[] = ['alimentation . plats']

  // TODO: delete exception when the model is released
  const nonPriorityQuestions:
    | NGCDottedName[]
    | ['logement . électricité . réseau . consommation'] = [
    'logement . électricité . réseau . consommation',
  ]

  const missingVariables = useMemo<Record<string, number>>(
    () => {
      const tempMissingVariables = Object.fromEntries(
        Object.entries(safeEvaluate(root)?.missingVariables || {}).filter(
          (missingVariable) => everyQuestions.includes(missingVariable[0])
        )
      )

      // We take every mosaic parent to add it to the missing variables with the max score of its children
      Object.entries(everyMosaicChildrenWithParent).forEach(
        ([mosaicParent, mosaicChildren]) => {
          const maxMissingVariableScoreInMosaic = Math.max(
            ...mosaicChildren.map((child) => tempMissingVariables[child])
          )
          if (!isNaN(maxMissingVariableScoreInMosaic)) {
            tempMissingVariables[mosaicParent] = maxMissingVariableScoreInMosaic
            mosaicChildren.forEach((mosaicChild) => {
              delete tempMissingVariables[mosaicChild]
            })
          }
        }
      )

      // We artificially set the missing variables of the whiteList to a high value
      priorityQuestions.forEach((dottedName) => {
        tempMissingVariables[dottedName] += 10000
      })

      // We artificially set the missing variables of the blackList to a negative value
      nonPriorityQuestions.forEach((dottedName) => {
        tempMissingVariables[dottedName] -= 1000
      })

      return tempMissingVariables
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      safeEvaluate,
      root,
      everyQuestions,
      situation,
      priorityQuestions,
      nonPriorityQuestions,
    ]
  )

  const remainingQuestions = useMemo<string[]>(() => {
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
      .filter((question) => foldedSteps.indexOf(question) === -1)
      // and all that are not missing
      .filter((question) =>
        Object.keys(missingVariables).find((missingVariable) =>
          missingVariable.includes(question)
        )
      )

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

  const relevantAnsweredQuestions = useMemo<string[]>(
    () =>
      foldedSteps.filter((foldedStep) => {
        // checks that there is still a question associated to the folded step
        if (!everyQuestions.includes(foldedStep)) {
          return false
        }

        const isApplicable =
          safeEvaluate({ 'est applicable': foldedStep })?.nodeValue === true

        const isInMissingVariables =
          Object.keys(rawMissingVariables).includes(foldedStep)
        // even if the question is disabled, we want to display it if it's a missing variable
        // (this is the case for boolean question whose value is a condition for the parent).
        return isInMissingVariables || isApplicable
      }),
    // We want to recompute this every time the situation changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [situation, foldedSteps, safeEvaluate, everyQuestions, rawMissingVariables]
  )

  const tempRelevantQuestions = useMemo<string[]>(
    () => [
      /**
       * We add every answered questions to display and every not answered
       * questions to display to get every relevant questions
       */
      ...relevantAnsweredQuestions,
      ...remainingQuestions.filter((dottedName: DottedName) =>
        // We check again if the question is missing or not to make sure mosaic
        // are correctly assessed (this is less than ideal)
        getIsMissing({
          dottedName,
          situation,
          questionsOfMosaic: everyMosaicChildrenWithParent[dottedName] || [],
        })
      ),
    ],
    [
      relevantAnsweredQuestions,
      remainingQuestions,
      situation,
      everyMosaicChildrenWithParent,
    ]
  )

  /**
   * There is a small delay between adding a question to the answered questions
   * and removing it from the missing questions. So we need to check for
   * duplicates
   *
   * (yes, this is shit)
   */
  const relevantQuestions = useMemo<string[]>(
    () =>
      tempRelevantQuestions.filter(
        (question, index) => tempRelevantQuestions.indexOf(question) === index
      ),
    [tempRelevantQuestions]
  )

  const relevantOrderedQuestions = useMemo<string[]>(
    () =>
      getSortedQuestionsList({
        questions: relevantQuestions,
        categories,
        subcategories,
        missingVariables,
      }),
    [categories, missingVariables, relevantQuestions, subcategories]
  )

  return {
    missingVariables,
    remainingQuestions,
    relevantAnsweredQuestions,
    relevantOrderedQuestions,
  }
}
