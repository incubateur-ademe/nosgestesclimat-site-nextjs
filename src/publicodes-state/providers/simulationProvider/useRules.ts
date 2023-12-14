import { NGCRuleNode } from '@/publicodes-state/types'
import Engine from 'publicodes'
import { useMemo } from 'react'

type Props = {
  engine: Engine
}

export default function useRules({ engine }: Props) {
  const parsedRulesEntries = useMemo<[string, NGCRuleNode][]>(
    () => Object.entries(engine.getParsedRules()),
    [engine.getParsedRules()]
  )

  const everyRules = useMemo<string[]>(
    () => parsedRulesEntries.map((rule: (string | any)[]) => rule[0]),
    [parsedRulesEntries]
  )

  const everyInactiveRules = useMemo<string[]>(
    () =>
      parsedRulesEntries
        .filter((rule: (string | any)[]) => rule[1].rawNode.inactif === 'oui')
        .map((rule: (string | any)[]) => rule[0]),
    [parsedRulesEntries]
  )

  const everyQuestions = useMemo<string[]>(
    () =>
      parsedRulesEntries
        .filter((rule: (string | any)[]) => rule[1].rawNode.question)
        .map((question: (string | any)[]) => question[0]),
    [parsedRulesEntries]
  )

  const everyMosaic = useMemo<string[]>(
    () =>
      parsedRulesEntries
        .filter((rule: (string | any)[]) => rule[1].rawNode.mosaique)
        .map((question) => question[0]),
    [parsedRulesEntries]
  )

  const everyNotifications = useMemo<string[]>(
    () =>
      parsedRulesEntries
        .filter((rule: any) => rule[1].rawNode.type === 'notification') // Model shenanigans: type is only used for notifications
        .map((question) => question[0]),
    [parsedRulesEntries]
  )

  const everyMosaicChildren = useMemo<string[]>(
    () =>
      everyMosaic.reduce<string[]>((accumulator, mosaic) => {
        const mosaicRule = engine.getRule(mosaic) as NGCRuleNode

        if (!mosaicRule.rawNode.mosaique) {
          return accumulator
        }

        const mosaicChildren = mosaicRule.rawNode.mosaique['options']?.map(
          (option: string) => {
            return everyQuestions.find((rule) => rule.endsWith(option)) || ''
          }
        )
        return [...accumulator, ...mosaicChildren]
      }, []),
    [everyMosaic, everyQuestions, engine]
  )

  return {
    everyRules,
    everyInactiveRules,
    everyQuestions,
    everyNotifications,
    everyMosaicChildren,
  }
}
