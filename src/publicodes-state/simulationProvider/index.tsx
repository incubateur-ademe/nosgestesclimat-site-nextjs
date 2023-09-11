'use client'

import { PropsWithChildren } from 'react'

import { Rules, Situation } from '../types'
import SimulationContext from './context'
import useEngine from './useEngine'
import useRules from './useRules'
import useSituation from './useSituation'

type Props = {
  rules: Rules
  defaultSituation?: Situation
  situation: Situation
  updateSituation: (situation: Situation) => void
}

export default function SimulationProvider({
  children,
  rules,
  defaultSituation,
  situation: externalSituation,
  updateSituation: updateExternalSituation,
}: PropsWithChildren<Props>) {
  const { engine, safeEvaluate, safeGetRule } = useEngine(rules)

  const {
    everyRules,
    everyQuestions,
    everyMosaic,
    everyNotifications,
    everyMosaicChildWhoIsReallyInMosaic,
  } = useRules({ engine })

  const { situation, updateSituation } = useSituation({
    engine,
    everyRules,
    defaultSituation,
    externalSituation,
    updateExternalSituation,
  })

  return (
    <SimulationContext.Provider
      value={{
        rules,
        engine,
        safeGetRule,
        safeEvaluate,
        situation,
        updateSituation,
        everyQuestions,
        everyMosaic,
        everyNotifications,
        everyMosaicChildWhoIsReallyInMosaic,
      }}>
      {children}
    </SimulationContext.Provider>
  )
}
