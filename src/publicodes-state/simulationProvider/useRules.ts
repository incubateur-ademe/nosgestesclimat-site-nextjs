import { useMemo } from 'react'

type Props = {
  engine: any
}

export default function useRules({ engine }: Props) {
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

  const everyNotifications = useMemo<string[]>(
    () =>
      Object.entries(engine.getParsedRules())
        .filter((rule: any) => rule[1].rawNode.notification)
        .map((question) => question[0]),
    [engine]
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

  return {
    everyQuestions,
    everyMosaic,
    everyNotifications,
    everyMosaicChildWhoIsReallyInMosaic,
  }
}
