import type {
  DottedName,
  NGCRuleNode,
  NGCRules,
} from '@abc-transitionbascarbone/near-modele'
import { useContext } from 'react'
import { SimulationContext } from '../../providers/simulationProvider/context'
import useCurrentSimulation from '../useCurrentSimulation'

import type { EvaluatedNode } from 'publicodes'
/**
 * This is temporary and should be put to death as soon as possible
 */
export default function useTempEngine(): {
  getSpecialRuleObject: (dottedName: DottedName) => EvaluatedNode & NGCRuleNode
  rules: NGCRules | undefined
  extendedFoldedSteps: DottedName[]
} {
  const { safeEvaluate, rules, safeGetRule, everyMosaicChildrenWithParent } =
    useContext(SimulationContext)

  const { foldedSteps } = useCurrentSimulation()

  const getSpecialRuleObject = (
    dottedName: DottedName
  ): EvaluatedNode & NGCRuleNode => {
    const evaluation = safeEvaluate(dottedName) as EvaluatedNode
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
