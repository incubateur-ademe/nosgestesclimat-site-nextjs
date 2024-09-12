'use client'

import { checkValueValidity } from '@/publicodes-state/helpers/getValueValidity'
import {
  DottedName,
  NGCRuleNode,
  NodeValue,
} from '@incubateur-ademe/nosgestesclimat'
import { PublicodesExpression, utils } from 'publicodes'
import { useCallback } from 'react'
import getType from '../../helpers/getType'
import {
  NGCEvaluatedNode,
  ParsedRules,
  Situation,
  UpdateCurrentSimulationProps,
} from '../../types'

type Props = {
  dottedName: DottedName
  parsedRules: ParsedRules
  safeGetRule: (rule: DottedName) => NGCRuleNode | null
  safeEvaluate: (rule: PublicodesExpression) => NGCEvaluatedNode | null
  evaluation: NGCEvaluatedNode | null
  type: string | undefined
  updateCurrentSimulation: (simulation: UpdateCurrentSimulationProps) => void
  addToEngineSituation: (situationToAdd: Situation) => Situation
}

export default function useSetValue({
  dottedName,
  parsedRules,
  safeGetRule,
  safeEvaluate,
  type,
  updateCurrentSimulation,
  addToEngineSituation,
}: Props) {
  /**
   * @param value - The value to set
   * @param options.foldedStep - The dottedName of the foldedStep
   * @param options.questionsOfMosaicFromSibling - The reset value of the sibling questions
   */
  const setValue = useCallback(
    async (
      value: NodeValue | Record<string, NodeValue>,
      {
        foldedStep,
        mosaicResetSituation,
      }: {
        foldedStep?: DottedName
        mosaicResetSituation?: Situation
      } = {}
    ) => {
      let situationToAdd = {}

      if (typeof value === 'object') {
        situationToAdd = Object.keys(value || {}).reduce(
          (accumulator: Situation, partialMosaicChildDottedName: string) => {
            const mosaicChildDottedName = utils.disambiguateReference(
              parsedRules,
              dottedName,
              partialMosaicChildDottedName
            ) as DottedName
            const rule = safeGetRule(mosaicChildDottedName)
            const evaluation = safeEvaluate(mosaicChildDottedName)
            return {
              ...accumulator,
              [mosaicChildDottedName]: checkValueValidity({
                value: value && value[partialMosaicChildDottedName],
                type: getType({
                  rule,
                  evaluation,
                  dottedName: mosaicChildDottedName,
                }),
              }),
            } as Situation
          },
          {} as Situation
        )
      } else {
        situationToAdd = {
          [dottedName]: checkValueValidity({ value, type }),
        }
      }
      if (mosaicResetSituation) {
        situationToAdd = {
          ...mosaicResetSituation,
          ...situationToAdd,
        }
      }

      const safeSituation = addToEngineSituation(situationToAdd)
      updateCurrentSimulation({
        situationToAdd: safeSituation,
        foldedStepToAdd: foldedStep,
      })
    },
    [
      addToEngineSituation,
      updateCurrentSimulation,
      parsedRules,
      dottedName,
      safeGetRule,
      safeEvaluate,
      type,
    ]
  )

  return {
    setValue,
  }
}
