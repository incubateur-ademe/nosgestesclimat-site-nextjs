import { useEffect, useMemo, useState } from 'react'
import { NGCEvaluatedNode, Situation } from '../types'

type Props = {
  root: string
  safeEvaluate: (rule: string) => NGCEvaluatedNode | null
  categories: string[]
  situation: Situation
  everyQuestions: string[]
  everyMosaic: string[]
  everyMosaicChildWhoIsReallyInMosaic: string[]
}

export default function useQuestions({
  root,
  safeEvaluate,
  categories,
  situation,
  everyQuestions,
  everyMosaic,
  everyMosaicChildWhoIsReallyInMosaic,
}: Props) {
  const initialMissingInputs = useMemo<string[]>(
    () =>
      Object.keys(safeEvaluate(root)?.missingVariables || {}).filter(
        (missingInput: string) => everyQuestions.includes(missingInput)
      ),
    [safeEvaluate, everyQuestions, root]
  )

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
      categories.length
        ? [
            ...everyQuestions
              .filter(
                (question: string) =>
                  !everyMosaicChildWhoIsReallyInMosaic.find(
                    (mosaic) => mosaic === question
                  )
              )

              .sort((a: string, b: string) => {
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
                return missingVariables[b] - missingVariables[a]
              }),
          ]
        : [],
    [
      categories,
      missingVariables,
      everyQuestions,
      everyMosaicChildWhoIsReallyInMosaic,
    ]
  )

  const isQuestionAnswered = ({
    question,
    situation,
  }: {
    question: string
    situation: Situation
  }): boolean => (situation[question] ? true : situation[question] === 0)

  const isQuestionMissing = ({
    question,
    missingInputs,
    everyMosaic,
  }: {
    question: string
    missingInputs: string[]
    everyMosaic: string[]
  }): boolean =>
    everyMosaic.includes(question)
      ? missingInputs.find((missingInput) => missingInput.includes(question))
        ? true
        : false
      : missingInputs.includes(question)

  const [relevantQuestions, setRelevantQuestions] = useState<string[]>([])
  useEffect(() => {
    setRelevantQuestions((prevRelevantQuestion: string[]) =>
      prevRelevantQuestion.length
        ? [
            ...prevRelevantQuestion.filter(
              (question: string) =>
                isQuestionAnswered({ question, situation }) ||
                (everyMosaic.includes(question) &&
                  !isQuestionMissing({
                    question,
                    missingInputs,
                    everyMosaic,
                  }))
            ),
            ...askableQuestions.filter((question: string) =>
              isQuestionMissing({
                question,
                missingInputs,
                everyMosaic,
              })
            ),
          ]
        : askableQuestions.filter((question) =>
            isQuestionMissing({
              question,
              missingInputs: initialMissingInputs,
              everyMosaic,
            })
          )
    )
  }, [
    everyQuestions,
    askableQuestions,
    missingInputs,
    initialMissingInputs,
    everyMosaic,
    situation,
  ])

  console.log(safeEvaluate('transport . avion . usager'))
  console.log(
    safeEvaluate('transport . avion . court courrier . heures de vol')
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
    missingInputs,
    everyQuestions,
    everyMosaicChildWhoIsReallyInMosaic,
    relevantQuestions,
    questionsByCategories,
  }
}
