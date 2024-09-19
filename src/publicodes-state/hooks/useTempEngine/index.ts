import { NGCEvaluatedNode } from '@/publicodes-state/types'
import {
  DottedName,
  NGCRuleNode,
  NGCRules,
} from '@incubateur-ademe/nosgestesclimat'
import { useContext } from 'react'
import { SimulationContext } from '../../providers/simulationProvider/context'
import useCurrentSimulation from '../useCurrentSimulation'

/**
 * This is temporary and should be put to death as soon as possible
 */
export default function useTempEngine(): {
  getSpecialRuleObject: (
    dottedName: DottedName
  ) => NGCEvaluatedNode & NGCRuleNode
  rules: NGCRules | undefined
  extendedFoldedSteps: DottedName[]
} {
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
    .map((foldedStep) => {
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
