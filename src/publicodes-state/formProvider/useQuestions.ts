import { useEffect, useMemo, useState } from 'react'
import { Engine, NGCEvaluatedNode, Situation } from '../types'

type Props = {
  engine: Engine
  root: string
  safeEvaluate: (rule: string) => NGCEvaluatedNode | null
  categories: string[]
  situation: Situation
  everyQuestions: string[]
  everyMosaic: string[]
  everyMosaicChildWhoIsReallyInMosaic: string[]
}

export default function useQuestions({
  engine,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [engine, everyQuestions]
  )

  const missingInputs = useMemo<string[]>(
    () =>
      Object.keys(safeEvaluate(root)?.missingVariables || {}).filter(
        (missingInput: string) => everyQuestions.includes(missingInput)
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [engine, everyQuestions, situation]
  )

  // TODO : this is shit
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
                for (let i = 1; i < aSplittedName.length; i++) {
                  if (!bSplittedName[i]) {
                    return 1
                  }
                  if (!aSplittedName[i]) {
                    return -1
                  }

                  if (
                    ['présent', 'propriétaire', 'usager'].includes(
                      bSplittedName[i]
                    )
                  ) {
                    return 1
                  }
                  if (
                    ['présent', 'propriétaire', 'usager'].includes(
                      aSplittedName[i]
                    )
                  ) {
                    return -1
                  }
                  if (['km'].includes(bSplittedName[i])) {
                    return 1
                  }
                  if (['km'].includes(aSplittedName[i])) {
                    return -1
                  }

                  if (aSplittedName[i] > bSplittedName[i]) {
                    return 1
                  }
                  if (aSplittedName[i] < bSplittedName[i]) {
                    return -1
                  }
                }
                return 0
              }),
          ]
        : [],
    [categories, everyQuestions, everyMosaicChildWhoIsReallyInMosaic]
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
