import { useCallback, useEffect, useState } from 'react'
import { safeGetSituation } from '../../helpers/safeGetSituation'
import {
  DottedName,
  Engine,
  Situation,
  UpdateSimulationProps,
} from '../../types'

type Props = {
  engine: Engine
  everyRules: DottedName[]
  defaultSituation?: Situation
  externalSituation: Situation
  updateExternalSituation: (situation: Situation) => void
  updateSimulation: (simulation: UpdateSimulationProps) => void
}
/**
 * update situation lifecycle:
 * 1) We sanitize the situation
 * 2) We update the situation of the simulation of the user (externalSituation)
 * 3) We wait one frame before resolving the promise (this way the user state is updated)
 * 4) We detect that the external situation has changed and we update the engine situation and the internal situation based on it
 */
export default function useSituation({
  engine,
  everyRules,
  defaultSituation = {},
  externalSituation,
  updateExternalSituation,
  updateSimulation,
}: Props) {
  const [initialized, setInitialized] = useState(false)
  const [situation, setSituation] = useState(defaultSituation)

  const updateSituation = useCallback(
    (situationToAdd: Situation): Promise<void> => {
      const safeSitationToAdd = safeGetSituation({
        situation: situationToAdd,
        everyRules,
      })
      updateExternalSituation(safeSitationToAdd)

      // TODO: this is shit
      return new Promise((resolve) => {
        requestAnimationFrame(() => {
          resolve()
        })
      })
    },
    [everyRules, updateExternalSituation]
  )

  const deleteSituation = useCallback(
    (situationKeysToRemove: DottedName[]): Promise<void> => {
      updateSimulation({ situationKeysToRemove: situationKeysToRemove })

      // TODO: this is shit
      return new Promise((resolve) => {
        requestAnimationFrame(() => {
          resolve()
        })
      })
    },
    [updateSimulation]
  )

  useEffect(() => {
    const safeSituation = safeGetSituation({
      situation: externalSituation,
      everyRules,
    })
    engine.setSituation(safeSituation)
    setSituation(safeSituation)
    setInitialized(true)
  }, [externalSituation, engine, everyRules])

  return {
    situation,
    updateSituation,
    deleteSituation,
    initialized,
  }
}
