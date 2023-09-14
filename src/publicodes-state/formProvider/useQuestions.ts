import { useEffect, useMemo, useState } from 'react'
import getIsMissing from '../helpers/getIsMissing'
import getQuestionsOfMosaic from '../helpers/getQuestionsOfMosaic'
import { NGCEvaluatedNode, Situation } from '../types'

type Props = {
  root: string
  safeEvaluate: (rule: string) => NGCEvaluatedNode | null
  categories: string[]
  situation: Situation
  everyQuestions: string[]
  everyMosaicChildWhoIsReallyInMosaic: string[]
}

export default function useQuestions({
  root,
  safeEvaluate,
  categories,
  situation,
  everyQuestions,
  everyMosaicChildWhoIsReallyInMosaic,
}: Props) {
  const missingVariables = useMemo(
    () => safeEvaluate(root)?.missingVariables || {},
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [safeEvaluate, situation, root]
  )

  const missingInputs = useMemo<string[]>(
    () =>
      Object.keys(missingVariables).filter((missingInput: string) =>
        everyQuestions.includes(missingInput)
      ),
    [missingVariables, everyQuestions]
  )

  const askableQuestions = useMemo<string[]>(
    () =>
      everyQuestions
        .filter(
          (question) =>
            !everyMosaicChildWhoIsReallyInMosaic.find(
              (mosaic) => mosaic === question
            )
        )
        .sort((a, b) => {
          const aSplittedName = a.split(' . ')
          const bSplittedName = b.split(' . ')
          for (let i = 0; i < 2; i++) {
            if (bSplittedName[i] < aSplittedName[i]) {
              return 1
            }
            if (bSplittedName[i] > aSplittedName[i]) {
              return -1
            }
          }
          if (a.includes('km') || a.includes('propriétaire')) {
            return -1
          }
          if (b.includes('km') || b.includes('propriétaire')) {
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
    [missingVariables, everyQuestions, everyMosaicChildWhoIsReallyInMosaic]
  )

  const [relevantQuestions, setRelevantQuestions] = useState<string[]>([])
  useEffect(
    function () {
      setRelevantQuestions((prevRelevantQuestions) => [
        ...prevRelevantQuestions.filter(
          (dottedName: string) =>
            !getIsMissing({
              dottedName,
              situation,
              questionsOfMosaic: getQuestionsOfMosaic({
                dottedName,
                everyMosaicChildWhoIsReallyInMosaic,
              }),
            })
        ),
        ...askableQuestions
          .filter((question) =>
            Object.keys(missingVariables).find((missingVariable) =>
              missingVariable.includes(question)
            )
          )
          .filter((dottedName: string) =>
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
      askableQuestions,
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

  //console.log(questionsByCategories)

  return {
    missingInputs,
    relevantQuestions,
    questionsByCategories,
  }
}
