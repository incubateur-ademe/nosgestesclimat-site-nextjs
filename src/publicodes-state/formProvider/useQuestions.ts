import { useEffect, useMemo, useState } from 'react'
import getIsMissing from '../helpers/getIsMissing'
import getQuestionsOfMosaic from '../helpers/getQuestionsOfMosaic'
import { NGCEvaluatedNode, Situation } from '../types'

type Props = {
  root: string
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
  safeEvaluate,
  categories,
  subcategories,
  situation,
  foldedSteps,
  everyQuestions,
  everyMosaicChildWhoIsReallyInMosaic,
}: Props) {
  const missingVariables = useMemo<Record<string, number>>(
    () => safeEvaluate(root)?.missingVariables || {},
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
          if (bSplittedName.length > aSplittedName.length) {
            return -1
          }
          if (aSplittedName.length > bSplittedName.length) {
            return 1
          }
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
  console.log(subcategories, remainingQuestions)
  const [relevantQuestions, setRelevantQuestions] = useState<string[]>([])
  useEffect(
    function () {
      setRelevantQuestions([
        ...foldedSteps,
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
      ])
    },
    [
      foldedSteps,
      remainingQuestions,
      situation,
      missingVariables,
      everyMosaicChildWhoIsReallyInMosaic,
    ]
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
    relevantQuestions,
    questionsByCategories,
  }
}
