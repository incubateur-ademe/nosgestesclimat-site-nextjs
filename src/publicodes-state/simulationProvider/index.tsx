'use client'

import { PropsWithChildren } from 'react'

import SimulationContext from './context'
<<<<<<< HEAD
=======
import useActionChoices from './useActionChoices'
>>>>>>> main
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
<<<<<<< HEAD
=======

  const { actionChoices, toggleActionChoice, setActionChoiceValue } =
    useActionChoices()
>>>>>>> main

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
<<<<<<< HEAD
=======
        actionChoices,
        toggleActionChoice,
        setActionChoiceValue,
>>>>>>> main
      }}>
      {children}
    </SimulationContext.Provider>
  )
}
