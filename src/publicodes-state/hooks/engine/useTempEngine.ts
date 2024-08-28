import { NGCEvaluatedNode } from '@/publicodes-state/types'
import { DottedName, NGCRuleNode } from '@incubateur-ademe/nosgestesclimat'
import { useContext } from 'react'
import { SimulationContext } from '../../contexts/simulationContext/context'
import useCurrentSimulation from '../simulation/useCurrentSimulation'

/**
 * This is temporary and should be put to death as soon as possible
 */
export default function useTempEngine() {
  const { safeEvaluate, rules, safeGetRule, everyMosaicChildrenWithParent } =
    useContext(SimulationContext)

  const { foldedSteps } = useCurrentSimulation()

  const getSpecialRuleObject = (
    dottedName: DottedName
  ): NGCEvaluatedNode & NGCRuleNode => {
    const evaluation = safeEvaluate(dottedName) as NGCEvaluatedNode
    const rule = safeGetRule(dottedName) as NGCRuleNode
    return {
      ...evaluation,
      ...rule,
    }
  }

  const extendedFoldedSteps = foldedSteps
    .map((foldedStep: any) => {
      const questionsOfMosaic = everyMosaicChildrenWithParent[foldedStep] || []
      return questionsOfMosaic.length > 0 ? questionsOfMosaic : foldedStep
    })
    .flat()

  return {
    getSpecialRuleObject,
    rules,
    extendedFoldedSteps,
  }
}
