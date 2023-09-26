import Engine from 'publicodes'
import { useMemo } from 'react'

type Props = {
  engine: Engine
}

export default function useRules({ engine }: Props) {
  const everyRules = useMemo<string[]>(
    () =>
      Object.entries(engine.getParsedRules()).map(
        (rule: (string | any)[]) => rule[0]
      ),
    [engine]
  )

  const everyInactiveRules = useMemo<string[]>(
    () =>
      Object.entries(engine.getParsedRules())
        .filter((rule: (string | any)[]) => rule[1].rawNode.inactif === 'oui')
        .map((rule: (string | any)[]) => rule[0]),
    [engine]
  )

  const everyQuestions = useMemo<string[]>(
    () =>
      Object.entries(engine.getParsedRules())
        .filter((rule: (string | any)[]) => rule[1].rawNode.question)
        .map((question: (string | any)[]) => question[0]),
    [engine]
  )

  const everyMosaic = useMemo<string[]>(
    () =>
      Object.entries(engine.getParsedRules())
        .filter((rule: (string | any)[]) => rule[1].rawNode.mosaique)
        .map((question) => question[0]),
    [engine]
  )

  const everyNotifications = useMemo<string[]>(
    () =>
      Object.entries(engine.getParsedRules())
        .filter((rule: any) => rule[1].rawNode.type === 'notification') // Model shenanigans: type is only used for notifications
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
    everyRules,
    everyInactiveRules,
    everyQuestions,
    everyNotifications,
    everyMosaicChildWhoIsReallyInMosaic,
  }
}
