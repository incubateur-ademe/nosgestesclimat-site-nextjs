'use client'

import { PropsWithChildren } from 'react'

import SimulationContext from './context'
import useCategories from './useCategories'
import useEngine from './useEngine'
import useSituation from './useSituation'

type Props = {
  rules: any
  categoryOrder: string[]
  defaultSituation?: any
  situation?: any
  updateSituation: (arg: any) => void
}

export default function SimulationProvider({
  children,
  rules,
  categoryOrder,
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

  const { categories, subcategories } = useCategories({
    engine,
    safeEvaluate,
    order: categoryOrder,
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
        categories,
        subcategories,
      }}>
      {children}
    </SimulationContext.Provider>
  )
}
