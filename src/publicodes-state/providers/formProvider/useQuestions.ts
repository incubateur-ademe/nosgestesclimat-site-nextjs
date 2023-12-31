import { useMemo } from 'react'
import getIsMissing from '../../helpers/getIsMissing'
import getQuestionsOfMosaic from '../../helpers/getQuestionsOfMosaic'
import { NGCEvaluatedNode, NGCRuleNode, Situation } from '../../types'

type Props = {
  root: string
  safeGetRule: (rule: string) => NGCRuleNode | null
  safeEvaluate: (rule: string) => NGCEvaluatedNode | null
  categories: string[]
  subcategories: Record<string, string[]>
  situation: Situation
  foldedSteps: string[]
  everyQuestions: string[]
  everyMosaicChildren: string[]
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
  everyMosaicChildren,
}: Props) {
  const missingVariables = useMemo<Record<string, number>>(
    () =>
      Object.fromEntries(
        Object.entries(safeEvaluate(root)?.missingVariables || {}).filter(
          (missingVariable) => everyQuestions.includes(missingVariable[0])
        )
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [safeEvaluate, root, situation]
  )

  const remainingQuestions = useMemo<string[]>(
    () =>
      // We take every questions
      everyQuestions
        // We remove all that are in mosaics,
        .filter(
          (question) =>
            !everyMosaicChildren.find((mosaic) => mosaic === question)
        )
        // all that are in folded steps
        .filter((question) => foldedSteps.indexOf(question) === -1)
        // and all that are not missing
        .filter((question) =>
          Object.keys(missingVariables).find((missingVariable) =>
            missingVariable.includes(question)
          )
        )
        .sort((a, b) => {
          const aSplittedName = a.split(' . ')
          const bSplittedName = b.split(' . ')

          // We first sort by category
          if (
            categories.indexOf(aSplittedName[0]) >
            categories.indexOf(bSplittedName[0])
          ) {
            return 1
          }
          if (
            categories.indexOf(aSplittedName[0]) <
            categories.indexOf(bSplittedName[0])
          ) {
            return -1
          }

          // then by subcategory
          const categoryOfBothQuestions = aSplittedName[0]
          const aCategoryAndSubcategory =
            aSplittedName[0] + ' . ' + aSplittedName[1]
          const bCategoryAndSubcategory =
            bSplittedName[0] + ' . ' + bSplittedName[1]
          if (
            subcategories[categoryOfBothQuestions].indexOf(
              aCategoryAndSubcategory
            ) >
            subcategories[categoryOfBothQuestions].indexOf(
              bCategoryAndSubcategory
            )
          ) {
            return 1
          }
          if (
            subcategories[categoryOfBothQuestions].indexOf(
              aCategoryAndSubcategory
            ) <
            subcategories[categoryOfBothQuestions].indexOf(
              bCategoryAndSubcategory
            )
          ) {
            return -1
          }

          // then if there is a km or a proprietaire (this is shit)
          if (a.includes('km')) {
            return -1
          }
          if (b.includes('km')) {
            return 1
          }
          if (a.includes('propriétaire')) {
            return -1
          }
          if (b.includes('propriétaire')) {
            return 1
          }

          // then by length
          if (bSplittedName.length > aSplittedName.length) {
            return -1
          }
          if (aSplittedName.length > bSplittedName.length) {
            return 1
          }

          // then by number of missing variables
          return missingVariables[b] - missingVariables[a]
        }),
    [
      foldedSteps,
      categories,
      subcategories,
      missingVariables,
      everyQuestions,
      everyMosaicChildren,
    ]
  )

  const relevantAnsweredQuestions = useMemo<string[]>(
    () =>
      /**
       * First we check that there is still a question associated to the folded
       * step. If not we cut it. Then we check if the folded step is nullable
       * (it has been disabled by its parent or something). If it is we cut it.
       */
      foldedSteps
        .filter((foldedStep) => everyQuestions.includes(foldedStep))
        .filter((foldedStep) => !safeEvaluate(foldedStep)?.isNullable),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [situation, foldedSteps, safeEvaluate, everyQuestions]
  )

  const tempRelevantQuestions = useMemo<string[]>(
    () => [
      /**
       * We add every answered questions to display and every not answered
       * questions to display to get every relevant questions
       */
      ...relevantAnsweredQuestions,
      ...remainingQuestions.filter((dottedName: string) =>
        // We check again if the question is missing or not to make sure mosaic
        // are correctly assessed (this is less than ideal)
        getIsMissing({
          dottedName,
          situation,
          // FIXME: we might want to use `useMosaicQuestions` here but we need
          // to have access to the corresponding 'options'
          questionsOfMosaic: getQuestionsOfMosaic({
            dottedName,
            everyMosaicChildren,
          }),
        })
      ),
    ],
    [
      relevantAnsweredQuestions,
      remainingQuestions,
      situation,
      everyMosaicChildren,
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

  const questionsByCategories = useMemo<Record<string, string[]>>(
    () =>
      categories.reduce(
        (accumulator: Record<string, string[]>, currentValue: string) => ({
          ...accumulator,
          [currentValue]: relevantQuestions.filter((question) =>
            question.includes(currentValue)
          ),
        }),
        {}
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
