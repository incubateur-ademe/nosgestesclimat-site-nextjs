import { useEffect, useState } from 'react'
import { safeGetSituation } from '../helpers/safeGetSituation'
import { Engine, Situation } from '../types'

type Props = {
  engine: Engine
  everyRules: string[]
  defaultSituation?: Situation
  externalSituation: Situation
  updateExternalSituation: (situation: Situation) => void
}
export default function useSituation({
  engine,
  everyRules,
  defaultSituation = {},
  externalSituation,
  updateExternalSituation,
}: Props) {
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
