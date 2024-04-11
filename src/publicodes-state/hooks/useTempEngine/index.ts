import getQuestionsOfMosaic from '@/publicodes-state/helpers/getQuestionsOfMosaic'
import { DottedName } from '@/publicodes-state/types'
import { useContext } from 'react'
import { SimulationContext } from '../../providers/simulationProvider/context'
import useCurrentSimulation from '../useCurrentSimulation'

/**
 * This is temporary and should be put to death as soon as possible
 */
export default function useTempEngine() {
  const { safeEvaluate, rules, safeGetRule, everyMosaicChildren } =
    useContext(SimulationContext)

  const { foldedSteps } = useCurrentSimulation()

  const getRuleObject = (dottedName: DottedName): any => {
    return { ...safeEvaluate(dottedName), ...safeGetRule(dottedName) }
  }

  const extendedFoldedSteps = foldedSteps
    .map((foldedStep) => {
      const questionsOfMosaic = getQuestionsOfMosaic({
        dottedName: foldedStep,
        everyMosaicChildren,
      })
      return questionsOfMosaic.length > 0 ? questionsOfMosaic : foldedStep
    })
    .flat()

  return {
    getRuleObject,
    rules,
    extendedFoldedSteps,
  }
}
