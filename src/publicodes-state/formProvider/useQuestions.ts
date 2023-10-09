import { useMemo } from 'react'
import getIsMissing from '../helpers/getIsMissing'
import getQuestionsOfMosaic from '../helpers/getQuestionsOfMosaic'
import getType from '../helpers/getType'
import { NGCEvaluatedNode, NGCRuleNode, Situation } from '../types'

type Props = {
  root: string
  safeGetRule: (rule: string) => NGCRuleNode | null
  safeEvaluate: (rule: string) => NGCEvaluatedNode | null
  categories: string[]
  subcategories: Record<string, string[]>
  situation: Situation
  foldedSteps: string[]
  everyQuestions: string[]
  everyMosaicChildWhoIsReallyInMosaic: string[]
}

/**
 * This is were we get all the questions of the form in the correct order
 */
export default function useQuestions({
  root,
  safeGetRule,
  safeEvaluate,
  categories,
  subcategories,
  situation,
  foldedSteps,
  everyQuestions,
  everyMosaicChildWhoIsReallyInMosaic,
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
        // We remove all that are in mosaics
        .filter(
          (question) =>
            !everyMosaicChildWhoIsReallyInMosaic.find(
              (mosaic) => mosaic === question
            )
        )
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
      categories,
      subcategories,
      missingVariables,
      everyQuestions,
      everyMosaicChildWhoIsReallyInMosaic,
    ]
  )

  const relevantAnsweredQuestions = useMemo<string[]>(
    () =>
      /**
       * First we check that there is still a question associated to the folded step. If not we cut it.
       * Then we take every foldedSteps and then check if their value is null (wich mean they ever are a boolean set to "non" or they are disabled).
       * We check via getType if they are a boolean. If not, it means they are disabled and are not relevant (not displayed)
       */
      foldedSteps
        .filter((foldedStep) => everyQuestions.includes(foldedStep))
        .filter(
          (foldedStep) =>
            !(
              getType({
                dottedName: foldedStep,
                rule: safeGetRule(foldedStep),
                evaluation: safeEvaluate(foldedStep),
              }) !== 'boolean' && safeEvaluate(foldedStep)?.nodeValue === null
            )
        ),
    [foldedSteps, safeGetRule, safeEvaluate, everyQuestions]
  )

  const tempRelevantQuestions = useMemo<string[]>(
    () => [
      /**
       * We add every answered questions to display and every not answered questions to display to get every relevant questions
       */
      ...relevantAnsweredQuestions,
      ...remainingQuestions.filter((dottedName: string) =>
        // We check again if the question is missing or not to make sure mosaic are correctly assessed (this is less than ideal)
        getIsMissing({
          dottedName,
          situation,
          questionsOfMosaic: getQuestionsOfMosaic({
            dottedName,
            everyMosaicChildWhoIsReallyInMosaic,
          }),
        })
      ),
    ],
    [
      relevantAnsweredQuestions,
      remainingQuestions,
      situation,
      everyMosaicChildWhoIsReallyInMosaic,
    ]
  )

  /**
   * There is a small delay between adding a question to the answered questions and removing it from the missing questions.
   * So we need to check for duplicates
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
