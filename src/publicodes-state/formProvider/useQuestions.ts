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
      everyQuestions
        .filter(
          (question) =>
            !everyMosaicChildWhoIsReallyInMosaic.find(
              (mosaic) => mosaic === question
            )
        )
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

          // then if there is a km or a proprietaire
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
      foldedSteps.filter(
        (foldedStep) =>
          !(
            getType({
              dottedName: foldedStep,
              rule: safeGetRule(foldedStep),
              evaluation: safeEvaluate(foldedStep),
            }) !== 'boolean' && safeEvaluate(foldedStep)?.nodeValue === null
          )
      ),
    [foldedSteps, safeGetRule, safeEvaluate]
  )
  const tempRelevantQuestions = useMemo<string[]>(
    () => [
      ...relevantAnsweredQuestions,
      ...remainingQuestions.filter((dottedName: string) =>
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
