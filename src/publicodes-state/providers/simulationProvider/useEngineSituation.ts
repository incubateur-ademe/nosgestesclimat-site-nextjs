import { useCurrentSimulation } from '@/publicodes-state'
import { useCallback, useEffect, useState } from 'react'
import { Engine, Situation } from '../../types'

type Props = {
  engine?: Engine
}
/**
 * Update the engine situation and the simulation situation
 */
export function useEngineSituation({ engine = undefined }: Props) {
  const { situation } = useCurrentSimulation()

  const [isEngineInitialized, setIsEngineInitialized] = useState(false)

  const addToEngineSituation = useCallback(
    (situationToAdd: Situation): Situation => {
      if (!engine) return situation

      engine.setSituation({ ...situation, ...situationToAdd })
      // The current engine situation might have been filtered
      const safeSituation = engine.getSituation()

      return safeSituation
    },
    [engine, situation]
  )

  useEffect(() => {
    if (isEngineInitialized || !engine) return

    engine.setSituation(situation)
    setIsEngineInitialized(true)
  }, [engine, situation, isEngineInitialized])

  return { isEngineInitialized, addToEngineSituation }
}
