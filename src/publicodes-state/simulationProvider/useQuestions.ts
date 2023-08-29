import { useEffect, useMemo, useState } from 'react'

type Props = {
  engine: any
  safeEvaluate: any
  categories: string[]
  situation: any
}

export default function useQuestions({
  engine,
  safeEvaluate,
  categories,
  situation,
}: Props) {
  const everyQuestions = useMemo<string[]>(
    () =>
      Object.entries(engine.getParsedRules())
        .filter((rule: any) => rule[1].rawNode.question)
        .map((question: any) => question[0]),

    [engine]
  )

  const everyMosaic = useMemo<string[]>(
    () =>
      Object.entries(engine.getParsedRules())
        .filter((rule: any) => rule[1].rawNode.mosaique)
        .map((question) => question[0]),
    [engine]
  )

  const initialMissingInputs = useMemo(
    () =>
      Object.keys(safeEvaluate('bilan').missingVariables).filter(
        (missingInput: string) => everyQuestions.includes(missingInput)
      ),
    [engine, everyQuestions]
  )

  const missingInputs = useMemo(
    () =>
      Object.keys(safeEvaluate('bilan').missingVariables).filter(
        (missingInput: string) => everyQuestions.includes(missingInput)
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [engine, everyQuestions, situation]
  )

  // TODO : There's got to be a better way
  const everyMosaicChildWhoIsReallyInMosaic = useMemo<string[]>(
    () =>
      everyQuestions
        .filter((currentValue: string) =>
          everyMosaic.find(
            (mosaic) => currentValue !== mosaic && currentValue.includes(mosaic)
          )
        )
        .reduce(
          (accumulator: string[], currentValue: string) =>
            !accumulator.find(
              (accumulatedSubRule) =>
                currentValue !== accumulatedSubRule &&
                currentValue.includes(
                  accumulatedSubRule
                    .replace(' . présent', '')
                    .replace(' . propriétaire', '') // Model shenanigans
                )
            )
              ? [...accumulator, currentValue]
              : accumulator,
          []
        ),
    [everyQuestions, everyMosaic]
  )

  // TODO : this is shit
  const askableQuestions = useMemo<string[]>(
    () =>
      categories.length
        ? [
            ...everyQuestions
              .filter(
                (question: any) =>
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
    situation: {
      [key: string]: string[]
    }
  }) => situation.hasOwnProperty(question)

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
    setRelevantQuestions((prevRelevantQuestion: any) =>
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

  const questionsByCategories = useMemo(
    () =>
      categories.reduce(
        (accumulator: object, currentValue: string) => ({
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
