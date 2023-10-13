import { useEffect, useState } from 'react'
import { safeGetSituation } from '../helpers/safeGetSituation'
import { Engine, RuleName, Situation } from '../types'

type Props = {
  engine: Engine
  everyRules: RuleName[]
  defaultSituation?: Situation
  externalSituation: Situation
  updateExternalSituation: (situation: Situation) => void
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
}: Props): {
  situation: Situation
  updateSituation: (situation: Situation) => Promise<void>
  initialized: boolean
} {
  const [initialized, setInitialized] = useState(false)
  const [situation, setSituation] = useState(defaultSituation)

  const updateSituation = (situationToAdd: Situation): Promise<void> => {
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
  }

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
    initialized,
  }
}
