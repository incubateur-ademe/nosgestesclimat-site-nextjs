'use client'

import { PropsWithChildren } from 'react'

import { DottedName, Rules, Situation } from '../../types'
import SimulationContext from './context'
import useCategories from './useCategories'
import useEngine from './useEngine'
import useRules from './useRules'
import useSituation from './useSituation'

type Props = {
  /**
   * A publicodes rules object
   */
  rules: Rules
  /**
   * The starting situation of engine
   */
  defaultSituation?: Situation
  /**
   * The situation object of the current simulation of the user
   */
  situation: Situation
  /**
   * A function to update the situation of the current simulation of the user (the passed situation is added to the current situation)
   */
  updateSituation: (situation: Situation) => void
  /**
   * A function to update the progression of the current simulation of the user in the user object returned by the useUser hook
   */
  updateProgression: (progression: number) => void
  /**
   * Every answered questions of the current simulation
   */
  foldedSteps: DottedName[]
  /**
   * A function to add a question to the list of the answered questions of the current simulation
   */
  addFoldedStep: (foldedStep: string) => void
  /**
   * The order in wich we should display the categories
   */
  categoryOrder: string[]
  /**
   * The root rule of the simulation
   */
  root?: string
  /**
   * Whether we should wait for the simulation to be initialized before displaying children
   */
  shouldAlwaysDisplayChildren?: boolean
}

export default function SimulationProvider({
  children,
  rules,
  defaultSituation,
  situation: externalSituation,
  updateSituation: updateExternalSituation,
  updateProgression,
  foldedSteps,
  addFoldedStep,
  categoryOrder,
  root = 'bilan',
  shouldAlwaysDisplayChildren = false,
}: PropsWithChildren<Props>) {
  const { engine, pristineEngine, safeEvaluate, safeGetRule } = useEngine(rules)

  const {
    everyRules,
    everyInactiveRules,
    everyQuestions,
    everyNotifications,
    everyMosaicChildren,
  } = useRules({ engine: pristineEngine })

  const { situation, updateSituation, initialized } = useSituation({
    engine,
    everyRules,
    defaultSituation,
    externalSituation,
    updateExternalSituation,
  })

  const { categories, subcategories } = useCategories({
    everyRules,
    root,
    safeGetRule,
    order: categoryOrder,
  })

  return (
    <SimulationContext.Provider
      value={{
        rules,
        engine,
        pristineEngine,
        safeGetRule,
        safeEvaluate,
        situation,
        updateSituation,
        updateProgression,
        foldedSteps,
        //TODO: should clean a bit
        addFoldedStep: (foldedStep) => {
          if (!foldedSteps.includes(foldedStep)) {
            addFoldedStep(foldedStep)
          }
        },
        everyRules,
        everyInactiveRules,
        everyQuestions,
        everyNotifications,
        everyMosaicChildren,
        categories,
        subcategories,
      }}>
      {initialized || shouldAlwaysDisplayChildren ? children : null}
    </SimulationContext.Provider>
  )
}
