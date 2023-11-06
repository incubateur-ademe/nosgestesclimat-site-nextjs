/* eslint @typescript-eslint/no-unused-vars: "warn" */

import { NGCRuleNode, RuleName } from '@/publicodes-state/types'
import Engine from 'publicodes'
import { useMemo } from 'react'

type NGCRuleEntry = [RuleName, NGCRuleNode]

export default function useRules({ engine }: { engine: Engine }): {
  everyRules: RuleName[]
  everyInactiveRules: RuleName[]
  everyQuestions: RuleName[]
  everyNotifications: RuleName[]
  everyMosaicChildWhoIsReallyInMosaic: RuleName[]
} {
  const everyRules = useMemo<RuleName[]>(
    () => Object.entries(engine.getParsedRules()).map(([name, _]) => name),
    [engine]
  )

  const everyInactiveRules = useMemo<RuleName[]>(
    () =>
      Object.entries(engine.getParsedRules())
        .filter(([_, rule]: NGCRuleEntry) => rule.rawNode.inactif === 'oui')
        .map(([name]) => name),
    [engine]
  )

  const everyQuestions = useMemo<RuleName[]>(
    () =>
      Object.entries(engine.getParsedRules())
        .filter(([_, rule]: NGCRuleEntry) => rule.rawNode.question)
        .map(([name, _]) => name),
    [engine]
  )

  const everyMosaicEntries = useMemo<NGCRuleEntry[]>(
    () =>
      Object.entries(engine.getParsedRules()).filter(
        ([_, rule]: NGCRuleEntry) => rule.rawNode.mosaique
      ),
    [engine]
  )

  const everyNotifications = useMemo<RuleName[]>(
    () =>
      Object.entries(engine.getParsedRules())
        .filter(
          ([_, rule]: NGCRuleEntry) =>
            // Model shenanigans: type is only used for notifications
            rule.rawNode.type === 'notification'
        )
        .map(([name, _]) => name),
    [engine]
  )

  // FIXME(@EmileRolley): refactoring not tested yet
  const everyMosaicChildWhoIsReallyInMosaic = useMemo<RuleName[]>(
    () =>
      everyQuestions.filter((question: RuleName) => {
        return everyMosaicEntries.find(([mosaicName, mosaicRule]) => {
          const mosaicNode = mosaicRule.rawNode?.mosaique
          if (!mosaicNode) {
            return false
          }
          const key = mosaicNode['clé']
          return (
            question !== mosaicName &&
            question.includes(mosaicName) &&
            question.includes(key)
          )
        })
      }),
    [everyQuestions, everyMosaicEntries]
  )

  return {
    everyRules,
    everyInactiveRules,
    everyQuestions,
    everyNotifications,
    everyMosaicChildWhoIsReallyInMosaic,
  }
}
