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

  const everyMosaicChildren = useMemo<string[]>(
    () =>
      everyMosaic.reduce(
        accumulator,
        (mosaic) => {
          const mosaicChildren = mosaic.rawNode.mosaique['options'].map(
            (option) => everyQuestions.find((rule) => rule.includes(option))
          )
          return [...accumulator, ...mosaicChildren]
        },
        []
      ),
    [everyMosaic, everyQuestions]
  )
  const everyMosaicChildWhoIsReallyInMosaic = useMemo<string[]>(
    () =>
      everyQuestions.filter((currentValue: string) =>
        everyMosaic.find((mosaic) => {
          const mosaicRule = engine.getRule(mosaic) as any
          console.log(mosaicRule, mosaicRule.rawNode.mosaique['options'])
          const key = mosaicRule.rawNode.mosaique['options']
          return currentValue.includes(key)
        })
      ),
    [everyQuestions, everyMosaic, engine]
  )
  console.log(
    'everyMosaicChildWhoIsReallyInMosaic',
    everyMosaicChildWhoIsReallyInMosaic
  )
  return {
    everyRules,
    everyInactiveRules,
    everyQuestions,
    everyNotifications,
    everyMosaicChildren,
    everyMosaicChildWhoIsReallyInMosaic,
  }
}
