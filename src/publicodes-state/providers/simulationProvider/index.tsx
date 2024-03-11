'use client'

import { PropsWithChildren, useCallback } from 'react'

import {
  DottedName,
  NGCRules,
  Situation,
  UpdateSimulationProps,
} from '../../types'
import SimulationContext from './context'
import useCategories from './useCategories'
import { useComputedResults } from './useComputedResults'
import useEngine from './useEngine'
import useRules from './useRules'
import useSituation from './useSituation'

type Props = {
  /**
   * A publicodes rules object
   */
  rules: NGCRules
  /**
   * The starting situation of engine
   */
  defaultSituation?: Situation
  /**
   * The situation object of the current simulation of the user
   */
  situation: Situation
  /**
   * A function to update the simulation of the user
   */
  updateSimulation: (simulation: UpdateSimulationProps) => void
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
  updateSimulation,
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
    everyMosaic,
    everyMosaicChildren,
    rawMissingVariables,
  } = useRules({ engine: pristineEngine, root: 'bilan' })

  const { situation, updateSituation, deleteSituation, initialized } =
    useSituation({
      engine,
      everyRules,
      defaultSituation,
      externalSituation,
      updateExternalSituation,
      updateSimulation,
    })

  const { categories, subcategories } = useCategories({
    parsedRules: engine.getParsedRules(),
    everyRules,
    root,
    safeGetRule,
    order: categoryOrder,
  })

  const { computedResults } = useComputedResults({
    situation,
    categories,
    safeEvaluate,
    updateSimulation,
  })

  const addFoldedStepFixed = useCallback(
    (foldedStep: string) => {
      if (!foldedSteps.includes(foldedStep)) {
        addFoldedStep(foldedStep)
      }
    },
    [addFoldedStep, foldedSteps]
  )

  return (
    <SimulationContext.Provider
      value={{
        rules,
        engine,
        pristineEngine,
        safeEvaluate,
        safeGetRule,
        situation,
        updateSituation,
        deleteSituation,
        updateProgression,
        foldedSteps,
        //TODO: should clean a bit
        addFoldedStep: addFoldedStepFixed,
        everyRules,
        everyInactiveRules,
        everyQuestions,
        everyNotifications,
        everyMosaic,
        everyMosaicChildren,
        rawMissingVariables,
        categories,
        subcategories,
        computedResults,
      }}>
      {initialized || shouldAlwaysDisplayChildren ? children : null}
    </SimulationContext.Provider>
  )
}
