import { useCurrentSimulation } from '@/publicodes-state'
import { shouldNotBeIgnored } from '@/publicodes-state/helpers/shouldNotBeIgnored'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import type { EvaluatedNode, PublicodesExpression } from 'publicodes'
import { useCallback, useEffect, useState } from 'react'
import type { Engine, MissingVariables, Situation } from '../../types'

type Props = {
  engine: Engine | undefined
  safeEvaluate: (rule: PublicodesExpression) => EvaluatedNode | null
  rawMissingVariables: MissingVariables
}
/**
 * Update the engine situation and the simulation situation
 */
export function useEngineSituation({
  engine,
  safeEvaluate,
  rawMissingVariables,
}: Props) {
  const { situation } = useCurrentSimulation()

  const [isEngineInitialized, setIsEngineInitialized] = useState(false)

  const addToEngineSituation = useCallback(
    (situationToAdd: Situation): Situation => {
      if (!engine) return situation

      engine.setSituation({ ...situation, ...situationToAdd })

      // The current engine situation might have been filtered with Publicodes filtering logic.
      const safeSituation = engine.getSituation()

      const cleanSituation = Object.fromEntries(
        Object.entries(safeSituation).filter(([dottedName]) => {
          return shouldNotBeIgnored({
            dottedName: dottedName as DottedName,
            safeEvaluate,
            rawMissingVariables,
          })
        })
      )

      engine.setSituation(cleanSituation)

      return cleanSituation
    },
    [engine, rawMissingVariables, safeEvaluate, situation]
  )

  useEffect(() => {
    if (isEngineInitialized || !engine) return

    engine.setSituation(situation)
    setIsEngineInitialized(true)
  }, [engine, situation, isEngineInitialized])

  return { isEngineInitialized, addToEngineSituation }
}
