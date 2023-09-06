'use client'

import { PropsWithChildren } from 'react'

import SimulationContext from './context'
import useActionChoices from './useActionChoices'
import useEngine from './useEngine'
import useRules from './useRules'
import useSituation from './useSituation'

type Props = {
  rules: any
  defaultSituation?: any
  situation?: any
  updateSituation: (arg: any) => void
}

export default function SimulationProvider({
  children,
  rules,
  defaultSituation,
  situation: externalSituation,
  updateSituation: updateExternalSituation,
}: PropsWithChildren<Props>) {
  const { engine, safeEvaluate, safeGetRule } = useEngine(rules)

  const { situation, updateSituation } = useSituation({
    engine,
    safeEvaluate,
    defaultSituation,
    externalSituation,
    updateExternalSituation,
  })

  const {
    everyQuestions,
    everyMosaic,
    everyNotifications,
    everyMosaicChildWhoIsReallyInMosaic,
  } = useRules({ engine })

  const { actionChoices, toggleActionChoice, setActionChoiceValue } =
    useActionChoices()

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
        actionChoices,
        toggleActionChoice,
        setActionChoiceValue,
      }}>
      {children}
    </SimulationContext.Provider>
  )
}
